(function (angular) {

    'use strict';

    angular.module('angularAutenticacao.factories', [])
        .directive('loginDialog', function (Session, AUTH_EVENTS) {
            return {
                restrict: 'A',
                template: '
        \'views/login_dialog.html\'">',
                link: function (scope, element, attrs) {
                    var showModal = function() {
                        scope.visible = true;
                    };

                    scope.visible = false;
                    scope.$on(AUTH_EVENTS.notAuthenticated, showModal);
                    scope.$on(AUTH_EVENTS.sessionTimeout, showModal);
            }};
        });

})(angular);