/*globals Map:true*/
var resourceful = require('resourceful'),
    cqs = require('../cqs');

// TODO: Use the database var once we're done main development
//var database = (process.env.NODE_ENV === 'production') ? 'prod' : 'testdb';

resourceful.use('couchdb',
  'couchdb://nodejitsudb7300738890.iriscouch.com:5984/testdb');

var Map = resourceful.define('map', function() {

  this.string('name');

  this.after('save', function() {
    console.log("After save arguments ", arguments);
  });


});


var Contribution = resourceful.define('contribution', function() {

  this.string('lat');
  this.string('long');
  this.object('meta');

  this.parent('map');

  this.after('save', function() {
    console.log("After save arguments ", arguments);
  });

});


module.exports = {
  Map: Map,
  Contribution: Contribution
};
