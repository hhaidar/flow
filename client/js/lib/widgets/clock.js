'use strict';

var moment = require('moment');

var React = require('react'),
    Radium = require('radium'),
    Widget = require('.');

var styles = {
    base: {
        height: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    time: {
        display: 'block',
        fontFamily: 'Oswald',
        fontWeight: '600',
        fontSize: '110px',
        letterSpacing: '5px'
    },
    date: {
        display: 'block',
        fontSize: '50px',
        marginTop: '20px'
    }
};

var Clock = React.createClass({
    getInitialState: function() {
        var tick = function() {
            return {
                time: moment().format('h:mm'),
                meridiem: moment().format('A'),
                date: moment().format('dddd, MMMM Do YYYY')
            };
        };
        this.timer = setInterval(function() {
            this.setState(tick());
        }.bind(this), 1 * 1000);
        return tick();
    },
    componentWillUnmount: function() {
        this.timer && clearInterval(this.timer);
    },
    render: function() {
        return (
            <Widget {...this.props}>
                <div style={[styles.base]}>
                    <time style={[styles.time]}>
                        {this.state.time}
                        <small style={[{ fontSize: '80%', fontWeight: '300', marginLeft: '10px' }]}>
                            {this.state.meridiem}
                        </small>
                    </time>
                    <time style={[styles.date]}>{this.state.date}</time>
                </div>
            </Widget>
        );
    }
});

module.exports = Radium(Clock);
