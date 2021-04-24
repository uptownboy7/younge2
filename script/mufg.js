/* =================================================================
autoHeight
================================================================= */

var _autoHeight = function(options) {
	var _ = this

	_.curElm = options.targets
	_.deviceMode = true
	if (options.deviceMode) _.deviceMode = options.deviceMode

	var windowFlag

	var autoHeight = function(elm, n) {
		// pconly sponly 処理
		if (_.deviceMode !== true) {
			if (_.deviceMode == 'pconly' && windowFlag == 'spScreen' || _.deviceMode == 'sponly' && windowFlag == 'pcScreen') {
				var hRemoveElm = document.querySelectorAll(elm)
				for (var i = 0; i < hRemoveElm.length; i++) {
					hRemoveElm[i].removeAttribute('style')
				}
				return false
			}
		}

		var e = document.querySelectorAll(elm),
				h = [], c = 0
		if (!n) {n = e.length}
		for (var i = 0; i < e.length; i++) {
			e[i].removeAttribute('style')
		}
		for (var i = 0; i < e.length; i++) {
			h.push(e[i].clientHeight)
			c++
			if (c % n === 0) {
				var maxH = Math.max.apply(null, h)
				var maxRemH = maxH
				h = []
				for (var j = c - n; j < c; j++) {
					e[j].setAttribute('style', 'height: ' + maxRemH + 'px')
				}
			} else if (c === e.length) {
				var maxH = Math.max.apply(null, h)
				var maxRemH = maxH
				for (var j = c - c%n; j < c; j++) {
					e[j].setAttribute('style', 'height: ' + maxRemH + 'px')
				}
			}
		}
	}

	//resize
	var ahScreenW = 0
	var ahTimer = false
	var resizeFunc = function () {
		if (ahScreenW === window.innerWidth) return
		ahScreenW = window.innerWidth

		if (ahTimer !== false) {
			clearTimeout(ahTimer)
		}
		ahTimer = setTimeout(function() {
			if (ahScreenW <= 640) {
				windowFlag = 'spScreen'
			} else {
				windowFlag = 'pcScreen'
			}
			autoHeight(_.curElm)
		}, 200)
	}

	resizeFunc()

	window.addEventListener('resize', function(e) {
		resizeFunc()
  }, false)

};
(function(){
	window.addEventListener('load', function(){
		var classArr = []
		var elmClass = document.querySelectorAll('[class*=js-mHeight]')

		for(var i = 0; i < elmClass.length; i++) {
			var classVal = elmClass[i].getAttribute('class')
			var classVals = classVal.split(' ')
			for(var j = 0; j < classVals.length; j++) {
				if(classVals[j].match(/(?:^| )js-mHeight([0-9]+)(?: |$)/)) {
					if (classArr.indexOf(classVals[j]) == -1){
						classArr.push(classVals[j])
					}
				}
			}
		}

		if(classArr.length !== 0) {
			for(var i = 0; i < classArr.length; i++) {
				// classにPC・SP onlyがあればoption変更
				var dMode = true
				var curElm = document.getElementsByClassName(classArr[i])
				for(var j = 0; j < curElm.length; j++) {
					if (curElm[j].classList.contains('is-pconly')) dMode = 'pconly'
					if (curElm[j].classList.contains('is-sponly')) dMode = 'sponly'
				}

			// option変更
				var mHeightclass = '.' + classArr[i]
				new _autoHeight({
					targets: mHeightclass,
					deviceMode: dMode
				})
			}
		}
	})
})();

/* =================================================================
External link modal
================================================================= */
window.addEventListener('DOMContentLoaded', function(){
	var modalLink = document.querySelectorAll('[data-toggle="modal"]')
	if (modalLink.length > 0) {
		var timerID
		var html = '<div class="modalWrap modal-external-link"><input id="mwLink" type="checkbox" class="modalCheckbox"><div class="modalOverlay"><label for="mwLink" class="modalTrigger js-mwLinkClose"></label><div class="modalContent"><label for="mwLink" class="closeButton js-mwLinkClose"></label><div class="modalContentInner"><p class="mainText"><span id="callText"></span>のWEBサイトへ移動します。</p><p class="mainText2">※10秒後に自動的に遷移します。</p><div class="modalFooter"><p><a href="" class="btn03 js-mwLinkYes" target="_blank">はい</a></p><p><label for="mwLink" class="btn03 js-mwLinkClose">いいえ</label></p></div></div></div></div></div>'
		document.body.insertAdjacentHTML('beforeend', html)
		var modal = document.querySelector('.modal-external-link')

		for (var i = 0, len = modalLink.length; i < len; i++) {
			modalLink[i].addEventListener('click', function(e) {
				e.preventDefault()
				document.getElementById('mwLink').checked = true
				var text = e.currentTarget.getAttribute('data-bumperText')
				document.getElementById('callText').textContent = text
				var link = e.currentTarget.getAttribute('href')
				document.querySelector('.js-mwLinkYes').setAttribute('href', link)

				if (timerID) {
					clearTimeout(timerID)
				}
				timerID = setTimeout(function() {
					window.open(link, '_blank')
					document.getElementById('mwLink').checked = false
				}, 10000)
			}, false)
		}

		var close = document.querySelectorAll('.js-mwLinkClose')
		for (var i =0, len = close.length; i < len; i++) {
			close[i].addEventListener('click', function(e) {
				if (timerID) {
					clearTimeout(timerID)
				}
			})
		}

		document.querySelector('.js-mwLinkYes').addEventListener('click', function(e) {
			if (timerID) {
				document.getElementById('mwLink').checked = false
				clearTimeout(timerID)
			}
		})
	}
}, false);

