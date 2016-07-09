(function(){
    'use strict';
	angular.module('forms')
        .config(config);

	config.$inject = ['$routeProvider', '$locationProvider'];

	function config($routeProvider) {
        $routeProvider
            .when('/', {
                url: '/',
                templateUrl: './createAcct.html',
                controller: 'formController',
                controllerAs: 'formCtrl'
            })
            .when('/dashboard', {
                url: './dashboard',
                templateUrl: './dashboard.html',
                controller: 'formController',
                controllerAs: 'formCtrl'
            })
            .otherwise({
                redirectTo: '/'
        });
    }

})();