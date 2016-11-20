'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('We need some information to configure your Github integration.');
    var prompts = [{
      name: 'user',
      message: 'What is your Github username?'
    }, {
      name: 'token',
      message: 'What is your Github API token?'
    }, {
      name: 'secret',
      message: 'What is your webhook secret?'
    }, {
      name: 'path',
      message: 'What path should your webhook listen on?',
      default: '/'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.writeJSON(this.destinationPath('config.json'), {
      GITHUB_USER: this.props.user,
      GITHUB_TOKEN: this.props.token,
      HOOK_SECRET: this.props.secret,
      HOOK_PATH: this.props.path
    });
  }
});