/* =================================================================
================================================================= */

(function(){
	'use strict'

	// closest method
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector ||
																Element.prototype.webkitMatchesSelector
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this

			do {
				if (el.matches(s)) return el
				el = el.parentElement || el.parentNode
			} while (el !== null && el.nodeType === 1)
			return null
		}
	}

	// ヘッダー
	var headerNav = function() {
		var _ = this

		_.initials = {
			//screenState: '',
			screenSwitchFlag: '',
			headerElm: document.getElementById('headerArea'),
			hMenuBtmFlag: false,
			hMenuBtmElm: document.getElementsByClassName('js-hBtmBtn'),
			hMenuBtmCnt: document.getElementsByClassName('js-hBtmCnt'),
			hMenuBtmElmState: { target: [], state: '' },
			hMenuBtmCntState: { target: [], state: '' },
			gnavFlag: false,
			gnavElm: document.getElementsByClassName('js-gnavBtn'),
			gnavCnt: document.getElementsByClassName('js-gnavCnt'),
			gnavElmState: { target: '', state: '' },
			gnavCntState: { target: '', state: '' },
		}

		_.initials.screenSwitchFlag = window.innerWidth <= 640 ? 'sp' : 'pc'

		_.hTriggerFunc()
	}

	headerNav.prototype = {

		hTriggerFunc: function() {
			var _ = this

			// ヘッダー 検索・ログイン・MENU
			var targetMenuElm = document.getElementsByClassName('js-hBtmBtn')
			for (var i = 0; i < targetMenuElm.length; i++) {
				targetMenuElm[i].addEventListener('click', function(e){
					_.hMenuFunc(this)
				})
			}

			// グロナビ
			var targetGnavElm = document.getElementsByClassName('js-gnavBtn')
			for (var i = 0; i < targetGnavElm.length; i++) {
				targetGnavElm[i].addEventListener('click', function(e){
					_.hGnavFunc(this)
				})
			}

			// クローズボタン（メニュー・グロナビ）
			var targetCloseElm = document.getElementsByClassName('js-hCloseBtn')
			for (var i = 0; i < targetCloseElm.length; i++) {
				targetCloseElm[i].addEventListener('click', function(e){
					_.hResetFunc()
				})
			}

			// bgLayer
			var targetBgLayerElm = document.getElementsByClassName('js-hBgLayer')
			if (targetBgLayerElm.length > 0) {
				targetBgLayerElm[0].addEventListener('click', function(e){
					_.hResetFunc()
				})
			}

			//resize
			var screenW = 0
			var timer = false
			var resizeFunc = function () {
				if (screenW === window.innerWidth) return
				screenW = window.innerWidth

				if (timer !== false) {
					clearTimeout(timer)
				}
				timer = setTimeout(function() {
					if (screenW <= 640 && _.initials.screenSwitchFlag != 'sp') {
						_.initials.screenSwitchFlag = 'sp'
						_.hResetFunc()
					} else if (screenW > 640 && _.initials.screenSwitchFlag != 'pc') {
						_.initials.screenSwitchFlag = 'pc'
						_.hResetFunc()
					}
				}, 200)
			}

			window.addEventListener('resize', function(e) {
				resizeFunc()
			}, false)
		},

		// ヘッダー 検索・ログイン・MENU 表示切り替え
		hMenuFunc: function(elm) {
			var _ = this

			var targetBtn = elm
			var targetClass

			// 要素の表示・非表示
			if (targetBtn.classList.contains('is-search')) targetClass = 'is-search'
			if (targetBtn.classList.contains('is-login')) targetClass = 'is-login'
			if (targetBtn.classList.contains('is-menu')) targetClass = 'is-menu'

			_.initials.hMenuBtmElmState.target = []
			for (var i = 0; i < _.initials.hMenuBtmElm.length; i++) {
				if (_.initials.hMenuBtmElm[i].classList.contains(targetClass)) {
					_.initials.hMenuBtmElmState.target.push(_.initials.hMenuBtmElm[i])

					if (_.initials.hMenuBtmElm[i].classList.contains('is-open')) {
						_.initials.hMenuBtmElmState.state = false
						_.initials.hMenuBtmFlag = false
					} else {
						_.initials.hMenuBtmElmState.state = true
						_.initials.hMenuBtmFlag = true
					}
				} else {
					_.initials.hMenuBtmElm[i].classList.remove('is-open')
				}
			}
			_.initials.hMenuBtmCntState.target = []
			for (var i = 0; i < _.initials.hMenuBtmCnt.length; i++) {
				if (_.initials.hMenuBtmCnt[i].classList.contains(targetClass)) {
					_.initials.hMenuBtmCntState.target.push(_.initials.hMenuBtmCnt[i])

					if (_.initials.hMenuBtmCnt[i].classList.contains('is-open')) {
						_.initials.hMenuBtmCntState.state = false
					} else {
						_.initials.hMenuBtmCntState.state = true
					}
				} else {
					_.initials.hMenuBtmCnt[i].classList.remove('is-open')
				}
			}

			_.hStateFunc()
		},

		// グロナビ
		hGnavFunc: function(elm) {
			var _ = this

			var targetBtn = elm
			var targetWrap = targetBtn.closest('.js-gnavWrap')
			var targetCnt

			targetCnt = targetWrap.getElementsByClassName('js-gnavCnt')
			for (var i = 0; i < targetCnt.length; i++) {
				if(targetCnt[i].classList.contains('js-gnavCnt')){
					targetCnt = targetCnt[i]
					break
				}
			}

			for (var i = 0; i < _.initials.gnavElm.length; i++) {
				if (_.initials.gnavElm[i] == targetBtn) {
					_.initials.gnavElmState.target = _.initials.gnavElm[i]
					if (_.initials.gnavElm[i].classList.contains('is-open')) {
						_.initials.gnavElmState.state = false
						_.initials.gnavFlag = false
					} else {
						_.initials.gnavElmState.state = true
						_.initials.gnavFlag = true
					}
				} else {
					_.initials.gnavElm[i].classList.remove('is-open')
				}
			}
			for (var i = 0; i < _.initials.gnavCnt.length; i++) {
				if (_.initials.gnavCnt[i] == targetCnt) {
					_.initials.gnavCntState.target = _.initials.gnavCnt[i]
					if (_.initials.gnavCnt[i].classList.contains('is-open')) {
						_.initials.gnavCntState.state = false
					} else {
						_.initials.gnavCntState.state = true
					}
				} else {
					_.initials.gnavCnt[i].classList.remove('is-open')
				}
			}

			_.hStateFunc()
		},

		hStateFunc: function() {
			var _ = this

			// ヘッダー 検索・ログイン・MENU 表示切り替え
			if(_.initials.hMenuBtmElmState.target.length) {
				for (var i = 0; i < _.initials.hMenuBtmElmState.target.length; i++) {
					if (_.initials.hMenuBtmElmState.state) {
						_.initials.hMenuBtmElmState.target[i].classList.add('is-open')
					} else {
						_.initials.hMenuBtmElmState.target[i].classList.remove('is-open')
					}
				}
			}
			if(_.initials.hMenuBtmCntState.target.length) {
				for (var i = 0; i < _.initials.hMenuBtmCntState.target.length; i++) {
					if (_.initials.hMenuBtmCntState.state) {
						_.initials.hMenuBtmCntState.target[i].classList.add('is-open')
					} else {
						_.initials.hMenuBtmCntState.target[i].classList.remove('is-open')
					}
				}
			}
			// グロナビ
			if (!_.initials.gnavElmState.target == '') {
				if (_.initials.gnavElmState.state) {
					_.initials.gnavElmState.target.classList.add('is-open')
					_.initials.gnavCntState.target.classList.add('is-open')
				} else {
					_.initials.gnavElmState.target.classList.remove('is-open')
					_.initials.gnavCntState.target.classList.remove('is-open')
				}
			}

			// ヘッダー 表示・非表示判定
			if (_.initials.screenSwitchFlag == 'sp') {
				// メニューフラグ
				if (_.initials.hMenuBtmFlag == true) {
					_.initials.headerElm.classList.add('is-open')
				} else {
					_.initials.headerElm.classList.remove('is-open')
				}
			}
			if (_.initials.screenSwitchFlag == 'pc') {
				// メニューフラグ
				if (_.initials.hMenuBtmFlag == true) {
					_.initials.headerElm.classList.add('is-open')
				} else {
					_.initials.headerElm.classList.remove('is-open')
				}
				// グロナビフラグ
				if (_.initials.gnavFlag == true) {
					_.initials.headerElm.classList.add('is-gnavOpen')
				} else {
					_.initials.headerElm.classList.remove('is-gnavOpen')
				}
			}
		},

		hResetFunc: function() {
			var _ = this

			// メニュー
			if (!_.initials.hMenuBtmElmState.state == '' && _.initials.hMenuBtmElmState.state) {
				for (var i = 0; i < _.initials.hMenuBtmElmState.target.length; i++) {
					_.initials.hMenuBtmElmState.target[i].classList.remove('is-open')
				}
			}
			if (!_.initials.hMenuBtmCntState.state == '' && _.initials.hMenuBtmCntState.state) {
				for (var i = 0; i < _.initials.hMenuBtmCntState.target.length; i++) {
					_.initials.hMenuBtmCntState.target[i].classList.remove('is-open')
				}
			}
			if (_.initials.hMenuBtmFlag == true) {
				_.initials.headerElm.classList.remove('is-open')
			}
			_.initials.hMenuBtmElmState.target = []
			_.initials.hMenuBtmElmState.state = false
			_.initials.hMenuBtmFlag = false
			_.initials.hMenuBtmCntState.target = []
			_.initials.hMenuBtmCntState.state = false

			// グロナビ
			if (!_.initials.gnavElmState.state == '' && _.initials.gnavElmState.state) {
				_.initials.gnavElmState.target.classList.remove('is-open')
				_.initials.gnavCntState.target.classList.remove('is-open')
			}
			if (_.initials.gnavFlag == true) {
				_.initials.headerElm.classList.remove('is-gnavOpen')
			}
			_.initials.gnavElmState.target = ''
			_.initials.gnavElmState.state = false
			_.initials.gnavFlag = false
			_.initials.gnavCntState.target = ''
			_.initials.gnavCntState.state = false
		},
	}

	// footer accordion
	var footerAcd = function() {
		var _ = this

		_.initials = {
			targetSpAcdTit: [],
			targetSpAcdAll: '',
			targetWrap: '',
			targetBtn: '',
			targetCnt: '',
			innerAll: '',
			state: '',
    }

		_.initials.targetSpAcdAll = document.querySelectorAll('.js-fAcdTitle.is-fAcdSp')
		if (_.initials.targetSpAcdAll.length && !document.querySelectorAll('a[data-facdlink]').length) {
			for(var i = 0; i < _.initials.targetSpAcdAll.length; i++) {
				if (_.initials.targetSpAcdAll[i].querySelectorAll('a').length) {
					var targetLink = _.initials.targetSpAcdAll[i].querySelectorAll('a')[0].href
					_.initials.targetSpAcdAll[i].querySelectorAll('a')[0].dataset.facdlink = targetLink
					_.initials.targetSpAcdTit.push(_.initials.targetSpAcdAll[i].querySelectorAll('a')[0])
				}
			}
		}
		_.fCLinkFunc()

		_.fTriggerFunc()
	}

	footerAcd.prototype = {

		fTriggerFunc: function() {
			var _ = this

			var acdBtn = document.getElementsByClassName('js-fAcdTitle')
			for (var i = 0; i < acdBtn.length; i++) {
				acdBtn[i].addEventListener('click', function(e){
					_.fStateFunc(this)
				})
			}

			//resize
			var screenW = 0
			var timer = false
			var resizeFunc = function () {
				if (screenW === window.innerWidth) return
				screenW = window.innerWidth

				if (timer !== false) {
					clearTimeout(timer)
				}
				timer = setTimeout(function() {
					_.fCLinkFunc()
				}, 200)
			}

			window.addEventListener('resize', function(e) {
				resizeFunc()
			}, false)
		},

		// link change
		fCLinkFunc: function() {
			var _ = this

			if (window.innerWidth <= 640 && _.initials.targetSpAcdTit.length) {
				for(var i = 0; i < _.initials.targetSpAcdTit.length; i++) {
					_.initials.targetSpAcdTit[i].href = 'javascript:void(0)'
				}
			} else {
				for(var i = 0; i < _.initials.targetSpAcdTit.length; i++) {
					_.initials.targetSpAcdTit[i].href = _.initials.targetSpAcdTit[i].dataset.facdlink
				}
			}
		},

		// アコーディオン開閉
		fStateFunc: function(elm) {
			var _ = this

			_.initials.targetBtn = elm
			_.initials.targetWrap = _.initials.targetBtn.closest('.js-fAcdWrap')
			_.initials.innerAll = _.initials.targetWrap.querySelectorAll('.js-fAcdWrap')
			_.initials.acdWrapAll = _.initials.targetWrap.parentNode.children

			if (_.initials.targetBtn.classList.contains('is-fAcdSp') && window.innerWidth > 640) {
				return
			}

			if (_.initials.targetBtn.classList.contains('is-open')) {
				_.initials.state = 'open'
			} else {
				_.initials.state = 'close'
			}

			for (var i = 0; i < _.initials.targetWrap.children.length; i++) {
				if (_.initials.targetWrap.children[i].classList.contains('js-fAcdCnt')) {
					_.initials.targetCnt = _.initials.targetWrap.children[i]
					break
				}
			}

			if (_.initials.state == 'open') {
				_.initials.targetBtn.classList.remove('is-open')
				_.initials.targetCnt.classList.remove('is-open')
				_.fInnerCloseFunc()
			} else {
				_.fOtherCntCloseFunc()
				_.initials.targetBtn.classList.add('is-open')
				_.initials.targetCnt.classList.add('is-open')
			}
		},

		// 要素内のアコーディオンを全て閉じる
		fInnerCloseFunc: function() {
			var _ = this

			for (var i = 0; i < _.initials.innerAll.length; i++) {
				for (var j = 0; j < _.initials.innerAll[i].children.length; j++) {
					if (_.initials.innerAll[i].children[j].classList.contains('js-fAcdTitle') || _.initials.innerAll[i].children[j].classList.contains('js-fAcdCnt')) {
						_.initials.innerAll[i].children[j].classList.remove('is-open')
					}
				}
			}
		},

		// target以外のアコーディオンを閉じる
		fOtherCntCloseFunc: function() {
			var _ = this;
			for (var i = 0; i < _.initials.acdWrapAll.length; i++) {
				for (var j = 0; j < _.initials.acdWrapAll[i].children.length; j++) {
					if(_.initials.acdWrapAll[i].children[j].classList.contains('js-fAcdTitle') || _.initials.acdWrapAll[i].children[j].classList.contains('js-fAcdCnt')) {
						_.initials.acdWrapAll[i].children[j].classList.remove('is-open')
					}
				}

			}
		}
	}

	// スムーススクロール
	var smoothScrollFunc = function() {
		// ロード時 アンカー
		if (location.hash !== '') {
			var ancId = location.hash
			//document.documentElement.scrollTop = 0
			scrollFunc(ancId)
		}

		// アンカー
		var pagelink = document.querySelectorAll('a[href^="#"]:not(.js-noScroll)')

		for (var i = 0; i < pagelink.length; i++) {
			pagelink[i].addEventListener('click', function(e){
				e.preventDefault()
				anchorLinkFunc(this.getAttribute('href'))
				scrollFunc(this.getAttribute('href'))
			})
		}
	}

	// ロード時 アンカー
	var anchorLinkFunc = function(elm) {
		var curElm = ''
		if (location.hash !== '') {
			curElm = location.hash
		}
		if (elm) {
			curElm = elm
		}

		var tElm = document.getElementById(curElm.replace('#', ''))
		for(var i = 0; tElm; i++) {
			if (tElm === document) break
			if (tElm.classList.contains('js-loadAnc')) {
				for (var j = 0; j < tElm.children.length; j++) {
					if (tElm.children[j].tagName == 'INPUT') {
						tElm.children[j].checked = true
					}
				}
			}
			tElm = tElm.parentNode
		}
	}

	var scrollFunc = function(elm) {
		var timerID
		var href = elm.replace('#', '')

		if (document.getElementById(href)) {
			var elm = document.getElementById(href)
			var elmStyle = window.getComputedStyle(elm)
			if (elmStyle.display === 'none') {
				elm = elm.parentNode
			}
			var elmRect = elm.getBoundingClientRect()
			var elmY = elmRect.top + window.pageYOffset
		} else {
			var elmY = 0
		}
		var start = window.pageYOffset
		var end = elmY
		if (timerID) {
			clearInterval(timerID)
		}
		if (elmY < window.pageYOffset) {
			timerID = setInterval(function () {
				start = start - 30
				scrollTo(0, start)
				if (start < end) {
					scrollTo(0, end)
					clearInterval(timerID)
				}
			}, 1)
		} else {
			timerID = setInterval(function () {
				start = start + 30
				scrollTo(0, start)
				if (start > end) {
					scrollTo(0, end)
					clearInterval(timerID)
				}
			}, 1)
		}
	}

	// scroll ON・OFF系
	var hToggleClassFunc = function(elm, spv, pcv) { //(要素, spの値, pcの値)
		var currentElm = document.getElementsByClassName(elm),
		spVal = spv,
		pcVal = pcv,
		curVal

		if (currentElm.length == 0) return

		if (window.innerWidth <= 640) {
			curVal = spVal
		} else {
			curVal = pcVal
		}

		if (window.pageYOffset >= curVal) {
			currentElm[0].classList.add('is-release')
		} else {
			currentElm[0].classList.remove('is-release')
		}
	}

	// tab
	var tabCnt = function() {
		var _ = this

		_.initials = {
			currentBtn: '',
			currentWrap: '',
			currentId: '',
			innerListAll: '',
			innerBtnAll: '',
			innerCntAll: '',
			innerCntItemAll: [],
    }

		_.initialFunc()
		_.triggerFunc()
	}

	tabCnt.prototype = {

		// load時
		initialFunc: function() {
			var _ = this

			var tabListAll = document.getElementsByClassName('js-tabList')
			var tabBtnArr = []
			var tabBtnId
			var tabCntItem

			for (var i = 0; i < tabListAll.length; i++) {
				tabBtnArr.push(tabListAll[i].querySelectorAll('.js-tabBtn')[0])
			}

			for (var i = 0; i < tabBtnArr.length; i++) {
				tabBtnArr[i].classList.add('is-open')
				tabBtnId = tabBtnArr[i].getAttribute('href').replace('#', '')
				tabCntItem = document.getElementById(tabBtnId)
				tabCntItem.classList.add('is-open')
			}
		},

		triggerFunc: function() {
			var _ = this

			var tabBtn = document.getElementsByClassName('js-tabBtn')
			for (var i = 0; i < tabBtn.length; i++) {
				tabBtn[i].addEventListener('click', function(e){
					e.preventDefault()
					_.tabCntFunc(this)
				})
			}
		},

		tabCntFunc: function(elm) {
			var _ = this

			if (elm.classList.contains('is-open')) return;

			_.initials.currentBtn = elm
			_.initials.currentId = _.initials.currentBtn.getAttribute('href').replace('#', '')
			_.initials.currentWrap = _.initials.currentBtn.closest('.js-tabWrap')
			for (var i = 0; i < _.initials.currentWrap.children.length; i++) {
				if (_.initials.currentWrap.children[i].classList.contains('js-tabList')) {
					_.initials.innerListAll = _.initials.currentWrap.children[i]
				}
				if (_.initials.currentWrap.children[i].classList.contains('js-tabContent')) {
					_.initials.innerCntAll = _.initials.currentWrap.children[i]
				}
			}
			_.initials.innerBtnAll = _.initials.innerListAll.querySelectorAll('.js-tabBtn')
			for (var i = 0; i < _.initials.innerCntAll.children.length; i++) {
				if (_.initials.innerCntAll.children[i].classList.contains('js-tabCntItem')) {
					_.initials.innerCntItemAll.push(_.initials.innerCntAll.children[i])
				}
			}

			_.stateFunc();
		},

		stateFunc: function() {
			var _ = this

			// button
			for (var i = 0; i < _.initials.innerBtnAll.length; i++) {
				_.initials.innerBtnAll[i].classList.remove('is-open')
			}
			_.initials.currentBtn.classList.add('is-open')

			// content
			for (var i = 0; i < _.initials.innerCntItemAll.length; i++) {
				_.initials.innerCntItemAll[i].classList.remove('is-open')
				if (_.initials.innerCntItemAll[i].id == _.initials.currentId) {
					_.initials.innerCntItemAll[i].classList.add('is-open')
				}
			}

			_.initials.innerCntItemAll = []
		}
	}

	// 画像拡大
	var magnifyImgBoxSet = function(){
		var magnifyImgBox = document.querySelectorAll('.magnifyImgBox')
		if (magnifyImgBox.length > 0) {
			for (var i = 0, len = magnifyImgBox.length; i < len; i++) {
				var img = magnifyImgBox[i].querySelector('.magnifyImg')
				var a = magnifyImgBox[i].querySelector('.magnifyBtn a')
				if (img && a) {
					if (img.getAttribute('data-src') !== null) {
						a.setAttribute('href', img.getAttribute('data-src'))
					} else {
						a.setAttribute('href', img.getAttribute('src'))
					}
				}
			}
		}
	}

	// referrer
	var setReferrer = function() {
		var btnBack = document.querySelectorAll('.jsBraBtnBack')
		if (btnBack.length > 0) {
			var referrer = document.referrer
			for (var i = 0, len = btnBack.length; i < len; i++) {
				if (referrer !== '') {
					btnBack[i].addEventListener('click', function(e) {
						e.preventDefault()
						location.href = referrer
					}, false)
				} else {
					btnBack[i].classList.add('is-disabled')
				}
			}
		}
	}

	// header current
	var headerCurrent = function() {
		if (document.querySelector('.headerGnavCnt') !== null) {
			var pathname = location.pathname
			var result = []
			var index = []
			var list = document.querySelectorAll('.headerGnavCnt .gnavList .list')
			var categoryHref = ''

			if (document.querySelector('.breadcrumbsList') !== null && document.querySelectorAll('.breadcrumbsItem').length > 2) {
				var item = document.querySelectorAll('.breadcrumbsItem')
				result = item[1].querySelector('a').getAttribute('href').match(/.*\//)
				categoryHref = result[0]
			} else {
				result = pathname.match(/.*\//)
				categoryHref = result[0]
			}

			for (var i = 0, len = list.length; i < len; i++) {
				var r
				if (list[i].className.indexOf('js-gnavWrap') > -1) {
					var h = list[i].querySelector('.gnavHeadingA01 .hArrowBtn01').getAttribute('href')
					r = h.match(/.*\//)
					if (r !== null && categoryHref.indexOf(r[0]) > -1) {
						var temp = {
							index: i,
							href: h,
							r: r[0]
						}
						index.push(temp)
					}
				} else {
					var h = list[i].querySelector('.gnavTitle').getAttribute('href')
					r = h.match(/.*\//)
					if (r !== null && categoryHref.indexOf(r[0]) > -1) {
						var temp = {
							index: i,
							href: h,
							r: r[0]
						}
						index.push(temp)
					}
				}
			}

			if (index.length > 0) {
				var hreflength = index[0].href.length
				var target
				for (var i = 0, len = index.length; i < len; i++) {
					if (pathname === index[i].href) {
						target = index[i]
						break
					}
					if (hreflength > result[0].replace(index[i].r, '').length) {
						hreflength = result[0].replace(index[i].r, '').length
						target = index[i]
					}
				}
				if (target !== undefined) {
					if (list[target.index].className.indexOf('js-gnavWrap') > -1) {
						list[target.index].querySelector('.gnavTitle').classList.add('is-current')
					} else {
						list[target.index].classList.add('is-current')
					}
				}
			}
		}
	}

	// sideNavi current
	var sideNaviCurrent = function() {
		var sideNavi = document.getElementById('sideNavi')
		if (sideNavi !== null) {
			var pathname = location.pathname
			if (pathname.match(/\/$/)) {
				pathname += 'index.html'
			}
			var link = sideNavi.querySelectorAll('a')
			for (var i = 0, len = link.length; i < len; i++) {
				if (link[i].getAttribute('href') === pathname) {
					link[i].classList.add('is-current')
					// 5階層確認
					var parent = link[i].parentNode.parentNode.parentNode
					if (parent.parentNode.parentNode.className.indexOf('is-open') > -1) {
						parent.querySelector('a').classList.add('is-current')
					}
					break
				}
			}
		}
	}

	// phone number
	var setPhoneNumberLink = function() {
		var phoneNumberLink = document.querySelectorAll('a[href^="tel:"]')
		if (phoneNumberLink.length > 0) {
			for (var i = 0, len = phoneNumberLink.length; i < len; i++) {
				if (phoneNumberLink[i].textContent !== '') {
					var n = phoneNumberLink[i].textContent.replace(/[\n\t 　\-－]/g, '')
					n = n.replace(/[０-９]/g, function(s) {
						return String.fromCharCode(s.charCodeAt(0) - 65248);
					})
					phoneNumberLink[i].setAttribute('href', 'tel:' + n)
					if (phoneNumberLink[i].hasAttribute('data-telno')) {
						phoneNumberLink[i].setAttribute('data-telno', n)
					}
				}
			}
		}
	}

	// accordion open
	var accordionOpen = function() {
		var param = location.search
		if (param.indexOf('acc=open') > -1) {
			var acc = document.querySelectorAll('.acdCheck')
			for (var i = 0, len = acc.length; i < len; i++) {
				acc[i].checked = true
			}
		}
	}

	// pageTop btn
	var pageTopBtn = function() {
		var fixedNav = document.querySelectorAll('.js-sideFixItem')
		if(fixedNav.length > 0) {
			var btn = document.getElementById('pageTopArea');
			var chatbot = document.getElementById('chatbot');
			if(btn) {
				btn.classList.add('fixedNavPage')
			}
			if(chatbot) {
				chatbot.classList.add('fixedNavPage')
			}
		}
	}

	// section fadeIn
	var fadeInSection = function(){
		var	targetElm = document.getElementsByClassName('js-fadeIn'),
		windowH = window.innerHeight
		if (targetElm.length == 0) return
		var pxY = 200
			for(var i = 0; i < targetElm.length; i++){
				var elm = targetElm[i]
				if(elm.classList.contains('js-fadeIn')){
					var elmRect = elm.getBoundingClientRect()
					 var scrollTop = window.pageYOffset || document.documentElement.scrollTop
					 var elmY = elmRect.top + scrollTop
					scrollTop > elmY - windowH + pxY && elm.classList.add('appeared');
				}
			}
	};
	// DOMContentLoaded
	window.addEventListener('DOMContentLoaded', function(){
		headerCurrent()
		sideNaviCurrent()
		magnifyImgBoxSet()
		setPhoneNumberLink()
		setReferrer()
		accordionOpen()
		pageTopBtn()
	}, false)

	// load
	window.addEventListener('load', function(){
		new headerNav()
		new footerAcd()
		anchorLinkFunc()
		resizeFunc()
		smoothScrollFunc()
		new tabCnt()
	})

	//resize
	var generalScreenW = 0
	var timer = false
	var resizeFunc = function () {
		if (generalScreenW === window.innerWidth) return
		generalScreenW = window.innerWidth

		if (timer !== false) {
			clearTimeout(timer)
		}
		timer = setTimeout(function() {

		}, 200)
	}

	window.addEventListener('resize', function(e) {
    resizeFunc()
  }, false)

	// scroll
	window.addEventListener('scroll', function(e) {
    hToggleClassFunc('js-sideFixItem', 300, 750)
		hToggleClassFunc('js-pageTop', 300, 750)
		hToggleClassFunc('launcher', 300, 750)
		fadeInSection()
  })

})();
/* =================================================================
loan配下
================================================================= */
function openScreen(url){
	w2 = screen.availWidth;
	h2 = screen.availHeight;
	var appWin2 = window.open(url,'ent','width='+w2+',height='+h2+',left=0,top=0,scrollbars=1,resizable=1,toolbar=0,menubar=0,location=1,status=0');
	appWin2.resizeTo(w2,h2);
}
function openSim(url){
	var w1 = window.open(url,"","width=900,scrollbars=1,resizable=1,toolbar=1,menubar=1,location=1,status=1");
	w1.focus();
}
/* =================================================================
slick
================================================================= */
(function ($) {
	'use strict'

  var Ctrl = (function () {
		var _func = {},

		// SP時会員ヘッダークリックでのアコーディオン開閉
		_memberAccClick = function() {
			var targetElm = '.js-memberAcc';

			$(targetElm).on('click', function() {
				if (window.innerWidth <= 640) $('.js-hBtmBtn.is-menu').click();
			});
		},

		// カルーセル バナー
    _bnrCarouselSet = function () {
			var targetElm = '.js-bnrCarousel03'
			var targetElmMv = '.js-bnrCarouselMv'
			var targetElm01 = '.js-bnrCarousel01'
			var targetElm04 = '.js-bnrCarousel04'
			var targetElm05 = '.js-bnrCarousel05'
			var targetElmSp = '.js-bnrCarouselSp'
			// ロード時 ランダム処理
			if ($(targetElm).hasClass('is-carouselRandom')) {
				var targetChildElm = $(targetElm).children('*'),
				targetLen = targetChildElm.length

				targetChildElm.each(function() {
					targetChildElm.eq(Math.floor(Math.random() * targetLen)).prependTo($(targetElm))
				})
			}
			// SP用setting
			var slickSetting = {
					autoplay: true,
					autoplaySpeed: 5000,
					infinite: true,
					dots: true,
					speed: 500,
					prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span>前へ</span></button>',
					nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span>次へ</span></button>',
					slidesToShow: 1,
					centerMode: true,
					centerPadding: '25px'
			}
			// 初回
			if(window.innerWidth <= 640){
				$(targetElmSp).slick(slickSetting);
			}
			// リサイズ時
			$(window).resize(function(){
				if(window.innerWidth <= 640){
					$(targetElmSp).not('.slick-initialized').slick(slickSetting);
				} else {
					$('.js-bnrCarouselSp.slick-initialized').slick('unslick')
				}
			})
// 3カラム
      $(targetElm).slick({
				autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        dots: true,
        speed: 500,
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span>前へ</span></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span>次へ</span></button>',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 640,
            settings: {
							slidesToShow: 1,
							centerMode: true,
							centerPadding: '25px'
            }
          }
        ]
			});
			$(targetElm05).slick({
				autoplay: true,
				autoplaySpeed: 5000,
				infinite: true,
				dots: true,
				speed: 400,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span>前へ</span></button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span>次へ</span></button>',
				slidesToShow: 3,
				responsive: [
				  {
					breakpoint: 640,
					settings: {
					  slidesToShow: 1
					}
				  }
				]
					});
			// MV用
			$(targetElmMv).slick({
			autoplay: true,
					autoplaySpeed: 5000,
					infinite: true,
					dots: true,
					speed: 600,
					prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span>前へ</span></button>',
					nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span>次へ</span></button>',
			slidesToShow: 1,
			centerMode: true,
			centerPadding: '0px',
			variableWidth: true,
					responsive: [
						{
							breakpoint: 640,
							settings: {
					slidesToShow: 1
							}
						}
					]
			});
			// 1カラム
			$(targetElm01).slick({
				autoplay: true,
						autoplaySpeed: 5000,
						infinite: true,
						dots: true,
						speed: 600,
						prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span>前へ</span></button>',
						nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span>次へ</span></button>',
				slidesToShow: 1,
						responsive: [
							{
								breakpoint: 640,
								settings: {
						slidesToShow: 1
								}
							}
						]
				});
				//4カラム
			$(targetElm04).slick({
				autoplay: true,
				autoplaySpeed: 5000,
				infinite: true,
				dots: true,
				speed: 400,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><span>前へ</span></button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span>次へ</span></button>',
				slidesToShow: 4,
				responsive: [
					{
						breakpoint: 640,
						settings: {
						slidesToShow: 1,
						variableWidth: false,
						centerMode: false
								}
					}
				]
			});
		}

    // public
    _func = {
	    bnrCarouselSet: _bnrCarouselSet,
			memberAccClick: _memberAccClick
    }
    return _func
  }())

  $(function () {
    Ctrl.bnrCarouselSet();
		Ctrl.memberAccClick();
	})
}(jQuery));
/* =================================================================
================================================================= */
window.addEventListener('DOMContentLoaded', function(){
// MVレイアウト調整用 記述位置は移動させる
var mvImgC = document.querySelector('.js-mvImg img')
var mvImgPc01 = document.querySelector('.js-mvImg .pcOnly')
var mvImgPc02 = document.querySelector('.js-mvImg .pcDisplay')
var mvImgPc03 = document.querySelector('.js-mvImg .isPc')
var mvImg = mvImgPc01 || mvImgPc02 || mvImgPc03 || mvImgC
var setCardKeyVisualBg = function () {
	var positionX = (window.innerWidth - 1120) / 2
	mvImg.setAttribute('style', 'width: calc(100% - ' + positionX + 'px)')
}

if (window.innerWidth > 1279) {
	if (mvImg) {
		setCardKeyVisualBg()
	}
} else {
	if (mvImg) {
		mvImg.removeAttribute('style')
	}
}

window.addEventListener('resize', function(e) {
	if (window.innerWidth > 1279) {
		if (mvImg) {
			setCardKeyVisualBg()
		}
	} else {
		if (mvImg) {
			mvImg.removeAttribute('style')
		}
	}
}, false)})