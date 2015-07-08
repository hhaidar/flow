'use strict';

var _ = require('lodash'),
    Hapi = require('hapi'),
    nunjucks = require('nunjucks-hapi'),
    path = require('path'),
    all = require('require-tree');

function Web(core, options) {

    this.options = options;

    this.core = core;

    this.server = new Hapi.Server();

    this.server.connection({
        host: options.host,
        port: options.port
    });

    this.server.register([  {
        register: require('hapi-io')
    }], function (err) {
        if (err) {
            console.error('Failed to load plugin:', err);
        }
    });

    this.io = this.server.plugins['hapi-io'].io;

    this.server.views({
        engines: {
            html: nunjucks
        },
        relativeTo: __dirname,
        path: '../../../client/views',
        isCached: false
    });

}

Web.prototype.loadControllers = function() {

    var controllers = all(path.join(__dirname, './controllers'));

    _.each(controllers, function(controller) {
        controller(this.core, this);
    }.bind(this));

}

Web.prototype.start = function(cb) {

    this.loadControllers();

    this.server.start(function() {

        typeof cb === 'function' && cb();

    });

};

module.exports = Web;
