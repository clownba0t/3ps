"use strict";

var StatusPageIoCheck = require("./status_page_io_check.js");

var STATUS_URI = "https://www.traviscistatus.com/index.json";
var SERVICE_NAME = "Travis CI";

function TravisCiCheck(model, logger) {
    this.model = model;
    this.logger = logger;
    this.check = new StatusPageIoCheck(STATUS_URI, SERVICE_NAME, model, logger);
}

TravisCiCheck.prototype.run = function (callback) {
    this.check.getStatusData(callback);
}

module.exports = TravisCiCheck;
