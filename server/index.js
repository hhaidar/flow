'use strict';

var colors = require('colors'),
    fs = require('fs'),
    path = require('path');

var settings = require('./config'),
    psjon = require('../package.json');

var Web = require('./lib/web'),
    Services = require('./lib/services');

var web = new Web(settings),
    services = new Services(settings);

web.start(function() {
    var art = fs.readFileSync(path.join(__dirname, './misc/art.txt'), 'utf8').cyan;
    console.log(art + '\nRelease ' + psjon.version.yellow+ '\n');
    services.start();
});

services.on('task:data', function(task) {
    console.log('got');
});