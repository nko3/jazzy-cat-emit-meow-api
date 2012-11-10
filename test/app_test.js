/*jshint expr:true*/
require('chai').should();

describe('app', function () {
  it('should not blow up', function () {
    require('../app.js');
  });
});