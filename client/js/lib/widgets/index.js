'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        background: 'purple',
        position: 'absolute',
        boxSizing: 'border-box'
    },
    text: {
        big: {
            fontSize: '100px'
        },
        subtitle: {
            fontSize: '20px',
            textTransform: 'uppercase'
        }
    }
}

var Widget = React.createClass({
    render() {
        return (
            <div className="fx-widget" style={
                    [
                        styles.base,
                        {
                            width: (1920 / 6) * this.props.width,
                            height: (1080 / 4) * this.props.height,
                            top: (1080 / 4) * this.props.y,
                            left: (1920 / 6) * this.props.x
                        }
                    ]
                }>
                { this.props.children }
            </div>
        );
    }
});

module.exports = Radium(Widget);