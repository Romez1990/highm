/* eslint-disable */
const EnvError = require('./EnvError');

function env(name) {
  const value = process.env[name];
  if (typeof value === 'undefined') {
    throw new EnvError(`${name} is undefined`);
  }
  return value;
}

function envBool(name) {
  const value = env(name);
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  throw new EnvError(`${name} must be true of false`);
}

module.exports = {
  env,
  envBool,
};
