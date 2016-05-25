;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProductItemPageController', ProductItemPageController);

	ProductItemPageController.$inject = ['ngDialog', 'lkFunctions', 'lkSelectProduct'];

	function ProductItemPageController(ngDialog, lkFunctions, lkSelectProduct) {
		var vm = this;
		var click = [];
		
		vm.product = lkSelectProduct.product;
		vm.setAmount = lkSelectProduct.setAmount;
		vm.setVolume = lkSelectProduct.setVolume;
		vm.getAmount = lkSelectProduct.getAmount;
		
		vm.controlInset = controlInset;
		vm.clickToOpen = clickToOpen;
		
		activate();
		
		function activate() {
			lkSelectProduct.init();
			
			click = lkFunctions.makeArrayOf(0, document.querySelectorAll('[data-description-trigger]').length);
		}
		
		function controlInset(event) {				
			var trigger = angular.element(event.target);
			var id = parseInt(trigger.attr('data-description-trigger'));
			var target = angular.element(document.querySelector('[data-description-target="' + id + '"]'));
			
			click[id]++;
			
			if (click[id] % 2) {
				target.show(200);
			} else {
				target.hide(200);
			}
		}

		function clickToOpen(templateId) {
			ngDialog.open({ 
				template: templateId, 
				className: 'ngdialog-theme-default' 
			});
		}
	}
})();