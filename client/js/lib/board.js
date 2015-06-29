'use strict';

var React = require('react'),
    Radium = require('radium');

var Grid = require('./grid');

var Jira = require('./widgets/jira');

var styles = {
    base: {
        background: 'rgba(0, 0, 0, .1)',
        width: '1920px',
        height: '1080px',
        marginTop: -1080 / 2,
        marginLeft: -1920 / 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxSizing: 'border-box'
    }
};

var Board = React.createClass({
    getInitialState: function() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },
    handleResize: function() {
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
    render: function() {
        return (
            <div className="fx-board"
                style={
                    [
                        styles.base,
                        {
                            transform: 'scale(' + Math.min(this.state.windowWidth / 1920, this.state.windowHeight / 1080) + ')'
                        }
                    ]
                }
            >
                <Grid />
                <Jira width="3" height="2" x="0" y="0" />
                <Jira width="1" height="1" x="2" y="2" />
                <Jira width="1" height="1" x="1" y="3" />
                <Jira width="1" height="2" x="4" y="1" />
            </div>
        );
    }
});

module.exports = Radium(Board);
