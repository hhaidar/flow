'use strict';

var React = require('react'),
    Radium = require('radium'),
    Widget = require('.');

var styles = {
    base: {
        background: 'rgba(200, 0, 255, .4)',
        width: '100%',
        height: '100%'
    },
    progress: {
        height: '100px',
        padding: '20px 0'
    },
    bar: {
        background: 'orange',
        height: 'inherit',
        width: '20%',
        float: 'left'
    },
    count: {
        textAlign: 'center',
        fontSize: '35px',
        position: 'relative',
        bottom: '-100%',
        marginTop: '10px'
    },
    point: {
        background: '#fff',
        width: '16px',
        height: '16px',
        position: 'absolute',
        top: '-65px',
        left: '50%',
        marginLeft: '-8px',
        borderRadius: '100%',
        backgroundClip: 'padding-box'
    },
    line: {
        background: '#fff',
        height: '60px',
        width: '2px',
        position: 'absolute',
        top: '-60px',
        left: '50%',
        marginLeft: '-1px'
    }
};

var data = [
    {
        label: 'TODO',
        color: 'blue',
        count: 8
    },
    {
        label: 'PROG',
        color: 'red',
        count: 14
    },
    {
        label: 'REV',
        color: 'orange',
        count: 12
    },
    {
        label: 'REV',
        color: 'orange',
        count: 12
    }
]

var Jira = React.createClass({
    render: function() {
        return (
            <Widget {...this.props}>
                <div style={[styles.progress]}>
                    <div style={[styles.bar]}>
                        <div style={[styles.count]}>
                            11 TODO
                            <span style={[styles.point]}></span>
                            <span style={[styles.line]}></span>
                        </div>
                    </div>
                    <div style={[styles.bar]}>
                        <div style={[styles.count]}>
                            11 TODO
                            <span style={[styles.point]}></span>
                            <span style={[styles.line]}></span>
                        </div>
                    </div>
                    <div style={[styles.bar]}>
                        <div style={[styles.count]}>
                            11 TODO
                            <span style={[styles.point]}></span>
                            <span style={[styles.line]}></span>
                        </div>
                    </div>
                </div>
            </Widget>
        );
    }
});

module.exports = Radium(Jira);
