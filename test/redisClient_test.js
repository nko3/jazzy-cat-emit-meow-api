/*jshint expr:true*/
require('chai').should();

describe('redis client', function () {
  it('should not blow up', function () {
    require('../redisClient.js');
  });

  it('should return a thing', function () {
    require('../redisClient.js').should.exist;
  });
});