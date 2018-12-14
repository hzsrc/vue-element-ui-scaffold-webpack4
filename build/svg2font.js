const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
const path = require('path');

module.exports = new WebpackIconfontPluginNodejs({
  fontName: 'flaginfo-app-icon',
  svgs: path.resolve(__dirname, '../src/assets/fonts/svg/*.svg'),
  template: path.resolve(__dirname, '../src/assets/fonts/template.scss.njk'),
  fontsOutput: path.resolve(__dirname, '../src/assets/fonts'),
  cssOutput: path.resolve(__dirname, '../src/styles/font.css'),
  htmlOutput: path.resolve(__dirname, '../src/assets/fonts/font-preview.html'),
  formats: ['ttf', 'woff', 'svg'],
  cssPrefix: 'van-icon'
})
