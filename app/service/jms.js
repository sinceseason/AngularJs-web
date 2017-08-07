/**
 * Created by Shadow on 2017/8/1.
 */
define(function (require) {
    'use strict';

    var jmsService = function ($rootScope) {
        this.$rootScope = $rootScope;
    };

    jmsService.$inject = ["$rootScope"];

    jmsService.prototype.init = function(subscribeUrl, onCallbackFunc, onError){
        var client = Stomp.client(subscribeUrl);
        onCallbackFunc(client);
    }

    return function (appModule) {
        appModule.config(["$provide", function ($provide) {
            $provide.service('jmsService', jmsService);
        }]);
    }
});