/**
 * Created by Shadow on 2017/8/1.
 */
define(function () {
    'use strict';

    var routeService = function ($state, $rootScope) {

    };

    routeService.$inject = ["$state", "$rootScope"];

    return function (appModule) {
        appModule.config(["$provide", function ($provide) {
            $provide.service("routeService", routeService);
        }]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider
                .when("/", "/login")
                .when("/loginPage", "/login")
                .otherwise("/");

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "./views/_include/"+customer+"/_login.html"
                })
        }]);
    }
});