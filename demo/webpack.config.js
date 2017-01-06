var path = require('path')
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './demo/src/index',
  output: {
    path: path.join(__dirname, './demo/dist'),
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, './dist/cached_uglify/'),
      debug: true,
      minimize: true,
      sourceMap: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.svg$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      }
    ]
  }
}
