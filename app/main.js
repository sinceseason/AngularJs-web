/**
 * Created by Shadow on 2017/7/31.
 */
var ngApp = null;

var customer = "default";
var module = [];

//min file
var status = "run"; //debug / run
var directory = "";
if (status == "run") {
    directory = './compress/js/';
} else if (status == "debug") {
    directory = './app/';
}

var getScope = function () {
    var domElement = document.getElementById("rootBody");
    return angular.element(domElement).scope();
};

var baseUrl = document.getElementById("main").getAttribute('data-baseurl');
var requireConfig = {
    baseUrl: baseUrl,
    paths: {
        //bower_components
        angular: './bower_components/angular/angular.min',
        ngAnimate: './bower_components/angular-animate/angular-animate.min',
        ngCookies: './bower_components/angular-cookies/angular-cookies.min',
        ngQRCode: './bower_components/angular-qrcode/angular-qrcode',
        ngSanitize: './bower_components/angular-sanitize/angular-sanitize.min',
        ngSpinner: './bower_components/angular-spinner/angular-spinner.min',
        ngTranslate: './bower_components/angular-translate/angular-translate.min',
        ngTranslateLoaderStaticFiles: './bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        ngUiGrid: './bower_components/angular-ui-grid/ui-grid.min',
        ngTreeControl: "./bower_components/angular-tree-control/angular-tree-control",
        uiRouter: './bower_components/angular-ui-router/release/angular-ui-router.min',
        slider: './bower_components/angularjs-slider/dist/rzslider.min',
        ngToaster: './bower_components/AngularJS-Toaster/toaster.min',
        bootstrap: './bower_components/bootstrap/dist/js/bootstrap.min',
        echart: './bower_components/echarts/dist/echarts.min',
        html5Media: './bower_components/html5media/src/api/html5media.js',
        qrCode: './bower_components/qrcode-generator/js/qrcode',
        qrCodeGenerator: './bower_components/qrcode-generator/js/qrcode_UTF8',
        spin: './bower_components/spin.js/spin.min',
        //lib
        base64: './lib/base64',
        dateformat: './lib/dateformat',
        gpsTransform: './lib/GPSTrans',
        stomp: './lib/stomp.min',
        trust: './lib/trust',
        jeDate: './lib/jedate/jedate-zh',
        //controller
        controllerManager: directory + 'controller/controllerManager',
        //directive
        directiveManager: directory + 'directive/directiveManager',
        //interceptor
        interceptorManager: directory + 'interceptor/interceptorManager',
        //service
        apiService: directory + 'service/api',
        constant: directory + 'service/constant',
        filter: directory + 'service/filter',
        global: directory + 'service/global',
        initialize: directory + 'service/initialize',
        jms: directory + 'service/jms',
        router: directory + 'service/router',
        translate: directory + 'service/translate',
        util: directory + 'service/util',
        watcher: directory + 'service/watcher'
        // //controller
        // controllerManager: './app/controller/controllerManager',
        // //directive
        // directiveManager: './app/directive/directiveManager',
        // //interceptor
        // interceptorManager: './app/interceptor/interceptorManager',
        // //service
        // apiService: './app/service/api',
        // constant: './app/service/constant',
        // filter: './app/service/filter',
        // global: './app/service/global',
        // initialize: './app/service/initialize',
        // jms: './app/service/jms',
        // router: './app/service/router',
        // translate: './app/service/translate',
        // util: './app/service/util',
        // watcher: './app/service/watcher'
    },
    shim: {
        //bower_components
        angular: {
            exports: 'angular'
        },
        ngAnimate: {
            deps: ['angular'],
            exports: 'ngAnimate'
        },
        ngCookies: {
            deps: ['angular'],
            exports: 'ngCookies'
        },
        ngQRCode: {
            deps: ['qrCodeGenerator', 'angular'],
            exports: 'ngQRCode'
        },
        ngSanitize: {
            deps: ['angular'],
            exports: 'ngSanitize'
        },
        ngSpinner: {
            deps: ['spin', 'angular'],
            exports: 'ngSpinner'
        },
        ngTranslate: {
            deps: ['angular'],
            exports: 'ngTranslate'
        },
        ngTranslateLoaderStaticFiles: {
            deps: ['angular', 'ngTranslate'],
            exports: 'ngTranslateLoaderStaticFiles'
        },
        ngUiGrid: {
            deps: ['angular'],
            exports: 'ngUiGrid'
        },
        ngTreeControl: {
            deps: ['angular'],
            exports: 'ngTreeControl'
        },
        uiRouter: {
            deps: ['angular'],
            exports: 'uiRouter'
        },
        slider: {
            deps: ['angular'],
            exports: "slider"
        },
        ngToaster: {
            deps: ['angular'],
            exports: 'ngToaster'
        },
        echart: {
            exports: "echart"
        },
        html5Media: {
            exports: "html5Media"
        },
        qrcode: {
            exports: 'qrCodeGenerator'
        },
        qrCodeGenerator: {
            deps: ['qrCode'],
            exports: 'qrCodeGenerator'
        },
        spin: {
            exports: 'spin'
        },
        //lib
        base64: {
            exports: 'base64'
        },
        dateformat: {
            exports: 'dateformat'
        },
        gpsTransform: {
            exports: 'gpsTransform'
        },
        jedate: {
            exports: "jedate"
        },
        stomp: {
            exports: 'stomp'
        }
    },
    deps: ['bootstrap', 'base64', 'dateformat', 'gpsTransform', 'stomp', 'trust', 'qrCodeGenerator'],
    callback: function () {
        require(['./app/init'], function (init) {
            try {
                ngApp = init;
            } catch (ex) {
                console.log(ex)
            }
        })
    }
};

if(status == "run") {
    // //controller
    // requireConfig.paths.controllerManager = './compress/js/controller/controllerManager';
    // //directive
    // requireConfig.paths.directiveManager = './compress/js/directive/directiveManager';
    // //interceptor
    // requireConfig.paths.interceptorManager = './compress/js/interceptor/interceptorManager';
    // //service
    // requireConfig.paths.apiService = './compress/js/service/api';
    // requireConfig.paths.constant = './compress/js/service/constant';
    // requireConfig.paths.filter = './compress/js/service/filter';
    // requireConfig.paths.global = './compress/js/service/global';
    // requireConfig.paths.initialize = './compress/js/service/initialize';
    // requireConfig.paths.jms = './compress/js/service/jms';
    // requireConfig.paths.router = './compress/js/service/router';
    // requireConfig.paths.translate = './compress/js/service/translate';
    // requireConfig.paths.util = './compress/js/service/util';
    // requireConfig.paths.watcher = './compress/js/service/watcher';
}

require.config(requireConfig);