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
        '@vue/babel-preset-jsx', // for vue2, babel7
    ],
    plugins: [
        //'@vue/babel-plugin-jsx', //for vue3
        //'@babel/plugin-syntax-dynamic-import',
        //'@babel/plugin-transform-runtime', //用了useBuiltIns不需要它
        //['@babel/plugin-proposal-class-properties', { loose: true }],
        //'@vue/babel-plugin-jsx',
        // [
        //     'babel-plugin-component',
        //     {
        //         libraryName: 'element-plus',
        //         styleLibraryName: '~node_modules/element-plus/theme-chalk/src',
        //         ext: '.scss'
        //     }
        // ]
    ],
    comments: false,
}
