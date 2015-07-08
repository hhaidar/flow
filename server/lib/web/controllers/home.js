'use strict';

module.exports = function(core, web) {

    web.server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index');
        }
    });

}