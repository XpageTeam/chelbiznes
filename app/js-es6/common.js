var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};



if($('iframe').length){
    function setHeight(){
      var iFrame = $(this);
      iFrame.height($(iFrame).contents().find('html').height());
      // console.log(iFrame.height($(iFrame).contents().find('html').height());
    }

    $("iframe").load(setHeight);

}
$(function() {

	// if($('iframe').length){
	// 	var height = $("iframe").contents().find('html').height()
	// 	var heihtIframe = $("iframe").height(height);
	// 	console.log(heihtIframe)
	// }




	$("body").on("change", ".fancybox-inner .forms__input--file", function(e){

		var value = $(this)[0].files[0].name;
		// console.log(value);
		var inputHasFile = $(this).next('input[type="text"]').val(value);

		if(inputHasFile.length){

			$(this).nextAll('.not-label-text').addClass('js__close');
			// $(this).nextAll(".js__input-del").addClass('close-input');


		}

	});

	$('.contacts__el .btn').click(function(){

		var $this = $(this);
		$this.closest('.contacts__item').toggleClass('js__active');

		$this.closest('.contacts__item-head').next('.contacts__item-map').slideToggle('js__open-map');

		if (!$(this).data('status')) {
		  	$(this).html('Свернуть');
		    $(this).data('status', true);
		  } else {
		  	$(this).html('Посмотреть на карте');
		    $(this).data('status', false);
		  }

		setTimeout(function(){
			$('html,body').animate({
				scrollTop: $this.closest('.contacts__item.js__active').offset().top - 0}, 1000);
		}, 300)
	})

	$('.base-ocved').each(function(i,el){
		var $this = $(el);

		$this.find('.okvad-num').addClass('js__animate');
		$this.find('.okvad-info').addClass('js__open');

	})
	$('.okvad-num').click(function(){


		var $this = $(this);



		$('.okvad-num').removeClass('js__animate');

		if ($this.next('.okvad-info').hasClass("js__open")){
			$('.okvad-info').slideUp(300).removeClass('js__open');
		}else{
			$('.okvad-info').slideUp(300).removeClass('js__open');
			$this.next('.okvad-info').slideDown(300).addClass('js__open');
			$this.addClass('js__animate');
		}


		setTimeout(function(){
			$('html,body').animate({
				scrollTop: $('.okvad-info.js__open').offset().top - 50}, 1000);
		}, 300)


	})

	$('.base-ocved').each(function(i,el){
		var $this = $(el);

		$this.find('.item--title').addClass('js__animate');
		$this.find('.item--text, .item--st').addClass('js__open');

	});


	$('.acved .item--title').click(function(){

		var $this = $(this);
		$('.item--title').removeClass('js__animate');

		if ($this.next('.item--text').hasClass("js__open")){
			$('.item--text').slideUp(300).removeClass('js__open');
			$('.item--st').slideUp(300).removeClass('js__open');
		}else{
			$('.item--text').slideUp(300).removeClass('js__open');
			$('.item--st').slideUp(300).removeClass('js__open');
			$this.next('.item--text').slideDown(300).addClass('js__open');
			$this.nextAll('.item--st').slideDown(300).addClass('js__open');
			$this.addClass('js__animate');
		}

		// setTimeout(function(){
		// 	$('html,body').animate({
		// 		scrollTop: $('.okvad-info.js__open').offset().top - 50}, 1000);
		// }, 300)


	})


	$(".toggle-class").on("click", function(){
		var class_name = $(this).attr("data-toggle-class");
		if (!$(this).hasClass(class_name))
			$(this).addClass(class_name);
		else
			$(this).removeClass(class_name);
	});



	$(".doc__one-title").click(function(){
		$(this).next(".doc__one-text").slideToggle();
	});


	$('.question__item-title').click(function(){
		var $this = $(this);

		$this.next().slideToggle(500);
		$this.toggleClass('open');

	});
	$('.events__item-title').click(function(){
		let $this = $(this);

		$this.next().toggleClass('show');
		$this.toggleClass('open');

	});

	$('input').on('click focus change', function(){
		var $this = $(this);
		$this.removeClass('error');
	});


	if (Cookies.get("special") != 1)
		$("aside .dropdown span").click(function(){
			var $this = $(this);
			$this.next("ul").slideToggle(500);
			$this.closest("li").toggleClass("open");
		});

	$(".news-block .read-more").wrap("<div class='read-more__cont'></div>");

	$(".header-special__link").click(function(){
		Cookies.set("special", 1);
	});

	$(".access .special").click(function(){
		Cookies.remove("special");
	});

	$(".a-colors a").click(function(){
		var $this = $(this);
		switch ($this.attr("class")){
			case "a-color1":
				Cookies.set("color", "color1");
				$("body").removeClass("color2");
				$("body").removeClass("color3");
				$("body").addClass("color1");

			break;
			case "a-color2":
				Cookies.set("color", "color2");
				$("body").removeClass("color1");
				$("body").removeClass("color3");
				$("body").addClass("color2");

			break;
			case "a-color3":
				Cookies.set("color", "color3");
				$("body").removeClass("color1");
				$("body").removeClass("color2");
				$("body").addClass("color3");
		}
		return false;
	});

	$(".a-fontsize a").click(function(){
		var $this = $(this);
		switch ($this.attr("class")){
			case "a-fontsize-small":
				Cookies.set("fontsize", "fontsize-small");
				$("html").removeClass("fontsize-big");
				$("html").removeClass("fontsize-normal");
				$("html").addClass("fontsize-small");

			break;
			case "a-fontsize-normal":
				Cookies.set("fontsize", "fontsize-normal");
				$("html").removeClass("fontsize-small");
				$("html").removeClass("fontsize-big");
				$("html").addClass("fontsize-normal");
			break;
			case "a-fontsize-big":
				Cookies.set("fontsize", "fontsize-big");
				$("html").removeClass("fontsize-small");
				$("html").removeClass("fontsize-normal");
				$("html").addClass("fontsize-big");
		}
		return false;
	});

	if (Cookies.get("special") != 1)
		$('.history .slider').slick({
			dots: false,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 500,
			slide: '.slide',
			slidesToShow: 1,
			slidesToScroll: 1,
			touchMove: false,
			pauseOnHover: false,
			arrows: true,
			adaptiveHeight: true
		});


	if (Cookies.get("special") != 1)
		$('#victory-slider .slider').slick({
			dots: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			slide: '.text-block',
			slidesToShow: 1,
			slidesToScroll: 1,
			touchMove: false,
			pauseOnHover: false,
			arrows: true
		});
	if (Cookies.get("special") != 1)
		$('#credit-company .slider').slick({
			dots: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			slide: '.slide',
			slidesToShow: 1,
			slidesToScroll: 1,
			touchMove: false,
			pauseOnHover: false,
			arrows: true
		});

	if (Cookies.get("special") != 1)
		$('#new-incubator.have-slider .bot-block').slick({
			dots: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			slide: '.slide',
			slidesToShow: 4,
			slidesToScroll: 1,
			touchMove: false,
			pauseOnHover: false,
			arrows: true,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}]
		});

	if (Cookies.get("special") != 1)
		$('.partners').slick({
			dots: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 10000,
			speed: 500,
			slide: 'a',
			slidesToShow: 4,
			slidesToScroll: 1,
			touchMove: false,
			pauseOnHover: false,
			arrows: true,
			//centerMode: true,
			//centerPadding: "35px",
			responsive: [
			{	breakpoint: 1000,
				settings: {
					slidesToShow: 2,
					arrows: false,
					centerMode: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					centerMode: false,
					arrows: false,
					autoplaySpeed: 3500
				}
			},
			{
				breakpoint: 1200,
				settings: {
					centerMode: false,
					slidesToShow: 2,
					//arrows: false
				}
			},
			{	breakpoint: 1400,
				settings: {
					slidesToShow: 3,
					//centerMode: false,
					//arrows: false
				}
			}]
		});

	if($(window).width() <= 1000) {
		$('.header__menu-el.dropdown > a').removeClass('fancybox');

		$('.header__menu-el.dropdown').click(function(){

			$(this).toggleClass('menu--open');
		});


	};



	$(".fancybox").fancybox({
		beforeShow: function(){
			$('body').addClass('fancy-active');
		},
		afterClose: function(){
			$('body').removeClass('fancy-active');
		}
	});

	$(".counter:not([class='counter not-counter'])").each(function(i, el){
		if ($(this).html().length > 5)
			$(this).css({"font-size": "60px"});
	});

	timer($(".timer"));

	$(".organs-list div.title").click(function(){
		$(this).next(".slide-block").slideToggle(500);
	});

	if ($(".content").height() < $("main aside").height() && $(window).width() > 768 && $(window).height() > 600)
		$(".content").css({"min-height" : ($(window).height() - $("header").height()) + "px"});

	$("#hamburger-icon").click(function(){
		$(this).closest("div").toggleClass("active");

		$("body").toggleClass("move");

		$(".header__menu").toggleClass("opened");

		return false;
	});

	if ($(window).width() < 770)
		$("aside").height($("body").height());

	if (Cookies.get("special") == 1){
		$("aside .dropdown").click(function(){

		})
	}

});

