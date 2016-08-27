const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');
const app = express();
const compiler = webpack(webpackConfig);
const winston = require('winston');

app.use(express.static(__dirname + '/dev/')); // setup your own dev folder

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  stats: { colors: true },
  publicPath: webpackConfig.output.publicPath,
}));

app.listen(3000, () => winston.info('dev server running on port 3000 o//'));
