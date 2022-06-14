const btn = document['querySelector']('.dark-switch');
const prefersDarkScheme = window['matchMedia']('(prefers-color-scheme: dark)');
btn['addEventListener']('click', function() {
    if (prefersDarkScheme['matches']) {
        document['body']['classList']['toggle']('light-theme')
    } else {
        document['body']['classList']['toggle']('dark-theme')
    }
})