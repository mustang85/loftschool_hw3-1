'use strict';

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
	//Close Social Buttons Block
	close: function (close) {
		var gc = showShare.gContainer, //Page Container
			btn = showShare.obj.find('.js-show-share'), //Button with Thumb up
			timer; //Timer to close automatically after 1s

		// if ( gc.hasClass('show--share') ) {
		// 	timer = setTimeout(function () {
		// 		btn.trigger('click');
		// 	}, 2500);
		// }
	},
	//Show Buttons Block (now it is show/hide)
	show: function () {
		var gc = showShare.gContainer; //Page Container
		
		gc.toggleClass('show--share');

		return false;
	},
	//Listen to Evenets on Block
	listener: function (obj, container) {
		obj.on('click', '.js-show-share', showShare.show);
		container.on('mouseleave', function () {
			showShare.close(true);
		});
	},
	//Init Function for Socials Block
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
	//Switch Type
	show: function (e) {
		//Prevents Default Behaviour
		e.preventDefault();

		var $target = $(e.currentTarget),
			cont = selectType.container;

		$target.addClass('btn--active')
			.siblings().removeClass('btn--active');

		//The main idea is to add or remove 'disabled'
		//Attribute to inputs. This lets us to send
		//Only data that we have chosen
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
	//Listener
	listener: function (obj) {
		obj.on('click', '.js-switch-type', selectType.show)
	},
	//Init Module
	init: function ($object) {
		//Cache DOM objects
		this.obj = $object, //Cache switcher
		this.container = this.obj.closest('.form__block'); //Cache container

		this.listener( this.obj ); //Start Listen to Events on Buttons

		console.info('listen to type selector');
	}
};

