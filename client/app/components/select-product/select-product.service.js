;
(function () {
	'use strict';

	angular
		.module('app')
		.factory('lkSelectProduct', lkSelectProduct);

	lkSelectProduct.$inject = ['lkFunctions'];

	function lkSelectProduct(lkFunctions) {
		var service = {
			init: init,
			setAmount: setAmount,
			setVolume: setVolume,
			getAmount: getAmount,
			product: {
				id: [],
				amount: [],
				volume: []
			}
		};

		var defaultData = {
			volume: 60,
			amount: 1
		}

		return service;

		////////////////
		function init() {
			var length = document.querySelectorAll('[data-select-product]').length;
			service.product.amount = lkFunctions.makeArrayOf(defaultData.amount, length);
			service.product.volume = lkFunctions.makeArrayOf(defaultData.volume, length);
		}

		function setAmount(event, count) {
			var parent = angular.element(event.target).closest('[data-select-product]');
			var id = parseInt(parent.attr('data-select-product'));

			if (getCurrentIndex(id) === -1) {
				service.product.id.push(id);
			}
			
			service.product.amount[getCurrentIndex(id)] = counter(count, service.product.amount[getCurrentIndex(id)]);
		

			function counter(count, amount) {
				if (count < 0 && amount > 1) {
					amount += count;
				}
				if (count > 0) {
					amount += count;
				}
				return amount
			}

			logger(id);
		}

		function setVolume(event) {
			var target = angular.element(event.target);
			var parent = angular.element(event.target).closest('[data-select-product]');
			var id = parseInt(parent.attr('data-select-product'));

			if (getCurrentIndex(id) === -1) {
				service.product.id.push(id);
			}

			service.product.volume[getCurrentIndex(id)] = parseInt(target.attr('data-volume-product'));

			addActiveClass(id);
			logger(id);
		}
		
		function getAmount(id) {
			if(service.product.amount[getCurrentIndex(id)]) {
				return service.product.amount[getCurrentIndex(id)];
			}
			return defaultData.amount;
		}


		/////////////////
		function logger(id) {
			console.log('product: ', {
				id: id,
				amount: service.product.amount[getCurrentIndex(id)],
				volume: service.product.volume[getCurrentIndex(id)]
			});
		}

		function getCurrentIndex(id) {
			return _.indexOf(service.product.id, id);
		}

		function addActiveClass(id) {
			var selectsAll = document.querySelectorAll('[data-select-product="' + id + '"] .js-select-product__item');
			var selects = document.querySelectorAll('[data-select-product="' + id + '"] .js-select-product__item[data-volume-product="' + service.product.volume[getCurrentIndex(id)] + '"]');

			for (var i = 0; i < selectsAll.length; i++) {
				if (angular.element(selectsAll[i]).hasClass('js-select-product__item--active')) {
					angular.element(selectsAll[i]).removeClass('js-select-product__item--active');
				}
			}

			for (var i = 0; i < selects.length; i++) {
				if (!angular.element(selects[i]).hasClass('js-select-product__item--active')) {
					angular.element(selects[i]).addClass('js-select-product__item--active');
				}
			}
		}
	}
})();