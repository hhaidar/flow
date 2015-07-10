'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        position: 'absolute',
        width: 1920,
        height: 1080,
        overflow: 'visible'
    }
};

var unit = {
    width: 1920 / 6,
    height: 1080 / 4
};

var path = 'M' + unit.width + ' 0 L 0 0 0 ' + unit.height;

var Grid = React.createClass({
    render: function() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" style={[styles.base]}>
                <defs>
                    <pattern id="grid" width={unit.width} height={unit.height} patternUnits="userSpaceOnUse">
                        <path d={path} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        );
    }
});

module.exports = Radium(Grid);
