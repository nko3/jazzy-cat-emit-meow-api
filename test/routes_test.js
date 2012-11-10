/*jshint expr:true, es5:true*/
require('chai').should();

describe('routes', function () {
  it('should not blow up', function () {
    require('../routes');
  });

  it('should be a function', function () {
    require('../routes').should.be.a('function');
  });

  describe('server bidings', function () {
    beforeEach(function () {
      this.server = {
        get: function () {},
        post: function () {}
      };
    });

    it('should get', function (done) {
      var first = true;
      this.server.get = function (route) {
        if (first) {
          done();
        }
        first = false;
      };
      require('../routes')(this.server);
    });

    it('should post', function (done) {
      var first = true;
      this.server.post = function (route) {
        if (first) {
          done();
        }
        first = false;
      };
      require('../routes')(this.server);
    });
  });
});