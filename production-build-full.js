var ReactDom = require('react-dom/server')
var reactElement = require('./dist/main').default;
var fs = require('fs')
var html = fs.readFileSync('./dist/index.html').toString()

fs.writeFileSync(
  './dist/index.html',
  html.replace('{{{content}}}', ReactDom.renderToString(reactElement))
);

process.exit(0);
