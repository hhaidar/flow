'use strict';

var _ = require('lodash'),
    colors = require('colors'),
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

core.start(function(err, meta) {

    if (err) {
        throw err;
    }

    var art = fs.readFileSync(path.join(__dirname, './misc/art.txt'), 'utf8').magenta;
    console.log(art + '\nRelease ' + colors.yellow(psjon.version) + '\n');

    _.each(meta, function(group) {
        _.each(group, function(messages) {
            console.log(messages);
        });
    });

});
