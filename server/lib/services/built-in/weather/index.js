'use strict';

var Forecast = require('forecast');

function Provider(options) {

    this.options = options;

    this.client = new Forecast({
        service: options.source || 'forecast.io',
        key: options.key,
        units: 'celcius',
        cache: true,
        ttl: {
            minutes: 30
        }
    });

}

Provider.prototype.fetch = function(done) {

    this.client.get(this.options.location, function(err, weather) {
        if (err) {
            throw err;
        }
        done(null, {
            summary: weather.currently.summary,
            icon: weather.currently.icon,
            temperature: weather.currently.temperature,
            timezone: weather.timezone
        });
    });

};

module.exports = Provider;
