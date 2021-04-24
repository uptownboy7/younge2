var isVisible = false;

$(window).on('scroll', function () {

	if (checkVisible($('#pho>div.pp')) && !isVisible) {
		setTimeout(function () {
			$(".pp>div").fadeIn().addClass("animated slideInUp");
		}, 550);
	}

	/* if (checkVisible($('#section8'))&&!isVisible) {
        setTimeout(function(){ 
 $(".pp>div").fadeIn().addClass("animated slideInUpSlow");     
        },700);
    }
    
    */


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

	if (checkVisible($('#skillIconWrapper')) && !isVisible) {

		$("#skillIcon1").addClass("slidego3");
		setTimeout(function () {
			$("#skillIcon1").css("opacity", "1")
		}, 500);
		$("#skillIcon2").addClass("slidego3");
		setTimeout(function () {
			$("#skillIcon2").css("opacity", "1")
		}, 500);
	}





	if (checkVisible($('#section9>div>h2>span')) && !isVisible) {
		setTimeout(function () {
			$("#section9>div>h2>span").addClass("animated jello");


		}, 1300);

	}


	if (checkVisible($('#section9>div>h2')) && !isVisible) {

		$("#section9>div>h2").addClass("animated slideInUp");

	}




	if (checkVisible($('#trig')) && !isVisible) {

		$("#sec1_2>div>h6").addClass("active");

		setTimeout(function () {
			$("#nav-placeholder").addClass("active");

			$("#sec1wrap>div>div").addClass("animated slideInUp");

			$("#sec1wrap>div>div").fadeIn();

		}, 200);

		setTimeout(function () {
			$("#section1 img").addClass("animated jello");

		}, 1300);

	}

	if (checkVisible($('#circleBar')) && !isVisible) {


		setTimeout(function () {
			$("#nav-placeholder").addClass("active");

			$("#sec1wrap>div>div").addClass("animated slideInUp");

			$("#sec1wrap>div>div").fadeIn();

		}, 200);

		setTimeout(function () {
			$("#section1 img").addClass("animated jello");

		}, 1300);

	}



	if (checkVisible($('#imake4')) && !isVisible) {

		$("#imake4").addClass("animated slideInUp");

	}

	if (checkVisible($('#imakesub4')) && !isVisible) {
		setTimeout(function () {
			$("#imake4>span").addClass("animated jello");
		}, 1000);

	}



	/*웹디자인 슬라이드*/

	if (checkVisible($('#portfolio-0')) && !isVisible) {
		$("#portfolio-0").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-1')) && !isVisible) {
		$("#portfolio-1").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-2')) && !isVisible) {
		$("#portfolio-2").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-3')) && !isVisible) {
		$("#portfolio-3").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-4')) && !isVisible) {
		$("#portfolio-4").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-5')) && !isVisible) {
		$("#portfolio-5").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-6')) && !isVisible) {
		$("#portfolio-6").addClass("slideUpSlow");
	}

	if (checkVisible($('#portfolio-7')) && !isVisible) {
		$("#portfolio-7").addClass("slideUpSlow");
	}


	/*animated rotateInUpRight*/

	/*웹디자인 슬라이드 끝*/


	/*///// 스킬점수 ///// */

	if (checkVisible($('.round')) && !isVisible) {
		function Circlle(el) {
			$(el).circleProgress({
					fill: {
						color: '#eb9258'
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






	if (checkVisible($('#whoo>h2')) && !isVisible) {

		$("#whoo>h2").addClass("animated slideInUp");

	}




	if (checkVisible($('#header1')) && !isVisible) {
		$("header").addClass("active");
	}

	if (checkVisible($('#section1')) && !isVisible) {
		$("header").addClass("active");
	}
	if (checkVisible($('#trig')) && !isVisible) {
		$("header").addClass("active");
	}
	if (checkVisible($('#section2')) && !isVisible) {
		$("header").addClass("active");
	}
	if (checkVisible($('#section3')) && !isVisible) {
		$("header").addClass("active");
	}
	if (checkVisible($('#section4')) && !isVisible) {
		$("header").addClass("active");
	}
	if (checkVisible($('#sectionweb')) && !isVisible) {
		$("header").addClass("active");
	}
	if (checkVisible($('#section6')) && !isVisible) {
		$("header").addClass("active");
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









$(document).ready(function () {


	/*에디토리얼*/
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
	/*에디토리얼 끝*/



	$("#movetxt").fadeIn();
	$("#movetxt").addClass("animated slideInUp");
	$("#movetxt3").fadeIn();
	$("#movetxt3").addClass("animated slideInUp");

	setTimeout(function () {
		$("#movetxt2").addClass("animated jello");
	}, 1000);



	/***** 사진팝업*****/
	$("#photo1>div>a").click(function () {
		var photoq = $(this).children().attr("src");
		//alert(pop1);
		console.log(photoq);
		var photoq2 = photoq.replace(".jpg", "_2.jpg");
		console.log(photoq2);
		$("#black").fadeIn();
		$("#pop img").attr("src", photoq2);
		$("#pop").fadeIn();

	});


	$("#pop a").click(function () {
		$("#pop").fadeOut();
		$("#black").fadeOut();

	});
	/*$("#black").click(function () {
	    $("#pop").fadeOut();
	    $("#black").fadeOut();

	}); */



});





/***** 능력치*****/




$(document).ready(function () {





	/*
	    
	    $("main>div").on('mousewheel',function(e){
	var wheel = e.originalEvent.wheelDelta;

	//스크롤값을 가져온다.
	if(wheel>0){
	//스크롤 올릴때
	$("#nav-placeholder").addClass("active");
	$("#nav-placeholder").stop().slideDown("fast");} else {
	//스크롤 내릴때
	$("#nav-placeholder").removeClass("active");
	 $("#nav-placeholder").stop().slideUp();
	}
	});
	    
	//제일 위로 올라오면 메뉴 등장
	$(window).scroll(function () {
	var height = $(document).scrollTop();

	    if(height == 0) {
	        $("#nav-placeholder").fadeIn();
	    }
	}); 

	        */






	/*옐로우*/
	$("#sectionweb>div>div").mouseenter(function () {
		$(this).children("div:nth-of-type(2)").animate({
			width: "toggle"
		}, "fast");



		$(this).children("div:nth-of-type(2)").mouseleave(function () {
			$(this).fadeOut();
		});
	});



	/*옐로우2*/



	$("#sectionweb>div").mouseenter(function () {

		$(".yellow").fadeOut();

	});

	$("body").mouseenter(function () {
		$(".yellow").fadeOut();
	});

	$("#sectionweb").mouseenter(function () {
		$(".yellow").fadeOut();
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





	/*
	
	var iiii = 2
	    setInterval(yello,3000)
	function yello() {
	    
	    if(iiii==0){

	    $(".yellow").fadeOut();
	        iiii=2;
	    }
	    else{
	        
	     $(".yellow").fadeOut();
	        iiii--;
	    }
	    
	    
	    
	}
	*/






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
