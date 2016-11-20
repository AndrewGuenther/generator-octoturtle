'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-octoturtle:express', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/express'))
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'hooks.js',
      'server.js'
    ]);
  });

  it('includes the necessary dependencies', function () {
    assert.jsonFileContent('package.json', {
      dependencies: {
        octoturtle: '~1.0.0',
        'body-parser': '~1.15.0',
        express: '~4.13.4',
        'express-x-hub': '~1.0.4'
      }
    });
  });
});
