$(function () {
	/*============================================================================================
	スクリプト実行
	=============================================================================================*/
	/* PC / SP共通実行
	=====================================================*/
	$(function () {
		//PC / SP共通で実行するスクリプト関数をここに追記
		HambMenu();
		Accordion();
		ChangeTab();
		ScrollAppear();
		Slider();
		FadeIn();
		Modal();
		Loading();
		AfterLoad();
		Gdpr();
	});

	/* ブレイクポイントに基づく実行振り分け
	=====================================================*/
	var breakpoint = 896;
	var mql1 = window.matchMedia("screen and (max-width: " + breakpoint + "px)");
	function checkBreakPoint(mql1) {
		if (mql1.matches) {
			//896px以下でのみ実行するスクリプト関数をここに追記
			$("html").removeClass("pc");
			$("html").addClass("sp");
			device = "sp";
		} else {
			//896px以上でのみ実行するスクリプト関数をここに追記
			$("html").removeClass("sp");
			$("html").addClass("pc");
			device = "pc";
		}
	}
	// ブレイクポイントの瞬間に発火
	mql1.addListener(checkBreakPoint);
	// 初回チェック
	checkBreakPoint(mql1);

	/* スマホの向きに基づく実行振り分け
	=====================================================*/
	var mql2 = window.matchMedia("(orientation: portrait)");
	function orientationChange(mql2) {
		if (mql2.matches) {
			// 画面が縦長い（縦向き）時に実行するスクリプト関数をここに追記
		} else {
			// 画面が横長い（横向き）時に実行するスクリプト関数をここに追記
		}
	}

	switch (true) {
		case $.browser.smart:
		case $.browser.android || $.browser.iphone:
		default:
			//PC表示時のみ
			mql2.addListener(orientationChange);
			orientationChange(mql2);
	}

	/*============================================================================================
	For PC&SP
	=============================================================================================*/
	/* ハンバーガーメニュー
	=====================================================*/
	function HambMenu() {
		//表示のリセット処理
		var breakpoint = 896;
		var mql = window.matchMedia("screen and (max-width: " + breakpoint + "px)");
		function checkBreakPoint(mql) {
			if (mql.matches) {
				$("html").removeClass("u_scrollPrevent");
				$(".js_hamb").removeClass("js_open");
				$(".js_sldNav").css("display", "none");
			} else {
				$("html").removeClass("u_scrollPrevent");
				$(".js_hamb").removeClass("js_open");
				$(".js_sldNav").css("display", "");
			}
		}
		mql.addListener(checkBreakPoint);
		checkBreakPoint(mql);

		$(".js_hamb").on("click", function (event) {
			var mql = window.matchMedia("screen and (max-width: " + breakpoint + "px)");
			if (mql.matches) {
				event.stopPropagation();
				$("html").toggleClass("u_scrollPrevent");
				$(this).toggleClass("js_open");
				$(".js_sldNav").slideToggle(); //上から
				// $(".js_sldNav").fadeToggle(); //フェードイン
			}
		});
	}

	/* アコーディオンメニュー
	=====================================================*/
	function Accordion() {
		// 表示のリセット処理
		// 以下の3行は、レスポンシブ幅の変化によって表示状態が変わらないデザイン（常に開閉状態が固定されているなど）の場合は不要なので、削除またはコメントアウトしてください。
		$(window).on("load resize", function () {
			$(".js_acd").removeClass("js_open");
		});


		// クリック時上下スライド
		$(".js_acd").on("click", function () {
			$(this).toggleClass("js_open");
			$(this).find(".js_acd_trg").stop().slideToggle();
			// $(this).find('.js_acd_trg').stop().fadeToggle(); //フェードイン
		});

		//ホバー時上下スライド
		// $(".js_acd").on({
		// 	"mouseenter": function(){
		// 		if (!$(this).hasClass("js_open")) {
		// 			$(this).addClass("js_open");
		// 			$(this).find(".js_acd_trg").stop().slideToggle();
		// 			// $(this).find('.js_acd_trg').stop().fadeToggle(); //フェードイン
		// 		}
		// 	},
		// 	"mouseleave": function(){
		// 		if ($(this).hasClass("js_open")) {
		// 			$(this).removeClass("js_open");
		// 			$(this).find(".js_acd_trg").stop().slideToggle();
		// 			// $(this).find('.js_acd_trg').stop().fadeToggle(); //フェードイン
		// 		}
		// 	}
		// });

		//ブレイクポイントで処理を切り分ける場合 ここから ---------------------
		// var middleDevice = 896;
		// $(".js_acd").hover(function () {
		//   var mql = window.matchMedia("screen and (max-width: " + middleDevice + "px)");
		//   if (!mql.matches) {
		//     $(this).toggleClass("js_open");
		//     $(this).find(".js_acd_trg").stop().slideToggle();
		//   }
		// });

		// $(".js_acd").on("click", function () {
		//   var mql = window.matchMedia("screen and (max-width: " + middleDevice + "px)");
		//   if (mql.matches) {
		//     $(this).toggleClass("js_open");
		//     $(this).find(".js_acd_trg").stop().slideToggle();
		//   }
		// });
		//ブレイクポイントで処理を切り分ける場合 ここまで ---------------------
	}

	/* タブ切り替え
	=====================================================*/
	function ChangeTab() {
		$(".js_view").hide();
		$(".js_view.js_crnt").show();

		$(".js_tab").on("click", function () {
			const parent = $(this).closest(".js_view_wrap");
			parent.find(".js_crnt").removeClass("js_crnt");
			$(this).addClass("js_crnt");

			const index = $(this).index();
			parent.find(".js_view").hide().eq(index).fadeIn();
		});
	}

	/* スクロール位置によるフェードイン・アウト設定
	=====================================================*/
	function ScrollAppear() {
		$(window).on("scroll load", function () {
			var limit = 200;
			var target = $(".js_scrollAppear");

			if ($(this).scrollTop() > limit) {
				target.addClass("js_show");
			} else {
				target.removeClass("js_show");
			}

			//固定の位置で止めたい場合
			var docHeight = $(document).height();
			var scrollHeight = $(window).height() + $(window).scrollTop();
			var fixPosition = $(".footer").innerHeight();

			if (docHeight - scrollHeight <= fixPosition) {
				$(target).addClass("js_stc");
			} else {
				$(target).removeClass("js_stc");
			}
		});
	}

	/* スライダー設定
	=====================================================*/
	function Slider() {
		swiper = new Swiper(".js_slider", {
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			loop: true,
			// effect: "fade",
			speed: 1500,
			navigation: {
				nextEl: ".js_slider_arrow__next",
				prevEl: ".js_slider_arrow__prev",
			},
			pagination: {
				el: ".js_slider_dots",
			},
		});
	}

	/* フェードイン
	=====================================================*/
	function FadeIn() {
		$(window).on("load scroll", function () {
			var box = $(".js_fadeIn");
			var active = "js_active";

			box.each(function () {
				var breakpoint = 896;
				var mql = window.matchMedia("screen and (max-width: " + breakpoint + "px)");
				function checkBreakPoint(mql) {
					if (mql.matches) {
						var margin = 100;
					} else {
						var margin = 100;
					}

					var boxOffset = $(this).offset().top;
					var scrollPos = $(window).scrollTop();
					var wh = $(window).height();

					if (scrollPos > boxOffset - wh + margin) {
						$(this).addClass(active);
					}
				}
				mql.addListener(checkBreakPoint);
				checkBreakPoint(mql);
			});
		});
	}

	/* モーダル
	=====================================================*/
	function Modal() {
		$(".js_modal_open").each(function () {
			$(this).on("click", function () {
				var target = $(this).data("target");
				var modal = document.getElementById(target);
				$(modal).fadeIn();
				return false;
			});
		});

		$(".js_modal_close").on("click", function () {
			$(".js_modal").fadeOut();
			return false;
		});
	}

	/* ローディング
	=====================================================*/
	function Loading() {
		$("html").removeClass("js_appear");
		$("html").addClass("u_scrollPrevent");

		if ($(".js_loading").length) {
			function loaderClose() {
				$(".js_loading").fadeOut(1000);
			}

			if ($(".js_loading").hasClass(".js_loading__page")) {
				setTimeout(loaderClose, 500);
			} else {
				setTimeout(loaderClose, 1000);
			}

			$("html").removeClass("u_scrollPrevent");
			$("html").addClass("js_appear");
		}

		// lottieのローディングアニメーションを設定する場合は以下有効化
		// var animationTivel = lottie.loadAnimation({
		// 	container: document.getElementById("loader"),
		// 	renderer: "svg",
		// 	loop: false,
		// 	autoplay: true,
		// 	path: "", //画像ファイルパス
		// });
	}

	/* 読み込み時の表示崩れ非表示
	=====================================================*/
	function AfterLoad() {
		$(".js_hide").each(function () {
			$(this).fadeIn(0);
		});
	}

	/* GDPR
	=====================================================*/
	function Gdpr() {
		if ($.cookie("gdprcheckflag")) {
		} else {
			// console.log('the medicalcheckflag is already exists');
			$(".js_gdpr")
				.delay(1500)
				.queue(function () {
					$(this).slideToggle(300).dequeue();
				});
			$(".js_gdpr_close").click(function () {
				$(".js_gdpr").slideToggle(function () {
					// console.log('the medicalcheckflag is already exists');
					// date = new Date();
					// date.setTime( date.getTime() + ( 1 * 60 * 1000 ));
					// $.cookie("gdprcheckflag", "1 minutes", { expires: date, path: '/', secure: true });
					$.cookie("gdprcheckflag", "30 days", {
						expires: 30,
						path: "/",
						secure: true,
					});
				});
			});
		}
	}

	/*============================================================================================
	For Smartphone
	=============================================================================================*/

	/*============================================================================================
	Default Script
	=============================================================================================*/
	/* スムーススクロール
	=====================================================*/
	(function () {
		var offsetY = $(".header").outerHeight();
		var time = 500;
		$('a[href^="#"]').on("click", function () {
			var target = $(this.hash);
			if (!target.length) return;
			var targetY = target.offset().top - offsetY;
			$("html,body").animate({ scrollTop: targetY }, time, "swing");
			window.history.pushState(null, null, this.hash);
			return false;
		});
	})();

	/* 別ページからのアンカーリンク設定
	=====================================================*/
	(function () {
		$(window).on("load", function (e) {
			var hash = location.hash;
			if ($(hash).length) {
				e.preventDefault();
				var headerH = $(".header").height();
				var position = $(hash).offset().top;
				$("html, body").scrollTop(Number(position) - headerH);
			}
		});
	})();
});
