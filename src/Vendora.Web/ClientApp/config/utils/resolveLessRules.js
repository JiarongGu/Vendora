module.exports = function ({
  test,
  include,
  exclude,
  extractPlugin,
  localIdentName,
  path,
  sideEffects,
  otherLoaders = [],
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
              path
            }
          }
        },
        {
          loader: "less-loader",
          options: {
            modifyVars: {
              'primary-color': '#637f3f',//green
              'link-color': '#88ad58',//dark gray
              'border-color-base': '#637f3f',//dark gray
              'text-color': '#4d4c53',//dark gray
              'text-color-secondary': '#9599a5',
              'border-radius-base': '1px'
            },
            javascriptEnabled: true
          }
        }
      ]
    })
  });
}
