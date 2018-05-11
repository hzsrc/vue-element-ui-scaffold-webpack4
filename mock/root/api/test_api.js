module.exports = {
    disabled: 0,
    body: function (query, post) {
        return {
            'data': {a: 11, b: 22},
            'msg': '',
            'returnCode': '0'
        }
    }
}