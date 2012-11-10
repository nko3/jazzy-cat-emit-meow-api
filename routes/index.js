var models = require('../models'),
    Map = models.Map,
    Contribution = models.Contribution;



// Route: /:mapper/node
postContribution = function(req, res, next) {
  var params = req.params;
  var body = req.body;
  console.log("BODY: ", body, params);
  Map.createContribution(params.mapper, body, function(err, obj) {
    if (err) {
      console.log("ERROR", err);
      next(err);
    } else {
      console.log("Created a Contribution with the following props: ", obj);
      res.send(obj);
      next();
    }
  });
};

// Route: /:mapper
postMapper = function(req, res, next) {
  var params = req.params;
  Map.create({name: params.mapper, id: params.mapper}, function(err, obj) {
    if (err) {
      console.log("ERROR", err);
      next(err);
    } else {
      console.log("Created a Map with the following props: ", obj);
      res.send(obj);
      next();
    }
  });
};

// Route: /:mapper
getMapper = function(req, res, next) {
  var params = req.params;
  Map.contributions(params.mapper, function(err, contributions) {
    if (err) {
      console.log("Error", err);
      next(err);
    } else {
      console.log("Fetching Nodes for Map: ", params.mapper);
      res.send(contributions);
      next();
    }
  });
};

// Route: /
getRoot = function(req, res, next) {
  Map.all(function(err, maps) {
    if (err) {
      console.log("ERROR: ", err);
      next(err);
    } else {
      console.log("Fetching a list of all available maps", maps);
      res.send(maps);
      next();
    }
  });
};


module.exports = function bindRoutes (server) {
  server.get('/', getRoot);
  server.get('/:mapper', getMapper);
  server.post('/:mapper', postMapper);
  server.post('/:mapper/node', postContribution);
  server.post('/:mapper/contribution', postContribution);
};
