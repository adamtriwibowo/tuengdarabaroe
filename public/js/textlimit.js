! function a(r, o, d) {
    function l(n, t) {
        if (!o[n]) {
            if (!r[n]) {
                var e = "function" == typeof require && require;
                if (!t && e) return e(n, !0);
                if (s) return s(n, !0);
                throw new Error("Cannot find module '" + n + "'")
            }
            var i = o[n] = {
                exports: {}
            };
            r[n][0].call(i.exports, function(t) {
                var e = r[n][1][t];
                return l(e || t)
            }, i, i.exports, a, r, o, d)
        }
        return o[n].exports
    }
    for (var s = "function" == typeof require && require, t = 0; t < d.length; t++) l(d[t]);
    return l
}({
    1: [function(t, e, n) {
        "use strict";

        function o(t, e, n) {
            return t.replace("{count}", e).replace("{limit}", n)
        }

        function d(t, e, n) {
            var i = document.createElement("div");
            return i.classList.add("wpforms-field-limit-text"), i.id = "wpforms-field-limit-text-" + t + "-" + e, i.textContent = n, i
        }

        function l(e) {
            return "string" != typeof e ? 0 : e.length ? ([/([A-Z]+),([A-Z]+)/gi, /([0-9]+),([A-Z]+)/gi, /([A-Z]+),([0-9]+)/gi].forEach(function(t) {
                e = e.replace(t, "$1, $2")
            }), e.split(/\s+/).length) : 0
        }

        function s(i) {
            return function(t) {
                t.preventDefault();
                var e, n = (e = t, window.clipboardData && window.clipboardData.getData ? window.clipboardData.getData("Text") : e.clipboardData && e.clipboardData.getData ? e.clipboardData.getData("text/plain") : void 0).trim().split(/\s+/);
                n.splice(i, n.length), this.value = n.join(" ")
            }
        }

        function i(t) {
            return [].slice.call(t)
        }

        function a() {
            i(document.querySelectorAll(".wpforms-limit-characters-enabled")).map(function(t) {
                var e = parseInt(t.dataset.textLimit, 10) || 0;
                t.value = t.value.slice(0, e);
                var n, i, a = d(t.dataset.formId, t.dataset.fieldId, o(window.wpforms_settings.val_limit_characters, t.value.length, e)),
                    r = (n = a, i = e, function(t) {
                        n.textContent = o(window.wpforms_settings.val_limit_characters, this.value.length, i)
                    });
                t.parentNode.appendChild(a), t.addEventListener("keydown", r), t.addEventListener("keyup", r)
            }), i(document.querySelectorAll(".wpforms-limit-words-enabled")).map(function(t) {
                var e = parseInt(t.dataset.textLimit, 10) || 0;
                t.value = t.value.trim().split(/\s+/).slice(0, e).join(" ");
                var n, i, a = d(t.dataset.formId, t.dataset.fieldId, o(window.wpforms_settings.val_limit_words, l(t.value.trim()), e)),
                    r = (n = a, i = e, function(t) {
                        var e = l(this.value.trim());
                        n.textContent = o(window.wpforms_settings.val_limit_words, e, i), (32 === t.keyCode || 188 === t.keyCode) && i <= e && t.preventDefault()
                    });
                t.parentNode.appendChild(a), t.addEventListener("keydown", r), t.addEventListener("keyup", r), t.addEventListener("paste", s(e))
            })
        }
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", a) : a()
    }, {}]
}, {}, [1]);