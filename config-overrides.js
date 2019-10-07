const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1D334A',
      '@body-background': '#131519',
      '@component-background': '#a6a7ab',
      '@layout-body-background': '#131519',
      '@layout-header-background': '#131519',
      '@modal-body-padding': '0px'
    }
  })
)
