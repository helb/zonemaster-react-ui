const devConfig = require('./webpack.config.js');
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
// eslint-disable-next-line import/no-extraneous-dependencies
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const WebappWebpackPlugin = require('webapp-webpack-plugin');

module.exports = merge(devConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new WebappWebpackPlugin({
      logo: './app/assets/icons/favicon.svg',
      prefix: 'icons-[hash:8]/',
      title: 'Zonemaster',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false
      }
    }),
    new CopyWebpackPlugin([{ from: './app/assets/og-image.png' }])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true
      })
    ]
  }
});
