'use strict';

var colors = require('colors'),
    fs = require('fs'),
    path = require('path');

var settings = require('./config'),
    psjon = require('../package.json');

var Core = require('./lib/core'),
    Web = require('./lib/web'),
    Services = require('./lib/services');

var web = new Web(settings),
    services = new Services(settings),
    core = new Core(settings, {
        web: web,
        services: services
    });

core.start(function() {
    var art = fs.readFileSync(path.join(__dirname, './misc/art.txt'), 'utf8').magenta;
    console.log(art + '\nRelease ' + colors.yellow(psjon.version) + '\n');
    services.start(function() {
        web.start();
    });
});
