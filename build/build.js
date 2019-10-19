var rm = require('rimraf')

process.env.NODE_ENV = 'production'

var config = require('../config')
config.isBuild = true; //需要生成（dist）目标文件。需放在require('webpack')之前

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.build.conf')
var changeDirBuild = require('./changeDirBuild.js')
var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()

if (config.distIsForServer) {
    changeDirBuild(webpackConfig, doWebpack)
}
else {
    rm(webpackConfig.output.path, e => !e && doWebpack())
}

function doWebpack(onEnd) {
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (onEnd) onEnd(err);

        if (err) {
            throw err
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
    })
}
