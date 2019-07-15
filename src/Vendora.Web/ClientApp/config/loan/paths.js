const path = require('path');

const appSrc = path.join(__dirname, '../../src');
const appPublic = path.resolve(__dirname, '../../public/loan');
const appBuild = path.resolve(__dirname, '../../build/loan');

const alias = {
  '@shared': 'shared',
  '@loan': 'projects/loan'
};

module.exports = {
  appSrc: appSrc,
  appBuild: appBuild,
  appPublic: appPublic,
  alias: alias
}
