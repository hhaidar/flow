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
            fontSize: '70px',
            fontWeight: '600',
            fontFamily: 'Oswald',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginBottom: '40px'
        },
        subtitle: {
            textAlign: 'center',
            fontSize: '45px',
            marginBottom: '40px'
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
                    <h2 style={[styles.text.title]}>{ this.props.title }</h2>
                }
                {
                    this.props.title &&
                    <h3 style={[styles.text.subtitle]}>{ this.props.subtitle }</h3>
                }
                { this.props.children }
            </div>
        );
    }
});

module.exports = Radium(Widget);
