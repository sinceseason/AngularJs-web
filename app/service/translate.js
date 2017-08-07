/**
 * Created by Shadow on 2017/8/1.
 */
define(function () {
    'use strict';

    var translateService = function ($translate) {
        this.$translate = $translate;
    };

    translateService.$inject = ["$translate"];

    translateService.prototype.changeLanguage = function(lang){
        this.$translate.use(lang);
        localStorage.lang = lang;
    };

    return function (appModule) {
        appModule.config(['$translateProvider', function ($translateProvider) {
            if (navigator.browserLanguage != "undefined" && navigator.browserLanguage != null) {//ie
                if (navigator.browserLanguage == "zh-CN"){// || navigator.systemLanguage == "zh-CN") {
                    localStorage.lang = 'zh_CN';
                }else if(navigator.browserLanguage == "zh-TW"){// || navigator.systemLanguage == "zh-TW"){
                    localStorage.lang = 'zh_TW';
                }else{
                    localStorage.lang = 'en';
                }
            }
            else {//firefox、chrome,360
                if (navigator.language == "zh-CN") {
                    localStorage.lang = 'zh_CN';
                }else if(navigator.language == "zh-TW"){
                    localStorage.lang = 'zh_TW';
                }else{
                    localStorage.lang = 'en';
                }
            }
            var lang = localStorage.lang || 'zh_CN';
            var files = [{
                prefix: './i18n/default/',
                suffix: '.json'
            }];

            // 模块化加载i18n
            // if(i18nModule.contains())
            //     files.push({
            //
            //     });

            if(customer != "default")
                files.push({
                    prefix: './i18n/'+ customer + '/',
                    suffix: '.json'
                });

            $translateProvider.preferredLanguage(lang);
            $translateProvider.useStaticFilesLoader({
                files: files
            });
        }]).config(["$provide", function ($provide) {
            $provide.service('translateService', translateService);
        }]);
    }
})