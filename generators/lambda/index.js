'use strict';
var yeoman = require('yeoman-generator');
var extend = require('deep-extend');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('We need to set up a few parameters for your Lambda function.');

    var prompts = [{
      name: 'region',
      message: 'In what region would you like to deploy your lambda function?',
      default: 'us-east-1'
    }, {
      name: 'bucket',
      message: 'What bucket should we upload your code to?',
      default: this.options.name
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.directory(this.templatePath('octoturtle'),
        this.destinationPath('octoturtle'));
    this.template(this.templatePath('settings.yml'),
        this.destinationPath('settings.yml'), {
          name: this.options.name,
          region: this.props.region,
          bucket: this.props.bucket
        }
    );

    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      dependencies: {
        octoturtle: '~1.0.0'
      }
    });
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
});
