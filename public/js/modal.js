/*<![CDATA[*/
        jQuery('.rsParent > div > div').addClass('royalSlider rsDefaultInv slideContent rsHomeTempl');
        jQuery('.rsContainer > div').attr('data-move-effect', 'none');
        jQuery('.rsParent > div > div').removeClass('elementor-widget-wrap');
        jQuery(document).ready(function($) {
            var resize = function() {
                $('.slideContent').css({
                    width: '100%',
                    height: $(window).height()
                });
                $('#modal-ucapan > .elementor-container ').css({
                    height: $(window).height() - 60
                });
                $('.modal-box > .elementor-container ').css({
                    height: $(window).height() - 60
                });
                $('.modals > .elementor-container ').css({
                    height: $(window).height() - 60
                });
            };
            // trigger function on each page resize
            $(window).on('resize', resize);
            // update size on page load
            resize();
            // update size after initial change
            $('.slideContent').royalSlider('updateSliderSize', true);
            $('.royalSlider').royalSlider({
                imageScaleMode: 'fill',
                arrowsNav: false,
                imageAlignCenter: true,
                loop: false,
                numImagesToPreload: 15,
                loopRewind: true,
                slidesOrientation: 'vertical',
                controlNavigation: 'thumbnails',
                keyboardNavEnabled: true,
                navigateByClick: false,
                slidesSpacing: 0,
                transitionType: 'fade',
                allowCSS3: true,
                startSlideId: 0,
                enabled: true,
                globalCaption: false,
                block: {
                    delay: 400
                },
                thumbs: {
                    appendSpan: true,
                    firstMargin: false,
                    paddingBottom: 0
                }
            });
        });