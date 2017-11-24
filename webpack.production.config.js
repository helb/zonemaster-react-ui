const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'nosources-source-map',
  // The entry file. All your app roots from here.
  entry: [
    // Polyfills go here too, like babel-polyfill or whatwg-fetch
    'babel-polyfill',
    path.join(__dirname, 'app/index.jsx')
  ],
  // Where you want the output to go
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // webpack gives your modules and chunks ids to identify them. Webpack can vary the
    // distribution of the ids to get the smallest id length for often used ids with
    // this plugin
    new webpack.optimize.OccurrenceOrderPlugin(),

    // handles creating an index.html file and injecting assets. necessary because assets
    // change name because the hash part changes. We want hash name changes to bust cache
    // on client browsers.
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new FaviconsWebpackPlugin('./app/assets/icons/favicon.svg'),
    // extracts the css from the js files and puts them on a separate .css file. this is for
    // performance and is used in prod environments. Styles load faster on their own .css
    // file as they dont have to wait for the JS to load.
    new ExtractTextPlugin('[name]-[hash].min.css'),
    // handles uglifying js
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: m => /node_modules/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks: m => /node_modules\/(?:react|react-router|babel|dexie|styl)/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'router',
      minChunks: m => /node_modules\/(?:react-router|babel|dexie|styl)/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'dexie',
      minChunks: m => /node_modules\/(?:babel|dexie|styl)/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'styled',
      minChunks: m => /node_modules\/(?:babel|styl)/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfill',
      minChunks: m => /node_modules\/(?:babel)/.test(m.context)
    }),
    // plugin for passing in data to the js, like what NODE_ENV we are in.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    // loaders handle the assets, like transforming sass to css or jsx to js.
    rules: [
      {
        enforce: 'pre', // Runs before other loaders
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
  // postcss: [require('autoprefixer')]
};
