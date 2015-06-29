'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    path = require('path');

var pipeline = [

    function getDefaultSettings(context) {
        var file = fs.readFileSync(path.join(__dirname, 'defaults.yml'), 'utf8');
        context.defaults = yaml.safeLoad(file);
    },

    function getFileSettings(context) {
        if (fs.existsSync('settings.yml')) {
            var file = fs.readFileSync('settings.yml', 'utf8');
            context.file = yaml.safeLoad(file) || {};
        } else {
            context.file = {};
        }
    },

    function mergeDefaultAndFileSettings(context) {
        context.result = _.merge(context.defaults, context.file);
    }

];

var context = {};

_.each(pipeline, function(step) {
    step(context);
});

module.exports = context.result;
