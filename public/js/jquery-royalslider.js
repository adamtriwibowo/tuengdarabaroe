// jQuery RoyalSlider plugin. (c) Dmitry Semenov http://dimsemenov.com
// jquery.royalslider v9.5.9
(function(l) {
    function v(b, e) {
        var d, a = this,
            c = window.navigator,
            g = c.userAgent.toLowerCase();
        a.uid = l.rsModules.uid++;
        a.ns = ".rs" + a.uid;
        var f = document.createElement("div").style,
            h = ["webkit", "Moz", "ms", "O"],
            k = "",
            m = 0;
        for (d = 0; d < h.length; d++) {
            var p = h[d];
            !k && p + "Transform" in f && (k = p);
            p = p.toLowerCase();
            window.requestAnimationFrame || (window.requestAnimationFrame = window[p + "RequestAnimationFrame"], window.cancelAnimationFrame = window[p + "CancelAnimationFrame"] || window[p + "CancelRequestAnimationFrame"])
        }
        window.requestAnimationFrame ||
            (window.requestAnimationFrame = function(a, b) {
                var c = (new Date).getTime(),
                    d = Math.max(0, 16 - (c - m)),
                    f = window.setTimeout(function() {
                        a(c + d)
                    }, d);
                m = c + d;
                return f
            });
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        });
        a.isIPAD = g.match(/(ipad)/);
        a.isIOS = a.isIPAD || g.match(/(iphone|ipod)/);
        d = function(a) {
            a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: a[1] || "",
                version: a[2] || "0"
            }
        }(g);
        h = {};
        d.browser && (h[d.browser] = !0, h.version = d.version);
        h.chrome && (h.webkit = !0);
        a._browser = h;
        a.isAndroid = -1 < g.indexOf("android");
        a.slider = l(b);
        a.ev = l(a);
        a._doc = l(document);
        a.st = l.extend({}, l.fn.royalSlider.defaults, e);
        a._currAnimSpeed = a.st.transitionSpeed;
        a._minPosOffset = 0;
        !a.st.allowCSS3 || h.webkit && !a.st.allowCSS3OnWebkit || (d = k + (k ? "T" : "t"), a._useCSS3Transitions = d + "ransform" in f && d + "ransition" in f, a._useCSS3Transitions && (a._use3dTransform = k + (k ? "P" : "p") +
            "erspective" in f));
        k = k.toLowerCase();
        a._vendorPref = "-" + k + "-";
        a._slidesHorizontal = "vertical" === a.st.slidesOrientation ? !1 : !0;
        a._reorderProp = a._slidesHorizontal ? "left" : "top";
        a._sizeProp = a._slidesHorizontal ? "width" : "height";
        a._prevNavItemId = -1;
        a._isMove = "fade" === a.st.transitionType ? !1 : !0;
        a._isMove || (a.st.sliderDrag = !1, a._fadeZIndex = 10);
        a._opacityCSS = "z-index:0; display:none; opacity:0;";
        a._newSlideId = 0;
        a._sPosition = 0;
        a._nextSlidePos = 0;
        l.each(l.rsModules, function(b, c) {
            "uid" !== b && c.call(a)
        });
        a.slides = [];
        a._idCount = 0;
        (a.st.slides ? l(a.st.slides) : a.slider.children().detach()).each(function() {
            a._parseNode(this, !0)
        });
        a.st.randomizeSlides && a.slides.sort(function() {
            return .5 - Math.random()
        });
        a.numSlides = a.slides.length;
        a._refreshNumPreloadImages();
        a.st.startSlideId ? a.st.startSlideId > a.numSlides - 1 && (a.st.startSlideId = a.numSlides - 1) : a.st.startSlideId = 0;
        a._newSlideId = a.staticSlideId = a.currSlideId = a._realId = a.st.startSlideId;
        a.currSlide = a.slides[a.currSlideId];
        a._accelerationPos = 0;
        a.pointerMultitouch = !1;
        a.slider.addClass((a._slidesHorizontal ?
            "rsHor" : "rsVer") + (a._isMove ? "" : " rsFade"));
        f = '<div class="rsOverflow"><div class="rsContainer">';
        a.slidesSpacing = a.st.slidesSpacing;
        a._slideSize = (a._slidesHorizontal ? a.slider.width() : a.slider.height()) + a.st.slidesSpacing;
        a._preload = 0 < a._numPreloadImages;
        1 >= a.numSlides && (a._loop = !1);
        a._loopHelpers = a._loop && a._isMove ? 2 === a.numSlides ? 1 : 2 : 0;
        a._maxImages = 6 > a.numSlides ? a.numSlides : 6;
        a._currBlockIndex = 0;
        a._idOffset = 0;
        a.slidesJQ = [];
        for (d = 0; d < a.numSlides; d++) a.slidesJQ.push(l('<div style="' + (a._isMove ? "" :
            d !== a.currSlideId ? a._opacityCSS : "z-index:0;") + '" class="rsSlide "></div>'));
        a._sliderOverflow = f = l(f + "</div></div>");
        k = function(b, c, d, f, e) {
            a._downEvent = b + c;
            a._moveEvent = b + d;
            a._upEvent = b + f;
            e && (a._cancelEvent = b + e)
        };
        d = c.pointerEnabled;
        a.pointerEnabled = d || c.msPointerEnabled;
        a.pointerEnabled ? (a.hasTouch = !1, a._lastItemFriction = .2, a.pointerMultitouch = 1 < c[(d ? "m" : "msM") + "axTouchPoints"], d ? k("pointer", "down", "move", "up", "cancel") : k("MSPointer", "Down", "Move", "Up", "Cancel")) : (a.isIOS ? a._downEvent = a._moveEvent =
            a._upEvent = a._cancelEvent = "" : k("mouse", "down", "move", "up"), "ontouchstart" in window || "createTouch" in document ? (a.hasTouch = !0, a._downEvent += " touchstart", a._moveEvent += " touchmove", a._upEvent += " touchend", a._cancelEvent += " touchcancel", a._lastItemFriction = .5, a.st.sliderTouch && (a._hasDrag = !0)) : (a.hasTouch = !1, a._lastItemFriction = .2));
        a.st.sliderDrag && (a._hasDrag = !0, h.msie || h.opera ? a._grabCursor = a._grabbingCursor = "move" : h.mozilla ? (a._grabCursor = "-moz-grab", a._grabbingCursor = "-moz-grabbing") : h.webkit &&
            -1 != c.platform.indexOf("Mac") && (a._grabCursor = "-webkit-grab", a._grabbingCursor = "-webkit-grabbing"), a._setGrabCursor());
        a.slider.html(f);
        a._controlsContainer = a.st.controlsInside ? a._sliderOverflow : a.slider;
        a._slidesContainer = a._sliderOverflow.children(".rsContainer");
        a.pointerEnabled && a._slidesContainer.css((d ? "" : "-ms-") + "touch-action", a._slidesHorizontal ? "pan-y" : "pan-x");
        a._preloader = l('<div class="rsPreloader"></div>');
        c = a._slidesContainer.children(".rsSlide");
        a._currHolder = a.slidesJQ[a.currSlideId];
        a._selectedSlideHolder = 0;
        a._eventCallbacks = {
            dragStart: function(b) {
                a._onDragStart(b)
            },
            dragStartThumb: function(b) {
                a._onDragStart(b, !0)
            },
            touchmoveFix: function() {}
        };
        a._useCSS3Transitions ? (a._TP = "transition-property", a._TD = "transition-duration", a._TTF = "transition-timing-function", a._yProp = a._xProp = a._vendorPref + "transform", a._use3dTransform ? (h.webkit && !h.chrome && a.slider.addClass("rsWebkit3d"), a._tPref1 = "translate3d(", a._tPref2 = "px, ", a._tPref3 = "px, 0px)") : (a._tPref1 = "translate(", a._tPref2 = "px, ", a._tPref3 =
            "px)"), a._isMove ? a._slidesContainer[a._vendorPref + a._TP] = a._vendorPref + "transform" : (h = {}, h[a._vendorPref + a._TP] = "opacity", h[a._vendorPref + a._TD] = a.st.transitionSpeed + "ms", h[a._vendorPref + a._TTF] = a.st.css3easeInOut, c.css(h))) : (a._xProp = "left", a._yProp = "top");
        a._slidesHorizontal && a.slider.css("touch-action", "pan-y");
        var n;
        l(window).on("resize" + a.ns, function() {
            n && clearTimeout(n);
            n = setTimeout(function() {
                a.updateSliderSize()
            }, 50)
        });
        a.ev.trigger("rsAfterPropsSetup");
        a.updateSliderSize();
        a.st.keyboardNavEnabled &&
            a._bindKeyboardNav();
        a.st.arrowsNavHideOnTouch && (a.hasTouch || a.pointerMultitouch) && (a.st.arrowsNav = !1);
        a.st.arrowsNav && (c = a._controlsContainer, l('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(c), a._arrowLeft = c.children(".rsArrowLeft").click(function(b) {
                b.preventDefault();
                a.prev()
            }), a._arrowRight = c.children(".rsArrowRight").click(function(b) {
                b.preventDefault();
                a.next()
            }), a.st.arrowsNavAutoHide &&
            !a.hasTouch && (a._arrowLeft.addClass("rsHidden"), a._arrowRight.addClass("rsHidden"), c.one("mousemove.arrowshover", function() {
                a._arrowLeft.removeClass("rsHidden");
                a._arrowRight.removeClass("rsHidden")
            }), c.hover(function() {
                a._arrowsAutoHideLocked || (a._arrowLeft.removeClass("rsHidden"), a._arrowRight.removeClass("rsHidden"))
            }, function() {
                a._arrowsAutoHideLocked || (a._arrowLeft.addClass("rsHidden"), a._arrowRight.addClass("rsHidden"))
            })), a.ev.on("rsOnUpdateNav", function() {
                a._updateArrowsNav()
            }), a._updateArrowsNav());
        a.hasTouch && a.st.sliderTouch || !a.hasTouch && a.st.sliderDrag ? (a._bindPassiveEvent(a._slidesContainer[0], a._downEvent, a._eventCallbacks.dragStart, !1), a._bindPassiveEvent(a.slider[0], a._moveEvent, a._eventCallbacks.touchmoveFix, !1)) : a.dragSuccess = !1;
        var r = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];
        a._slidesContainer.click(function(b) {
            if (!a.dragSuccess) {
                var c = l(b.target).attr("class");
                if (-1 !== l.inArray(c, r) && a.toggleVideo()) return !1;
                if (a.st.navigateByClick && !a._blockActions) {
                    if (l(b.target).closest(".rsNoDrag",
                            a._currHolder).length) return !0;
                    a._mouseNext(b)
                }
                a.ev.trigger("rsSlideClick", b)
            }
        }).on("click.rs", "a", function(b) {
            if (a.dragSuccess) return !1;
            a._blockActions = !0;
            setTimeout(function() {
                a._blockActions = !1
            }, 3)
        });
        a.ev.trigger("rsAfterInit")
    }
    l.rsModules || (l.rsModules = {
        uid: 0
    });
    v.prototype = {
        constructor: v,
        _mouseNext: function(b) {
            b = b[this._slidesHorizontal ? "pageX" : "pageY"] - this._sliderOffset;
            b >= this._nextSlidePos ? this.next() : 0 > b && this.prev()
        },
        _refreshNumPreloadImages: function() {
            var b = this.st.numImagesToPreload;
            if (this._loop =
                this.st.loop) 2 === this.numSlides ? (this._loop = !1, this.st.loopRewind = !0) : 2 > this.numSlides && (this.st.loopRewind = this._loop = !1);
            this._loop && 0 < b && (4 >= this.numSlides ? b = 1 : this.st.numImagesToPreload > (this.numSlides - 1) / 2 && (b = Math.floor((this.numSlides - 1) / 2)));
            this._numPreloadImages = b
        },
        _parseNode: function(b, e) {
            function d(b, d) {
                d ? c.images.push(b.attr(d)) : c.images.push(b.text());
                if (g) {
                    g = !1;
                    c.caption = "src" === d ? b.attr("alt") : b.contents();
                    c.image = c.images[0];
                    c.videoURL = b.attr("data-rsVideo");
                    var f = b.attr("data-rsw"),
                        e = b.attr("data-rsh");
                    "undefined" !== typeof f && !1 !== f && "undefined" !== typeof e && !1 !== e ? (c.iW = parseInt(f, 10), c.iH = parseInt(e, 10)) : a.st.imgWidth && a.st.imgHeight && (c.iW = a.st.imgWidth, c.iH = a.st.imgHeight)
                }
            }
            var a = this,
                c = {},
                g = !0;
            b = l(b);
            a._currContent = b;
            a.ev.trigger("rsBeforeParseNode", [b, c]);
            if (!c.stopParsing) {
                b = a._currContent;
                c.id = a._idCount;
                c.contentAdded = !1;
                a._idCount++;
                c.images = [];
                c.isBig = !1;
                if (!c.hasCover) {
                    if (b.hasClass("rsImg")) {
                        var f = b;
                        var h = !0
                    } else f = b.find(".rsImg"), f.length && (h = !0);
                    h ? (c.bigImage =
                        f.eq(0).attr("data-rsBigImg"), f.each(function() {
                            var a = l(this);
                            a.is("a") ? d(a, "href") : a.is("img") ? d(a, "src") : d(a)
                        })) : b.is("img") && (b.addClass("rsImg rsMainSlideImage"), d(b, "src"))
                }
                f = b.find(".rsCaption");
                f.length && (c.caption = f.remove());
                c.content = b;
                a.ev.trigger("rsAfterParseNode", [b, c]);
                e && a.slides.push(c);
                0 === c.images.length && (c.isLoaded = !0, c.isRendered = !1, c.isLoading = !1, c.images = null);
                return c
            }
        },
        _bindKeyboardNav: function() {
            var b = this,
                e, d, a = function(a) {
                    37 === a ? b.prev() : 39 === a && b.next()
                };
            b._doc.on("keydown" +
                b.ns,
                function(c) {
                    if (!b.st.keyboardNavEnabled) return !0;
                    if (!(b._isDragging || (d = c.keyCode, 37 !== d && 39 !== d || e))) {
                        if (document.activeElement && /(INPUT|SELECT|TEXTAREA)/i.test(document.activeElement.tagName)) return !0;
                        b.isFullscreen && c.preventDefault();
                        a(d);
                        e = setInterval(function() {
                            a(d)
                        }, 700)
                    }
                }).on("keyup" + b.ns, function(a) {
                e && (clearInterval(e), e = null)
            })
        },
        goTo: function(b, e) {
            b !== this.currSlideId && this._moveTo(b, this.st.transitionSpeed, !0, !e)
        },
        destroy: function(b) {
            this.ev.trigger("rsBeforeDestroy");
            this._doc.off("keydown" +
                this.ns + " keyup" + this.ns);
            this._eventCallbacks.dragMove && (this._unbindPassiveEvent(document, this._moveEvent, this._eventCallbacks.dragMove, !0), this._unbindPassiveEvent(document, this._upEvent, this._eventCallbacks.dragRelease, !0));
            this._eventCallbacks.downEvent && (this._unbindPassiveEvent(this._slidesContainer[0], this._downEvent, this._eventCallbacks.dragStart, !1), this._unbindPassiveEvent(this.slider[0], this._moveEvent, this._eventCallbacks.touchmoveFix, !1));
            this._slidesContainer.off(this._downEvent + " click");
            this.slider.data("royalSlider", null);
            l.removeData(this.slider, "royalSlider");
            l(window).off("resize" + this.ns);
            this.loadingTimeout && clearTimeout(this.loadingTimeout);
            b && this.slider.remove();
            this.ev = this.slider = this.slides = null
        },
        _updateBlocksContent: function(b, e) {
            function d(d, e, g) {
                d.isAdded ? (a(e, d), c(e, d)) : (g || (g = f.slidesJQ[e]), d.holder ? g = d.holder : (g = f.slidesJQ[e] = l(g), d.holder = g), d.appendOnLoaded = !1, c(e, d, g), a(e, d), f._addBlockToContainer(d, g, b), d.isAdded = !0)
            }

            function a(a, c) {
                c.contentAdded || (f.setItemHtml(c,
                    b), b || (c.contentAdded = !0))
            }

            function c(a, b, c) {
                f._isMove && (c || (c = f.slidesJQ[a]), c.css(f._reorderProp, (a + f._idOffset + x) * f._slideSize))
            }

            function g(a) {
                if (m) {
                    if (a > p - 1) return g(a - p);
                    if (0 > a) return g(p + a)
                }
                return a
            }
            var f = this,
                h, k, m = f._loop,
                p = f.numSlides;
            if (!isNaN(e)) return g(e);
            var n = f.currSlideId,
                r = b ? Math.abs(f._prevSlideId - f.currSlideId) >= f.numSlides - 1 ? 0 : 1 : f._numPreloadImages,
                t = Math.min(2, r),
                w = !1,
                u = !1;
            for (k = n; k < n + 1 + t; k++) {
                var q = g(k);
                if ((h = f.slides[q]) && (!h.isAdded || !h.positionSet)) {
                    w = !0;
                    break
                }
            }
            for (k = n - 1; k >
                n - 1 - t; k--)
                if (q = g(k), (h = f.slides[q]) && (!h.isAdded || !h.positionSet)) {
                    u = !0;
                    break
                } if (w)
                for (k = n; k < n + r + 1; k++) {
                    q = g(k);
                    var x = Math.floor((f._realId - (n - k)) / f.numSlides) * f.numSlides;
                    (h = f.slides[q]) && d(h, q)
                }
            if (u)
                for (k = n - 1; k > n - 1 - r; k--) q = g(k), x = Math.floor((f._realId - (n - k)) / p) * p, (h = f.slides[q]) && d(h, q);
            if (!b)
                for (t = g(n - r), n = g(n + r), r = t > n ? 0 : t, k = 0; k < p; k++) t > n && k > t - 1 || !(k < r || k > n) || (h = f.slides[k]) && h.holder && (h.holder.detach(), h.isAdded = !1)
        },
        setItemHtml: function(b, e) {
            var d = this,
                a = function() {
                    if (!b.images) b.isRendered = !0, b.isLoaded = !0, b.isLoading = !1, f(!0);
                    else if (!b.isLoading) {
                        if (b.content.hasClass("rsImg")) {
                            var a = b.content;
                            var e = !0
                        } else a = b.content.find(".rsImg:not(img)");
                        a && !a.is("img") && a.each(function() {
                            var a = l(this),
                                c = '<img class="rsImg" src="' + (a.is("a") ? a.attr("href") : a.text()) + '" />';
                            e ? b.content = l(c) : a.replaceWith(c)
                        });
                        a = e ? b.content : b.content.find("img.rsImg");
                        k();
                        a.eq(0).addClass("rsMainSlideImage");
                        b.iW && b.iH && (b.isLoaded || d._resizeImage(b), f());
                        b.isLoading = !0;
                        if (b.isBig) l("<img />").on("load.rs error.rs",
                            function(a) {
                                l(this).off("load.rs error.rs");
                                c([this], !0)
                            }).attr("src", b.image);
                        else {
                            b.loaded = [];
                            b.numStartedLoad = 0;
                            a = function(a) {
                                l(this).off("load.rs error.rs");
                                b.loaded.push(this);
                                b.loaded.length === b.numStartedLoad && c(b.loaded, !1)
                            };
                            for (var g = 0; g < b.images.length; g++) {
                                var h = l("<img />");
                                b.numStartedLoad++;
                                h.on("load.rs error.rs", a).attr("src", b.images[g])
                            }
                        }
                    }
                },
                c = function(a, c) {
                    if (a.length) {
                        var d = a[0];
                        if (c !== b.isBig)(d = b.holder.children()) && 1 < d.length && m();
                        else if (b.iW && b.iH) g();
                        else if (b.iW = d.width,
                            b.iH = d.height, b.iW && b.iH) g();
                        else {
                            var e = new Image;
                            e.onload = function() {
                                e.width ? (b.iW = e.width, b.iH = e.height, g()) : setTimeout(function() {
                                    e.width && (b.iW = e.width, b.iH = e.height);
                                    g()
                                }, 1E3)
                            };
                            e.src = d.src
                        }
                    } else g()
                },
                g = function() {
                    b.isLoaded = !0;
                    b.isLoading = !1;
                    f();
                    m();
                    h()
                },
                f = function() {
                    if (!b.isAppended && d.ev) {
                        var a = d.st.visibleNearby,
                            c = b.id - d._newSlideId;
                        e || b.appendOnLoaded || !d.st.fadeinLoadedSlide || 0 !== c && (!(a || d._isAnimating || d._isDragging) || -1 !== c && 1 !== c) || (a = {
                            visibility: "visible",
                            opacity: 0
                        }, a[d._vendorPref +
                            "transition"] = "opacity 400ms ease-in-out", b.content.css(a), setTimeout(function() {
                            b.content.css("opacity", 1)
                        }, 16));
                        b.holder.find(".rsPreloader").length ? b.holder.append(b.content) : b.holder.html(b.content);
                        b.isAppended = !0;
                        b.isLoaded && (d._resizeImage(b), h());
                        b.sizeReady || (b.sizeReady = !0, setTimeout(function() {
                            d.ev.trigger("rsMaybeSizeReady", b)
                        }, 100))
                    }
                },
                h = function() {
                    !b.loadedTriggered && d.ev && (b.isLoaded = b.loadedTriggered = !0, b.holder.trigger("rsAfterContentSet"), d.ev.trigger("rsAfterContentSet", b))
                },
                k = function() {
                    d.st.usePreloader &&
                        b.holder.html(d._preloader.clone())
                },
                m = function(a) {
                    d.st.usePreloader && (a = b.holder.find(".rsPreloader"), a.length && a.remove())
                };
            b.isLoaded ? f() : e ? !d._isMove && b.images && b.iW && b.iH ? a() : (b.holder.isWaiting = !0, k(), b.holder.slideId = -99) : a()
        },
        _addBlockToContainer: function(b, e, d) {
            this._slidesContainer.append(b.holder);
            b.appendOnLoaded = !1
        },
        _onDragStart: function(b, e) {
            var d = this,
                a = "touchstart" === b.type;
            d._isTouchGesture = a;
            d.ev.trigger("rsDragStart");
            if (l(b.target).closest(".rsNoDrag", d._currHolder).length) return d.dragSuccess = !1, !0;
            !e && d._isAnimating && (d._wasAnimating = !0, d._stopAnimation());
            d.dragSuccess = !1;
            if (d._isDragging) a && (d._multipleTouches = !0);
            else {
                a && (d._multipleTouches = !1);
                d._setGrabbingCursor();
                if (a) {
                    var c = b.touches;
                    if (c && 0 < c.length) {
                        var g = c[0];
                        1 < c.length && (d._multipleTouches = !0)
                    } else return
                } else b.preventDefault(), g = b;
                d._isDragging = !0;
                d._eventCallbacks.dragMove && (d._unbindPassiveEvent(document, d._moveEvent, d._eventCallbacks.dragMove, !0), d._unbindPassiveEvent(document, d._upEvent, d._eventCallbacks.dragRelease,
                    !0));
                d._eventCallbacks.dragMove = function(a) {
                    d._onDragMove(a, e)
                };
                d._eventCallbacks.dragRelease = function(a) {
                    d._onDragRelease(a, e)
                };
                d._bindPassiveEvent(document, d._moveEvent, d._eventCallbacks.dragMove, !0);
                d._bindPassiveEvent(document, d._upEvent, d._eventCallbacks.dragRelease, !0);
                d._currMoveAxis = "";
                d._hasMoved = !1;
                d._pageX = g.pageX;
                d._pageY = g.pageY;
                d._startPagePos = d._accelerationPos = (e ? d._thumbsHorizontal : d._slidesHorizontal) ? g.pageX : g.pageY;
                d._horDir = 0;
                d._verDir = 0;
                d._currRenderPosition = e ? d._thumbsPosition :
                    d._sPosition;
                d._startTime = (new Date).getTime();
                if (a) d._sliderOverflow.on(d._cancelEvent, function(a) {
                    d._onDragRelease(a, e)
                })
            }
        },
        _renderMovement: function(b, e) {
            if (this._checkedAxis) {
                var d = this._renderMoveTime,
                    a = b.pageX - this._pageX,
                    c = b.pageY - this._pageY,
                    g = this._currRenderPosition + a,
                    f = this._currRenderPosition + c,
                    h = e ? this._thumbsHorizontal : this._slidesHorizontal;
                g = h ? g : f;
                f = this._currMoveAxis;
                this._hasMoved = !0;
                this._pageX = b.pageX;
                this._pageY = b.pageY;
                "x" === f && 0 !== a ? this._horDir = 0 < a ? 1 : -1 : "y" === f && 0 !== c && (this._verDir =
                    0 < c ? 1 : -1);
                f = h ? this._pageX : this._pageY;
                a = h ? a : c;
                e ? g > this._thumbsMinPosition ? g = this._currRenderPosition + a * this._lastItemFriction : g < this._thumbsMaxPosition && (g = this._currRenderPosition + a * this._lastItemFriction) : this._loop || (0 >= this.currSlideId && 0 < f - this._startPagePos && (g = this._currRenderPosition + a * this._lastItemFriction), this.currSlideId >= this.numSlides - 1 && 0 > f - this._startPagePos && (g = this._currRenderPosition + a * this._lastItemFriction));
                this._currRenderPosition = g;
                200 < d - this._startTime && (this._startTime =
                    d, this._accelerationPos = f);
                e ? this._setThumbsPosition(this._currRenderPosition) : this._isMove && this._setPosition(this._currRenderPosition)
            }
        },
        _onDragMove: function(b, e) {
            var d = this,
                a = "touchmove" === b.type;
            if (!d._isTouchGesture || a) {
                if (a) {
                    if (d._lockAxis) return;
                    var c = b.touches;
                    if (c) {
                        if (1 < c.length) return;
                        var g = c[0]
                    } else return
                } else g = b;
                d._hasMoved || (d._useCSS3Transitions && (e ? d._thumbsContainer : d._slidesContainer).css(d._vendorPref + d._TD, "0s"), function h() {
                    d._isDragging && (d._animFrame = requestAnimationFrame(h),
                        d._renderMoveEvent && d._renderMovement(d._renderMoveEvent, e))
                }());
                if (d._checkedAxis) b.preventDefault(), d._renderMoveTime = (new Date).getTime(), d._renderMoveEvent = g;
                else if (c = e ? d._thumbsHorizontal : d._slidesHorizontal, g = Math.abs(g.pageX - d._pageX) - Math.abs(g.pageY - d._pageY) - (c ? -7 : 7), 7 < g) {
                    if (c) b.preventDefault(), d._currMoveAxis = "x";
                    else if (a) {
                        d._completeGesture(b);
                        return
                    }
                    d._checkedAxis = !0
                } else if (-7 > g) {
                    if (!c) b.preventDefault(), d._currMoveAxis = "y";
                    else if (a) {
                        d._completeGesture(b);
                        return
                    }
                    d._checkedAxis = !0
                }
            }
        },
        _completeGesture: function(b, e) {
            this._lockAxis = !0;
            this._hasMoved = this._isDragging = !1;
            this._onDragRelease(b)
        },
        _onDragRelease: function(b, e) {
            function d(a) {
                return 100 > a ? 100 : 500 < a ? 500 : a
            }

            function a(a, b) {
                if (c._isMove || e) u = (-c._realId - c._idOffset) * c._slideSize, g = Math.abs(c._sPosition - u), c._currAnimSpeed = g / b, a && (c._currAnimSpeed += 250), c._currAnimSpeed = d(c._currAnimSpeed), c._animateTo(u, !1)
            }
            var c = this,
                g;
            var f = -1 < b.type.indexOf("touch");
            if (!c._isTouchGesture || f)
                if (c._isTouchGesture = !1, c.ev.trigger("rsDragRelease"),
                    c._renderMoveEvent = null, c._isDragging = !1, c._lockAxis = !1, c._checkedAxis = !1, c._renderMoveTime = 0, cancelAnimationFrame(c._animFrame), c._hasMoved && (e ? c._setThumbsPosition(c._currRenderPosition) : c._isMove && c._setPosition(c._currRenderPosition)), c._eventCallbacks.dragMove && (c._unbindPassiveEvent(document, c._moveEvent, c._eventCallbacks.dragMove, !0), c._unbindPassiveEvent(document, c._upEvent, c._eventCallbacks.dragRelease, !0)), f && c._sliderOverflow.off(c._cancelEvent), c._setGrabCursor(), !c._hasMoved && !c._multipleTouches &&
                    e && c._thumbsEnabled) {
                    var h = l(b.target).closest(".rsNavItem");
                    h.length && c.goTo(h.index())
                } else {
                    h = e ? c._thumbsHorizontal : c._slidesHorizontal;
                    if (!c._hasMoved || "y" === c._currMoveAxis && h || "x" === c._currMoveAxis && !h)
                        if (!e && c._wasAnimating) {
                            c._wasAnimating = !1;
                            if (c.st.navigateByClick) {
                                c._mouseNext(b);
                                c.dragSuccess = !0;
                                return
                            }
                            c.dragSuccess = !0
                        } else {
                            c._wasAnimating = !1;
                            c.dragSuccess = !1;
                            return
                        }
                    else c.dragSuccess = !0;
                    c._wasAnimating = !1;
                    c._currMoveAxis = "";
                    var k = c.st.minSlideOffset;
                    f = f ? b.changedTouches[0] : b;
                    var m = h ? f.pageX :
                        f.pageY,
                        p = c._startPagePos,
                        n = c.currSlideId,
                        r = c.numSlides,
                        t = h ? c._horDir : c._verDir,
                        v = c._loop;
                    f = m - c._accelerationPos;
                    h = (new Date).getTime() - c._startTime;
                    h = Math.abs(f) / h;
                    if (0 === t || 1 >= r) a(!0, h);
                    else {
                        if (!v && !e)
                            if (0 >= n) {
                                if (0 < t) {
                                    a(!0, h);
                                    return
                                }
                            } else if (n >= r - 1 && 0 > t) {
                            a(!0, h);
                            return
                        }
                        if (e) {
                            var u = c._thumbsPosition;
                            if (u > c._thumbsMinPosition) u = c._thumbsMinPosition;
                            else if (u < c._thumbsMaxPosition) u = c._thumbsMaxPosition;
                            else {
                                m = h * h / .006;
                                var q = -c._thumbsPosition;
                                p = c._thumbsContainerSize - c._thumbsViewportSize + c._thumbsPosition;
                                0 < f && m > q ? (q += c._thumbsViewportSize / (15 / (m / h * .003)), h = h * q / m, m = q) : 0 > f && m > p && (p += c._thumbsViewportSize / (15 / (m / h * .003)), h = h * p / m, m = p);
                                q = Math.max(Math.round(h / .003), 50);
                                u += m * (0 > f ? -1 : 1);
                                if (u > c._thumbsMinPosition) {
                                    c._animateThumbsTo(u, q, !0, c._thumbsMinPosition, 200);
                                    return
                                }
                                if (u < c._thumbsMaxPosition) {
                                    c._animateThumbsTo(u, q, !0, c._thumbsMaxPosition, 200);
                                    return
                                }
                            }
                            c._animateThumbsTo(u, q, !0)
                        } else q = function(a) {
                            var b = Math.floor(a / c._slideSize);
                            a - b * c._slideSize > k && b++;
                            return b
                        }, p + k < m ? 0 > t ? a(!1, h) : (q = q(m - p), c._moveTo(c.currSlideId -
                            q, d(Math.abs(c._sPosition - (-c._realId - c._idOffset + q) * c._slideSize) / h), !1, !0, !0)) : p - k > m ? 0 < t ? a(!1, h) : (q = q(p - m), c._moveTo(c.currSlideId + q, d(Math.abs(c._sPosition - (-c._realId - c._idOffset - q) * c._slideSize) / h), !1, !0, !0)) : a(!1, h)
                    }
                }
        },
        _setPosition: function(b) {
            b = this._sPosition = b;
            this._useCSS3Transitions ? this._slidesContainer.css(this._xProp, this._tPref1 + (this._slidesHorizontal ? b + this._tPref2 + 0 : 0 + this._tPref2 + b) + this._tPref3) : this._slidesContainer.css(this._slidesHorizontal ? this._xProp : this._yProp, b)
        },
        updateSliderSize: function(b) {
            if (this.slider) {
                if (this.st.autoScaleSlider) {
                    var e =
                        this.st.autoScaleSliderWidth,
                        d = this.st.autoScaleSliderHeight;
                    if (this.st.autoScaleHeight) {
                        var a = this.slider.width();
                        a != this.width && (this.slider.css("height", d / e * a), a = this.slider.width());
                        var c = this.slider.height()
                    } else c = this.slider.height(), c != this.height && (this.slider.css("width", e / d * c), c = this.slider.height()), a = this.slider.width()
                } else a = this.slider.width(), c = this.slider.height();
                if (b || a != this.width || c != this.height) {
                    this.width = a;
                    this.height = c;
                    this._wrapWidth = a;
                    this._wrapHeight = c;
                    this.ev.trigger("rsBeforeSizeSet");
                    this.ev.trigger("rsAfterSizePropSet");
                    this._sliderOverflow.css({
                        width: this._wrapWidth,
                        height: this._wrapHeight
                    });
                    this._slideSize = (this._slidesHorizontal ? this._wrapWidth : this._wrapHeight) + this.st.slidesSpacing;
                    this._imagePadding = this.st.imageScalePadding;
                    for (a = 0; a < this.slides.length; a++) b = this.slides[a], b.positionSet = !1, b && b.images && b.isLoaded && (b.isRendered = !1, this._resizeImage(b));
                    if (this._cloneHolders)
                        for (a = 0; a < this._cloneHolders.length; a++) b = this._cloneHolders[a], b.holder.css(this._reorderProp,
                            (b.id + this._idOffset) * this._slideSize);
                    this._updateBlocksContent();
                    this._isMove && (this._useCSS3Transitions && this._slidesContainer.css(this._vendorPref + "transition-duration", "0s"), this._setPosition((-this._realId - this._idOffset) * this._slideSize));
                    this.ev.trigger("rsOnUpdateNav")
                }
                this._sliderOffset = this._sliderOverflow.offset();
                this._sliderOffset = this._sliderOffset[this._reorderProp]
            }
        },
        appendSlide: function(b, e) {
            var d = this._parseNode(b);
            if (isNaN(e) || e > this.numSlides) e = this.numSlides;
            this.slides.splice(e,
                0, d);
            this.slidesJQ.splice(e, 0, l('<div style="' + (this._isMove ? "position:absolute;" : this._opacityCSS) + '" class="rsSlide"></div>'));
            e <= this.currSlideId && this.currSlideId++;
            this.ev.trigger("rsOnAppendSlide", [d, e]);
            this._refreshSlides(e);
            e === this.currSlideId && this.ev.trigger("rsAfterSlideChange")
        },
        removeSlide: function(b) {
            var e = this.slides[b];
            e && (e.holder && e.holder.remove(), b < this.currSlideId && this.currSlideId--, this.slides.splice(b, 1), this.slidesJQ.splice(b, 1), this.ev.trigger("rsOnRemoveSlide", [b]), this._refreshSlides(b),
                b === this.currSlideId && this.ev.trigger("rsAfterSlideChange"))
        },
        _refreshSlides: function(b) {
            var e = this;
            b = e.numSlides;
            b = 0 >= e._realId ? 0 : Math.floor(e._realId / b);
            e.numSlides = e.slides.length;
            0 === e.numSlides ? (e.currSlideId = e._idOffset = e._realId = 0, e.currSlide = e._oldHolder = null) : e._realId = b * e.numSlides + e.currSlideId;
            for (b = 0; b < e.numSlides; b++) e.slides[b].id = b;
            e.currSlide = e.slides[e.currSlideId];
            e._currHolder = e.slidesJQ[e.currSlideId];
            e.currSlideId >= e.numSlides ? e.goTo(e.numSlides - 1) : 0 > e.currSlideId && e.goTo(0);
            e._refreshNumPreloadImages();
            e._isMove && e._slidesContainer.css(e._vendorPref + e._TD, "0ms");
            e._refreshSlidesTimeout && clearTimeout(e._refreshSlidesTimeout);
            e._refreshSlidesTimeout = setTimeout(function() {
                e._isMove && e._setPosition((-e._realId - e._idOffset) * e._slideSize);
                e._updateBlocksContent();
                e._isMove || e._currHolder.css({
                    display: "block",
                    opacity: 1
                })
            }, 14);
            e.ev.trigger("rsOnUpdateNav")
        },
        _setGrabCursor: function() {
            this._hasDrag && this._isMove && (this._grabCursor ? this._sliderOverflow.css("cursor", this._grabCursor) :
                (this._sliderOverflow.removeClass("grabbing-cursor"), this._sliderOverflow.addClass("grab-cursor")))
        },
        _setGrabbingCursor: function() {
            this._hasDrag && this._isMove && (this._grabbingCursor ? this._sliderOverflow.css("cursor", this._grabbingCursor) : (this._sliderOverflow.removeClass("grab-cursor"), this._sliderOverflow.addClass("grabbing-cursor")))
        },
        next: function(b) {
            this._moveTo("next", this.st.transitionSpeed, !0, !b)
        },
        prev: function(b) {
            this._moveTo("prev", this.st.transitionSpeed, !0, !b)
        },
        _moveTo: function(b, e, d, a,
            c) {
            var g = this;
            g.ev.trigger("rsBeforeMove", [b, a]);
            var f = "next" === b ? g.currSlideId + 1 : "prev" === b ? g.currSlideId - 1 : b = parseInt(b, 10);
            if (!g._loop) {
                if (0 > f) {
                    g._doBackAndForthAnim("left", !a);
                    return
                }
                if (f >= g.numSlides) {
                    g._doBackAndForthAnim("right", !a);
                    return
                }
            }
            g._isAnimating && (g._stopAnimation(!0), d = !1);
            var h = f - g.currSlideId;
            f = g._prevSlideId = g.currSlideId;
            var k = g.currSlideId + h;
            a = g._realId;
            var m;
            g._loop ? (k = g._updateBlocksContent(!1, k), a += h) : a = k;
            g._newSlideId = k;
            g._oldHolder = g.slidesJQ[g.currSlideId];
            g._realId = a;
            g.currSlideId = g._newSlideId;
            g.currSlide = g.slides[g.currSlideId];
            g._currHolder = g.slidesJQ[g.currSlideId];
            k = g.st.slidesDiff;
            var l = 0 < h;
            h = Math.abs(h);
            var n = Math.floor(f / g._numPreloadImages),
                r = Math.floor((f + (l ? k : -k)) / g._numPreloadImages);
            n = (l ? Math.max(n, r) : Math.min(n, r)) * g._numPreloadImages + (l ? g._numPreloadImages - 1 : 0);
            n > g.numSlides - 1 ? n = g.numSlides - 1 : 0 > n && (n = 0);
            f = l ? n - f : f - n;
            f > g._numPreloadImages && (f = g._numPreloadImages);
            if (h > f + k)
                for (g._idOffset += (h - (f + k)) * (l ? -1 : 1), e *= 1.4, f = 0; f < g.numSlides; f++) g.slides[f].positionSet = !1;
            g._currAnimSpeed = e;
            g._updateBlocksContent(!0);
            c || (m = !0);
            var t = (-a - g._idOffset) * g._slideSize;
            m ? setTimeout(function() {
                g._isWorking = !1;
                g._animateTo(t, b, !1, d);
                g.ev.trigger("rsOnUpdateNav")
            }, 0) : (g._animateTo(t, b, !1, d), g.ev.trigger("rsOnUpdateNav"))
        },
        _updateArrowsNav: function() {
            this.st.arrowsNav && (1 >= this.numSlides ? (this._arrowLeft.css("display", "none"), this._arrowRight.css("display", "none")) : (this._arrowLeft.css("display", "block"), this._arrowRight.css("display", "block"), this._loop || this.st.loopRewind ||
                (0 === this.currSlideId ? this._arrowLeft.addClass("rsArrowDisabled") : this._arrowLeft.removeClass("rsArrowDisabled"), this.currSlideId === this.numSlides - 1 ? this._arrowRight.addClass("rsArrowDisabled") : this._arrowRight.removeClass("rsArrowDisabled"))))
        },
        _animateTo: function(b, e, d, a, c) {
            function g() {
                var a;
                k && (a = k.data("rsTimeout")) && (k !== m && k.css({
                    opacity: 0,
                    display: "none",
                    zIndex: 0
                }), clearTimeout(a), k.data("rsTimeout", ""));
                if (a = m.data("rsTimeout")) clearTimeout(a), m.data("rsTimeout", "")
            }
            var f = this,
                h = {};
            isNaN(f._currAnimSpeed) &&
                (f._currAnimSpeed = 400);
            f._sPosition = f._currRenderPosition = b;
            f.ev.trigger("rsBeforeAnimStart");
            if (f._useCSS3Transitions)
                if (f._isMove) f._currAnimSpeed = parseInt(f._currAnimSpeed, 10), d = f._vendorPref + f._TTF, h[f._vendorPref + f._TD] = f._currAnimSpeed + "ms", h[d] = a ? l.rsCSS3Easing[f.st.easeInOut] : l.rsCSS3Easing[f.st.easeOut], f._slidesContainer.css(h), a || !f.hasTouch ? setTimeout(function() {
                    f._setPosition(b)
                }, 5) : f._setPosition(b);
                else {
                    f._currAnimSpeed = f.st.transitionSpeed;
                    var k = f._oldHolder;
                    var m = f._currHolder;
                    m.data("rsTimeout") &&
                        m.css("opacity", 0);
                    g();
                    k && k.data("rsTimeout", setTimeout(function() {
                        h[f._vendorPref + f._TD] = "0ms";
                        h.zIndex = 0;
                        h.display = "none";
                        k.data("rsTimeout", "");
                        k.css(h);
                        setTimeout(function() {
                            k.css("opacity", 0)
                        }, 16)
                    }, f._currAnimSpeed + 60));
                    h.display = "block";
                    h.zIndex = f._fadeZIndex;
                    h.opacity = 0;
                    h[f._vendorPref + f._TD] = "0ms";
                    h[f._vendorPref + f._TTF] = l.rsCSS3Easing[f.st.easeInOut];
                    m.css(h);
                    m.data("rsTimeout", setTimeout(function() {
                        m.css(f._vendorPref + f._TD, f._currAnimSpeed + "ms");
                        m.data("rsTimeout", setTimeout(function() {
                            m.css("opacity",
                                1);
                            m.data("rsTimeout", "")
                        }, 20))
                    }, 20))
                }
            else f._isMove ? (h[f._slidesHorizontal ? f._xProp : f._yProp] = b + "px", f._slidesContainer.animate(h, f._currAnimSpeed, a ? f.st.easeInOut : f.st.easeOut)) : (k = f._oldHolder, m = f._currHolder, m.stop(!0, !0).css({
                opacity: 0,
                display: "block",
                zIndex: f._fadeZIndex
            }), f._currAnimSpeed = f.st.transitionSpeed, m.animate({
                opacity: 1
            }, f._currAnimSpeed, f.st.easeInOut), g(), k && k.data("rsTimeout", setTimeout(function() {
                k.stop(!0, !0).css({
                    opacity: 0,
                    display: "none",
                    zIndex: 0
                })
            }, f._currAnimSpeed + 60)));
            f._isAnimating = !0;
            f.loadingTimeout && clearTimeout(f.loadingTimeout);
            f.loadingTimeout = c ? setTimeout(function() {
                f.loadingTimeout = null;
                c.call()
            }, f._currAnimSpeed + 60) : setTimeout(function() {
                f.loadingTimeout = null;
                f._animationComplete(e)
            }, f._currAnimSpeed + 60)
        },
        _stopAnimation: function(b) {
            this._isAnimating = !1;
            clearTimeout(this.loadingTimeout);
            if (this._isMove)
                if (!this._useCSS3Transitions) this._slidesContainer.stop(!0), this._sPosition = parseInt(this._slidesContainer.css(this._slidesHorizontal ? this._xProp : this._yProp), 10);
                else {
                    if (!b) {
                        b =
                            this._sPosition;
                        var e = this._currRenderPosition = this._getTransformProp();
                        this._slidesContainer.css(this._vendorPref + this._TD, "0ms");
                        b !== e && this._setPosition(e)
                    }
                }
            else 20 < this._fadeZIndex ? this._fadeZIndex = 10 : this._fadeZIndex++
        },
        _getTransformProp: function() {
            var b = window.getComputedStyle(this._slidesContainer.get(0), null).getPropertyValue(this._vendorPref + "transform").replace(/^matrix\(/i, "").split(/, |\)$/g),
                e = 0 === b[0].indexOf("matrix3d");
            return parseInt(b[this._slidesHorizontal ? e ? 12 : 4 : e ? 13 : 5], 10)
        },
        _getCSS3Prop: function(b,
            e) {
            return this._useCSS3Transitions ? this._tPref1 + (e ? b + this._tPref2 + 0 : 0 + this._tPref2 + b) + this._tPref3 : b
        },
        _animationComplete: function(b) {
            this._isMove || (this._currHolder.css("z-index", 0), this._fadeZIndex = 10);
            this._isAnimating = !1;
            this.staticSlideId = this.currSlideId;
            this._updateBlocksContent();
            this._slidesMoved = !1;
            this.ev.trigger("rsAfterSlideChange")
        },
        _doBackAndForthAnim: function(b, e) {
            var d = this,
                a = (-d._realId - d._idOffset) * d._slideSize;
            if (0 !== d.numSlides && !d._isAnimating)
                if (d.st.loopRewind) d.goTo("left" ===
                    b ? d.numSlides - 1 : 0, e);
                else if (d._isMove) {
                d._currAnimSpeed = 200;
                var c = function() {
                    d._isAnimating = !1
                };
                d._animateTo(a + ("left" === b ? 30 : -30), "", !1, !0, function() {
                    d._isAnimating = !1;
                    d._animateTo(a, "", !1, !0, c)
                })
            }
        },
        _detectPassiveSupport: function() {
            var b = this;
            if (!b._passiveChecked) {
                b._passiveChecked = !0;
                b._passiveParam = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function() {
                            b._passiveParam = {
                                passive: !1
                            }
                        }
                    });
                    window.addEventListener("testPassive", null, e);
                    window.removeEventListener("testPassive", null, e)
                } catch (d) {}
            }
        },
        _bindPassiveEvent: function(b, e, d, a) {
            this._detectPassiveSupport();
            e = e.split(" ");
            for (var c = 0; c < e.length; c++) e[c] && 2 < e[c].length && b.addEventListener(e[c], d, a ? this._passiveParam : !1)
        },
        _unbindPassiveEvent: function(b, e, d, a) {
            this._detectPassiveSupport();
            e = e.split(" ");
            for (var c = 0; c < e.length; c++) e[c] && 2 < e[c].length && b.removeEventListener(e[c], d, a ? this._passiveParam : !1)
        },
        _resizeImage: function(b, e) {
            if (!b.isRendered) {
                var d = b.content,
                    a = "rsMainSlideImage",
                    c = l.isFunction(this.st.imageAlignCenter) ? this.st.imageAlignCenter(b) :
                    this.st.imageAlignCenter,
                    g = l.isFunction(this.st.imageScaleMode) ? this.st.imageScaleMode(b) : this.st.imageScaleMode;
                if (b.videoURL)
                    if (a = "rsVideoContainer", "fill" !== g) var f = !0;
                    else {
                        var h = d;
                        h.hasClass(a) || (h = h.find("." + a));
                        h.css({
                            width: "100%",
                            height: "100%"
                        });
                        a = "rsMainSlideImage"
                    } d.hasClass(a) || (d = d.find("." + a));
                if (d) {
                    var k = b.iW,
                        m = b.iH;
                    b.isRendered = !0;
                    if ("none" !== g || c) {
                        a = "fill" !== g ? this._imagePadding : 0;
                        h = this._wrapWidth - 2 * a;
                        var p = this._wrapHeight - 2 * a,
                            n = {};
                        "fit-if-smaller" === g && (k > h || m > p) && (g = "fit");
                        if ("fill" ===
                            g || "fit" === g) {
                            var r = h / k;
                            var t = p / m;
                            r = "fill" == g ? r > t ? r : t : "fit" == g ? r < t ? r : t : 1;
                            k = Math.ceil(k * r, 10);
                            m = Math.ceil(m * r, 10)
                        }
                        "none" !== g && (n.width = k, n.height = m, f && d.find(".rsImg").css({
                            width: "100%",
                            height: "100%"
                        }));
                        c && (n.marginLeft = Math.floor((h - k) / 2) + a, n.marginTop = Math.floor((p - m) / 2) + a);
                        d.css(n)
                    }
                }
            }
        }
    };
    l.rsProto = v.prototype;
    l.fn.royalSlider = function(b) {
        var e = arguments;
        return this.each(function() {
            var d = l(this);
            if ("object" !== typeof b && b) {
                if ((d = d.data("royalSlider")) && d[b]) return d[b].apply(d, Array.prototype.slice.call(e,
                    1))
            } else d.data("royalSlider") || d.data("royalSlider", new v(d, b))
        })
    };
    l.fn.royalSlider.defaults = {
        slidesSpacing: 8,
        startSlideId: 0,
        loop: !1,
        loopRewind: !1,
        numImagesToPreload: 4,
        fadeinLoadedSlide: !0,
        slidesOrientation: "horizontal",
        transitionType: "move",
        transitionSpeed: 600,
        controlNavigation: "bullets",
        controlsInside: !0,
        arrowsNav: !0,
        arrowsNavAutoHide: !0,
        navigateByClick: !0,
        randomizeSlides: !1,
        sliderDrag: !0,
        sliderTouch: !0,
        keyboardNavEnabled: !1,
        fadeInAfterLoaded: !0,
        allowCSS3: !0,
        allowCSS3OnWebkit: !0,
        addActiveClass: !1,
        autoHeight: !1,
        easeOut: "easeOutSine",
        easeInOut: "easeInOutSine",
        minSlideOffset: 10,
        imageScaleMode: "fit-if-smaller",
        imageAlignCenter: !0,
        imageScalePadding: 4,
        usePreloader: !0,
        autoScaleSlider: !1,
        autoScaleSliderWidth: 800,
        autoScaleSliderHeight: 400,
        autoScaleHeight: !0,
        arrowsNavHideOnTouch: !1,
        globalCaption: !1,
        slidesDiff: 2
    };
    l.rsCSS3Easing = {
        easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
    };
    l.extend(jQuery.easing, {
        easeInOutSine: function(b, e, d, a, c) {
            return -a /
                2 * (Math.cos(Math.PI * e / c) - 1) + d
        },
        easeOutSine: function(b, e, d, a, c) {
            return a * Math.sin(e / c * (Math.PI / 2)) + d
        },
        easeOutCubic: function(b, e, d, a, c) {
            return a * ((e = e / c - 1) * e * e + 1) + d
        }
    })
})(jQuery, window);
// jquery.rs.bullets v1.0.1
(function(c) {
    c.extend(c.rsProto, {
        _initBullets: function() {
            var a = this;
            "bullets" === a.st.controlNavigation && (a.ev.one("rsAfterPropsSetup", function() {
                    a._controlNavEnabled = !0;
                    a.slider.addClass("rsWithBullets");
                    for (var b = '<div class="rsNav rsBullets">', e = 0; e < a.numSlides; e++) b += '<div class="rsNavItem rsBullet"><span></span></div>';
                    a._controlNav = b = c(b + "</div>");
                    a._controlNavItems = b.appendTo(a.slider).children();
                    a._controlNav.on("click.rs", ".rsNavItem", function(b) {
                        a._thumbsDrag || a.goTo(c(this).index())
                    })
                }),
                a.ev.on("rsOnAppendSlide", function(b, c, d) {
                    d >= a.numSlides ? a._controlNav.append('<div class="rsNavItem rsBullet"><span></span></div>') : a._controlNavItems.eq(d).before('<div class="rsNavItem rsBullet"><span></span></div>');
                    a._controlNavItems = a._controlNav.children()
                }), a.ev.on("rsOnRemoveSlide", function(b, c) {
                    var d = a._controlNavItems.eq(c);
                    d && d.length && (d.remove(), a._controlNavItems = a._controlNav.children())
                }), a.ev.on("rsOnUpdateNav", function() {
                    var b = a.currSlideId;
                    a._prevNavItem && a._prevNavItem.removeClass("rsNavSelected");
                    b = a._controlNavItems.eq(b);
                    b.addClass("rsNavSelected");
                    a._prevNavItem = b
                }))
        }
    });
    c.rsModules.bullets = c.rsProto._initBullets
})(jQuery); // jquery.rs.thumbnails v1.0.9
(function(g) {
    g.extend(g.rsProto, {
        _initThumbs: function() {
            var a = this;
            "thumbnails" === a.st.controlNavigation && (a._thumbsDefaults = {
                    drag: !0,
                    touch: !0,
                    orientation: "horizontal",
                    navigation: !0,
                    arrows: !0,
                    arrowLeft: null,
                    arrowRight: null,
                    spacing: 4,
                    arrowsAutoHide: !1,
                    appendSpan: !1,
                    transitionSpeed: 600,
                    autoCenter: !0,
                    fitInViewport: !0,
                    firstMargin: !0,
                    paddingTop: 0,
                    paddingBottom: 0
                }, a.st.thumbs = g.extend({}, a._thumbsDefaults, a.st.thumbs), a._firstThumbMoved = !0, !1 === a.st.thumbs.firstMargin ? a.st.thumbs.firstMargin = 0 : !0 === a.st.thumbs.firstMargin &&
                (a.st.thumbs.firstMargin = a.st.thumbs.spacing), a.ev.on("rsBeforeParseNode", function(a, b, c) {
                    b = g(b);
                    c.thumbnail = b.find(".rsTmb").remove();
                    c.thumbnail.length ? c.thumbnail = g(document.createElement("div")).append(c.thumbnail).html() : (c.thumbnail = b.attr("data-rsTmb"), c.thumbnail || (c.thumbnail = b.find(".rsImg").attr("data-rsTmb")), c.thumbnail = c.thumbnail ? '<img src="' + c.thumbnail + '"/>' : "")
                }), a.ev.one("rsAfterPropsSetup", function() {
                    a._createThumbs()
                }), a._prevNavItem = null, a.ev.on("rsOnUpdateNav", function() {
                    var d =
                        g(a._controlNavItems[a.currSlideId]);
                    d !== a._prevNavItem && (a._prevNavItem && (a._prevNavItem.removeClass("rsNavSelected"), a._prevNavItem = null), a._thumbsNavigation && a._setCurrentThumb(a.currSlideId), a._prevNavItem = d.addClass("rsNavSelected"))
                }), a.ev.on("rsOnAppendSlide", function(d, b, c) {
                    d = "<div" + a._thumbsMargin + ' class="rsNavItem rsThumb">' + a._addThumbHTML + b.thumbnail + "</div>";
                    a._useCSS3Transitions && a._thumbsContainer.css(a._vendorPref + "transition-duration", "0ms");
                    c >= a.numSlides ? a._thumbsContainer.append(d) :
                        a._controlNavItems.eq(c).before(d);
                    a._controlNavItems = a._thumbsContainer.children();
                    a.updateThumbsSize(!0)
                }), a.ev.on("rsOnRemoveSlide", function(d, b) {
                    var c = a._controlNavItems.eq(b);
                    c && (a._useCSS3Transitions && a._thumbsContainer.css(a._vendorPref + "transition-duration", "0ms"), c.remove(), a._controlNavItems = a._thumbsContainer.children(), a.updateThumbsSize(!0))
                }))
        },
        _createThumbs: function() {
            var a = this,
                d = "rsThumbs",
                b = a.st.thumbs,
                c = "",
                f, e = b.spacing;
            a._controlNavEnabled = !0;
            a._thumbsHorizontal = "vertical" === b.orientation ?
                !1 : !0;
            a._thumbsMargin = f = e ? ' style="margin-' + (a._thumbsHorizontal ? "right" : "bottom") + ":" + e + 'px;"' : "";
            a._thumbsPosition = 0;
            a._isThumbsAnimating = !1;
            a._thumbsDrag = !1;
            a._thumbsNavigation = !1;
            a._thumbsArrows = b.arrows && b.navigation;
            var h = a._thumbsHorizontal ? "Hor" : "Ver";
            a.slider.addClass("rsWithThumbs rsWithThumbs" + h);
            c += '<div class="rsNav rsThumbs rsThumbs' + h + '"><div class="' + d + 'Container">';
            a._addThumbHTML = b.appendSpan ? '<span class="thumbIco"></span>' : "";
            for (var k = 0; k < a.numSlides; k++) h = a.slides[k], c += "<div" +
                f + ' class="rsNavItem rsThumb">' + h.thumbnail + a._addThumbHTML + "</div>";
            c = g(c + "</div></div>");
            f = {};
            b.paddingTop && (f[a._thumbsHorizontal ? "paddingTop" : "paddingLeft"] = b.paddingTop);
            b.paddingBottom && (f[a._thumbsHorizontal ? "paddingBottom" : "paddingRight"] = b.paddingBottom);
            c.css(f);
            a._thumbsContainer = g(c).find("." + d + "Container");
            a._thumbsArrows && (d += "Arrow", b.arrowLeft ? a._thumbsArrowLeft = b.arrowLeft : (a._thumbsArrowLeft = g('<div class="' + d + " " + d + 'Left"><div class="' + d + 'Icn"></div></div>'), c.append(a._thumbsArrowLeft)),
                b.arrowRight ? a._thumbsArrowRight = b.arrowRight : (a._thumbsArrowRight = g('<div class="' + d + " " + d + 'Right"><div class="' + d + 'Icn"></div></div>'), c.append(a._thumbsArrowRight)), a._thumbsArrowLeft.click(function() {
                    var b = (Math.floor(a._thumbsPosition / a._thumbSize) + a._visibleThumbsPerView) * a._thumbSize + a.st.thumbs.firstMargin;
                    a._animateThumbsTo(b > a._thumbsMinPosition ? a._thumbsMinPosition : b)
                }), a._thumbsArrowRight.click(function() {
                    var b = (Math.floor(a._thumbsPosition / a._thumbSize) - a._visibleThumbsPerView) * a._thumbSize +
                        a.st.thumbs.firstMargin;
                    a._animateThumbsTo(b < a._thumbsMaxPosition ? a._thumbsMaxPosition : b)
                }), b.arrowsAutoHide && !a.hasTouch && (a._thumbsArrowLeft.css("opacity", 0), a._thumbsArrowRight.css("opacity", 0), c.one("mousemove.rsarrowshover", function() {
                    a._thumbsNavigation && (a._thumbsArrowLeft.css("opacity", 1), a._thumbsArrowRight.css("opacity", 1))
                }), c.hover(function() {
                    a._thumbsNavigation && (a._thumbsArrowLeft.css("opacity", 1), a._thumbsArrowRight.css("opacity", 1))
                }, function() {
                    a._thumbsNavigation && (a._thumbsArrowLeft.css("opacity",
                        0), a._thumbsArrowRight.css("opacity", 0))
                })));
            a._controlNav = c;
            a._controlNavItems = a._thumbsContainer.children();
            a.msEnabled && a.st.thumbs.navigation && a._thumbsContainer.css("-ms-touch-action", a._thumbsHorizontal ? "pan-y" : "pan-x");
            a.slider.append(c);
            a._thumbsEnabled = !0;
            a._thumbsSpacing = e;
            b.navigation && a._useCSS3Transitions && a._thumbsContainer.css(a._vendorPref + "transition-property", a._vendorPref + "transform");
            a._controlNav.on("click.rs", ".rsNavItem", function(b) {
                a._thumbsDrag || a.goTo(g(this).index())
            });
            a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs", function() {
                a._realWrapSize = a._thumbsHorizontal ? a._wrapHeight : a._wrapWidth;
                a.updateThumbsSize(!0)
            });
            a.ev.off("rsAutoHeightChange.thumbs").on("rsAutoHeightChange.thumbs", function(b, c) {
                a.updateThumbsSize(!0, c)
            })
        },
        updateThumbsSize: function(a, d) {
            var b = this._controlNavItems.first(),
                c = {},
                f = this._controlNavItems.length;
            this._thumbSize = (this._thumbsHorizontal ? b.outerWidth() : b.outerHeight()) + this._thumbsSpacing;
            this._thumbsContainerSize = f * this._thumbSize -
                this._thumbsSpacing;
            c[this._thumbsHorizontal ? "width" : "height"] = this._thumbsContainerSize + this._thumbsSpacing;
            this._thumbsViewportSize = this._thumbsHorizontal ? this._controlNav.width() : void 0 !== d ? d : this._controlNav.height();
            this._thumbsEnabled && (this.isFullscreen || this.st.thumbs.fitInViewport) && (this._thumbsHorizontal ? this._wrapHeight = this._realWrapSize - this._controlNav.outerHeight() : this._wrapWidth = this._realWrapSize - this._controlNav.outerWidth());
            this._thumbsViewportSize && (this._thumbsMaxPosition = -(this._thumbsContainerSize - this._thumbsViewportSize) - this.st.thumbs.firstMargin, this._thumbsMinPosition = this.st.thumbs.firstMargin, this._visibleThumbsPerView = Math.floor(this._thumbsViewportSize / this._thumbSize), this._thumbsContainerSize < this._thumbsViewportSize ? (this.st.thumbs.autoCenter ? this._setThumbsPosition((this._thumbsViewportSize - this._thumbsContainerSize) / 2) : this._setThumbsPosition(this._thumbsMinPosition), this.st.thumbs.arrows && this._thumbsArrowLeft && (this._thumbsArrowLeft.addClass("rsThumbsArrowDisabled"),
                    this._thumbsArrowRight.addClass("rsThumbsArrowDisabled")), this._thumbsDrag = this._thumbsNavigation = !1, this._unbindPassiveEvent(this._controlNav[0], this._downEvent, this._eventCallbacks.dragStartThumb, !1)) : this.st.thumbs.navigation && !this._thumbsNavigation && (this._thumbsNavigation = !0, !this.hasTouch && this.st.thumbs.drag || this.hasTouch && this.st.thumbs.touch) && (this._thumbsDrag = !0, this._bindPassiveEvent(this._controlNav[0], this._downEvent, this._eventCallbacks.dragStartThumb, !1)), this._thumbsContainer.css(c),
                a && d && this._setCurrentThumb(this.currSlideId, !0))
        },
        setThumbsOrientation: function(a, d) {
            this._thumbsEnabled && (this.st.thumbs.orientation = a, this._controlNav.remove(), this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"), this._createThumbs(), this._unbindPassiveEvent(this._controlNav[0], this._downEvent, this._eventCallbacks.dragStartThumb, !1), d || this.updateSliderSize(!0))
        },
        _setThumbsPosition: function(a) {
            this._thumbsPosition = a;
            this._useCSS3Transitions ? this._thumbsContainer.css(this._xProp, this._tPref1 +
                (this._thumbsHorizontal ? a + this._tPref2 + 0 : 0 + this._tPref2 + a) + this._tPref3) : this._thumbsContainer.css(this._thumbsHorizontal ? this._xProp : this._yProp, a)
        },
        _animateThumbsTo: function(a, d, b, c, f) {
            var e = this;
            if (e._thumbsNavigation) {
                d || (d = e.st.thumbs.transitionSpeed);
                e._thumbsPosition = a;
                e._thumbsAnimTimeout && clearTimeout(e._thumbsAnimTimeout);
                e._isThumbsAnimating && (e._useCSS3Transitions || e._thumbsContainer.stop(), b = !0);
                var h = {};
                e._isThumbsAnimating = !0;
                e._useCSS3Transitions ? (h[e._vendorPref + "transition-duration"] =
                    d + "ms", h[e._vendorPref + "transition-timing-function"] = b ? g.rsCSS3Easing[e.st.easeOut] : g.rsCSS3Easing[e.st.easeInOut], e._thumbsContainer.css(h), e._setThumbsPosition(a)) : (h[e._thumbsHorizontal ? e._xProp : e._yProp] = a + "px", e._thumbsContainer.animate(h, d, b ? "easeOutCubic" : e.st.easeInOut));
                c && (e._thumbsPosition = c);
                e._updateThumbsArrows();
                e._thumbsAnimTimeout = setTimeout(function() {
                    e._isThumbsAnimating = !1;
                    f && (e._animateThumbsTo(c, f, !0), f = null)
                }, d)
            }
        },
        _updateThumbsArrows: function() {
            this._thumbsArrows && (this._thumbsPosition ===
                this._thumbsMinPosition ? this._thumbsArrowLeft.addClass("rsThumbsArrowDisabled") : this._thumbsArrowLeft.removeClass("rsThumbsArrowDisabled"), this._thumbsPosition === this._thumbsMaxPosition ? this._thumbsArrowRight.addClass("rsThumbsArrowDisabled") : this._thumbsArrowRight.removeClass("rsThumbsArrowDisabled"))
        },
        _setCurrentThumb: function(a, d) {
            var b = 0,
                c = a * this._thumbSize + 2 * this._thumbSize - this._thumbsSpacing + this._thumbsMinPosition;
            if (this._thumbsNavigation) {
                this._firstThumbMoved && (d = !0, this._firstThumbMoved = !1);
                if (c + this._thumbsPosition > this._thumbsViewportSize) {
                    a === this.numSlides - 1 && (b = 1);
                    var f = -a + this._visibleThumbsPerView - 2 + b;
                    f = f * this._thumbSize + this._thumbsViewportSize % this._thumbSize + this._thumbsSpacing - this._thumbsMinPosition
                } else 0 !== a ? (a - 1) * this._thumbSize <= -this._thumbsPosition + this._thumbsMinPosition && a - 1 <= this.numSlides - this._visibleThumbsPerView && (f = (-a + 1) * this._thumbSize + this._thumbsMinPosition) : f = this._thumbsMinPosition;
                f !== this._thumbsPosition && (b = void 0 === f ? this._thumbsPosition : f, b > this._thumbsMinPosition ?
                    this._setThumbsPosition(this._thumbsMinPosition) : b < this._thumbsMaxPosition ? this._setThumbsPosition(this._thumbsMaxPosition) : void 0 !== f && (d ? this._setThumbsPosition(f) : this._animateThumbsTo(f)));
                this._updateThumbsArrows()
            }
        }
    });
    g.rsModules.thumbnails = g.rsProto._initThumbs
})(jQuery); // jquery.rs.tabs v1.0.2
(function(e) {
    e.extend(e.rsProto, {
        _initTabs: function() {
            var a = this;
            "tabs" === a.st.controlNavigation && (a.ev.on("rsBeforeParseNode", function(a, d, b) {
                d = e(d);
                b.thumbnail = d.find(".rsTmb").remove();
                b.thumbnail.length ? b.thumbnail = e(document.createElement("div")).append(b.thumbnail).html() : (b.thumbnail = d.attr("data-rsTmb"), b.thumbnail || (b.thumbnail = d.find(".rsImg").attr("data-rsTmb")), b.thumbnail = b.thumbnail ? '<img src="' + b.thumbnail + '"/>' : "")
            }), a.ev.one("rsAfterPropsSetup", function() {
                a._createTabs()
            }), a.ev.on("rsOnAppendSlide",
                function(c, d, b) {
                    b >= a.numSlides ? a._controlNav.append('<div class="rsNavItem rsTab">' + d.thumbnail + "</div>") : a._controlNavItems.eq(b).before('<div class="rsNavItem rsTab">' + item.thumbnail + "</div>");
                    a._controlNavItems = a._controlNav.children()
                }), a.ev.on("rsOnRemoveSlide", function(c, d) {
                var b = a._controlNavItems.eq(d);
                b && (b.remove(), a._controlNavItems = a._controlNav.children())
            }), a.ev.on("rsOnUpdateNav", function() {
                var c = a.currSlideId;
                a._prevNavItem && a._prevNavItem.removeClass("rsNavSelected");
                c = a._controlNavItems.eq(c);
                c.addClass("rsNavSelected");
                a._prevNavItem = c
            }))
        },
        _createTabs: function() {
            var a = this;
            a._controlNavEnabled = !0;
            var c = '<div class="rsNav rsTabs">';
            for (var d = 0; d < a.numSlides; d++) c += '<div class="rsNavItem rsTab">' + a.slides[d].thumbnail + "</div>";
            c = e(c + "</div>");
            a._controlNav = c;
            a._controlNavItems = c.children(".rsNavItem");
            a.slider.append(c);
            a._controlNav.click(function(b) {
                b = e(b.target).closest(".rsNavItem");
                b.length && a.goTo(b.index())
            })
        }
    });
    e.rsModules.tabs = e.rsProto._initTabs
})(jQuery); // jquery.rs.fullscreen v1.0.6
(function(c) {
    c.extend(c.rsProto, {
        _initFullscreen: function() {
            var a = this;
            a._fullscreenDefaults = {
                enabled: !1,
                keyboardNav: !0,
                buttonFS: !0,
                nativeFS: !1,
                doubleTap: !0
            };
            a.st.fullscreen = c.extend({}, a._fullscreenDefaults, a.st.fullscreen);
            if (a.st.fullscreen.enabled) a.ev.one("rsBeforeSizeSet", function() {
                a._setupFullscreen()
            })
        },
        _setupFullscreen: function() {
            var a = this;
            a._fsKeyboard = !a.st.keyboardNavEnabled && a.st.fullscreen.keyboardNav;
            if (a.st.fullscreen.nativeFS) {
                var b = {
                        supportsFullScreen: !1,
                        isFullScreen: function() {
                            return !1
                        },
                        requestFullScreen: function() {},
                        cancelFullScreen: function() {},
                        fullScreenEventName: "",
                        prefix: ""
                    },
                    d = ["webkit", "moz", "o", "ms", "khtml"];
                if ("undefined" != typeof document.cancelFullScreen) b.supportsFullScreen = !0;
                else
                    for (var e = 0, f = d.length; e < f; e++)
                        if (b.prefix = d[e], "undefined" != typeof document[b.prefix + "CancelFullScreen"]) {
                            b.supportsFullScreen = !0;
                            break
                        } b.supportsFullScreen ? (a.nativeFS = !0, b.fullScreenEventName = b.prefix + "fullscreenchange" + a.ns, b.isFullScreen = function() {
                    switch (this.prefix) {
                        case "":
                            return document.fullScreen;
                        case "webkit":
                            return document.webkitIsFullScreen;
                        default:
                            return document[this.prefix + "FullScreen"]
                    }
                }, b.requestFullScreen = function(a) {
                    return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
                }, b.cancelFullScreen = function(a) {
                    return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
                }, a._fullScreenApi = b) : a._fullScreenApi = !1
            }
            a.st.fullscreen.buttonFS && (a._fsBtn = c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a._controlsContainer).on("click.rs",
                function() {
                    a.isFullscreen ? a.exitFullscreen() : a.enterFullscreen()
                }))
        },
        enterFullscreen: function(a) {
            var b = this;
            if (b._fullScreenApi)
                if (a) b._fullScreenApi.requestFullScreen(c("html")[0]);
                else {
                    b._doc.on(b._fullScreenApi.fullScreenEventName, function(a) {
                        b._fullScreenApi.isFullScreen() ? b.enterFullscreen(!0) : b.exitFullscreen(!0)
                    });
                    b._fullScreenApi.requestFullScreen(c("html")[0]);
                    return
                } if (!b._isFullscreenUpdating) {
                b._isFullscreenUpdating = !0;
                b._doc.on("keyup" + b.ns + "fullscreen", function(a) {
                    27 === a.keyCode && b.exitFullscreen()
                });
                b._fsKeyboard && b._bindKeyboardNav();
                a = c(window);
                b._fsScrollTopOnEnter = a.scrollTop();
                b._fsScrollLeftOnEnter = a.scrollLeft();
                b._htmlStyle = c("html").attr("style");
                b._bodyStyle = c("body").attr("style");
                b._sliderStyle = b.slider.attr("style");
                c("body, html").css({
                    overflow: "hidden",
                    height: "100%",
                    width: "100%",
                    margin: "0",
                    padding: "0"
                });
                b.slider.addClass("rsFullscreen");
                var d;
                for (d = 0; d < b.numSlides; d++) a = b.slides[d], a.isRendered = !1, a.bigImage && (a.isBig = !0, a.isMedLoaded = a.isLoaded, a.isMedLoading = a.isLoading, a.medImage =
                    a.image, a.medIW = a.iW, a.medIH = a.iH, a.slideId = -99, a.bigImage !== a.medImage && (a.sizeType = "big"), a.isLoaded = a.isBigLoaded, a.isLoading = !1, a.image = a.bigImage, a.images[0] = a.bigImage, a.iW = a.bigIW, a.iH = a.bigIH, a.isAppended = a.contentAdded = !1, b._updateItemSrc(a));
                b.isFullscreen = !0;
                b._isFullscreenUpdating = !1;
                b.updateSliderSize();
                b.ev.trigger("rsEnterFullscreen")
            }
        },
        exitFullscreen: function(a) {
            var b = this;
            if (b._fullScreenApi) {
                if (!a) {
                    b._fullScreenApi.cancelFullScreen(c("html")[0]);
                    return
                }
                b._doc.off(b._fullScreenApi.fullScreenEventName)
            }
            if (!b._isFullscreenUpdating) {
                b._isFullscreenUpdating = !0;
                b._doc.off("keyup" + b.ns + "fullscreen");
                b._fsKeyboard && b._doc.off("keydown" + b.ns);
                c("html").attr("style", b._htmlStyle || "");
                c("body").attr("style", b._bodyStyle || "");
                var d;
                for (d = 0; d < b.numSlides; d++) a = b.slides[d], a.isRendered = !1, a.bigImage && (a.isBig = !1, a.slideId = -99, a.isBigLoaded = a.isLoaded, a.isBigLoading = a.isLoading, a.bigImage = a.image, a.bigIW = a.iW, a.bigIH = a.iH, a.isLoaded = a.isMedLoaded, a.isLoading = !1, a.image = a.medImage, a.images[0] = a.medImage, a.iW = a.medIW, a.iH = a.medIH, a.isAppended = a.contentAdded = !1,
                    b._updateItemSrc(a, !0), a.bigImage !== a.medImage && (a.sizeType = "med"));
                b.isFullscreen = !1;
                a = c(window);
                a.scrollTop(b._fsScrollTopOnEnter);
                a.scrollLeft(b._fsScrollLeftOnEnter);
                b._isFullscreenUpdating = !1;
                b.slider.removeClass("rsFullscreen");
                b.updateSliderSize();
                setTimeout(function() {
                    b.updateSliderSize()
                }, 1);
                b.ev.trigger("rsExitFullscreen")
            }
        },
        _updateItemSrc: function(a, b) {
            var d = a.isLoaded || a.isLoading ? '<img class="rsImg rsMainSlideImage" src="' + a.image + '"/>' : '<a class="rsImg rsMainSlideImage" href="' + a.image +
                '"></a>';
            a.content.hasClass("rsImg") ? a.content = c(d) : a.content.find(".rsImg").eq(0).replaceWith(d);
            a.isLoaded || a.isLoading || !a.holder || a.holder.html(a.content)
        }
    });
    c.rsModules.fullscreen = c.rsProto._initFullscreen
})(jQuery); // jquery.rs.autoplay v1.0.5
(function(b) {
    b.extend(b.rsProto, {
        _initAutoplay: function() {
            var a = this,
                d;
            a._autoPlayDefaults = {
                enabled: !1,
                stopAtAction: !0,
                pauseOnHover: !0,
                delay: 2E3
            };
            !a.st.autoPlay && a.st.autoplay && (a.st.autoPlay = a.st.autoplay);
            a.st.autoPlay = b.extend({}, a._autoPlayDefaults, a.st.autoPlay);
            a.st.autoPlay.enabled && (a.ev.on("rsBeforeParseNode", function(a, c, f) {
                c = b(c);
                if (d = c.attr("data-rsDelay")) f.customDelay = parseInt(d, 10)
            }), a.ev.one("rsAfterInit", function() {
                a._setupAutoPlay()
            }), a.ev.on("rsBeforeDestroy", function() {
                a.stopAutoPlay();
                a.slider.off("mouseenter mouseleave");
                b(window).off("blur" + a.ns + " focus" + a.ns)
            }))
        },
        _setupAutoPlay: function() {
            var a = this;
            a.startAutoPlay();
            a.ev.on("rsAfterContentSet", function(b, e) {
                a._isDragging || a._isAnimating || !a._autoPlayEnabled || e !== a.currSlide || a._play()
            });
            a.ev.on("rsDragRelease", function() {
                a._autoPlayEnabled && a._autoPlayPaused && (a._autoPlayPaused = !1, a._play())
            });
            a.ev.on("rsAfterSlideChange", function() {
                a._autoPlayEnabled && a._autoPlayPaused && (a._autoPlayPaused = !1, a.currSlide.isLoaded && a._play())
            });
            a.ev.on("rsDragStart", function() {
                a._autoPlayEnabled && (a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._autoPlayPaused = !0, a._pause()))
            });
            a.ev.on("rsBeforeMove", function(b, e, c) {
                a._autoPlayEnabled && (c && a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._autoPlayPaused = !0, a._pause()))
            });
            a._pausedByVideo = !1;
            a.ev.on("rsVideoStop", function() {
                a._autoPlayEnabled && (a._pausedByVideo = !1, a._play())
            });
            a.ev.on("rsVideoPlay", function() {
                a._autoPlayEnabled && (a._autoPlayPaused = !1, a._pause(), a._pausedByVideo = !0)
            });
            b(window).on("blur" +
                a.ns,
                function() {
                    a._autoPlayEnabled && (a._autoPlayPaused = !0, a._pause())
                }).on("focus" + a.ns, function() {
                a._autoPlayEnabled && a._autoPlayPaused && (a._autoPlayPaused = !1, a._play())
            });
            a.st.autoPlay.pauseOnHover && (a._pausedByHover = !1, a.slider.hover(function() {
                a._autoPlayEnabled && (a._autoPlayPaused = !1, a._pause(), a._pausedByHover = !0)
            }, function() {
                a._autoPlayEnabled && (a._pausedByHover = !1, a._play())
            }))
        },
        toggleAutoPlay: function() {
            this._autoPlayEnabled ? this.stopAutoPlay() : this.startAutoPlay()
        },
        startAutoPlay: function() {
            this._autoPlayEnabled = !0;
            this.currSlide.isLoaded && this._play()
        },
        stopAutoPlay: function() {
            this._pausedByVideo = this._pausedByHover = this._autoPlayPaused = this._autoPlayEnabled = !1;
            this._pause()
        },
        _play: function() {
            var a = this;
            a._pausedByHover || a._pausedByVideo || (a._autoPlayRunning = !0, a._autoPlayTimeout && clearTimeout(a._autoPlayTimeout), a._autoPlayTimeout = setTimeout(function() {
                if (!a._loop && !a.st.loopRewind) {
                    var b = !0;
                    a.st.loopRewind = !0
                }
                a.next(!0);
                b && (a.st.loopRewind = !1)
            }, a.currSlide.customDelay ? a.currSlide.customDelay : a.st.autoPlay.delay))
        },
        _pause: function() {
            this._pausedByHover || this._pausedByVideo || (this._autoPlayRunning = !1, this._autoPlayTimeout && (clearTimeout(this._autoPlayTimeout), this._autoPlayTimeout = null))
        }
    });
    b.rsModules.autoplay = b.rsProto._initAutoplay
})(jQuery); // jquery.rs.video v1.1.3
(function(f) {
    f.extend(f.rsProto, {
        _initVideo: function() {
            var a = this;
            a._videoDefaults = {
                autoHideArrows: !0,
                autoHideControlNav: !1,
                autoHideBlocks: !1,
                autoHideCaption: !1,
                disableCSS3inFF: !0,
                youTubeCode: '<iframe src="https://www.youtube.com/embed/%id%?rel=0&autoplay=1&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
                vimeoCode: '<iframe src="https://player.vimeo.com/video/%id%?byline=0&portrait=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
            };
            a.st.video =
                f.extend({}, a._videoDefaults, a.st.video);
            a.ev.on("rsBeforeSizeSet", function() {
                a._isVideoPlaying && setTimeout(function() {
                    var b = a._currHolder;
                    b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer");
                    a._videoFrameHolder && a._videoFrameHolder.css({
                        width: b.width(),
                        height: b.height()
                    })
                }, 32)
            });
            var d = a._browser.mozilla;
            a.ev.on("rsAfterParseNode", function(b, c, e) {
                b = f(c);
                if (e.videoURL) {
                    a.st.video.disableCSS3inFF && d && (a._useCSS3Transitions = a._use3dTransform = !1);
                    c = f('<div class="rsVideoContainer"></div>');
                    var g = f('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');
                    b.hasClass("rsImg") ? e.content = c.append(b).append(g) : e.content.find(".rsImg").wrap(c).after(g)
                }
            });
            a.ev.on("rsAfterSlideChange", function() {
                a.stopVideo()
            })
        },
        toggleVideo: function() {
            return this._isVideoPlaying ? this.stopVideo() : this.playVideo()
        },
        playVideo: function() {
            var a = this;
            if (!a._isVideoPlaying) {
                var d = a.currSlide;
                if (!d.videoURL) return !1;
                a._playingVideoSlide = d;
                var b = a._currVideoContent = d.content;
                d = d.videoURL;
                var c;
                if (d.match(/youtu\.be/i) || d.match(/youtube\.com/i)) {
                    var e = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]*).*/;
                    (e = d.match(e)) && 11 == e[2].length && (c = e[2]);
                    void 0 !== c && (a._videoFrameHolder = a.st.video.youTubeCode.replace("%id%", c))
                } else d.match(/vimeo\.com/i) && (e = /(www\.)?vimeo.com\/(\d+)($|\/)/, (e = d.match(e)) && (c = e[2]), void 0 !== c && (a._videoFrameHolder = a.st.video.vimeoCode.replace("%id%", c)));
                a.videoObj = f(a._videoFrameHolder);
                a.ev.trigger("rsOnCreateVideoElement", [d]);
                a.videoObj.length &&
                    (a._videoFrameHolder = f('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'), a._videoFrameHolder.find(".rsPreloader").after(a.videoObj), b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer"), a._videoFrameHolder.css({
                            width: b.width(),
                            height: b.height()
                        }).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv", function(b) {
                            a.stopVideo();
                            b.preventDefault();
                            b.stopPropagation();
                            return !1
                        }), b.append(a._videoFrameHolder),
                        a.isIPAD && b.addClass("rsIOSVideo"), a._toggleHiddenClass(!1), setTimeout(function() {
                            a._videoFrameHolder.addClass("rsVideoActive")
                        }, 10), a.ev.trigger("rsVideoPlay"), a._isVideoPlaying = !0);
                return !0
            }
            return !1
        },
        stopVideo: function() {
            var a = this;
            return a._isVideoPlaying ? (a.isIPAD && a.slider.find(".rsCloseVideoBtn").remove(), a._toggleHiddenClass(!0), setTimeout(function() {
                a.ev.trigger("rsOnDestroyVideoElement", [a.videoObj]);
                var d = a._videoFrameHolder.find("iframe");
                if (d.length) try {
                    d.attr("src", "")
                } catch (b) {}
                a._videoFrameHolder.remove();
                a._videoFrameHolder = null
            }, 16), a.ev.trigger("rsVideoStop"), a._isVideoPlaying = !1, !0) : !1
        },
        _toggleHiddenClass: function(a, d) {
            var b = [],
                c = this.st.video;
            c.autoHideArrows && (this._arrowLeft && (b.push(this._arrowLeft, this._arrowRight), this._arrowsAutoHideLocked = !a), this._fsBtn && b.push(this._fsBtn));
            c.autoHideControlNav && this._controlNav && b.push(this._controlNav);
            c.autoHideBlocks && this._playingVideoSlide.animBlocks && b.push(this._playingVideoSlide.animBlocks);
            c.autoHideCaption && this.globalCaption && b.push(this.globalCaption);
            this.slider[a ? "removeClass" : "addClass"]("rsVideoPlaying");
            if (b.length)
                for (c = 0; c < b.length; c++) a ? b[c].removeClass("rsHidden") : b[c].addClass("rsHidden")
        }
    });
    f.rsModules.video = f.rsProto._initVideo
})(jQuery); // jquery.rs.animated-blocks v1.0.7
(function(k) {
    k.extend(k.rsProto, {
        _initAnimatedBlocks: function() {
            function m() {
                var f = a.currSlide;
                if (a.currSlide && a.currSlide.isLoaded && a._slideWithBlocks !== f) {
                    if (0 < a._animatedBlockTimeouts.length) {
                        for (b = 0; b < a._animatedBlockTimeouts.length; b++) clearTimeout(a._animatedBlockTimeouts[b]);
                        a._animatedBlockTimeouts = []
                    }
                    if (0 < a._blockAnimProps.length) {
                        var g;
                        for (b = 0; b < a._blockAnimProps.length; b++)
                            if (g = a._blockAnimProps[b]) a._useCSS3Transitions ? (g.block.css(a._vendorPref + a._TD, "0s"), g.block.css(g.css)) : g.block.stop(!0).css(g.css),
                                a._slideWithBlocks = null, f.animBlocksDisplayed = !1;
                        a._blockAnimProps = []
                    }
                    f.animBlocks && (f.animBlocksDisplayed = !0, a._slideWithBlocks = f, a._animateBlocks(f.animBlocks))
                }
            }
            var a = this,
                b;
            a._blockDefaults = {
                fadeEffect: !0,
                moveEffect: "top",
                moveOffset: 20,
                speed: 400,
                easing: "easeOutSine",
                delay: 200
            };
            a.st.block = k.extend({}, a._blockDefaults, a.st.block);
            a._blockAnimProps = [];
            a._animatedBlockTimeouts = [];
            a.ev.on("rsAfterInit", function() {
                m()
            });
            a.ev.on("rsBeforeParseNode", function(a, b, d) {
                b = k(b);
                d.animBlocks = b.find(".rsABlock").css("display",
                    "none");
                d.animBlocks.length || (b.hasClass("rsABlock") ? d.animBlocks = b.css("display", "none") : d.animBlocks = !1)
            });
            a.ev.on("rsAfterContentSet", function(b, g) {
                g.id === a.slides[a.currSlideId].id && setTimeout(function() {
                    m()
                }, a.st.fadeinLoadedSlide ? 300 : 0)
            });
            a.ev.on("rsAfterSlideChange", function() {
                m()
            })
        },
        _updateAnimBlockProps: function(k, a) {
            setTimeout(function() {
                k.css(a)
            }, 6)
        },
        _animateBlocks: function(m) {
            var a = this,
                b, f, g, d, h, e, n;
            a._animatedBlockTimeouts = [];
            m.each(function(m) {
                b = k(this);
                f = {};
                g = {};
                d = null;
                var c = b.attr("data-move-offset");
                c = c ? parseInt(c, 10) : a.st.block.moveOffset;
                if (0 < c && ((e = b.data("move-effect")) ? (e = e.toLowerCase(), "none" === e ? e = !1 : "left" !== e && "top" !== e && "bottom" !== e && "right" !== e && (e = a.st.block.moveEffect, "none" === e && (e = !1))) : e = a.st.block.moveEffect, e && "none" !== e)) {
                    var p = "right" === e || "left" === e ? !0 : !1;
                    n = !1;
                    if (a._useCSS3Transitions) {
                        var l = 0;
                        h = a._xProp
                    } else p ? isNaN(parseInt(b.css("right"), 10)) ? h = "left" : (h = "right", n = !0) : isNaN(parseInt(b.css("bottom"), 10)) ? h = "top" : (h = "bottom", n = !0), h = "margin-" + h, n && (c = -c), a._useCSS3Transitions ?
                        l = parseInt(b.css(h), 10) : (l = b.data("rs-start-move-prop"), void 0 === l && (l = parseInt(b.css(h), 10), isNaN(l) && (l = 0), b.data("rs-start-move-prop", l)));
                    g[h] = a._getCSS3Prop("top" === e || "left" === e ? l - c : l + c, p);
                    f[h] = a._getCSS3Prop(l, p)
                }
                c = b.attr("data-fade-effect");
                if (!c) c = a.st.block.fadeEffect;
                else if ("none" === c.toLowerCase() || "false" === c.toLowerCase()) c = !1;
                c && (g.opacity = 0, f.opacity = 1);
                if (c || e) d = {}, d.hasFade = !!c, e && (d.moveProp = h, d.hasMove = !0), d.speed = b.data("speed"), isNaN(d.speed) && (d.speed = a.st.block.speed), d.easing =
                    b.data("easing"), d.easing || (d.easing = a.st.block.easing), d.css3Easing = k.rsCSS3Easing[d.easing], d.delay = b.data("delay"), isNaN(d.delay) && (d.delay = a.st.block.delay * m);
                c = {};
                a._useCSS3Transitions && (c[a._vendorPref + a._TD] = "0ms");
                c.moveProp = f.moveProp;
                c.opacity = f.opacity;
                c.display = "none";
                a._blockAnimProps.push({
                    block: b,
                    css: c
                });
                a._updateAnimBlockProps(b, g);
                a._animatedBlockTimeouts.push(setTimeout(function(b, d, c, e) {
                    return function() {
                        b.css("display", "block");
                        if (c) {
                            var f = {};
                            if (a._useCSS3Transitions) {
                                var g = "";
                                c.hasMove && (g += c.moveProp);
                                c.hasFade && (c.hasMove && (g += ", "), g += "opacity");
                                f[a._vendorPref + a._TP] = g;
                                f[a._vendorPref + a._TD] = c.speed + "ms";
                                f[a._vendorPref + a._TTF] = c.css3Easing;
                                b.css(f);
                                setTimeout(function() {
                                    b.css(d)
                                }, 24)
                            } else setTimeout(function() {
                                b.animate(d, c.speed, c.easing)
                            }, 16)
                        }
                        delete a._animatedBlockTimeouts[e]
                    }
                }(b, f, d, m), 6 >= d.delay ? 12 : d.delay))
            })
        }
    });
    k.rsModules.animatedBlocks = k.rsProto._initAnimatedBlocks
})(jQuery); // jquery.rs.auto-height v1.0.3
(function(b) {
    b.extend(b.rsProto, {
        _initAutoHeight: function() {
            var a = this;
            if (a.st.autoHeight) {
                var b, c, e, f = !0,
                    d = function(d) {
                        e = a.slides[a.currSlideId];
                        (b = e.holder) && (c = b.height()) && void 0 !== c && c > (a.st.minAutoHeight || 30) && (a._wrapHeight = c, a._useCSS3Transitions || !d ? a._sliderOverflow.css("height", c) : a._sliderOverflow.stop(!0, !0).animate({
                            height: c
                        }, a.st.transitionSpeed), a.ev.trigger("rsAutoHeightChange", c), f && (a._useCSS3Transitions && setTimeout(function() {
                            a._sliderOverflow.css(a._vendorPref + "transition", "height " +
                                a.st.transitionSpeed + "ms ease-in-out")
                        }, 16), f = !1))
                    };
                a.ev.on("rsMaybeSizeReady.rsAutoHeight", function(a, b) {
                    e === b && d()
                });
                a.ev.on("rsAfterContentSet.rsAutoHeight", function(a, b) {
                    e === b && d()
                });
                a.slider.addClass("rsAutoHeight");
                a.ev.one("rsAfterInit", function() {
                    setTimeout(function() {
                        d(!1);
                        setTimeout(function() {
                            a.slider.append('<div style="clear:both; float: none;"></div>')
                        }, 16)
                    }, 16)
                });
                a.ev.on("rsBeforeAnimStart", function() {
                    d(!0)
                });
                a.ev.on("rsBeforeSizeSet", function() {
                    setTimeout(function() {
                        d(!1)
                    }, 16)
                })
            }
        }
    });
    b.rsModules.autoHeight = b.rsProto._initAutoHeight
})(jQuery); // jquery.rs.global-caption v1.0.1
(function(b) {
    b.extend(b.rsProto, {
        _initGlobalCaption: function() {
            var a = this;
            a.st.globalCaption && (a.ev.on("rsAfterInit", function() {
                a.globalCaption = b('<div class="rsGCaption"></div>').appendTo(a.st.globalCaptionInside ? a._sliderOverflow : a.slider);
                a.globalCaption.html(a.currSlide.caption || "")
            }), a.ev.on("rsBeforeAnimStart", function() {
                a.globalCaption.html(a.currSlide.caption || "")
            }))
        }
    });
    b.rsModules.globalCaption = b.rsProto._initGlobalCaption
})(jQuery); // jquery.rs.active-class v1.0.1
(function(c) {
    c.rsProto._initActiveClass = function() {
        var b, a = this;
        if (a.st.addActiveClass) a.ev.on("rsOnUpdateNav", function() {
            b && clearTimeout(b);
            b = setTimeout(function() {
                a._oldHolder && a._oldHolder.removeClass("rsActiveSlide");
                a._currHolder && a._currHolder.addClass("rsActiveSlide");
                b = null
            }, 50)
        })
    };
    c.rsModules.activeClass = c.rsProto._initActiveClass
})(jQuery);
// jquery.rs.deeplinking v1.0.6 + jQuery hashchange plugin v1.3 Copyright (c) 2010 Ben Alman
(function(b) {
    b.extend(b.rsProto, {
        _initDeeplinking: function() {
            var a = this,
                h, d, f;
            a._hashDefaults = {
                enabled: !1,
                change: !1,
                prefix: ""
            };
            a.st.deeplinking = b.extend({}, a._hashDefaults, a.st.deeplinking);
            if (a.st.deeplinking.enabled) {
                var e = a.st.deeplinking.change,
                    c = a.st.deeplinking.prefix,
                    k = "#" + c,
                    g = function() {
                        var a = window.location.hash;
                        return a && 0 < a.indexOf(c) && (a = parseInt(a.substring(k.length), 10), 0 <= a) ? a - 1 : -1
                    },
                    l = g(); - 1 !== l && (a.st.startSlideId = l);
                e && (b(window).on("hashchange" + a.ns, function(b) {
                    h || (b = g(), 0 > b || (b >
                        a.numSlides - 1 && (b = a.numSlides - 1), a.goTo(b)))
                }), a.ev.on("rsBeforeAnimStart", function() {
                    d && clearTimeout(d);
                    f && clearTimeout(f)
                }), a.ev.on("rsAfterSlideChange", function() {
                    d && clearTimeout(d);
                    f && clearTimeout(f);
                    f = setTimeout(function() {
                        h = !0;
                        window.location.replace(("" + window.location).split("#")[0] + k + (a.currSlideId + 1));
                        d = setTimeout(function() {
                            h = !1;
                            d = null
                        }, 60)
                    }, 400)
                }));
                a.ev.on("rsBeforeDestroy", function() {
                    d = f = null;
                    e && b(window).off("hashchange" + a.ns)
                })
            }
        }
    });
    b.rsModules.deeplinking = b.rsProto._initDeeplinking
})(jQuery);
(function(b, a, h) {
    function d(a) {
        a = a || location.href;
        return "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
    }
    "$:nomunge";
    var f = document,
        e = b.event.special,
        c = f.documentMode,
        k = "onhashchange" in a && (c === h || 7 < c);
    b.fn.hashchange = function(a) {
        return a ? this.bind("hashchange", a) : this.trigger("hashchange")
    };
    b.fn.hashchange.delay = 50;
    e.hashchange = b.extend(e.hashchange, {
        setup: function() {
            if (k) return !1;
            b(g.start)
        },
        teardown: function() {
            if (k) return !1;
            b(g.stop)
        }
    });
    var g = function() {
        function l() {
            var f = d(),
                e = p(g);
            f !== g ? (m(g = f, e), b(a).trigger("hashchange")) :
                e !== g && (location.href = location.href.replace(/#.*/, "") + e);
            c = setTimeout(l, b.fn.hashchange.delay)
        }
        var e = {},
            c, g = d(),
            n = function(a) {
                return a
            },
            m = n,
            p = n;
        e.start = function() {
            c || l()
        };
        e.stop = function() {
            c && clearTimeout(c);
            c = h
        };
        a.attachEvent && !a.addEventListener && !k && function() {
            var a, c;
            e.start = function() {
                a || (c = (c = b.fn.hashchange.src) && c + d(), a = b('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        c || m(d());
                        l()
                    }).attr("src", c || "javascript:0").insertAfter("body")[0].contentWindow, f.onpropertychange =
                    function() {
                        try {
                            "title" === event.propertyName && (a.document.title = f.title)
                        } catch (q) {}
                    })
            };
            e.stop = n;
            p = function() {
                return d(a.location.href)
            };
            m = function(c, e) {
                var d = a.document,
                    g = b.fn.hashchange.domain;
                c !== e && (d.title = f.title, d.open(), g && d.write('<script>document.domain="' + g + '"\x3c/script>'), d.close(), a.location.hash = c)
            }
        }();
        return e
    }()
})(jQuery, this); // jquery.rs.visible-nearby v1.0.2
(function(d) {
    d.rsProto._initVisibleNearby = function() {
        var a = this;
        a.st.visibleNearby && a.st.visibleNearby.enabled && (a._vnDefaults = {
            enabled: !0,
            centerArea: .6,
            center: !0,
            breakpoint: 0,
            breakpointCenterArea: .8,
            hiddenOverflow: !0,
            navigateByCenterClick: !1
        }, a.st.visibleNearby = d.extend({}, a._vnDefaults, a.st.visibleNearby), a.ev.one("rsAfterPropsSetup", function() {
            a._sliderVisibleNearbyWrap = a._sliderOverflow.css("overflow", "visible").wrap('<div class="rsVisibleNearbyWrap"></div>').parent();
            a.st.visibleNearby.hiddenOverflow ||
                a._sliderVisibleNearbyWrap.css("overflow", "visible");
            a._controlsContainer = a.st.controlsInside ? a._sliderVisibleNearbyWrap : a.slider
        }), a.ev.on("rsAfterSizePropSet", function() {
            var c = a.st.visibleNearby;
            var b = c.breakpoint && a.width < c.breakpoint ? c.breakpointCenterArea : c.centerArea;
            a._slidesHorizontal ? (a._wrapWidth *= b, a._sliderVisibleNearbyWrap.css({
                height: a._wrapHeight,
                width: a._wrapWidth / b
            }), a._minPosOffset = a._wrapWidth * (1 - b) / 2 / b) : (a._wrapHeight *= b, a._sliderVisibleNearbyWrap.css({
                    height: a._wrapHeight / b,
                    width: a._wrapWidth
                }),
                a._minPosOffset = a._wrapHeight * (1 - b) / 2 / b);
            c.navigateByCenterClick || (a._nextSlidePos = a._slidesHorizontal ? a._wrapWidth : a._wrapHeight);
            c.center && a._sliderOverflow.css("margin-" + (a._slidesHorizontal ? "left" : "top"), a._minPosOffset)
        }))
    };
    d.rsModules.visibleNearby = d.rsProto._initVisibleNearby
})(jQuery);