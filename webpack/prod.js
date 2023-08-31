const path = require('path');
const merge = require('webpack-merge');
const base = require('./base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  mode: "production",
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "./dist")
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
});
