export function loadScripts(urls, callback) {
    if (typeof urls === 'string') urls = [urls]
    if (urls.length === 0) {
        if (callback) callback()
        return
    }
    let loaded = 0
    const loadedIndex = {}
    urls.map((url, index) => {
        if (document.querySelector('script[src="' + url + '"]')) {
            onScriptLoad(index)
        } else {
            const script = document.createElement('script')
            script.setAttribute('src', url)
            const cb = onScriptLoad.bind(script, index)
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
