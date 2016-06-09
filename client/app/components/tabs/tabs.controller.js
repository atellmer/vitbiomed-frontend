;
(function() {
'use strict';

	angular
		.module('app')
		.controller('TabsController', TabsController);

	TabsController.$inject = ['lkTabs'];

	function TabsController(lkTabs) {
		var vm = this;
		
		vm.switchTab = switchTab;

		activate();

		////////////////

		function activate() { }

		function switchTab(event, styleBtn) {

			lkTabs.switchTab(event, styleBtn);
		}
	}
})();