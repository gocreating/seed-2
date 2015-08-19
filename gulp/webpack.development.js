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
  entry: {
    // reloads the entire page after the HMR update fails
    // devServer: 'webpack/hot/dev-server',
    // reload the page on your own
    // 'webpack/hot/only-dev-server',
    // devClient: 'webpack-dev-server/client?http://localhost:8080',
    core: [
      path.resolve(__dirname, '../src/core/flux/boot.js'),
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
    ],
    user: [
      path.resolve(__dirname, '../src/user/flux/boot.js'),
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
    ],
    // vendors: ['react'],
  },
  output: {
    path: path.resolve(__dirname, '../build/debug/public/'),
    filename: 'js/[name]/bundle.js',
    publicPath: 'http://localhost:8080/',
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
        include: path.join(__dirname, '../src/core/public'),
      },
      // CSS
      {
        test: /\.css$/,
        loader: 'style!css',
        include: path.join(__dirname, '../build/debug/public'),
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('js/common.js', ['core', 'user']),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

deps.forEach(function(dep) {
  var depPath = path.resolve(nodeModulesDir, dep);
  webpackconfig.resolve.alias[dep.split(path.sep)[0]] = depPath;
  webpackconfig.module.noParse.push(depPath);
});

module.exports = webpackconfig;