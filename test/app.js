'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-octoturtle:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'octoturtle-test',
        backend: 'Express'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '../octoturtle-test',
      'package.json',
      '.gitignore'
    ]);
  });
});
