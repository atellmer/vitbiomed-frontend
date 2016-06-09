;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('SelectController', SelectController);

	SelectController.$inject = ['$scope'];

	function SelectController($scope) {
		var vm = this;

		vm.open = open;
		vm.change = change;
		vm.selectName = null;


		activate();

		////////////////

		function activate() {
			addActiveClass(0);
			subscribeOnChangeActiveTabs();
		}

		function open(event) {
			var parent = angular.element(event.target).closest('.js-vit-select');
			var items = parent.find('.js-vit-select__items').toggleClass('js-vit-select__items--active');
		}

		function change(event) {
			var parent = angular.element(event.target).closest('.js-vit-select');
			var items = parent.find('.js-vit-select__items').toggleClass('js-vit-select__items--active');
		}

		function addActiveClass(id) {
			var items = document.querySelectorAll('.vit-select__items [data-tab-trigger]');

			for (var i = 0, len = items.length; i < len; i++) {
				if (angular.element(items[i]).hasClass('js-vit-select__item--active')) {
					angular.element(items[i]).removeClass('js-vit-select__item--active');
				}
			}

			angular.element(document.querySelector('.vit-select__items [data-tab-trigger="' + id + '"]')).toggleClass('js-vit-select__item--active');
		}

		function subscribeOnChangeActiveTabs() {
			$scope.$on('tabs:changeActive', function (event, data) {
				vm.selectName = data.text;
				addActiveClass(data.id);
			});
		}
	}
})();