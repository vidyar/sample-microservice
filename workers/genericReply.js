'use strict';
var self = genericReply;
module.exports = self;

var util = require('util');

function genericReply(req, res) {
  logger.debug(req.method, req.originalUrl, 'from', req.ip);
  if (Object.keys(req.body).length > 0)
    logger.debug('Body:\n' + util.inspect(req.body));
  //response
  var textStyling = 'style="position: absolute;' +
    'top: 50%;' +
    'left: 50%;' +
    'margin-right: -50%;' +
    'transform: translate(-50%, -50%)' +
    '"';
  res.send(
    '<body style="background-color: #FF9933">' +
    '<div ' + textStyling + '>' +
    '<div style="text-align:center; color:#ffffff">' +
    'Your very own teeny tiny</div>' +
    '<div style="text-align:center;font-size:100px; color:#ffffff">' +
    'MICROBE</div>' +
    '</div>' +
    '</body>');
}
