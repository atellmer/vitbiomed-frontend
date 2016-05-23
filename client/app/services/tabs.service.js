;
(function() {
'use strict';

	angular
		.module('app')
		.factory('lkTabs', lkTabs);

	lkTabs.$inject = [];
	
	function lkTabs() {
		var service = {
			switchTab: switchTab
		};
		
		return service;

		////////////////
		function switchTab(event) { 
			var parentId = angular.element(event.target.parentNode.parentNode).attr('data-tab-panel');
			var element = angular.element(event.target);
			var triggerId = element.attr('data-tab-trigger');
			var target = angular.element(document.querySelector('[data-tab-panel="' + parentId + '"] [data-tab-target="' + triggerId + '"]'));
			var tabs = document.querySelectorAll('[data-tab-panel="' + parentId + '"] [data-tab-target]');
			var buttons = document.querySelectorAll('[data-tab-panel="' + parentId + '"] [data-tab-trigger]');
			
			for (var i = 0; i < buttons.length; i++) {
				if (angular.element(buttons[i]).hasClass('tab-panel__btn--active')) {
					angular.element(buttons[i]).removeClass('tab-panel__btn--active');
				}
			}
			
			for (var i = 0; i < tabs.length; i++) {
				if (angular.element(tabs[i]).hasClass('tab-panel__item--active')) {
					angular.element(tabs[i]).removeClass('tab-panel__item--active');
				}
			}
			
			element.addClass('tab-panel__btn--active');
			target.addClass('tab-panel__item--active');		
		}
	}
})();