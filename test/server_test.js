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

    it('should respond to get / with an array', function (done) {
      get('/', function (error, response, body) {
        if (error) {
          return done(error);
        }
        body.should.be.a('array');
        return done();
      });
    });

    it('should respond to get /test with an array', function (done) {
      get('/test', function (error, response, body) {
        if (error) {
          return done(error);
        }
        body.should.be.a('array');
        return done();
      });
    });

    it('should respond to post /test{{random}}', function (done) {
      post('/test' + (Math.random()), {}, function (error, response, body) {
        if (error) {
          return done(error);
        }
        body.should.be.a('object');
        return done();
      });
    });

    it('should respond to post /test/node/', function (done) {
      post('/test/node/', {
        lat: '3.4',
        long: '5.6',
        meta: {
          test: true
        }
      }, function (error, response, body) {
        if (error) {
          return done(error);
        }
        body.should.be.a('object');
        return done();
      });
    });

    it('should respond to post /test/contribution/',
      function (done) {
      post('/test/contribution/', {
        lat: '3.4',
        long: '5.6',
        meta: {
          test: true
        }
      }, function (error, response, body) {
        if (error) {
          return done(error);
        }
        body.should.be.a('object');
        return done();
      });
    });
  });
});