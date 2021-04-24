$(document).ready(function () {


	$(".videopage").click(function(){
		$(".iconClick").fadeOut();
	});
	$("#video01").click(function(){
		$(".iconClick").fadeOut();
	});
	$("#video02").click(function(){
		$(".iconClick").fadeOut();
	});
	
		var devideHeight = $(".devide").outerWidth();
	
	if (matchMedia("screen and (min-width: 650px)").matches) {
		//$(".devide").height(0.5625 * devideHeight);
  // 1024px 이상에서 사용할 JavaScript
} else {
	//$(".devide").height(0.5625 * devideHeight);
  // 1024px 미만에서 사용할 JavaScript
}
	


	
});




/* 비디오 슬라이드*/

var isVisible = false;

$(window).on('scroll', function () {
	if (checkVisible($('#sec1h2_2')) && !isVisible) {
		$("#scrollDown").fadeOut(1000);
	}



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