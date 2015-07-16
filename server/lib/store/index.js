'use strict';

var events = require('eventemitter2'),
    async = require('async'),
    CachemanMongo = require('cacheman-mongo');

function Store(options) {

    this.options = options;

    this.events = new events.EventEmitter2();

    this.emit = this.events.emit;

    this.on = this.events.on;

    this.tasks = [];

    this.cache = new CachemanMongo('mongodb://127.0.0.1:27017/flow-cache', {
        collection: 'cache'
    });

}

Store.prototype.get = function(id, cb) {

    this.cache.get(id, function(err, data) {

        typeof cb === 'function' && cb(err, data);

    });

};

Store.prototype.getAll = function(cb) {

    var that = this;

    async.map(this.tasks, function(task, done) {

        var id = 'task:' + task.options.id;

        that.cache.get(id, function(err, data) {

            if (err) {
                done(err);
                return;
            }

            if (!data) {
                done();
                return;
            }

            done(null, {
                id: task.options.id,
                data: data
            });

        });

    }, function(err, results) {

        typeof cb === 'function' && cb(err, results);

    });

};

Store.prototype.set = function(id, data, cb) {

    if (/^task:[a-z-_ ]+/i.test(id)) {
        this.emit('task:update', data, {
            id: id.match(/^task:([a-z-_ ]+)/)[1]
        });
    }

    this.cache.set(id, data, Infinity, function(err) {

        if (err) {
            throw err;
        }

        typeof cb === 'function' && cb();

    });

};

Store.prototype.setTasks = function(tasks, cb) {

    this.tasks = tasks;

    typeof cb === 'function' && cb();

};

Store.prototype.start = function(cb) {

    typeof cb === 'function' && cb();

};

module.exports = Store;
