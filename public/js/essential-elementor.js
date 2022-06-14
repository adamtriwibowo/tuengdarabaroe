! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function() {
    "use strict";

    function i(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }

    function y(e, t) {
        if (1 !== e.nodeType) return [];
        var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function h(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function m(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body
        }
        var t = y(e),
            n = t.overflow,
            o = t.overflowX,
            r = t.overflowY;
        return /(auto|scroll|overlay)/.test(n + r + o) ? e : m(h(e))
    }

    function g(e) {
        return 11 === e ? z : 10 !== e && z || G
    }

    function w(e) {
        if (!e) return document.documentElement;
        for (var t = g(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var o = n && n.nodeName;
        return o && "BODY" !== o && "HTML" !== o ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === y(n, "position") ? w(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function l(e) {
        return null === e.parentNode ? e : l(e.parentNode)
    }

    function v(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            o = n ? e : t,
            r = n ? t : e,
            i = document.createRange();
        i.setStart(o, 0), i.setEnd(r, 0);
        var s, f, a = i.commonAncestorContainer;
        if (e !== a && t !== a || o.contains(r)) return "BODY" === (f = (s = a).nodeName) || "HTML" !== f && w(s.firstElementChild) !== s ? w(a) : a;
        var p = l(e);
        return p.host ? v(p.host, t) : v(e, l(t).host)
    }

    function b(e, t) {
        var n = "top" === (1 < arguments.length && void 0 !== t ? t : "top") ? "scrollTop" : "scrollLeft",
            o = e.nodeName;
        if ("BODY" !== o && "HTML" !== o) return e[n];
        var r = e.ownerDocument.documentElement;
        return (e.ownerDocument.scrollingElement || r)[n]
    }

    function u(e, t) {
        var n = "x" === t ? "Left" : "Top",
            o = "Left" == n ? "Right" : "Bottom";
        return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + o + "Width"], 10)
    }

    function r(e, t, n, o) {
        return j(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], g(10) ? parseInt(n["offset" + e]) + parseInt(o["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(o["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
    }

    function E(e) {
        var t = e.body,
            n = e.documentElement,
            o = g(10) && getComputedStyle(n);
        return {
            height: r("Height", t, n, o),
            width: r("Width", t, n, o)
        }
    }

    function x(e) {
        return X({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function O(e) {
        var t = {};
        try {
            if (g(10)) {
                t = e.getBoundingClientRect();
                var n = b(e, "top"),
                    o = b(e, "left");
                t.top += n, t.left += o, t.bottom += n, t.right += o
            } else t = e.getBoundingClientRect()
        } catch (e) {}
        var r = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
            i = "HTML" === e.nodeName ? E(e.ownerDocument) : {},
            s = i.width || e.clientWidth || r.right - r.left,
            f = i.height || e.clientHeight || r.bottom - r.top,
            a = e.offsetWidth - s,
            p = e.offsetHeight - f;
        if (a || p) {
            var l = y(e);
            a -= u(l, "x"), p -= u(l, "y"), r.width -= a, r.height -= p
        }
        return x(r)
    }

    function L(e, t, n) {
        var o = 2 < arguments.length && void 0 !== n && n,
            r = g(10),
            i = "HTML" === t.nodeName,
            s = O(e),
            f = O(t),
            a = m(e),
            p = y(t),
            l = parseFloat(p.borderTopWidth, 10),
            u = parseFloat(p.borderLeftWidth, 10);
        o && i && (f.top = j(f.top, 0), f.left = j(f.left, 0));
        var d = x({
            top: s.top - f.top - l,
            left: s.left - f.left - u,
            width: s.width,
            height: s.height
        });
        if (d.marginTop = 0, d.marginLeft = 0, !r && i) {
            var c = parseFloat(p.marginTop, 10),
                h = parseFloat(p.marginLeft, 10);
            d.top -= l - c, d.bottom -= l - c, d.left -= u - h, d.right -= u - h, d.marginTop = c, d.marginLeft = h
        }
        return (r && !o ? t.contains(a) : t === a && "BODY" !== a.nodeName) && (d = function(e, t, n) {
            var o = 2 < arguments.length && void 0 !== n && n,
                r = b(t, "top"),
                i = b(t, "left"),
                s = o ? -1 : 1;
            return e.top += r * s, e.bottom += r * s, e.left += i * s, e.right += i * s, e
        }(d, t)), d
    }

    function T(e) {
        if (!e || !e.parentElement || g()) return document.documentElement;
        for (var t = e.parentElement; t && "none" === y(t, "transform");) t = t.parentElement;
        return t || document.documentElement
    }

    function c(e, t, n, o, r) {
        var i = 4 < arguments.length && void 0 !== r && r,
            s = {
                top: 0,
                left: 0
            },
            f = i ? T(e) : v(e, t);
        if ("viewport" === o) s = function(e, t) {
            var n = 1 < arguments.length && void 0 !== t && t,
                o = e.ownerDocument.documentElement,
                r = L(e, o),
                i = j(o.clientWidth, window.innerWidth || 0),
                s = j(o.clientHeight, window.innerHeight || 0),
                f = n ? 0 : b(o),
                a = n ? 0 : b(o, "left");
            return x({
                top: f - r.top + r.marginTop,
                left: a - r.left + r.marginLeft,
                width: i,
                height: s
            })
        }(f, i);
        else {
            var a;
            "scrollParent" === o ? "BODY" === (a = m(h(t))).nodeName && (a = e.ownerDocument.documentElement) : a = "window" === o ? e.ownerDocument.documentElement : o;
            var p = L(a, f, i);
            if ("HTML" !== a.nodeName || function e(t) {
                    var n = t.nodeName;
                    if ("BODY" === n || "HTML" === n) return !1;
                    if ("fixed" === y(t, "position")) return !0;
                    var o = h(t);
                    return !!o && e(o)
                }(f)) s = p;
            else {
                var l = E(e.ownerDocument),
                    u = l.height,
                    d = l.width;
                s.top += p.top - p.marginTop, s.bottom = u + p.top, s.left += p.left - p.marginLeft, s.right = d + p.left
            }
        }
        var c = "number" == typeof(n = n || 0);
        return s.left += c ? n : n.left || 0, s.top += c ? n : n.top || 0, s.right -= c ? n : n.right || 0, s.bottom -= c ? n : n.bottom || 0, s
    }

    function f(e, t, o, n, r, i) {
        var s = 5 < arguments.length && void 0 !== i ? i : 0;
        if (-1 === e.indexOf("auto")) return e;
        var f = c(o, n, s, r),
            a = {
                top: {
                    width: f.width,
                    height: t.top - f.top
                },
                right: {
                    width: f.right - t.right,
                    height: f.height
                },
                bottom: {
                    width: f.width,
                    height: f.bottom - t.bottom
                },
                left: {
                    width: t.left - f.left,
                    height: f.height
                }
            },
            p = Object.keys(a).map(function(e) {
                return X({
                    key: e
                }, a[e], {
                    area: (t = a[e]).width * t.height
                });
                var t
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            l = p.filter(function(e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight
            }),
            u = 0 < l.length ? l[0].key : p[0].key,
            d = e.split("-")[1];
        return u + (d ? "-" + d : "")
    }

    function a(e, t, n, o) {
        var r = 3 < arguments.length && void 0 !== o ? o : null;
        return L(n, r ? T(t) : v(t, n), r)
    }

    function D(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
            o = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
        return {
            width: e.offsetWidth + o,
            height: e.offsetHeight + n
        }
    }

    function N(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function F(e, t, n) {
        n = n.split("-")[0];
        var o = D(e),
            r = {
                width: o.width,
                height: o.height
            },
            i = -1 !== ["right", "left"].indexOf(n),
            s = i ? "top" : "left",
            f = i ? "left" : "top",
            a = i ? "height" : "width",
            p = i ? "width" : "height";
        return r[s] = t[s] + t[a] / 2 - o[a] / 2, r[f] = n === f ? t[f] - o[p] : t[N(f)], r
    }

    function k(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function H(e, n, t) {
        return (void 0 === t ? e : e.slice(0, function(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function(e) {
                return e[t] === n
            });
            var o = k(e, function(e) {
                return e[t] === n
            });
            return e.indexOf(o)
        }(e, "name", t))).forEach(function(e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var t = e.function || e.fn;
            e.enabled && i(t) && (n.offsets.popper = x(n.offsets.popper), n.offsets.reference = x(n.offsets.reference), n = t(n, e))
        }), n
    }

    function e(e, n) {
        return e.some(function(e) {
            var t = e.name;
            return e.enabled && t === n
        })
    }

    function A(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), o = 0; o < t.length; o++) {
            var r = t[o],
                i = r ? "" + r + n : e;
            if (void 0 !== document.body.style[i]) return i
        }
        return null
    }

    function s(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function t(e, t, n, o) {
        n.updateBound = o, s(e).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var r = m(e);
        return function e(t, n, o, r) {
            var i = "BODY" === t.nodeName,
                s = i ? t.ownerDocument.defaultView : t;
            s.addEventListener(n, o, {
                passive: !0
            }), i || e(m(s.parentNode), n, o, r), r.push(s)
        }(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
    }

    function n() {
        var e, t;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, s(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
    }

    function d(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function p(n, o) {
        Object.keys(o).forEach(function(e) {
            var t = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(e) && d(o[e]) && (t = "px"), n.style[e] = o[e] + t
        })
    }

    function C(e, t) {
        function n(e) {
            return e
        }
        var o = e.offsets,
            r = o.popper,
            i = o.reference,
            s = B,
            f = s(i.width),
            a = s(r.width),
            p = -1 !== ["left", "right"].indexOf(e.placement),
            l = -1 !== e.placement.indexOf("-"),
            u = t ? p || l || f % 2 == a % 2 ? s : W : n,
            d = t ? s : n;
        return {
            left: u(1 == f % 2 && 1 == a % 2 && !l && t ? r.left - 1 : r.left),
            top: d(r.top),
            bottom: d(r.bottom),
            right: u(r.right)
        }
    }

    function M(e, t, n) {
        var o = k(e, function(e) {
                return e.name === t
            }),
            r = !!o && e.some(function(e) {
                return e.name === n && e.enabled && e.order < o.order
            });
        if (!r) {
            var i = "`" + t + "`";
            console.warn("`" + n + "` modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
        }
        return r
    }

    function o(e, t) {
        var n = 1 < arguments.length && void 0 !== t && t,
            o = Q.indexOf(e),
            r = Q.slice(o + 1).concat(Q.slice(0, o));
        return n ? r.reverse() : r
    }

    function P(e, r, i, t) {
        var s = [0, 0],
            f = -1 !== ["right", "left"].indexOf(t),
            n = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            o = n.indexOf(k(n, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        n[o] && -1 === n[o].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var a = /\s*,\s*|\s+/,
            p = -1 === o ? [n] : [n.slice(0, o).concat([n[o].split(a)[0]]), [n[o].split(a)[1]].concat(n.slice(o + 1))];
        return (p = p.map(function(e, t) {
            var n = (1 === t ? !f : f) ? "height" : "width",
                o = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, o = !0, e) : o ? (e[e.length - 1] += t, o = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return function(e, t, n, o) {
                    var r, i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        s = +i[1],
                        f = i[2];
                    if (!s) return e;
                    if (0 !== f.indexOf("%")) return "vh" !== f && "vw" !== f ? s : ("vh" === f ? j(document.documentElement.clientHeight, window.innerHeight || 0) : j(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s;
                    switch (f) {
                        case "%p":
                            r = n;
                            break;
                        case "%":
                        case "%r":
                        default:
                            r = o
                    }
                    return x(r)[t] / 100 * s
                }(e, n, r, i)
            })
        })).forEach(function(n, o) {
            n.forEach(function(e, t) {
                d(e) && (s[o] += e * ("-" === n[t - 1] ? -1 : 1))
            })
        }), s
    }
    for (var S = Math.min, W = Math.floor, B = Math.round, j = Math.max, I = "undefined" != typeof window && "undefined" != typeof document, R = ["Edge", "Trident", "Firefox"], U = 0, Y = 0; Y < R.length; Y += 1)
        if (I && 0 <= navigator.userAgent.indexOf(R[Y])) {
            U = 1;
            break
        }
    function q(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    var V = I && window.Promise ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, U))
            }
        },
        z = I && !(!window.MSInputMethodContext || !document.documentMode),
        G = I && /MSIE 10/.test(navigator.userAgent),
        _ = function(e, t, n) {
            return t && oe(e.prototype, t), n && oe(e, n), e
        },
        X = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        },
        J = I && /Firefox/i.test(navigator.userAgent),
        K = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Q = K.slice(3),
        Z = "flip",
        $ = "clockwise",
        ee = "counterclockwise",
        te = (_(ne, [{
            key: "update",
            value: function() {
                return function() {
                    if (!this.state.isDestroyed) {
                        var e = {
                            instance: this,
                            styles: {},
                            arrowStyles: {},
                            attributes: {},
                            flipped: !1,
                            offsets: {}
                        };
                        e.offsets.reference = a(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = f(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = F(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = H(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                    }
                }.call(this)
            }
        }, {
            key: "destroy",
            value: function() {
                return function() {
                    return this.state.isDestroyed = !0, e(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[A("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                }.call(this)
            }
        }, {
            key: "enableEventListeners",
            value: function() {
                return function() {
                    this.state.eventsEnabled || (this.state = t(this.reference, this.options, this.state, this.scheduleUpdate))
                }.call(this)
            }
        }, {
            key: "disableEventListeners",
            value: function() {
                return n.call(this)
            }
        }]), ne);

    function ne(e, t) {
        var n = this,
            o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        (function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        })(this, ne), this.scheduleUpdate = function() {
            return requestAnimationFrame(n.update)
        }, this.update = V(this.update.bind(this)), this.options = X({}, ne.Defaults, o), this.state = {
            isDestroyed: !1,
            isCreated: !1,
            scrollParents: []
        }, this.reference = e && e.jquery ? e[0] : e, this.popper = t && t.jquery ? t[0] : t, this.options.modifiers = {}, Object.keys(X({}, ne.Defaults.modifiers, o.modifiers)).forEach(function(e) {
            n.options.modifiers[e] = X({}, ne.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
            return X({
                name: e
            }, n.options.modifiers[e])
        }).sort(function(e, t) {
            return e.order - t.order
        }), this.modifiers.forEach(function(e) {
            e.enabled && i(e.onLoad) && e.onLoad(n.reference, n.popper, n.options, e, n.state)
        }), this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), this.state.eventsEnabled = r
    }

    function oe(e, t) {
        for (var n, o = 0; o < t.length; o++)(n = t[o]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
    }
    return te.Utils = ("undefined" == typeof window ? global : window).PopperUtils, te.placements = K, te.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        n = t.split("-")[0],
                        o = t.split("-")[1];
                    if (o) {
                        var r = e.offsets,
                            i = r.reference,
                            s = r.popper,
                            f = -1 !== ["bottom", "top"].indexOf(n),
                            a = f ? "left" : "top",
                            p = f ? "width" : "height",
                            l = {
                                start: q({}, a, i[a]),
                                end: q({}, a, i[a] + i[p] - s[p])
                            };
                        e.offsets.popper = X({}, s, l[o])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(e, t) {
                    var n, o = t.offset,
                        r = e.placement,
                        i = e.offsets,
                        s = i.popper,
                        f = i.reference,
                        a = r.split("-")[0];
                    return n = d(+o) ? [+o, 0] : P(o, s, f, a), "left" === a ? (s.top += n[0], s.left -= n[1]) : "right" === a ? (s.top += n[0], s.left += n[1]) : "top" === a ? (s.left += n[0], s.top -= n[1]) : "bottom" === a && (s.left += n[0], s.top += n[1]), e.popper = s, e
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, o) {
                    var t = o.boundariesElement || w(e.instance.popper);
                    e.instance.reference === t && (t = w(t));
                    var n = A("transform"),
                        r = e.instance.popper.style,
                        i = r.top,
                        s = r.left,
                        f = r[n];
                    r.top = "", r.left = "", r[n] = "";
                    var a = c(e.instance.popper, e.instance.reference, o.padding, t, e.positionFixed);
                    r.top = i, r.left = s, r[n] = f, o.boundaries = a;
                    var p = o.priority,
                        l = e.offsets.popper,
                        u = {
                            primary: function(e) {
                                var t = l[e];
                                return l[e] < a[e] && !o.escapeWithReference && (t = j(l[e], a[e])), q({}, e, t)
                            },
                            secondary: function(e) {
                                var t = "right" === e ? "left" : "top",
                                    n = l[t];
                                return l[e] > a[e] && !o.escapeWithReference && (n = S(l[t], a[e] - ("right" === e ? l.width : l.height))), q({}, t, n)
                            }
                        };
                    return p.forEach(function(e) {
                        var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                        l = X({}, l, u[t](e))
                    }), e.offsets.popper = l, e
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        n = t.popper,
                        o = t.reference,
                        r = e.placement.split("-")[0],
                        i = W,
                        s = -1 !== ["top", "bottom"].indexOf(r),
                        f = s ? "right" : "bottom",
                        a = s ? "left" : "top",
                        p = s ? "width" : "height";
                    return n[f] < i(o[a]) && (e.offsets.popper[a] = i(o[a]) - n[p]), n[a] > i(o[f]) && (e.offsets.popper[a] = i(o[f])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, t) {
                    var n;
                    if (!M(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var o = t.element;
                    if ("string" == typeof o) {
                        if (!(o = e.instance.popper.querySelector(o))) return e
                    } else if (!e.instance.popper.contains(o)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var r = e.placement.split("-")[0],
                        i = e.offsets,
                        s = i.popper,
                        f = i.reference,
                        a = -1 !== ["left", "right"].indexOf(r),
                        p = a ? "height" : "width",
                        l = a ? "Top" : "Left",
                        u = l.toLowerCase(),
                        d = a ? "left" : "top",
                        c = a ? "bottom" : "right",
                        h = D(o)[p];
                    f[c] - h < s[u] && (e.offsets.popper[u] -= s[u] - (f[c] - h)), f[u] + h > s[c] && (e.offsets.popper[u] += f[u] + h - s[c]), e.offsets.popper = x(e.offsets.popper);
                    var m = f[u] + f[p] / 2 - h / 2,
                        g = y(e.instance.popper),
                        v = parseFloat(g["margin" + l], 10),
                        b = parseFloat(g["border" + l + "Width"], 10),
                        w = m - e.offsets.popper[u] - v - b;
                    return w = j(S(s[p] - h, w), 0), e.arrowElement = o, e.offsets.arrow = (q(n = {}, u, B(w)), q(n, d, ""), n), e
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(h, m) {
                    if (e(h.instance.modifiers, "inner")) return h;
                    if (h.flipped && h.placement === h.originalPlacement) return h;
                    var g = c(h.instance.popper, h.instance.reference, m.padding, m.boundariesElement, h.positionFixed),
                        v = h.placement.split("-")[0],
                        b = N(v),
                        w = h.placement.split("-")[1] || "",
                        y = [];
                    switch (m.behavior) {
                        case Z:
                            y = [v, b];
                            break;
                        case $:
                            y = o(v);
                            break;
                        case ee:
                            y = o(v, !0);
                            break;
                        default:
                            y = m.behavior
                    }
                    return y.forEach(function(e, t) {
                        if (v !== e || y.length === t + 1) return h;
                        v = h.placement.split("-")[0], b = N(v);
                        var n, o = h.offsets.popper,
                            r = h.offsets.reference,
                            i = W,
                            s = "left" === v && i(o.right) > i(r.left) || "right" === v && i(o.left) < i(r.right) || "top" === v && i(o.bottom) > i(r.top) || "bottom" === v && i(o.top) < i(r.bottom),
                            f = i(o.left) < i(g.left),
                            a = i(o.right) > i(g.right),
                            p = i(o.top) < i(g.top),
                            l = i(o.bottom) > i(g.bottom),
                            u = "left" === v && f || "right" === v && a || "top" === v && p || "bottom" === v && l,
                            d = -1 !== ["top", "bottom"].indexOf(v),
                            c = !!m.flipVariations && (d && "start" === w && f || d && "end" === w && a || !d && "start" === w && p || !d && "end" === w && l);
                        (s || u || c) && (h.flipped = !0, (s || u) && (v = y[t + 1]), c && (w = "end" === (n = w) ? "start" : "start" === n ? "end" : n), h.placement = v + (w ? "-" + w : ""), h.offsets.popper = X({}, h.offsets.popper, F(h.instance.popper, h.offsets.reference, h.placement)), h = H(h.instance.modifiers, h, "flip"))
                    }), h
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        n = t.split("-")[0],
                        o = e.offsets,
                        r = o.popper,
                        i = o.reference,
                        s = -1 !== ["left", "right"].indexOf(n),
                        f = -1 === ["top", "left"].indexOf(n);
                    return r[s ? "left" : "top"] = i[n] - (f ? r[s ? "width" : "height"] : 0), e.placement = N(t), e.offsets.popper = x(r), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!M(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference,
                        n = k(e.instance.modifiers, function(e) {
                            return "preventOverflow" === e.name
                        }).boundaries;
                    if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var n = t.x,
                        o = t.y,
                        r = e.offsets.popper,
                        i = k(e.instance.modifiers, function(e) {
                            return "applyStyle" === e.name
                        }).gpuAcceleration;
                    void 0 !== i && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var s, f, a = void 0 === i ? t.gpuAcceleration : i,
                        p = w(e.instance.popper),
                        l = O(p),
                        u = {
                            position: r.position
                        },
                        d = C(e, window.devicePixelRatio < 2 || !J),
                        c = "bottom" === n ? "top" : "bottom",
                        h = "right" === o ? "left" : "right",
                        m = A("transform");
                    if (f = "bottom" == c ? "HTML" === p.nodeName ? -p.clientHeight + d.bottom : -l.height + d.bottom : d.top, s = "right" == h ? "HTML" === p.nodeName ? -p.clientWidth + d.right : -l.width + d.right : d.left, a && m) u[m] = "translate3d(" + s + "px, " + f + "px, 0)", u[c] = 0, u[h] = 0, u.willChange = "transform";
                    else {
                        var g = "bottom" == c ? -1 : 1,
                            v = "right" == h ? -1 : 1;
                        u[c] = f * g, u[h] = s * v, u.willChange = c + ", " + h
                    }
                    var b = {
                        "x-placement": e.placement
                    };
                    return e.attributes = X({}, b, e.attributes), e.styles = X({}, u, e.styles), e.arrowStyles = X({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return p(e.instance.popper, e.styles), t = e.instance.popper, n = e.attributes, Object.keys(n).forEach(function(e) {
                        !1 === n[e] ? t.removeAttribute(e) : t.setAttribute(e, n[e])
                    }), e.arrowElement && Object.keys(e.arrowStyles).length && p(e.arrowElement, e.arrowStyles), e;
                    var t, n
                },
                onLoad: function(e, t, n, o, r) {
                    var i = a(r, t, e, n.positionFixed),
                        s = f(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                    return t.setAttribute("x-placement", s), p(t, {
                        position: n.positionFixed ? "fixed" : "absolute"
                    }), n
                },
                gpuAcceleration: void 0
            }
        }
    }, te
});
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], e) : (t = t || self).tippy = e(t.Popper)
}(this, function(R) {
    "use strict";
    R = R && R.hasOwnProperty("default") ? R.default : R;

    function V() {
        return (V = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
            }
            return t
        }).apply(this, arguments)
    }
    var n = "undefined" != typeof window,
        t = n && navigator.userAgent,
        W = /MSIE |Trident\//.test(t),
        i = /UCBrowser\//.test(t),
        e = n && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream,
        B = {
            a11y: !0,
            allowHTML: !0,
            animateFill: !0,
            animation: "shift-away",
            appendTo: function() {
                return document.body
            },
            aria: "describedby",
            arrow: !1,
            arrowType: "sharp",
            boundary: "scrollParent",
            content: "",
            delay: [0, 20],
            distance: 10,
            duration: [325, 275],
            flip: !0,
            flipBehavior: "flip",
            flipOnUpdate: !1,
            followCursor: !1,
            hideOnClick: !0,
            ignoreAttributes: !1,
            inertia: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            lazy: !0,
            maxWidth: 350,
            multiple: !1,
            offset: 0,
            onHidden: function() {},
            onHide: function() {},
            onMount: function() {},
            onShow: function() {},
            onShown: function() {},
            placement: "top",
            popperOptions: {},
            role: "tooltip",
            showOnInit: !1,
            size: "regular",
            sticky: !1,
            target: "",
            theme: "dark",
            touch: !0,
            touchHold: !1,
            trigger: "mouseenter focus",
            updateDuration: 0,
            wait: null,
            zIndex: 9999
        },
        U = ["arrow", "arrowType", "boundary", "distance", "flip", "flipBehavior", "flipOnUpdate", "offset", "placement", "popperOptions"],
        q = {
            POPPER: ".tippy-popper",
            TOOLTIP: ".tippy-tooltip",
            CONTENT: ".tippy-content",
            BACKDROP: ".tippy-backdrop",
            ARROW: ".tippy-arrow",
            ROUND_ARROW: ".tippy-roundarrow"
        },
        a = n ? Element.prototype : {},
        j = a.matches || a.matchesSelector || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;

    function F(t) {
        return [].slice.call(t)
    }

    function K(t, e) {
        return (a.closest || function(t) {
            for (var e = this; e;) {
                if (j.call(e, t)) return e;
                e = e.parentElement
            }
        }).call(t, e)
    }

    function J(t, e) {
        for (; t;) {
            if (e(t)) return t;
            t = t.parentElement
        }
    }

    function p(t) {
        return "[object Object]" === {}.toString.call(t)
    }

    function G(t, e) {
        return {}.hasOwnProperty.call(t, e)
    }

    function Q(t, e, a) {
        if (Array.isArray(t)) {
            var r = t[e];
            return null == r ? a : r
        }
        return t
    }

    function Z(a, r) {
        var n;
        return function() {
            var t = this,
                e = arguments;
            clearTimeout(n), n = setTimeout(function() {
                return a.apply(t, e)
            }, r)
        }
    }

    function $(t, e) {
        return t && t.modifiers && t.modifiers[e]
    }

    function tt(t, e) {
        return -1 < t.indexOf(e)
    }

    function o(t) {
        return p(t) || t instanceof Element
    }

    function r() {
        return "innerHTML"
    }

    function et(t, e) {
        return "function" == typeof t ? t.apply(null, e) : t
    }

    function at(t, e) {
        t.filter(function(t) {
            return "flip" === t.name
        })[0].enabled = e
    }

    function rt() {
        return document.createElement("div")
    }

    function s(t, e) {
        t[r()] = e instanceof Element ? e[r()] : e
    }

    function nt(t, e) {
        e.content instanceof Element ? (s(t, ""), t.appendChild(e.content)) : t[e.allowHTML ? "innerHTML" : "textContent"] = e.content
    }

    function it(t) {
        return {
            tooltip: t.querySelector(q.TOOLTIP),
            backdrop: t.querySelector(q.BACKDROP),
            content: t.querySelector(q.CONTENT),
            arrow: t.querySelector(q.ARROW) || t.querySelector(q.ROUND_ARROW)
        }
    }

    function pt(t) {
        t.setAttribute("data-inertia", "")
    }

    function ot(t) {
        var e = rt();
        return "round" === t ? (e.className = "tippy-roundarrow", s(e, '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>')) : e.className = "tippy-arrow", e
    }

    function st() {
        var t = rt();
        return t.className = "tippy-backdrop", t.setAttribute("data-state", "hidden"), t
    }

    function lt(t, e) {
        t.setAttribute("tabindex", "-1"), e.setAttribute("data-interactive", "")
    }

    function ct(t, e) {
        t.forEach(function(t) {
            t && (t.style.transitionDuration = "".concat(e, "ms"))
        })
    }

    function dt(t, e, a) {
        var r = i && void 0 !== document.body.style.WebkitTransition ? "webkitTransitionEnd" : "transitionend";
        t[e + "EventListener"](r, a)
    }

    function ft(t) {
        var e = t.getAttribute("x-placement");
        return e ? e.split("-")[0] : ""
    }

    function mt(t, e) {
        t.forEach(function(t) {
            t && t.setAttribute("data-state", e)
        })
    }

    function ut(e, a, t) {
        t.split(" ").forEach(function(t) {
            e.classList[a](t + "-theme")
        })
    }

    function l() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            a = t.checkHideOnClick,
            r = t.exclude,
            n = t.duration;
        F(document.querySelectorAll(q.POPPER)).forEach(function(t) {
            var e = t._tippy;
            !e || a && !0 !== e.props.hideOnClick || r && t === r.popper || e.hide(n)
        })
    }
    var bt = {
            passive: !0
        },
        yt = 3,
        ht = !1;

    function c() {
        ht || (ht = !0, e && document.body.classList.add("tippy-iOS"), window.performance && document.addEventListener("mousemove", f))
    }
    var d = 0;

    function f() {
        var t = performance.now();
        t - d < 20 && (ht = !1, document.removeEventListener("mousemove", f), e || document.body.classList.remove("tippy-iOS")), d = t
    }

    function m(t) {
        var e = t.target;
        if (!(e instanceof Element)) return l();
        var a = K(e, q.POPPER);
        if (!(a && a._tippy && a._tippy.props.interactive)) {
            var r = J(e, function(t) {
                return t._tippy && t._tippy.reference === t
            });
            if (r) {
                var n = r._tippy,
                    i = tt(n.props.trigger, "click");
                if (ht || i) return l({
                    exclude: n,
                    checkHideOnClick: !0
                });
                if (!0 !== n.props.hideOnClick || i) return;
                n.clearDelayTimeouts()
            }
            l({
                checkHideOnClick: !0
            })
        }
    }

    function u() {
        var t = document.activeElement;
        t && t.blur && t._tippy && t.blur()
    }
    var b = Object.keys(B);

    function vt(t, e) {
        var n, a = V({}, e, {
            content: et(e.content, [t])
        }, e.ignoreAttributes ? {} : (n = t, b.reduce(function(e, a) {
            var r = (n.getAttribute("data-tippy-".concat(a)) || "").trim();
            if (!r) return e;
            if ("content" === a) e[a] = r;
            else try {
                e[a] = JSON.parse(r)
            } catch (t) {
                e[a] = r
            }
            return e
        }, {})));
        return (a.arrow || i) && (a.animateFill = !1), a
    }

    function xt(t, e) {
        var a = 0 < arguments.length && void 0 !== t ? t : {},
            r = 1 < arguments.length ? e : void 0;
        Object.keys(a).forEach(function(t) {
            if (!G(r, t)) throw new Error("[tippy]: `".concat(t, "` is not a valid option"))
        })
    }
    var wt = 1;

    function gt(t, n) {
        var e = vt(t, n);
        if (!e.multiple && t._tippy) return null;
        var d = {},
            u = null,
            i = 0,
            a = 0,
            p = !1,
            o = function() {},
            s = [],
            f = 0 < e.interactiveDebounce ? Z(k, e.interactiveDebounce) : k,
            m = null,
            r = wt++,
            l = function(t, e) {
                var a = rt();
                a.className = "tippy-popper", a.id = "tippy-".concat(t), a.style.zIndex = e.zIndex, e.role && a.setAttribute("role", e.role);
                var r = rt();
                r.className = "tippy-tooltip", r.style.maxWidth = e.maxWidth + ("number" == typeof e.maxWidth ? "px" : ""), r.setAttribute("data-size", e.size), r.setAttribute("data-animation", e.animation), r.setAttribute("data-state", "hidden"), ut(r, "add", e.theme);
                var n = rt();
                return n.className = "tippy-content", n.setAttribute("data-state", "hidden"), e.interactive && lt(a, r), e.arrow && r.appendChild(ot(e.arrowType)), e.animateFill && (r.appendChild(st()), r.setAttribute("data-animatefill", "")), e.inertia && pt(r), nt(n, e), r.appendChild(n), a.appendChild(r), a
            }(r, e);
        l.addEventListener("mouseenter", function(t) {
            b.props.interactive && b.state.isVisible && "mouseenter" === d.type && h(t)
        }), l.addEventListener("mouseleave", function() {
            b.props.interactive && "mouseenter" === d.type && document.addEventListener("mousemove", f)
        });
        var c, b = {
            id: r,
            reference: t,
            popper: l,
            popperChildren: it(l),
            popperInstance: null,
            props: e,
            state: {
                isEnabled: !0,
                isVisible: !1,
                isDestroyed: !1,
                isMounted: !1,
                isShown: !1
            },
            clearDelayTimeouts: H,
            set: M,
            setContent: function(t) {
                M({
                    content: t
                })
            },
            show: _,
            hide: D,
            enable: function() {
                b.state.isEnabled = !0
            },
            disable: function() {
                b.state.isEnabled = !1
            },
            destroy: N
        };
        return S(), e.lazy || (Y(), b.popperInstance.disableEventListeners()), e.showOnInit && h(), e.a11y && !e.target && ((c = t) instanceof Element && (!j.call(c, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") || c.hasAttribute("disabled"))) && t.setAttribute("tabindex", "0"), t._tippy = b, l._tippy = b;

        function y(t) {
            var e = u = t,
                a = e.clientX,
                r = e.clientY;
            if (b.popperInstance) {
                var n = ft(b.popper),
                    i = b.popperChildren.arrow ? yt + 16 : yt,
                    p = tt(["top", "bottom"], n),
                    o = tt(["left", "right"], n),
                    s = p ? Math.max(i, a) : a,
                    l = o ? Math.max(i, r) : r;
                p && i < s && (s = Math.min(a, window.innerWidth - i)), o && i < l && (l = Math.min(r, window.innerHeight - i));
                var c = b.reference.getBoundingClientRect(),
                    d = b.props.followCursor,
                    f = "horizontal" === d,
                    m = "vertical" === d;
                b.popperInstance.reference = {
                    getBoundingClientRect: function() {
                        return {
                            width: 0,
                            height: 0,
                            top: f ? c.top : l,
                            bottom: f ? c.bottom : l,
                            left: m ? c.left : s,
                            right: m ? c.right : s
                        }
                    },
                    clientWidth: 0,
                    clientHeight: 0
                }, b.popperInstance.scheduleUpdate(), "initial" === d && b.state.isVisible && x()
            }
        }

        function h(t) {
            if (H(), !b.state.isVisible)
                if (b.props.target)(a = K((e = t).target, b.props.target)) && !a._tippy && (gt(a, V({}, b.props, {
                    content: et(n.content, [a]),
                    appendTo: n.appendTo,
                    target: "",
                    showOnInit: !0
                })), h(e));
                else {
                    var e, a;
                    if (p = !0, b.props.wait) return b.props.wait(b, t);
                    L() && !b.state.isMounted && document.addEventListener("mousemove", y);
                    var r = Q(b.props.delay, 0, B.delay);
                    r ? i = setTimeout(function() {
                        _()
                    }, r) : _()
                }
        }

        function v() {
            if (H(), !b.state.isVisible) return x();
            p = !1;
            var t = Q(b.props.delay, 1, B.delay);
            t ? a = setTimeout(function() {
                b.state.isVisible && D()
            }, t) : D()
        }

        function x() {
            document.removeEventListener("mousemove", y), u = null
        }

        function w() {
            document.body.removeEventListener("mouseleave", v), document.removeEventListener("mousemove", f)
        }

        function g(t) {
            b.state.isEnabled && !X(t) && (b.state.isVisible || (d = t, ht && tt(t.type, "mouse") && (u = t)), "click" === t.type && !1 !== b.props.hideOnClick && b.state.isVisible ? v() : h(t))
        }

        function k(t) {
            var e = J(t.target, function(t) {
                    return t._tippy
                }),
                a = K(t.target, q.POPPER) === b.popper,
                r = e === b.reference;
            a || r || ! function(t, e, a, r) {
                if (!t) return 1;
                var n = a.clientX,
                    i = a.clientY,
                    p = r.interactiveBorder,
                    o = r.distance,
                    s = e.top - i > ("top" === t ? p + o : p),
                    l = i - e.bottom > ("bottom" === t ? p + o : p),
                    c = e.left - n > ("left" === t ? p + o : p),
                    d = n - e.right > ("right" === t ? p + o : p);
                return s || l || c || d
            }(ft(b.popper), b.popper.getBoundingClientRect(), t, b.props) || (w(), v())
        }

        function E(t) {
            if (!X(t)) return b.props.interactive ? (document.body.addEventListener("mouseleave", v), void document.addEventListener("mousemove", f)) : void v()
        }

        function A(t) {
            t.target === b.reference && (b.props.interactive && t.relatedTarget && b.popper.contains(t.relatedTarget) || v())
        }

        function C(t) {
            K(t.target, b.props.target) && h(t)
        }

        function O(t) {
            K(t.target, b.props.target) && v()
        }

        function X(t) {
            var e = "ontouchstart" in window,
                a = tt(t.type, "touch"),
                r = b.props.touchHold;
            return e && ht && r && !a || ht && !r && a
        }

        function Y() {
            var t = b.props.popperOptions,
                e = b.popperChildren,
                a = e.tooltip,
                r = e.arrow;
            b.popperInstance = new R(b.reference, b.popper, V({
                placement: b.props.placement
            }, t, {
                modifiers: V({}, t ? t.modifiers : {}, {
                    preventOverflow: V({
                        boundariesElement: b.props.boundary,
                        padding: yt
                    }, $(t, "preventOverflow")),
                    arrow: V({
                        element: r,
                        enabled: !!r
                    }, $(t, "arrow")),
                    flip: V({
                        enabled: b.props.flip,
                        padding: b.props.distance + yt,
                        behavior: b.props.flipBehavior
                    }, $(t, "flip")),
                    offset: V({
                        offset: b.props.offset
                    }, $(t, "offset"))
                }),
                onUpdate: function(t) {
                    b.props.flipOnUpdate || (t.flipped && (b.popperInstance.options.placement = t.placement), at(b.popperInstance.modifiers, !1));
                    var e = a.style;
                    e.top = "", e.bottom = "", e.left = "", e.right = "", e[ft(b.popper)] = -(b.props.distance - 10) + "px"
                }
            }))
        }

        function L() {
            return b.props.followCursor && !ht && "focus" !== d.type
        }

        function T(t, e) {
            if (0 === t) return e();

            function a(t) {
                t.target === r && (dt(r, "remove", a), e())
            }
            var r = b.popperChildren.tooltip;
            dt(r, "remove", o), dt(r, "add", a), o = a
        }

        function I(t, e, a) {
            var r = 2 < arguments.length && void 0 !== a && a;
            b.reference.addEventListener(t, e, r), s.push({
                eventType: t,
                handler: e,
                options: r
            })
        }

        function S() {
            b.props.touchHold && !b.props.target && (I("touchstart", g, bt), I("touchend", E, bt)), b.props.trigger.trim().split(" ").forEach(function(t) {
                if ("manual" !== t)
                    if (b.props.target) switch (t) {
                        case "mouseenter":
                            I("mouseover", C), I("mouseout", O);
                            break;
                        case "focus":
                            I("focusin", C), I("focusout", O);
                            break;
                        case "click":
                            I(t, C)
                    } else switch (I(t, g), t) {
                        case "mouseenter":
                            I("mouseleave", E);
                            break;
                        case "focus":
                            I(W ? "focusout" : "blur", A)
                    }
            })
        }

        function P() {
            s.forEach(function(t) {
                var e = t.eventType,
                    a = t.handler,
                    r = t.options;
                b.reference.removeEventListener(e, a, r)
            }), s = []
        }

        function z() {
            return [b.popperChildren.tooltip, b.popperChildren.backdrop, b.popperChildren.content]
        }

        function H() {
            clearTimeout(i), clearTimeout(a)
        }

        function M() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            xt(e, B);
            var t, a, r, n, i, p, o, s, l, c = b.props,
                d = vt(b.reference, V({}, b.props, e, {
                    ignoreAttributes: !0
                }));
            d.ignoreAttributes = G(e, "ignoreAttributes") ? e.ignoreAttributes : c.ignoreAttributes, b.props = d, (G(e, "trigger") || G(e, "touchHold")) && (P(), S()), G(e, "interactiveDebounce") && (w(), f = Z(k, e.interactiveDebounce)), t = b.popper, a = c, r = d, i = it(t), p = i.tooltip, o = i.content, s = i.backdrop, l = i.arrow, t.style.zIndex = r.zIndex, p.setAttribute("data-size", r.size), p.setAttribute("data-animation", r.animation), p.style.maxWidth = r.maxWidth + ("number" == typeof r.maxWidth ? "px" : ""), r.role ? t.setAttribute("role", r.role) : t.removeAttribute("role"), a.content !== r.content && nt(o, r), !a.animateFill && r.animateFill ? (p.appendChild(st()), p.setAttribute("data-animatefill", "")) : a.animateFill && !r.animateFill && (p.removeChild(s), p.removeAttribute("data-animatefill")), !a.arrow && r.arrow ? p.appendChild(ot(r.arrowType)) : a.arrow && !r.arrow && p.removeChild(l), a.arrow && r.arrow && a.arrowType !== r.arrowType && p.replaceChild(ot(r.arrowType), l), !a.interactive && r.interactive ? lt(t, p) : a.interactive && !r.interactive && (n = p, t.removeAttribute("tabindex"), n.removeAttribute("data-interactive")), !a.inertia && r.inertia ? pt(p) : a.inertia && !r.inertia && p.removeAttribute("data-inertia"), a.theme !== r.theme && (ut(p, "remove", a.theme), ut(p, "add", r.theme)), b.popperChildren = it(b.popper), b.popperInstance && (b.popperInstance.update(), U.some(function(t) {
                return G(e, t)
            }) && (b.popperInstance.destroy(), Y(), b.state.isVisible || b.popperInstance.disableEventListeners(), b.props.followCursor && u && y(u)))
        }

        function _() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Q(b.props.duration, 0, B.duration[0]);
            if (!b.state.isDestroyed && b.state.isEnabled && (!ht || b.props.touch)) return b.reference.isVirtual || document.documentElement.contains(b.reference) ? void(b.reference.hasAttribute("disabled") || !1 !== b.props.onShow(b) && (b.popper.style.visibility = "visible", b.state.isVisible = !0, b.props.interactive && b.reference.classList.add("tippy-active"), ct([b.popper, b.popperChildren.tooltip, b.popperChildren.backdrop], 0), function(t) {
                var e = !(L() || "initial" === b.props.followCursor && ht);
                b.popperInstance ? (L() || (b.popperInstance.scheduleUpdate(), e && b.popperInstance.enableEventListeners()), at(b.popperInstance.modifiers, !0)) : (Y(), e || b.popperInstance.disableEventListeners()), b.popperInstance.reference = b.reference;
                var a, r, n, i, p, o, s = b.popperChildren.arrow;
                if (L()) {
                    s && (s.style.margin = "0");
                    var l = Q(b.props.delay, 0, B.delay);
                    d.type && y(l && u ? u : d)
                } else s && (s.style.margin = "");
                a = b.popperInstance, r = t, n = a.popper, i = a.options, p = i.onCreate, o = i.onUpdate, i.onCreate = i.onUpdate = function(t) {
                    n.offsetHeight, r(), o(t), i.onCreate = p, i.onUpdate = o
                };
                var c = b.props.appendTo;
                (m = "parent" === c ? b.reference.parentNode : et(c, [b.reference])).contains(b.popper) || (m.appendChild(b.popper), b.props.onMount(b), b.state.isMounted = !0)
            }(function() {
                b.state.isVisible && (L() || b.popperInstance.update(), ht && "initial" === b.props.followCursor && y(u), ct([b.popper], e.updateDuration), ct(z(), t), b.popperChildren.backdrop && (b.popperChildren.content.style.transitionDelay = Math.round(t / 12) + "ms"), b.props.sticky && (ct([b.popper], W ? 0 : b.props.updateDuration), function t() {
                    b.popperInstance && b.popperInstance.scheduleUpdate(), b.state.isMounted ? requestAnimationFrame(t) : ct([b.popper], 0)
                }()), mt(z(), "visible"), T(t, function() {
                    b.popperChildren.tooltip.classList.add("tippy-notransition"), b.props.aria && b.reference.setAttribute("aria-".concat(b.props.aria), b.popper.id), b.props.onShown(b), b.state.isShown = !0
                }))
            }))) : N()
        }

        function D() {
            var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Q(b.props.duration, 1, B.duration[1]);
            !b.state.isDestroyed && b.state.isEnabled && !1 !== b.props.onHide(b) && (b.popperChildren.tooltip.classList.remove("tippy-notransition"), b.props.interactive && b.reference.classList.remove("tippy-active"), b.popper.style.visibility = "hidden", b.state.isVisible = !1, b.state.isShown = !1, ct(z(), e), mt(z(), "hidden"), t = function() {
                p || x(), b.props.aria && b.reference.removeAttribute("aria-".concat(b.props.aria)), b.popperInstance.disableEventListeners(), b.popperInstance.options.placement = b.props.placement, m.removeChild(b.popper), b.props.onHidden(b), b.state.isMounted = !1
            }, T(e, function() {
                !b.state.isVisible && m && m.contains(b.popper) && t()
            }))
        }

        function N(t) {
            b.state.isDestroyed || (b.state.isMounted && D(0), P(), delete b.reference._tippy, b.props.target && t && F(b.reference.querySelectorAll(b.props.target)).forEach(function(t) {
                t._tippy && t._tippy.destroy()
            }), b.popperInstance && b.popperInstance.destroy(), b.state.isDestroyed = !0)
        }
    }
    var y = !1;

    function h(t, e) {
        xt(e, B), y || (document.addEventListener("click", m, !0), document.addEventListener("touchstart", c, bt), window.addEventListener("blur", u), y = !0);
        var r = V({}, B, e);
        p(t) && function(a) {
            var t = {
                isVirtual: !0,
                attributes: a.attributes || {},
                setAttribute: function(t, e) {
                    a.attributes[t] = e
                },
                getAttribute: function(t) {
                    return a.attributes[t]
                },
                removeAttribute: function(t) {
                    delete a.attributes[t]
                },
                hasAttribute: function(t) {
                    return t in a.attributes
                },
                addEventListener: function() {},
                removeEventListener: function() {},
                classList: {
                    classNames: {},
                    add: function(t) {
                        a.classList.classNames[t] = !0
                    },
                    remove: function(t) {
                        delete a.classList.classNames[t]
                    },
                    contains: function(t) {
                        return t in a.classList.classNames
                    }
                }
            };
            for (var e in t) a[e] = t[e]
        }(t);
        var a = function(t) {
            if (o(t)) return [t];
            if (t instanceof NodeList) return F(t);
            if (Array.isArray(t)) return t;
            try {
                return F(document.querySelectorAll(t))
            } catch (t) {
                return []
            }
        }(t).reduce(function(t, e) {
            var a = e && gt(e, r);
            return a && t.push(a), t
        }, []);
        return o(t) ? a[0] : a
    }
    return h.version = "4.0.2", h.defaults = B, h.setDefaults = function(e) {
            Object.keys(e).forEach(function(t) {
                B[t] = e[t]
            })
        }, h.hideAll = l, h.group = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                a = t.delay,
                r = void 0 === a ? e[0].props.delay : a,
                n = t.duration,
                i = void 0 === n ? 0 : n,
                p = !1;

            function o(t) {
                p = t, d()
            }

            function s(t) {
                t._originalProps.onShow(t), e.forEach(function(t) {
                    t.set({
                        duration: i
                    }), t.hide()
                }), o(!0)
            }

            function l(t) {
                t._originalProps.onHide(t), o(!1)
            }

            function c(t) {
                t._originalProps.onShown(t), t.set({
                    duration: t._originalProps.duration
                })
            }

            function d() {
                e.forEach(function(t) {
                    t.set({
                        onShow: s,
                        onShown: c,
                        onHide: l,
                        delay: p ? [0, Array.isArray(r) ? r[1] : r] : r,
                        duration: p ? i : t._originalProps.duration
                    })
                })
            }
            e.forEach(function(t) {
                t._originalProps = {
                    duration: t.props.duration,
                    onHide: t.props.onHide,
                    onShow: t.props.onShow,
                    onShown: t.props.onShown
                }
            }), d()
        }, n && setTimeout(function() {
            F(document.querySelectorAll("[data-tippy]")).forEach(function(t) {
                var e = t.getAttribute("data-tippy");
                e && h(t, {
                    content: e
                })
            })
        }),
        function(t) {
            if (n) {
                var e = document.createElement("style");
                e.type = "text/css", e.textContent = t;
                var a = document.head,
                    r = a.firstChild;
                r ? a.insertBefore(e, r) : a.appendChild(e)
            }
        }('.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none}.tippy-popper{transition-timing-function:cubic-bezier(.165,.84,.44,1);max-width:calc(100% - 10px);pointer-events:none;outline:0}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(-10px) rotateX(0);transform:perspective(700px) translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateY(0) rotateX(60deg);transform:perspective(700px) translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px) scale(.5);transform:translateY(-10px) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(10px) rotateX(0);transform:perspective(700px) translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateY(0) rotateX(-60deg);transform:perspective(700px) translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px) scale(.5);transform:translateY(10px) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(-10px) rotateY(0);transform:perspective(700px) translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateX(0) rotateY(-60deg);transform:perspective(700px) translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px) scale(.5);transform:translateX(-10px) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(10px) rotateY(0);transform:perspective(700px) translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateX(0) rotateY(60deg);transform:perspective(700px) translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px) scale(.5);transform:translateX(10px) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;line-height:1.4;text-align:center;will-change:transform;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}'), h
});
! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 89)
}({
    89: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = function(e) {
            return "string" != typeof e || "" === e ? (console.error("The namespace must be a non-empty string."), !1) : !!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e) || (console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."), !1)
        };
        var o = function(e) {
            return "string" != typeof e || "" === e ? (console.error("The hook name must be a non-empty string."), !1) : /^__/.test(e) ? (console.error("The hook name cannot begin with `__`."), !1) : !!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e) || (console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."), !1)
        };
        var i = function(e, t) {
            return function(n, i, s) {
                var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10,
                    l = e[t];
                if (o(n) && r(i))
                    if ("function" == typeof s)
                        if ("number" == typeof a) {
                            var c = {
                                callback: s,
                                priority: a,
                                namespace: i
                            };
                            if (l[n]) {
                                var u, d = l[n].handlers;
                                for (u = d.length; u > 0 && !(a >= d[u - 1].priority); u--);
                                u === d.length ? d[u] = c : d.splice(u, 0, c), l.__current.forEach((function(e) {
                                    e.name === n && e.currentIndex >= u && e.currentIndex++
                                }))
                            } else l[n] = {
                                handlers: [c],
                                runs: 0
                            };
                            "hookAdded" !== n && e.doAction("hookAdded", n, i, s, a)
                        } else console.error("If specified, the hook priority must be a number.");
                else console.error("The hook callback must be a function.")
            }
        };
        var s = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return function(i, s) {
                var a = e[t];
                if (o(i) && (n || r(s))) {
                    if (!a[i]) return 0;
                    var l = 0;
                    if (n) l = a[i].handlers.length, a[i] = {
                        runs: a[i].runs,
                        handlers: []
                    };
                    else
                        for (var c = a[i].handlers, u = function(e) {
                                c[e].namespace === s && (c.splice(e, 1), l++, a.__current.forEach((function(t) {
                                    t.name === i && t.currentIndex >= e && t.currentIndex--
                                })))
                            }, d = c.length - 1; d >= 0; d--) u(d);
                    return "hookRemoved" !== i && e.doAction("hookRemoved", i, s), l
                }
            }
        };
        var a = function(e, t) {
            return function(n, r) {
                var o = e[t];
                return void 0 !== r ? n in o && o[n].handlers.some((function(e) {
                    return e.namespace === r
                })) : n in o
            }
        };
        var l = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return function(r) {
                var o = e[t];
                o[r] || (o[r] = {
                    handlers: [],
                    runs: 0
                }), o[r].runs++;
                var i = o[r].handlers;
                for (var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), l = 1; l < s; l++) a[l - 1] = arguments[l];
                if (!i || !i.length) return n ? a[0] : void 0;
                var c = {
                    name: r,
                    currentIndex: 0
                };
                for (o.__current.push(c); c.currentIndex < i.length;) {
                    var u = i[c.currentIndex],
                        d = u.callback.apply(null, a);
                    n && (a[0] = d), c.currentIndex++
                }
                return o.__current.pop(), n ? a[0] : void 0
            }
        };
        var c = function(e, t) {
            return function() {
                var n, r, o = e[t];
                return null !== (n = null === (r = o.__current[o.__current.length - 1]) || void 0 === r ? void 0 : r.name) && void 0 !== n ? n : null
            }
        };
        var u = function(e, t) {
            return function(n) {
                var r = e[t];
                return void 0 === n ? void 0 !== r.__current[0] : !!r.__current[0] && n === r.__current[0].name
            }
        };
        var d = function(e, t) {
                return function(n) {
                    var r = e[t];
                    if (o(n)) return r[n] && r[n].runs ? r[n].runs : 0
                }
            },
            h = function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.actions = Object.create(null), this.actions.__current = [], this.filters = Object.create(null), this.filters.__current = [], this.addAction = i(this, "actions"), this.addFilter = i(this, "filters"), this.removeAction = s(this, "actions"), this.removeFilter = s(this, "filters"), this.hasAction = a(this, "actions"), this.hasFilter = a(this, "filters"), this.removeAllActions = s(this, "actions", !0), this.removeAllFilters = s(this, "filters", !0), this.doAction = l(this, "actions"), this.applyFilters = l(this, "filters", !0), this.currentAction = c(this, "actions"), this.currentFilter = c(this, "filters"), this.doingAction = u(this, "actions"), this.doingFilter = u(this, "filters"), this.didAction = d(this, "actions"), this.didFilter = d(this, "filters")
            };
        var f = function() {
                return new h
            },
            v = f();
        v.addAction, v.addFilter, v.removeAction, v.removeFilter, v.hasAction, v.hasFilter, v.removeAllActions, v.removeAllFilters, v.doAction, v.applyFilters, v.currentAction, v.currentFilter, v.doingAction, v.doingFilter, v.didAction, v.didFilter, v.actions, v.filters;
        window.isEditMode = !1, window.ea = {
            hooks: f(),
            isEditMode: !1
        }, ea.hooks.addAction("widgets.reinit", "ea", (function(e) {
            var t = jQuery(".eael-filter-gallery-container", e),
                n = jQuery(".eael-post-grid:not(.eael-post-carousel)", e),
                r = jQuery(".eael-twitter-feed-masonry", e),
                o = jQuery(".eael-instafeed", e),
                i = jQuery(".premium-gallery-container", e),
                s = jQuery(".eael-event-calendar-cls", e),
                a = jQuery(".eael-testimonial-slider", e),
                l = jQuery(".eael-tm-carousel", e),
                c = jQuery(".eael-post-carousel:not(.eael-post-grid)", e),
                u = jQuery(".eael-logo-carousel", e),
                d = jQuery(".eael-twitter-feed-carousel", e);
            t.length && t.isotope("layout"), n.length && n.isotope("layout"), r.length && r.isotope("layout"), o.length && o.isotope("layout"), i.length && i.isotope("layout"), s.length && ea.hooks.doAction("eventCalendar.reinit"), a.length && ea.hooks.doAction("testimonialSlider.reinit"), l.length && ea.hooks.doAction("teamMemberCarousel.reinit"), c.length && ea.hooks.doAction("postCarousel.reinit"), u.length && ea.hooks.doAction("logoCarousel.reinit"), d.length && ea.hooks.doAction("twitterCarousel.reinit")
        })), jQuery(window).on("elementor/frontend/init", (function() {
            window.isEditMode = elementorFrontend.isEditMode(), window.ea.isEditMode = elementorFrontend.isEditMode(), ea.hooks.doAction("init"), ea.isEditMode && ea.hooks.doAction("editMode.init")
        }))
    }
});
! function(e) {
    var a = {};

    function t(i) {
        if (a[i]) return a[i].exports;
        var n = a[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports
    }
    t.m = e, t.c = a, t.d = function(e, a, i) {
        t.o(e, a) || Object.defineProperty(e, a, {
            enumerable: !0,
            get: i
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, a) {
        if (1 & a && (e = t(e)), 8 & a) return e;
        if (4 & a && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (t.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & a && "string" != typeof e)
            for (var n in e) t.d(i, n, function(a) {
                return e[a]
            }.bind(null, n));
        return i
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(a, "a", a), a
    }, t.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }, t.p = "", t(t.s = 2)
}({
    2: function(e, a) {
        ea.hooks.addAction("init", "ea", (function() {
            elementorFrontend.hooks.addAction("frontend/element_ready/eael-adv-tabs.default", (function(e, a) {
                var t = e.find(".eael-advance-tabs");
                if (!t.attr("id")) return !1;
                var i = "#" + t.attr("id").toString(),
                    n = window.location.hash.substr(1);
                n = "safari" === n ? "eael-safari" : n;
                var s = !1;
                a(i + " > .eael-tabs-nav ul li", e).each((function(t) {
                    n && a(this).attr("id") == n ? (a(i + " .eael-tabs-nav > ul li", e).removeClass("active").addClass("inactive"), a(this).removeClass("inactive").addClass("active"), s = !0) : a(this).hasClass("active-default") && !s ? (a(i + " .eael-tabs-nav > ul li", e).removeClass("active").addClass("inactive"), a(this).removeClass("inactive").addClass("active")) : 0 == t && a(this).removeClass("inactive").addClass("active")
                }));
                var l = !1;
                a(i + " > .eael-tabs-content > div", e).each((function(t) {
                    if (n && a(this).attr("id") == n) {
                        a(i + " > .eael-tabs-content > div", e).removeClass("active");
                        var s = a(this).closest(".eael-tabs-content").closest(".eael-tab-content-item");
                        if (s.length) {
                            var o = s.closest(".eael-advance-tabs"),
                                r = a("#" + s.attr("id")),
                                c = r.data("title-link");
                            o.find(" > .eael-tabs-nav > ul > li").removeClass("active"), o.find(" > .eael-tabs-content > div").removeClass("active"), r.addClass("active"), a("#" + c).addClass("active")
                        }
                        a(this).removeClass("inactive").addClass("active"), l = !0
                    } else a(this).hasClass("active-default") && !l ? (a(i + " > .eael-tabs-content > div", e).removeClass("active"), a(this).removeClass("inactive").addClass("active")) : 0 == t && a(this).removeClass("inactive").addClass("active")
                })), a(i + " .eael-tabs-nav ul li", e).on("click", (function(e) {
                    e.preventDefault();
                    var t = a(this).index(),
                        i = a(this).closest(".eael-advance-tabs"),
                        n = a(i).children(".eael-tabs-nav").children("ul").children("li"),
                        s = a(i).children(".eael-tabs-content").children("div");
                    a(this).parent("li").addClass("active"), a(n).removeClass("active active-default").addClass("inactive"), a(this).addClass("active").removeClass("inactive"), a(s).removeClass("active").addClass("inactive"), a(s).eq(t).addClass("active").removeClass("inactive"), a(s).each((function(e) {
                        a(this).removeClass("active-default")
                    }));
                    var l = s.eq(t).find(".eael-filter-gallery-container"),
                        o = s.eq(t).find(".eael-post-grid.eael-post-appender"),
                        r = s.eq(t).find(".eael-twitter-feed-masonry"),
                        c = s.eq(t).find(".eael-instafeed"),
                        d = s.eq(t).find(".premium-gallery-container"),
                        v = a(".eael-event-calendar-cls", s);
                    o.length && o.isotope("layout"), r.length && r.isotope("layout"), l.length && l.isotope("layout"), c.length && c.isotope("layout"), d.length && d.each((function(e, t) {
                        a(t).isotope("layout")
                    })), v.length && ea.hooks.doAction("eventCalendar.reinit")
                }))
            }))
        }))
    }
});
! function(t) {
    var e = {};

    function o(i) {
        if (e[i]) return e[i].exports;
        var n = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, o), n.l = !0, n.exports
    }
    o.m = t, o.c = e, o.d = function(t, e, i) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (o.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) o.d(i, n, function(e) {
                return t[e]
            }.bind(null, n));
        return i
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 2)
}({
    2: function(t, e) {
        var o = function(t, e) {
            var o = t,
                i = o.data("id"),
                n = elementorFrontend.isEditMode(),
                a = {};
            if (n) {
                var r, l = {};
                if (!window.elementor.hasOwnProperty("elements")) return !1;
                if (!(r = window.elementor.elements).models) return !1;
                e.each(r.models, (function(t, r) {
                    function s() {
                        o.attr("id", "eael-section-tooltip-" + i);
                        var t = "#" + o.attr("id");
                        tippy(t, {
                            content: a.content,
                            placement: a.position,
                            animation: a.animation,
                            arrow: a.arrow,
                            arrowType: a.arrowType,
                            duration: a.duration,
                            distance: a.distance,
                            delay: a.content,
                            size: a.size,
                            trigger: a.trigger,
                            animateFill: !1,
                            flipOnUpdate: !0,
                            interactive: !0,
                            maxWidth: a.maxWidth,
                            zIndex: 999,
                            onShow: function(t) {
                                var o;
                                if (a.content = (o = l.eael_tooltip_section_content).search(/(<script>|<script type="text\/javascript">).*(<\/script>)/g) > 0 ? o.replace(/[&<>"']/g, (function(t) {
                                        return "&#" + t.charCodeAt(0) + ";"
                                    })) : o, a.position = l.eael_tooltip_section_position, a.animation = l.eael_tooltip_section_animation, a.arrow = l.eael_tooltip_section_arrow, a.arrowType = l.eael_tooltip_section_arrow_type, a.duration = l.eael_tooltip_section_duration, a.delay = l.eael_tooltip_section_delay, a.size = l.eael_tooltip_section_size, a.trigger = l.eael_tooltip_section_trigger, a.distance = l.eael_tooltip_section_distance, a.maxWidth = l.eael_tooltip_section_width, a.switch = l.eael_tooltip_section_enable, "yes" !== a.switch) t.destroy();
                                else {
                                    t.set({
                                        content: a.content,
                                        placement: a.position,
                                        animation: a.animation,
                                        arrow: a.arrow,
                                        arrowType: a.arrowType,
                                        duration: a.duration,
                                        distance: a.distance,
                                        delay: a.delay,
                                        size: a.size,
                                        trigger: a.trigger,
                                        maxWidth: a.maxWidth
                                    });
                                    var n = t.popper;
                                    e(n).attr("data-tippy-popper-id", i)
                                }
                            }
                        })
                    }
                    r.id == o.closest(".elementor-top-section").data("id") && e.each(r.attributes.elements.models, (function(t, r) {
                        e.each(r.attributes.elements.models, (function(t, r) {
                            e.each(r.attributes.elements.models, (function(t, r) {
                                e.each(r.attributes.elements.models, (function(t, e) {
                                    return i == e.id && (l = e.attributes.settings.attributes, a.switch = l.eael_tooltip_section_enable, a.content = l.eael_tooltip_section_content, a.position = l.eael_tooltip_section_position, a.animation = l.eael_tooltip_section_animation, a.arrow = l.eael_tooltip_section_arrow, a.arrowType = l.eael_tooltip_section_arrow_type, a.duration = l.eael_tooltip_section_duration, a.delay = l.eael_tooltip_section_delay, a.size = l.eael_tooltip_section_size, a.trigger = l.eael_tooltip_section_trigger, a.distance = l.eael_tooltip_section_distance, a.maxWidth = l.eael_tooltip_section_width, "yes" == a.switch ? (o.addClass("eael-section-tooltip"), s()) : o.removeClass("eael-section-tooltip"), 0 !== a.length) ? a : !(!n || !a) && void 0
                                }))
                            }))
                        }))
                    })), e.each(r.attributes.elements.models, (function(t, r) {
                        e.each(r.attributes.elements.models, (function(t, e) {
                            return i == e.id && (l = e.attributes.settings.attributes, a.switch = l.eael_tooltip_section_enable, a.content = l.eael_tooltip_section_content, a.position = l.eael_tooltip_section_position, a.animation = l.eael_tooltip_section_animation, a.arrow = l.eael_tooltip_section_arrow, a.arrowType = l.eael_tooltip_section_arrow_type, a.duration = l.eael_tooltip_section_duration, a.delay = l.eael_tooltip_section_delay, a.size = l.eael_tooltip_section_size, a.trigger = l.eael_tooltip_section_trigger, a.distance = l.eael_tooltip_section_distance, a.maxWidth = l.eael_tooltip_section_width, "yes" == a.switch ? (o.addClass("eael-section-tooltip"), s()) : o.removeClass("eael-section-tooltip"), 0 !== a.length) ? a : !(!n || !a) && void 0
                        }))
                    }))
                }))
            }
        };
        jQuery(window).on("elementor/frontend/init", (function() {
            elementorFrontend.hooks.addAction("frontend/element_ready/widget", o)
        }))
    }
});