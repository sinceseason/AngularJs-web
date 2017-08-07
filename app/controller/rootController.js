    /**
 * Created by Shadow on 2017/7/31.
 */
define(function () {
    function RootController($rootScope, $scope, $interval, $translate, i18nService, initialize, apiService, utilService, CONSTANT, usSpinnerService) {
        /*************** viewContentLoaded ******************/
        $scope.$watch('viewContentLoaded', function () {
            i18nService.setCurrentLang('zh-cn');

            $translate.onReady(function () {
                document.title = $translate.instant("label.title");
            });

            $.getJSON('./menu/config.json', function (dataJson) {
                utilService.config = dataJson;
                $scope.menu = utilService.config.menu;
                $scope.$apply();
            })

            $scope.reqUser = {username: "", password: ""};
        });
        /*************** viewContentLoaded ******************/

        initialize.init();

        /******************** menu event **********************/
        $scope.selectTabMenu = function (menu) {
            if(menu.children){
                $location.path(menu.children[0].url);
            }else
                $location.path(menu.url);
        }

        $scope.findMainMenu = function (toUrl) {
            if ($scope.menu) {
                var url = toUrl.replace("/", "");

                var findSubMenu = function(parent, url){
                    if(parent.children){
                        var found = false;
                        parent.children.forEach(function(m){
                            if(m.url == url) {
                                m.selected = true;
                                $scope.selectedSubMenu = m;
                                found = true;
                            }else
                                findSubMenu(m, url);
                        });
                        parent.selected = found;
                    }else
                        parent.selected = false;
                }

                $scope.menu.forEach(function (item) {
                    if(item.url == url)
                        item.selected = true;
                    else
                        findSubMenu(item, url);
                });
            }
        };
        /******************** menu event **********************/

        /*********************** login & logout ************************/
        $scope.cacheAccount = {
            cached: localStorage.cacheAccount == undefined  ? false : localStorage.cacheAccount
        };

        if ($scope.cacheAccount.cached) {
            $scope.cacheAccount.cached = true;
            var obj = localStorage.account;
            if (obj) {
                var obj = JSON.parse(obj);
                $timeout(function(){
                    $scope.reqUser.username = obj.username;
                    $scope.reqUser.password = obj.password;
                }, 0);
            }
        }

        $("body").keypress(function (e) {
            if (!$rootScope.logined) {
                switch (e.which) {
                    case 13:
                        $scope.login();
                        break;
                }
            }
        });

        $rootScope.logined = false;
        $scope.login = function () {
            if ($scope.reqUser.username == "" || $scope.reqUser.password == "") {
                utilService.showToaster(CONSTANT.toaster.op, {
                    type: "error",
                    title: "",
                    body: "message.input_account_info"
                });
                return;
            }
            var json = JSON.stringify($scope.reqUser);
            var reqJson = utilService.encode(json);
            apiService.login(reqJson).then(
                function (data) {
                    try {
                        var result = data.data;
                        if (!result.result) {
                            utilService.showToaster(CONSTANT.toaster.op, {
                                type: "error",
                                title: "",
                                body: "message.network_error"
                            });
                        }
                        else if (result.result == CONSTANT.result.success) {
                            var dataJson = utilService.decode(result.data);
                            $rootScope.loginedUser = JSON.parse(dataJson);
                            sessionStorage.loginedUser = dataJson;
                            sessionStorage.loginedUserId = $rootScope.loginedUser.id;
                            $rootScope.logined = true;

                            if ($scope.cacheAccount.cached) {
                                localStorage.cacheAccount = 1;
                                localStorage.account = JSON.stringify({
                                    username: $scope.reqUser.username,
                                    password: $rootScope.loginedUser.password
                                });
                            } else {
                                delete localStorage.cacheAccount;
                                delete localStorage.account;
                            }

                            if ($location.absUrl().indexOf("?"))
                                $location.search({});

                            $scope.loadBasicData(true);
                        } else {
                            utilService.showToaster(CONSTANT.toaster.op, {
                                type: "error",
                                title: "",
                                body: "message.failed_account_info"
                            });
                        }
                    } catch (e) {

                    }
                }, function (error) {

                }
            ).finally(function () {
            });
        };

        $rootScope.loadBasicData = function (fromLogin, toStatUrl) {
            $q.all(

            ).then(function (data) {
                var i = 0;
                data.forEach(function (d) {
                    try{

                    } catch (e) {

                    }
                    i++;
                });

                if (fromLogin) {
                    $location.path("monitor");
                } else if (toStatUrl != "/login") {
                    $scope.findMainMenu(toStatUrl);
                } else {
                }
                $scope.registWebSocket();
            })
        };

        $scope.logout = function () {
            apiService.logout().then(function (data) {
                $scope.clearReqUser();
            }, function (error) {

            });
        };

        $scope.clearReqUser = function () {
            $rootScope.logined = false;
            $scope.reqUser = {username: "", password: ""};
            sessionStorage.clear();
            $location.path("loginPage");
        };
        /*********************** login & logout ************************/

        $rootScope.redirectToLoginPage = function () {
            usSpinnerService.stop('spinner');
            $scope.reqUser = {username: "", password: ""};
            document.title = $translate.instant("label.title");
            utilService.hideDialog("rootDialog");
        };

        $rootScope.redirectToPage = function (toUrl) {
            usSpinnerService.stop('spinner');
            if (sessionStorage.loginedUser) {
                if (toUrl == "/login") {
                    $rootScope.redirectToLoginPage();
                } else {
                    $scope.findMainMenu(toUrl);
                }
            }else if(toUrl == "/auth"){

            }else if($scope.loginPara.auth){
                apiService.auth($scope.loginPara.auth).then(function(data){
                    try {
                        $scope.authCallbackFunc(data);
                    } catch (e) {

                    }
                }, function(error){

                }).finally(function(){
                    if ($location.absUrl().indexOf("?"))
                        $location.search({});
                });
            }else {
                $location.path("loginPage");
            }
        };

        $scope.authCallbackFunc = function(data){
            var result = data.data;
            if (result.result == CONSTANT.result.success) {
                var dataJson = utilService.decode(result.data);
                $rootScope.loginedUser = JSON.parse(dataJson);
                sessionStorage.loginedUser = dataJson;
                sessionStorage.loginedUserId = $rootScope.loginedUser.id;
                $rootScope.logined = true;
                $scope.loadBasicData(true);
            } else {
                $timeout(function(){
                    $location.path("auth");
                    $scope.reqUser = {username: "", password: ""};
                }, 50);
            }
        };

        /************************* web socket *************************/
        $scope.ws = null;
        $scope.registWebSocket = function () {
            jmsService.init(apiService.subscribeUrl, $scope.onCallbackFunc);
        };

        var connectInterval = null;
        $scope.onConnect = function () {
            if (sessionStorage.loginedUser && connectInterval != null) {
                $interval.cancel(connectInterval);
            }
            $scope.ws.subscribe();
        }

        $scope.onError = function () {
            if ($scope.ws != undefined || $scope.ws != null) {
                try {
                    $scope.ws.disconnect();
                    delete $scope.ws;
                } catch (e) {

                }
            }
            if (sessionStorage.loginedUser && connectInterval == null) {
                connectInterval = $interval($scope.registWebSocket, 3000);
            }
        }

        $scope.onCallbackFunc = function (client) {
            $scope.ws = client;
            $scope.ws.connect(CONSTANT.subscribe.un, CONSTANT.subscribe.up, $scope.onConnect, $scope.onError);
        }
        /************************* web socket *************************/
    }

    return function (appModule) {
        appModule.controller('RootController', ["$rootScope", "$scope", "$interval", "$translate", "i18nService", "initialize", "apiService", "utilService", "CONSTANT", "usSpinnerService",
            RootController])
    }
});