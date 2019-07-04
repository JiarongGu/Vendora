const path = require('path');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// paths
const paths = require('./paths');

module.exports = function (publicPath) {
  return {
    entry: {
      app: './boot-client.tsx'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    devtool: false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new CopyWebpackPlugin([{
        from: paths.appPublic,
        to: paths.appBuild
      }], {
          ignore: ['index.html']
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(paths.appPublic, 'index.html'),
        minify: true
      })
    ]
  };
}
