'use strict';

module.exports = function(web, server, io) {

    web.on('task:data', function(data, task) {

        web.io.sockets.emit('task:data', data, task);

    });

    io.on('connection', function(socket) {

        web.emit('board:get', function(data, board) {

            socket.emit('board:data', data, board);

        });

    });

};
