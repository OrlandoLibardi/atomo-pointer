/**
 * Validador
 */
(function ($) {
    "use strict";
    $.fn.mouseAtomo = function (options) {
        var $el = $(this),
            defaults = {
                time: 10,
                negativeX: 15,
                negativeY: 25,
                hoverAnimate: true,
                timeLoad: 500
            },
            state = false,
            settings = $.extend({}, defaults, options);

        function init() {
            $el.append('<i class="pointer" id="pointer"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></i > ');
        }

        function mouseMoved(x, y) {
            $("#pointer").animate({
                left: eval(x - settings.negativeX) + "px",
                top: eval(y - settings.negativeY) + "px"
            }, 5);
        }

        /* Eventos */
        $el[0].addEventListener('mousemove', function (e) {
            if (state) window.clearTimeout(state);
            var moveX = e.clientX, moveY = e.clientY;
            state = setTimeout(function () {
                mouseMoved(moveX, moveY);
            }, settings.time);
        }, false);

        $(document).on("click", "a:not(.pointerExplode), button:not(.pointerExplode)", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.addClass("pointerExplode");
            $("#pointer").removeClass("hover").addClass("active");
            setTimeout(function () {
                $this[0].click();
            }, settings.timeLoad);
        });

        $("a, button").hover(function () {
            $("#pointer").addClass("hover");
        }, function () {
            setTimeout(function () {
                $("#pointer").removeClass("hover");
            }, 10);
        });

        return init();
    }
}(jQuery));
