'use strict';

module.exports = function(web, server, io, store) {

    store.on('task:update', function(data, task) {

        io.sockets.emit('task:update', data, task);

    });

    io.on('connection', function(socket) {

        socket.on('tasks:get', function(cb) {

            store.getAll(function(err, tasks) {

                if (err) {
                    console.error(err);
                    return;
                }

                typeof cb === 'function' && cb(tasks);

            });

        });

    });

};
