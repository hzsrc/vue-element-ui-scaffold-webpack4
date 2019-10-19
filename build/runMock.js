module.exports = function () {
    if (process.argv.indexOf('--mock') > -1) // --mock
        require('dynamic-mocker').start('./mock/mock-config.js')
}
