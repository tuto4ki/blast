const path = require('path');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  mode: "production",
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, '../dist'),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  devtool: false,
});
