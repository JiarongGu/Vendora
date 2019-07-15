const path = require('path');
const webpack = require('webpack');

// paths
const paths = require('./paths');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// style files regex
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const lessAntdRegex = /node_modules[\/\\]+antd.*less$/;

// utils
const resolveLessRules = require('../utils/resolveLessRules');
const resolveSource = (...args) => path.resolve(paths.appSrc, ...args);

const resolvedAlias = Object.keys(paths.alias)
  .map(key => ({
    key: [key],
    path: resolveSource(paths.alias[key])
  }))
  .reduce((a, c) => (a[c.key] = c.path, a), {});

module.exports = function (publicPath) {
  const extractGlobalLessPlugin = new ExtractTextPlugin({
    filename: `static/css/global.[md5:contenthash:hex:20].css`
  });
  const extractAntdLessPlugin = new ExtractTextPlugin({
    filename: `static/css/antd.[md5:contenthash:hex:20].css`
  });
  const extractModuleLessPlugin = new ExtractTextPlugin({
    filename: 'static/css/module.[md5:contenthash:hex:20].css'
  });

  return {
    context: paths.appSrc,
    entry: {
      loan: './projects/loan/boot-client.tsx'
    },
    output: {
      path: paths.appBuild,
      filename: 'static/js/[name].[hash:8].js',
      chunkFilename: 'static/js/[name].[hash:8].chunk.js',
      publicPath: `/${publicPath}`
    },
    target: 'web',
    resolve: {
      extensions: ['.js', 'jsx', '.json', '.ts', '.tsx'],
      alias: resolvedAlias
    },
    module: {
      rules: [{
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /banks.*\.(png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
            },
          }]
      },
      resolveLessRules({
        test: lessRegex,
        localIdentName: '[local]',
        extractPlugin: extractGlobalLessPlugin,
        path: __dirname,
        exclude: [ lessAntdRegex, lessModuleRegex ],
        sideEffects: true
      }),
      resolveLessRules({
        test: lessAntdRegex,
        localIdentName: '[local]',
        extractPlugin: extractAntdLessPlugin,
        path: __dirname,
        sideEffects: true
      }),
      resolveLessRules({
        test: lessModuleRegex,
        localIdentName: '[name]__[local]___[hash:base64:5]',
        extractPlugin: extractModuleLessPlugin,
        path: __dirname,
        otherLoaders: ['css-type-loader']
      }),
      ]
    },
    plugins: [
      new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin(),
      new WebpackCleanupPlugin(),
      extractAntdLessPlugin,
      extractGlobalLessPlugin,
      extractModuleLessPlugin
    ]
  };
}
