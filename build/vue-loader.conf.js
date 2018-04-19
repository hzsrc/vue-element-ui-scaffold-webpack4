var utils = require('./utils')
var config = require('../config')

var srcMap = config.isBuild
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap;
module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: srcMap,
        extract: !srcMap
    })
}
