;
(function() {
'use strict';

	angular
		.module('app')
		.controller('CartController', CartController);

	CartController.$inject = ['lkCart'];
	
	function CartController(lkCart) {
		var vm = this;
		
		vm.amount = lkCart.getAmount;
		

		activate();

		////////////////

		function activate() {}
	}
})();