! function(e) {
    e.fn.flexiaNav = function() {
        e(this).each(function() {
            var t = e(this);
            e(".nav-menu > li.menu-item-has-children", t).each(function() {
                e("> a", e(this)).append('<span class="parent-menu-dropdown-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"> <g> <g> <path d="M265.2,390.7l218.9-218.9c5.1-5.1,7.9-11.8,7.9-19s-2.8-14-7.9-19L468,117.5c-10.5-10.5-27.6-10.5-38.1,0L246.1,301.4 L62,117.3c-5.1-5.1-11.8-7.9-19-7.9c-7.2,0-14,2.8-19,7.9L7.9,133.5c-5.1,5.1-7.9,11.8-7.9,19s2.8,14,7.9,19L227,390.7 c5.1,5.1,11.9,7.9,19.1,7.8C253.3,398.5,260.1,395.8,265.2,390.7z"/> </g> </g> </svg></span>'), e(this).append('<span class="flexia-menu-indicator"></span>')
            }), e(".nav-menu > li ul li.menu-item-has-children", t).each(function() {
                e("> a", e(this)).append('<span class="submenu-menu-dropdown-icon"><svg version="1.1" viewBox="0 0 290 492" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(145 246) rotate(-90) translate(-246 -145)" fill="#000"><path d="m265.2 281.7 218.9-218.9c5.1-5.1 7.9-11.8 7.9-19s-2.8-14-7.9-19l-16.1-16.3c-10.5-10.5-27.6-10.5-38.1 0l-183.8 183.9-184.1-184.1c-5.1-5.1-11.8-7.9-19-7.9s-14 2.8-19 7.9l-16.1 16.2c-5.1 5.1-7.9 11.8-7.9 19s2.8 14 7.9 19l219.1 219.2c5.1 5.1 11.9 7.9 19.1 7.8 7.2 0 14-2.7 19.1-7.8z"/></g></g></svg></span>'), e(this).append('<span class="flexia-menu-indicator"></span>')
            }), e(".nav-menu", t).after('<button class="flexia-menu-toggle"></button>'), e(t).on("click", ".flexia-menu-toggle", function(t) {
                t.preventDefault(), "none" == e(this).toggleClass("flexia-menu-toggle-open").siblings(".nav-menu").css("display") ? e(this).siblings(".nav-menu").slideDown(300) : e(this).siblings(".nav-menu").slideUp(300)
            }), e(window).on("resize load", function() {
                window.matchMedia("(max-width: 991px)").matches ? e(".nav-menu", t).addClass("flexia-menu-responsive") : (e(".nav-menu", t).removeClass("flexia-menu-responsive"), e(".flexia-menu-toggle", t).removeClass("flexia-menu-toggle-open"), e(".flexia-menu-indicator", t).removeClass("flexia-menu-indicator-open"), e(".nav-menu, .nav-menu ul", t).css("display", ""))
            }), e(t).on("click", ".flexia-menu-indicator", function(t) {
                t.preventDefault(), e(this).toggleClass("flexia-menu-indicator-open"), e(this).hasClass("flexia-menu-indicator-open") ? e(this).siblings("ul").slideDown(300) : e(this).siblings("ul").slideUp(300)
            })
        })
    }
}(jQuery),
function(e) {
    e(document).ready(function() {
        e(".main-navigation").flexiaNav(), e(".topbar-navigation").flexiaNav()
    })
}(jQuery), jQuery(document).ready(function(e) {
        "use strict";
        var t = e(".flexia-back-to-top").data("start-scroll"),
            n = e(".flexia-back-to-top").data("scroll-speed"),
            i = e("a.flexia-back-to-top"),
            s = e(window);
        s.scroll(function() {
            s.scrollTop() > t ? e(i).css({
                opacity: "1",
                visibility: "visible"
            }) : e(i).css({
                opacity: "0",
                visibility: "hidden"
            })
        }), e(i).on("click", function(t) {
            t.preventDefault(), e("html, body").animate({
                scrollTop: 0
            }, n)
        }), e(".header-widget-toggle").on("click", function() {
            e(this).toggleClass("toggle-collapsed"), e(".flexia-header-widget-area").toggleClass("header-widget-open")
        }), s.scroll(function() {
            s.scrollTop() > 300 ? e(".toggle-collapsed").css({
                opacity: "0",
                visibility: "hidden"
            }) : e(".toggle-collapsed").css({
                opacity: "1",
                visibility: "visible"
            })
        }), e('.nav-menu a[href^="#"]:not([href="#"])').on("click", function(t) {
            t.preventDefault();
            var n = this.hash,
                i = e(n);
            return e("html, body").stop().animate({
                scrollTop: i.offset().top
            }, 800, "swing"), !1
        }), e("a.scroll-down, a.scroll-to-comments").on("click", function(t) {
            t.preventDefault();
            var n = e(".flexia-navbar-fixed-top").height(),
                i = this.hash,
                s = e(i);
            return e("html, body").stop().animate({
                scrollTop: s.offset().top - n
            }, 800, "swing"), !1
        }), e(window).scroll(function() {
            var t = e(window).scrollTop(),
                n = "flexia-navbar-static-top";
            if (e(".flexia-navbar").hasClass("flexia-navbar-fixed-top")) n = e(".flexia-navbar-fixed-top");
            else {
                if (!e(".flexia-navbar").hasClass("flexia-navbar-transparent-sticky-top")) return !1;
                n = e(".flexia-navbar-transparent-sticky-top")
            }
            t > 350 ? n.addClass("flexia-sticky-navbar") : n.removeClass("flexia-sticky-navbar")
        });
        var a = e(".header-content").height() + 200,
            o = e(window).height() / 2;
        if (o < a) var l = a;
        else l = o;
        e(".blog-header").css({
            height: l
        }), e(window).on("resize", function() {
            e(".blog-header").css({
                height: l
            }), e("body").css({
                width: e(window).width()
            })
        }), e(window).scroll(function(t) {
            var n;
            n = e(window).scrollTop(), e(".page-header.blog-header .header-content").css("margin-top", 0 - .8 * n + "px")
        }), e(window).load(function() {
            e(".flexia-menu-indicator").on("click", function(t) {
                t.preventDefault();
                const n = e(this).parent("li").find("a");
                e(this).css("height", n.innerHeight())
            })
        })
    }),
    function(e) {
        "use strict";
        var t = document.getElementById("btn-search"),
            n = document.getElementById("btn-search-close"),
            i = document.querySelector(".flexia-search-overlay"),
            s = document.querySelector(".search--input-wrapper"),
            a = document.querySelector(".search__input");

        function o() {
            i && (i.classList.add("search--open"), a.focus())
        }

        function l() {
            i.classList.remove("search--open"), a.blur(), a.value = "", s.setAttribute("data-text", "")
        }
        i && a.addEventListener("keyup", e => {
            s.setAttribute("data-text", e.target.value)
        }), t && (t.addEventListener("click", o), n.addEventListener("click", l), document.addEventListener("keyup", function(e) {
            27 == e.keyCode && l()
        }))
    }(window), /(trident|msie)/i.test(navigator.userAgent) && document.getElementById && window.addEventListener && window.addEventListener("hashchange", function() {
        var e, t = location.hash.substring(1);
        /^[A-z0-9_-]+$/.test(t) && (e = document.getElementById(t)) && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) || (e.tabIndex = -1), e.focus())
    }, !1),
    function(e) {
        "use strict";
        var t = parseInt(settings.archive_total_page) || "",
            n = parseInt(settings.archive_count) || "",
            i = e("#load-more-post-archive");

        function s(t) {
            e(t).magnificPopup({
                type: "image",
                gallery: {
                    enabled: !0
                }
            })
        }
        n > t && i.remove(), i.on("click", function(i) {
            if (i.preventDefault(), "undefined" != n && "" != n && "undefined" != t && "" != t) {
                if (n > t) return !1;
                a = n, o = e(this), l = {
                    action: "flexia_archive_load_more",
                    page_no: a,
                    posts_per_page: settings.archive_per_page,
                    nonce: settings.archive_nonce,
                    query_vars: settings.query_vars,
                    archiveLayout: settings.archive_layout,
                    archiveMasonryGridCols: settings.archive_masonry_grid_cols,
                    archivePostMetaPosition: settings.archive_post_meta_position,
                    archiveExcerptCount: settings.archive_excerpt_count,
                    archiveMagnificPopup: settings.archive_magnific_popup,
                    archiveLoadMoreText: settings.archive_load_more_text,
                    archiveLoadingText: settings.archive_loading_text
                }, e.ajax({
                    url: settings.ajax_url,
                    data: l,
                    type: "POST",
                    beforeSend: function(e) {
                        o.addClass("button--loading"), o.find("span").html(settings.archive_loading_text)
                    },
                    success: function(n) {
                        o.find("span").html(settings.archive_load_more_text), o.removeClass("button--loading"), e(".js-flexia-load-post").append(n), a >= t && o.remove(), "true" === settings.is_pro_active && 1 == settings.archive_magnific_popup && s(".flexia-magnific-popup"), "flexia_blog_content_layout_masonry" === settings.archive_layout && masonaryResize()
                    }
                }), n++
            }
            var a, o, l
        }), parseInt(settings.per_page, 10) >= parseInt(settings.posts_count, 10) && e("#load-more-post").remove(), e("#load-more-post").on("click", function() {
            var t = e(this);
            "true" === settings.is_pro_active && e.ajax({
                url: settings.ajax_url,
                data: {
                    action: "load_more_post_cat",
                    postType: "post",
                    categories: JSON.stringify(settings.selected_cats)
                },
                type: "POST",
                success: function(t) {
                    e(".flexia-post-filter-control").html("").prepend(t)
                }
            });
            var n = {
                action: "load_more_posts",
                blogLayout: settings.blog_layout,
                masonryGridCols: settings.masonry_grid_cols,
                blogMetaPosition: settings.post_meta_position,
                perPage: settings.per_page,
                offset: settings.offset,
                excerptCount: settings.excerpt_count,
                postsCount: settings.posts_count,
                magnificPopup: settings.magnific_popup,
                showFilter: settings.show_filter,
                showLoadMore: settings.show_load_more,
                loadMoreText: settings.load_more_text,
                loadingText: settings.loading_text,
                categories: JSON.stringify(settings.selected_cats)
            };
            e.ajax({
                url: settings.ajax_url,
                data: n,
                type: "POST",
                beforeSend: function(e) {
                    t.addClass("button--loading"), t.find("span").html(settings.loading_text)
                },
                success: function(n) {
                    t.find("span").html(settings.load_more_text), t.removeClass("button--loading"), e(".js-flexia-load-post").append(n), settings.offset = parseInt(settings.offset, 10) + parseInt(settings.per_page, 10), settings.offset >= settings.posts_count && t.remove(), "true" === settings.is_pro_active && 1 == settings.magnific_popup && s(".flexia-magnific-popup"), "flexia_blog_content_layout_masonry" === settings.blog_layout && masonaryResize()
                }
            })
        }), "true" === settings.is_pro_active && 1 == settings.magnific_popup && s(".flexia-magnific-popup"), "true" === settings.is_pro_active && 1 == settings.archive_magnific_popup && s(".flexia-magnific-popup")
    }(jQuery);