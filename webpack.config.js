const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'reactKeys.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactKeys',
    libraryTarget: 'umd',
  },
  mode: 'production',
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
    new MinifyPlugin({
      removeConsole: true,
      removeDebugger: true,
    }),
  ],
};