$(window).on("load resize", function(){
	$(".partners a").each(function(){
		if ($(this).children("span").html() == "")
			$(this).css({
				"background-position": "left top",
				"background-size": "100% 100%"
			});
		if (Cookies.get("special") == 1 && $(this).children("span").html() == "")
			$(this).remove();
	});
});

/**
* Возвращает модуль числа
*/
function abs(i){
	return Math.abs(i);
}

function getTimeRemaining(endtime){
	var miliseconds = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (miliseconds/1000) % 60 );
	var minutes = Math.floor( (miliseconds/1000/60) % 60 );
	var hours = Math.floor( (miliseconds/(1000*60*60)) % 24 );
	var days = Math.floor( miliseconds/(1000*60*60*24) );
	return {
		//'total': miliseconds,
		'days': (days < 0 ? 0 : days),
		'hours': (hours < 0 ? 0 : hours),
		'minutes': (minutes < 0 ? 0 : minutes),
		'seconds': (seconds < 0 ? 0 : seconds)
	};
}


/**
* Функция запуска таймера
*/
function timer($timer){
	setInterval(function(){
		var time = getTimeRemaining($timer.attr("data-date"));

		$timer.find(".days > div:first-child").html(time.days);
		$timer.find(".hours > div:first-child").html(time.hours);
		$timer.find(".minutes > div:first-child").html(time.minutes);
		$timer.find(".seconds > div:first-child").html(time.seconds);

	}, 1000)
}

