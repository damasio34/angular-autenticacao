(function (angular) {

	'use strict';

	//módulo root do app
	angular.module('angularAutenticacao', [
		'ui-bootstrap',
		'angularAutenticacao.constants',
		'angularAutenticacao.controllers',
		'angularAutenticacao.factories',
		'angularAutenticacao.services',
		'angularAutenticacao.directives'

	]).config(function ($httpProvider) {
	    $httpProvider.interceptors.push([
	        '$injector',
	        function ($injector) {
	            return $injector.get('AuthInterceptor');
	        }
	    ]);
	});

	// // Bootstrap do app
	// angular.element(document).ready(function() {
	// 	angular.bootstrap(document, ['angularAutenticacao']);
	// });

})(angular);