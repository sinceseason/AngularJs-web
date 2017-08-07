define(function () {
    return function (appModule) {
        'use strict';

        appModule.run(['$rootScope', '$window', '$location', '$log', function ($rootScope, $window, $location, $log) {
            $rootScope.$on('$stateChangeStart', stateChangeStart);
            $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

            function stateChangeStart(event, toState, toParams, fromState, fromParams, options) {
                if (toState.url == "/login") {
                    $rootScope.redirectToLoginPage();
                    return;
                }

                if (fromState.name == "" && toState.name != "") {
                    switch (toState.url) {
                        default:
                            if (sessionStorage.loginedUser != undefined) {
                                $rootScope.loginedUser = JSON.parse(sessionStorage.loginedUser);
                                $rootScope.loadBasicData(false, toState.url);
                            } else {
                                $rootScope.redirectToPage(toState.url);
                            }
                            break;
                    }
                } else {
                    $rootScope.redirectToPage(toState.url);
                }
            }

            function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            }
        }]);
    }
});