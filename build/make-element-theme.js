//生成element的theme
var fs = require('fs');

function makeThemeVers(color, isBuild) {
    var preFile = './src/css/element-theme/theme-changed.scss';
    var varFile = './node_modules/element-theme-chalk/src/common/var.scss';
    var srcFile = './node_modules/element-theme-chalk/src/common/var-backup.scss';

    //原始文件备份
    if (!fs.existsSync(srcFile)) {
        replaceFile(varFile, null, srcFile)
    }

    //覆盖颜色
    var replaceFn;
    if (color && color.match(/^#|^rgb/)) {
        replaceFn = str => str.replace(/(\$\-\-color-primary: ).+;/g, '$1' + color + ';')
    }
    prependWith(srcFile, preFile, varFile, replaceFn);

    if (!isBuild) {
        fs.watch(preFile, (type, name) => {
            if (fs.existsSync(preFile)) {
                prependWith(srcFile, preFile, varFile, replaceFn);
            }
        })
    }
}

function replaceFile(srcFile, replaceFn, targetFile) {
    var str = fs.readFileSync(srcFile, 'utf-8');
    if (replaceFn) str = replaceFn(str);
    fs.writeFileSync(targetFile || srcFile, str, 'utf-8')
}

function prependWith(srcFile, preFile, targetFile, replaceFn) {
    var preContent = fs.readFileSync(preFile, 'utf-8');
    if (replaceFn) preContent = replaceFn(preContent);
    replaceFile(srcFile, str => preContent + str, targetFile)
}

module.exports = makeThemeVers;