(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};


			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 2000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

$(window).on("scroll load resize", function(){
	//change_pos();
	if ($(".counter").length){
		if ($(window).scrollTop() + $(window).height() >= $(".counter").offset().top && !$(".counter").hasClass("countered"))
			$(".counter:not([class='counter not-counter'])").addClass("countered").countTo();
	}
});

/*$(window).on("scroll load resize", function(){
	if ($("aside").height() > $(window).height())
		$("aside").css({"overflow-y" : "scroll"});
});*/

$(function(){
	if (Cookies.get("special") != 1)
		$(".main-slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 1000,
			slide: ".main-slider__slide",
			arrows: false,
			appendDots: ".main-slider__dots",
			dots: true,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						autoplay: true,
						autoplaySpeed: 10000
					}
				},
				{
					breakpoint: 1200,
					settings: {
						autoplay: true,
						autoplaySpeed: 10000
					}
				}
			]
		});

		if (Cookies.get("special") != 1)
		$(".faq__block-head").click(function(){
			var $this = $(this);

			$this.closest(".faq__block").find(".faq__block-text-cont").slideToggle(500);

			$this.closest(".faq__block").toggleClass("faq__block--open");
		});

	if (Cookies.get("special") != 1)

		$(".support-slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			speed: 1000,
			slide: ".support-slider__slide",
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						autoplay: true,
						autoplaySpeed: 15000,
						arrows: false,
						pauseOnHover: false,
						// adaptiveHeight: false
					}
				}
			]
		})

});

// $(window).on("load resize", function(){
// 	if ($(".support-grid__cont").length && Cookies.get("special") != 1){
// 		resize_elements($(".support-grid__cont"), $(".support-grid__el"));
// 	}
// });

