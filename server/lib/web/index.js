'use strict';

var Hapi = require('hapi'),
    nunjucks = require('nunjucks-hapi'),
    path = require('path');

function Web(options) {

    var server = this.server = new Hapi.Server();

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

    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: path.join(__dirname, '../../../client/build')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
        }
    });

}

Web.prototype.start = function(cb) {

    this.server.start(function() {
        typeof cb === 'function' && cb();
    });

};

module.exports = Web;
