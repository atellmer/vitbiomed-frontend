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
			getGeneralSum: getGeneralSum,
			removeItem: removeItem,
			store: []
		};

		return service;

		////////////////
		function addToCart(options) {	
			var indexProductsStore = lkFunctions.getCurIndexObjectInArray(lkSelectProduct.store, 'id', options.id);
			var indexCartStore = lkFunctions.getCurIndexObjectInArray(service.store, 'id', options.id);
			
			if (indexProductsStore === -1) {
				lkSelectProduct.store.push({
						id: options.id,
						amount: options.amount,
						volume: options.volume,
						title: options.title,
						price: options.price,
						image: options.image,
						snippet: options.snippet
					});
				indexProductsStore = lkFunctions.getCurIndexObjectInArray(lkSelectProduct.store, 'id', options.id);	
			} 

			if (indexProductsStore !== -1) {
				if (indexCartStore === -1) {
					service.store.push(lkSelectProduct.store[indexProductsStore]);
				}
				if (indexCartStore !== -1) {
					service.store[indexCartStore] = lkSelectProduct.store[indexProductsStore];
				}
			}
		}
		
		function getAmount() {
			if (service.store) {
				return service.store.length;
			}
			return 0;
		}
		
		function getGeneralSum() {
			var sum = 0;
			if (service.store) {
				for (var i = 0, len = service.store.length; i < len; i++) {
					sum += parseFloat(service.store[i].amount * service.store[i].price);
				}
			}
			return sum;
		}
		
		function removeItem(id) {
			var indexProductsStore = lkFunctions.getCurIndexObjectInArray(lkSelectProduct.store, 'id', parseInt(id));
			var indexCartStore = lkFunctions.getCurIndexObjectInArray(service.store, 'id', parseInt(id));

			lkSelectProduct.store.splice(indexProductsStore, 1);
			service.store.splice(indexCartStore, 1);
		}
	}
})();