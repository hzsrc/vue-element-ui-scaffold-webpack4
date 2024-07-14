const path = require('path')
const utils = require('./utils')
const multiPage = require('./multi-page')
const config = require('../config')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
const appConfig = require('../config/app-config')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const JoinFileContentPlugin = require('join-file-content-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: multiPage.getEntryPages(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.isBuild
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
    },
    module: {
        noParse: /^(vue|vue-router|vuex)$/,
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader', utils.conditionalCompiler],
            },
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test'), resolve('node_modules/slot-layout')],
                use: [
                    //step-2
                    {
                        loader: 'babel-loader',
                        options: { cacheDirectory: true }
                    },
                    //step-1
                    utils.conditionalCompiler,
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('h5/img/[name].[hash:7].[ext]'),
                    esModule: false
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('h5/css/[name].[hash:7].[ext]'),
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                ENV_CONFIG: JSON.stringify(process.env.ENV_CONFIG),
            }
        }),
        // 将theme-changed.scss应用到element-ui，供babel-plugin-component按需加载
        new JoinFileContentPlugin({
            file: 'node_modules/element-ui/packages/theme-chalk/src/common/var.scss',
            prependFile: 'src/css/element-var-changed.scss'
        }),
        //生成仅包含颜色的替换样式（主题色等）
        new ThemeColorReplacer({
            fileName: 'h5/css/theme-colors.[contenthash:8].css',
            matchColors: appConfig.getThemeColors(appConfig.themeColor, appConfig.otherColors),
            changeSelector: forElementUI.changeSelector,
            isJsUgly: config.isBuild,
            // injectCss: false,
            // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
            //     return resultCss + youCssCode
            // }
        })
    ],

    target: 'browserslist',
}