function resize_elements($parent, $children){
	var height = [];
	$children.removeAttr("style");

	$parent.each(function(){
			$(this).find($children).each(function(i, el){
				var $this = $(this);

				height.push($this.height());
		})
	});

	height.sort(function(a, b){return a - b});

	$parent.find($children).height(height[height.length - 1])
}


/** Калькулятор */
/* Внитри него происходит магия. */
/* Не трогай, если не знаешь как это работает! */
/*****/

/**
	data-list="[{'id':0,'name':'Микрозайм «Фермер»','otsrok':{'min':0,'max':5,'default':0},'srok':{'min':3,'max':24,'default':24,'step':1},'summa':{'min':100000,'max':3000000,'default':500000,'step':5000},'persent':10}]", 
*/

const getNormalDate = date => (new Date(date).getDate().toString().length == 1 ? "0"+new Date(date).getDate() : new Date(date).getDate())+"."
	+((new Date(date).getMonth()+1).toString().length == 1 ? "0"+(new Date(date).getMonth()+1) : (new Date(date).getMonth()+1))+"."
	+new Date(date).getFullYear();

Vue.component("calc", {
	components: {
		VueSlider: window['vue-slider-component'],
		vuejsDatepicker
	},
	props: {
		id: {
			type: Number,
			default: 0
		},
		name: {
			type: String,
			default: ""
		},
		otsrok: {
			type: Object,
			default: {
				min: 0,
				max: 6,
				default: 0
			}
		},
		type: {
			type: Array,
			default: [{
				id: 0, 
				name: 'Обычный', 
				min: 100000,
				max: 3000000,
				default: 500000,
				step: 5000,
				percent: 10,
				srok: {
					min: 1,
					max: 18,
					default: 12,
					step: 1
				}
			}]
		},
		payInLastMonths: {
			type: Number,
			default: 0,
		}
	},
	data: () => ({
		curDate: new Date(),
		nextDate: "",
		curSrok: 4,
		summ: 0,
		pereplata: 0,
		itog: 0,
		curOtsrok: 0,
		vsego: 0,
		tableArr: [],
		maxOtsrok: 0,
		curName: "",
		selected: 0,
		persent: 10,

		timetables: [
			{
				id: 0,
				name: "Аннуитетный"
			},
			{
				id: 1,
				name: "Дифференцированный"
			}
		],
		curTimetableID: 0
	}),
	beforeMount(){

		this.selected = this.type[0].id

		this.curSrok = this.curType.srok.default
		this.summ = parseInt(this.curType.default)
	},
	mounted(){
		this.init()

		$(".open-calc").click(function(){
			$("#calc").slideDown(300)

			setTimeout(function(){
				$("html, body").animate({
					scrollTop: $("#calc").offset().top - 80 
				}, 300)
			}, 50)

			return false
		})
	},
	watch: {
		curSrok(val, oldVal){
			if (isNaN(val)){
				this.curSrok = oldVal
				return
			}

			this.setNextDate()
			this.calc()
		},
		summ(val, oldVal){
			if (isNaN(val)){
				this.summ = oldVal
				return
			}

			// this.setNextDate()
			this.calc()
		},

		selected(val, oldVal){
			this.curSrok = this.curType.srok.default
			this.summ = parseInt(this.curType.default)

			this.curOtsrok = this.otsrok.default
			this.maxOtsrok = this.otsrok.max

			this.percent = this.curType.percent

			this.setNextDate()
			this.calc()
		},
		curDate(val, oldVal){
			this.setNextDate()
			this.calc()
		},
		curOtsrok(val, oldVal){
			this.setNextDate()
			this.calc()
		},

		curTimetableID(val, oldVal){
			this.curOtsrok = this.otsrok.default
			this.maxOtsrok = this.otsrok.max
			this.calc()
		}
	},
	methods: {
		init(){
			this.percent = this.curType.percent

			this.curOtsrok = this.otsrok.default
			this.maxOtsrok = this.otsrok.max

			this.updateOtsrok()
			
			this.setNextDate()

			this.calc()
		},
		partitionNumber: number => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "),
		setNextDate(){
			let tmpDate = this.curDate.format("dd.mm.yyyy").split(".");

			tmpDate = new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2])

			tmpDate.setMonth(tmpDate.getMonth() + this.curSrok)

			this.nextDate = getNormalDate(tmpDate)
		},

		updateOtsrok(){
			if (this.payInLastMonths){
				this.curOtsrok = this.curSrok - this.payInLastMonths
				this.maxOtsrok = this.curSrok - this.payInLastMonths
			}
		},

		calc(){
			this.updateOtsrok()

			switch (this.curTimetableID){
				case 0:
					this.makeTable()
				break;

				case 1:
					this.makeSecondTable()
				break;
			}
			this.pereplata = 0;

			for (let i in this.tableArr){
				let row = this.tableArr[i];

				this.pereplata += parseInt(row.forPersents)
			}

			this.pereplata = +this.pereplata.toFixed(2);

			this.itog = this.summ;

			console.log(this.pereplata , this.itog, this.summ)

			this.vsego = this.pereplata + this.itog + " руб.";
			this.vsego = this.pereplata + this.itog + " руб.";

			this.vsego = this.partitionNumber(this.vsego);

			this.itog = this.itog + " руб.";

			this.itog = this.partitionNumber(this.itog);

			this.pereplata = this.pereplata + " руб."

			this.pereplata = this.partitionNumber(this.pereplata);
		},
		makeTable(){
			let mes = 12 - this.curOtsrok;
			// let mes = this.curSrok - this.curOtsrok;

			this.tableArr = [];

			const getDate = date => {
				const tmpDate = date.split(".");

				return new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2])
			};

			let i = 0;

			while (true){

				let tmpDate = getDate(this.curDate.format("dd.mm.yyyy"));

				this.tableArr[i] = {};

				const table = this.tableArr[i];

				tmpDate.setMonth(tmpDate.getMonth() + i+1);

				table.date = getNormalDate(tmpDate)

				if (i == 0){
					table.forPersents = this.summ * this.persent * (Math.floor(getDate(table.date) -  getDate(this.curDate.format("dd.mm.yyyy"))) / 1000 / 60 / 60 / 24) / 
						((new Date(tmpDate.getFullYear()+1, 1, 0) - new Date(tmpDate.getFullYear(), 1, 0)) / 1000 / 60 / 60 / 24) / 100;

					table.itog = this.summ * this.persent / 100 / 12 / 
						(1 - Math.pow((1 + this.persent / 100 / 12), -(!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok)))
					// if (this.summ * this.persent / 100 / (this.curSrok - this.curOtsrok) / (1 - Math.pow((1 + this.persent / 100 / (this.curSrok - this.curOtsrok)), -(this.curSrok - this.curOtsrok))) < this.)
					// table.itog = this.summ 
				}else{
					table.forPersents = this.tableArr[i-1].ostatok * this.persent * (Math.floor(getDate(table.date) -  getDate(this.tableArr[i-1].date)) / 1000 / 60 / 60 / 24) / 
						((new Date(tmpDate.getFullYear() + 1, 1, 0) - new Date(tmpDate.getFullYear(), 1, 0)) / 1000 / 60 / 60 / 24) / 100;


					if (this.summ * this.persent / 100 / 12 / 
						(1 - Math.pow((1 + this.persent / 100 / 12), -(!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok))) < +this.tableArr[i-1].ostatok){
						table.itog = this.summ * this.persent / 100 / 12 / 
						(1 - Math.pow((1 + this.persent / 100 / 12), -(!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok)))
					}else{
						table.itog = +this.tableArr[i-1].ostatok + table.forPersents;
					}
				}

				if (i+1 <= this.curOtsrok){
					table.forDolg = 0;
					table.itog = 0;
				}
				else
					table.forDolg = table.itog - table.forPersents;

				if (i == 0){
					table.ostatok = this.summ - table.forDolg;
				}else{
					table.ostatok = this.tableArr[i-1].ostatok - table.forDolg;
				}

				table.itog = table.itog.toFixed(2);
				table.ostatok = table.ostatok.toFixed(2);
				table.forPersents = table.forPersents.toFixed(2);
				table.forDolg = table.forDolg.toFixed(2);

				i++

				if (parseFloat(table.ostatok) == 0)
					break
			}
		},
		makeSecondTable(){
			let mes = 12 - this.curOtsrok;

			this.tableArr = [];

			const getDate = date => {
				const tmpDate = date.split(".");

				return new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2])
			};

			let i = 0;

			while (true){

				let tmpDate = getDate(this.curDate.format("dd.mm.yyyy"));

				this.tableArr[i] = {};

				const table = this.tableArr[i];

				tmpDate.setMonth(tmpDate.getMonth() + i+1);

				table.date = getNormalDate(tmpDate)

				if (i == 0){
					table.forPersents = this.summ * this.persent / 12 / 100

					table.forDolg = this.summ / (!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok)

				}else{
					table.forPersents = this.tableArr[i-1].ostatok * this.persent / 12 / 100

					if (this.summ / this.curSrok < this.tableArr[i-1].ostatok)
						table.forDolg = this.summ / (!this.payInLastMonths ? this.curSrok : this.curSrok - this.curOtsrok)
					else
						table.forDolg = this.tableArr[i-1].ostatok
				}

				if (i+1 <= this.curOtsrok){
					table.forDolg = 0;
					table.itog = 0;
				}
				else
					// table.forDolg = table.itog - table.forPersents;
					table.itog = table.forDolg + table.forPersents

				if (i == 0){
					table.ostatok = this.summ - table.forDolg;
				}else{
					table.ostatok = this.tableArr[i-1].ostatok - table.forDolg;
				}

				table.itog = parseFloat(table.itog).toFixed(2);
				table.ostatok = parseFloat(table.ostatok).toFixed(2);
				table.forPersents = parseFloat(table.forPersents).toFixed(2);
				table.forDolg = parseFloat(table.forDolg).toFixed(2);

				i++

				if (parseFloat(table.ostatok) <= 0){
					table.ostatok = 0
					break
				}
			}
		},
		print(){
			$("body").addClass("page-calc__body");
			window.print()
		}
	},
	computed: {
		curType(){
			return this.type.filter(item => item.id == this.selected)[0]
		}
	}
})


