/* eslint-disable */
const { env } = require('./src/EnvConfig');

module.exports = {
  env: {
    SERVER_URL: env('SERVER_URL'),
  },
};
