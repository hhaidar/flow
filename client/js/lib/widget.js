'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        background: 'orange'
    }
}

var Widget = React.createClass({
    render() {
        return (
            <div style={[styles.base]}>
                wat.
            </div>
        );
    }
});

module.exports = Radium(Widget);