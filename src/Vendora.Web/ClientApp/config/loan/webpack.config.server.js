const path = require('path');
const paths = require('./paths');

module.exports = function () {
  return {
    target: 'node',
    entry: {
      loan_ssr: './projects/loan/boot-server.tsx'
    },
    devtool: false,
    output: {
      filename: 'bundle.js',
      libraryTarget: 'commonjs',
      path: `${paths.appBuild}/server`
    }
  };
}
