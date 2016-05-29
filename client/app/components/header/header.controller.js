;
(function() {
'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['lkCart'];
	
	function HeaderController(lkCart) {
		var vm = this;
		
		vm.cart = lkCart.amount;
		

		activate();

		////////////////

		function activate() { 
			lkCart.init();
		}
	}
})();