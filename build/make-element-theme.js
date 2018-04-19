//生成element的theme
var fs = require('fs');

function makeThemeVers(color, isBuild) {
    var src = './src/assets/css/element-theme/theme-element-variables.scss';
    var dest = './node_modules/element-theme-chalk/src/common/var.scss';
    //替换颜色
    if (color && color.match(/^#|^rgb/)) {
        replaceFile('./src/assets/css/defines.scss'
            , str => str.replace(/(\$color\-primary: ).+;/g, '$1' + color + ';')
        );
        replaceFile(src
            , str => str.replace(/(\-\-color\-primary: ).+;/g, '$1' + color + ';')
            , dest)
    }
    else {
        replaceFile(src, null, dest)
    }

    if (!isBuild) {
        fs.watch(src, (file) => {
            if (file && fs.existsSync(src)) replaceFile(src, null, dest)
        })
    }
}

function replaceFile(file, replaceFn, targetFile) {
    var str = fs.readFileSync(file, 'utf-8');
    if (replaceFn) str = replaceFn(str);
    fs.writeFileSync(targetFile || file, str, 'utf-8')
}

module.exports = makeThemeVers;