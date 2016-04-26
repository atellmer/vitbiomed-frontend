;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('MenuMobileController', MenuMobileController);

	MenuMobileController.$inject = [];

	function MenuMobileController() {
		var vm = this;
		var click = 0;
		vm.controlMenu = controlMenu;
		
		
		function controlMenu() {
			click++;
			
			if(click % 2) {
				console.log('show menu!');
			} else {
				console.log('hide menu!');
			}
		}
	}
})();