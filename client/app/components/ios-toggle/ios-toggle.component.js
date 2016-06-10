;
(function () {
  'use strict';

	angular
		.module('app')
		.controller('IosToggleController', IosToggleController);

	IosToggleController.$inject = ['$scope'];

	function IosToggleController($scope) {
		var vm = this;

		activate();
		////////////////
		function activate() { 
		}

		var vm = this;
		var click = 0;

		vm.toggle = toggle;

		//functions
		function toggle(event) {
			var target = null;
			var body = null;
			var toggle = false;
			click++;

			if (angular.element(event.target).hasClass('js-ios-toggle__circle')) {
				target = angular.element(event.target);
				body = target.closest('.js-ios-toggle');
			} else {
				target = angular.element(event.target).find('.js-ios-toggle__circle');
				body = angular.element(event.target);
			}

			if (click % 2) {
				if (target.hasClass('js-ios-toggle__circle--slide-left')) {
					target.removeClass('js-ios-toggle__circle--slide-left');
				}
				if (!target.hasClass('js-ios-toggle__circle--slide-right')) {
					target.addClass('js-ios-toggle__circle--slide-right');
				}
			} else {
				if (target.hasClass('js-ios-toggle__circle--slide-right')) {
					target.removeClass('js-ios-toggle__circle--slide-right');
				}
				if (!target.hasClass('js-ios-toggle__circle--slide-left')) {
					target.addClass('js-ios-toggle__circle--slide-left');
				}
			}

			body.toggleClass('js-ios-toggle--inactive');

			if (body.hasClass('js-ios-toggle--inactive')) {
				toggle = true;
			}
			
			$scope.$emit('toggle:toggle', {
				id: vm.id,
				toggle: toggle
			});
		}
	}

  angular.module('app')
		.component('iosToggle', {
			bindings: {
				id: '@'
			},
			templateUrl: 'app/components/ios-toggle/ios-toggle.component.html',
			controller: 'IosToggleController as $ctrl'
		});

})();
