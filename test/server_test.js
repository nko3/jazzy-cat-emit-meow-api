/*jshint expr:true, es5:true*/
require('chai').should();
var request = require('request');

function get (path, cb) {
  request.get({
    url: 'http://localhost:2020' + path,
    json: true
  }, cb);
}

function post (path, data, cb) {
  request.post({
    url: 'http://localhost:2020' + path,
    json: data
  }, cb);
}

describe('server', function () {
  it('should not blow up', function () {
    require('../server');
  });

  describe('launch', function () {
    it('should launch', function (done) {
      this.server = require('../server').listen(2020, done);
    });
  });
});