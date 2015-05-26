(function (angular) {

    'use strict';

    angular.module('angularAutenticacao.services', ['angularAutenticacao.factories'])
        .service('Session', function ($rootScope, $cookieStore, AUTH_EVENTS) {
        var storedSession = $cookieStore.get('userSession');
        var that = this;

        if(storedSession) {
            this.access_token = storedSession.access_token;
            this.user = storedSession.user;
        }

        this.create = function (sessionData) {
            this.access_token = sessionData.access_token;
            this.user = sessionData.user;
            $cookieStore.put('userSession', sessionData);
        };

        this.destroy = function () {
            that.access_token = null;
            that.user = null;
            $cookieStore.remove('userSession');
        };

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, this.destroy);
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, this.destroy);

        return this;

    });

})(angular);