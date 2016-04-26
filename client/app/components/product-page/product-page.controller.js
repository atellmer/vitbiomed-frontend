;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('productPageController', productPageController);

	productPageController.$inject = [];

	function productPageController() {
		var vm = this;
		var click = new Array(3).fill(0);
		vm.controlInset = controlInset;
		
		
		function controlInset(event) {	
			var trigger = angular.element(event.target);
			var id = parseInt(trigger.attr('id').split('description-trigger-')[1]);	
			var target = angular.element(document.querySelector('#description-target-' + id));
			
			click[id]++;
			
			if(click[id] % 2) {
				target.show('slow');	
			} else {
				target.hide('slow');
			}
		}
	}
})();