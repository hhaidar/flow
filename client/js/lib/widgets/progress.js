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

var Progress = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    getTotal: function() {
        var sum = 0;
        _.each(this.props.source, function(state) {
            sum += state.count;
        });
        return sum;
    },
    render: function() {

        var that = this;

        return (
            <Widget {...this.props}>
                <div style={[styles.progress]}>
                    {this.props.source && this.props.source.map(function(state) {
                        return (
                            <div key={state.id} style={[styles.bar, {
                                background: state.color,
                                width: (state.count / that.getTotal() * 100) + '%'
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

module.exports = Radium(Progress);
