/*! elementor - v3.4.8 - 16-11-2021 */
(self.webpackChunkelementor = self.webpackChunkelementor || []).push([
    [819], {
        9220: (e, t, n) => {
            "use strict";
            var i = n(7914);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = i(n(8135));
            class _default extends elementorModules.ViewModule {
                constructor(...e) {
                    super(...e), this.documents = {}, this.initDocumentClasses(), this.attachDocumentsClasses()
                }
                getDefaultSettings() {
                    return {
                        selectors: {
                            document: ".elementor"
                        }
                    }
                }
                getDefaultElements() {
                    const e = this.getSettings("selectors");
                    return {
                        $documents: jQuery(e.document)
                    }
                }
                initDocumentClasses() {
                    this.documentClasses = {
                        base: s.default
                    }, elementorFrontend.hooks.doAction("elementor/frontend/documents-manager/init-classes", this)
                }
                addDocumentClass(e, t) {
                    this.documentClasses[e] = t
                }
                attachDocumentsClasses() {
                    this.elements.$documents.each(((e, t) => this.attachDocumentClass(jQuery(t))))
                }
                attachDocumentClass(e) {
                    const t = e.data(),
                        n = t.elementorId,
                        i = t.elementorType,
                        s = this.documentClasses[i] || this.documentClasses.base;
                    this.documents[n] = new s({
                        $element: e,
                        id: n
                    })
                }
            }
            t.default = _default
        },
        9804: (e, t, n) => {
            "use strict";
            var i = n(7914),
                s = i(n(6397)),
                o = i(n(9320)),
                r = i(n(7537));
            e.exports = function(e) {
                const t = {};
                this.elementsHandlers = {
                    "accordion.default": () => n.e(209).then(n.bind(n, 8470)),
                    "alert.default": () => n.e(745).then(n.bind(n, 9269)),
                    "counter.default": () => n.e(120).then(n.bind(n, 7884)),
                    "progress.default": () => n.e(192).then(n.bind(n, 1351)),
                    "tabs.default": () => n.e(520).then(n.bind(n, 9459)),
                    "toggle.default": () => n.e(181).then(n.bind(n, 2)),
                    "video.default": () => n.e(791).then(n.bind(n, 5363)),
                    "image-carousel.default": () => n.e(268).then(n.bind(n, 5914)),
                    "text-editor.default": () => n.e(357).then(n.bind(n, 1327)),
                    "wp-widget-media_audio.default": () => n.e(52).then(n.bind(n, 7602))
                };
                const addElementsHandlers = () => {
                        this.elementsHandlers.section = o.default, this.elementsHandlers.column = r.default, e.each(this.elementsHandlers, ((e, t) => {
                            const n = e.split(".");
                            e = n[0];
                            const i = n[1] || null;
                            this.attachHandler(e, t, i)
                        }))
                    },
                    isClassHandler = e => {
                        var t;
                        return null === (t = e.prototype) || void 0 === t ? void 0 : t.getUniqueHandlerID
                    },
                    addHandlerWithHook = (e, t, n = "default") => {
                        n = n ? "." + n : "", elementorFrontend.hooks.addAction(`frontend/element_ready/${e}${n}`, (e => {
                            if (isClassHandler(t)) this.addHandler(t, {
                                $element: e
                            }, !0);
                            else {
                                const n = t();
                                n instanceof Promise ? n.then((({
                                    default: t
                                }) => {
                                    this.addHandler(t, {
                                        $element: e
                                    }, !0)
                                })) : this.addHandler(n, {
                                    $element: e
                                }, !0)
                            }
                        }))
                    };
                this.addHandler = function(e, n) {
                    const i = n.$element.data("model-cid");
                    let s;
                    if (i) {
                        s = e.prototype.getConstructorID(), t[i] || (t[i] = {});
                        const n = t[i][s];
                        n && n.onDestroy()
                    }
                    const o = new e(n);
                    i && (t[i][s] = o)
                }, this.attachHandler = (e, t, n) => {
                    Array.isArray(t) || (t = [t]), t.forEach((t => addHandlerWithHook(e, t, n)))
                }, this.getHandler = function(e) {
                    if (!e) return;
                    const t = this.elementsHandlers[e];
                    return isClassHandler(t) ? t : new Promise((e => {
                        t().then((({
                            default: t
                        }) => {
                            e(t)
                        }))
                    }))
                }, this.getHandlers = function(e) {
                    return elementorCommon.helpers.softDeprecated("getHandlers", "3.1.0", "elementorFrontend.elementsHandler.getHandler"), e ? this.getHandler(e) : this.elementsHandlers
                }, this.runReadyTrigger = function(t) {
                    if (elementorFrontend.config.is_static) return;
                    const n = jQuery(t),
                        i = n.attr("data-element_type");
                    if (i && (elementorFrontend.hooks.doAction("frontend/element_ready/global", n, e), elementorFrontend.hooks.doAction(`frontend/element_ready/${i}`, n, e), "widget" === i)) {
                        const t = n.attr("data-widget_type");
                        elementorFrontend.hooks.doAction(`frontend/element_ready/${t}`, n, e)
                    }
                }, this.init = () => {
                    elementorFrontend.hooks.addAction("frontend/element_ready/global", s.default), addElementsHandlers()
                }
            }
        },
        5654: (e, t, n) => {
            "use strict";
            var i = n(7914);
            n(59);
            var s = i(n(9220)),
                o = i(n(5107)),
                r = i(n(3308)),
                a = i(n(1604)),
                d = i(n(1911)),
                l = i(n(4773)),
                c = i(n(2064)),
                u = i(n(7139)),
                h = i(n(8646)),
                m = i(n(6866)),
                g = i(n(4375)),
                p = i(n(6046)),
                f = n(6028);
            const v = n(9469),
                b = n(9804),
                y = n(3346);
            class Frontend extends elementorModules.ViewModule {
                constructor(...e) {
                    super(...e), this.config = elementorFrontendConfig, this.config.legacyMode = {
                        get elementWrappers() {
                            return elementorFrontend.isEditMode() && elementorCommon.helpers.hardDeprecated("elementorFrontend.config.legacyMode.elementWrappers", "3.1.0", "elementorFrontend.config.experimentalFeatures.e_dom_optimization"), !elementorFrontend.config.experimentalFeatures.e_dom_optimization
                        }
                    }, this.populateActiveBreakpointsConfig()
                }
                get Module() {
                    return this.isEditMode() && parent.elementorCommon.helpers.hardDeprecated("elementorFrontend.Module", "2.5.0", "elementorModules.frontend.handlers.Base"), elementorModules.frontend.handlers.Base
                }
                getDefaultSettings() {
                    return {
                        selectors: {
                            elementor: ".elementor",
                            adminBar: "#wpadminbar"
                        }
                    }
                }
                getDefaultElements() {
                    const e = {
                        window,
                        $window: jQuery(window),
                        $document: jQuery(document),
                        $head: jQuery(document.head),
                        $body: jQuery(document.body),
                        $deviceMode: jQuery("<span>", {
                            id: "elementor-device-mode",
                            class: "elementor-screen-only"
                        })
                    };
                    return e.$body.append(e.$deviceMode), e
                }
                bindEvents() {
                    this.elements.$window.on("resize", (() => this.setDeviceModeData()))
                }
                getElements(e) {
                    return this.getItems(this.elements, e)
                }
                getPageSettings(e) {
                    const t = this.isEditMode() ? elementor.settings.page.model.attributes : this.config.settings.page;
                    return this.getItems(t, e)
                }
                getGeneralSettings(e) {
                    return this.isEditMode() && parent.elementorCommon.helpers.softDeprecated("getGeneralSettings", "3.0.0", "getKitSettings and remove the `elementor_` prefix"), this.getKitSettings(`elementor_${e}`)
                }
                getKitSettings(e) {
                    return this.getItems(this.config.kit, e)
                }
                getCurrentDeviceMode() {
                    return getComputedStyle(this.elements.$deviceMode[0], ":after").content.replace(/"/g, "")
                }
                getDeviceSetting(e, t, n) {
                    if ("widescreen" === e) return this.getWidescreenSetting(t, n);
                    const i = elementorFrontend.breakpoints.getActiveBreakpointsList({
                        largeToSmall: !0,
                        withDesktop: !0
                    });
                    let s = i.indexOf(e);
                    for (; s > 0;) {
                        const e = t[n + "_" + i[s]];
                        if (e || 0 === e) return e;
                        s--
                    }
                    return t[n]
                }
                getWidescreenSetting(e, t) {
                    const n = t + "_widescreen";
                    let i;
                    return i = e[n] ? e[n] : e[t], i
                }
                getCurrentDeviceSetting(e, t) {
                    return this.getDeviceSetting(elementorFrontend.getCurrentDeviceMode(), e, t)
                }
                isEditMode() {
                    return this.config.environmentMode.edit
                }
                isWPPreviewMode() {
                    return this.config.environmentMode.wpPreview
                }
                initDialogsManager() {
                    let e;
                    this.getDialogsManager = () => (e || (e = new DialogsManager.Instance), e)
                }
                initOnReadyComponents() {
                    this.utils = {
                        youtube: new a.default,
                        vimeo: new d.default,
                        baseVideoLoader: new l.default,
                        anchors: new y,
                        get lightbox() {
                            return h.default.getLightbox()
                        },
                        urlActions: new c.default,
                        swiper: u.default,
                        environment: r.default,
                        assetsLoader: new m.default,
                        escapeHTML: f.escapeHTML
                    }, this.modules = {
                        StretchElement: elementorModules.frontend.tools.StretchElement,
                        Masonry: elementorModules.utils.Masonry
                    }, this.elementsHandler.init(), this.isEditMode() ? elementor.once("document:loaded", (() => this.onDocumentLoaded())) : this.onDocumentLoaded()
                }
                initOnReadyElements() {
                    this.elements.$wpAdminBar = this.elements.$document.find(this.getSettings("selectors.adminBar"))
                }
                addUserAgentClasses() {
                    for (const [e, t] of Object.entries(r.default)) t && this.elements.$body.addClass("e--ua-" + e)
                }
                setDeviceModeData() {
                    this.elements.$body.attr("data-elementor-device-mode", this.getCurrentDeviceMode())
                }
                addListenerOnce(e, t, n, i) {
                    if (i || (i = this.elements.$window), this.isEditMode())
                        if (this.removeListeners(e, t, i), i instanceof jQuery) {
                            const s = t + "." + e;
                            i.on(s, n)
                        } else i.on(t, n, e);
                    else i.on(t, n)
                }
                removeListeners(e, t, n, i) {
                    if (i || (i = this.elements.$window), i instanceof jQuery) {
                        const s = t + "." + e;
                        i.off(s, n)
                    } else i.off(t, n, e)
                }
                debounce(e, t) {
                    let n;
                    return function() {
                        const i = this,
                            s = arguments,
                            later = () => {
                                n = null, e.apply(i, s)
                            },
                            o = !n;
                        clearTimeout(n), n = setTimeout(later, t), o && e.apply(i, s)
                    }
                }
                waypoint(e, t, n) {
                    n = jQuery.extend({
                        offset: "100%",
                        triggerOnce: !0
                    }, n);
                    return e.elementorWaypoint((function() {
                        const e = this.element || this,
                            i = t.apply(e, arguments);
                        return n.triggerOnce && this.destroy && this.destroy(), i
                    }), n)
                }
                muteMigrationTraces() {
                    jQuery.migrateMute = !0, jQuery.migrateTrace = !1
                }
                initModules() {
                    const e = {
                        shapes: p.default
                    };
                    elementorFrontend.trigger("elementor/modules/init:before"), Object.entries(e).forEach((([e, t]) => {
                        this.modulesHandlers[e] = new t
                    }))
                }
                populateActiveBreakpointsConfig() {
                    this.config.responsive.activeBreakpoints = {}, Object.entries(this.config.responsive.breakpoints).forEach((([e, t]) => {
                        t.is_enabled && (this.config.responsive.activeBreakpoints[e] = t)
                    }))
                }
                init() {
                    this.hooks = new v, this.breakpoints = new g.default(this.config.responsive), this.storage = new o.default, this.elementsHandler = new b(jQuery), this.modulesHandlers = {}, this.addUserAgentClasses(), this.setDeviceModeData(), this.initDialogsManager(), this.isEditMode() && this.muteMigrationTraces(), this.elements.$window.trigger("elementor/frontend/init"), this.initModules(), this.initOnReadyElements(), this.initOnReadyComponents()
                }
                onDocumentLoaded() {
                    this.documentsManager = new s.default, this.trigger("components:init"), new h.default
                }
            }
            window.elementorFrontend = new Frontend, elementorFrontend.isEditMode() || jQuery((() => elementorFrontend.init()))
        },
        4058: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class BackgroundSlideshow extends elementorModules.frontend.handlers.SwiperBase {
                getDefaultSettings() {
                    return {
                        classes: {
                            swiperContainer: "elementor-background-slideshow swiper-container",
                            swiperWrapper: "swiper-wrapper",
                            swiperSlide: "elementor-background-slideshow__slide swiper-slide",
                            slideBackground: "elementor-background-slideshow__slide__image",
                            kenBurns: "elementor-ken-burns",
                            kenBurnsActive: "elementor-ken-burns--active",
                            kenBurnsIn: "elementor-ken-burns--in",
                            kenBurnsOut: "elementor-ken-burns--out"
                        }
                    }
                }
                getSwiperOptions() {
                    const e = this.getElementSettings(),
                        t = {
                            grabCursor: !1,
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            loop: "yes" === e.background_slideshow_loop,
                            speed: e.background_slideshow_transition_duration,
                            autoplay: {
                                delay: e.background_slideshow_slide_duration,
                                stopOnLastSlide: !e.background_slideshow_loop
                            },
                            handleElementorBreakpoints: !0,
                            on: {
                                slideChange: () => {
                                    e.background_slideshow_ken_burns && this.handleKenBurns()
                                }
                            }
                        };
                    switch ("yes" === e.background_slideshow_loop && (t.loopedSlides = this.getSlidesCount()), e.background_slideshow_slide_transition) {
                        case "fade":
                            t.effect = "fade", t.fadeEffect = {
                                crossFade: !0
                            };
                            break;
                        case "slide_down":
                            t.autoplay.reverseDirection = !0;
                        case "slide_up":
                            t.direction = "vertical"
                    }
                    return t
                }
                buildSwiperElements() {
                    const e = this.getSettings("classes"),
                        t = this.getElementSettings(),
                        n = "slide_left" === t.background_slideshow_slide_transition ? "ltr" : "rtl",
                        i = jQuery("<div>", {
                            class: e.swiperContainer,
                            dir: n
                        }),
                        s = jQuery("<div>", {
                            class: e.swiperWrapper
                        }),
                        o = t.background_slideshow_ken_burns;
                    let r = e.slideBackground;
                    if (o) {
                        r += " " + e.kenBurns;
                        const n = "in" === t.background_slideshow_ken_burns_zoom_direction ? "kenBurnsIn" : "kenBurnsOut";
                        r += " " + e[n]
                    }
                    this.elements.$slides = jQuery(), t.background_slideshow_gallery.forEach((t => {
                        const n = jQuery("<div>", {
                                class: e.swiperSlide
                            }),
                            i = jQuery("<div>", {
                                class: r,
                                style: 'background-image: url("' + t.url + '");'
                            });
                        n.append(i), s.append(n), this.elements.$slides = this.elements.$slides.add(n)
                    })), i.append(s), this.$element.prepend(i), this.elements.$backgroundSlideShowContainer = i
                }
                async initSlider() {
                    if (1 >= this.getSlidesCount()) return;
                    const e = this.getElementSettings(),
                        t = elementorFrontend.utils.swiper;
                    this.swiper = await new t(this.elements.$backgroundSlideShowContainer, this.getSwiperOptions()), this.elements.$backgroundSlideShowContainer.data("swiper", this.swiper), e.background_slideshow_ken_burns && this.handleKenBurns()
                }
                activate() {
                    this.buildSwiperElements(), this.initSlider()
                }
                deactivate() {
                    this.swiper && (this.swiper.destroy(), this.elements.$backgroundSlideShowContainer.remove())
                }
                run() {
                    "slideshow" === this.getElementSettings("background_background") ? this.activate() : this.deactivate()
                }
                onInit() {
                    super.onInit(), this.getElementSettings("background_slideshow_gallery") && this.run()
                }
                onDestroy() {
                    super.onDestroy(), this.deactivate()
                }
                onElementChange(e) {
                    "background_background" === e && this.run()
                }
            }
            t.default = BackgroundSlideshow
        },
        7537: (e, t, n) => {
            "use strict";
            var i = n(7914);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = [i(n(4058)).default];
            t.default = s
        },
        6397: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class GlobalHandler extends elementorModules.frontend.handlers.Base {
                getWidgetType() {
                    return "global"
                }
                animate() {
                    const e = this.$element,
                        t = this.getAnimation();
                    if ("none" === t) return void e.removeClass("elementor-invisible");
                    const n = this.getElementSettings(),
                        i = n._animation_delay || n.animation_delay || 0;
                    e.removeClass(t), this.currentAnimation && e.removeClass(this.currentAnimation), this.currentAnimation = t, setTimeout((() => {
                        e.removeClass("elementor-invisible").addClass("animated " + t)
                    }), i)
                }
                getAnimation() {
                    return this.getCurrentDeviceSetting("animation") || this.getCurrentDeviceSetting("_animation")
                }
                onInit(...e) {
                    if (super.onInit(...e), this.getAnimation()) {
                        const e = elementorModules.utils.Scroll.scrollObserver({
                            callback: t => {
                                t.isInViewport && (this.animate(), e.unobserve(this.$element[0]))
                            }
                        });
                        e.observe(this.$element[0])
                    }
                }
                onElementChange(e) {
                    /^_?animation/.test(e) && this.animate()
                }
            }
            t.default = e => {
                elementorFrontend.elementsHandler.addHandler(GlobalHandler, {
                    $element: e
                })
            }
        },
        2987: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class BackgroundVideo extends elementorModules.frontend.handlers.Base {
                getDefaultSettings() {
                    return {
                        selectors: {
                            backgroundVideoContainer: ".elementor-background-video-container",
                            backgroundVideoEmbed: ".elementor-background-video-embed",
                            backgroundVideoHosted: ".elementor-background-video-hosted"
                        }
                    }
                }
                getDefaultElements() {
                    const e = this.getSettings("selectors"),
                        t = {
                            $backgroundVideoContainer: this.$element.find(e.backgroundVideoContainer)
                        };
                    return t.$backgroundVideoEmbed = t.$backgroundVideoContainer.children(e.backgroundVideoEmbed), t.$backgroundVideoHosted = t.$backgroundVideoContainer.children(e.backgroundVideoHosted), t
                }
                calcVideosSize(e) {
                    let t = "16:9";
                    "vimeo" === this.videoType && (t = e[0].width + ":" + e[0].height);
                    const n = this.elements.$backgroundVideoContainer.outerWidth(),
                        i = this.elements.$backgroundVideoContainer.outerHeight(),
                        s = t.split(":"),
                        o = s[0] / s[1],
                        r = n / i > o;
                    return {
                        width: r ? n : i * o,
                        height: r ? n / o : i
                    }
                }
                changeVideoSize() {
                    if ("hosted" !== this.videoType && !this.player) return;
                    let e;
                    if ("youtube" === this.videoType ? e = jQuery(this.player.getIframe()) : "vimeo" === this.videoType ? e = jQuery(this.player.element) : "hosted" === this.videoType && (e = this.elements.$backgroundVideoHosted), !e) return;
                    const t = this.calcVideosSize(e);
                    e.width(t.width).height(t.height)
                }
                startVideoLoop(e) {
                    if (!this.player.getIframe().contentWindow) return;
                    const t = this.getElementSettings(),
                        n = t.background_video_start || 0,
                        i = t.background_video_end;
                    if (!t.background_play_once || e) {
                        if (this.player.seekTo(n), i) {
                            setTimeout((() => {
                                this.startVideoLoop(!1)
                            }), 1e3 * (i - n + 1))
                        }
                    } else this.player.stopVideo()
                }
                prepareVimeoVideo(e, t) {
                    const n = this.getElementSettings(),
                        i = {
                            url: t,
                            width: this.elements.$backgroundVideoContainer.outerWidth().width,
                            autoplay: !0,
                            loop: !n.background_play_once,
                            transparent: !1,
                            background: !0,
                            muted: !0
                        };
                    this.player = new e.Player(this.elements.$backgroundVideoContainer, i), this.handleVimeoStartEndTimes(n), this.player.ready().then((() => {
                        jQuery(this.player.element).addClass("elementor-background-video-embed"), this.changeVideoSize()
                    }))
                }
                handleVimeoStartEndTimes(e) {
                    e.background_video_start && this.player.on("play", (t => {
                        0 === t.seconds && this.player.setCurrentTime(e.background_video_start)
                    })), this.player.on("timeupdate", (t => {
                        e.background_video_end && e.background_video_end < t.seconds && (e.background_play_once ? this.player.pause() : this.player.setCurrentTime(e.background_video_start)), this.player.getDuration().then((n => {
                            e.background_video_start && !e.background_video_end && t.seconds > n - .5 && this.player.setCurrentTime(e.background_video_start)
                        }))
                    }))
                }
                prepareYTVideo(e, t) {
                    const n = this.elements.$backgroundVideoContainer,
                        i = this.getElementSettings();
                    let s = e.PlayerState.PLAYING;
                    window.chrome && (s = e.PlayerState.UNSTARTED);
                    const o = {
                        videoId: t,
                        events: {
                            onReady: () => {
                                this.player.mute(), this.changeVideoSize(), this.startVideoLoop(!0), this.player.playVideo()
                            },
                            onStateChange: t => {
                                switch (t.data) {
                                    case s:
                                        n.removeClass("elementor-invisible elementor-loading");
                                        break;
                                    case e.PlayerState.ENDED:
                                        this.player.seekTo(i.background_video_start || 0), i.background_play_once && this.player.destroy()
                                }
                            }
                        },
                        playerVars: {
                            controls: 0,
                            rel: 0,
                            playsinline: 1
                        }
                    };
                    i.background_privacy_mode && (o.host = "https://www.youtube-nocookie.com", o.origin = window.location.hostname), n.addClass("elementor-loading elementor-invisible"), this.player = new e.Player(this.elements.$backgroundVideoEmbed[0], o)
                }
                activate() {
                    let e, t = this.getElementSettings("background_video_link");
                    const n = this.getElementSettings("background_play_once");
                    if (-1 !== t.indexOf("vimeo.com") ? (this.videoType = "vimeo", this.apiProvider = elementorFrontend.utils.vimeo) : t.match(/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com)/) && (this.videoType = "youtube", this.apiProvider = elementorFrontend.utils.youtube), this.apiProvider) e = this.apiProvider.getVideoIDFromURL(t), this.apiProvider.onApiReady((n => {
                        "youtube" === this.videoType && this.prepareYTVideo(n, e), "vimeo" === this.videoType && this.prepareVimeoVideo(n, t)
                    }));
                    else {
                        this.videoType = "hosted";
                        const e = this.getElementSettings("background_video_start"),
                            i = this.getElementSettings("background_video_end");
                        (e || i) && (t += "#t=" + (e || 0) + (i ? "," + i : "")), this.elements.$backgroundVideoHosted.attr("src", t).one("canplay", this.changeVideoSize.bind(this)), n && this.elements.$backgroundVideoHosted.on("ended", (() => {
                            this.elements.$backgroundVideoHosted.hide()
                        }))
                    }
                    elementorFrontend.elements.$window.on("resize", this.changeVideoSize)
                }
                deactivate() {
                    "youtube" === this.videoType && this.player.getIframe() || "vimeo" === this.videoType ? this.player.destroy() : this.elements.$backgroundVideoHosted.removeAttr("src").off("ended"), elementorFrontend.elements.$window.off("resize", this.changeVideoSize)
                }
                run() {
                    const e = this.getElementSettings();
                    (e.background_play_on_mobile || "mobile" !== elementorFrontend.getCurrentDeviceMode()) && ("video" === e.background_background && e.background_video_link ? this.activate() : this.deactivate())
                }
                onInit(...e) {
                    super.onInit(...e), this.changeVideoSize = this.changeVideoSize.bind(this), this.run()
                }
                onElementChange(e) {
                    "background_background" === e && this.run()
                }
            }
            t.default = BackgroundVideo
        },
        355: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class HandlesPosition extends elementorModules.frontend.handlers.Base {
                isActive() {
                    return elementorFrontend.isEditMode()
                }
                isFirstSection() {
                    return this.$element[0] === document.querySelector(".elementor-edit-mode .elementor-top-section")
                }
                isOverflowHidden() {
                    return "hidden" === this.$element.css("overflow")
                }
                getOffset() {
                    if ("body" === elementor.config.document.container) return this.$element.offset().top;
                    const e = jQuery(elementor.config.document.container);
                    return this.$element.offset().top - e.offset().top
                }
                setHandlesPosition() {
                    const e = elementor.documents.getCurrent();
                    if (!e || !e.container.isEditable()) return;
                    const t = "elementor-section--handles-inside",
                        n = this.$element.find("> .elementor-element-overlay > .elementor-editor-section-settings");
                    if (elementor.settings.page.model.attributes.scroll_snap) return void this.$element.addClass(t);
                    const i = this.isOverflowHidden();
                    if (!i && !this.isFirstSection()) return;
                    const s = i ? 0 : this.getOffset();
                    s < 25 ? (this.$element.addClass(t), s < -5 ? n.css("top", -s) : n.css("top", "")) : this.$element.removeClass(t)
                }
                onInit() {
                    this.isActive() && (this.setHandlesPosition(), this.$element.on("mouseenter", this.setHandlesPosition.bind(this)))
                }
            }
            t.default = HandlesPosition
        },
        9320: (e, t, n) => {
            "use strict";
            var i = n(7914);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = i(n(4058)),
                o = i(n(2987)),
                r = i(n(355)),
                a = i(n(2804)),
                d = i(n(3384)),
                l = [a.default, s.default, o.default, r.default, d.default];
            t.default = l
        },
        3384: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class Shapes extends elementorModules.frontend.handlers.Base {
                getDefaultSettings() {
                    return {
                        selectors: {
                            container: "> .elementor-shape-%s"
                        },
                        svgURL: elementorFrontend.config.urls.assets + "shapes/"
                    }
                }
                getDefaultElements() {
                    const e = {},
                        t = this.getSettings("selectors");
                    return e.$topContainer = this.$element.find(t.container.replace("%s", "top")), e.$bottomContainer = this.$element.find(t.container.replace("%s", "bottom")), e
                }
                isActive() {
                    return elementorFrontend.isEditMode()
                }
                getSvgURL(e, t) {
                    let n = this.getSettings("svgURL") + t + ".svg";
                    return elementor.config.additional_shapes && e in elementor.config.additional_shapes && (n = elementor.config.additional_shapes[e], -1 < t.indexOf("-negative") && (n = n.replace(".svg", "-negative.svg"))), n
                }
                buildSVG(e) {
                    const t = "shape_divider_" + e,
                        n = this.getElementSettings(t),
                        i = this.elements["$" + e + "Container"];
                    if (i.attr("data-shape", n), !n) return void i.empty();
                    let s = n;
                    this.getElementSettings(t + "_negative") && (s += "-negative");
                    const o = this.getSvgURL(n, s);
                    jQuery.get(o, (e => {
                        i.empty().append(e.childNodes[0])
                    })), this.setNegative(e)
                }
                setNegative(e) {
                    this.elements["$" + e + "Container"].attr("data-negative", !!this.getElementSettings("shape_divider_" + e + "_negative"))
                }
                onInit(...e) {
                    this.isActive(this.getSettings()) && (super.onInit(...e), ["top", "bottom"].forEach((e => {
                        this.getElementSettings("shape_divider_" + e) && this.buildSVG(e)
                    })))
                }
                onElementChange(e) {
                    const t = e.match(/^shape_divider_(top|bottom)$/);
                    if (t) return void this.buildSVG(t[1]);
                    const n = e.match(/^shape_divider_(top|bottom)_negative$/);
                    n && (this.buildSVG(n[1]), this.setNegative(n[1]))
                }
            }
            t.default = Shapes
        },
        2804: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class StretchedSection extends elementorModules.frontend.handlers.Base {
                bindEvents() {
                    const e = this.getUniqueHandlerID();
                    elementorFrontend.addListenerOnce(e, "resize", this.stretch), elementorFrontend.addListenerOnce(e, "sticky:stick", this.stretch, this.$element), elementorFrontend.addListenerOnce(e, "sticky:unstick", this.stretch, this.$element), elementorFrontend.isEditMode() && (this.onKitChangeStretchContainerChange = this.onKitChangeStretchContainerChange.bind(this), elementor.channels.editor.on("kit:change:stretchContainer", this.onKitChangeStretchContainerChange))
                }
                unbindEvents() {
                    elementorFrontend.removeListeners(this.getUniqueHandlerID(), "resize", this.stretch), elementorFrontend.isEditMode() && elementor.channels.editor.off("kit:change:stretchContainer", this.onKitChangeStretchContainerChange)
                }
                isActive(e) {
                    return elementorFrontend.isEditMode() || e.$element.hasClass("elementor-section-stretched")
                }
                initStretch() {
                    this.stretch = this.stretch.bind(this), this.stretchElement = new elementorModules.frontend.tools.StretchElement({
                        element: this.$element,
                        selectors: {
                            container: this.getStretchContainer()
                        }
                    })
                }
                getStretchContainer() {
                    return elementorFrontend.getKitSettings("stretched_section_container") || window
                }
                stretch() {
                    this.getElementSettings("stretch_section") && this.stretchElement.stretch()
                }
                onInit(...e) {
                    this.isActive(this.getSettings()) && (this.initStretch(), super.onInit(...e), this.stretch())
                }
                onElementChange(e) {
                    "stretch_section" === e && (this.getElementSettings("stretch_section") ? this.stretch() : this.stretchElement.reset())
                }
                onKitChangeStretchContainerChange() {
                    this.stretchElement.setSettings("selectors.container", this.getStretchContainer()), this.stretch()
                }
            }
            t.default = StretchedSection
        },
        3346: e => {
            "use strict";
            e.exports = elementorModules.ViewModule.extend({
                getDefaultSettings: function() {
                    return {
                        scrollDuration: 500,
                        selectors: {
                            links: 'a[href*="#"]',
                            targets: ".elementor-element, .elementor-menu-anchor",
                            scrollable: "html, body"
                        }
                    }
                },
                getDefaultElements: function() {
                    return {
                        $scrollable: jQuery(this.getSettings("selectors").scrollable)
                    }
                },
                bindEvents: function() {
                    elementorFrontend.elements.$document.on("click", this.getSettings("selectors.links"), this.handleAnchorLinks)
                },
                handleAnchorLinks: function(e) {
                    var t, n = e.currentTarget,
                        i = location.pathname === n.pathname;
                    if (location.hostname === n.hostname && i && !(n.hash.length < 2)) {
                        try {
                            t = jQuery(n.hash).filter(this.getSettings("selectors.targets"))
                        } catch (e) {
                            return
                        }
                        if (t.length) {
                            var s = t.offset().top,
                                o = elementorFrontend.elements.$wpAdminBar,
                                r = jQuery(".elementor-section.elementor-sticky--active:visible");
                            o.length > 0 && (s -= o.height()), r.length > 0 && (s -= Math.max.apply(null, r.map((function() {
                                return jQuery(this).outerHeight()
                            })).get())), e.preventDefault(), s = elementorFrontend.hooks.applyFilters("frontend/handlers/menu_anchor/scroll_top_distance", s), this.elements.$scrollable.animate({
                                scrollTop: s
                            }, this.getSettings("scrollDuration"), "linear")
                        }
                    }
                },
                onInit: function() {
                    elementorModules.ViewModule.prototype.onInit.apply(this, arguments), this.bindEvents()
                }
            })
        },
        6866: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class AssetsLoader {
                getScriptElement(e) {
                    const t = document.createElement("script");
                    return t.src = e, t
                }
                getStyleElement(e) {
                    const t = document.createElement("link");
                    return t.rel = "stylesheet", t.href = e, t
                }
                load(e, t) {
                    const n = AssetsLoader.assets[e][t];
                    return n.loader || (n.loader = new Promise((t => {
                        const i = "style" === e ? this.getStyleElement(n.src) : this.getScriptElement(n.src);
                        i.onload = () => t(!0);
                        const s = "head" === n.parent ? n.parent : "body";
                        document[s].appendChild(i)
                    }))), n.loader
                }
            }
            t.default = AssetsLoader;
            const n = elementorFrontendConfig.environmentMode.isScriptDebug ? "" : ".min";
            AssetsLoader.assets = {
                script: {
                    dialog: {
                        src: `${elementorFrontendConfig.urls.assets}lib/dialog/dialog${n}.js?ver=4.8.1`
                    },
                    "share-link": {
                        src: `${elementorFrontendConfig.urls.assets}lib/share-link/share-link${n}.js?ver=${elementorFrontendConfig.version}`
                    },
                    swiper: {
                        src: `${elementorFrontendConfig.urls.assets}lib/swiper/swiper${n}.js?ver=5.3.6`
                    }
                },
                style: {}
            }
        },
        8646: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class LightboxManager extends elementorModules.ViewModule {
                static getLightbox() {
                    const e = new Promise((e => {
                            n.e(723).then(n.t.bind(n, 3896, 23)).then((({
                                default: t
                            }) => e(new t)))
                        })),
                        t = elementorFrontend.utils.assetsLoader.load("script", "dialog"),
                        i = elementorFrontend.utils.assetsLoader.load("script", "share-link");
                    return Promise.all([e, t, i]).then((() => e))
                }
                getDefaultSettings() {
                    return {
                        selectors: {
                            links: "a, [data-elementor-lightbox]"
                        }
                    }
                }
                getDefaultElements() {
                    return {
                        $links: jQuery(this.getSettings("selectors.links"))
                    }
                }
                isLightboxLink(e) {
                    if ("a" === e.tagName.toLowerCase() && (e.hasAttribute("download") || !/^[^?]+\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i.test(e.href)) && !e.dataset.elementorLightboxVideo) return !1;
                    const t = elementorFrontend.getKitSettings("global_image_lightbox"),
                        n = e.dataset.elementorOpenLightbox;
                    return "yes" === n || t && "no" !== n
                }
                async onLinkClick(e) {
                    const t = e.currentTarget,
                        n = jQuery(e.target),
                        i = elementorFrontend.isEditMode(),
                        s = i && elementor.$previewContents.find("body").hasClass("elementor-editor__ui-state__color-picker"),
                        o = !!n.closest(".elementor-edit-area").length;
                    if (!this.isLightboxLink(t)) return void(i && o && e.preventDefault());
                    if (e.preventDefault(), i && !elementor.getPreferences("lightbox_in_editor")) return;
                    if (s) return;
                    (this.isOptimizedAssetsLoading() ? await LightboxManager.getLightbox() : elementorFrontend.utils.lightbox).createLightbox(t)
                }
                isOptimizedAssetsLoading() {
                    return elementorFrontend.config.experimentalFeatures.e_optimized_assets_loading
                }
                bindEvents() {
                    elementorFrontend.elements.$document.on("click", this.getSettings("selectors.links"), (e => this.onLinkClick(e)))
                }
                onInit(...e) {
                    super.onInit(...e), this.isOptimizedAssetsLoading() && !elementorFrontend.isEditMode() && this.elements.$links.each(((e, t) => {
                        if (this.isLightboxLink(t)) return LightboxManager.getLightbox(), !1
                    }))
                }
            }
            t.default = LightboxManager
        },
        7139: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class SwiperBC {
                constructor(e, t) {
                    return this.config = t, this.config.breakpoints && (this.config = this.adjustConfig(t)), t.legacy ? this.createSwiperInstance(e, this.config) : new Promise((t => {
                        if (!elementorFrontend.config.experimentalFeatures.e_optimized_assets_loading) return t(this.createSwiperInstance(e, this.config));
                        elementorFrontend.utils.assetsLoader.load("script", "swiper").then((() => t(this.createSwiperInstance(e, this.config))))
                    }))
                }
                createSwiperInstance(e, t) {
                    return !SwiperBC.isSwiperLoaded && elementorFrontend.config.experimentalFeatures.e_optimized_assets_loading && (n = window.Swiper, SwiperBC.isSwiperLoaded = !0, legacySwiper()), n.prototype.adjustConfig = this.adjustConfig, new n(e, t)
                }
                adjustConfig(e) {
                    if (!e.handleElementorBreakpoints) return e;
                    const t = elementorFrontend.config.responsive.activeBreakpoints,
                        n = elementorFrontend.breakpoints.getBreakpointValues();
                    return Object.keys(e.breakpoints).forEach((i => {
                        const s = parseInt(i);
                        let o;
                        if (s === t.mobile.value || s + 1 === t.mobile.value) o = 0;
                        else if (!t.widescreen || s !== t.widescreen.value && s + 1 !== t.widescreen.value) {
                            const e = n.findIndex((e => s === e || s + 1 === e));
                            o = n[e - 1]
                        } else o = s;
                        e.breakpoints[o] = e.breakpoints[i], e.breakpoints[i] = {
                            slidesPerView: e.slidesPerView,
                            slidesPerGroup: e.slidesPerGroup ? e.slidesPerGroup : 1
                        }
                    })), e
                }
            }

            function legacySwiper() {
                window.Swiper = class {
                    constructor(e, t) {
                        return t.legacy = !0, new SwiperBC(e, t)
                    }
                }
            }
            t.default = SwiperBC, SwiperBC.isSwiperLoaded = !1;
            let n = window.Swiper;
            n && legacySwiper()
        },
        2064: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class _default extends elementorModules.ViewModule {
                getDefaultSettings() {
                    return {
                        selectors: {
                            links: 'a[href^="%23elementor-action"], a[href^="#elementor-action"]'
                        }
                    }
                }
                bindEvents() {
                    elementorFrontend.elements.$document.on("click", this.getSettings("selectors.links"), this.runLinkAction.bind(this))
                }
                initActions() {
                    this.actions = {
                        lightbox: async e => {
                            const t = await elementorFrontend.utils.lightbox;
                            e.id ? t.openSlideshow(e.id, e.url) : (e.html && delete e.html, t.showModal(e))
                        }
                    }
                }
                addAction(e, t) {
                    this.actions[e] = t
                }
                runAction(e, ...t) {
                    const n = (e = decodeURIComponent(e)).match(/action=(.+?)&/),
                        i = e.match(/settings=(.+)/);
                    if (!n) return;
                    const s = this.actions[n[1]];
                    if (!s) return;
                    let o = {};
                    i && (o = JSON.parse(atob(i[1]))), s(o, ...t)
                }
                runLinkAction(e) {
                    e.preventDefault(), this.runAction(jQuery(e.currentTarget).attr("href"), e)
                }
                runHashAction() {
                    location.hash && this.runAction(location.hash)
                }
                createActionHash(e, t) {
                    return encodeURIComponent(`#elementor-action:action=${e}&settings=${btoa(JSON.stringify(t))}`)
                }
                onInit() {
                    super.onInit(), this.initActions(), elementorFrontend.on("components:init", this.runHashAction.bind(this))
                }
            }
            t.default = _default
        },
        6028: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.escapeHTML = void 0;
            t.escapeHTML = e => {
                const t = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    "'": "&#39;",
                    '"': "&quot;"
                };
                return e.replace(/[&<>'"]/g, (e => t[e] || e))
            }
        },
        4773: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class BaseLoader extends elementorModules.ViewModule {
                getDefaultSettings() {
                    return {
                        isInserted: !1,
                        selectors: {
                            firstScript: "script:first"
                        }
                    }
                }
                getDefaultElements() {
                    return {
                        $firstScript: jQuery(this.getSettings("selectors.firstScript"))
                    }
                }
                insertAPI() {
                    this.elements.$firstScript.before(jQuery("<script>", {
                        src: this.getApiURL()
                    })), this.setSettings("isInserted", !0)
                }
                getVideoIDFromURL(e) {
                    const t = e.match(this.getURLRegex());
                    return t && t[1]
                }
                onApiReady(e) {
                    this.getSettings("isInserted") || this.insertAPI(), this.isApiLoaded() ? e(this.getApiObject()) : setTimeout((() => {
                        this.onApiReady(e)
                    }), 350)
                }
                getAutoplayURL(e) {
                    return e.replace("&autoplay=0", "") + "&autoplay=1"
                }
            }
            t.default = BaseLoader
        },
        1911: (e, t, n) => {
            "use strict";
            var i = n(7914);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = i(n(4773));
            class VimeoLoader extends s.default {
                getApiURL() {
                    return "https://player.vimeo.com/api/player.js"
                }
                getURLRegex() {
                    return /^(?:https?:\/\/)?(?:www|player\.)?(?:vimeo\.com\/)?(?:video\/|external\/)?(\d+)([^.?&#"'>]?)/
                }
                isApiLoaded() {
                    return window.Vimeo
                }
                getApiObject() {
                    return Vimeo
                }
                getAutoplayURL(e) {
                    const t = (e = super.getAutoplayURL(e)).match(/#t=[^&]*/);
                    return e.replace(t[0], "") + t
                }
            }
            t.default = VimeoLoader
        },
        1604: (e, t, n) => {
            "use strict";
            var i = n(7914);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = i(n(4773));
            class YoutubeLoader extends s.default {
                getApiURL() {
                    return "https://www.youtube.com/iframe_api"
                }
                getURLRegex() {
                    return /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?vi?=|(?:embed|v|vi|user)\/))([^?&"'>]+)/
                }
                isApiLoaded() {
                    return window.YT && YT.loaded
                }
                getApiObject() {
                    return YT
                }
            }
            t.default = YoutubeLoader
        },
        59: (e, t, n) => {
            "use strict";
            n.p = elementorFrontendConfig.urls.assets + "js/"
        },
        4375: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class Breakpoints extends elementorModules.Module {
                constructor(e) {
                    super(), this.responsiveConfig = e
                }
                getActiveBreakpointsList(e = {}) {
                    e = {
                        largeToSmall: !1,
                        withDesktop: !1,
                        ...e
                    };
                    const t = Object.keys(this.responsiveConfig.activeBreakpoints);
                    if (e.withDesktop) {
                        const e = -1 === t.indexOf("widescreen") ? t.length : t.length - 1;
                        t.splice(e, 0, "desktop")
                    }
                    return e.largeToSmall && t.reverse(), t
                }
                getBreakpointValues() {
                    const {
                        activeBreakpoints: e
                    } = this.responsiveConfig, t = [];
                    return Object.values(e).forEach((e => {
                        t.push(e.value)
                    })), t
                }
                getDesktopPreviousDeviceKey() {
                    let e = "";
                    const {
                        activeBreakpoints: t
                    } = this.responsiveConfig, n = Object.keys(t), i = n.length;
                    return e = "min" === t[n[i - 1]].direction ? n[i - 2] : n[i - 1], e
                }
                getDesktopMinPoint() {
                    const {
                        activeBreakpoints: e
                    } = this.responsiveConfig;
                    return e[this.getDesktopPreviousDeviceKey()].value + 1
                }
                getDeviceMinBreakpoint(e) {
                    if ("desktop" === e) return this.getDesktopMinPoint();
                    const {
                        activeBreakpoints: t
                    } = this.responsiveConfig, n = Object.keys(t);
                    let i;
                    if (n[0] === e) i = 320;
                    else if ("widescreen" === e) i = t[e] ? t[e].value : this.responsiveConfig.breakpoints.widescreen;
                    else {
                        const s = n.indexOf(e);
                        i = t[n[s - 1]].value + 1
                    }
                    return i
                }
                getActiveMatchRegex() {
                    return new RegExp(this.getActiveBreakpointsList().map((e => "_" + e)).join("|") + "$")
                }
            }
            t.default = Breakpoints
        },
        9469: e => {
            "use strict";
            e.exports = function() {
                var e, t = Array.prototype.slice,
                    n = {
                        actions: {},
                        filters: {}
                    };

                function _removeHook(e, t, i, s) {
                    var o, r, a;
                    if (n[e][t])
                        if (i)
                            if (o = n[e][t], s)
                                for (a = o.length; a--;)(r = o[a]).callback === i && r.context === s && o.splice(a, 1);
                            else
                                for (a = o.length; a--;) o[a].callback === i && o.splice(a, 1);
                    else n[e][t] = []
                }

                function _addHook(e, t, i, s, o) {
                    var r = {
                            callback: i,
                            priority: s,
                            context: o
                        },
                        a = n[e][t];
                    if (a) {
                        var d = !1;
                        if (jQuery.each(a, (function() {
                                if (this.callback === i) return d = !0, !1
                            })), d) return;
                        a.push(r), a = function _hookInsertSort(e) {
                            for (var t, n, i, s = 1, o = e.length; s < o; s++) {
                                for (t = e[s], n = s;
                                    (i = e[n - 1]) && i.priority > t.priority;) e[n] = e[n - 1], --n;
                                e[n] = t
                            }
                            return e
                        }(a)
                    } else a = [r];
                    n[e][t] = a
                }

                function _runHook(e, t, i) {
                    var s, o, r = n[e][t];
                    if (!r) return "filters" === e && i[0];
                    if (o = r.length, "filters" === e)
                        for (s = 0; s < o; s++) i[0] = r[s].callback.apply(r[s].context, i);
                    else
                        for (s = 0; s < o; s++) r[s].callback.apply(r[s].context, i);
                    return "filters" !== e || i[0]
                }
                return e = {
                    removeFilter: function removeFilter(t, n) {
                        return "string" == typeof t && _removeHook("filters", t, n), e
                    },
                    applyFilters: function applyFilters() {
                        var n = t.call(arguments),
                            i = n.shift();
                        return "string" == typeof i ? _runHook("filters", i, n) : e
                    },
                    addFilter: function addFilter(t, n, i, s) {
                        return "string" == typeof t && "function" == typeof n && _addHook("filters", t, n, i = parseInt(i || 10, 10), s), e
                    },
                    removeAction: function removeAction(t, n) {
                        return "string" == typeof t && _removeHook("actions", t, n), e
                    },
                    doAction: function doAction() {
                        var n = t.call(arguments),
                            i = n.shift();
                        return "string" == typeof i && _runHook("actions", i, n), e
                    },
                    addAction: function addAction(t, n, i, s) {
                        return "string" == typeof t && "function" == typeof n && _addHook("actions", t, n, i = parseInt(i || 10, 10), s), e
                    }
                }
            }
        },
        3308: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const matchUserAgent = e => n.indexOf(e) >= 0,
                n = navigator.userAgent,
                i = !!window.opr && !!opr.addons || !!window.opera || matchUserAgent(" OPR/"),
                s = matchUserAgent("Firefox"),
                o = /^((?!chrome|android).)*safari/i.test(n) || /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && safari.pushNotification).toString(),
                r = /Trident|MSIE/.test(n) && !!document.documentMode,
                a = !r && !!window.StyleMedia || matchUserAgent("Edg"),
                d = !!window.chrome && matchUserAgent("Chrome") && !(a || i),
                l = matchUserAgent("Chrome") && !!window.CSS;
            var c = {
                appleWebkit: matchUserAgent("AppleWebKit") && !l,
                blink: l,
                chrome: d,
                edge: a,
                firefox: s,
                ie: r,
                mac: matchUserAgent("Macintosh"),
                opera: i,
                safari: o,
                webkit: matchUserAgent("AppleWebKit")
            };
            t.default = c
        },
        5107: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class _default extends elementorModules.Module {
                get(e, t) {
                    let n;
                    t = t || {};
                    try {
                        n = t.session ? sessionStorage : localStorage
                    } catch (t) {
                        return e ? void 0 : {}
                    }
                    let i = n.getItem("elementor");
                    i = i ? JSON.parse(i) : {}, i.__expiration || (i.__expiration = {});
                    const s = i.__expiration;
                    let o = [];
                    e ? s[e] && (o = [e]) : o = Object.keys(s);
                    let r = !1;
                    return o.forEach((e => {
                        new Date(s[e]) < new Date && (delete i[e], delete s[e], r = !0)
                    })), r && this.save(i, t.session), e ? i[e] : i
                }
                set(e, t, n) {
                    n = n || {};
                    const i = this.get(null, n);
                    if (i[e] = t, n.lifetimeInSeconds) {
                        const t = new Date;
                        t.setTime(t.getTime() + 1e3 * n.lifetimeInSeconds), i.__expiration[e] = t.getTime()
                    }
                    this.save(i, n.session)
                }
                save(e, t) {
                    let n;
                    try {
                        n = t ? sessionStorage : localStorage
                    } catch (e) {
                        return
                    }
                    n.setItem("elementor", JSON.stringify(e))
                }
            }
            t.default = _default
        },
        6046: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            class _default extends elementorModules.Module {
                constructor() {
                    super(), elementorFrontend.elementsHandler.attachHandler("text-path", (() => n.e(48).then(n.bind(n, 6468))))
                }
            }
            t.default = _default
        }
    },
    e => {
        "use strict";
        e.O(0, [354], (() => {
            return t = 5654, e(e.s = t);
            var t
        }));
        e.O()
    }
]);