var fs = require('fs'), path = require('path')

module.exports = function (webpackConfig, next) {
    //node build/build.js -out dist2
    var outIndex = process.argv.indexOf('-out')
    if (outIndex > -1) {
        webpackConfig.output.path = path.resolve(process.argv[outIndex + 1])
    }

    //生成指定的entry
    //node build/build-argv.js -entry file1 file2 ...
    var entryPos = process.argv.indexOf('-entry')
    if (entryPos > -1) {
        var files = process.argv
            .slice(entryPos + 1)
            .map(fn => path.resolve(fn))
            .filter(fn => fs.existsSync(fn))
        webpackConfig.entry = files
        //webpackConfig.plugins = webpackConfig.plugins.filter(checkHtmlPlugin)
        console.log('\nEntry: ' + files)
        next()
        return true
    }
}
