var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: __dirname
      },
      {
        test: /\.less$/,
        loader: "style!css!less",
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
}
