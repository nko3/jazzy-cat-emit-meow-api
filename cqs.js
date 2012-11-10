var cqs = require('cqs');


cqs = cqs.defaults({
  "couch": "http://nodejitsudb7300738890.iriscouch.com:5984",
  "db"   : "mapper_queue"
});

var msg_q;
var callback = function() {}; // noop default

// create our single queue
cqs.CreateQueue("mapper_message_queue", function(error, queue) {
  if(!error) {
    // stash the q;
    msg_q = queue;
    callback(queue);
  } else {
    throw error;
  }
});

// Since the msg_q is returned async, we return a mock object
// that buffers the requests sent to it and tries them again
// each second.
var mock = {};

['send', 'recieve', 'delete'].forEach(function(method) {
  mock[method] = function() {
    var args = arguments;
    // if the msg_q is loaded, use it
    if (msg_q) {
      msg_q[method].apply(msg_q, args);
    } else {
      var tryAgain = setInterval(function() {
        if (!msg_q) {
        } else {
          clearInterval(tryAgain);
          msg_q[method].apply(msg_q, args);
        }
      }, 1000);
    }
  };
});

module.exports = function asyncRequire (cb) {
  // if the msg_q already exists, return it immediately
  if (msg_q) {
    cb(msg_q);
    return msg_q;
  } else {
  // otherwise stash the cb and wait for the queue to return
  callback = cb;
  return mock;
  }
};
