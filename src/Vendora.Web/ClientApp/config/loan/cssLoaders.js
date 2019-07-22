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

const output = (name) => `static/css/${name}.[md5:contenthash:hex:20].css`;

module.exports = [
  {
    test: lessRegex,
    output: output('global'),
    localIdentName: '[local]',
    exclude: [ lessAntdRegex, lessModuleRegex ],
    sideEffects: true,
    modifyVars
  },
  {
    test: lessAntdRegex,
    output: output('antd'),
    localIdentName: '[local]',
    sideEffects: true,
    modifyVars
  },
  {
    test: lessModuleRegex,
    output: output('module'),
    localIdentName: '[name]__[local]__[hash:base64:5]',
    otherLoaders: ['css-type-loader'],
    modifyVars
  }
]
