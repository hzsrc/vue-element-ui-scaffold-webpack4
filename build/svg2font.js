const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
const path = require('path');
const dir = 'src/iconfont'

module.exports = new WebpackIconfontPluginNodejs({
    fontName: 'my-app-icon',
    //连带Web下的svg一起
    svgs: [path.join(dir, 'svgs/**/*.svg'), '../Web/Styles/iconfont/svgs/**/*.svg'],
    template: path.join(dir, 'css-template.njk'),
    fontsOutput: path.join(dir, 'fonts/'),
    cssOutput: path.join(dir, 'fonts/font.css'),
    // htmlOutput: path.join(dir, 'fonts/_font-preview.html'),
    jsOutput: path.join(dir, 'fonts/fonts.js'),
    formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'my-icon',
    startUnicode: 300,
    descent: 150, //字体基线垂直对齐问题
    maskPwd: true,
})
