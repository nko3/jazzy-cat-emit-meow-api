var resourceful = require('resourceful');

// @Henry: See here for test cases:
// https://github.com/flatiron/resourceful#api
var map = resourceful.define('map', function() {

  this.use('couchdb', 'couchdb://nodejitsudb7300738890.iriscouch.com:5984');

  this.string('name');

});


var contribution = resourceful.define('contribution', function() {

  this.use('couchdb', 'couchdb://nodejitsudb7300738890.iriscouch.com:5984');

  this.string('lat');
  this.string('long');
  this.object('meta');

  this.parent('map');
});


module.exports = {
  map: map,
  contribution: contribution
};
