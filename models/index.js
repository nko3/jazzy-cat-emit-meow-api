/*globals Map:true*/
var resourceful = require('resourceful'),
    // explicit async require
    msg_q = require('../cqs')(function(queue) {
      msg_q = queue;
    });


// TODO: Use the database var once we're done main development
//var database = (process.env.NODE_ENV === 'production') ? 'prod' : 'testdb';

resourceful.use('couchdb',
  'couchdb://nodejitsudb7300738890.iriscouch.com:5984/testdb2');

var Contribution = resourceful.define('contribution', function() {

  this.number('lat');
  this.number('lng');
  this.array('keywords');
  this.object('meta');
  this.timestamps();

  //this.parent('map');

  this.filter('byKeyword', {
    map: function(doc) {
      if (doc.resource === 'Contribution' && doc.keywords) {
        doc.keywords.forEach(function(keyword) {
          emit(keyword, doc);
        });
      }
    }
    //reduce: function(keys, values) {
      //return true;
    //}
  });

  this.filter('allKeywords', {group: true}, {
    map: function(doc) {
      if (doc.resource === 'Contribution' && doc.keywords) {
        doc.keywords.forEach(function(keyword) {
          emit(keyword, 1);
        });
      }
    },

    reduce: function(keys, values) {
      return sum(values);
    }

  });

  bindHooks(this);
});




/*  TEST SCRIPTS .. LEFT HERE FOR HENRY SO HE CAN SEE HOW TO USE THE FILTERS.

  Contribution.byKeyword({keys: ['corn', 'tacos']}, function(err, docs) {
    console.log(err, docs);
  });

  Contribution.allKeywords(function(err, docs) {
    console.log(err, docs);
  });

*/


module.exports = {
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
