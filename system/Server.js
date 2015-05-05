'use strict';
var self = Server;
module.exports = self;

require('./lists/Routes.js')();
var timeoutLength = 1;
var timeoutLimit = 512;
var info;

function Server() {
  start();
}

function start() {
  if (!process.env.PORT)
    return retry({
      errors: ['No port found']
    });

  if (!info) {
    info = app.listen(process.env.PORT);
    info.on('error',
      function (err) {
        retry({
          errors: [err]
        });
      });
    return;
  }

  if (info.address())
    if (info.address().port !== process.env.PORT) {
      info.close();
      info = app.listen(process.env.PORT);
    }
}

function retry(bag, callback) {
  if (!callback)
    callback = start;
  for (var i = 0; i < bag.errors.length; i++)
    logger.error('Server:', bag.errors[i]);
  timeoutLength *= 2;
  if (timeoutLength > timeoutLimit)
    timeoutLength = 1;
  setTimeout(callback, timeoutLength * 1000);
}
