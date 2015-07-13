'use strict';

var _ = require('lodash'),
    Agenda = require('agenda'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    yaml = require('js-yaml'),
    all = require('require-tree');

function Services(options, store) {

    this.options = options;

    this.store = store;

    this.tasks = [];

    this.availableServices = _.mapValues(all(path.join(__dirname, './built-in'), {
        index: 'preserve'
    }), function(val) {
        return val.index;
    });

    this.agenda = new Agenda({
        db: {
            address: 'localhost:27017/flow-agenda'
        },
        defaultLockLifetime: 30 * 1000
    });

}

Services.prototype.save = function(id, data) {

    this.store.set(id, data);

};

Services.prototype.loadServices = function(cb) {

    var that = this;

    glob(path.join(__dirname, '../../../tasks/*.yml'), function(err, files) {

        if (err) {
            throw err;
        }

        _.each(files, function(file) {

            var context = yaml.safeLoad(fs.readFileSync(file, 'utf8')),
                Service = that.availableServices[context.service],
                service = new Service(context);

            that.agenda.define(context.id, function(task, done) {
                service.fetch(function(err, data) {
                    done();
                    if (err) {
                        console.error(err);
                        return;
                    }
                    that.save('task:' + context.id, data);
                });
            });

            that.agenda.every(context.interval, context.id);

            that.agenda.now(context.id);

            that.agenda.on('fail:' + context.id, function(err) {
                console.log('[%s] Task failed with error: %s', context.id, err.message);
            });

            that.tasks.push(service);

        });

        typeof cb === 'function' && cb(null, that.tasks);

    });

};

Services.prototype.start = function(cb) {

    this.loadServices(function(err, tasks) {

        var messages = [];

        _.each(tasks, function(task) {
            messages.push('Loaded: ' + (task.options.service + '/' + task.options.id).magenta);
        });

        typeof cb === 'function' && cb(err, messages);

        this.agenda.start();

    }.bind(this));

};

module.exports = Services;
