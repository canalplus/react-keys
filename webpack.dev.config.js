const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: ['./dev/dev.jsx'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new LiveReloadPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
