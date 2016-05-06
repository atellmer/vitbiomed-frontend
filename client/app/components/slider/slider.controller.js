;
(function () {
	'use strict';

	angular
		.module('app')
		.controller('SliderController', SliderController);

	SliderController.$inject = ['$interval'];

	function SliderController($interval) {
		var vm = this;
		var slider = angular.element(document.querySelector('#vit-slider-content'));
		var delay = parseInt(angular.element(document.querySelector('#vit-slider')).attr('data-slider-delay')) || 8000;
		var timer = startInterval(delay);
		
		vm.changeContent = changeContent;
		
		
		activate();
		
		
		function activate() {
			hideAllUnlessFirst();
		}
		
		function changeContent(count) {
			var children = slider.children();
			
			$interval.cancel(timer);
			timer = startInterval(delay);
			
			for (var i = 0; i < children.length; i++) {
				if (!angular.element(children[i]).hasClass('display-hide')) {
					angular.element(children[i]).addClass('display-hide');
					
					if (count > 0) {
						if (children[i + 1]) {
							if (angular.element(children[i + 1]).hasClass('slide-left')) {
								angular.element(children[i + 1])
									.removeClass('display-hide')
									.removeClass('slide-left')
									.addClass('slide-right');
							} else {
								angular.element(children[i + 1])
									.removeClass('display-hide')
									.addClass('slide-right');
							}
							break;
						} else {
							if (angular.element(children[0]).hasClass('slide-left')) {
								angular.element(children[0])
									.removeClass('display-hide')
									.removeClass('slide-left')
									.addClass('slide-right');
							} else {
								angular.element(children[0])
									.removeClass('display-hide')
									.addClass('slide-right');
							}
							break;
						}
					} else {
						if (children[i - 1]) {
							if (angular.element(children[i - 1]).hasClass('slide-right')) {
								angular.element(children[i - 1])
									.removeClass('display-hide')
									.removeClass('slide-right')
									.addClass('slide-left');
							} else {
								angular.element(children[i - 1])
									.removeClass('display-hide')
									.addClass('slide-left');
							}
							break;
						} else {
							if (angular.element(children[children.length - 1]).hasClass('slide-right')) {
								angular.element(children[children.length - 1])
									.removeClass('display-hide')
									.removeClass('slide-right')
									.addClass('slide-left');
							} else {
								angular.element(children[children.length - 1])
									.removeClass('display-hide')
									.addClass('slide-left');
							}
							break;
						}
					}
				}
			}
		}
		
		function hideAllUnlessFirst() {
			var children = slider.children();
			
			for (var i = 1; i < children.length; i++) {
				if (!angular.element(children[i]).hasClass('display-hide')) {
					angular.element(children[i]).addClass('display-hide');
				}
			}
		}
		
		function startInterval(delay) {
			return $interval(function() {
						changeContent(1);
					}, delay);
		}
	}
}());