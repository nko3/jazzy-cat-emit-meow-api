var api = require('teleportd');


api = api.teleportd({
  user_key: '027cc743141ca9dc361a56d31bc912a9',
  host: 'api.v2.teleportd.com'
});

console.log(api);

var queries = [];
var query = {
  str: 'hurricane sandy',
  size: 100,
  from: 0,
  period: [LAST_SCRAPE || 0, +Date.now()]
};

console.log(queries);


function scrapeTeleportd(query, from) {

  api.search(query, function(err, hits, total, took) {
    console.log("Search returned", arguments);
  });

}
