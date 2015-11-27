// Configuration files
var packageInfo = require("./package.json");
var config = require('config');

// Logging / Debug
var bunyan = require('bunyan');
var debug = require('debug')(packageInfo.name);

// Metrics
var rollbar = require('rollbar');
require('newrelic');

// Libraries
var once = require('once');
var _ = require('lodash');

// DB
var MongoClient = require('mongodb').MongoClient;
var pluginDatabase;

// Frameworks
var restify = require('restify');

var logger = bunyan.createLogger({
  name: packageInfo.name,
  streams: [
    {
      level: "info",
      stream: process.stdout
    },
    {
      level: config.get("log.level"),
      path: config.get("log.filePath")
    }
  ]
});

MongoClient.connect(config.get('mongodb.url'), function(err, db) {
  if (err) {
    logger.error("Connection to MongoDB failed - %s", err);
    return;
  }

  db.on('close', function() {
    logger.info("Closing connection to MongoDB");
  });

  pluginDatabase = db;
});

rollbar.init(config.get('rollbar.apiKey', {
  environment: process.env.NODE_ENV
  })
);

var server = restify.createServer({
  log: logger
});

server.get("/", function(req, res, next) {
  res.send({ "hello": "world" });
  return next();
});

server.listen(31337, function() {
  logger.info("%s listening at %s", server.name, server.url);
});
