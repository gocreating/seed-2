var path = require('path');
var webpack = require('webpack');
var settings = require('../src/core/settings.client');

var installedApps = settings.installedApps;
var appArray = [];
for (var appName in installedApps) {
  appArray.push(appName);
}

var webpackconfig = {
  entry: {},
  output: {
    path: path.resolve(__dirname, '../build/release/public/'),
    filename: 'js/[name]/bundle.js',
  },
  externals: {
    jquery: '$',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {},
  },
  module: {
    noParse: [],
    loaders: [
      // REACT
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader?stage=0',
        ],
        exclude: /node_modules/,
      },
      // LESS
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      // CSS
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('js/common.js', appArray),
  ],
};

appArray.forEach(function(appName) {
  webpackconfig.entry[appName] = [
    path.resolve(__dirname, '../src', appName, 'flux/boot.js'),
  ];
});

module.exports = webpackconfig;