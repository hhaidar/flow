'use strict';

var _ = require('lodash');

var Client = require('jira').JiraApi;

function Provider(options) {

    this.options = options;

    this.options.rapidID = options.rapidViewID || options.rapidViewId;

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

    var that = this;

    this.client.getLastSprintForRapidView(this.options.rapidViewID, function(err, sprint) {

        if (err) {
            throw err;
            return;
        }

        that.client.getSprintIssues(that.options.rapidViewID, sprint.id, function(err, issues) {

            if (err) {
                throw err;
                return;
            }

            var combined = issues.contents.completedIssues.concat(issues.contents.incompletedIssues);

            var results = _.map(that.options.statuses, function(status) {
                var matches = _.filter(combined, function(issue) {
                    return (status.name.toLowerCase() === issue.status.name.toLowerCase())
                    || (_.contains(status.map, issue.status.name.toLowerCase()));
                });
                return {
                    id: status.name,
                    label: status.name,
                    color: status.color,
                    count: _.size(matches)
                };
            });

            done(null, {
                subtitle: issues.sprint.name,
                data: results
            });

        });
    });

};

module.exports = Provider;
