//var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';

module.exports = function(env, values) {
  const publicPath = values.public || '';
  const project = values.project || '';
  const baseConfig = require(`./config/${project}/webpack.config.base.js`)(publicPath);
  const customConfig = require(`./config/${project}/webpack.config.${env}.js`)(publicPath);

  const plugins = baseConfig.plugins.concat(customConfig.plugins || []);

  const customRules = (customConfig.module && customConfig.module.rules) || [];

  const rules = baseConfig.module.rules
    .filter(r => !customRules.find(cr => cr.test.toString() === r.test.toString()))
    .concat(customRules);

  const module = { ...baseConfig.module, ...customConfig.module, rules };

  return { ...baseConfig, ...customConfig, plugins, module };
};
