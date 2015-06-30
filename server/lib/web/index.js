'use strict';

var _ = require('lodash'),
    Hapi = require('hapi'),
    nunjucks = require('nunjucks-hapi'),
    path = require('path'),
    events = require('eventemitter2'),
    all = require('require-tree');

function Web(options) {

    var server = this.server = new Hapi.Server();

    this.events = new events.EventEmitter2();

    server.connection({
        host: options.host,
        port: options.port
    });

    server.register([
        {
            register: require('hapi-io')
        }
    ], function (err) {
        if (err) {
            console.error('Failed to load plugin:', err);
        }
    });

    server.views({
        engines: {
            html: nunjucks
        },
        relativeTo: __dirname,
        path: '../../../client/views',
        isCached: false
    });

}

Web.prototype.emit = function(event, data) {

    return this.events.emit(event, data);

};

Web.prototype.on = function(event, fn) {

    return this.events.on(event, fn);

};

Web.prototype.loadControllers = function() {

    var controllers = all(path.join(__dirname, './controllers'));

    _.each(controllers, function(controller) {
        controller(this.server, this.server.plugins['hapi-io'].io);
    }.bind(this));

}

Web.prototype.start = function(cb) {

    this.loadControllers();

    this.server.start(function() {
        typeof cb === 'function' && cb();
    });

};

module.exports = Web;
