/*globals Map:true*/
var models = require('../models'),
    Map = models.Map,
    Contribution = models.Contribution;


// PUBLIC API DESCRIPTION  that's returned on GET /
var commands = {
  search: {
    url: 'GET /search?:keyword1&:keyword2...',
    description: 'Search for contributions by keyword. Here you can define as many keywords as you would like'
  },
  getContributions: {
    url: 'GET /contribution',
    description: 'returns all contributions'
  },
  getContributionsByKeyword: {
    url: 'GET /contribution/:keyword',
    description: 'return all contributions for the provided keyword. NOTE: Only a single keyword is accepted'
  },
  createContribution: {
    url: 'POST /contribution',
    description: 'create a new contribution',
    post_body_template: {
      keywords: "['keywrd1', 'keywrd two']",
      lat: 1.12313131,
      lng: -1.2112312,
      'meta': '{ JSON Object. This is an optional property }'
    }
  }
};

var getHelp = function(req, res, next) {
  res.send(commands);
  next();
};

var getContributions = function(req, res, next) {
  Contribution.all(function(err, contribs) {
    if (err) {
      console.error("Error while retrieving contribs: ", err);
      next(err);
    } else {
      res.send(contribs);
      next();
    }
  });
};


var getContributionsByKeyword = function(req, res, next) {
  var query = {},
      isMultiKeywordQuery = false,
      params = req.params;

  if (params.keyword) {
    // A single keyword query
    query.key = params.keyword;
  } else {
    // multi-keyword query
    isMultiKeywordQuery = true;
    query.keys = Object.keys(params);
  }
  Contribution.byKeyword(query, function(err, contribs) {
    if (err) {
      console.error("Error while retrieiving contribs with query: ", query, err);
      next(err);
    } else {
      if (isMultiKeywordQuery) {
        // Multi-Keyword queries will return duplicate objects
        res.send(contribs.unique());
      } else {
        res.send(contribs);
      }
      next();
    }
  });
};


var postContribution = function(req, res, next) {
  Contribution.create(req.params, function(err, contrib) {
    if (err) {
      console.error("ERROR while creating a contribution with params: ", req.params, err);
      next(err);
    } else {
      res.send(contrib);
      next();
    }
  });
};

module.exports = function bindRoutes (server) {
  server.get('/', getHelp);
  server.get('/contribution', getContributions);
  server.get('contribution/:keyword', getContributionsByKeyword);
  server.get('/search', getContributionsByKeyword);
};
