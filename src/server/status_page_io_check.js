"use strict";

var async = require("async");
var _ = require("underscore");

var RequestUtils = require("./request_utils.js");

function StatusPageIoCheck(uri, name, model, logger) {
    this.uri = uri;
    this.name = name;
    this.model = model;
    this.logger = logger;
}

StatusPageIoCheck.prototype.run = function (callback) {
    this.getStatusData(callback);
}

StatusPageIoCheck.prototype.getStatusData = function (callback) {
    RequestUtils.jsonGetRequest(this.uri, function (error, data) {
        if (error) {
            callback(error);
            return;
        }
        if (!data.components || _.isEmpty(data.components)) {
            callback(new Error("No status data available for " + this.name + "."));
            return;
        }
        this.saveResults(data, callback);
    }.bind(this));
};

StatusPageIoCheck.prototype.saveResults = function (data, callback) {
    async.each(data.components, function (component, callback) {
        var result = new this.model({
            serviceName: this.name,
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

module.exports = StatusPageIoCheck;
