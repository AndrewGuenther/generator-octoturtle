var octoturtle = require('octoturtle');
var config = require('./config.json');

var whenAn = octoturtle;
var github = new octoturtle.Github(config.GITHUB_USER, config.GITHUB_TOKEN);

var hook = whenAn('issues').is('opened').to('octoturtle');

/**
 * Checks if the body of the item contains the string "dibs".
 * @param {String} event The type of event
 * @param {Payload} payload The hook payload
 */
function bodyContainsDibs(event, payload) {
  payload.getIssueBody().includes('dibs');
}

hook.if(bodyContainsDibs, github.applyLabels(['dibs']));

module.exports = [hook];
