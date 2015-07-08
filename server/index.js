'use strict';

var colors = require('colors'),
    fs = require('fs'),
    path = require('path');

var settings = require('./config'),
    psjon = require('../package.json');

var Core = require('./lib/core'),
    Web = require('./lib/web'),
    Services = require('./lib/services');

var core = new Core(settings),
    web = new Web(core, settings),
    services = new Services(core, settings);

web.start(function() {
    var art = fs.readFileSync(path.join(__dirname, './misc/art.txt'), 'utf8').magenta;
    console.log(art + '\nRelease ' + colors.yellow(psjon.version) + '\n');
    services.start();
});