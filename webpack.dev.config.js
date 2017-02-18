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
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
    ],
  },
  plugins: [
    new LiveReloadPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
