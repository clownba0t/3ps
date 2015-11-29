"use strict";

var async = require("async");
var _ = require("underscore");

var RequestUtils = require("./request_utils.js");

var STATUS_URI = "https://status.airbrake.io/index.json";
var SERVICE_NAME = "Airbrake";

function AirbrakeCheck(model, logger) {
    this.model = model;
    this.logger = logger;
}

AirbrakeCheck.prototype.run = function (callback) {
    this.getStatusData(callback);
}

AirbrakeCheck.prototype.getStatusData = function (callback) {
    RequestUtils.jsonGetRequest(STATUS_URI, function (error, data) {
        if (error) {
            callback(error);
            return;
        }
        if (!data.components || _.isEmpty(data.components)) {
            callback(new Error("No status data available for " + SERVICE_NAME + "."));
            return;
        }
        this.saveResults(data, callback);
    }.bind(this));
};

AirbrakeCheck.prototype.saveResults = function (data, callback) {
    async.each(data.components, function (component, callback) {
        var result = new this.model({
            serviceName: SERVICE_NAME,
            componentName: component.name,
            status: component.status
        });
        result.save(function(error, result) {
            callback(error);
        });
    }.bind(this), function (error) {
        callback(error);
    });
};

module.exports = AirbrakeCheck;
