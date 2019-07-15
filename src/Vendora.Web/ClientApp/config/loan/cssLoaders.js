const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const lessAntdRegex = /node_modules[\/\\]+antd.*less$/;
const modifyVars = {
  'primary-color': '#637f3f',//green
  'link-color': '#88ad58',//dark gray
  'border-color-base': '#637f3f',//dark gray
  'text-color': '#4d4c53',//dark gray
  'text-color-secondary': '#9599a5',
  'border-radius-base': '1px'
}

module.exports = [
  {
    test: lessRegex,
    output: 'static/css/global.[md5:contenthash:hex:20].css',
    localIdentName: '[local]',
    exclude: [ lessAntdRegex, lessModuleRegex ],
    sideEffects: true,
    modifyVars
  },
  {
    test: lessAntdRegex,
    output: 'static/css/antd.[md5:contenthash:hex:20].css',
    localIdentName: '[local]',
    sideEffects: true,
    modifyVars
  },
  {
    test: lessModuleRegex,
    output: 'static/css/module.[md5:contenthash:hex:20].css',
    localIdentName: '[name]__[local]__[hash:base64:5]',
    modifyVars
  }
]
