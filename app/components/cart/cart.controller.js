;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('CartController', CartController);

	CartController.$inject = ['$scope', '$timeout', 'lkCart'];

	function CartController($scope, $timeout, lkCart) {
		var vm = this;
		var cart = null;

		vm.visibility = lkCart.visibility;
		vm.open = open;
		vm.amount = lkCart.getAmount;
		vm.getGeneralSum = lkCart.getGeneralSum;
		vm.products = lkCart.store;
		vm.removeItem = lkCart.removeItem;

		activate();

		////////////////

		function activate() {
			$scope.$on('cart:visibility', function (event, data) {
				vm.visibility = data.visibility;

				$timeout(function () {
					cart = angular.element(document.querySelector('.js-cart-action'));
					cart.addClass('js-cart-action--animated');
									
					$timeout(function (){
						lkCart.visibility = false;
						vm.visibility = lkCart.visibility;
						cart.removeClass('js-cart-action--animated');				
					}, 5000);

				}, 0);
			});
		}

		function open() {
			lkCart.visibility = !lkCart.visibility;
			vm.visibility = lkCart.visibility;
		}
	}
})();

