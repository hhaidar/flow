'use strict';

var colors = require('colors'),
    program = require('commander'),
    glob = require('glob'),
    path = require('path');

var Services = require('./server/lib/services');

var pjson = require('./package.json');

var services = new Services();

program
    .version(pjson.version)
    .command('run <task file>')
    .action(function(file) {

        glob(path.join(__dirname, file), function(err, files) {

            if (err) {
                throw err;
            }

            if (files.length === 0) {
                console.log('Task not found...'.orange);
                return;
            }

            services.loadService(files[0], function(err, service, context) {

                if (err) {
                    throw err;
                }

                console.log('Running ['.magenta + context.id.cyan + ']'.magenta);

                service.fetch(function(err, data) {

                    if (err) {
                        console.error(err.red);
                        return;
                    }

                    console.log(data);

                });

            });

        });

    });

program.parse(process.argv);
