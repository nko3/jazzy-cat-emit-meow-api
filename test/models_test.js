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

    describe('instance', function () {
      it('should be created', function () {
        this.instance = require('../models').map.new({
          name: 'test'
        });
      });

      it('should be named test', function () {
        this.instance.name.should.equal('test');
      });

      it('should save into the testdb', function () {
        this.instance.save();
      });

      it('should save into the testdb async', function (done) {
        this.instance.save(function (hey, yo) {
          console.log(hey, yo);
          done();
        });
      });

      it('should update to test2', function () {
        this.instance.update({
          name: 'test2'
        });
      });

      it('should be named test2', function () {
        this.instance.reload();
        this.instance.name.should.equal('test2');
      });

      it('should be destroyed!', function () {
        this.instance.destroy();
      });
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

    describe('instance', function () {
      it('should be created', function () {
        this.instance = require('../models').contribution.new({
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

      it('should save into the testdb', function () {
        this.instance.save();
      });

      it('should save into the testdb async', function (done) {
        this.instance.save(function (hey, yo) {
          console.log(hey, yo);
          done();
        });
      });

      it('should update to 26.3', function () {
        this.instance.update({
          lat: '26.3'
        });
      });

      it('should be 26.3', function () {
        this.instance.reload();
        this.instance.lat.should.equal('26.3');
      });

      it('should be destroyed!', function () {
        this.instance.destroy();
      });
    });
  });
});