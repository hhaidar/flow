'use strict';

var React = require('react'),
    Radium = require('radium'),
    Skycons = require('react-skycons'),
    Widget = require('.');

var styles = {
    base: {
        height: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    skycon: {
        width: '50%'
    },
    temperature: {
        width: '50%',
        fontSize: '120px',
        fontWeight: '600'
    },
    location: {
        width: '100%',
        fontSize: '30px',
        marginTop: '20px'
    }
};

var Weather = React.createClass({
    normalizeSkycon: function(text) {
        if (!text) {
            return 'CLEAR_DAY';
        }
        return String(text).toUpperCase().replace(/-/, '_');
    },
    render: function() {
        return (
            <Widget {...this.props}>
                <div style={[styles.base]}>
                    <span style={[styles.skycon]}>
                        <Skycons color='white'
                            icon={this.normalizeSkycon(this.props.icon)}
                            autoplay={true} />
                    </span>
                    <span style={[styles.temperature]}>
                        {Math.floor(this.props.temperature)}
                        <small style={[{ fontSize: '80%', fontWeight: '300', marginLeft: '10px' }]}>
                            c
                        </small>
                    </span>
                    <span style={[styles.location]}>
                        {this.props.timezone}
                    </span>
                </div>
            </Widget>
        );
    }
});

module.exports = Radium(Weather);