// Vue.component("calc", {
// 	props: {
// 		list: {
// 			type: Array,
// 			default: []
// 		},
// 	},
// 	data: () => ({
// 		curDate: (new Date().getDate().toString().length == 1 ? "0"+new Date().getDate() : new Date().getDate())+"."
// 			+((new Date().getMonth()+1).toString().length == 1 ? "0"+(new Date().getMonth()+1) : (new Date().getMonth()+1))+"."
// 			+new Date().getFullYear(),
// 		nextDate: "",
// 		curSrok: 0,
// 		summ: 0,
// 		pereplata: 0,
// 		itog: 0,
// 		curOtsrok: 0,
// 		vsego: 0,
// 		tableArr: [],
// 		maxOtsrok: 0,

// 		curName: "",
// 		selected: 0,

// 		srok: {
// 				min: 3,
// 				max: 12,
// 				step: 1,
// 				default: 8
// 		},
// 		summa: {
// 				min: 100000,
// 				max: 1000000,
// 				step: 5000,
// 				default: 300000
// 		},
// 		otsrok: {
// 				min: 1,
// 				max: 5,
// 				default: 0
// 		},
// 		persent: 10,
// 	}),
// 	moveunted(){
// 		this.init();

// 		let self = this;

// 		$(".date-pick").datepicker({
// 	        inline: true,
// 	        language: 'ru',
// 	        changeYear: true,
// 	        firstDay: 1,
// 	        changeMonth: true,
// 	        onSelect(dateText, inst) {
// 	        	self.curDate = dateText;
// 	        }
// 	    });
// 	},
// 	watch: {
// 		selected(val, oldVal){
// 			this.initData();

