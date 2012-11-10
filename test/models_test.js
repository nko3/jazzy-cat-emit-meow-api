/*jshint expr:true*/
require('chai').should();

describe('models', function () {
  it('should not blow up', function () {
    require('../models');
  });

  it('should return a thing', function () {
    require('../models').should.exist;
  });

  describe('properties', function () {
    it('should be all objects', function () {
      Object.keys(require('../models'), function(key, value) {
        value.should.be.a('object');
      });
    });

    it('should have all functions', function () {
      Object.keys(require('../models'), function(key, value) {
         Object.keys(value, function(key, value) {
          value.should.be.a('function');
        });
      });
    });
  });

  describe('node', function () {
    it('should exist', function () {
      require('../models').node.should.exist;
    });

    describe('invalid', function () {
      it('should exist', function () {
        require('../models').node.invalid.should.exist;
      });

      it('should return false on good data', function () {
        require('../models').node.invalid({
          lat: '1',
          long: '2'
        }).should.be['false'];
      });
    });
  });

  describe('map', function () {
    it('should exist', function () {
      require('../models').map.should.exist;
    });
  });
});