'use strict';

var _ = require('lodash'),
    Agenda = require('agenda'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    yaml = require('js-yaml'),
    all = require('require-tree'),
    events = require('eventemitter2');

function Services(options) {

    this.options = options;

    this.events = new events.EventEmitter2;

    this.tasks = [];

    this.store = {};

    this.availableServices = _.mapValues(all(path.join(__dirname, './built-in'), {
        index: 'preserve'
    }), function(val, key) {
        return val.index;
    });

    this.agenda = new Agenda({
        db: {
            address: 'localhost:27017/agenda-flow'
        }
    });

}

Services.prototype.emit = function(event, data) {

    return this.events.emit(event, data);

}

Services.prototype.on = function(event, fn) {

    return this.events.on(event, fn);

}


Services.prototype.save = function(id, data) {

    this.store[id] = data;

    this.emit('task:data', {
        id: id,
        data: data
    });

}

Services.prototype.load = function() {

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
                    that.save(context.id, data);
                    done();
                });
            });

            that.agenda.every(context.interval, context.id);

            that.agenda.on('fail:' + context.id, function(err, job) {
                console.log('[%s] Job failed with error: %s', context.id, err.message);
            });

            that.tasks.push(service);

        });
    });

}

Services.prototype.start = function() {

    this.load();

    this.agenda.start();

    typeof cb === 'function' && cb();

}

module.exports = Services;