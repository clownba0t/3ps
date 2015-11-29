"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _routes = require("../shared/routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactRouter.render)(_react2.default.createElement(_reactRouter.Router, { routes: _routes2.default }), document.getElementById('app'));