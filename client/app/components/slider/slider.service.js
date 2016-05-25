;
(function() {
'use strict';

	angular
		.module('app')
		.factory('lkSlider', lkSlider);

	lkSlider.$inject = ['$interval'];
	
	function lkSlider($interval) {
		var service = {
			init: init,
			changeContent: changeContent
		};
		
		var timer = {
			name: [],
			nodeName: []
		};
		
		return service;

		////////////////
		function changeContent(count, nodeName) {
			var children =  angular.element(document.querySelector(nodeName)).children();
			var delay = delayInit(nodeName);
			
			for(var i = 0; i < timer.name.length; i++) {
				if(timer.nodeName[i] === nodeName) {
					$interval.cancel(timer.name[i]);
					timer.name[i] = startInterval(nodeName);
				}		
			}
			
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
		
		function hideAllUnlessFirst(nodeName) {
			var children = angular.element(document.querySelector(nodeName)).children();
			
			for (var i = 1; i < children.length; i++) {
				if (!angular.element(children[i]).hasClass('display-hide')) {
					angular.element(children[i]).addClass('display-hide');
				}
			}
		}
		
		function delayInit(nodeName) {
			return parseInt(angular.element(document.querySelector(nodeName)).attr('data-slider-delay')) || 8000;
		}
		
		function startInterval(nodeName) {
			var delay = delayInit(nodeName);
			
			return $interval(function() {
						changeContent(1, nodeName);
					}, delay);
		}
		
		function overflowXHidden() {
			angular.element('body').css('overflow-x', 'hidden');
		}
		
		function init(nodeName) {
			hideAllUnlessFirst(nodeName);
			overflowXHidden();
			timer.name.push(startInterval(nodeName));
			timer.nodeName.push(nodeName);	
		}
	}
})();