'use strict';

var React = require('react'),
    Radium = require('radium'),
    Widget = require('.');

var options = {
    radius: 100,
    stroke: 15
};

var styles = {
    base: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        stroke: 'rgba(255, 255, 255, .8)',
        strokeWidth: options.stroke
    },
    progress: {
        stroke: '#9EBF6D',
        strokeWidth: options.stroke
    },
    visual: {
        width: '100%',
        position: 'relative'
    },
    meta: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: '0',
        left: '0'
    },
    count: {
        fontSize: '70px',
        fontFamily: 'Oswald',
        fontWeight: '600',
        letterSpacing: '5px'
    }
};

var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

// via https://github.com/crisbeto/angular-svg-round-progressbar <3
var arc = function(val, total, radius, size) {

    var value = val >= total ? total - 0.00001 : val,
        perc = total === 0 ? 0 : (value / total) * 359.9999,
        x = size / 2,
        start = polarToCartesian(x, x, radius, perc),
        end = polarToCartesian(x, x, radius, 0),
        arcSweep = (perc <= 180 ? '0' : '1');

    return [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(' ');

};

var Status = React.createClass({
    render: function() {
        return (
            <Widget {...this.props}>
                <div style={[styles.base]}>
                    <div style={[styles.visual]}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 ' + options.radius * 2 + ' ' + options.radius * 2} width="60%">
                            <circle
                                fill="rgba(0, 0, 0, .2"
                                style={[
                                    styles.background
                                ]}
                                cx={options.radius}
                                cy={options.radius}
                                r={options.radius - options.stroke / 2}
                                />
                            <path fill="none"
                                style={[
                                    styles.progress,
                                    {
                                        stroke: this.props.total === this.props.value ? '#9EBF6D' : '#b91d47'
                                    }
                                ]}
                                d={arc(this.props.value, this.props.total, options.radius - options.stroke / 2, options.radius * 2)}
                                />
                        </svg>
                        <div style={[styles.meta]}>
                            <span style={[styles.count]}>
                                {this.props.value}
                                <small style={[{ fontSize: '80%', fontWeight: '300', marginLeft: '12px' }]}>/ {this.props.total}</small>
                            </span>
                        </div>
                    </div>
                </div>
            </Widget>
        );
    }
});




module.exports = Radium(Status);
