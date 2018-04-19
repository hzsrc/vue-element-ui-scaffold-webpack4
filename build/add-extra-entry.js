var fs = require('fs');
module.exports = function (baseWebpackConfig) {
    var zrest = './src/modules/zrest/zrest.js'
    //if (process.env.NODE_ENV !== 'production' && fs.existsSync(zrest)) {
        baseWebpackConfig.entry['zrest'] = zrest
    //}
}
