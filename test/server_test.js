/*jshint expr:true, es5:true*/
require('chai').should();
var request = require('request');

function get (path, cb) {
  request.get({
    url: 'http://localhost:2020' + path,
    json: true
  }, function (error, response, body) {
    if (error) {
      throw error;
    }
    return cb(body);
  });
}

function post (path, data, cb) {
  request.post({
    url: 'http://localhost:2020' + path,
    json: data
  }, function (error, response, body) {
    if (error) {
      throw error;
    }
    return cb(body);
  });
}

describe('server', function () {
  it('should not blow up', function () {
    require('../server');
  });

  describe('launch', function () {
    it('should launch', function (done) {
      this.server = require('../server').listen(2020, done);
    });

    describe('get /', function () {
      it('should give commands', function (done) {
        get('/', function (data) {
          data.search.should.exist;
          done();
        });
      });
    });

    describe('get /contribution', function () {
      it('should give contribs', function (done) {
        get('/contribution', function (data) {
          data.should.be.a('array');
          done();
        });
      });
    });

    describe('get /contribution/:keyword', function () {
      it('should give contribs', function (done) {
        get('/contribution/test', function (data) {
          data.should.be.a('array');
          done();
        });
      });
    });

    describe('post /contribution', function () {
      it('should give an id', function (done) {
        post('/contribution', {
          lat: 4.5,
          lng: 3.2,
          keywords: [
            'test',
            'api'
          ],
          meta: {
            test: true
          }
        }, function (data) {
          data.id.should.exist;
          done();
        });
      });
    });

    describe('get /keyword', function () {
      it('should give keywords', function (done) {
        get('/keyword', function (data) {
          console.error(data);
          done();
        });
      });
    });
  });
});