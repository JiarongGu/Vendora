module.exports = function ({
  test,
  include,
  exclude,
  extractPlugin,
  localIdentName,
  sideEffects,
  otherLoaders = [],
  modifyVars = {}
}) {
  return ({
    test,
    include,
    exclude,
    sideEffects,
    use: extractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-hot-loader',
        ...otherLoaders,
        {
          loader: 'css-loader',
          query: {
            modules: true,
            camelCase: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: localIdentName,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: __dirname
            }
          }
        },
        {
          loader: "less-loader",
          options: {
            modifyVars,
            javascriptEnabled: true
          }
        }
      ]
    })
  });
}
