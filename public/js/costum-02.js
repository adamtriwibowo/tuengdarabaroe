jQuery(document)['ready'](function(_0xe308x1) {
    _0xe308x1('.buttonx')['click'](function() {
        openFullscreen();
        _0xe308x1('.boxpembuka')['fadeOut'](1000);
        _0xe308x1('.buttonx')['fadeOut'](1000);
        var _0xe308x2 = document['getElementById']('audio');
        _0xe308x2['play']();
        _0xe308x2['volume'] = 0.8
    })
});
jQuery(document)['ready'](function(_0xe308x1) {
    var _0xe308x3 = function() {
        _0xe308x1('.boxheight')['css']({
            width: _0xe308x1(window)['width'](),
            height: _0xe308x1(window)['height']()
        })
    };
    _0xe308x1(window)['on']('resize', _0xe308x3);
    _0xe308x3()
});

function openFullscreen() {
    var _0xe308x5 = document['documentElement'];
    if (_0xe308x5['requestFullscreen']) {
        _0xe308x5['requestFullscreen']()
    } else {
        if (_0xe308x5['webkitRequestFullscreen']) {
            _0xe308x5['webkitRequestFullscreen']()
        } else {
            if (_0xe308x5['msRequestFullscreen']) {
                _0xe308x5['msRequestFullscreen']()
            }
        }
    };
    document['getElementById']('close-fullscreen')['style']['display'] = 'block';
    document['getElementById']('open-fullscreen')['style']['display'] = 'none'
}

function closeFullscreen() {
    if (document['exitFullscreen']) {
        document['exitFullscreen']()
    } else {
        if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']()
        } else {
            if (document['msExitFullscreen']) {
                document['msExitFullscreen']()
            }
        }
    };
    document['getElementById']('open-fullscreen')['style']['display'] = 'block';
    document['getElementById']('close-fullscreen')['style']['display'] = 'none'
}

function playSound() {
    var _0xe308x8 = document['getElementById']('audio');
    _0xe308x8['play']();
    document['getElementById']('mute-sound')['style']['display'] = 'block';
    document['getElementById']('unmute-sound')['style']['display'] = 'none'
}

function stopSound() {
    var _0xe308xa = document['getElementById']('audio');
    _0xe308xa['pause']();
    document['getElementById']('mute-sound')['style']['display'] = 'none';
    document['getElementById']('unmute-sound')['style']['display'] = 'block'
}