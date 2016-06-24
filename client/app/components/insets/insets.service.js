;
(function() {
'use strict';

	angular
		.module('app')
		.factory('lkInsets', lkInsets);

	lkInsets.$inject = ['lkFunctions'];
	
	function lkInsets(lkFunctions) {
		var service = {
			init: init,
			control: control
		};
		
		var click = [];
		var flag = true;
		
		return service;

		////////////////
		function init() { 
			click = lkFunctions.makeArrayOf(0, document.querySelectorAll('[data-inset-trigger]').length);
		}
		
		function control(event) {		
			var trigger = angular.element(event.target);
			var id = parseInt(trigger.attr('data-inset-trigger'));
			var target = angular.element(document.querySelector('[data-inset-target="' + id + '"]'));
			
			if (flag && trigger.attr('data-inset-show')) {
				click[id]++;
				flag = false;		
			}
			
			click[id]++;
			
			if (click[id] % 2) {
				target.show(200);
			} else {
				target.hide(200);
			}
		}
	}
})();