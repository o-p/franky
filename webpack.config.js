var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPack = require('html-webpack-plugin');

var argv = require('minimist')(process.argv.slice(1));

var dist = argv.dist || 'dist/builder';

var loaders = argv.base64 ?
  [ // with url-loader (base64 image files < 10k)
    {
      test: /\.jsx?$/,
      loader: 'babel',
      include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'config')],
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', '!css!sass'),
    },
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader?limit=10000&name=assets/[name].[ext]' },
    { test: /\.(eot|ttf|wav|mp3|mp4)$/, loader: 'file-loader?name=assets/[name].[ext]'},
  ] :
  [ // without url-loader
    {
      test: /\.jsx?$/,
      loader: 'babel',
      include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'config')],
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', '!css!sass'),
    },
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|wav|mp3|mp4)$/, loader: 'file-loader?name=assets/[name].[ext]'},
  ];

var plugins = argv.dev ?
  [ // development build:
    new HtmlPack({
      title: argv.title || 'KKBOX Sponsored Premium',
      template: argv.template || './src/template.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ] :
  [ // production build:
    new HtmlPack({
      title: argv.title || 'KKBOX Sponsored Premium',
      template: argv.template || './src/template.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    })
  ];

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader?failOnError=true",
        include: [path.resolve(__dirname, 'src')]
      }
    ],
    loaders,
  },
  output: {
    filename: '[name].js',
    path: dist,
    library: 'AST',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      lib: path.resolve('lib'),
      config: path.resolve('config'),
    }
  },
  plugins,
};
