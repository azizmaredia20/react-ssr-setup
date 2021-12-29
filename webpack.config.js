const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.NODE_ENV || 'development';

module.exports = {
  entry: './src/client/index.js',
  mode,
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: false,
  resolve: { extensions: ['*', '.js', '.jsx'] },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js'],

    })
  ],
  // devServer: {
  //   contentBase: path.join(__dirname, 'public/'),
  //   port: 3000,
  //   publicPath: 'http://localhost:3000/dist/',
  //   hotOnly: true
  // },
  // plugins: [new webpack.HotModuleReplacementPlugin()]
};