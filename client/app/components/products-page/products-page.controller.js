;
(function() {
'use strict';

	angular
		.module('app')
		.controller('productsPageController', productsPageController);

	productsPageController.$inject = ['lkTabs'];
	
	function productsPageController(lkTabs) {
		var vm = this;
		
		vm.switchTab = lkTabs.switchTab;

		activate();

		////////////////
		function activate() { 
			
		}
	}
})();