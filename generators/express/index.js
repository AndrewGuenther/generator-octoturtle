'use strict';
var yeoman = require('yeoman-generator');
var extend = require('deep-extend');

module.exports = yeoman.Base.extend({
  writing: function () {
    this.directory(this.templatePath(), this.destinationPath());

    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      dependencies: {
        octoturtle: '~1.0.0',
        'body-parser': '~1.15.0',
        express: '~4.13.4',
        'express-x-hub': '~1.0.4'
      }
    });
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
});
