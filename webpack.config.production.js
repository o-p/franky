'use strict';
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);

// var postPlugins = [
//   new webpack.optimize.OccurenceOrderPlugin(),
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify('production'),
//     STANDARD_WELCOME_PAGE: jsonConfig.standard,
//   }),
//   new webpack.optimize.UglifyJsPlugin({
//     compressor: {
//       screw_ie8: true,
//       warnings: false,
//     },
//   }),
// ];

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      // screw_ie8: true,
      warnings: false,
    },
}));

module.exports = config;
