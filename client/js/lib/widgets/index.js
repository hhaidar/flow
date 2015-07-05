'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        background: 'rgba(0, 0, 0, .4)',
        padding: '40px',
        position: 'absolute',
        boxSizing: 'border-box'
    },
    text: {
        title: {
            textAlign: 'center',
            fontSize: '80px',
            fontWeight: '600',
            fontFamily: 'Oswald',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginBottom: '40px'
        },
        subtitle: {
            fontSize: '20px',
            textTransform: 'uppercase'
        }
    }
};

var Widget = React.createClass({
    render: function() {
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
                {
                    this.props.title &&
                    <h2 style={[styles.text.title, { marginBottom: '20px' }]}>{ this.props.title }</h2>
                }
                { this.props.children }
            </div>
        );
    }
});

module.exports = Radium(Widget);
