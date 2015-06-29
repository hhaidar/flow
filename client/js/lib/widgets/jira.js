'use strict';

var React = require('react'),
    Radium = require('radium'),
    Widget = require('.');

var styles = {
    base: {
        background: 'rgba(200, 0, 255, .4)',
        width: '100%',
        height: '100%'
    }
}

var Jira = React.createClass({
    render() {
        return (
            <Widget {...this.props}>
                <div style={[styles.base]}>
                    JIRA!
                </div>
            </Widget>
        );
    }
});

module.exports = Radium(Jira);