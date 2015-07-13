'use strict';

module.exports = function(web, server, io, store) {

    store.on('task:update', function(data, task) {

        web.io.sockets.emit('task:update', data, task);

    });

    io.on('connection', function(socket) {

        web.emit('board:get', function(data, board) {

            socket.emit('board:data', data, board);

        });

    });

};
