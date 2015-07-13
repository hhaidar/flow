'use strict';

var _ = require('lodash'),
    async = require('async'),
    colors = require('colors'),
    fs = require('fs'),
    path = require('path');

var settings = require('./config'),
    psjon = require('../package.json');

var Store = require('./lib/store'),
    Web = require('./lib/web'),
    Services = require('./lib/services');

var store = new Store(settings),
    web = new Web(settings, store),
    services = new Services(settings, store);

var output = [];

async.eachSeries([store, web, services], function(component, cb) {

    component.start(function(err, messages) {
        if (err) {
            throw err;
        }
        messages && output.push(messages);
        cb();
    });

}, function(err) {

    if (err) {
        throw err;
    }

    var art = fs.readFileSync(path.join(__dirname, './misc/art.txt'), 'utf8').magenta;
    console.log(art + '\nRelease ' + colors.yellow(psjon.version) + '\n');

    _.each(output, function(messages) {
        _.each(messages, function(message) {
            console.log(message);
        });
    });

});
