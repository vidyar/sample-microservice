'use strict';
var self = environmentMonitor;
module.exports = self;

function environmentMonitor(data, callback) {
  if (!global.config)
    global.config = {};
  // assign env vars to config
  global.config.microSvcName = process.env.MICRO_SERVICE_NAME;
  global.config.apiUrl = process.env.API_URL;
  global.config.port = process.env.PORT;
  verify(data, callback);
}

function verify(bag, callback) {
  var who = self.name;

  if (!global.config.microSvcName)
    bag.errors.push(new ActErr(who,
      ActErr.ParamNotFound,
      'MICRO_SERVICE_NAME is not defined'));
  process.title = global.config.microSvcName;

  if (!global.config.apiUrl)
    bag.errors.push(new ActErr(who,
      ActErr.ParamNotFound,
      'API_URL is not defined'));

  if (!global.config.port)
    bag.errors.push(new ActErr(who,
      ActErr.ParamNotFound,
      'PORT is not defined'));

  callback();
}
