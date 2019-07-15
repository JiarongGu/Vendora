var path = require('path');
var webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// paths
const paths = require('./paths');

// webpack-dev-server
const devServer = {
  hot: true,
  contentBase: path.resolve(__dirname, 'build'),
  publicPath: '/',
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'https://localhost:5001',
      secure: false,
      changeOrigin: true
    }
  }
};

module.exports = function (publicPath) {
  return {
    devtool: 'source-map',
    devServer,
    module: {
      rules: [{
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(paths.appPublic, 'index.html'),
        minify: false
      }),
      new CopyWebpackPlugin([{
        from: paths.appPublic,
        to: paths.appBuild
      }], {
          ignore: ['index.html']
        })
    ]
  }
}
