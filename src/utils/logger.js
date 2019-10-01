const LOG_LEVEL = require('../server/config/appConfig').LOG_LEVEL;
/* eslint-disable no-console */
const util = require('util');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const consoleLog = {
  // Called whenever there's an error on the server we want to print
  log: (...msg) => {
    if (LOG_LEVEL === 'log' || LOG_LEVEL === 'debug') {
      console.log(new Date().toISOString(), ...msg);
    }
  },

  // Called whenever there's an Warning on the server we want to print
  warn: (...msg) => {
    if (LOG_LEVEL === 'warn' || LOG_LEVEL === 'debug') {
      console.warn(
        new Date().toISOString(),
        util.inspect(msg, { showHidden: false, depth: null }),
      );
    }
  },

  // Called whenever there's an error on the server we want to print
  error: (...err) => {
    if (LOG_LEVEL === 'error' || LOG_LEVEL === 'debug') {
      console.error(
        new Date().toISOString(),
        util.inspect(err, { showHidden: false, depth: null }),
      );
    }
  },

  // Called whenever an information that is useful to the running and management of the system we want to print
  info: (...msg) => {
    if (LOG_LEVEL === 'info' || LOG_LEVEL === 'debug') {
      console.info(new Date().toISOString(), ...msg);
    }
  },

  // Can be used for logging time using console.time
  time: (str) => {
    if (LOG_LEVEL === 'time' || LOG_LEVEL === 'debug') {
      console.time(str);
    }
  },

  // Can be used for logging time using console.time
  timeEnd: (str) => {
    if (LOG_LEVEL === 'time' || LOG_LEVEL === 'debug') {
      console.timeEnd(str);
    }
  },
};

module.exports = consoleLog;
