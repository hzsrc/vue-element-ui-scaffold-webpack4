module.exports = {
    disabled: 0,
    delay: 1000,
    body: function (query, post) {
        return {
            'data': { a: 11, b: 22, id: post.id + 1 },
            'msg': '',
            'returnCode': '0'
        }
    }
}
