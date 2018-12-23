// This file is run by webpack in nodejs.
const path = require('path');

module.exports = {
    // used for webpack entry
    entry: path.resolve(__dirname, 'entry.js'),

    // This is used for html-webpack-plugin
    html: {
        // template: 'src/iconfont/fonts/_font-preview.html',
        title: 'Sample of webpack-iconfont-plugin-nodejs',

        //other params for html-webpack-plugin
        appConfig: {}
    }
}