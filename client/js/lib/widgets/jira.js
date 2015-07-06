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
        height: '130px'
    },
    bar: {
        background: 'orange',
        height: 'inherit',
        float: 'left'
    },
    meta: {
        textAlign: 'center',
        fontSize: '35px',
        position: 'relative',
        bottom: '-100%',
        marginTop: '10px',
        paddingTop: '10px'
    },
    count: {
        fontWeight: '600',
        fontSize: '50px',
        fontFamily: 'Oswald',
        letterSpacing: '5px'
    },
    label: {
        display: 'block',
        marginTop: '5px'
    },
    point: {
        background: '#fff padding-box',
        width: '16px',
        height: '16px',
        position: 'absolute',
        top: '-80px',
        left: '50%',
        marginLeft: '-8px',
        borderRadius: '100%'
    },
    line: {
        background: '#fff',
        height: '80px',
        width: '2px',
        position: 'absolute',
        top: '-80px',
        left: '50%',
        marginLeft: '-1px'
    }
};

var data = [
    {
        id: 'todo',
        label: 'TO-DO',
        color: '#2b5797',
        count: 8
    },
    {
        id: 'progress',
        label: 'In Progress',
        color: '#b91d47',
        count: 14
    },
    {
        id: 'review',
        label: 'Review',
        color: '#e3a21a',
        count: 12
    },
    {
        id: 'qa',
        label: 'QA',
        color: '#7e3878',
        count: 4
    },
    {
        id: 'accepted',
        label: 'Accepted',
        color: '#9EBF6D',
        count: 21
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
                                <div style={[styles.meta]}>
                                    <span style={[styles.count]}>{state.count}</span>
                                    <span style={[styles.label]}>{state.label}</span>
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
