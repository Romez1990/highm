/* eslint-disable */
const EnvError = require('./EnvError');

function env(name) {
  const value = process.env[name];
  if (typeof value === 'undefined') {
    throw new EnvError(`${name} is undefined`);
  }
  return value;
}

module.exports = {
  env,
};
