/**
 * Created by Shadow on 2017/8/1.
 */
define(function () {
    'use strict';

    var utilService = function ($rootScope, $timeout, $q, $translate, toaster, CONSTANT) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$translate = $translate;
        this.toaster = toaster;
        this.contant = CONSTANT;
    };

    utilService.$inject = ["$rootScope", "$timeout", "$q", "$translate", "toaster", "CONSTANT"];

    /**************** encode && decode *********************/
    utilService.prototype.encode = function (input) {
        var base64 = new Base64();
        return base64.encode(input);
    };

    utilService.prototype.decode = function (input) {
        var base64 = new Base64();
        return base64.decode(input);
    };
    /**************** encode && decode *********************/

    /****************** modal ******************/
    utilService.prototype.initDialogEvent = function(elementId, callbackFunc, showCallbackFunc){
        try{
            var self = this;
            $("#" + elementId).on('hide.bs.modal', function () {
                self.$timeout(function(){
                    $(this).removeData("modal");
                    callbackFunc();
                }, 0);
            });
            $("#" + elementId).on('show.bs.modal', function () {
                self.$timeout(function(){
                    if(showCallbackFunc)
                        showCallbackFunc();
                }, 0);
            });
        }catch (err){

        }
    };

    utilService.prototype.showDialog = function(elementId, callbackFunc){
        try{
            this.$timeout(function () {
                $("#" + elementId).modal();
                if(callbackFunc)
                    callbackFunc();
            }, 50);
        }catch (err){

        }
    };

    utilService.prototype.hideDialog = function(elementId){
        try{
            $("#" + elementId).modal('hide');
        }catch (err){

        }
    };
    /****************** modal ******************/

    /********************* toaster **************************/
    utilService.prototype.showToaster = function (type, obj) {
        var self = this;
        switch(type){
            case this.contant.toaster.op:
                obj.toasterId = 1;
                break;
            case this.contant.toaster.warning:
                obj.toasterId = 2;
                break;
        }
        obj.title = this.$translate.instant(obj.title);
        obj.body = this.$translate.instant(obj.body);
        self.$timeout(function(){
            self.toaster.pop(obj);
        }, 0);
    };
    /********************* toaster **************************/

    return function (appModule) {
        appModule.config(["$provide", function ($provide) {
            $provide.service('utilService', utilService);
        }]);
    }
});