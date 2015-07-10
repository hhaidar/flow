'use strict';

var events = require('eventemitter2'),
    async = require('async');

function Core(options, components) {

    this.options = options;

    this.components = components;

    this.events = new events.EventEmitter2();

    this.emit = this.events.emit;

    this.on = this.events.on;

}

Core.prototype.start = function(cb) {

    var meta = [];

    async.eachSeries(this.components, function(component, cb) {

        component.start(function(err, messages) {
            messages && meta.push(messages);
            cb();
        });

    }, function(err) {

        typeof cb === 'function' && cb(err, meta);

    });

};

module.exports = Core;
