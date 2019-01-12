// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        //"off"或0 -关闭规则
        //"warn" 或1 - 开启规则, 使用警告 程序不会退出
        //"error"或2 - 开启规则, 使用错误 程序退出

        'indent': ['error', 4],
        //分号
        'semi': 'off',
        'spaced-comment': 'off',
        'eqeqeq': 'off',
        'no-useless-escape': 'off',
        'brace-style': 0,//大括号风格
        'curly': 'off', //[2, "all"],//必须使用 if(){} 中的{}
        'space-before-function-paren': ['off', 'always'],//函数定义时括号前面要不要有空格
        'no-new': 'off',
        'comma-dangle': 'off',//对象字面量项尾不能有逗号
        'no-return-assign': 'warn',//return 语句中不能有赋值表达式
        'eol-last': 0,
        'no-multiple-empty-lines': 0,
        //'quotes': 'off',
        //'comma-spacing': 'off',
        'handle-callback-err': 0,
        'padded-blocks': 0,
        'no-duplicate-imports': 0,
        'operator-linebreak': 0,
        'no-undef': 0,
        'no-extend-native': 0,
        'no-sequences': 0,

        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': 2
    }
}
