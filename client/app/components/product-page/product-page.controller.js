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
		var volumeProduct = 0;
		
		vm.debug = 'Some text for debug';
		
		vm.controlInset = controlInset;
		vm.clickToOpen = clickToOpen;
		vm.amountProduct = 0;	
		vm.changeAmount = changeAmount;
		vm.selectVolume = selectVolume;
		vm.addActiveClass = addActiveClass;
		
		activate();
		
		function activate() {
			click = makeArrayOf(0, 3);
		}
		
		
		function controlInset(event) {				
			var trigger = angular.element(event.target);
			var id = parseInt(trigger.attr('data-description-trigger'));	
			var target = angular.element(document.querySelector('[data-description-target="' + id + '"]'));
			
			click[id]++;
			
			if(click[id] % 2) {
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
			if(count < 0 && vm.amountProduct > 0) {
				vm.amountProduct += count;
			}
			if(count > 0) {
				vm.amountProduct += count;
			}
			console.log('Количество: ', vm.amountProduct);
		}
		
		function selectVolume(volume) {
			volumeProduct = volume;
			console.log('Объем: ', volume);
		}
		
		function addActiveClass(event) {
			var target = angular.element(event.target);
			
			var selects = document.querySelectorAll('.select-items__item');
			
			for(var i = 0; i < selects.length; i++) {
				if(angular.element(selects[i]).hasClass('select-items__item--active')) {
					angular.element(selects[i]).removeClass('select-items__item--active');
				}
			}
			
			if(!target.hasClass('select-items__item--active')) {
				target.addClass('select-items__item--active');
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