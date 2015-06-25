'use strict';

var nunjucks = require('nunjucks-hapi'),
    path = require('path');

var Hapi = require('hapi');

var settings = require('./config');

var server = new Hapi.Server();

server.connection({
    host: settings.host,
    port: settings.port
});

server.register({
    register: require('hapi-io')
}, function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
});

server.views({
    engines: {
        html: nunjucks
    },
    relativeTo: __dirname,
    path: '../client/views',
    isCached: false
});

server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: path.join(__dirname, '../client/public')
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

server.start(function() {
    console.log('It\'s party time on port', server.info.port);
});