module.exports = {
    disabled: 0,
    body: function (query, post) {
        return new Promise(resolve => {
            setTimeout(t => {
                resolve({
                    'data': [1, 2, 3, 4, 5],
                    'msg': '',
                    'returnCode': '0'
                })
            }, 1000)
        })
    }
}