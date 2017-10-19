const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const StatsPlugin = require('stats-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  devtool: 'nosources-source-map',
  // The entry file. All your app roots from here.
  entry: [
    // Polyfills go here too, like babel-polyfill or whatwg-fetch
    'babel-polyfill',
    path.join(__dirname, 'src/index.jsx')
  ],
  // Where you want the output to go
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name]-[hash].min.js',
    publicPath: './'
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
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    // extracts the css from the js files and puts them on a separate .css file. this is for
    // performance and is used in prod environments. Styles load faster on their own .css
    // file as they dont have to wait for the JS to load.
    new ExtractTextPlugin('[name]-[hash].min.css'),
    // handles uglifying js
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true
    }),
    // creates a stats.json
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks: module => module.context && module.context.indexOf('node_modules') >= 0
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      filename: 'react.[hash].js',
      minChunks: module =>
        module.context &&
        module.context.indexOf('node_modules') >= 0 &&
        module.context.indexOf('react') >= 0
    }),

    // plugin for passing in data to the js, like what NODE_ENV we are in.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    // loaders handle the assets, like transforming sass to css or jsx to js.
    rules: [
      // {
      //   enforce: 'pre', // Runs before other loaders
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
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
        test: /\.s[ac]ss$/,
        // we extract the styles into their own .css file instead of having
        // them inside the js.
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[name]---[local]---[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
  // postcss: [require('autoprefixer')]
};
