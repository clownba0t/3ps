"use strict";

var StatusPageIoCheck = require("./status_page_io_check.js");

var STATUS_URI = "https://status.airbrake.io/index.json";
var SERVICE_NAME = "Airbrake";

function AirbrakeCheck(model, logger) {
    this.model = model;
    this.logger = logger;
    this.check = new StatusPageIoCheck(STATUS_URI, SERVICE_NAME, model, logger);
}

AirbrakeCheck.prototype.run = function (callback) {
    this.check.getStatusData(callback);
};

module.exports = AirbrakeCheck;