'use strict';

var _       = require('lodash'),
    request = require('request');
    
function Provider(options) {
    this.options = options;
}

Provider.prototype.fetch = function(done) {

    var colorMap = {
        'red':      'failure',
        'blue':     'success',
        'white':    'success',   // this is actually 'running'
        'aborted':  'failure',
        'disabled': 'success',
        'yellow':   'success'   // warning
    };
    request.get({
        url: this.options.url,
        json: true
    }, function (error, response, body) {
        var jobs = _(body.jobs).countBy(function (job) {
            return colorMap[job.color]
        }).value()
        var data = {
            value: jobs.success, 
            total: jobs.success + jobs.failure
        }
        done(null, data);
    });

};

module.exports = Provider;
