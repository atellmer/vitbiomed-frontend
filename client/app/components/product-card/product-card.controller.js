;
(function() {
'use strict';

	angular
		.module('app')
		.controller('productCardController', productCardController);

	productCardController.$inject = ['lkSelectProduct', 'lkCart'];
	
	function productCardController(lkSelectProduct, lkCart) {
		var vm = this;
		
		vm.showDetail = showDetail;
		
		vm.setAmount = setAmount;
		vm.setVolume = setVolume;
		vm.getAmount = getAmount;
		vm.addToCart = addToCart;
		
		activate();

		////////////////
		function activate() {}
		
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

			lkSelectProduct.setAmount(id, count, title, price, image, snippet);
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
			
			lkSelectProduct.setVolume(id, volume, title, price, image, snippet);
			addActiveClass(event, id);
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
			var contentMain = angular.element(document.querySelector('[data-card-id="'+ cardId + '"] [data-card-content-type="main"]'));
			var contentOther = angular.element(document.querySelector('[data-card-id="'+ cardId + '"] [data-card-content-type="other"]'));
			
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
			var parent = angular.element(event.target).closest('[data-card-id]');
			var id = parent.attr('data-card-id');
			
			lkCart.addToCart(id);
		}
		
	}
})();