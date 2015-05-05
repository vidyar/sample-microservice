'use strict';
var express = require('express');

// logging and errors
require('./common/logger.js');
require('./common/ActErr.js');

// Start Express
var app = express();
global.app = app;

// json
app.use(require('body-parser').json({
  limit: '10mb'
}));

var Server = require('./system/Server.js');
global.Server = new Server();
var MicroService = require('./system/MicroService.js');
global.MicroService = new MicroService();
