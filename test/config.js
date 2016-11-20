'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-octoturtle:config', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/config'))
      .withPrompts({
        user: 'AndrewGuenther',
        token: 'A45GE56F',
        secret: 'SECRETS',
        path: '/octoturtle'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'config.json'
    ]);
  });

  it('sets config values properly', function () {
    assert.jsonFileContent('config.json', {
      GITHUB_USER: 'AndrewGuenther',
      GITHUB_TOKEN: 'A45GE56F',
      HOOK_SECRET: 'SECRETS',
      HOOK_PATH: '/octoturtle'
    });
  });
});
