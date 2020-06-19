const { pipe } = require('ramda');
const withImages = require('next-images');
const { env, envBool } = require('./src/EnvConfig');

const decorators = pipe(withImages);

const config = {
  env: {
    SERVER_URL: env('SERVER_URL'),
    USE_HTTPS: envBool('USE_HTTPS'),
  },
};

module.exports = decorators(config);
