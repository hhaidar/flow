'use strict';

var _ = require('lodash'),
    React = require('react'),
    Radium = require('radium'),
    io = require('socket.io-client');

var Grid = require('./grid');

var Clock = require('./widgets/clock'),
    Weather = require('./widgets/weather'),
    Progress = require('./widgets/progress'),
    Status = require('./widgets/status');

var styles = {
    base: {
        background: 'rgba(0, 0, 0, .2)',
        width: '1920px',
        height: '1080px',
        marginTop: -1080 / 2,
        marginLeft: -1920 / 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxSizing: 'border-box'
    }
};

var Board = React.createClass({
    getInitialState: function() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            tasks: {}
        };
    },
    handleResize: function() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    },
    componentWillMount: function() {

        var that = this;

        this.socket = io.connect();

        this.socket.on('connect', function() {

            that.socket.emit('tasks:get', function(tasks) {
                _.each(tasks, function(task) {
                    that.setState(function(state) {
                        state.tasks[task.id] = task.data;
                        return state;
                    });
                });
            });

        });

        this.socket.on('task:update', function(data, task) {
            that.setState(function(state) {
                state.tasks[task.id] = data;
                return state;
            });
        });

    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function() {
        return (
            <div className="fx-board"
                style={
                    [
                        styles.base,
                        {
                            transform: 'scale(' + Math.min(this.state.windowWidth / 1920, this.state.windowHeight / 1080) + ')'
                        }
                    ]
                }
            >
                <Grid />
                <Clock width="2" height="1" x="4" y="0" />
                <Weather width="2" height="1" x="4" y="1" />
                <Progress source={this.state.tasks['jira-sde']} title="Jira" subtitle="Version 3.3 &mdash; Sprint 14" width="4" height="2" x="0" y="0" />
                <Status title="Production" width="2" height="2" x="0" y="2" value="15" total="22" />
                <Status title="Internal" width="2" height="2" x="2" y="2" value="7" total="7" />
                <Status source={this.state.tasks['jenkins-sde']} title="Jenkins" width="2" height="2" x="4" y="2" />
            </div>
        );
    }
});

module.exports = Radium(Board);
