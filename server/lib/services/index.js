'use strict';

var _ = require('lodash'),
    Agenda = require('agenda');

function Services(options) {

    this.options = options;

    this.agenda = new Agenda({
        db: {
            address: 'localhost:27017/agenda-flow'
        }
    });

}

Services.prototype.load = function() {

    this.agenda.define('testing', function(job, done) {
        done();
    });

    this.agenda.every('5 seconds', 'testing');

}

Services.prototype.start = function() {

    this.load();

    this.agenda.start();

    typeof cb === 'function' && cb();

}

module.exports = Services;