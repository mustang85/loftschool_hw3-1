"use strict";
var ruEng = (function () {
	var langs = {
		rus: {
			'js-app-name' 		   : 'Генератор водяных знаков',
			'js-settings-name' 	   : 'Настройки',
			'js-image-upload-name' : 'Исходное изображение',
			'js-wm-upload-name'    : 'Водяной знак',
			'js-position-name'	   : 'Положение',
			'js-opacity-name'	   : 'Прозрачность',
			'js-reset-name' 	   : 'Сброс',
			'js-download-name'	   : 'Скачать'
		},
		eng: {
			'js-app-name'	   : 'Watermarks generator',
			'js-settings-name' : 'Settings',
			'js-image-upload-name'  : 'Original image',
			'js-wm-upload-name'	   : 'Watermark',
			'js-position-name' : 'Place',
			'js-opacity-name'  : 'Opacity',
			'js-reset-name'	   : 'Reset',
			'js-download-name' : 'Download'
		}
	};

	var changeLang = function (e) {
		e.preventDefault();

		var lang = $(e.currentTarget).data('lang'),
			l = langs[lang];

		for (var selector in l) {
			$('.' + selector).html( l[selector] );
		}
	};

	return {
		listener: function ($block) {
			$block.on('click', '.globals__btn', changeLang);
		},
		init: function ($block) {
			this.listener($block);
		}
	}
})();

//Share buttons Module
var showShare = {
	close: function (close) {
		var gc = showShare.gContainer, //Page COntainer
			btn = showShare.obj.find('.js-show-share'), //Button with Thumb up
			timer;

		// if ( gc.hasClass('show--share') ) {
		// 	timer = setTimeout(function () {
		// 		btn.trigger('click');
		// 	}, 2500);
		// }
	},
	show: function () {
		var gc = showShare.gContainer; //Page Container
		
		gc.toggleClass('show--share');

		return false;
	},
	listener: function (obj, container) {
		obj.on('click', '.js-show-share', showShare.show);
		container.on('mouseleave', function () {
			showShare.close(true);
		});
	},
	init: function ($object) {
		//Cache DOM elements
		this.obj = $object; //Button with thumb up
		this.gContainer = this.obj.closest('.container'); //Page container
		this.container = this.obj.closest('.socials'); //Social buttons container

		//Listen to DOM elements
		this.listener(this.obj, this.container);

		console.info('listen to socials panel');
	}
};

//Select type of watermark fill-in Module
var selectType = {
	show: function (e) {
		e.preventDefault();

		var $target = $(e.currentTarget),
			cont = selectType.container;

		$target.addClass('btn--active')
			.siblings().removeClass('btn--active');

		if ($target.data('type') === 'use-four') {
			cont
				.find('.block--borders')
				.removeClass('block--hidden')
					.find('.input--switch')
					.removeAttr( 'disabled' )
				.end()
				.siblings()
				.addClass('block--hidden')
					.find('.input--switch')
					.attr('disabled', 'disabled');
		} else {
			cont
				.find('.block--coordinates')
				.removeClass('block--hidden')
					.find('.input--switch')
					.removeAttr( 'disabled' )
				.end()
				.siblings()
				.addClass('block--hidden')
					.find('.input--switch')
					.attr('disabled', 'disabled');
		}
	},
	listener: function (obj) {
		obj.on('click', '.js-switch-type', selectType.show)
	},
	init: function ($object) {
		this.obj = $object,
		this.container = this.obj.closest('.form__block');

		this.listener( this.obj );

		console.info('listen to type selector');
	}
};

//Upload Module
var uploadImages = {
	showFileName: function (e) {
		var $input = $(e.currentTarget),
			fileName = $input.val().replace(/\\/g, '/').replace(/.*\//, ''),
			abstract = $input.siblings('.upload-block__style');

		abstract.find('.style__input').addClass('loaded').html(fileName);

	},
	listener: function (obj) {
		obj.on('change', this.showFileName);
	},
	init: function ($input) {
		this.obj = $input;

		this.listener( this.obj );

		console.info('listen for uploading');
	}
};

//Opacity slider
var setOpacity = {
	changeOpacity: function (val) {
		var wm = this.elems.watermark;

		$(wm).css({
			opacity: val/100
		});
	},
	styleRange: function () {
		var defaultVal = 52; 

		this.slider.slider({
			min: 0,
			max: 100,
			step: 1,
			value: defaultVal,
			orientation: 'horizontal',
			create: function (e, ui) {
				$(this)
					.append(setOpacity.lower)
					.find('.slider--lower')
						.css({
							width: defaultVal + '%'
						});

				$('#opacity-value').attr('value', defaultVal);
				setOpacity.changeOpacity(defaultVal);
			},
			slide: function(e, ui) {
				$('.slider--lower').css({
					width: ui.value + '%'
				});

				$('#opacity-value').attr('value', ui.value);

				setOpacity.changeOpacity(ui.value);
			} 
		});

		console.info('style opacity');
	},
	init: function ($slider, objs) {
		this.elems = objs;
		this.slider = $slider;
		this.lower = $('<span />', {'class': 'slider--lower'});

		this.styleRange();
	}
};

$(function() {
	console.info('start app');

	var objects = {
		watermark: '.watermark__image',
		image: '.root__image'
	};

	showShare.init( $('.socials') );
	selectType.init( $('.application-types') );
	uploadImages.init( $('.input--upload') );
	setOpacity.init( $('.slider-range'), objects );
	ruEng.init( $('.globals__lang') );
});