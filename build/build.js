//生成主题颜色变量，供生成过程中使用
require('./make-element-theme.js')(null, true);

require('./check-versions')()

// process.env.NODE_ENV = 'production'

var config = require('../config')
config.isBuild = true; //需要生成（dist）目标文件。需放在require('webpack')之前

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var buildByArgv = require('./build-argv.js');
var fs = require('fs');
var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()

var hasBuilt = buildByArgv(webpackConfig, changeDirBuild);
if (!hasBuilt) changeDirBuild()

//避免影响线上的dist目录，导致build期间不能访问
function changeDirBuild() {
    var distDir = webpackConfig.output.path;
    var ingDir = distDir + '-ing';
    var delDir = distDir + '-del';
    webpackConfig.output.path = ingDir;

    doWebpack(renameDir);

    function renameDir(err) {
        if (err) throw err;
        var tryCount = 0;
        try {
            if (fs.existsSync(delDir)) rm(delDir, step1);
            else step1()
        } catch (e) {
            console.log(chalk.yellow(e));
        }

        //当前dist变为dist-del
        function step1() {
            try {
                if (fs.existsSync(distDir)) fs.renameSync(distDir, delDir);
                step2();
            } catch (e) {
                console.log(chalk.yellow('当前' + distDir + '文件夹正在被访问，无法替换。等待稍后重试..'));
                //可能正在访问，重试
                if (tryCount++ < 5) {
                    setTimeout(step1, 1000)
                }
                else {
                    step2()
                }
            }
        }

        //当前dist-ing变为dist
        function step2() {
            try {
                fs.renameSync(ingDir, distDir);
            }
            catch (e) {
                console.log(chalk.yellow('替换dist失败，请重试。' + e));
            }
            rm(delDir, e => {
            });
        }
    }
}

function doWebpack(onEnd) {

    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        onEnd(err);

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
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
}
