'use strict';

var events = require('eventemitter2');

function Core(options) {

    this.options = options;

    this.events = new events.EventEmitter2();

    this.emit = this.events.emit;

    this.on = this.events.on;

}

Core.prototype.start = function(cb) {

    typeof cb === 'function' && cb();

};

module.exports = Core;
