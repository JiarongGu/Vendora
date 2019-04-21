const path = require('path');

const appSrc = path.join(__dirname, '../src');
const appPublic = path.resolve(__dirname, '../public');
const appBuild = path.resolve(__dirname, '../build');

const alias = {
  '@styles': 'styles',
  '@models': 'models',
  '@components': 'components',
  '@services': 'services',
  '@constants': 'constants',
  '@pages': 'pages',
  '@layouts': 'layouts',
  '@utilities': 'utilities'
};

module.exports = {
  appSrc: appSrc,
  appBuild: appBuild,
  appPublic: appPublic,
  alias: alias
}