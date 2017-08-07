/**
 * Created by Shadow on 2017/8/2.
 */
define(function (require) {
    var initialize = function ($rootScope, CONSTANT) {
        this.$rootScope = $rootScope;
        this.constant = CONSTANT;
        this.jeDate = require("jeDate");
    };

    initialize.$inject = ["$rootScope", "CONSTANT"];

    initialize.prototype.generateGlobalAttribute = function () {
        this.$rootScope.version = this.constant.system_setting.version;
        this.$rootScope.releaseDate = this.constant.system_setting.releaseDate;

        this.$rootScope.logo = "./images/logo/" + customer + "/logo.png";
        this.$rootScope.headerPath = "views/_include/" + customer + "/_header.html";
        this.$rootScope.subMenuPath = "views/_include/" + customer + "/_menu.html";
        this.$rootScope.tosterOption = {
            opAction: {
                'toaster-id': 1,
                'time-out': 2000
            },
            warning: {
                'toaster-id': 2,
                'position-class':'toast-bottom-right',
                'time-out': 2000
            }
        }
        this.$rootScope.jeDateOption = {
            beginTime: {
                dateCell: '',
                isTime: true,
                isBegin: true,
                format: 'YYYY-MM-DD hh:mm:ss'
            },
            endTime:{
                dateCell: '',
                isTime: true,
                isBegin: false,
                format: 'YYYY-MM-DD hh:mm:ss'
            },
            selMonth:{
                dateCell: '',
                isTime: false,
                isClear: false,
                format: 'YYYY年MM月'
            }
        }
    };

    initialize.prototype.generateGlobalMethod = function () {
        var self = this;
        this.$rootScope.setCalendar = function (elementId, config) {
            config.dateCell = "#" + elementId;
            config.okfun = config.choosefun = function (elem,val) {
                self.$rootScope.$broadcast("setConditionDate", {
                    elem: elem,
                    val: val
                })
            }
            config.clearfun = function (elem,val) {
                self.$rootScope.$broadcast("clearConditionDate", {
                    elem: elem,
                    val: val
                })
            }
            self.jeDate(config);
        }
        this.$rootScope.checkAction = function(target, action){
            switch (action){
                case "info":
                    return target.action == self.constant.operator.info;
                    break;
                case "create":
                    return target.action == self.constant.operator.create;
                    break;
                case "modify":
                    return target.action == self.constant.operator.modify;
                    break;
                case "remove":
                    return target.action == self.constant.operator.remove;
                    break;
                case "details":
                    return target.action == self.constant.operator.details;
                    break;
                case "reset":
                    return target.action == self.constant.operator.reset;
                    break;
            }
        }
        this.$rootScope.treeNodeToggle = function(e){
            self.treeSelectedElement = "node";
        }
        this.$rootScope.dropdownClickFunc = function(e){
            if(self.treeSelectedElement == "node")
                e.stopPropagation();
        }
    };

    initialize.prototype.init = function(){
        this.generateGlobalAttribute();
        this.generateGlobalMethod();
    };

    return function (appModule) {
        appModule.config(["$provide", function ($provide) {
            $provide.service('initialize', initialize);
        }]);
        appModule.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
            usSpinnerConfigProvider.setDefaults({color: "#1190b8"});
        }]);
    }
});