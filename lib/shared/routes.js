"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _AppHandler = require("./components/AppHandler");

var _AppHandler2 = _interopRequireDefault(_AppHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(_reactRouter2.default, { path: "/", component: _AppHandler2.default });

exports.default = routes;