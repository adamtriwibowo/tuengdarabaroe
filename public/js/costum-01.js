document['getElementById']('copyButton')['addEventListener']('click', function() {
    copyToClipboardMsg(document['getElementById']('copyTarget'), 'copyButton')
});
document['getElementById']('copyButton2')['addEventListener']('click', function() {
    copyToClipboardMsg(document['getElementById']('copyTarget2'), 'copyButton2')
});
document['getElementById']('copyButton3')['addEventListener']('click', function() {
    copyToClipboardMsg(document['getElementById']('copyTarget3'), 'copyButton3')
});
document['getElementById']('copyButton4')['addEventListener']('click', function() {
    copyToClipboardMsg(document['getElementById']('copyTarget4'), 'copyButton4')
});
document['getElementById']('pasteTarget')['addEventListener']('mousedown', function() {
    this['value'] = ''
});

function copyToClipboardMsg(_0x23ffx2, _0x23ffx3) {
    var _0x23ffx4 = copyToClipboard(_0x23ffx2);
    var _0x23ffx5;
    if (!_0x23ffx4) {
        _0x23ffx5 = 'Duh, copy tidak berhasil! Tekan ctrl + C'
    } else {
        _0x23ffx5 = 'Copied!'
    };
    if (typeof _0x23ffx3 === 'string') {
        _0x23ffx3 = document['getElementById'](_0x23ffx3)
    };
    _0x23ffx3['innerHTML'] = _0x23ffx5;
    setTimeout(function() {
        _0x23ffx3['innerHTML'] = 'Copy'
    }, 2000)
}

function copyToClipboard(_0x23ffx2) {
    var _0x23ffx7 = '_hiddenCopyText_';
    var _0x23ffx8 = _0x23ffx2['tagName'] === 'INPUT' || _0x23ffx2['tagName'] === 'TEXTAREA';
    var _0x23ffx9, _0x23ffxa;
    if (_0x23ffx8) {
        _0x23ffxb = _0x23ffx2;
        _0x23ffx9 = _0x23ffx2['selectionStart'];
        _0x23ffxa = _0x23ffx2['selectionEnd']
    } else {
        _0x23ffxb = document['getElementById'](_0x23ffx7);
        if (!_0x23ffxb) {
            var _0x23ffxb = document['createElement']('textarea');
            _0x23ffxb['style']['position'] = 'absolute';
            _0x23ffxb['style']['left'] = '-9999px';
            _0x23ffxb['style']['top'] = '0';
            _0x23ffxb['id'] = _0x23ffx7;
            document['body']['appendChild'](_0x23ffxb)
        };
        _0x23ffxb['textContent'] = _0x23ffx2['textContent']
    };
    var _0x23ffxc = document['activeElement'];
    _0x23ffxb['focus']();
    _0x23ffxb['setSelectionRange'](0, _0x23ffxb['value']['length']);
    var _0x23ffx4;
    try {
        _0x23ffx4 = document['execCommand']('copy')
    } catch (e) {
        _0x23ffx4 = false
    };
    if (_0x23ffxc && typeof _0x23ffxc['focus'] === 'function') {
        _0x23ffxc['focus']()
    };
    if (_0x23ffx8) {
        _0x23ffx2['setSelectionRange'](_0x23ffx9, _0x23ffxa)
    } else {
        _0x23ffxb['textContent'] = ''
    };
    return _0x23ffx4
}