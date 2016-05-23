;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('SliderFooterController', SliderFooterController);

	SliderFooterController.$inject = ['$interval', 'lkSlider'];

	function SliderFooterController($interval, lkSlider) {
		var vm = this;
		var selector = '#vit-slider-content--footer';

		vm.changeContent = lkSlider.changeContent;
		
		activate();
		
		function activate() {
			lkSlider.init(selector);
		}
	}
})();