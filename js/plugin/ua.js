(function($){
    $.extend($, {
        browser: {
            ua: '',
            android: false,
            iphone: false,
            ipod: false,
            ipad: false,
            firefox: false,
            ie: false,
            msie: false,
            edge: false,
            chrome: false,
            safari: false,
            tablet: false,
            windows: false,
            mac: false,
            version: 0,
            smart: false
        }
    });
    
    $.browser.ua = navigator.userAgent.toLowerCase();
    $.browser.edge = /edge/.test($.browser.ua) || /(S|s)partan/.test($.browser.ua);
    $.browser.android = /android/.test($.browser.ua);
    $.browser.iphone = /iphone/.test($.browser.ua);
    $.browser.ipod = /ipod/.test($.browser.ua);
    $.browser.ipad = /ipad/.test($.browser.ua);
    $.browser.firefox = /firefox/.test($.browser.ua);
    $.browser.windows = /windows/.test($.browser.ua);
    $.browser.mac = /macintosh/.test($.browser.ua);
    $.browser.ie = /msie/.test($.browser.ua) || /(T|t)rident/.test($.browser.ua);
    $.browser.chrome = /chrome/.test($.browser.ua) && !$.browser.edge;
    $.browser.safari = (!$.browser.chrome && /safari/.test($.browser.ua)) && !$.browser.edge;
    $.browser.msie = $.browser.ie;
            
    /* バージョン判定ブロック */
    if ($.browser.ie) {
        $.browser.version = $.browser.ua.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
    }

    if ($.browser.edge) {
        $.browser.version = $.browser.ua.match(/ edge\/([\d\.]+)/)[1];
    }

    if ($.browser.android) {
        $.browser.version = parseFloat($.browser.ua.slice($.browser.ua.indexOf("android") + 8));
    } else if ($.browser.ios) {
        $.browser.version = parseFloat($.browser.ua.slice($.browser.ua.indexOf("os ") + 3, $.browser.ua.indexOf("os ") + 6).replace("_", "."));
    }

    if ($.browser.chrome) {
        $.browser.version = $.browser.ua.match(/ chrome\/([\d\.]+)/)[1];
    }

    if ($.browser.firefox) {
        $.browser.version = $.browser.ua.match(/ firefox\/([\d\.]+)/)[1];
    }

    if ($.browser.safari) {
			//if($.browser.ua.match(/ version\/([\d\.]+)/)){
				 //$.browser.version = $.browser.ua.match(/ version\/([\d\.]+)/)
			 //}
        $.browser.version = $.browser.ua.match(/ safari\/([\d\.]+)/)[1];
    }

    /* スマホ・タブレット判定ブロック */
    if ($.browser.android) {
        $.browser.tablet = !/mobile/.test($.browser.ua);
    } else {
        $.browser.tablet = /ipad/.test($.browser.ua);
    }

    $.browser.smart = ($.browser.android || $.browser.iphone || $.browser.ipod || $.browser.ipad);
    
})(jQuery);