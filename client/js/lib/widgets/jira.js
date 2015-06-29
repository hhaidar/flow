'use strict';

var React = require('react'),
    Radium = require('radium'),
    Widget = require('.');

var styles = {
    base: {
        background: 'orange'
    }
}

var Jira = React.createClass({
    render() {
        return (
            <Widget>
                JIRA
            </Widget>
        );
    }
});

module.exports = Radium(Jira);