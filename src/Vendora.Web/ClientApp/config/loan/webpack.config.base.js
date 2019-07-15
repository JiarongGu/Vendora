// paths
const paths = require('./paths');
const cssLoaders = require('./cssLoaders');

// plugins
const configWebpack = require('../utils/configWebpack');

module.exports = function (publicPath) {
  const appPaths = {
    ...paths,
    appEntry: './projects/loan/boot-client.tsx',
    publicPath
  };

  const appConfig = { cssLoaders };

  return configWebpack(appPaths, appConfig);
}
