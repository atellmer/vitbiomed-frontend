;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProductItemPageController', ProductItemPageController);

	ProductItemPageController.$inject = ['ngDialog', 'lkFunctions', 'lkSelectProduct', 'lkInsets'];

	function ProductItemPageController(ngDialog, lkFunctions, lkSelectProduct, lkInsets) {
		var vm = this;
		
		vm.product = lkSelectProduct.product;
		vm.setAmount = lkSelectProduct.setAmount;
		vm.setVolume = lkSelectProduct.setVolume;
		vm.getAmount = lkSelectProduct.getAmount;
		
		vm.controlInset = lkInsets.control;
		vm.clickToOpen = clickToOpen;
		
		activate();
		
		function activate() {
			lkSelectProduct.init();
			
			lkInsets.init();
		}

		function clickToOpen(templateId) {
			ngDialog.open({ 
				template: templateId, 
				className: 'ngdialog-theme-default' 
			});
		}
	}
})();