const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, 'app/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.svg']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-react-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
};
