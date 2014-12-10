var showShare = {
	show: function () {
		showShare.obj
			.closest('.container')
			.toggleClass('show--share');
	},
	listener: function (obj) {
		obj.on('click', '.js-show-share', showShare.show)
	},
	init: function ($object) {
		this.obj = $object;

		this.listener( this.obj );

		console.info('listen to socials panel');
	}
};

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

$(function() {
	console.info('start app');

	showShare.init( $('.socials') );
	selectType.init( $('.application-types') );
});