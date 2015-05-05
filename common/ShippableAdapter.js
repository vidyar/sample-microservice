'use strict';

var request = require('request');
var async = require('async');
var self = ShippableAdapter;
module.exports = self;

function ShippableAdapter(token) {
  logger.debug('Initializing', self.name, 'with', token);
  // initialize with the caller's token
  this.token = token;
}

var baseUrl = process.env.API_URL;

// generic GET method
ShippableAdapter.prototype.get = function (relativeUrl, callback) {
  logger.debug('Shippable GET data ', relativeUrl);
  var opts = {
    method: 'GET',
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'apiToken ' + this.token
    }
  };
  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token
  };

  async.series([
    _performCall.bind(null, bag),
    _parseResponse.bind(null, bag)
  ], function () {
    callback(bag.err, bag.parsedBody, bag.res);
  });
};

// generic POST method
ShippableAdapter.prototype.post = function (relativeUrl, json, callback) {
  logger.debug('Shippable POST data ', relativeUrl);
  var opts = {
    method: 'POST',
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'apiToken ' + this.token
    },
    json: json
  };
  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token
  };

  async.series([
    _performCall.bind(null, bag),
    _parseResponse.bind(null, bag)
  ], function () {
    callback(bag.err, bag.parsedBody, bag.res);
  });
};

// common helper methods
function _performCall(bag, next) {
  var who = self.name + '|' + _performCall.name;
  logger.debug('Inside', who);

  bag.startedAt = Date.now();
  request(bag.opts, function (err, res, body) {
    var interval = Date.now() - bag.startedAt;
    logger.debug('Shippable request ' + bag.opts.method + ' ' +
      bag.relativeUrl + ' took ' + interval +
      ' ms and returned HTTP status ' + (res && res.statusCode));

    bag.res = res;
    bag.body = body;
    if (res && res.statusCode > 299) err = err || res.statusCode;
    if (err) {
      logger.error('Shippable returned status', err,
        'for request', bag.relativeUrl);
      bag.err = err;
    }
    next();
  });
}

function _parseResponse(bag, next) {
  var who = self.name + '|' + _parseResponse.name;
  logger.debug('Inside', who);
  if (bag.body) {
    if (typeof bag.body === 'object') {
      bag.parsedBody = bag.body;
    } else {
      try {
        bag.parsedBody = JSON.parse(bag.body);
      } catch (e) {
        logger.error('Unable to parse bag.body', bag.body, e);
        bag.err = e;
      }
    }
  }
  next();
}

//routes

ShippableAdapter.prototype.getAccount = function (callback) {
  var url = '/accounts';
  this.get(url, callback);
};

