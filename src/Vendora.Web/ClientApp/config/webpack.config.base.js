const path = require('path');
const webpack = require('webpack');

// paths
const paths = require('./paths');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const extractGlobelScssPlugin = new ExtractTextPlugin({
  filename: 'static/css/globel.[md5:contenthash:hex:20].css'
});
const extractMoudleScssPlugin = new ExtractTextPlugin({
  filename: 'static/css/module.[md5:contenthash:hex:20].css'
});

// style files regexes
const sassRegex = /\.(less)$/;
const sassModuleRegex = /\.module\.(less)$/;

// utils
const resolveLessRules = require('./utils/resolveLessRules');

const resolveSource = (...args) => path.resolve(paths.appSrc, ...args);
const resolveAlias = {
  '@shared': resolveSource('shared'),
  '@models': resolveSource('models'),
  '@datasources': resolveSource('datasources'),
  '@components': resolveSource('components'),
  '@services': resolveSource('services'),
  '@constants': resolveSource('constants')
};

module.exports = {
  context: paths.appSrc,
  entry: {
    app: './boot-client.tsx'
  },
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', 'jsx', '.json', '.ts', '.tsx'],
    alias: resolveAlias
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      resolveLessRules({
        test: sassRegex,
        localIdentName: '[local]',
        extractPlugin: extractGlobelScssPlugin,
        path: __dirname,
        exclude: sassModuleRegex,
        sideEffects: true
      }),
      resolveLessRules({
        test: sassModuleRegex,
        localIdentName: '[name]__[local]___[hash:base64:5]',
        extractPlugin: extractMoudleScssPlugin,
        path: __dirname
      }),
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin(),
    new WebpackCleanupPlugin(),
    extractGlobelScssPlugin,
    extractMoudleScssPlugin
  ]
};
