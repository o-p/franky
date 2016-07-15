var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPack = require('html-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader?failOnError=true",
        include: [path.resolve(__dirname, 'src')]
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [path.resolve(__dirname, 'src')]
      },
      // { test: /\.js$/, loader: 'script', include: [ path.resolve(__dirname, 'lib') ] },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', '!css!sass'),
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader?limit=10000&name=assets/[name].[ext]' }, //
      { test: /\.(eot|ttf|wav|mp3|mp4)$/, loader: 'file-loader?name=assets/[name].[ext]'},
    ]
  },
  output: {
    filename: '[name].js',
    path: 'dist',
    library: 'AST',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      // images: path.resolve('./images'),
      lib: path.resolve('images'),
      config: path.resolve('config'),
    }
  },
  plugins: [
    new HtmlPack({
      // title: config.title,
      template: './src/template.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('[name].css')
  ]
};
