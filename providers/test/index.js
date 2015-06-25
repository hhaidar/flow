'use strict';

function Provider(options) {

    this.options = options;

}

Provider.prototype.fetch = function() {

    console.log('got');

}

module.exports = Provider;