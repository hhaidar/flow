'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        background: 'orange'
    },
    text: {
        big: {
            'font-size': '100px'
        },
        subtitle: {
            'font-size': '20px',
            'text-transform': 'uppercase'
        }
    }
}

var Widget = React.createClass({
    render() {
        return (
            <div className="fx-widget" style={[styles.base]}>
                <div style={[styles.text.big]}>
                    45%
                </div>
                <div style={[styles.text.subtitle]}>
                    Servers Up
                </div>
            </div>
        );
    }
});

module.exports = Radium(Widget);