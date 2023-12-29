const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const openBrowser = require('react-dev-utils/openBrowser');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// to reuse same chrome tab
const host = 'localhost';
const port = 8080;

// sets bool to use react fast refresh
const isUsingFastRefresh = process.env.FAST;

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    onListening: () => {
      openBrowser(`http://${host}:${port}`);
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    liveReload: false,
    https: false, // true for self-signed, object for cert authority
    client: {
      logging: 'warn', // only errors & warns on hot reload
      overlay: true,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [isUsingFastRefresh && 'react-refresh/babel'].filter(
              Boolean
            ),
          },
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(scss|sass|css)$/i,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    isUsingFastRefresh && new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.PORT': JSON.stringify('8080'),
    }),
  ].filter(Boolean),
});
