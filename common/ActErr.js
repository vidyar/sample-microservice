'use strict';

module.exports = ActErr;
global.ActErr = ActErr;

ActErr.ParamNotFound = 400;
ActErr.InternalServer = 999;

function ActErr(methodName, id, message, error) {
  this.id = id || ActErr.InternalServer;
  this.message = message;
  this.methodName = methodName;
  if (error) {
    this.link = error;
  }
}
