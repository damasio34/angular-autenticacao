(function (angular) {

    'use strict';

    angular.module('angularAutenticacao.factories', [])
        .factory('AuthService', function ($http, Session) {

            var authService = {};

            authService.login = function (credentials) {
                return $http.post('/login' + credentials)
                    .then(function (res) {
                        Session.create(res.data);
                    });
            };

            authService.isAuthenticated = function () {
                return !!Session.user;
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                    authorizedRoles.indexOf(Session.userRole));
            };

            return authService;

        }).factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS, Session) {
            return {
                request: function (config) {
                    config.headers['Authorization'] = 'Bearer ' + Session.access_token;
                    return config || $q.when(config);
                }
            },
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                    }[response.status], response);
                return $q.reject(response);
                }
            };
        });

})(angular);