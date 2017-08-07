/**
 * Created by Shadow on 2017/7/31.
 */
define(function (require) {
    var angular = require('angular'),
        translate = require('ngTranslate'),
        translate = require('ngTranslateLoaderStaticFiles'),
        uiRouter = require('uiRouter'),
        ngCookies = require('ngCookies'),
        ngAnimate = require('ngAnimate'),
        ngSanitize = require('ngSanitize'),
        ngSpinner = require('ngSpinner'),
        ngUiGrid = require('ngUiGrid'),
        ngTreeControl = require('ngTreeControl'),
        ngToaster = require('ngToaster'),
        slider = require('slider'),
        qrcode = require('ngQRCode'),
        APP_MODULE_NAME = 'RFID',
        APP_MODULE_DEPS = [
            "angularSpinner",
            "toaster",
            "treeControl",
            "ui.grid",
            "ui.grid.treeView",
            "ui.grid.resizeColumns",
            "ui.grid.autoResize",
            "ui.grid.pagination",
            "ui.grid.selection",
            "ui.grid.exporter",
            "ui.grid.pinning",
            "ui.router",
            "ngCookies",
            "ngAnimate",
            "rzModule",
            "pascalprecht.translate",
            "monospaced.qrcode"
        ],
        appModule = angular.module(APP_MODULE_NAME, APP_MODULE_DEPS),
        callbackFunc = function () {
            angular.element(document).ready(function () {
                angular.bootstrap(document, [APP_MODULE_NAME])
            })
        };

    require(
        [
            "apiService",
            "constant",
            "router",
            "watcher",
            "directiveManager",
            "interceptorManager",
            "filter",
            "translate",
            "util",
            "global",
            "jms",
            "initialize",
            "controllerManager"
        ], function (
            apiServiceConfig,
            constantConfig,
            routerConfig,
            watcherConfig,
            directiveConfig,
            interceptorConfig,
            filterConfig,
            translateConfig,
            utilConfig,
            globalConfig,
            jmsConfig,
            initializeConfig,
            controllerManagerConfig
        )
        {
            apiServiceConfig(appModule);
            constantConfig(appModule);
            routerConfig(appModule);
            watcherConfig(appModule);
            directiveConfig(appModule);
            interceptorConfig(appModule);
            filterConfig(appModule);
            translateConfig(appModule);
            utilConfig(appModule);
            globalConfig(appModule);
            jmsConfig(appModule);
            initializeConfig(appModule);
            controllerManagerConfig(appModule, callbackFunc);
        }
    );

    return appModule;
});