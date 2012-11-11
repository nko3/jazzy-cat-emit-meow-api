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

    it('should have a lng', function () {
      require('../models').Contribution.schema.properties.lng.should.exist;
    });

    it('should have a meta', function () {
      require('../models').Contribution.schema.properties.meta.should.exist;
    });

    it('should have a keywords', function () {
      require('../models').Contribution.schema.properties.keywords.should.exist;
    });

    describe('instance', function () {
      it('should be created', function () {
        this.instance = require('../models').Contribution.new({
          lat: 26.2,
          long: 34.4,
          keywords: ['test', 'api'],
          meta: {
            test: true
          }
        });
      });

      it('should have latitude 26.2', function () {
        this.instance.lat.should.equal(26.2);
      });

      it('should have keywords', function () {
        this.instance.keywords[0].should.equal('test');
      });

      it('should save into the testdb', function (done) {
        this.instance.save(done);
      });

      it('should update to 26.3', function (done) {
        this.instance.update({
          lat: 26.3
        }, done);
      });

      it('should be 26.3', function (done) {
        this.instance.reload(function (err, instance) {
          instance.lat.should.equal(26.3);
          done(err);
        });
      });

      it('should be destroyed!', function (done) {
        this.instance.destroy(done);
      });
    });
  });
});