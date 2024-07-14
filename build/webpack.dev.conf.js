const utils = require('./utils')
const multiPage = require('./multi-page')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const webpackIconfontPluginNodejs = require('./svg2font.js')

process.title = 'dev-server';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: false })
    },
    output: {
        filename: utils.assetsPath('h5/js/[name].js'),
        chunkFilename: utils.assetsPath('h5/js/[id].js'),
    },
    devtool: false, //'inline-source-map', // see SourceMapDevToolPlugin
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        ...multiPage.htmlPlugins(baseWebpackConfig),
        webpackIconfontPluginNodejs,
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
        new webpack.EvalSourceMapDevToolPlugin({
            filename: '[name].js.map',
            module: true,
            columns: true,
            exclude: /node_modules/,
        }),
    ],
    optimization: {
        runtimeChunk: false,
        minimize: false,
        //noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                vendor: { // key 为entry中定义的 入口名称
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    chunks: 'all', //all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
                    priority: 10,
                    reuseExistingChunk: true, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
                    test: /node_modules[\\/]/
                },
            }
        },
    },
    cache: {
        type: 'filesystem', //启用文件缓存，加快后续启动
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500, // 500ms内的多次修改，只重新编译一次
        //poll: 500, // 轮询
    },
})
