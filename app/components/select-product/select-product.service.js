;
(function () {
	'use strict';

	angular
		.module('app')
		.factory('lkSelectProduct', lkSelectProduct);

	lkSelectProduct.$inject = ['lkFunctions'];

	function lkSelectProduct(lkFunctions) {
		var service = {
			setAmount: setAmount,
			setVolume: setVolume,
			getAmount: getAmount,
			store: []
		};

		var defaultData = {
			volume: 60,
			amount: 1
		}

		return service;

		////////////////
		function setAmount(options) {
			var index = lkFunctions.getCurIndexObjectInArray(service.store, 'id', options.id);
			if (index === -1) {		
				service.store.push({
					id: options.id,
					amount: _counter(options.count, defaultData.amount),
					volume: defaultData.volume,
					title: options.title,
					price: options.price,
					image: options.image,
					snippet: options.snippet
				});
			} else {	
				service.store[index].amount = _counter(options.count, service.store[index].amount);
			}
			
			_logger(options.id);
		}

		function setVolume(options) {
			var index = lkFunctions.getCurIndexObjectInArray(service.store, 'id', options.id);
			if (index === -1) {		
				service.store.push({
					id: options.id,
					amount: defaultData.amount,
					volume: options.volume,
					title: options.title,
					price: options.price,
					image: options.image,
					snippet: options.snippet
				});
			} else {
				service.store[index].volume = options.volume;	
			}
			
			_logger(options.id);
		}

		function getAmount(id) {
			var index = lkFunctions.getCurIndexObjectInArray(service.store, 'id', id);
			if (index === -1) {
				return -1;
			} else {
				return service.store[index].amount;
			}
		}

		/////////////////
		function _logger(id) {
			var index = lkFunctions.getCurIndexObjectInArray(service.store, 'id', id);
			if (index === -1) {
				return console.log('object not found!');
			}
			console.log('product: ', service.store[index]);
		}

		function _counter(count, amount) {
			if (count < 0 && amount > 1) {
				amount += count;
			}
			if (count > 0) {
				amount += count;
			}
			return amount
		}
	}
})();