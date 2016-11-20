var express = require('express');
var bodyparser = require('body-parser');
var xhub = require('express-x-hub');

var hooks = require('./hooks');
var config = require('./config.json');

/**
 * Builds a new express app which know how to evaluate hooks.
 *
 * @param  {Array}  hooks  The hooks to be evaluated when the endpoint is called.
 * @param  {Object} config Configuration information.
 * @return {Object}        An express app object which can be started by calling
 *                         listen().
 */
function createServer(hooks, config) {
  var app = express();

  if (config.HOOK_SECRET) {
    app.use(xhub({algorithm: 'sha1', secret: config.HOOK_SECRET}));
  }
  app.use(bodyparser.json());

  app.post(config.HOOK_PATH, function (req, res) {
    var event = req.get('X-GitHub-Event');
    if (event === undefined) {
      res.status(400).send({error: 'Missing event header'});
      return;
    }

    res.status(204).send();
    hooks.forEach(function (hook) {
      hook.eval(event, req.body);
    });
  });

  return app;
}

createServer(hooks, config).listen(8080, '127.0.0.1', function () {
  console.log('server has started');
});
