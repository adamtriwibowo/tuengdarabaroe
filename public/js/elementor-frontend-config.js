"use strict";
        ! function(w, e) {
            w(e).on("elementor/frontend/init", function() {
                function e(e) {
                    var a, t, n, r, p, s, o, h, m, u, l, b, i, y, f, v, g, _, k, d, c;
                    e.hasClass("ha-particle-yes") && (a = e.data("id"), n = e.data("element_type"), void 0 !== (d = e.find(".ha-particle-wrapper").data("ha-partstyle")) ? ("column" == n ? (r = e.find(".elementor-column-wrap .elementor-background-overlay"), c = e.find(".ha-particle-wrapper"), 0 == r.next("#ha-particle-" + a).length && r.after(c)) : (t = e.find(".elementor-element-overlay ~ .elementor-background-overlay"), c = e.find("#ha-particle-" + a), 0 == t.next("#ha-particle-" + a).length && t.after(c)), t = e.find("#ha-particle-" + a)) : (d = e.data("ha-partstyle"), t = e, c = w('<div class="ha-particle-wrapper" id="ha-particle-' + a + '"></div>'), "column" == n ? 0 == e.find(".elementor-background-overlay").length ? e.prepend(c) : (r = e.find(".elementor-background-overlay")).after(c) : 0 == e.find(".elementor-background-overlay ~ .elementor-container").length ? e.prepend(c) : e.find(".elementor-background-overlay").after(c)), n = t.data("ha-partcolor"), r = t.data("ha-partdata"), c = t.data("ha-partopacity"), k = t.data("ha-partdirection"), "" !== r && "custom" == d ? particlesJS("ha-particle-" + a, r) : "custom" !== d && (r = 150, p = "circle", s = 5, o = .6, l = 4, i = 2, f = !(y = b = !(u = m = !(h = !0))), v = "repulse", _ = !(g = "none"), "default" == d ? (b = h = !(u = !0), l = 6) : "nasa" == d ? (r = 160, p = "circle", m = !0, l = o = 1, i = 3, v = "bubble") : "snow" == d ? (o = .5, i = 4, l = 3, g = k, h = !(r = 200)) : "flow" == d ? (r = 14, p = "polygon", s = 6, o = .3, l = 5, f = !(y = !(i = 40))) : "bubble" == d && (l = 5, g = "top", r = 500, y = !(i = 1), h = !(o = .6)), "" == n && (n = "#bdbdbd"), "" == c && "0" != c || (o = c), e.hasClass("ha-particle-adv-yes") && ("" != (k = t.data("ha-partnum")) && (r = k), "" !== (d = t.data("ha-partsize")) && (i = d), "" !== (c = t.data("ha-partspeed")) && (l = c), "yes" == t.data("ha-interactive") && (_ = !0)), particlesJS("ha-particle-" + a, {
                        particles: {
                            number: {
                                value: r,
                                density: {
                                    enable: !0,
                                    value_area: 800
                                }
                            },
                            color: {
                                value: n
                            },
                            shape: {
                                type: p,
                                stroke: {
                                    width: 0,
                                    color: "#ffffff"
                                },
                                polygon: {
                                    nb_sides: s
                                }
                            },
                            opacity: {
                                value: o,
                                random: h,
                                anim: {
                                    enable: m,
                                    speed: 1,
                                    opacity_min: .1,
                                    sync: !1
                                }
                            },
                            size: {
                                value: i,
                                random: y,
                                anim: {
                                    enable: f,
                                    speed: 5,
                                    size_min: 35,
                                    sync: !1
                                }
                            },
                            line_linked: {
                                enable: u,
                                distance: 150,
                                color: n,
                                opacity: .4,
                                width: 1
                            },
                            move: {
                                enable: !0,
                                speed: l,
                                direction: g,
                                random: b,
                                straight: !1,
                                out_mode: "out",
                                attract: {
                                    enable: !1,
                                    rotateX: 600,
                                    rotateY: 1200
                                }
                            }
                        },
                        interactivity: {
                            detect_on: "canvas",
                            events: {
                                onhover: {
                                    enable: _,
                                    mode: v
                                },
                                onclick: {
                                    enable: !1,
                                    mode: "push"
                                },
                                resize: !0
                            },
                            modes: {
                                grab: {
                                    distance: 400,
                                    line_linked: {
                                        opacity: 1
                                    }
                                },
                                bubble: {
                                    distance: 200,
                                    size: 0,
                                    duration: 2,
                                    opacity: 0,
                                    speed: 2
                                },
                                repulse: {
                                    distance: 150
                                },
                                push: {
                                    particles_nb: 4
                                },
                                remove: {
                                    particles_nb: 2
                                }
                            }
                        },
                        retina_detect: !0
                    })))
                }
                elementorFrontend.hooks.addAction("frontend/element_ready/section", e), elementorFrontend.hooks.addAction("frontend/element_ready/column", e)
            })
        }(jQuery, window);
        "use strict";;
        (function($) {
            var $window = $(window),
                debounce = function debounce(func, wait, immediate) {
                    var timeout;
                    return function() {
                        var context = this,
                            args = arguments;
                        var later = function later() {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                };
            $window.on('elementor/frontend/init', function() {
                var ModuleHandler = elementorModules.frontend.handlers.Base,
                    FloatingFxHandler;
                FloatingFxHandler = ModuleHandler.extend({
                    bindEvents: function bindEvents() {
                        this.run();
                    },
                    getDefaultSettings: function getDefaultSettings() {
                        return {
                            direction: 'alternate',
                            easing: 'easeInOutSine',
                            loop: true,
                            targets: this.findElement('.elementor-widget-container').get(0)
                        };
                    },
                    onElementChange: debounce(function(prop) {
                        if (prop.indexOf('ha_floating') !== -1) {
                            this.anime && this.anime.restart();
                            this.run();
                        }
                    }, 400),
                    getFxVal: function getFxVal(key) {
                        return this.getElementSettings('ha_floating_fx_' + key);
                    },
                    run: function run() {
                        var config = this.getDefaultSettings();
                        if (this.getFxVal('translate_toggle')) {
                            if (this.getFxVal('translate_x.size') || this.getFxVal('translate_x.sizes.to')) {
                                config.translateX = {
                                    value: [this.getFxVal('translate_x.sizes.from') || 0, this.getFxVal('translate_x.size') || this.getFxVal('translate_x.sizes.to')],
                                    duration: this.getFxVal('translate_duration.size'),
                                    delay: this.getFxVal('translate_delay.size') || 0
                                };
                            }
                            if (this.getFxVal('translate_y.size') || this.getFxVal('translate_y.sizes.to')) {
                                config.translateY = {
                                    value: [this.getFxVal('translate_y.sizes.from') || 0, this.getFxVal('translate_y.size') || this.getFxVal('translate_y.sizes.to')],
                                    duration: this.getFxVal('translate_duration.size'),
                                    delay: this.getFxVal('translate_delay.size') || 0
                                };
                            }
                        }
                        if (this.getFxVal('rotate_toggle')) {
                            if (this.getFxVal('rotate_x.size') || this.getFxVal('rotate_x.sizes.to')) {
                                config.rotateX = {
                                    value: [this.getFxVal('rotate_x.sizes.from') || 0, this.getFxVal('rotate_x.size') || this.getFxVal('rotate_x.sizes.to')],
                                    duration: this.getFxVal('rotate_duration.size'),
                                    delay: this.getFxVal('rotate_delay.size') || 0
                                };
                            }
                            if (this.getFxVal('rotate_y.size') || this.getFxVal('rotate_y.sizes.to')) {
                                config.rotateY = {
                                    value: [this.getFxVal('rotate_y.sizes.from') || 0, this.getFxVal('rotate_y.size') || this.getFxVal('rotate_y.sizes.to')],
                                    duration: this.getFxVal('rotate_duration.size'),
                                    delay: this.getFxVal('rotate_delay.size') || 0
                                };
                            }
                            if (this.getFxVal('rotate_z.size') || this.getFxVal('rotate_z.sizes.to')) {
                                config.rotateZ = {
                                    value: [this.getFxVal('rotate_z.sizes.from') || 0, this.getFxVal('rotate_z.size') || this.getFxVal('rotate_z.sizes.to')],
                                    duration: this.getFxVal('rotate_duration.size'),
                                    delay: this.getFxVal('rotate_delay.size') || 0
                                };
                            }
                        }
                        if (this.getFxVal('scale_toggle')) {
                            if (this.getFxVal('scale_x.size') || this.getFxVal('scale_x.sizes.to')) {
                                config.scaleX = {
                                    value: [this.getFxVal('scale_x.sizes.from') || 0, this.getFxVal('scale_x.size') || this.getFxVal('scale_x.sizes.to')],
                                    duration: this.getFxVal('scale_duration.size'),
                                    delay: this.getFxVal('scale_delay.size') || 0
                                };
                            }
                            if (this.getFxVal('scale_y.size') || this.getFxVal('scale_y.sizes.to')) {
                                config.scaleY = {
                                    value: [this.getFxVal('scale_y.sizes.from') || 0, this.getFxVal('scale_y.size') || this.getFxVal('scale_y.sizes.to')],
                                    duration: this.getFxVal('scale_duration.size'),
                                    delay: this.getFxVal('scale_delay.size') || 0
                                };
                            }
                        }
                        if (this.getFxVal('translate_toggle') || this.getFxVal('rotate_toggle') || this.getFxVal('scale_toggle')) {
                            this.findElement('.elementor-widget-container').css('will-change', 'transform');
                            this.anime = window.anime && window.anime(config);
                        }
                    }
                });
                elementorFrontend.hooks.addAction('frontend/element_ready/widget', function($scope) {
                    elementorFrontend.elementsHandler.addHandler(FloatingFxHandler, {
                        $element: $scope
                    });
                });
            });
        })(jQuery);