"use strict";

var request = require("request");

exports.jsonGetRequest = function(uri, callback) {
    request.get(uri, function (error, response, body) {
        if (error || response.statusCode < 200 || response.statusCode > 300) {
            if (!error) {
                error = new Error("GET " + uri + " returned error status code " + response.statusCode + ".");
            }
            callback(error);
        } else {
            callback(null, JSON.parse(body));
        }
    });
};
