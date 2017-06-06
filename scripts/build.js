/**
 * 用來將 bundle 完成的 js 載入並 mount 進 static html mocks
 */
var debug = require('debug')('SSR') // debug message for Server Side Render
var ReactDom = require('react-dom/server')
var fs = require('fs')
var path = require('path')

var argv = Object.assign({
  path: './dist/',
  html: 'index.html',
  js: 'main.js',
  json: '../config.json',
}, require('minimist')(process.argv.slice(2)));

debug('merged arguments: ' + argv);

var files = ['html', 'js', 'json']
  .map(key => ({
    [key]: path.resolve(path.join(argv.path, argv[key])),
  }))
  .reduce((f, val) => Object.assign(f, val), {})

debug('merged file pathes: ' + files);

var js = require(files.js);
var html = fs.readFileSync(files.html).toString();
debug('html', html);

var elem = js.default;
var config = js.config;

if (config) {
  debug('the default config: ', config);
  fs.writeFileSync(
    files.json,
    JSON.stringify(config)
  );
}

fs.writeFileSync(
  files.html,
  html.replace('{{{content}}}', ReactDom.renderToString(elem))
);

process.exit(0);
