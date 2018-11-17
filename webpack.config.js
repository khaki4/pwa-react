'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin-loader');

module.exports = {
  entry: {
    main: ['./src/main.js'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
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
  optimization: {
    runtimeChunk: {
      name: 'vendor'
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      context: './public',
      from: '*.*'
    }, {
      from: './src/firebase-messaging-sw.js',
      to: 'firebase-messaging-sw.js'
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