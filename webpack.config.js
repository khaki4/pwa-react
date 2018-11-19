'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/main.js'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    chunkFilename: '[name].js'
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
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        common: {
          test: /node_modules/,
          chunks: "all",
          name: 'common',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html,',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
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