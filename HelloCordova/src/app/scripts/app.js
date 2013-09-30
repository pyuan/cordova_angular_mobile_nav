'use strict';

angular.module('srcApp', ["ajoslin.mobile-navigate"])
   /*
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        //templateUrl: 'views/main.html',
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  */
  .config(function($routeProvider) {
	  $routeProvider.when("/one", {
	    templateUrl: "views/page1.html"
	  }).when("/two", {
	    templateUrl: "views/page2.html",
	    transition: "modal" //this is overwritten by the go() in home.html
	  }).when("/popup", {
	    templateUrl: "views/popup.html",
	    transition: "modal"
	  }).when("/monkey", {
	    templateUrl: "views/monkey.html"
	  }).when("/backwards", {
	    templateUrl: "views/backwards.html",
	    reverse: true
	  }).when("/", {
	    templateUrl: "views/home.html"
	  }).otherwise({
	    redirectTo: "/"
	  });
	})
	.run(function($route, $http, $templateCache) {
	  angular.forEach($route.routes, function(r) {
	    if (r.templateUrl) { 
	      $http.get(r.templateUrl, {cache: $templateCache});
	    }
	  });
	})
	.controller('MainCtrl', function($scope, $navigate) {
	  $scope.$navigate = $navigate;
	})
	.directive('ngTap', function() {
	  var isTouchDevice = !!("ontouchstart" in window);
	  return function(scope, elm, attrs) {
	    if (isTouchDevice) {
	      var tapping = false;
	      elm.bind('touchstart', function() { tapping = true; });
	      elm.bind('touchmove', function() { tapping = false; });
	      elm.bind('touchend', function() { 
	        tapping && scope.$apply(attrs.ngTap);
	      });
	    } else {
	      elm.bind('click', function() {
	        scope.$apply(attrs.ngTap);
	      });
	    }
	  };
	});
