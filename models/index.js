/*globals Map:true*/
var resourceful = require('resourceful'),
    // explicit async require
    msg_q = require('../cqs')(function(queue) {
      msg_q = queue;
    });



// TODO: Use the database var once we're done main development
//var database = (process.env.NODE_ENV === 'production') ? 'prod' : 'testdb';

resourceful.use('couchdb',
  'couchdb://nodejitsudb7300738890.iriscouch.com:5984/testdb');

var Map = resourceful.define('map', function() {

  this.string('name');

  bindHooks(this);
});

var Contribution = resourceful.define('contribution', function() {

  this.string('lat');
  this.string('long');
  this.object('meta');

  this.parent('map');

  bindHooks(this);
});


module.exports = {
  Map: Map,
  Contribution: Contribution
};

// Binds hooks that deal with publishing messages through CQS
function bindHooks(self) {
  ['create', 'update', 'destroy'].forEach(function(eventName) {
    var handler = function(err, obj) {
      if (!err) {
        // build the msg for this event
        var newMsg = {
          modelType: obj.resource,
          modelData: obj,
          action: eventName
        };
        msg_q.send(newMsg, function(err, message) {
          if (!err) {
            //console.log('Sent:', newMsg);
          } else {
            console.error("Error sending new message:", newMsg);
          }
        });
      }
      return true;
    };
    self.after(eventName, handler);
  });
}
