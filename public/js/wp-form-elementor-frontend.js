"use strict";
var WPFormsElementorFrontend = window.WPFormsElementorFrontend || function(o, t) {
    var i = {
        init: function() {
            i.events()
        },
        events: function() {
            t(o).on("elementor/popup/show", function(e, o, n) {
                var r = t("#elementor-popup-modal-" + o).find(".wpforms-form");
                r.length && i.initFields(r)
            })
        },
        initFields: function(e) {
            wpforms.ready(), "undefined" != typeof wpformsModernFileUpload && wpformsModernFileUpload.init(), "undefined" != typeof wpformsRecaptchaLoad && "undefined" != typeof grecaptcha && ("v3" === wpformsElementorVars.recaptcha_type ? grecaptcha.ready(wpformsRecaptchaLoad) : wpformsRecaptchaLoad()), t(o).trigger("wpforms_elementor_form_fields_initialized", [e])
        }
    };
    return i
}(document, (window, jQuery));
WPFormsElementorFrontend.init();