module.exports = {
    plugins: [
        require('autoprefixer')({}),
        require('postcss-pxtorem')({rootValue: 100, propList: ['*']})
    ]
}
