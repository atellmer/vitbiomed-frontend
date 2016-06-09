;
(function() {
'use strict';

	angular
		.module('app')
		.factory('lkTabs', lkTabs);

	lkTabs.$inject = ['$rootScope'];
	
	function lkTabs($rootScope) {
		var service = {
			switchTab: switchTab,
			activeTab: {
				id: null,
				text: null
			}
		};
		
		return service;

		////////////////
		function switchTab(event) { 
			var parentId = angular.element(event.target).closest('[data-tab-panel]').attr('data-tab-panel');	
			var element = angular.element(event.target);
			var triggerId = element.attr('data-tab-trigger');
			var target = angular.element(document.querySelector('[data-tab-panel="' + parentId + '"] [data-tab-target="' + triggerId + '"]'));
			var tabs = document.querySelectorAll('[data-tab-panel="' + parentId + '"] [data-tab-target]');
			var buttons = document.querySelectorAll('[data-tab-panel="' + parentId + '"] [data-tab-trigger]');
			var targetBtn = angular.element(document.querySelector('[data-tab-panel="' + parentId + '"] [data-tab-trigger="'+ triggerId +'"]'));
			
			service.activeTab.id = angular.element(document.querySelector('[data-tab-panel="' + parentId + '"] [data-tab-trigger="'+ triggerId +'"]')).attr('data-tab-trigger');
			service.activeTab.text = angular.element(document.querySelector('[data-tab-panel="' + parentId + '"] [data-tab-trigger="'+ triggerId +'"]')).text();
			service.activeTab.text = service.activeTab.text.replace(/(^\s+|\s+$)/g,'');

			$rootScope.$broadcast('tabs:changeActive', {	
				id: service.activeTab.id,
				text: service.activeTab.text
			});


			for (var i = 0; i < buttons.length; i++) {
				if (angular.element(buttons[i]).hasClass('js-tab-panel__btn--active')) {
					angular.element(buttons[i]).removeClass('js-tab-panel__btn--active');
				}
			}
			
			for (var i = 0; i < tabs.length; i++) {
				if (angular.element(tabs[i]).hasClass('js-tab-panel__item--active')) {
					angular.element(tabs[i]).removeClass('js-tab-panel__item--active');
				}
			}
			
			target.addClass('js-tab-panel__item--active');
			targetBtn.addClass('js-tab-panel__btn--active');	
		}
	}
})();