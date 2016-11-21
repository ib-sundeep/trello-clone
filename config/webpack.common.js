const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  entry: {
    'app': [
      helpers.root('client/app/index.js')
    ]
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/'
  },

  resolve: {
    cache: true,
    root: helpers.root(),
    extensions: ['', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'app': 'client/app'
    }
  },

  module: {
    loaders: [
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root('client'),
        loader: 'babel'
      },

      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('client/public/index.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin('css/[name].[hash].css', { disable: !isProd })
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ]
};
