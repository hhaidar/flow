'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    path = require('path');

function parseEnvValue(value, isArray) {
    value = value.trim();
    if (isArray) {
        return _.map(value.split(','), function(value) {
            return parseEnvValue(value);
        });
    }
    // YAML compatible boolean values
    else if (/^(y|yes|true|on)$/i.test(value)) {
        return true;
    }
    else if (/^(n|no|false|off)$/i.test(value)) {
        return false;
    }
    else if (/^[+-]?\d+.?\d*$/.test(value) &&
             !isNaN(parseInt(value, 10))) {
        return parseInt(value, 10);
    }
    return value;
}

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
