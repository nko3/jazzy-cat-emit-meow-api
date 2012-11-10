var resourceful = require('resourceful');

resourceful.use('couchdb', {database: 'testdb'});

// @Henry: See here for test cases:
// https://github.com/flatiron/resourceful#api
var Map = resourceful.define('map', function() {

  this.use('couchdb', 'couchdb://nodejitsudb7300738890.iriscouch.com:5984/testdb');

  this.string('name');

});


var Contribution = resourceful.define('contribution', function() {

  this.use('couchdb', 'couchdb://nodejitsudb7300738890.iriscouch.com:5984/testdb');

  this.string('lat');
  this.string('long');
  this.object('meta');

  this.parent('map');
});


module.exports = {
  Map: Map,
  Contribution: Contribution
};
