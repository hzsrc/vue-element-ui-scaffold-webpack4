var config = require('../config')

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// var proxyMiddleware = require('http-proxy-middleware')
// var proxyTable = config.dev.proxyTable

//进度
var readline = require('readline');
webpackConfig.plugins.push(new webpack.ProgressPlugin((percentage, msg) => {
    //移动光标
    readline.clearLine(process.stdout);
    console.log('  ' + (percentage * 100).toFixed(2) + '%', msg);
    readline.moveCursor(process.stdout, 0, -1);
}));

var app = express()
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
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

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//     var options = proxyTable[context]
//     if (typeof options === 'string') {
//         options = {target: options}
//     }
//     app.use(proxyMiddleware(options.filter || context, options))
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
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

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}

if (process.argv.indexOf('--mock') > -1) // --mock
   require('dynamic-mocker').start('./mock/mock-config.js')
