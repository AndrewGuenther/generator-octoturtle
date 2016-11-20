'use strict';
var yeoman = require('yeoman-generator');
var kebabCase = require('lodash.kebabcase');
var path = require('path');
var mkdirp = require('mkdirp');

function makeOctoturtleName(name) {
  name = kebabCase(name);
  name = name.indexOf('octoturtle-') === 0 ? name : 'octoturtle-' + name;
  return name;
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    var prompts = [{
      name: 'name',
      message: 'Your octoturtle name',
      default: makeOctoturtleName(path.basename(process.cwd())),
      filter: makeOctoturtleName,
      validate: function (str) {
        return str.length > 'generator-'.length;
      }
    }, {
      type: 'list',
      name: 'backend',
      message: 'What backend would you like to use for your Octoturtle rules?',
      choices: ['Express', 'Lambda'],
      default: 'Express'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default: {
    setup: function () {
      // istanbul ignore else
      if (path.basename(this.destinationPath()) !== this.props.name) {
        this.log(
          'Your octoturtle must be inside a folder named ' + this.props.name + '\n' +
          'I\'ll automatically create this folder.'
        );
        mkdirp(this.props.name);
        this.destinationRoot(this.destinationPath(this.props.name));
      }
    },

    npm: function () {
      this.log('Let\'s initialize your npm package...');
      this.composeWith('npm-init', {
        options: {
          'skip-main': true,
          'skip-test': true,
          'skip-keywords': true,

          name: this.props.name,
          keywords: ['octoturtle']
        }
      }, {
        local: require.resolve('generator-npm-init/app')
      });
    },

    backend: function () {
      // istanbul ignore else
      if (this.props.backend === 'Express') {
        this.composeWith('octoturtle:express', {
          options: {
            name: this.props.name
          }
        }, {
          local: require.resolve('../express')
        });
      } else if (this.props.backend === 'Lambda') {
        this.composeWith('octoturtle:lambda', {
          options: {
            name: this.props.name
          }
        }, {
          local: require.resolve('../lambda')
        });
      }
    },

    config: function () {
      this.composeWith('octoturtle:config', {}, {
        local: require.resolve('../config')
      });
    }
  },

  writing: function () {
    this.directory(this.templatePath(), this.destinationPath());
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
