/*globals Map:true*/
var models = require('../models'),
    Map = models.Map,
    Contribution = models.Contribution;



// Route: /:mapper/node
var postContribution = function(req, res, next) {
  var params = req.params;

  Map.createContribution(params.mapper, req.body, function(err, obj) {
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
var postMapper = function(req, res, next) {
  var params = req.params;
  // A map's name is it's ID. TODO: Add formal name later
  var newMap = {
    id: params.mapper,
    name: params.formal_name || params.mapper
  };
  Map.create(newMap, function(err, obj) {
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
var getMapper = function(req, res, next) {
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
var getRoot = function(req, res, next) {
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