//Upload Module
var uploadImages = {
	//Add Uploaded Images to DOM
	createElems: function (data) {
		//Classes for elements
		var classes = {
				img: 'root__image',
				wm: 'watermark__image'
			},
			img = null, //Holder for generated image
			target = null; //Holder for element where we'll append img

		//Check if we have already created images
		//If we have - so we just update src value
		//Else we genereate image and append to target holder
		if ( data.type === 'original' && $('.' + classes.img).length > 0 ) {
			$('.' + classes.img).attr('src', data.path);
		} else if (data.type === 'watermark' && $('.' + classes.wm).length > 0) {
			$('.' + classes.wm).attr('src', data.path);
		} else {
			img = $('<img />', {
				src: data.path,
				class: (data.type === 'original') ? classes.img : classes.wm,
				alt: (data.type === 'original') ? 'Основная картинка' : 'Вотермарк'
			});
			target = (data.type === 'original') ? '.block__root' : '.block__watermark';

			$(target).append(img);
		}

		//Cache uploaded images
		uploadImages.image = (data.type === 'original') ? data.path : uploadImages.image;
		uploadImages.wm = (data.type === 'watermark') ? data.path : uploadImages.wm;

		//If we upload watermark image we need to give it
		//Appropriate opacity level, that we have set with
		//Opacity slider range
		if (data.type === 'watermark') {
			setOpacity.changeOpacity();
		}
	},
	//Generate AJAX response to upload file
	loadFile: function (e) {
		e.preventDefault();

		var jqxhr = $.ajax({
		    url: 'handlers/upload.php',
		    type: "POST",
		    dataType: "json",
		    cache: false,
		    data: new FormData(this),
		    processData:false,
		    contentType: false
		}),
		success = function (data) {
			console.log(data);

			uploadImages.createElems(data);
		},
		failure = function (data) {
			console.warn('Server returns error!');
			console.log(data);
		};

		jqxhr.done(success);
		jqxhr.fail(failure);
	},
	//Add filename to styled inputs
	showFileName: function (e) {
		var $input = $(e.currentTarget),
			fileName = $input.val().replace(/\\/g, '/').replace(/.*\//, ''),
			abstract = $input.siblings('.upload-block__style');

		if ( $input.data('type') === 'original' ) {
			$('#send-image').trigger('click');
		} else if ( $input.data('type') === 'watermark' ) {
			$('#send-wm').trigger('click');
		}

		abstract
			.find('.style__input')
				.addClass('loaded')
				.html(fileName);
	},
	//Listen for uploading
	listener: function (obj, form) {
		obj.on('change', this.showFileName);
		form.on('submit', this.loadFile)
	},
	//Init MOdule
	init: function ($input) {
		this.obj = $input; //Cache inputs
		this.form = $input.closest('.form--upload'); //Cache forms

		this.listener( this.obj, this.form ); //Init listener for Events

		console.info('listen for uploading');
	}
};

//Opacity slider
var setOpacity = {
	op: 52, //Default opacity value
	//Cache classes for images
	elems: {
		watermark: '.watermark__image',
		image: '.root__image'
	},
	//Reset Opacity Value to Default
	resetOpacity: function () {
		//Change Opacity Value to Default one
		this.op = 52;
		//Change Opacity Value on Watermark
		this.changeOpacity(this.op);
		//Return handle to default position
		$('.slider-range').slider('value', this.op);
		//Return lower to default position
		$('.slider--lower').css({
			width: this.op + '%'
		});
		//Set hidden input value to defauklt
		$('#opacity-value').attr('value', this.op);
	},
	//Function that changes Image opacity Level
	changeOpacity: function (val) {
		var wm = this.elems.watermark;

		val = val || this.op;

		$(wm).css({
			opacity: val/100
		});
	},
	//Style Slider Range with jQuery UI
	styleRange: function () {
		this.slider.slider({
			min: 0,
			max: 100,
			step: 1,
			value: setOpacity.op,
			orientation: 'horizontal',
			//Add darken element after styling main element
			create: function (e, ui) {
				$(this)
					.append(setOpacity.lower)
					.find('.slider--lower')
						.css({
							width: setOpacity.op + '%'
						});

				$('#opacity-value').attr('value', setOpacity.op);
			},
			//Executes on slide event
			slide: function(e, ui) {
				setOpacity.op = ui.value;

				$('.slider--lower').css({
					width: setOpacity.op + '%'
				});

				$('#opacity-value').attr('value', setOpacity.op);

				setOpacity.changeOpacity(setOpacity.op);
			} 
		});

		console.info('style opacity');
	},
	//Init Module
	init: function ($slider) {
		this.slider = $slider; //Slide element
		this.lower = $('<span />', {'class': 'slider--lower'}); //Create darken element

		this.styleRange(); //Style our this.slider element
	}
};

//Reset form or Download (Made it with private variables to keep pathes in secret)
var doneForm = (function() {
	//Paths
	var paths = {
		download: 'handlers/download.php',
		getfile: 'handlers/getfile.php'
	};

	//Download generated Image with Watermark
	//It gets Event object from click on submit button
	var downloadImg = function (e) {
		e.preventDefault();

		var img = uploadImages.image || '',
			wm = uploadImages.wm || '';

		//If we uploaded Images we can send query to generate one image
		if ( img.length > 0 && wm.length > 0 ) {

			var val = null, //POST params
				jqxhr = null, //Ajax Request
				success = null, //hold function when we get positive response
				failure = null; //holds function if we get error
			val = $(e.target).serialize() + '&image=' + img.replace('/', '^') + '&wm=' + wm.replace('/', '^');

//TODO: DELETE AFTER ADD PARTICIPANTS CODE
			console.log(val);

			jqxhr = $.ajax({
				url: paths.download,
				type: "POST",
				data: val,
				cache: true,
				dataType: 'json'
			});
			success = function (data) {
				console.info('file generated');
				window.location = paths.getfile + '?link=' + data.link;
			};
			failure = function (data) {
				console.warn('can\'t generate file', data);
			};

			jqxhr.done(success);
			jqxhr.fail(failure);
		} else {
			console.log(img, wm);
			console.log('нет изображений');
			return false;
		}
	};

 	//Reset All values to Default
	var resetForm = function () {
		setOpacity.resetOpacity();
	};

	return {
		//Listen on Button clicks
		listener: function ($form) {
			$form.on('click', '.btn--reset', resetForm);
			$form.on('submit', downloadImg);
		},
		//Init Module
		init: function ($form) {
			// this.form = $form; //Cache form
			this.listener($form); //Start listening
		}
	}
})();

$(function() {
	console.info('start app');

	showShare.init( $('.socials') );
	selectType.init( $('.application-types') );
	uploadImages.init( $('.input--upload') );
	setOpacity.init( $('.slider-range') );
	doneForm.init( $('.settings__form') );
	ruEng.init( $('.globals__lang') );
});