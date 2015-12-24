"use strict";

var StatusPageIoCheck = require("./status_page_io_check.js");

var STATUS_URI = "https://status.newrelic.com/index.json";
var SERVICE_NAME = "New Relic";

function NewRelicCheck(model, logger) {
    this.model = model;
    this.logger = logger;
    this.check = new StatusPageIoCheck(STATUS_URI, SERVICE_NAME, model, logger);
}

NewRelicCheck.prototype.run = function (callback) {
    this.check.getStatusData(callback);
};

module.exports = NewRelicCheck;