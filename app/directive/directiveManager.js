/**
 * Created by Shadow on 2017/7/31.
 */
define(function (require) {
    'use strict';

    return function (appModule) {
        var dateFormatDirective = './app/directive/dateFormat';

        if (status == 'run') {
            dateFormatDirective = './compress/js/directive/dateFormat'
        }
        require(
            [
                dateFormatDirective
            ], function (configDateFormatDirective
                         ) {
                configDateFormatDirective(appModule);
            });
    }
});