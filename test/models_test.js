/*jshint expr:true*/
require('chai').should();

describe('models', function () {
  it('should not blow up', function () {
    require('../models');
  });

  it('should return a thing', function () {
    require('../models').should.exist;
  });

  describe('map', function () {
    it('should exist', function () {
      require('../models').map.should.exist;
    });

    it('should have a schema', function () {
      require('../models').map.schema.should.exist;
    });

    it('should have a name', function () {
      require('../models').map.schema.properties.name.should.exist;
    });
  });

  describe('contribution', function () {
    it('should exist', function () {
      require('../models').contribution.should.exist;
    });

    it('should have a schema', function () {
      require('../models').contribution.schema.should.exist;
    });

    it('should have a lat', function () {
      require('../models').contribution.schema.properties.lat.should.exist;
    });

    it('should have a long', function () {
      require('../models').contribution.schema.properties.long.should.exist;
    });

    it('should have a meta', function () {
      require('../models').contribution.schema.properties.meta.should.exist;
    });

    it('should have a map ref', function () {
      require('../models').contribution.schema.properties.map_id.should.exist;
    });
  });
});