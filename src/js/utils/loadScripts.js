export default function loadScripts(urls, callback) {
    if (typeof urls === 'string') urls = [urls]
    let loaded = 0
    urls.map(url => {
        if (document.querySelector('script[src="' + url + '"]')) {
            onScriptLoad()
        }
        else {
            const script = document.createElement('script')
            script.src = url
            script.onload = onScriptLoad
            document.querySelector('head').appendChild(script)
        }
    })

    function onScriptLoad() {
        loaded++
        if (loaded === urls.length) {
            if (callback) callback()
        }
    }
}