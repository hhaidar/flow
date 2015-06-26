'use strict';

var _ = require('lodash');

var Client = require('jira').JiraApi;

function Provider(options) {

    this.options = options;

    this.client = new Client(
        'https',
        options.host,
        options.port || 443,
        options.username,
        options.password,
        options.api || 'latest'
    );

}

Provider.prototype.fetch = function(done) {

    var query = 'project = ' + this.options.project + ' '
        + 'AND status in (Open, "In Progress", TODO, "Code Review", Deployable) '
        + 'AND Sprint = 27 ';

    this.client.searchJira(query, {}, function(err, results) {
        var tickets = _.map(results.issues, function(issue) {
            return issue.fields
        });
        done(null, tickets);
    });

}

module.exports = Provider;