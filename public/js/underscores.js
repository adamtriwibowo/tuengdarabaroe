/*! This file is auto-generated */ ! function(n, r) {
    var t, e;
    "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define("underscore", r) : (n = "undefined" != typeof globalThis ? globalThis : n || self, t = n._, (e = n._ = r()).noConflict = function() {
        return n._ = t, e
    })
}(this, function() {
    var n = "1.13.1",
        r = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || Function("return this")() || {},
        e = Array.prototype,
        o = Object.prototype,
        s = "undefined" != typeof Symbol ? Symbol.prototype : null,
        u = e.push,
        a = e.slice,
        p = o.toString,
        t = o.hasOwnProperty,
        i = "undefined" != typeof ArrayBuffer,
        f = "undefined" != typeof DataView,
        c = Array.isArray,
        l = Object.keys,
        h = Object.create,
        v = i && ArrayBuffer.isView,
        y = isNaN,
        d = isFinite,
        g = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        b = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
        m = Math.pow(2, 53) - 1;

    function j(u, i) {
        return i = null == i ? u.length - 1 : +i,
            function() {
                for (var n = Math.max(arguments.length - i, 0), r = Array(n), t = 0; t < n; t++) r[t] = arguments[t + i];
                switch (i) {
                    case 0:
                        return u.call(this, r);
                    case 1:
                        return u.call(this, arguments[0], r);
                    case 2:
                        return u.call(this, arguments[0], arguments[1], r)
                }
                for (var e = Array(i + 1), t = 0; t < i; t++) e[t] = arguments[t];
                return e[i] = r, u.apply(this, e)
            }
    }

    function _(n) {
        var r = typeof n;
        return "function" == r || "object" == r && !!n
    }

    function w(n) {
        return void 0 === n
    }

    function A(n) {
        return !0 === n || !1 === n || "[object Boolean]" === p.call(n)
    }

    function x(n) {
        var r = "[object " + n + "]";
        return function(n) {
            return p.call(n) === r
        }
    }
    var S = x("String"),
        O = x("Number"),
        M = x("Date"),
        E = x("RegExp"),
        B = x("Error"),
        N = x("Symbol"),
        I = x("ArrayBuffer"),
        T = x("Function"),
        k = r.document && r.document.childNodes,
        D = T = "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof k ? function(n) {
            return "function" == typeof n || !1
        } : T,
        R = x("Object"),
        F = f && R(new DataView(new ArrayBuffer(8))),
        V = "undefined" != typeof Map && R(new Map),
        P = x("DataView");
    var q = F ? function(n) {
            return null != n && D(n.getInt8) && I(n.buffer)
        } : P,
        U = c || x("Array");

    function W(n, r) {
        return null != n && t.call(n, r)
    }
    var z = x("Arguments");
    ! function() {
        z(arguments) || (z = function(n) {
            return W(n, "callee")
        })
    }();
    var L = z;

    function $(n) {
        return O(n) && y(n)
    }

    function C(n) {
        return function() {
            return n
        }
    }

    function K(r) {
        return function(n) {
            n = r(n);
            return "number" == typeof n && 0 <= n && n <= m
        }
    }

    function J(r) {
        return function(n) {
            return null == n ? void 0 : n[r]
        }
    }
    var G = J("byteLength"),
        H = K(G),
        Q = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
    var X = i ? function(n) {
            return v ? v(n) && !q(n) : H(n) && Q.test(p.call(n))
        } : C(!1),
        Y = J("length");

    function Z(n, r) {
        r = function(r) {
            for (var t = {}, n = r.length, e = 0; e < n; ++e) t[r[e]] = !0;
            return {
                contains: function(n) {
                    return t[n]
                },
                push: function(n) {
                    return t[n] = !0, r.push(n)
                }
            }
        }(r);
        var t = b.length,
            e = n.constructor,
            u = D(e) && e.prototype || o,
            i = "constructor";
        for (W(n, i) && !r.contains(i) && r.push(i); t--;)(i = b[t]) in n && n[i] !== u[i] && !r.contains(i) && r.push(i)
    }

    function nn(n) {
        if (!_(n)) return [];
        if (l) return l(n);
        var r, t = [];
        for (r in n) W(n, r) && t.push(r);
        return g && Z(n, t), t
    }

    function rn(n, r) {
        var t = nn(r),
            e = t.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; i < e; i++) {
            var o = t[i];
            if (r[o] !== u[o] || !(o in u)) return !1
        }
        return !0
    }

    function tn(n) {
        return n instanceof tn ? n : this instanceof tn ? void(this._wrapped = n) : new tn(n)
    }

    function en(n) {
        return new Uint8Array(n.buffer || n, n.byteOffset || 0, G(n))
    }
    tn.VERSION = n, tn.prototype.valueOf = tn.prototype.toJSON = tn.prototype.value = function() {
        return this._wrapped
    }, tn.prototype.toString = function() {
        return String(this._wrapped)
    };
    var un = "[object DataView]";

    function on(n, r, t, e) {
        if (n === r) return 0 !== n || 1 / n == 1 / r;
        if (null == n || null == r) return !1;
        if (n != n) return r != r;
        var u = typeof n;
        return ("function" == u || "object" == u || "object" == typeof r) && function n(r, t, e, u) {
            r instanceof tn && (r = r._wrapped);
            t instanceof tn && (t = t._wrapped);
            var i = p.call(r);
            if (i !== p.call(t)) return !1;
            if (F && "[object Object]" == i && q(r)) {
                if (!q(t)) return !1;
                i = un
            }
            switch (i) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + r == "" + t;
                case "[object Number]":
                    return +r != +r ? +t != +t : 0 == +r ? 1 / +r == 1 / t : +r == +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +r == +t;
                case "[object Symbol]":
                    return s.valueOf.call(r) === s.valueOf.call(t);
                case "[object ArrayBuffer]":
                case un:
                    return n(en(r), en(t), e, u)
            }
            var o = "[object Array]" === i;
            if (!o && X(r)) {
                var f = G(r);
                if (f !== G(t)) return !1;
                if (r.buffer === t.buffer && r.byteOffset === t.byteOffset) return !0;
                o = !0
            }
            if (!o) {
                if ("object" != typeof r || "object" != typeof t) return !1;
                i = r.constructor, f = t.constructor;
                if (i !== f && !(D(i) && i instanceof i && D(f) && f instanceof f) && "constructor" in r && "constructor" in t) return !1
            }
            e = e || [];
            u = u || [];
            var a = e.length;
            for (; a--;)
                if (e[a] === r) return u[a] === t;
            e.push(r);
            u.push(t);
            if (o) {
                if ((a = r.length) !== t.length) return !1;
                for (; a--;)
                    if (!on(r[a], t[a], e, u)) return !1
            } else {
                var c, l = nn(r);
                if (a = l.length, nn(t).length !== a) return !1;
                for (; a--;)
                    if (c = l[a], !W(t, c) || !on(r[c], t[c], e, u)) return !1
            }
            e.pop();
            u.pop();
            return !0
        }(n, r, t, e)
    }

    function fn(n) {
        if (!_(n)) return [];
        var r, t = [];
        for (r in n) t.push(r);
        return g && Z(n, t), t
    }

    function an(e) {
        var u = Y(e);
        return function(n) {
            if (null == n) return !1;
            var r = fn(n);
            if (Y(r)) return !1;
            for (var t = 0; t < u; t++)
                if (!D(n[e[t]])) return !1;
            return e !== hn || !D(n[cn])
        }
    }
    var cn = "forEach",
        ln = ["clear", "delete"],
        sn = ["get", "has", "set"],
        pn = ln.concat(cn, sn),
        hn = ln.concat(sn),
        vn = ["add"].concat(ln, cn, "has"),
        yn = V ? an(pn) : x("Map"),
        dn = V ? an(hn) : x("WeakMap"),
        gn = V ? an(vn) : x("Set"),
        bn = x("WeakSet");

    function mn(n) {
        for (var r = nn(n), t = r.length, e = Array(t), u = 0; u < t; u++) e[u] = n[r[u]];
        return e
    }

    function jn(n) {
        for (var r = {}, t = nn(n), e = 0, u = t.length; e < u; e++) r[n[t[e]]] = t[e];
        return r
    }

    function _n(n) {
        var r, t = [];
        for (r in n) D(n[r]) && t.push(r);
        return t.sort()
    }

    function wn(a, c) {
        return function(n) {
            var r = arguments.length;
            if (c && (n = Object(n)), r < 2 || null == n) return n;
            for (var t = 1; t < r; t++)
                for (var e = arguments[t], u = a(e), i = u.length, o = 0; o < i; o++) {
                    var f = u[o];
                    c && void 0 !== n[f] || (n[f] = e[f])
                }
            return n
        }
    }
    var An = wn(fn),
        xn = wn(nn),
        Sn = wn(fn, !0);

    function On(n) {
        if (!_(n)) return {};
        if (h) return h(n);
        var r = function() {};
        r.prototype = n;
        n = new r;
        return r.prototype = null, n
    }

    function Mn(n) {
        return _(n) ? U(n) ? n.slice() : An({}, n) : n
    }

    function En(n) {
        return U(n) ? n : [n]
    }

    function Bn(n) {
        return tn.toPath(n)
    }

    function Nn(n, r) {
        for (var t = r.length, e = 0; e < t; e++) {
            if (null == n) return;
            n = n[r[e]]
        }
        return t ? n : void 0
    }

    function In(n, r, t) {
        r = Nn(n, Bn(r));
        return w(r) ? t : r
    }

    function Tn(n) {
        return n
    }

    function kn(r) {
        return r = xn({}, r),
            function(n) {
                return rn(n, r)
            }
    }

    function Dn(r) {
        return r = Bn(r),
            function(n) {
                return Nn(n, r)
            }
    }

    function Rn(u, i, n) {
        if (void 0 === i) return u;
        switch (null == n ? 3 : n) {
            case 1:
                return function(n) {
                    return u.call(i, n)
                };
            case 3:
                return function(n, r, t) {
                    return u.call(i, n, r, t)
                };
            case 4:
                return function(n, r, t, e) {
                    return u.call(i, n, r, t, e)
                }
        }
        return function() {
            return u.apply(i, arguments)
        }
    }

    function Fn(n, r, t) {
        return null == n ? Tn : D(n) ? Rn(n, r, t) : (_(n) && !U(n) ? kn : Dn)(n)
    }

    function Vn(n, r) {
        return Fn(n, r, 1 / 0)
    }

    function Pn(n, r, t) {
        return tn.iteratee !== Vn ? tn.iteratee(n, r) : Fn(n, r, t)
    }

    function qn() {}

    function Un(n, r) {
        return null == r && (r = n, n = 0), n + Math.floor(Math.random() * (r - n + 1))
    }
    tn.toPath = En, tn.iteratee = Vn;
    var Wn = Date.now || function() {
        return (new Date).getTime()
    };

    function zn(r) {
        function t(n) {
            return r[n]
        }
        var n = "(?:" + nn(r).join("|") + ")",
            e = RegExp(n),
            u = RegExp(n, "g");
        return function(n) {
            return e.test(n = null == n ? "" : "" + n) ? n.replace(u, t) : n
        }
    }
    var Ln = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        $n = zn(Ln),
        Cn = zn(jn(Ln)),
        Kn = tn.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        },
        Jn = /(.)^/,
        Gn = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        Hn = /\\|'|\r|\n|\u2028|\u2029/g;

    function Qn(n) {
        return "\\" + Gn[n]
    }
    var Xn = /^\s*(\w|\$)+\s*$/;
    var Yn = 0;

    function Zn(n, r, t, e, u) {
        if (!(e instanceof r)) return n.apply(t, u);
        t = On(n.prototype), u = n.apply(t, u);
        return _(u) ? u : t
    }
    var nr = j(function(u, i) {
        var o = nr.placeholder,
            f = function() {
                for (var n = 0, r = i.length, t = Array(r), e = 0; e < r; e++) t[e] = i[e] === o ? arguments[n++] : i[e];
                for (; n < arguments.length;) t.push(arguments[n++]);
                return Zn(u, f, this, this, t)
            };
        return f
    });
    nr.placeholder = tn;
    var rr = j(function(r, t, e) {
            if (!D(r)) throw new TypeError("Bind must be called on a function");
            var u = j(function(n) {
                return Zn(r, u, t, this, e.concat(n))
            });
            return u
        }),
        tr = K(Y);

    function er(n, r, t, e) {
        if (e = e || [], r || 0 === r) {
            if (r <= 0) return e.concat(n)
        } else r = 1 / 0;
        for (var u = e.length, i = 0, o = Y(n); i < o; i++) {
            var f = n[i];
            if (tr(f) && (U(f) || L(f)))
                if (1 < r) er(f, r - 1, t, e), u = e.length;
                else
                    for (var a = 0, c = f.length; a < c;) e[u++] = f[a++];
            else t || (e[u++] = f)
        }
        return e
    }
    var ur = j(function(n, r) {
        var t = (r = er(r, !1, !1)).length;
        if (t < 1) throw new Error("bindAll must be passed function names");
        for (; t--;) {
            var e = r[t];
            n[e] = rr(n[e], n)
        }
        return n
    });
    var ir = j(function(n, r, t) {
            return setTimeout(function() {
                return n.apply(null, t)
            }, r)
        }),
        or = nr(ir, tn, 1);

    function fr(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }

    function ar(n, r) {
        var t;
        return function() {
            return 0 < --n && (t = r.apply(this, arguments)), n <= 1 && (r = null), t
        }
    }
    r = nr(ar, 2);

    function cr(n, r, t) {
        r = Pn(r, t);
        for (var e, u = nn(n), i = 0, o = u.length; i < o; i++)
            if (r(n[e = u[i]], e, n)) return e
    }

    function lr(i) {
        return function(n, r, t) {
            r = Pn(r, t);
            for (var e = Y(n), u = 0 < i ? 0 : e - 1; 0 <= u && u < e; u += i)
                if (r(n[u], u, n)) return u;
            return -1
        }
    }
    var sr = lr(1),
        k = lr(-1);

    function pr(n, r, t, e) {
        for (var u = (t = Pn(t, e, 1))(r), i = 0, o = Y(n); i < o;) {
            var f = Math.floor((i + o) / 2);
            t(n[f]) < u ? i = f + 1 : o = f
        }
        return i
    }

    function hr(i, o, f) {
        return function(n, r, t) {
            var e = 0,
                u = Y(n);
            if ("number" == typeof t) 0 < i ? e = 0 <= t ? t : Math.max(t + u, e) : u = 0 <= t ? Math.min(t + 1, u) : t + u + 1;
            else if (f && t && u) return n[t = f(n, r)] === r ? t : -1;
            if (r != r) return 0 <= (t = o(a.call(n, e, u), $)) ? t + e : -1;
            for (t = 0 < i ? e : u - 1; 0 <= t && t < u; t += i)
                if (n[t] === r) return t;
            return -1
        }
    }
    var vr = hr(1, sr, pr),
        T = hr(-1, k);

    function yr(n, r, t) {
        t = (tr(n) ? sr : cr)(n, r, t);
        if (void 0 !== t && -1 !== t) return n[t]
    }

    function dr(n, r, t) {
        if (r = Rn(r, t), tr(n))
            for (u = 0, i = n.length; u < i; u++) r(n[u], u, n);
        else
            for (var e = nn(n), u = 0, i = e.length; u < i; u++) r(n[e[u]], e[u], n);
        return n
    }

    function gr(n, r, t) {
        r = Pn(r, t);
        for (var e = !tr(n) && nn(n), u = (e || n).length, i = Array(u), o = 0; o < u; o++) {
            var f = e ? e[o] : o;
            i[o] = r(n[f], f, n)
        }
        return i
    }

    function br(a) {
        return function(n, r, t, e) {
            var u = 3 <= arguments.length;
            return function(n, r, t, e) {
                var u = !tr(n) && nn(n),
                    i = (u || n).length,
                    o = 0 < a ? 0 : i - 1;
                for (e || (t = n[u ? u[o] : o], o += a); 0 <= o && o < i; o += a) {
                    var f = u ? u[o] : o;
                    t = r(t, n[f], f, n)
                }
                return t
            }(n, Rn(r, e, 4), t, u)
        }
    }
    f = br(1), R = br(-1);

    function mr(n, e, r) {
        var u = [];
        return e = Pn(e, r), dr(n, function(n, r, t) {
            e(n, r, t) && u.push(n)
        }), u
    }

    function jr(n, r, t) {
        r = Pn(r, t);
        for (var e = !tr(n) && nn(n), u = (e || n).length, i = 0; i < u; i++) {
            var o = e ? e[i] : i;
            if (!r(n[o], o, n)) return !1
        }
        return !0
    }

    function _r(n, r, t) {
        r = Pn(r, t);
        for (var e = !tr(n) && nn(n), u = (e || n).length, i = 0; i < u; i++) {
            var o = e ? e[i] : i;
            if (r(n[o], o, n)) return !0
        }
        return !1
    }

    function wr(n, r, t, e) {
        return tr(n) || (n = mn(n)), 0 <= vr(n, r, t = "number" != typeof t || e ? 0 : t)
    }
    P = j(function(n, t, e) {
        var u, i;
        return D(t) ? i = t : (t = Bn(t), u = t.slice(0, -1), t = t[t.length - 1]), gr(n, function(n) {
            var r = i;
            if (!r) {
                if (null == (n = u && u.length ? Nn(n, u) : n)) return;
                r = n[t]
            }
            return null == r ? r : r.apply(n, e)
        })
    });

    function Ar(n, r) {
        return gr(n, Dn(r))
    }

    function xr(n, e, r) {
        var t, u, i = -1 / 0,
            o = -1 / 0;
        if (null == e || "number" == typeof e && "object" != typeof n[0] && null != n)
            for (var f = 0, a = (n = tr(n) ? n : mn(n)).length; f < a; f++) null != (t = n[f]) && i < t && (i = t);
        else e = Pn(e, r), dr(n, function(n, r, t) {
            u = e(n, r, t), (o < u || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }

    function Sr(n, r, t) {
        if (null == r || t) return (n = !tr(n) ? mn(n) : n)[Un(n.length - 1)];
        var e = (tr(n) ? Mn : mn)(n),
            n = Y(e);
        r = Math.max(Math.min(r, n), 0);
        for (var u = n - 1, i = 0; i < r; i++) {
            var o = Un(i, u),
                f = e[i];
            e[i] = e[o], e[o] = f
        }
        return e.slice(0, r)
    }

    function Or(i, r) {
        return function(t, e, n) {
            var u = r ? [
                [],
                []
            ] : {};
            return e = Pn(e, n), dr(t, function(n, r) {
                r = e(n, r, t);
                i(u, n, r)
            }), u
        }
    }
    var c = Or(function(n, r, t) {
            W(n, t) ? n[t].push(r) : n[t] = [r]
        }),
        i = Or(function(n, r, t) {
            n[t] = r
        }),
        sn = Or(function(n, r, t) {
            W(n, t) ? n[t]++ : n[t] = 1
        }),
        ln = Or(function(n, r, t) {
            n[t ? 0 : 1].push(r)
        }, !0),
        Mr = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

    function Er(n, r, t) {
        return r in t
    }
    var Br = j(function(n, r) {
            var t = {},
                e = r[0];
            if (null == n) return t;
            D(e) ? (1 < r.length && (e = Rn(e, r[1])), r = fn(n)) : (e = Er, r = er(r, !1, !1), n = Object(n));
            for (var u = 0, i = r.length; u < i; u++) {
                var o = r[u],
                    f = n[o];
                e(f, o, n) && (t[o] = f)
            }
            return t
        }),
        pn = j(function(n, t) {
            var r, e = t[0];
            return D(e) ? (e = fr(e), 1 < t.length && (r = t[1])) : (t = gr(er(t, !1, !1), String), e = function(n, r) {
                return !wr(t, r)
            }), Br(n, e, r)
        });

    function Nr(n, r, t) {
        return a.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)))
    }

    function Ir(n, r, t) {
        return null == n || n.length < 1 ? null == r || t ? void 0 : [] : null == r || t ? n[0] : Nr(n, n.length - r)
    }

    function Tr(n, r, t) {
        return a.call(n, null == r || t ? 1 : r)
    }
    var kr = j(function(n, r) {
            return r = er(r, !0, !0), mr(n, function(n) {
                return !wr(r, n)
            })
        }),
        V = j(function(n, r) {
            return kr(n, r)
        });

    function Dr(n, r, t, e) {
        A(r) || (e = t, t = r, r = !1), null != t && (t = Pn(t, e));
        for (var u = [], i = [], o = 0, f = Y(n); o < f; o++) {
            var a = n[o],
                c = t ? t(a, o, n) : a;
            r && !t ? (o && i === c || u.push(a), i = c) : t ? wr(i, c) || (i.push(c), u.push(a)) : wr(u, a) || u.push(a)
        }
        return u
    }
    vn = j(function(n) {
        return Dr(er(n, !0, !0))
    });

    function Rr(n) {
        for (var r = n && xr(n, Y).length || 0, t = Array(r), e = 0; e < r; e++) t[e] = Ar(n, e);
        return t
    }
    Ln = j(Rr);

    function Fr(n, r) {
        return n._chain ? tn(r).chain() : r
    }

    function Vr(t) {
        return dr(_n(t), function(n) {
            var r = tn[n] = t[n];
            tn.prototype[n] = function() {
                var n = [this._wrapped];
                return u.apply(n, arguments), Fr(this, r.apply(tn, n))
            }
        }), tn
    }
    dr(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(r) {
        var t = e[r];
        tn.prototype[r] = function() {
            var n = this._wrapped;
            return null != n && (t.apply(n, arguments), "shift" !== r && "splice" !== r || 0 !== n.length || delete n[0]), Fr(this, n)
        }
    }), dr(["concat", "join", "slice"], function(n) {
        var r = e[n];
        tn.prototype[n] = function() {
            var n = this._wrapped;
            return Fr(this, n = null != n ? r.apply(n, arguments) : n)
        }
    });
    Ln = Vr({
        __proto__: null,
        VERSION: n,
        restArguments: j,
        isObject: _,
        isNull: function(n) {
            return null === n
        },
        isUndefined: w,
        isBoolean: A,
        isElement: function(n) {
            return !(!n || 1 !== n.nodeType)
        },
        isString: S,
        isNumber: O,
        isDate: M,
        isRegExp: E,
        isError: B,
        isSymbol: N,
        isArrayBuffer: I,
        isDataView: q,
        isArray: U,
        isFunction: D,
        isArguments: L,
        isFinite: function(n) {
            return !N(n) && d(n) && !isNaN(parseFloat(n))
        },
        isNaN: $,
        isTypedArray: X,
        isEmpty: function(n) {
            if (null == n) return !0;
            var r = Y(n);
            return "number" == typeof r && (U(n) || S(n) || L(n)) ? 0 === r : 0 === Y(nn(n))
        },
        isMatch: rn,
        isEqual: function(n, r) {
            return on(n, r)
        },
        isMap: yn,
        isWeakMap: dn,
        isSet: gn,
        isWeakSet: bn,
        keys: nn,
        allKeys: fn,
        values: mn,
        pairs: function(n) {
            for (var r = nn(n), t = r.length, e = Array(t), u = 0; u < t; u++) e[u] = [r[u], n[r[u]]];
            return e
        },
        invert: jn,
        functions: _n,
        methods: _n,
        extend: An,
        extendOwn: xn,
        assign: xn,
        defaults: Sn,
        create: function(n, r) {
            return n = On(n), r && xn(n, r), n
        },
        clone: Mn,
        tap: function(n, r) {
            return r(n), n
        },
        get: In,
        has: function(n, r) {
            for (var t = (r = Bn(r)).length, e = 0; e < t; e++) {
                var u = r[e];
                if (!W(n, u)) return !1;
                n = n[u]
            }
            return !!t
        },
        mapObject: function(n, r, t) {
            r = Pn(r, t);
            for (var e = nn(n), u = e.length, i = {}, o = 0; o < u; o++) {
                var f = e[o];
                i[f] = r(n[f], f, n)
            }
            return i
        },
        identity: Tn,
        constant: C,
        noop: qn,
        toPath: En,
        property: Dn,
        propertyOf: function(r) {
            return null == r ? qn : function(n) {
                return In(r, n)
            }
        },
        matcher: kn,
        matches: kn,
        times: function(n, r, t) {
            var e = Array(Math.max(0, n));
            r = Rn(r, t, 1);
            for (var u = 0; u < n; u++) e[u] = r(u);
            return e
        },
        random: Un,
        now: Wn,
        escape: $n,
        unescape: Cn,
        templateSettings: Kn,
        template: function(i, n, r) {
            n = Sn({}, n = !n && r ? r : n, tn.templateSettings);
            var t, r = RegExp([(n.escape || Jn).source, (n.interpolate || Jn).source, (n.evaluate || Jn).source].join("|") + "|$", "g"),
                o = 0,
                f = "__p+='";
            if (i.replace(r, function(n, r, t, e, u) {
                    return f += i.slice(o, u).replace(Hn, Qn), o = u + n.length, r ? f += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : t ? f += "'+\n((__t=(" + t + "))==null?'':__t)+\n'" : e && (f += "';\n" + e + "\n__p+='"), n
                }), f += "';\n", r = n.variable) {
                if (!Xn.test(r)) throw new Error("variable is not a bare identifier: " + r)
            } else f = "with(obj||{}){\n" + f + "}\n", r = "obj";
            f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
            try {
                t = new Function(r, "_", f)
            } catch (n) {
                throw n.source = f, n
            }
            return (n = function(n) {
                return t.call(this, n, tn)
            }).source = "function(" + r + "){\n" + f + "}", n
        },
        result: function(n, r, t) {
            var e = (r = Bn(r)).length;
            if (!e) return D(t) ? t.call(n) : t;
            for (var u = 0; u < e; u++) {
                var i = null == n ? void 0 : n[r[u]];
                void 0 === i && (i = t, u = e), n = D(i) ? i.call(n) : i
            }
            return n
        },
        uniqueId: function(n) {
            var r = ++Yn + "";
            return n ? n + r : r
        },
        chain: function(n) {
            return (n = tn(n))._chain = !0, n
        },
        iteratee: Vn,
        partial: nr,
        bind: rr,
        bindAll: ur,
        memoize: function(e, u) {
            var i = function(n) {
                var r = i.cache,
                    t = "" + (u ? u.apply(this, arguments) : n);
                return W(r, t) || (r[t] = e.apply(this, arguments)), r[t]
            };
            return i.cache = {}, i
        },
        delay: ir,
        defer: or,
        throttle: function(t, e, u) {
            var i, o, f, a, c = 0;

            function l() {
                c = !1 === u.leading ? 0 : Wn(), i = null, a = t.apply(o, f), i || (o = f = null)
            }

            function n() {
                var n = Wn();
                c || !1 !== u.leading || (c = n);
                var r = e - (n - c);
                return o = this, f = arguments, r <= 0 || e < r ? (i && (clearTimeout(i), i = null), c = n, a = t.apply(o, f), i || (o = f = null)) : i || !1 === u.trailing || (i = setTimeout(l, r)), a
            }
            return u = u || {}, n.cancel = function() {
                clearTimeout(i), c = 0, i = o = f = null
            }, n
        },
        debounce: function(r, t, e) {
            var u, i, o, f, a, c = function() {
                    var n = Wn() - i;
                    n < t ? u = setTimeout(c, t - n) : (u = null, e || (f = r.apply(a, o)), u || (o = a = null))
                },
                n = j(function(n) {
                    return a = this, o = n, i = Wn(), u || (u = setTimeout(c, t), e && (f = r.apply(a, o))), f
                });
            return n.cancel = function() {
                clearTimeout(u), u = o = a = null
            }, n
        },
        wrap: function(n, r) {
            return nr(r, n)
        },
        negate: fr,
        compose: function() {
            var t = arguments,
                e = t.length - 1;
            return function() {
                for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
                return r
            }
        },
        after: function(n, r) {
            return function() {
                if (--n < 1) return r.apply(this, arguments)
            }
        },
        before: ar,
        once: r,
        findKey: cr,
        findIndex: sr,
        findLastIndex: k,
        sortedIndex: pr,
        indexOf: vr,
        lastIndexOf: T,
        find: yr,
        detect: yr,
        findWhere: function(n, r) {
            return yr(n, kn(r))
        },
        each: dr,
        forEach: dr,
        map: gr,
        collect: gr,
        reduce: f,
        foldl: f,
        inject: f,
        reduceRight: R,
        foldr: R,
        filter: mr,
        select: mr,
        reject: function(n, r, t) {
            return mr(n, fr(Pn(r)), t)
        },
        every: jr,
        all: jr,
        some: _r,
        any: _r,
        contains: wr,
        includes: wr,
        include: wr,
        invoke: P,
        pluck: Ar,
        where: function(n, r) {
            return mr(n, kn(r))
        },
        max: xr,
        min: function(n, e, r) {
            var t, u, i = 1 / 0,
                o = 1 / 0;
            if (null == e || "number" == typeof e && "object" != typeof n[0] && null != n)
                for (var f = 0, a = (n = tr(n) ? n : mn(n)).length; f < a; f++) null != (t = n[f]) && t < i && (i = t);
            else e = Pn(e, r), dr(n, function(n, r, t) {
                ((u = e(n, r, t)) < o || u === 1 / 0 && i === 1 / 0) && (i = n, o = u)
            });
            return i
        },
        shuffle: function(n) {
            return Sr(n, 1 / 0)
        },
        sample: Sr,
        sortBy: function(n, e, r) {
            var u = 0;
            return e = Pn(e, r), Ar(gr(n, function(n, r, t) {
                return {
                    value: n,
                    index: u++,
                    criteria: e(n, r, t)
                }
            }).sort(function(n, r) {
                var t = n.criteria,
                    e = r.criteria;
                if (t !== e) {
                    if (e < t || void 0 === t) return 1;
                    if (t < e || void 0 === e) return -1
                }
                return n.index - r.index
            }), "value")
        },
        groupBy: c,
        indexBy: i,
        countBy: sn,
        partition: ln,
        toArray: function(n) {
            return n ? U(n) ? a.call(n) : S(n) ? n.match(Mr) : tr(n) ? gr(n, Tn) : mn(n) : []
        },
        size: function(n) {
            return null == n ? 0 : (tr(n) ? n : nn(n)).length
        },
        pick: Br,
        omit: pn,
        first: Ir,
        head: Ir,
        take: Ir,
        initial: Nr,
        last: function(n, r, t) {
            return null == n || n.length < 1 ? null == r || t ? void 0 : [] : null == r || t ? n[n.length - 1] : Tr(n, Math.max(0, n.length - r))
        },
        rest: Tr,
        tail: Tr,
        drop: Tr,
        compact: function(n) {
            return mr(n, Boolean)
        },
        flatten: function(n, r) {
            return er(n, r, !1)
        },
        without: V,
        uniq: Dr,
        unique: Dr,
        union: vn,
        intersection: function(n) {
            for (var r = [], t = arguments.length, e = 0, u = Y(n); e < u; e++) {
                var i = n[e];
                if (!wr(r, i)) {
                    for (var o = 1; o < t && wr(arguments[o], i); o++);
                    o === t && r.push(i)
                }
            }
            return r
        },
        difference: kr,
        unzip: Rr,
        transpose: Rr,
        zip: Ln,
        object: function(n, r) {
            for (var t = {}, e = 0, u = Y(n); e < u; e++) r ? t[n[e]] = r[e] : t[n[e][0]] = n[e][1];
            return t
        },
        range: function(n, r, t) {
            null == r && (r = n || 0, n = 0), t = t || (r < n ? -1 : 1);
            for (var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0; i < e; i++, n += t) u[i] = n;
            return u
        },
        chunk: function(n, r) {
            if (null == r || r < 1) return [];
            for (var t = [], e = 0, u = n.length; e < u;) t.push(a.call(n, e, e += r));
            return t
        },
        mixin: Vr,
        default: tn
    });
    return Ln._ = Ln
});