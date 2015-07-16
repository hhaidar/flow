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

}

Services.prototype.save = function(id, data) {

    this.store.set(id, data);

};

Services.prototype.loadService = function(file, cb) {

    var context = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

    if (!context.service || !context.id) {
        cb('Error loading: ' + file);
        return;
    }

    var Service = this.availableServices[context.service];

    if (typeof Service !== 'function') {
        cb('Could not find service: ' + context.service.magenta);
        return;
    }

    var service = new Service(context);

    typeof cb === 'function' && cb(null, service, context);

}

Services.prototype.loadServices = function(cb) {

    var that = this,
        messages = [];

    glob(path.join(__dirname, '../../../tasks/*.yml'), function(err, files) {

        if (err) {
            throw err;
        }

        _.each(files, function(file) {

            that.loadService(file, function(err, service, context) {

                if (err) {
                    messages.push(err);
                    return;
                }

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

                messages.push('Loaded: ' + (context.service + '/' + context.id).magenta)

            })

        });

        that.store.setTasks(that.tasks);

        typeof cb === 'function' && cb(null, this.tasks, messages);

    });

};

Services.prototype.start = function(cb) {

    this.agenda = new Agenda({
        db: {
            address: this.options.database,
            collection: this.options.collections.agenda
        },
        defaultLockLifetime: 30 * 1000
    });

    this.loadServices(function(err, tasks, output) {

        typeof cb === 'function' && cb(err, output);

        this.agenda.start();

    }.bind(this));

};

module.exports = Services;
