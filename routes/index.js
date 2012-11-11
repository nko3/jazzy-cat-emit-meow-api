/*globals Map:true*/
var models = require('../models'),
    Map = models.Map,
    Contribution = models.Contribution;


// PUBLIC API DESCRIPTION  that's returned on GET /
var commands = {
  getKeywords: {
    url: 'GET /keyword',
    description: 'Retrieve all keywords that currently exist',
    response_template: { 
      name: 'cat',
      count: '9001'
    }
  },
  createContribution: {
    url: 'POST /contribution',
    description: 'Create a new contribution',
    post_body_template: {
      keywords: "['keywrd1', 'keywrd two']",
      lat: 1.12313131,
      lng: -1.2112312,
      'meta': '{ JSON Object. This is an optional property }'
    }
  },
  getContributions: {
    url: 'GET /contribution',
    description: 'Retrieve all contributions',
    response_template: [{
      keywords: ['tacos', 'fast-food', 'mexican'],
      lat: 122.22,
      lng: -57.22
    }, {
      keywords: ['burritos', 'fast-food', 'mexican'],
      lat: 102.22,
      lng: -53.22
    }, {
      keywords: ['cat', 'meow'],
      lat: 120.22,
      lng: -51.22
    }]
  },
  getContributionsByKeyword: {
    url: 'GET /contribution/:keyword',
    description: 'Retrieve all contributions which have the provided keyword.',
    example_request: '/contribution/mexican',
    response_template: [{
      keywords: ['tacos', 'fast-food', 'mexican'],
      lat: 122.22,
      lng: -57.22
    }, {
      keywords: ['burritos', 'fast-food', 'mexican'],
      lat: 102.22,
      lng: -53.22
    }]
  // },
  // search: {
    // url: 'GET /search?:keyword1&:keyword2...',
    // description: 'Search for contributions by keyword. Here you can define as many keywords as you would like'
  }
};


// Route: GET /
var getHelp = function(req, res, next) {
  res.send(commands);
  next();
};

// Route: GET /contribution
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

// Route: GET /contribution/:keyword
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

// Route: POST /contribution
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

// Route: GET /keyword
var getKeywords = function(req, res, next) {
  Contribution.allKeywords(function(err, keywords) {
    if (err) {
      console.error("ERROR while retrieving all keywords", err);
      next(err);
    } else {
      // Keywords are returned as an array of {key: keyword, value: count}
      // objects.
      keywords = keywords.map(function(obj) {
        return {
          name: obj.key,
          count: obj.value
        };
      });
      res.send(keywords);
      next();
    }
  });
};
module.exports = function bindRoutes (server) {
  server.get('/', getHelp);
  server.get('/contribution', getContributions);
  server.get('contribution/:keyword', getContributionsByKeyword);
  server.post('/contribution', postContribution);
  server.get('/keyword', getKeywords);
  server.get('/search', getContributionsByKeyword);
};
