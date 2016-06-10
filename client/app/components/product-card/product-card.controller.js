;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProductCardController', ProductCardController);

	ProductCardController.$inject = ['$scope', 'lkSelectProduct', 'lkCart', 'CoursesPageDataService'];

	function ProductCardController($scope, lkSelectProduct, lkCart, CoursesPageDataService) {
		var vm = this;

		vm.showDetail = showDetail;
		vm.setAmount = setAmount;
		vm.setVolume = setVolume;
		vm.getAmount = getAmount;
		vm.addToCart = addToCart;
		vm.toggle = [];
		vm.cards = [];

		activate();

		////////////////
		function activate() {
			subscribeOnChangeToggle();
			vm.cards = CoursesPageDataService.data;
			console.log(CoursesPageDataService.data);
		 }

		function setAmount(event, count) {
			var parent = angular.element(event.target).closest('[data-card-id]');
			var id = parseInt(parent.attr('data-card-id'));

			var metadata = _getMetadata(id);

			var options = {
				id: id,
				count: count,
				title: metadata.title,
				price: metadata.price,
				image: metadata.image,
				snippet: metadata.snippet
			}

			lkSelectProduct.setAmount(options);
		}

		function setVolume(event, count) {
			var target = angular.element(event.target);
			var parent = angular.element(event.target).closest('[data-card-id]');
			var id = parseInt(parent.attr('data-card-id'));
			var volume = parseInt(target.attr('data-volume-product'));

			var metadata = _getMetadata(id);

			var options = {
				id: id,
				volume: volume,
				title: metadata.title,
				price: metadata.price,
				image: metadata.image,
				snippet: metadata.snippet
			}

			lkSelectProduct.setVolume(options);
			addActiveClass(event, options.id);
		}

		function getAmount(id) {
			if (lkSelectProduct.getAmount(id) === -1) {
				return 1;
			}

			return lkSelectProduct.getAmount(id);
		}

		function addActiveClass(event, id) {
			var selectsAll = document.querySelectorAll('[data-card-id="' + id + '"] .js-select-product__item');
			var target = angular.element(event.target);

			for (var i = 0, len = selectsAll.length; i < len; i++) {
				if (angular.element(selectsAll[i]).hasClass('js-select-product__item--active')) {
					angular.element(selectsAll[i]).removeClass('js-select-product__item--active');
				}
			}

			if (!target.hasClass('js-select-product__item--active')) {
				target.addClass('js-select-product__item--active');
			}
		}

		function showDetail(event) {
			var cardId = angular.element(event.target.parentNode.parentNode.parentNode).attr('data-card-id');
			var typeBtn = angular.element(event.target).attr('data-card-button-type');
			var contentMain = angular.element(document.querySelector('[data-card-id="' + cardId + '"] [data-card-content-type="main"]'));
			var contentOther = angular.element(document.querySelector('[data-card-id="' + cardId + '"] [data-card-content-type="other"]'));

			if (typeBtn === 'info-open') {
				if (contentMain.hasClass('js-product-card__content--active')) {
					contentMain.removeClass('js-product-card__content--active');
				}
				if (!contentOther.hasClass('js-product-card__content--active')) {
					contentOther.addClass('js-product-card__content--active');
				}
			}

			if (typeBtn === 'info-close') {
				if (contentOther.hasClass('js-product-card__content--active')) {
					contentOther.removeClass('js-product-card__content--active');
				}
				if (!contentMain.hasClass('js-product-card__content--active')) {
					contentMain.addClass('js-product-card__content--active');
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
					document.querySelector('[data-card-id="' + id + '"] [data-volume-product]')
				)
					.attr('data-volume-product')
			);

			var metadata = _getMetadata(id);

			var options = {
				id: id,
				amount: amount,
				volume: volume,
				title: metadata.title,
				price: metadata.price,
				image: metadata.image,
				snippet: metadata.snippet
			}
			lkCart.addToCart(options);

			lkCart.changeVisibility(true);
		}

		function subscribeOnChangeToggle() {
			$scope.$on('toggle:toggle', function(event, data) {
				vm.toggle[data.id] = data.toggle;

				console.log('id:', data.id);
				console.log('toggle:', data.toggle);
			});
		}

		
		function _getMetadata(id) {
			var title = angular.element(
				document.querySelector('[data-card-id="' + id + '"] [data-metadata-title]')
			).attr('data-metadata-title');

			var price = parseFloat(
				angular.element(
					document.querySelector('[data-card-id="' + id + '"] [data-metadata-price]')
				).attr('data-metadata-price')
			);

			var image = angular.element(
				document.querySelector('[data-card-id="' + id + '"] [data-metadata-image]')
			).attr('data-metadata-image');

			var snippet = angular.element(
				document.querySelector('[data-card-id="' + id + '"] [data-metadata-snippet]')
			).attr('data-metadata-snippet');
			
			var metadata = {
				title: title,
				price: price,
				image: image,
				snippet: snippet	
			}
			
			return metadata;
		}

	}
})();