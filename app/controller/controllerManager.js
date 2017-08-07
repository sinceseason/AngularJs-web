/**
 * Created by Shadow on 2017/7/31.
 */
define(function (require) {
   return function (appModule, callbackFunc) {
       var basicController = [
           './app/controller/rootController'
       ];

       if(status == 'run') {
           basicController = [
               './compress/js/controller/rootController'
           ];
       }

       var requireFiles = [];
       requireFiles = requireFiles.concat(basicController);

       require(requireFiles, function () {
           for (var i = 0; i < arguments.length; i++) {
               arguments[i](appModule);
           }
           callbackFunc();
       })
   }
});