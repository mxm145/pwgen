const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: './app.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  target: 'electron-main',
  plugins: [
    new UglifyJSPlugin()
  ]
}