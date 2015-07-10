'use strict';

var _ = require('lodash'),
    Agenda = require('agenda'),
    async = require('async'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    yaml = require('js-yaml'),
    all = require('require-tree'),
    events = require('eventemitter2'),
    CachemanMongo = require('cacheman-mongo');

function Services(options) {

    this.options = options;

    this.events = new events.EventEmitter2();

    this.emit = this.events.emit;

    this.on = this.events.on;

    this.tasks = [];

    this.cache = new CachemanMongo('mongodb://127.0.0.1:27017/flow-cache', {
        collection: 'cache'
    });

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

Services.prototype.getAll = function(cb) {

    var that = this;

    async.map(this.tasks, function(task, done) {

        var id = task.options.id;

        that.cache.get(id, function(err, data) {

            if (err) {
                done(err);
                return;
            }

            if (!data) {
                done();
                return;
            }

            data.id = id;

            done(null, data);

        });

    }, function(err, results) {

        typeof cb === 'function' && cb(err, results);

    });

};

Services.prototype.save = function(id, data) {

    this.cache.set(id, data, function(err) {

        if (err) {
            throw error;
            return;
        }

        this.emit('task:data', data, {
            id: id
        });

    }.bind(this));

};

Services.prototype.loadServices = function(cb) {

    var that = this;

    glob(path.join(__dirname, '../../../tasks/*.yml'), function(err, files) {

        if (err) {
            console.error('Error loading tasks:', err);
            return;
        }

        _.each(files, function(file) {

            var context = yaml.safeLoad(fs.readFileSync(file, 'utf8')),
                Service = that.availableServices[context.service],
                service = new Service(context);

            console.log('Loaded: ' + (context.service + '/' + context.id).magenta);

            that.agenda.define(context.id, function(job, done) {
                service.fetch(function(err, data) {
                    done();
                    if (err) {
                        console.error(err);
                        return;
                    }
                    that.save(context.id, data);
                });
            });

            that.agenda.every(context.interval, context.id);

            that.agenda.now(context.id);

            that.agenda.on('fail:' + context.id, function(err) {
                console.log('[%s] Job failed with error: %s', context.id, err.message);
            });

            that.tasks.push(service);

        });

        typeof cb === 'function' && cb();

    });

};

Services.prototype.start = function(cb) {

    this.loadServices(function() {

        this.agenda.start();

        typeof cb === 'function' && cb();

    }.bind(this));

};

module.exports = Services;
