module.exports = {
    disabled: 0,
    status: 200,
    body: function (query, post) {
        return {
            status: 0,
            msg: '',
            data: {
                name: '张三',
                avatar: '',
                token: +new Date()
            }
        }
    }
}
