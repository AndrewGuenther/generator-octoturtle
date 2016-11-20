'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-octoturtle:lambda', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/lambda'))
      .withOptions({
        name: 'octoturtle-test'
      })
      .withPrompts({
        region: 'us-west-2',
        bucket: 'myOctoturtleCode'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'settings.yml',
      'octoturtle/handler.js',
      'octoturtle/hooks.js',
      'octoturtle/index.js',
      'octoturtle/settings.yml'
    ]);
  });

  it('fills the settings with the expected values', function () {
    assert.fileContent('settings.yml', 'project: octoturtle-test');
    assert.fileContent('settings.yml', 'default-region: us-west-2');
    assert.fileContent('settings.yml', 'code-bucket: myOctoturtleCode');
  });
});
