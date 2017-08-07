/**
 * Created by Shadow on 2017/7/31.
 */
define(function (require) {
    'use strict';

    return function (appModule) {
        var requestInterceptor = './app/interceptor/requestInterceptor';

        require(
            [
                requestInterceptor
            ], function (requestInterceptorConfig) {
                requestInterceptorConfig(appModule);
            });
    }
});