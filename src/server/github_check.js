"use strict";

var _ = require("underscore");

var RequestUtils = require("./request_utils.js");

var API_ENDPOINT_LIST_URI = "https://status.github.com/api.json";
var SERVICE_NAME = "Github";

function GithubCheck(model, logger) {
    this.model = model;
    this.logger = logger;
}

GithubCheck.prototype.run = function (callback) {
    this.getStatusEndpointUri(callback);
}

GithubCheck.prototype.getStatusEndpointUri = function (callback) {
    RequestUtils.jsonGetRequest(API_ENDPOINT_LIST_URI, function (error, data) {
        if (error) {
            callback(error);
            return;
        }
        if (!data.status_url) {
            callback(new Error("Could not determine URI of status API"));
            return;
        }
        this.getStatusData(data.status_url, callback);
    }.bind(this));
};

GithubCheck.prototype.getStatusData = function (uri, callback) {
    RequestUtils.jsonGetRequest(uri, function (error, data) {
        if (error) {
            callback(error);
            return;
        }
        if (!data.status || _.isEmpty(data.status)) {
            callback(new Error("No status data available for " + SERVICE_NAME + "."));
            return;
        }
        this.saveResult(data.status, callback);
    }.bind(this));
};

GithubCheck.prototype.saveResult = function (status, callback) {
    var result = new this.model({
        serviceName: SERVICE_NAME,
        componentName: "All Services",
        status: status
    });
    result.save(function(error, result) {
        callback(error);
    });
};

module.exports = GithubCheck;
