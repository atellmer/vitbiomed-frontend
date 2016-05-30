;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('MobileMenuController', MobileMenuController);

	MobileMenuController.$inject = [];

	function MobileMenuController() {
		var vm = this;
		var click = 0;
		var menu = angular.element(document.querySelector('#menu-mobile-body'));
		var btn = angular.element(document.querySelector('#menu-mobile-btn'));
		
		vm.controlMenu = controlMenu;
		
		function controlMenu(event) {
			menu.toggleClass('display-hide');
			btn.toggleClass('menu-mobile__clicked');	
		}
	}
})();