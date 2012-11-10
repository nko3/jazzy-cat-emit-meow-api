/*jshint expr:true, es5:true*/
require('chai').should();

describe('server', function () {
  it('should not blow up', function () {
    require('../server');
  });
});