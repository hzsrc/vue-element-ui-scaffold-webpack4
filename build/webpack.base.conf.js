var path = require('path')
var utils = require('./utils')
var multiPage = require('./multi-page')
var config = require('../config')
var webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader');
var appConfig = require('../config/app-config')
const ThemeColorReplacer = require('webpack-theme-color-replacer')

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
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            /*{
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              enforce: 'pre',
              include: [resolve('src'), resolve('test')],
              options: {
                formatter: require('eslint-friendly-formatter')
              }
            },*/
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test')],
                use: [
                    //step-2
                    'babel-loader?cacheDirectory',
                    //step-1
                    'js-conditional-compile-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('font/[name].[hash:7].[ext]')
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
        //生成仅包含颜色的替换样式（主题色等）
        new ThemeColorReplacer({
            fileName: appConfig.themeFile,
            matchColors: [
                ...ThemeColorReplacer.getElementUISeries(appConfig.themeColor),  //element-ui主色系列
                '#0cdd3a',  //自定义颜色
                '#c655dd',
            ],
            // 因懒加载模块的css在主题色样式theme-colors.css之后加载，会覆盖theme-colors.css的样式，导致主题色替换失败。为了避免这情况，需要添加前缀提升优先级。
            changeSelector(name) {
                // element-ui这几个样式太宽泛，需减小范围
                switch (name) {
                    case '.el-button:active':
                    case '.el-button:focus,.el-button:hover':
                        return name + '.el-button--default:not(.is-plain):not(.el-button--primary)'
                    case '.el-button.is-plain:active' :
                    case '.el-button.is-plain:focus,.el-button.is-plain:hover':
                        return name + '.el-button--default'
                    case '.el-pagination button:hover':
                        return name + ':not(:disabled)'
                    default:
                        return 'body ' + name
                }
            },
        })
    ],

    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
