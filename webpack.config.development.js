var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);
var plugins = config.plugins = config.plugins || [];

plugins.push(new webpack.optimize.OccurenceOrderPlugin());
plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
}));

module.exports = config;

