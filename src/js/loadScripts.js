export function loadScripts(urls, callback) {
    if (typeof urls === 'string') urls = [urls]
    if (urls.length === 0) {
        if (callback) callback()
        return
    }
    var loaded = 0
    var loadedIndex = {}
    urls.map((url, index) => {
        if (document.querySelector('script[src="' + url + '"]')) {
            onScriptLoad(index)
        } else {
            var script = document.createElement('script')
            script.setAttribute('src', url)
            var cb = onScriptLoad.bind(script, index)
            script.onload = cb
            script.onerror = cb
            document.querySelector('head').appendChild(script)
        }
    })

    function onScriptLoad(index) {
        if (!loadedIndex[index]) {
            loaded++
            loadedIndex[index] = 1

            if (loaded === urls.length) {
                if (callback) callback()
            }
        }
    }
}
