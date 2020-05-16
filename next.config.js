/* eslint-disable */
const { env, envBool } = require('./src/EnvConfig');

module.exports = {
  env: {
    SERVER_URL: env('SERVER_URL'),
    USE_HTTPS: envBool('USE_HTTPS'),
  },
};
