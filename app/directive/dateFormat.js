define(function (require) {
    'use strict';
    return function (appModule) {
        appModule.directive('dateFormatYMDHMS', ['$filter', function ($filter) {
            var dateFilter = $filter('date');
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    function formatter(value) {
                        return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
                    }

                    function parser() {
                        return ctrl.$modelValue;
                    }

                    ctrl.$formatters.push(formatter);
                    ctrl.$parsers.unshift(parser);
                }
            };
        }]);
        appModule.directive('dateFormatYMD', ['$filter', function ($filter) {
            var dateFilter = $filter('date');
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    function formatter(value) {
                        return dateFilter(value, 'yyyy-MM-dd'); //format
                    }

                    function parser() {
                        return ctrl.$modelValue;
                    }

                    ctrl.$formatters.push(formatter);
                    ctrl.$parsers.unshift(parser);
                }
            };
        }]);
        appModule.directive('dateFormatHMS', ['$filter', function ($filter) {
            var dateFilter = $filter('date');
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    function formatter(value) {
                        return dateFilter(value, 'HH:mm:ss'); //format
                    }

                    function parser() {
                        return ctrl.$modelValue;
                    }

                    ctrl.$formatters.push(formatter);
                    ctrl.$parsers.unshift(parser);
                }
            };
        }]);
    }
});