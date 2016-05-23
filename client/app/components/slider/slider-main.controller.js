;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('SliderMainController', SliderMainController);

	SliderMainController.$inject = ['$interval', 'lkSlider'];

	function SliderMainController($interval, lkSlider) {
		var vm = this;
		var selector = '#vit-slider-content--main';
		
		vm.changeContent = lkSlider.changeContent;
		
		activate();
		
		function activate() {
			lkSlider.init(selector);
		}
	
	}
})();