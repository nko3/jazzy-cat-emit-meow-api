var resourceful = require('resourceful'),
    cqs = require('../cqs');

resourceful.use('couchdb', 'couchdb://nodejitsudb7300738890.iriscouch.com:5984/testdb');

var Map = resourceful.define('map', function() {

  this.string('name');

});


var Contribution = resourceful.define('contribution', function() {

  this.string('lat');
  this.string('long');
  this.object('meta');

  this.parent('map');
});


module.exports = {
  Map: Map,
  Contribution: Contribution
};
