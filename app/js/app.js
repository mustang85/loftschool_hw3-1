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


/* module movement and positioning of votermark */
var posWatermarkOne = {
	// property module
	watermark : $('.one__watermark'),
	switch_controls: $('.switch__controls'),
	switch_buttons: $('.switch__controls button'),
	switchInputX: $('#x-cord'),
	switchInputY: $('#y-cord'),
	btnUpX: $(this.switchInputX)
				.closest('.switch__block')
				.find('.btn--up'),
	btnUpY: $(this.switchInputY)
				.closest('.switch__block')
				.find('.btn--up'),				
	step: 10,
	maxCoordX: 440,
	minCoordX: 0,
	maxChoiceX: 440,
	maxCoordY: 310,
	minCoordY: 0,
	maxChoiceY: 310,
	residueY: 5,
	moveSpeed: 100,

	// init module, set $('.visual__box')
	init: function (visual__box) {
		console.info('start posWatermarkOne');
		this.vBox = visual__box;
		this.listener(this.vBox);

		posWatermarkOne.watermarkDrag();

	}, 

	// associate events to move the grid and 
	// connect events for selection buttons
	listener: function (obj) {
		var $obj = obj.find('.js-set-cord'),
			switch_buttons = posWatermarkOne.switch_buttons;

		$obj.on('click', posWatermarkOne.moveOnGridWatermark);
		switch_buttons.on('click', posWatermarkOne.identifyAxis);
	},

	// movement votermark grid
	moveOnGridWatermark: function (e) {
		e.preventDefault();


		var $target = $(e.currentTarget),
			posX = $target.data().cordX,
			posY = $target.data().cordY,
			watermark = posWatermarkOne.watermark;

		watermark
				.animate({
					'left': posX + "px",
					'top': posY + "px"
				}, posWatermarkOne.moveSpeed);

		$('.box__cell').removeClass('cell--active');
		
		$target
				.closest('.box__cell')
				.addClass('cell--active');

		posWatermarkOne.switchInputX.val(posX);
		posWatermarkOne.switchInputY.val(posY);
	},

	// returns the current position votermark
	getCoordWatermark: function () {
		var position = {
			x: parseInt( posWatermarkOne.watermark.css('left'), 10),
			y: parseInt( posWatermarkOne.watermark.css('top'), 10)
		};

		return position;
	},

	// definition of the current selector switch for
	// axis adjustment facility to switch the selector votermark
	// motion along the axis
	identifyAxis: function (e) {
		e.preventDefault();

		var $target = $(e.currentTarget),
			axis = $target.data().direction,
			optionX = {
				input: posWatermarkOne.switchInputX,
				maxX: posWatermarkOne.maxCoordX,
				minX: posWatermarkOne.minCoordX,
				currentPosition: posWatermarkOne.getCoordWatermark().x
			},
			optionY = {
				input: posWatermarkOne.switchInputY,
				maxY: posWatermarkOne.maxCoordY,
				minY: posWatermarkOne.minCoordY,
				currentPosition: posWatermarkOne.getCoordWatermark().y
			};

		switch (axis !== '') {
			case axis == 'x-up':
				posWatermarkOne.plusCoordXSwitch(optionX);
				break;
			case axis == 'x-down':
				posWatermarkOne.minusCoordXSwitch(optionX);
				break;
			case axis == 'y-up':
				posWatermarkOne.plusCoordYSwitch(optionY);
				break;
			case axis == 'y-down':
				posWatermarkOne.minusCoordYSwitch(optionY);
				console.log('y-down');
				break;	
			default: 
			 	console.log('будь проклят тот день, когда я сел за клавиатуру этого пылесоса..');
		}
	},

	// increase the value of axis motion
	// currentPosition + step
	plusCoordXSwitch: function (obj) {
		
		var currentX = posWatermarkOne.getCoordSwitch(obj.input);
		
		if ( currentX < obj.maxX) {
			posWatermarkOne.switchInputX.val(currentX + posWatermarkOne.step);
			posWatermarkOne.moveOnXWatermark(obj.currentPosition + posWatermarkOne.step);
		}
	},

	// decrease the value of axis motion
	// currentPosition - step
	minusCoordXSwitch: function (obj) {
		var currentX = posWatermarkOne.getCoordSwitch(obj.input);

		if (currentX == posWatermarkOne.maxCoordX) {
			posWatermarkOne.btnUpX.removeAttr('disabled');
		}
		
		if ( currentX > obj.minX) {
			posWatermarkOne.switchInputX.val(currentX - posWatermarkOne.step);
			posWatermarkOne.moveOnXWatermark(obj.currentPosition - posWatermarkOne.step);
		}
	},

	// increase the value of axis motion
	// currentPosition + step
	plusCoordYSwitch: function (obj) {
		var currentY = posWatermarkOne.getCoordSwitch(obj.input);

		if ( (obj.maxY - currentY ) == posWatermarkOne.residueY) {
			posWatermarkOne.moveOnYWatermark(posWatermarkOne.maxChoiceY);
			posWatermarkOne.switchInputY.val(posWatermarkOne.maxChoiceY);
			return;
		}
		
		if ( currentY < obj.maxY) {
			posWatermarkOne.switchInputY.val(currentY + 10);
			posWatermarkOne.moveOnYWatermark(obj.currentPosition + posWatermarkOne.step);
		}
	},

	// increase the value of axis motion
	// currentPosition - step
	minusCoordYSwitch: function (obj) {
		var currentY = posWatermarkOne.getCoordSwitch(obj.input);

		if (currentY == posWatermarkOne.residueY) {
			posWatermarkOne.moveOnYWatermark(posWatermarkOne.minCoordY);
			posWatermarkOne.switchInputY.val(posWatermarkOne.minCoordY);
			return;
		}

		if (currentY == posWatermarkOne.maxCoordY) {
			posWatermarkOne.btnUpY.removeAttr('disabled');
			
		}
		
		if ( currentY > obj.minY ) {
			posWatermarkOne.switchInputY.val(currentY - 10);
			posWatermarkOne.moveOnYWatermark(obj.currentPosition - posWatermarkOne.step);
		}
	},

	// return the value of the input input - switch
	// and transform into a number
	getCoordSwitch: function ($obj) {
		return parseInt( $obj.val(), 10);
	},

	// votermark movement along the x axis
	moveOnXWatermark: function (xCord) {

		if (xCord === posWatermarkOne.maxChoiceX) {
			
			posWatermarkOne.watermark
				.stop(true,true)
				.animate({
				'left': xCord +'px'
				}, posWatermarkOne.moveSpeed);

			posWatermarkOne.btnUpX.attr({'disabled': 'disabled'});

			return;
		}
		
		posWatermarkOne.watermark.animate({
			'left': xCord  +'px'
			}, posWatermarkOne.moveSpeed);
		
	},

	// votermark movement along the y axis
	moveOnYWatermark: function (yCord) {

		if (yCord === posWatermarkOne.maxChoiceY) {
			
			posWatermarkOne.watermark
				.stop(true,true)
				.animate({
				'top': yCord +'px'
				}, posWatermarkOne.moveSpeed);

			posWatermarkOne.btnUpY
				.attr({'disabled': 'disabled'});

			return;
		}
		
		posWatermarkOne.watermark.animate({
			'top': yCord  +'px'
			}, posWatermarkOne.moveSpeed);
	},

	// votermark drag grid
	watermarkDrag: function () {
		posWatermarkOne.watermark.attr({
			'id': 'draggable'
		});
		console.log('tedt');

		posWatermarkOne.watermark.draggable({
			containment: ".result__block",
			grid: [10,10],
			drag: function () {
				posWatermarkOne.switchInputX.val(posWatermarkOne.getCoordWatermark().x)
				posWatermarkOne.switchInputY.val(posWatermarkOne.getCoordWatermark().y)
			}
		});
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

	posWatermarkOne.init( $('.visual__box') );
});