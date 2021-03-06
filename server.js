var restify = require('restify'),
    bindRoutes = require('./routes'),
    sugar = require('sugar'),
    version = require('./package').version;

var server = restify.createServer({
  name: 'mapper-maker',
  version: version
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.jsonBodyParser());

// Debug Route
server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

bindRoutes(server);

module.exports = server;
