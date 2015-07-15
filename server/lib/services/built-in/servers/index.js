'use strict';

var async   = require('async'),
    request = require('request'),
    _       = require('lodash');


function Provider(options) {
    this.options = options;
    this.servers = options.servers;
}

Provider.prototype.fetch = function(done) {

    var that = this;
    var servers = that.servers
    
    var requests = [];
    _.each(that.servers || false, function (server, name) {
        requests.push(function (callback) {
            request({
                uri: server,
                method: 'GET',
                timeout: 10 * 1000
            }, function (err, res, body) {
                var current = {name: server}
                if (err) {
                    current.status = 'down';
                } else {
                    current.status = 'up';
                }
                callback(null, current);
            });
        });
    });

    async.parallel(requests, function(error, servers) {
        var servers_up = _(servers).filter(function (server) {
            return server.status !== 'down';
        });
        var servers_down = _(that.servers).filter(function (server) {
            return server.status === 'down';
        });
        var total_servers = _(that.servers).size();
        var percent_up = Math.floor(_(servers_up).size() / total_servers * 100);

        var data = {
            servers: servers,
            percent_up: percent_up
        };

        console.log(data.servers);
        done(null, {data: data});
    });

};

module.exports = Provider;
