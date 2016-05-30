;
(function () {
	'use strict';

	angular
		.module('app')
		.directive('vitCart', vitCart);

	vitCart.$inject = [];

	function vitCart() {

		var directive = {
			replace: true,
			templateUrl: '../app/components/cart/cart.component.html',
			controller: 'CartController',
			controllerAs: 'cart',
			restrict: 'E',
			link: link
		};
		return directive;

		function link(scope, element, attrs) {
			var cart = element.find('.js-cart-action');

			scope.open = open;

			function open() {
				cart.toggleClass('js-cart-action--active');
			}
		}
	}
})();