$(document).ready(function () {







    $("#section1>div>div").mouseenter(function () {
        $(this).children("div:nth-of-type(2)").animate({
            width: "toggle"
        }, "fast");

        $(this).children("div:nth-of-type(2)").mouseleave(function () {
            $(this).fadeOut();
        });
    });




});









/* 비디오 슬라이드*/


var isVisible = false;

$(window).on('scroll', function () {
    if (checkVisible($('#web1')) && !isVisible) {
        document.getElementById("web1").className = "slidego";
    }

    if (checkVisible($('#web2')) && !isVisible) {
        document.getElementById("web2").className = "slidego";
    }

    if (checkVisible($('#web3')) && !isVisible) {
        document.getElementById("web3").className = "slidego";
    }

    if (checkVisible($('#web4')) && !isVisible) {
        document.getElementById("web4").className = "slidego";
    }

    if (checkVisible($('#web5')) && !isVisible) {
        document.getElementById("web5").className = "slidego";
    }

    if (checkVisible($('#web6')) && !isVisible) {
        document.getElementById("web6").className = "slidego";
    }





    /* 비디오 슬라이드 끝  */



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

});
