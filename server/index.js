'use strict';

var settings = require('./config');

var Web = require('./lib/web'),
    Services = require('./lib/services');

var web = new Web(settings),
    services = new Services(settings);

web.start(function() {
    console.log('It\'s party time on port', web.server.info.port);
    services.start();
});