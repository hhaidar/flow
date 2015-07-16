'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    path = require('path'),
    program = require('commander');

program.version('1.0')
       .option('-p, --port <port>', 'port to run server on', parseInt)
       .option('-h, --host <hostname>', 'name of host to run server on')
       .option('-d, --database <database_uri>', 'uri of database to use')
       .parse(process.argv);

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
    },

    function getCommandLineArgs(context) {
        if (program.port) {
            context.result.port = program.port;
        }
        if (program.host) {
            context.result.host = program.host;
        }
        if (program.database) {
            context.result.database = program.database;
        }
    },
];

var context = {};

_.each(pipeline, function(step) {
    step(context);
});

module.exports = context.result;
