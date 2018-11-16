const path = require('path');

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
  plugins: [],
  devServer: {
    contentBase: __dirname + "/public/",
    host: "localhost",
    port: 8080
  },
  mode: "development"
};