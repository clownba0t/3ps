"use strict"

// require("babel/register");

// Configuration files
;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _server = require("react-dom/server");

var _routes = require("../shared/routes.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packageInfo = require("../../package.json");
var config = require('config');

// Logging / Debug
var bunyan = require('bunyan');
var debug = require('debug')(packageInfo.name);

// Metrics
var rollbar = require('rollbar');
require('newrelic');

// Libraries
var async = require("async");

// DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Frameworks
var express = require("express");

// Constants

var SERVER_PORT = 31337;

var CHECK_CLASSES = [require("./github_check.js"), require("./airbrake_check.js")];

var CHECK_INTERVAL = 5 * 60 * 1000;

// Globals

var logger;
var app;
var server;
var StatusCheckResult;

// Functions

function setup() {
    logger = bunyan.createLogger({
        name: packageInfo.name,
        streams: [{
            level: "info",
            stream: process.stdout
        }, {
            level: config.get("log.level"),
            path: config.get("log.filePath")
        }]
    });

    mongoose.connect(config.get('mongodb.url'));
    mongoose.connection.on('error', function () {
        logger.error("Connection to MongoDB failed");
    });

    app = express();
    app.set("view engine", "jade");
    app.set("views", "./views");

    app.get("/*", function (req, res) {
        (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                var content = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RoutingContext, renderProps));
                res.status(200).render("index", { content: content });
            } else {
                res.status(404).send('Not found');
            }
        });
    });

    var rollbarApiKey = config.get("rollbar.apiKey", { environment: getEnvironment() });
    app.use(rollbar.errorHandler(rollbarApiKey, {
        environment: process.env.NODE_ENV,
        root: __dirname
    }));
    rollbar.handleUncaughtExceptions(rollbarApiKey, { exitOnUncaughtException: true });

    // Do this in nginx instead?
    app.use(express.static("public"));

    server = app.listen(SERVER_PORT, function () {
        var host = server.address().address;
        var port = server.address().port;

        logger.info("3ps up and listening on http://%s:%d", host, port);
    });

    var statusCheckResultSchema = new Schema({
        serviceName: String,
        componentName: String,
        status: String
    }, { timestamps: true });
    StatusCheckResult = mongoose.model("StatusCheckResult", statusCheckResultSchema);
}

function runChecks() {
    async.each(CHECK_CLASSES, function (checkClass, callback) {
        var check = new checkClass(StatusCheckResult, logger);
        check.run(function (error) {
            callback(error || null);
        });
    }, function (error) {
        if (error) {
            logger.warn("Check failed.");
        }
    });
    setTimeout(runChecks, CHECK_INTERVAL);
}

function getEnvironment() {
    return process.env.NODE_ENV;
}

// "main"

setup();
runChecks();