;
(function() {
'use strict';

	angular
		.module('app')
		.controller('productCardController', productCardController);

	productCardController.$inject = [];
	
	function productCardController() {
		var vm = this;
		
		vm.showDetail = showDetail;
		
		activate();

		////////////////

		function activate() { 

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
		
	}
})();