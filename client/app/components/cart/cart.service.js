;
(function() {
'use strict';

	angular
		.module('app')
		.factory('lkCart', lkCart);

	lkCart.$inject = ['lkSelectProduct'];
	
	function lkCart(lkSelectProduct) {
		var service = {
			init: init,
			amount: 10,
			store: [],
			addToCart: addToCart
		};
		
		return service;

		////////////////
		function init() { 
			console.log('cart service');
		}
		
		function addToCart(id) {
			console.log(id);
		}
	}
})();