var ReactDom = require('react-dom/server')
var fs = require('fs')
var path = require('path')

var argv = require('minimist')(process.argv.slice(2));
var pathHtml = path.resolve(argv.html || './dist/index.html');
var pathJs = path.resolve(argv.js || './dist/main');

var reactElement = require(pathJs).default;
var html = fs.readFileSync(pathHtml).toString()

fs.writeFileSync(
  pathHtml,
  html.replace('{{{content}}}', ReactDom.renderToString(reactElement))
);

process.exit(0);
