/**
 * Created by Shadow on 2017/8/1.
 */
define(function () {
   'use strict';

    return function (appModule) {
        appModule.constant("CONSTANT", {
            system_setting: {
                version: "1.0.0.0",
                releaseDate: '2017-08-01'
            },
            gridOptions: {
                pageSize: 25,
                default: 1,
                selection: 2,
                tree: 3
            },
            toaster: {
                op: "op",
                warning: "warning"
            },
            call: {

            },
            action: {
                save: "Save",
                remove: "Remove",
                fuzzy: "Fuzzy"
            },
            result: {
                success: "SUCCESS",
                failed: "FAILED"
            },
            operator: {
                info: "info",
                create: "create",
                modify: "modify",
                remove: "remove",
                details: "details",
                select: "select",
                reset: "reset"
            }
        });
        appModule.value("AUTH", {});
    }
});