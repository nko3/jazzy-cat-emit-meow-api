/*jshint expr:true, es5:true*/
require('chai').should();
require('resourceful').use('couchdb', {database: 'testdb'});

describe('models', function () {
  it('should not blow up', function () {
    require('../models');
  });

  it('should return a thing', function () {
    require('../models').should.exist;
  });

  describe('Map', function () {
    it('should exist', function () {
      require('../models').Map.should.exist;
    });

    it('should have a schema', function () {
      require('../models').Map.schema.should.exist;
    });

    it('should have a name', function () {
      require('../models').Map.schema.properties.name.should.exist;
    });

    describe('instance', function () {
      it('should be created', function () {
        this.instance = require('../models').Map.new({
          name: 'test'
        });
      });

      it('should be named test', function () {
        this.instance.name.should.equal('test');
      });

      it('should save into the testdb', function (done) {
        this.instance.save(done);
      });

      it('should update to test2', function (done) {
        this.instance.update({
          name: 'test2'
        }, function (err, updated) {
          done(err);
        });
      });

      it('should be named test2', function (done) {
        this.instance.reload(function (err, instance) {
          instance.name.should.be.equal('test2');
          done(err);
        });
      });

      it('should be destroyed!', function (done) {
        this.instance.destroy(done);
      });
    });
  });

  describe('Contribution', function () {
    it('should exist', function () {
      require('../models').Contribution.should.exist;
    });

    it('should have a schema', function () {
      require('../models').Contribution.schema.should.exist;
    });

    it('should have a lat', function () {
      require('../models').Contribution.schema.properties.lat.should.exist;
    });

    it('should have a long', function () {
      require('../models').Contribution.schema.properties.long.should.exist;
    });

    it('should have a meta', function () {
      require('../models').Contribution.schema.properties.meta.should.exist;
    });

    it('should have a map ref', function () {
      require('../models').Contribution.schema.properties.map_id.should.exist;
    });

    describe('instance', function () {
      it('should be created', function () {
        this.instance = require('../models').Contribution.new({
          lat: '26.2',
          long: '34.4',
          meta: {
            test: true
          }
        });
      });

      it('should have latitude 26.2', function () {
        this.instance.lat.should.equal('26.2');
      });

      it('should save into the testdb', function (done) {
        this.instance.save(done);
      });

      it('should update to 26.3', function (done) {
        this.instance.update({
          lat: '26.3'
        }, done);
      });

      it('should be 26.3', function (done) {
        this.instance.reload(function (err, instance) {
          instance.lat.should.equal('26.3');
          done(err);
        });
      });

      it('should be destroyed!', function (done) {
        this.instance.destroy(done);
      });
    });
  });
});