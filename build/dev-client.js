var hotClient = require('webpack-hot-middleware/client?noInfo=true&path=./__webpack_hmr')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})
