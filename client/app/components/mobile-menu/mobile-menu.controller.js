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
		var menu = angular.element(document.querySelector('#menu-mobile-body'));
		var btn = angular.element(document.querySelector('#menu-mobile-btn'));
		
		vm.controlMenu = controlMenu;
		
		
		function controlMenu(event) {
			click++;	
			
			if (click % 2) {
				if (menu.hasClass('display-hide')) {
					menu.removeClass('display-hide')
				}
				if (!btn.hasClass('menu-mobile__clicked')) {
					btn.addClass('menu-mobile__clicked')
				}
			} else {
				if (!menu.hasClass('display-hide')) {
					menu.addClass('display-hide')
				}
				if (btn.hasClass('menu-mobile__clicked')) {
					btn.removeClass('menu-mobile__clicked')
				}
			}
		}
	}
})();