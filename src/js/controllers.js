(function (angular) {

    'use strict';

    angular.module('angularAutenticacao.controllers', [])
        .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function (credentials) {
            AuthService.login(credentials).then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $location.path('/');
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    }).controller('MainController', function ($scope, AuthService, Session, USER_ROLES) {
        $scope.currentUser = function() {
            return Session.user;
        };
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
    });

})(angular);