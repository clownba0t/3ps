"use strict";

var _webpackDevServer = require("webpack-dev-server");

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackConfig = require("../../config/webpack.config.dev");

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _webpackDevServer2.default((0, _webpack2.default)(_webpackConfig2.default), {
  // webpack-dev-server options
  publicPath: _webpackConfig2.default.output.publicPath,
  hot: true,
  stats: { colors: true }
});

server.listen(8080, "localhost", function () {});