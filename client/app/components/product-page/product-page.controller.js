;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProductPageController', ProductPageController);

	ProductPageController.$inject = ['ngDialog'];

	function ProductPageController(ngDialog) {
		var vm = this;
		var click = [];
		
		vm.volumeProduct = 60;
		vm.amountProduct = 1;
		vm.controlInset = controlInset;
		vm.clickToOpen = clickToOpen;
		vm.changeAmount = changeAmount;
		vm.selectVolume = selectVolume;
		
		activate();
		
		function activate() {
			click = makeArrayOf(0, 3);
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
		
			function changeAmount(count) {
			if (count < 0 && vm.amountProduct > 1) {
				vm.amountProduct += count;
			}
			if (count > 0) {
				vm.amountProduct += count;
			}
			console.log('Amount: ', vm.amountProduct);
		}
		
		function selectVolume(event) {
			var target = angular.element(event.target);
			vm.volumeProduct = parseInt(target.attr('data-volume-product'));
			console.log('Value: ', vm.volumeProduct);
			
			addActiveClass();
		}
		
		function addActiveClass() {
			var selectsAll = document.querySelectorAll('.select-items__item');
			var selects = document.querySelectorAll('.select-items__item[data-volume-product="' + vm.volumeProduct + '"]');
				
			for (var i = 0; i < selectsAll.length; i++) {
				if (angular.element(selectsAll[i]).hasClass('select-items__item--active')) {
					angular.element(selectsAll[i]).removeClass('select-items__item--active');
				}
			}
			
			for (var i = 0; i < selects.length; i++) {
				if (!angular.element(selects[i]).hasClass('select-items__item--active')) {
					angular.element(selects[i]).addClass('select-items__item--active');
				}
			}
		}
		
		function makeArrayOf(value, length) {
			var array = [];
			
			while (length--) {
				array[length] = value;
			}
		  return array;
		}
	}
})();