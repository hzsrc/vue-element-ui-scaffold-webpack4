const rm = require('rimraf')

process.env.NODE_ENV = 'production'

const config = require('../config')
config.isBuild = true; //需要生成（dist）目标文件。需放在require('webpack')之前

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.build.conf')

const spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()

rm(webpackConfig.output.path, e => !e && doWebpack())

function doWebpack(onEnd) {
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (onEnd) onEnd(err);
        if (err) throw err

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        //build有报错，整个进程需返回非0，否则影响批处理
        var errors = stats.toJson('minimal').errors;
        if (!err && errors[0]) {
            console.error('Build failed!')
            process.exitCode = 1;
            process.exit()
        }

        console.log(chalk.cyan('  Build complete.\n'))
    })
}



