'use strict';

var _ = require('lodash'),
    Agenda = require('agenda'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    yaml = require('js-yaml'),
    all = require('require-tree');

function Services(options) {

    this.options = options;

    this.availableServices = _.mapValues(all(__dirname, {
        index: 'preserve'
    }), function(val, key) {
        return val.index;
    });

    this.tasks = [];

    this.agenda = new Agenda({
        db: {
            address: 'localhost:27017/agenda-flow'
        }
    });

}

Services.prototype.load = function() {

    glob(path.join(__dirname, '../../../tasks/*.yml'), function(err, files) {
        if (err) {
            console.error('Error loading tasks:', err);
            return;
        }
        _.each(files, function(file) {
            var context = yaml.safeLoad(fs.readFileSync(file, 'utf8')),
                Service = this.availableServices[context.service],
                service = new Service(context);
            console.log('Loaded: ' + (context.service + '/' + context.id).magenta);
            this.agenda.define(context.id, service.fetch);
            this.agenda.every(context.interval, context.id);
            this.tasks.push(service);
        }.bind(this));
    }.bind(this));

    glob(path.join(__dirname, '../../../tasks/*.yml'), function(err, files) {
        if (err) {
            console.error('Error loading tasks:', err);
            return;
        }
        _.each(files, function(file) {
            var context = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
            this.tasks.push(context);
        }.bind(this));
    }.bind(this));

}

Services.prototype.start = function() {

    this.load();

    this.agenda.start();

    typeof cb === 'function' && cb();

}

module.exports = Services;