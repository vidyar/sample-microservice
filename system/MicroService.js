'use strict';
var self = MicroService;
module.exports = self;

var async = require('async');
var timeoutLength = 1;
var timeoutLimit = 512;

function MicroService() {
  logger.info('Starting MicroService');
  report();
}

MicroService.prototype.error = function (err, callback) {
  retry({
    errors: [err]
  }, callback);
};

function report() {
  var bag = {
    errors: []
  };

  var flow = bindAll(
    require('./lists/Monitors.js'),
    bag);

  async.series(flow,
    function (err) {
      if (err)
        bag.errors.push(err);
      if (bag.errors.length > 0)
        return retry(bag);
      timeoutLength = 1;
      initiate();
    });
}

function bindAll(list, bag) {
  var boundList = [];
  for (var i = 0; i < list.length; i++)
    boundList.push(list[i].bind(null, bag));
  return boundList;
}

function retry(bag, callback) {
  if (!callback)
    callback = report;
  for (var i = 0; i < bag.errors.length; i++)
    logger.error('Microservice:', bag.errors[i]);
  timeoutLength *= 2;
  if (timeoutLength > timeoutLimit)
    timeoutLength = 1;
  setTimeout(callback, timeoutLength * 1000);
}

function initiate() {
  try {
    var init = require('../workers/' + process.title + '.js');
    init();
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND')
      return retry({
        errors: [err, 'Missing ../workers/' + process.title + 'x.js']
      });
    retry({
      errors: [err]
    });
  }
}
