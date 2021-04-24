var isVisible = false;

$(window).on('scroll', function () {

    if (checkVisible($('#who')) && !isVisible) {

        $("#who").addClass("slidego");
        setTimeout(function () {
            $("#who").css("opacity", "1")
        }, 500);
    }

    if (checkVisible($('#who2')) && !isVisible) {

        $("#who2").addClass("slideup");
        setTimeout(function () {
            $("#who2").css("opacity", "1")
        }, 500);
    }

    if (checkVisible($('#who3')) && !isVisible) {

        $("#who3").addClass("slidego3");
        setTimeout(function () {
            $("#who3").css("opacity", "1")
        }, 500);
    }







    /*웹디자인 슬라이드*/
    if (checkVisible($('#web1')) && !isVisible) {
        $("#web1").addClass("animated rotateInUpLeft");
    }

    if (checkVisible($('#web2')) && !isVisible) {
        $("#web2").addClass("animated rotateInUpRight");
    }

    if (checkVisible($('#web3')) && !isVisible) {
        $("#web3").addClass("animated rotateInUpLeft");
    }

    if (checkVisible($('#web4')) && !isVisible) {
        $("#web4").addClass("animated rotateInUpRight");
    }


    /*웹디자인 슬라이드 끝*/






    if (checkVisible($('#whoo>h2')) && !isVisible) {

        $("#whoo>h2").addClass("animated slideInUp");

    }









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







/***** 능력치*****/




$(document).ready(function () {




    /*//////네비게이션////*/
    $("#menubutton").click(function () {
        $("#navmenu").fadeIn();
    });
    $("#menubutton2").click(function () {
        $("#navmenu").fadeOut();
    });


    $("#navpic div").hover(function () {
        $("#navpic div").stop().fadeToggle();

        $("#port>a").click(function () {
            $("#submenu").stop().slideToggle();
        });
    });

    /******마우스오버******/
    $("nav li a").mouseenter(function () {
        var ii = $(this).stop().addClass("active");

        $(this).stop().css("display", "none");
        $(ii).stop().fadeIn();
    });


    $("nav li a").mouseleave(function () {
        var ii2 = $(this).stop().removeClass("active");
        $(ii2).stop().css("display", "none");
        $(this).stop().fadeIn();
    });



    $("main>div").on('mousewheel', function (e) {
        var wheel = e.originalEvent.wheelDelta;

        //스크롤값을 가져온다.
        if (wheel > 0) {
            //스크롤 올릴때
            $("#topmenu").addClass("active");
            $("#topmenu").stop().slideDown("fast");
        } else {
            //스크롤 내릴때
            $("#topmenu").removeClass("active");
            $("#topmenu").stop().slideUp();
        }
    });

    //제일 위로 올라오면 메뉴 등장
    $(window).scroll(function () {
        var height = $(document).scrollTop();

        if (height == 0) {
            $("#topmenu").fadeIn();
        }
    });








    /*옐로우*/
    $("#section5>div>div").mouseenter(function () {
        $(this).children("div:nth-of-type(2)").animate({
            width: "toggle"
        }, "fast");

        $(this).children("div:nth-of-type(2)").mouseleave(function () {
            $(this).fadeOut();
        });
    });



    /*옐로우2*/



    $("#section5>div").mouseenter(function () {
        $("#yellow").fadeOut();
    });

    $("body").mouseenter(function () {
        $("#yellow").fadeOut();
    });

    $("#section5").mouseenter(function () {
        $("#yellow").fadeOut();
    });



    /*******포트폴리오 클릭*******/
    $("#port").click = function () {
        submenuu()
    };

    function submenuu() {
        var submenuu1 = $(".submenu").attr("display");
        console.log(submenuu1);
        if (submenuu1 == "block") {
            $(".submenu").fadeOut();
            $(".submenu").css("display", "none");
        } else {
            $(".submenu").fadeIn();
        }
    };


    $("#port").click(function () {
        $(this).parent("li").next("ul").fadeOut();
    });


});









$(document).ready(function () {

    /***** 글자 효과*****/
    $(".tagline").letterfx({
        "fx": "fall",
        "words": true,
        "timing": 200
    });
    /**************/

});









/*페이더*/
/*
      
    	setInterval(fader,4500);
    var g = 0;
	function fader(){ 
        if(g==4){
            $("#topimage>a").fadeIn();
            g = 0;
        } else{$("#topimage>a").eq(g).fadeOut();
        g++
        }
    }
    
    	setInterval(auto,4500);
    var i = 0;
	function auto(){ 
        if(i==4){
            $("#noimage>a").fadeIn();
            i = 0;
        }
	else{$("#noimage>a").eq(i).fadeOut();
        i++
        }
    }
        */
