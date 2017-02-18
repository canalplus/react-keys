const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'reactKeys.js',
    path: './dist',
    library: 'ReactKeys',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ],
};
