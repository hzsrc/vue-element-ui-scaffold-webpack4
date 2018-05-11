var fs = require('fs');
module.exports = function (entries) {
    var zrest = './src/modules/zrest/zrest.js'
    if (process.env.NODE_ENV !== 'production' && fs.existsSync(zrest)) {
        entries['zrest'] = zrest
    }
}
