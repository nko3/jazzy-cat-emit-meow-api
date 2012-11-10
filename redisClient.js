var redis = require('redis');

var client;
if (process.env.NODE_ENV !== 'production') {
  client = redis.createClient();
} else {
  client = redis.createClient(6379, 'nodejitsudb8825716066.redis.irstack.com');
  client.auth('nodejitsudb8825716066.redis.irstack.com:f327cfe980c971946e80b8e975fbebb4', function (err) {
    if (err) { throw err; }
    // You are now connected to your redis.
  });
}

module.exports = client;