// 			this.curName = this.curZaim.name;

// 			this.calc();
// 		},


// 		curDate(val, oldVal){
// 			this.setNextDate();
// 			this.makeTable();
// 		},
// 		curSrok(val, oldVal){

// 			if (isNaN(val))
// 				this.curSrok = oldVal

// 			if(val <= this.srok.max && val >= this.srok.min){
// 				this.calcOtsrok();
// 				this.setNextDate();
// 				$(".range[data-role='srok']").slider("option", "value", val);
// 				this.calc();
// 			}
// 		},
// 		summ(val, oldVal){
// 			if (isNaN(val))
// 				this.summ = oldVal

// 			if(val <= this.summa.max && val >= this.summa.min){
// 				$(".range[data-role='summ']").slider("option", "value", val);
// 				this.calc();
// 			}
// 		},
// 		curOtsrok(val, oldVal){
// 			if (isNaN(val))
// 				this.curOtsrok = oldVal

// 			if(val <= this.otsrok.max && val >= this.otsrok.min){
// 				$(".range[data-role='otsrok']").slider("option", "value", val);
// 				this.calcOtsrok();
// 				this.calc();
// 				this.makeTable();
// 			}
// 		}
// 	},
// 	methods: {
// 		initData(){
// 			// console.log(this.curZaim);

