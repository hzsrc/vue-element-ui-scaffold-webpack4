module.exports = {
    publicPath: '',
    outputDir: 'dist',
    assetsDir: '',
    productionSourceMap: process.env.ENV_CONFIG !== 'prod',
    sourceMapPath: getSourceMapPath(),
}

function getSourceMapPath() {
    // 根据安全级别，改成只有开发者知道的文件夹名或动态加密算法生成。(npm run show-map查看)
    // 这样既可在需要时进行手动添加源码映射方便调试，又可避免了源码泄露。
    var projName = require('path').basename(process.cwd())
    var md5 = require('crypto').createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update('my-' + projName);
    return '_map' + md5.digest('hex');  //加密后的值d
}
