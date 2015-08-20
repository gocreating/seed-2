var path = require('path');
var webpack = require('webpack');
var settings = require('../src/core/settings');

var installedApps = settings.installedApps;
var appArray = [];
for (var appName in installedApps) {
  appArray.push(appName);
}

/**
 * Ref: https://christianalfoni.github.io
 *      /react-webpack-cookbook/Optimizing-development.html
 */
var nodeModulesDir = path.join(__dirname, '../node_modules');
var deps = [
  'react/dist/react.min.js',
  'react-router/umd/ReactRouter.min.js',
];

var webpackconfig = {
  entry: {
    // reloads the entire page after the HMR update fails
    // devServer: 'webpack/hot/dev-server',
    // reload the page on your own
    // 'webpack/hot/only-dev-server',
    // devClient: 'webpack-dev-server/client?http://localhost:8080',
  },
  output: {
    path: path.resolve(__dirname, '../build/debug/public/'),
    filename: 'js/[name]/bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  externals: {
    // require("jquery") is external and available
    // on the global var $
    jquery: '$',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {},
  },
  // watch: true,
  module: {
    noParse: [],
    loaders: [
      // REACT
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      },
      // LESS
      {
        test: /\.less$/,
        loader: 'style!css!less',
        // include: path.join(__dirname, '../src/core/public'),
      },
      // CSS
      {
        test: /\.css$/,
        loader: 'style!css',
        // include: path.join(__dirname, '../build/debug/public'),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('js/common.js', appArray),
  ],
};

appArray.forEach(function(appName) {
  webpackconfig.entry[appName] = [
    path.resolve(__dirname, '../src', appName, 'flux/boot.js'),
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
  ];
});

deps.forEach(function(dep) {
  var depPath = path.resolve(nodeModulesDir, dep);
  webpackconfig.resolve.alias[dep.split(path.sep)[0]] = depPath;
  webpackconfig.module.noParse.push(depPath);
});

module.exports = webpackconfig;