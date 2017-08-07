/**
 * Created by Shadow on 2017/8/1.
 */
define(function () {
   'use strict';

    var apiService = function ($location, $http, CONSTANT) {
        this.$http = $http;
        this.constant = CONSTANT;

        var apiIp = $location.host();
        this.apiPort = 8081;
        this.url = "http://" + apiIp + ":" + this.apiPort;
        this.apiUrl = this.url + "/api/";
        this.subscribeUrl = "ws://" + apiIp + ":61614";
    };

    apiService.$inject = ["$location", "$http", "CONSTANT"];

    apiService.prototype.login = function (jsonStr) {
        return this.$http(
            {
                method: 'POST',
                url: this.apiUrl + 'login',
                params: {
                    para: jsonStr
                }
            }
        );
    };

    apiService.prototype.logout = function () {
        return this.$http(
            {
                method: 'POST',
                url: this.apiUrl + 'logout',
                params: {}
            }
        );
    };

    apiService.prototype.auth = function(uid, jsonStr){
        return this.$http(
            {
                method: 'POST',
                url: this.apiUrl + 'auth/' + uid,
                params: jsonStr != null ? {para: jsonStr} : {}
            }
        );
    }

    return function (appModule) {
        appModule.config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.defaults.useXDomain = true;
                $httpProvider.defaults.withCredentials = true;
                // $httpProvider.defaults.headers.post['token'] = sessionStorage.loginedUserId;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $httpProvider.interceptors.push("RequestInterceptor");
            }
        ]).config(["$provide", function ($provide) {
            $provide.service('apiService', apiService);
        }]);
    }
});