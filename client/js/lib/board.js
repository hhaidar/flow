'use strict';

var React = require('react'),
    Radium = require('radium');

var styles = {
    base: {
        width: '1920px',
        height: '1080px',
        marginTop: -1080 / 2,
        marginLeft: -1920 / 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxSizing: 'border-box'
    }
}

var Board = React.createClass({
    getInitialState: function() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },
    handleResize: function(e) {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render() {
        return (
            <div className="fx-board" style={[styles.base, {
                transform: 'scale(' + Math.min(this.state.windowWidth / 1920, this.state.windowHeight / 1080) + ')'
            }]}>
            </div>
        );
    }
});

module.exports = Radium(Board);