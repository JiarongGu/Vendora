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
            modifyVars: {
              'primary-color': '#5dc0a6',
              'link-color': '#5dc0a6',
              'border-color-base': '#5dc0a6',
              'text-color': '#224488',
              'text-color-secondary': '#fff',
              'border-radius-base': '2px'
            },
            javascriptEnabled: true
          }
        }
      ]
    })
  });
}