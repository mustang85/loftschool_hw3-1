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

		var $target = $(e.currentTarget);

		$target.addClass('btn--active')
			.siblings().removeClass('btn--active');

		if ($target.data('type') === 'use-four') {
			selectType.container
				.find('.block--borders')
				.removeClass('block--hidden')
				.siblings()
				.addClass('block--hidden');
		} else {
			selectType.container
				.find('.block--coordinates')
				.removeClass('block--hidden')
				.siblings()
				.addClass('block--hidden');
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
	createElems: function (data) {
		var img = $('<img />', {
				src: data.path,
				class: (data.type === 'original') ? 'root__image' : 'watermark__image',
				alt: (data.type === 'original') ? 'Основная картинка' : 'Вотермарк'
			}),
			target = (data.type === 'original') ? '.block__root' : '.block__watermark';

		$(target).append(img);

		if (data.type === 'watermark') {
			setOpacity.changeOpacity();
		}
	},
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
	listener: function (obj, form) {
		obj.on('change', this.showFileName);
		form.on('submit', this.loadFile)
	},
	init: function ($input) {
		this.obj = $input;
		this.form = $input.closest('.form--upload');

		this.listener( this.obj, this.form );

		console.info('listen for uploading');
	}
};

//Opacity slider
var setOpacity = {
	op: 52, //Default opacity value
	elems: {
		watermark: '.watermark__image',
		image: '.root__image'
	},
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
	changeOpacity: function (val) {
		var wm = this.elems.watermark;

		val = val || this.op;

		$(wm).css({
			opacity: val/100
		});
	},
	styleRange: function () {
		this.slider.slider({
			min: 0,
			max: 100,
			step: 1,
			value: setOpacity.op,
			orientation: 'horizontal',
			create: function (e, ui) {
				$(this)
					.append(setOpacity.lower)
					.find('.slider--lower')
						.css({
							width: setOpacity.op + '%'
						});

				$('#opacity-value').attr('value', setOpacity.op);
			},
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
	init: function ($slider) {
		this.slider = $slider;
		this.lower = $('<span />', {'class': 'slider--lower'});

		this.styleRange();
	}
};

//Reset form or Download
var doneForm = {
	resetForm: function () {
		setOpacity.resetOpacity();
	},
	listener: function () {
		this.form.on('click', '.btn--reset', this.resetForm);
	},
	init: function ($form) {
		this.form = $form;
		this.listener();
	}
};

$(function() {
	console.info('start app');

	showShare.init( $('.socials') );
	selectType.init( $('.application-types') );
	uploadImages.init( $('.input--upload') );
	setOpacity.init( $('.slider-range') );
	doneForm.init( $('.settings__form') );
});