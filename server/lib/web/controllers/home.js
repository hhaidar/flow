'use strict';

module.exports = function(web, server) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
        }
    });

};
