define(function(){"use strict";var t=function(t,e,i,o,r,c){this.$rootScope=t,this.$timeout=e,this.apiService=o,this.utilService=r,this.constant=i,this.toaster=c,this.jeDate=require("jeDate")};return t.$inject=["$rootScope","$timeout","CONSTANT","apiService","utilService","toaster"],function(e){e.config(["$provide",function(e){e.service("global",t)}])}});