// 			this.srok = this.curZaim.srok;
// 			this.otsrok = this.curZaim.otsrok;
// 			this.summa = this.curZaim.summa;
// 			this.persent = this.curZaim.persent;

// 			this.initRanges();
// 		},
// 		partitionNumber(number){
// 			return number.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
// 			// return number;
// 		},
// 		setNextDate(){
// 			let tmpDate = this.curDate.split(".");

// 			tmpDate = new Date(tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2]);

// 			tmpDate.setMonth(tmpDate.getMonth() + this.curSrok);

// 			this.nextDate = (tmpDate.getDate().toString().length == 1 ? "0"+tmpDate.getDate() : tmpDate.getDate())+"."
// 				+((tmpDate.getMonth() + 1).toString().length == 1 ? "0"+(tmpDate.getMonth() + 1) : (tmpDate.getMonth() + 1))+"."
// 				+tmpDate.getFullYear();
// 		},
// 		init(){
// 			this.initData();
// 			this.curSrok = this.srok.default;
// 			this.summ = this.summa.default;

// 			this.calcOtsrok();

// 			this.setNextDate();
// 		},
// 		calcOtsrok(){
// 			if (this.curSrok <= this.otsrok.max){
// 				this.maxOtsrok = this.curSrok - 1;
// 				if (this.curOtsrok >= this.maxOtsrok)
// 					this.curOtsrok = this.maxOtsrok
// 			}else
// 				this.maxOtsrok = this.otsrok.max
// 		},
// 		initRanges(){
// 			let self = this;
// 			$("#calc .range").each((i, el) => {
// 				let $this = $(el);

// 				$this.slider({
// 					animate: "normal",
// 					min: parseFloat($this.attr("data-min")),
// 					max: parseFloat($this.attr("data-max")),
// 					value: parseFloat($this.attr("data-default")),
// 					step: parseFloat($this.attr("data-step")),
// 					range: "min",
// 					slide(e, ui){
// 						switch ($this.attr("data-role")){
// 							case "srok":
// 								self.curSrok = ui.value;
// 							break;
// 							case "summ":
// 								self.summ = ui.value;
// 							break;
// 							case "otsrok":
// 								self.curOtsrok = ui.value;
// 							break;
// 						}
// 					}
// 				});
// 			});
// 		},
// 		calc(){
// 			this.makeTable();
// 			this.pereplata = 0;

// 			for (let i in this.tableArr){
// 				let row = this.tableArr[i];

// 				this.pereplata += parseInt(row.forPersents)
// 			}

// 			this.pereplata = +this.pereplata.toFixed(2);

// 			this.itog = this.summ;

// 			this.vsego = this.pereplata + this.itog + " руб.";
// 			this.vsego = this.pereplata + this.itog + " руб.";

// 			this.vsego = this.partitionNumber(this.vsego);

// 			this.itog = this.itog + " руб.";

// 			this.itog = this.partitionNumber(this.itog);

// 			this.pereplata = this.pereplata + " руб."

// 			this.pereplata = this.partitionNumber(this.pereplata);
// 		},
// 		makeTable(){

// 			// let mes = 12 - this.curOtsrok;
// 			let mes = this.curSrok - this.curOtsrok;

// 			this.tableArr = [];

// 			for (let i = 0; i < this.curSrok; i++){
// 				let tmpDate = this.getDate(this.curDate);

// 				this.tableArr[i] = {};

// 				let table = this.tableArr[i];

// 				tmpDate.setMonth(tmpDate.getMonth() + i+1);

