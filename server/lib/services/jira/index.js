'use strict';

function Provider(options) {

    this.options = options;

}

Provider.prototype.fetch = function(done, job) {

    console.log('got');

    done();

}

module.exports = Provider;