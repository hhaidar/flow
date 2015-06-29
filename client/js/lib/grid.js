'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        position: 'absolute',
        width: 1921,
        height: 1081,
        overflow: 'visible'
    }
}

var Grid = React.createClass({
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" style={[styles.base]}>
                <defs>
                    <pattern id="grid" width="320" height="270" patternUnits="userSpaceOnUse">
                        <path d="M 320 0 L 0 0 0 270" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        );
    }
});

module.exports = Radium(Grid);