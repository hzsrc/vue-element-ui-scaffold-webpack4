const multiPage = require('./build/multi-page')
const isBuild = process.argv0.indexOf('vue-cli-service build') > -1
const getPlugins = require('./build/getPlugins.js')
const config = require('./config/index')

module.exports = {
    publicPath: config.publicPath,
    outputDir: config.outputDir,
    assetsDir: config.assetsDir,
    productionSourceMap: config.productionSourceMap,
    pages: multiPage.getEntryPages(isBuild),
    lintOnSave: true,
    runtimeCompiler: true, //设置为 true 后你就可以在 Vue 组件中使用 template 选项了. 增加 10kb 左右
    transpileDependencies: [], // Babel 显式转译
    css: {
        extract: true,
        sourceMap: config.productionSourceMap,
        loaderOptions: {
            scss: {},
            postcss: {
                // 这里的选项会传递给 postcss-loader
            },
        }
    },
    devServer: {
        publicPath: '',
        serverSideRender: false,
        watchOptions: {
            //ignored: 'node_modules/**/*.js', //忽略不用监听变更的目录
            aggregateTimeout: 300, //防止重复保存频繁重新编译,500毫秒内重复保存不打包
        },
        writeToDisk: false,
        logLevel: 'warn',
        logTime: true,
        stats: 'minimal'
    },
    parallel: true,

    configureWebpack: {
        plugins: getPlugins(isBuild)
    },
}

require('./build/runMock')()
