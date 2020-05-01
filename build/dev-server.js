const config = require('../config')

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// var proxyMiddleware = require('http-proxy-middleware')
// var proxyTable = config.dev.proxyTable

//进度
const readline = require('readline');
webpackConfig.plugins.push(new webpack.ProgressPlugin((percentage, msg) => {
    //移动光标
    readline.clearLine(process.stdout);
    console.log('  ' + (percentage * 100).toFixed(2) + '%', msg);
    readline.moveCursor(process.stdout, 0, -1);
}));

const app = express()
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: false,
    watchOptions: {
        //ignored: 'node_modules/**/*.js', //忽略不用监听变更的目录
        aggregateTimeout: 300, //防止重复保存频繁重新编译,500毫秒内重复保存不打包
    },
    writeToDisk: false,
    logLevel: 'warn',
    logTime: true,
    stats: 'minimal'
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (config.dev.autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

const server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}

// 启用mock
if (process.argv.indexOf('--mock') > -1) // --mock
    require('dynamic-mocker').start('./mock/mock-config.js')
