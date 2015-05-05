'use strict';
var self = microbe;
module.exports = self;

var async = require('async');

function microbe() {
  logger.info(process.title, 'initiating');

  var flow = [
    startThings
    ];

  async.series(flow,
    function (err) {
      if (err)
        return MicroService.error(err);
    });
}

function startThings(next) {
  //Do stuff here
  logger.info('Microbe online.');
  next();
}
