'use strict';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin-loader');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/, // include .js files
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      include: path.resolve(__dirname, './src'),
      use: [{
        loader: "babel-loader"
      }]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      context: './public',
      from: '*.*'
    }]),
    new SWPrecacheWebpackPlugin({
      staticFileGlobs: [
        path.join(path.resolve(__dirname, './build'), '**/*')
      ],
      logger: function () {},
      filename: 'sw.js'
    })
  ],
  devServer: {
    contentBase: __dirname + "/public/",
    host: "localhost",
    port: 8080
  },
  mode: "development"
};