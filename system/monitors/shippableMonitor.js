'use strict';
var self = shippableMonitor;
module.exports = self;

var ShippableAdapter = require('../../common/ShippableAdapter.js');

function shippableMonitor(data, callback) {

  var adapter = new ShippableAdapter('');
  adapter.get('',
    function (err, res) {
      if (err || !res)
        data.errors.push(
          new ActErr(self.name,
            ActErr.IntenalServer,
            'Shippable API error', err));
      if (res && res.status !== 'OK')
        data.errors.push(
          new ActErr(self.name,
            ActErr.IntenalServer,
            'Shippable API returned bad response', res));

      callback();
    });
}
