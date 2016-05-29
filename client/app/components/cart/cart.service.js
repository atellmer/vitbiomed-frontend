;
(function () {
	'use strict';

	angular
		.module('app')
		.factory('lkCart', lkCart);

	lkCart.$inject = ['lkFunctions', 'lkSelectProduct'];

	function lkCart(lkFunctions, lkSelectProduct) {
		var service = {
			getAmount: getAmount,
			addToCart: addToCart,
			store: []
		};

		return service;

		////////////////
		function addToCart(options) {
			var indexProductsStore = lkFunctions.getCurIndexObjectInArray(lkSelectProduct.store, 'id', options.id);
			var indexCartStore = lkFunctions.getCurIndexObjectInArray(service.store, 'id', options.id);
			if (indexProductsStore !== -1) {
				if (indexCartStore === -1) {
					service.store.push(lkSelectProduct.store[indexProductsStore]);
				}
				if (indexCartStore !== -1) {
					service.store[indexCartStore] = lkSelectProduct.store[indexProductsStore];
				}
			} else {
				if (indexCartStore === -1) {
					service.store.push({
						id: options.id,
						amount: options.amount,
						volume: options.volume,
						title: options.title,
						price: options.price,
						image: options.image,
						snippet: options.snippet
					});
				}
			}

			console.log('cart: ', service.store);
		}
		
		function getAmount() {
			if (service.store) {
				return service.store.length;
			}
			return 0;
		}
	}
})();