const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
const path = require('path');
var dir = 'src/iconfont'
module.exports = new WebpackIconfontPluginNodejs({
    fontName: 'my-app-icon',
    svgs: path.join(dir, 'svgs/*.svg'),
    template: path.join(dir, 'fonts/css.njk'),
    fontsOutput: path.join(dir, 'fonts/'),
    cssOutput: path.join(dir, 'fonts/font.css'),
    htmlOutput: path.join(dir, 'fonts/_font-preview.html'),
    jsOutput: path.join(dir, 'fonts/fonts.js'),
    formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon'
})
