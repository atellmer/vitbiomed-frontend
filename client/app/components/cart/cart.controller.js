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
		vm.getGeneralSum = lkCart.getGeneralSum;
		vm.products = lkCart.store;
		vm.removeItem = lkCart.removeItem;
		

		activate();

		////////////////

		function activate() {}
	}
})();