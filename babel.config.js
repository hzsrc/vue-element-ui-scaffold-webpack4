module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: 3,
                useBuiltIns: 'usage',
                modules: false,
                //开发环境，不做es6转换，以便于调试
                targets: process.env.NODE_ENV === 'development' ? 'fully supports es6' : 'browserslist config'
            }
        ],
        '@vue/babel-preset-jsx', // for babel7
    ],
    plugins: [
        //'@babel/plugin-syntax-dynamic-import',
        //'@babel/plugin-transform-runtime', //用了useBuiltIns不需要它
        //['@babel/plugin-proposal-class-properties'],
        //babel7不用这个：'@vue/babel-plugin-transform-vue-jsx',
        [
            'babel-plugin-component',
            {
                libraryName: 'element-ui',
                styleLibraryName: '~node_modules/element-ui/packages/theme-chalk/src',
                ext: '.scss'
            }
        ]
    ],
    comments: false,
}
