;
(function () {
	'use strict';

	angular
		.module('app')
		.directive('vitMenuMobile', vitMenuMobile);

	function vitMenuMobile() {
		var directive =  {
			templateUrl: '../app/components/menu-mobile/menu-mobile.html',
			replace: true,
			restrict: 'E',
			controller: 'MenuMobileController',
			controllerAs: 'vm'
		}
		
		return directive;
	}
})();