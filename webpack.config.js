
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'css-math',
  'jquery',
  'html-entities',
  'lodash/forEach',
  'lodash/findKey',
  'lodash/pickBy',
  'lodash/camelCase',
  'lodash/kebabCase',
  'lodash/trim',
  'lodash/get',
  'lodash/uniq',
  'lodash/sortBy',
  'lodash/mapValues',
];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'manifest',
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

module.exports = config;
