$(document).ready(function () {




    $("#header1>div:last-of-type").hover(function () {
        $(this).stop().fadeOut(4000);
    });
    $("#header1>div:last-of-type").mouseleave(function () {
        $(this).stop();
    });




});
