'use strict';

module.exports = function(web, server, io) {

    web.server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
        }
    });

}