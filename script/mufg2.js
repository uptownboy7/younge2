(function () {
	'use strict'
	// section fadeIn
	var fadeInSection = function () {
		var targetElm = document.getElementsByClassName('js-fadeIn'),
			windowH = window.innerHeight
		if (targetElm.length == 0) return
		var pxY = 200
		for (var i = 0; i < targetElm.length; i++) {
			var elm = targetElm[i]
			if (elm.classList.contains('js-fadeIn')) {
				var elmRect = elm.getBoundingClientRect()
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop
				var elmY = elmRect.top + scrollTop
				scrollTop > elmY - windowH + pxY && elm.classList.add('appeared');
			}
		}
	};
	// scroll
	window.addEventListener('scroll', function (e) {
		fadeInSection()
	})
})();
