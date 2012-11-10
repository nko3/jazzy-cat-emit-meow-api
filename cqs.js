var cqs = require('cqs');

module.exports = cqs = cqs.defaults({
  "couch": "http://nodejitsudb7300738890.iriscouch.com:5984",
  "db"   : "mapper_queue"
});

// Just create with a name.
cqs.CreateQueue("mapper_message_queue", function(error, queue) {
  if(!error) {
    //console.log("The Mapper Queue has been started.");
  }
});
