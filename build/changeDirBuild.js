//当dist作为服务目录时，避免出现build期间网站不能访问。
//如果不是以dist做服务目录，无需此过程

const rm = require('rimraf')
const fs = require('fs');
const chalk = require('chalk');

module.exports = function changeDirBuild(webpackConfig, doWebpack) {
    const distDir = webpackConfig.output.path;
    const ingDir = distDir + '-ing';
    const delDir = distDir + '-del';
    webpackConfig.output.path = ingDir;

    doWebpack(renameDir);

    function renameDir(err) {
        if (err) throw err;
        let tryCount = 0;
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
