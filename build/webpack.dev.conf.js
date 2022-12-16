const utils = require('./utils')
const multiPage = require('./multi-page')
const webpack = require('webpack')
const config = require('../config')
const {merge} = require('webpack-merge')
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
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: false})
    },
    devtool: 'eval-source-map',
    plugins: [
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
        new webpack.SourceMapDevToolPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        ...multiPage.htmlPlugins(baseWebpackConfig),
        webpackIconfontPluginNodejs
    ],
    optimization: {
        runtimeChunk: false,
        minimize: false,
        //noEmitOnErrors: true,
        splitChunks: false
    },
    cache: {
        type: 'filesystem', //启用文件缓存，加快后续启动
    },
})
