$(document).ready(function () {


    /*//////페이드 슬라이드////*/

    setInterval(fader, 3500);
    var i = 0;

    function fader() {
        if (i == 4) {
            $("#headerphotos>img").fadeIn("slow");
            i = 0;
        } else {
            $("#headerphotos>img").eq(i).fadeOut("slow");
            i++;
        }
    };



    /*//////사진클릭////*/


    $(".pp>div>a").click(function () {
        var photogo = $(this).children("img").attr("src");




        $("#bigphoto>div>a>img").attr("src", photogo);
        //alert("바보");
        $("#bigphoto").fadeIn();
    });

    /*//////사진닫기////*/
    $("#bigphoto>div>a").click(function () {
        $("#bigphoto").fadeOut();
    });






    /*
$("#header1>div:last-of-type ").hover(function(){
 $(this).stop().fadeToggle();
});*/

});
