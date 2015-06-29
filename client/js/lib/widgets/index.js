'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        background: 'orange'
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
            <div className="fx-widget" style={[styles.base]}>
                { this.props.children }
            </div>
        );
    }
});

module.exports = Radium(Widget);