;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProductItemPageController', ProductItemPageController);

	ProductItemPageController.$inject = [
		'ngDialog', 
		'lkFunctions', 
		'lkSelectProduct', 
		'lkInsets', 
		'lkCart'
	];

	function ProductItemPageController(
		ngDialog, 
		lkFunctions, 
		lkSelectProduct, 
		lkInsets, 
		lkCart) {
		var vm = this;

		vm.setAmount = setAmount;
		vm.setVolume = setVolume;
		vm.getAmount = getAmount;
		vm.addToCart = addToCart;

		vm.controlInset = lkInsets.control;
		vm.clickToOpen = clickToOpen;

		activate();

		function activate() {
			lkInsets.init();
		}

		function setAmount(event, count) {
			var parent = angular.element(event.target).closest('[data-card-id]');
			var id = parseInt(parent.attr('data-card-id'));
			var title = angular.element(document.querySelector('[data-card-id="' + id + '"] .js-product-card__title')).text();
			var price = parseFloat(
				angular.element(document.querySelector('[data-card-id="' + id + '"] [data-price]'))
					.attr('data-price')
			);
			var image = angular.element(document.querySelector('.js-product-card__pic')).attr('src');
			var snippet = 'Жидкая форма';
				
			var options = {
				id: id,
				count: count,
				title: title,
				price: price,
				image: image,
				snippet: snippet
			}

			lkSelectProduct.setAmount(options);
		}

		function setVolume(event, count) {
			var target = angular.element(event.target);
			var parent = angular.element(event.target).closest('[data-card-id]');
			var id = parseInt(parent.attr('data-card-id'));
			var volume = parseInt(target.attr('data-volume-product'));
			var title = angular.element(document.querySelector('[data-card-id="' + id + '"] .js-product-card__title')).text();
			var price = parseFloat(
				angular.element(document.querySelector('[data-card-id="' + id + '"] [data-price]'))
					.attr('data-price')
			);
			var image = angular.element(document.querySelector('.js-product-card__pic')).attr('src');
			var snippet = 'Жидкая форма';
			
			var options = {
				id: id,
				volume: volume,
				title: title,
				price: price,
				image: image,
				snippet: snippet
			}

			lkSelectProduct.setVolume(options);
			addActiveClass(event, options.id, options.volume);
		}

		function getAmount(id) {
			if (lkSelectProduct.getAmount(id) === -1) {
				return 1;
			}

			return lkSelectProduct.getAmount(id);
		}

		function addActiveClass(event, id, volume) {
			var selectsAll = document.querySelectorAll('[data-card-id="' + id + '"] .js-select-product__item');
			var targets = document.querySelectorAll('[data-card-id="' + id + '"] [data-volume-product="' + volume + '"]');

			for (var i = 0, len = selectsAll.length; i < len; i++) {
				if (angular.element(selectsAll[i]).hasClass('js-select-product__item--active')) {
					angular.element(selectsAll[i]).removeClass('js-select-product__item--active');
				}
			}
			
			for (var i = 0, len = targets.length; i < len; i++) {
				if (!angular.element(targets[i]).hasClass('js-select-product__item--active')) {
					angular.element(targets[i]).addClass('js-select-product__item--active');
				}
			}
		}
		
		function addToCart(event) {
			var target = angular.element(event.target);
			var parent = angular.element(event.target).closest('[data-card-id]');
			var id = parseInt(parent.attr('data-card-id'));
			var amount = 1;
			var volume = parseInt(
				angular.element(
					document.querySelector('[data-card-id="' + id +'"] [data-volume-product]')
				)
				.attr('data-volume-product')
			);
			
			var title = angular.element(document.querySelector('[data-card-id="' + id + '"] .js-product-card__title')).text();
			var price = parseFloat(
				angular.element(document.querySelector('[data-card-id="' + id + '"] [data-price]'))
					.attr('data-price')
			);
			var image = angular.element(document.querySelector('.js-product-card__pic')).attr('src');
			var snippet = 'Жидкая форма';

			var options = {
				id: id,
				amount: amount,
				volume: volume,
				title: title,
				price: price,
				image: image,
				snippet: snippet
			}
			lkCart.addToCart(options);
		}

		function clickToOpen(templateId) {
			ngDialog.open({
				template: templateId,
				className: 'ngdialog-theme-default'
			});
		}
	}
})();