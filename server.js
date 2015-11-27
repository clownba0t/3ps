require('newrelic');
var packageInfo = require("./package.json");

var config = require('config');

var once = require('once');
var _ = require('lodash');

var debug = require('debug')(packageInfo.name);
var bunyan = require('bunyan');
var rollbar = require('rollbar');

var MongoClient = require('mongodb').MongoClient;

var log = bunyan.createLogger({
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
    log.error("Connection to MongoDB failed - %s", err);
  }

  db.on('close', function() {
    log.info("Closing connection to MongoDB");
  });
});

var express = require('express');

var app = express();

app.use(rollbar.errorHandler(config.get('rollbar.apiKey')));

app.get('/', function (req, res) {
    res.send('Hello World!');
});
