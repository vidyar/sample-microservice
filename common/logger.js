'use strict';

var winston = require('winston');

var WinstonFileTransport = winston.transports.File,
  WinstonConsoleTransport = winston.transports.Console;

configLevel();

exports = winston;
module.exports = winston;
global.logger = winston;

exports.configLevel = configLevel;

function configLevel(config) {
  winston.clear();
  var nm = 'microbe';

  config = config || {};

  winston.add(WinstonConsoleTransport, {
    timestamp: true,
    colorize: true,
    level: config.logLevel || 'debug'
  });

  winston.add(WinstonFileTransport, {
    name: 'file#out',
    timestamp: true,
    colorize: true,
    filename: 'logs/' + nm + '_' + process.env.MODE + '_' +
      (process.env.INSTANCE_NUMBER || 0) + '_out.log',
    maxsize: 10485760, // maxsize: 10mb
    maxFiles: 20,
    level: config.logLevel || 'debug',
    json: false
  });

  winston.add(WinstonFileTransport, {
    name: 'file#err',
    timestamp: true,
    colorize: true,
    filename: 'logs/' + nm + '_' + process.env.MODE + '_' +
      (process.env.INSTANCE_NUMBER || 0) + '_err.log',
    maxsize: 10485760, // maxsize: 10mb
    maxFiles: 20,
    level: 'error',
    json: false
  });
}
