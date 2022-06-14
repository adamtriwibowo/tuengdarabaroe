jQuery(document)['ready'](function(_0x6aafx1) {
    var _0x6aafx2 = 'Tamu';
    var _0x6aafx3 = function _0x6aafx3(_0x6aafx4) {
        var _0x6aafx5 = window['location']['search']['substring'](1),
            _0x6aafx6 = _0x6aafx5['split']('&'),
            _0x6aafx7, _0x6aafx8;
        for (_0x6aafx8 = 0; _0x6aafx8 < _0x6aafx6['length']; _0x6aafx8++) {
            _0x6aafx7 = _0x6aafx6[_0x6aafx8]['split']('=');
            if (_0x6aafx7[0] === _0x6aafx4) {
                return typeof _0x6aafx7[1] === undefined ? true : decodeURIComponent(_0x6aafx7[1])
            }
        };
        return _0x6aafx2
    };
    var _0x6aafx9 = _0x6aafx3('To');
    var _0x6aafxa = _0x6aafx3('loc');
    if (_0x6aafxa === 'Tamu') {
        var _0x6aafxb = (_0x6aafx9)
    } else {
        var _0x6aafxb = (_0x6aafx9) + ' ( ' + (_0x6aafxa) + ' )'
    };
    var _0x6aafxc = 200;
    var _0x6aafxd = 200;
    _0x6aafx1('#qrcode')['qrcode']({
        render: 'canvas',
        quiet: 1,
        width: _0x6aafxc,
        height: _0x6aafxd,
        text: _0x6aafxb
    })
})