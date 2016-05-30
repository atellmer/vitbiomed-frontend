;
(function() {
'use strict';

	angular
		.module('app')
		.controller('CartController', CartController);

	CartController.$inject = ['lkCart'];
	
	function CartController(lkCart) {
		var vm = this;
		
		vm.open = open;
		vm.amount = lkCart.getAmount;
		vm.getGeneralSum = lkCart.getGeneralSum;
		vm.products = lkCart.store;
		vm.removeItem = lkCart.removeItem;
		
		var cart = angular.element(document.querySelector('.js-cart-action'));
		
		activate();

		////////////////

		function activate() {}
		
		function open() {
			cart.toggleClass('js-cart-action--active');
		}
	}
})();