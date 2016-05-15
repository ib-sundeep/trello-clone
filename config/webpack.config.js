const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

module.exports = function makeWebpackConfig() {
  var config = {};

  config.devtool = isProd ? null:  'eval-source-map';

  config.debug = !isProd;

  config.entry = {
    'app': [root('client/app/index.js')]
  };

  if (!isProd) {
    config.entry.app = [
      'webpack-hot-middleware/client?reload=true',
      ...config.entry.app
    ];
  }

  config.output = {
    path: root('dist'),
    publicPath: '/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    cache: true,
    root: root(),
    extensions: ['', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'app': 'client/app'
    }
  };

  config.module = {
    loaders: [
      // JS files
      {
        test: /\.jsx?$/,
        include: root('client'),
        loaders: ['babel-loader']
      },

      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
      }
    ]
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      template: root('client/public/index.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin('css/[name].[hash].css', { disable: !isProd })
  ];

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          screw_ie8: true
        }
      }),
      new CopyWebpackPlugin([{
        from: root('client/public')
      }])
    );
  }

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  config.devServer = {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat('../', ...args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
