(function (angular) {

	'use strict';

	//módulo root do app
	angular.module('angularAutenticacao', [
		'angularAutenticacao.constants',
		'angularAutenticacao.controllers',
		'angularAutenticacao.services'

	]).config(function ($httpProvider) {
	    $httpProvider.interceptors.push([
	        '$injector',
	        function ($injector) {
	            return $injector.get('AuthInterceptor');
	        }
	    ]);
	});

	// Bootstrap do app
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['angularAutenticacao']);
	});

})(angular);