// 				table.date = (tmpDate.getDate().toString().length == 1 ? "0"+tmpDate.getDate() : tmpDate.getDate())+"."
// 					+((tmpDate.getMonth() + 1).toString().length == 1 ? "0"+(tmpDate.getMonth() + 1) : (tmpDate.getMonth() + 1))+"."
// 					+tmpDate.getFullYear();


// 				if (i == 0){
// 					table.forPersents = this.summ * this.persent * new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 0).getDate() / 365 / 100;
// 					table.itog = this.summ * this.persent / 100 / (this.curSrok - this.curOtsrok) / (1 - Math.pow((1 + this.persent / 100 / (this.curSrok - this.curOtsrok)), -(this.curSrok - this.curOtsrok)));
// 				}else{
// 					table.forPersents = this.tableArr[i-1].ostatok * this.persent * new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 0).getDate() / 365 / 100;


// 					if (this.summ * this.persent / 100 / (this.curSrok - this.curOtsrok) / (1 - Math.pow((1 + this.persent / 100 / (this.curSrok - this.curOtsrok)), -(this.curSrok - this.curOtsrok))) < +this.tableArr[i-1].ostatok){
// 						table.itog = this.summ * this.persent / 100 / (this.curSrok - this.curOtsrok) / (1 - Math.pow((1 + this.persent / 100 / (this.curSrok - this.curOtsrok)), -(this.curSrok - this.curOtsrok)));
// 					}else{
// 						table.itog = +this.tableArr[i-1].ostatok + table.forPersents;
// 					}
// 				}

// 				if (i+1 <= this.curOtsrok){
// 					table.forDolg = 0;
// 					table.itog = 0;
// 				}
// 				else
// 					table.forDolg = table.itog - table.forPersents;

// 				if (i == 0){
// 					table.ostatok = this.summ - table.forDolg;
// 				}else{
// 					table.ostatok = this.tableArr[i-1].ostatok - table.forDolg;
// 				}

// 				table.itog = table.itog.toFixed(2);
// 				table.ostatok = table.ostatok.toFixed(2);
// 				table.forPersents = table.forPersents.toFixed(2);
// 				table.forDolg = table.forDolg.toFixed(2);
// 			}
// 		},
// 		print(){
// 			$("body").addClass("page-calc__body");
// 			window.print()
// 		},
// 		getDate(date){
// 			date = date.split(".");

// 			return new Date(date[1]+"/"+date[0]+"/"+date[2]);
// 		}
// 	},
// 	computed: {
// 		curZaim(){
// 			return this.list.filter(item => item.id == this.selected || this.selected == "default")[0]
// 		}
// 	}
// });

let calc;

$(function(){
	if ($("#calc").length)
		calc = new Vue({
			el: "#calc",
			mounted(){
				$("body").addClass("page-calc__body");
				console.log("calc mounted");
			},
		});
});


document.addEventListener("DOMContentLoaded", e => {
	$(".text-page > table, .support-top__info-text > table").wrap('<div class="table-wrap"><div class="table-wrap__track"></div></div>')

	$(".table-wrap")
		.prepend('<div class="table-wrap__shadow table-wrap__shadow--left"></div>')
		.append('<div class="table-wrap__shadow table-wrap__shadow--right"></div>')

	let tableWrapTracks = document.querySelectorAll(".table-wrap__track");

	if (!tableWrapTracks.length)
		return

	for (var track of tableWrapTracks){
		
		if (track.scrollWidth > track.clientWidth){
			let wrap = track.closest(".table-wrap");

			let shadows = {
				right: wrap.querySelector(".table-wrap__shadow--right")
			};

			setShadowOpacity(shadows.right, track.scrollWidth - track.clientWidth)
		}

		track.addEventListener("scroll", function(e){
			let wrap = this.closest(".table-wrap");

			let shadows = {
				left: wrap.querySelector(".table-wrap__shadow--left"),
				right: wrap.querySelector(".table-wrap__shadow--right")
			};

			setShadowOpacity(shadows.right, this.scrollWidth - this.clientWidth - this.scrollLeft)
			setShadowOpacity(shadows.left, this.scrollLeft)
		})
	}
})

const setShadowOpacity = (element, scrollWidth, offsetWidth = 80) => {
	element.style.opacity = scrollWidth / offsetWidth <= 1 ? scrollWidth / offsetWidth : 1
}