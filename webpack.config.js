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
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
