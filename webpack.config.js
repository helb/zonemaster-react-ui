const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', 'react-hot-loader/patch', './src/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000
  }
};
