var resourceful = require('resourceful');


var map = resourceful.define('map', function() {

  this.use('couchdb');

  this.string('name');

});


var contribution = resourceful.define('contribution', function() {

  this.use('couchdb');

  this.string('lat');
  this.string('long');
  this.object('meta');

  this.parent('map');
});


module.exports = {
  map: map,
  contribution: contribution
};
