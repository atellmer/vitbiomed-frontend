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
		function setAmount(id, count, title, price, image, snippet) {
			if (lkFunctions.getCurIndexObjectInArray(service.store, 'id', id) === -1) {		
				service.store.push({
					id: id,
					amount: _counter(count, defaultData.amount),
					volume: defaultData.volume,
					title: title,
					price: price,
					image: image,
					snippet: snippet
				});
			} else {
				var index = lkFunctions.getCurIndexObjectInArray(service.store, 'id', id);
				service.store[index].amount = _counter(count, service.store[index].amount);
			}
			
			_logger(id);
		}

		function setVolume(id, volume, title, price, image, snippet) {
			var index = lkFunctions.getCurIndexObjectInArray(service.store, 'id', id);
			if (index === -1) {		
				service.store.push({
					id: id,
					amount: defaultData.amount,
					volume: volume,
					title: title,
					price: price,
					image: image,
					snippet: snippet
				});
			} else {
				service.store[index].volume = volume;	
			}
			
			_logger(id);
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