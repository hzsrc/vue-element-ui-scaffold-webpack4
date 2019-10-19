const webpack = require('webpack')
const JoinFileContentPlugin = require('join-file-content-plugin')

var appConfig = require('../config/app-config')
var config = require('../config/index')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
var isProd = process.env.ENV_CONFIG === 'prod'

module.exports = function (isBuild) {
    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                ENV_CONFIG: JSON.stringify(process.env.ENV_CONFIG),
            }
        }),
        // 将theme-changed.scss应用到element-ui，供babel-plugin-component按需加载
        new JoinFileContentPlugin({
            file: 'node_modules/element-theme-chalk/src/common/var.scss',
            prependFile: 'src/css/element-theme/theme-changed.scss'
        }),
        //生成仅包含颜色的替换样式（主题色等）
        new ThemeColorReplacer({
            fileName: 'css/theme-colors.[contenthash:8].css',
            matchColors: [
                ...forElementUI.getElementUISeries(appConfig.themeColor),  //element-ui主色系列
                '#0cdd3a',  //自定义颜色
                '#c655dd',
            ],
            changeSelector: forElementUI.changeSelector,
            isJsUgly: isBuild,
            // injectCss: false,
            // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
            //     return resultCss + youCssCode
            // }
        })
    ]

    if (!isBuild) {
        plugins.push(require('../build/svg2font.js'))
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: `${config.sourceMapPath}/[filebase].map`,
            append: isProd ? false : undefined, // undefined会自动加载源码映射，生产环境慎用。false时不会
        }))
    } else {
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
        plugins.push(new webpack.SourceMapDevToolPlugin())
    }
    return plugins
}
