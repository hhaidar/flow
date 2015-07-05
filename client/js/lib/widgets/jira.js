'use strict';

var _ = require('lodash'),
    React = require('react'),
    Radium = require('radium'),
    Widget = require('.');

var styles = {
    base: {
        background: 'rgba(200, 0, 255, .4)',
        width: '100%',
        height: '100%'
    },
    progress: {
        height: '100px'
    },
    bar: {
        background: 'orange',
        height: 'inherit',
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
        background: '#fff padding-box',
        width: '16px',
        height: '16px',
        position: 'absolute',
        top: '-65px',
        left: '50%',
        marginLeft: '-8px',
        borderRadius: '100%'
    },
    line: {
        background: '#fff',
        height: '60px',
        width: '2px',
        position: 'absolute',
        top: '-65px',
        left: '50%',
        marginLeft: '-1px'
    }
};

var data = [
    {
        id: 'todo',
        label: 'TODO',
        color: '#2b5797',
        count: 8
    },
    {
        id: 'progress',
        label: 'PROG',
        color: '#b91d47',
        count: 14
    },
    {
        id: 'review',
        label: 'REVIEW',
        color: '#e3a21a',
        count: 12
    },
    {
        id: 'qa',
        label: 'QA',
        color: '#7e3878',
        count: 12
    },
    {
        id: 'accepted',
        label: 'ACC',
        color: '#1e7145',
        count: 12
    }
]

var total = +function() {
    var sum = 0;
    _.each(data, function(state) {
        sum += state.count
    });
    return sum;
}();

var Jira = React.createClass({
    render: function() {
        return (
            <Widget {...this.props}>
                <div style={[styles.progress]}>
                    {data.map(function(state) {
                        return (
                            <div key={state.id} style={[styles.bar, {
                                background: state.color,
                                width: (state.count / total * 100) + '%'
                            }]}>
                                <div style={[styles.count]}>
                                    {state.count} {state.label}
                                    <span style={[styles.point]}></span>
                                    <span style={[styles.line]}></span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Widget>
        );
    }
});

module.exports = Radium(Jira);
