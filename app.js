var http = require('http'),
    bindRoutes = require('./routes'),
    version = require('./package').version,
    sugar = require('sugar'),
    restify = require('restify');


var server = restify.createServer({
  name: 'mapper-maker',
  version: version
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Debug Route
server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

bindRoutes(server);

server.listen(process.env.PORT || 2000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
