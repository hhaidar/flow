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
    var art = fs.readFileSync(path.join(__dirname, './misc/art.txt'), 'utf8').red;
    console.log('\n' + art, '\n', 'Release ' + psjon.version.red + '\n');
    services.start();
});