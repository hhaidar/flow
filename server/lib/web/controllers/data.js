'use strict';

module.exports = function(core, web) {

    core.on('task:data', function(data, task) {

        web.io.sockets.emit('task:data', data, task);

        console.log('core!');

    });

    web.io.on('connection', function(socket) {

        core.emit('board:get', function(data, board) {

            socket.emit('board:data', data, board); 

        });

    });

}