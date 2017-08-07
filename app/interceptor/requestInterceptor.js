define(function () {
    'use strict';

    return function (appModule) {
        appModule.factory('RequestInterceptor', function ($rootScope, $location, usSpinnerService, utilService) {
            return {
                request: function (config) {
                    usSpinnerService.spin('spinner');
                    // Header - Token
                    config.headers = config.headers || {};
                    if (sessionStorage.loginedUserId) {
                        config.headers.token = sessionStorage.loginedUserId;
                    }
                    return config;
                }, response: function (response) {
                    usSpinnerService.stop('spinner');
                    if (response.config.method == "POST") {
                        var data = response.data;
                        if (data.result == "FAILED" && data.errorCode == 1) {
                            getScope().rootDialogPage = "./views/dialog/alarm/session_timeout.html";
                            utilService.showDialog("rootDialog");
                            return;
                        }
                    }
                    return response;
                }, responseError: function (response) {
                    usSpinnerService.stop('spinner');
                    if (response.config.method == "POST" && response.status == -1 && $location.path() != "/login") {
                        usSpinnerService.stop('spinner');
                        $location.path("loginPage");
                        $rootScope.redirectToLoginPage();
                    }
                    return response;
                }
            };

        })
    }
});