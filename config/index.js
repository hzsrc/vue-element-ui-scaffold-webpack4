// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

function getSourceMapPath() {
    // 根据安全级别，改成只有开发者知道的文件夹名或动态加密算法生成。(npm run show-map查看)
    // 这样既可在需要时进行手动添加源码映射方便调试，又可避免了源码泄露。
    var projName = path.basename(process.cwd())
    var md5 = require('crypto').createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update('my-' + projName);
    return '_map' + md5.digest('hex');  //加密后的值d
}

var ret = {
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '', // 使用相对路径，可不受路径层次限制
        productionSourceMap: true,
        sourceMapPath: getSourceMapPath(),
        // dist目录是否直接做为服务目录。如果是，发布过程不能中断线上服务，需要调用changeDirBuild
        distIsForServer: false,
    },
    dev: {
        port: 8090,
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         changeOrigin: true,
        //         pathRewrite: {'^/api': ''}
        //     }
        // },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: true
    }
}

module.exports = ret;
