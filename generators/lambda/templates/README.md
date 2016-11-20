# <%= name %>

## Creating Rules

Place your rules in `hooks.js`. You can read more about how to write auditor
rules in the [Octoturtle docs][0]

## Deploying

### Prerequisites

In order to deploy your auditor you must have [Gordon][1] installed.

```
pip install gordon
```

### Uploading to Lambda

Deploying is as simple as running the following two commands

```
gordon build
```

```
gordon apply
```

You can find more details about deploying Javascript functions to Lambda in the
[Gordon docs][2]

### Setting up your Webhook

[0]: http://ajguenther.com/octoturtle/
[1]: http://gordon.readthedocs.io/
[2]: http://gordon.readthedocs.io/en/latest/quickstart_js.html#build-your-project
