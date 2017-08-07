/**
 * Created by Shadow on 2017/8/1.
 */
define(function () {
    'use strict';

    var global = function ($rootScope, $timeout, CONSTANT, apiService, utilService, toaster) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.apiService = apiService;
        this.utilService = utilService;
        this.constant = CONSTANT;
        this.toaster = toaster;
        this.jeDate = require("jeDate");
    };

    global.$inject = ["$rootScope", "$timeout", "CONSTANT", "apiService", "utilService", "toaster"];

    return function (appModule) {
        appModule.config(["$provide", function ($provide) {
            $provide.service('global', global);
        }]);
    }
});