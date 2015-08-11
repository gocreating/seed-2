var path = require('path');
var webpack = require('webpack');

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
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:3001',
    path.resolve(__dirname, '../src/core/flux/boot.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../build/debug/core/public/js'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/core/js/',
  },
  resolve: {
    alias: {},
  },
  // watch: true,
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
deps.forEach(function(dep) {
  var depPath = path.resolve(nodeModulesDir, dep);
  webpackconfig.resolve.alias[dep.split(path.sep)[0]] = depPath;
  webpackconfig.module.noParse.push(depPath);
});

module.exports = webpackconfig;