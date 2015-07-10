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
    getInitialState: function() {
        return {
            location: 'Toronto, ON',
            temperature: {
                celsius: 22,
                fahrenheit: 78
            }
        };
    },
    render: function() {
        return (
            <Widget {...this.props}>
                <div style={[styles.base]}>
                    <span style={[styles.skycon]}>
                        <Skycons color='white' icon='PARTLY_CLOUDY_DAY' autoplay={true} />
                    </span>
                    <span style={[styles.temperature]}>
                        {this.state.temperature.celsius}
                        <small style={[{ fontSize: '80%', fontWeight: '300', marginLeft: '10px' }]}>
                            c
                        </small>
                    </span>
                    <span style={[styles.location]}>
                        {this.state.location}
                    </span>
                </div>
            </Widget>
        );
    }
});

module.exports = Radium(Weather);
