$(document).ready(function () {


    $("#header1>div:last-of-type ").hover(function () {
        $(this).stop().fadeToggle();
    });

});






var isVisible = false;

$(window).on('scroll', function () {

    /*///// 스킬점수 ///// */

    if (checkVisible($('.round')) && !isVisible) {
        function Circlle(el) {
            $(el).circleProgress({
                    fill: {
                        color: '#ff5c5c'
                    }
                })
                .on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
                });
        };
        Circlle('.round');

        $(".round").removeClass("round");
        $(".col-md-3>div").addClass("rounder", function () {

        });

    }
    /*///// 스킬점수끝  ///// */



});


//특정영역 이벤트2
function checkVisible(elm, eval) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}
