module.exports = function ({
  test,
  include,
  exclude,
  extractPlugin,
  localIdentName,
  path,
  sideEffects,
  ortherLoaders = [],
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
        ...ortherLoaders,
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
              path
            }
          }
        },
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }
      ]
    })
  });
}