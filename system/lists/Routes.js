'use strict';
var self = function () {
  // log all other messages
  app.all('*', require('../../workers/genericReply.js'));
};

module.exports = self;
