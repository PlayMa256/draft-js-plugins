const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Set up dev host host and HMR host. For the dev host this is pretty self
// explanatory: We use a different live-reload server to server our static JS
// files in dev, so we need to be able to actually point a script tag to that
// host so it can load the right files. The HRM host is a bit stranger. For more
// details on why we need this URL see the readme and:
// https://github.com/glenjamin/webpack-hot-middleware/issues/37
const DEV_PORT = process.env.DEV_PORT || 3000;
const DEV_HOST = `//localhost:${DEV_PORT}/`;
const HMR_HOST = `${DEV_HOST}__webpack_hmr`;

module.exports = Object.assign(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: {
    app: [
      '@babel/polyfill',
      './client/index.js',
      `webpack-hot-middleware/client?path=${HMR_HOST}`,
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: DEV_HOST,
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
