define(function(){function e(e,n,o,t,c,a,i,r,s,l){if(n.$watch("viewContentLoaded",function(){c.setCurrentLang("zh-cn"),t.onReady(function(){document.title=t.instant("label.title")}),$.getJSON("./menu/config.json",function(e){r.config=e,n.menu=r.config.menu,n.$apply()}),n.reqUser={username:"",password:""}}),a.init(),n.selectTabMenu=function(e){e.children?$location.path(e.children[0].url):$location.path(e.url)},n.findMainMenu=function(e){if(n.menu){var o=e.replace("/",""),t=function(e,o){if(e.children){var c=!1;e.children.forEach(function(e){e.url==o?(e.selected=!0,n.selectedSubMenu=e,c=!0):t(e,o)}),e.selected=c}else e.selected=!1};n.menu.forEach(function(e){e.url==o?e.selected=!0:t(e,o)})}},n.cacheAccount={cached:void 0!=localStorage.cacheAccount&&localStorage.cacheAccount},n.cacheAccount.cached&&(n.cacheAccount.cached=!0,u=localStorage.account)){var u=JSON.parse(u);$timeout(function(){n.reqUser.username=u.username,n.reqUser.password=u.password},0)}$("body").keypress(function(o){if(!e.logined)switch(o.which){case 13:n.login()}}),e.logined=!1,n.login=function(){if(""!=n.reqUser.username&&""!=n.reqUser.password){var o=JSON.stringify(n.reqUser),t=r.encode(o);i.login(t).then(function(o){try{var t=o.data;if(t.result)if(t.result==s.result.success){var c=r.decode(t.data);e.loginedUser=JSON.parse(c),sessionStorage.loginedUser=c,sessionStorage.loginedUserId=e.loginedUser.id,e.logined=!0,n.cacheAccount.cached?(localStorage.cacheAccount=1,localStorage.account=JSON.stringify({username:n.reqUser.username,password:e.loginedUser.password})):(delete localStorage.cacheAccount,delete localStorage.account),$location.absUrl().indexOf("?")&&$location.search({}),n.loadBasicData(!0)}else r.showToaster(s.toaster.op,{type:"error",title:"",body:"message.failed_account_info"});else r.showToaster(s.toaster.op,{type:"error",title:"",body:"message.network_error"})}catch(e){}},function(e){}).finally(function(){})}else r.showToaster(s.toaster.op,{type:"error",title:"",body:"message.input_account_info"})},e.loadBasicData=function(e,o){$q.all().then(function(t){var c=0;t.forEach(function(e){c++}),e?$location.path("monitor"):"/login"!=o&&n.findMainMenu(o),n.registWebSocket()})},n.logout=function(){i.logout().then(function(e){n.clearReqUser()},function(e){})},n.clearReqUser=function(){e.logined=!1,n.reqUser={username:"",password:""},sessionStorage.clear(),$location.path("loginPage")},e.redirectToLoginPage=function(){l.stop("spinner"),n.reqUser={username:"",password:""},document.title=t.instant("label.title"),r.hideDialog("rootDialog")},e.redirectToPage=function(o){l.stop("spinner"),sessionStorage.loginedUser?"/login"==o?e.redirectToLoginPage():n.findMainMenu(o):"/auth"==o||(n.loginPara.auth?i.auth(n.loginPara.auth).then(function(e){try{n.authCallbackFunc(e)}catch(e){}},function(e){}).finally(function(){$location.absUrl().indexOf("?")&&$location.search({})}):$location.path("loginPage"))},n.authCallbackFunc=function(o){var t=o.data;if(t.result==s.result.success){var c=r.decode(t.data);e.loginedUser=JSON.parse(c),sessionStorage.loginedUser=c,sessionStorage.loginedUserId=e.loginedUser.id,e.logined=!0,n.loadBasicData(!0)}else $timeout(function(){$location.path("auth"),n.reqUser={username:"",password:""}},50)},n.ws=null,n.registWebSocket=function(){jmsService.init(i.subscribeUrl,n.onCallbackFunc)};var d=null;n.onConnect=function(){sessionStorage.loginedUser&&null!=d&&o.cancel(d),n.ws.subscribe()},n.onError=function(){if(void 0!=n.ws||null!=n.ws)try{n.ws.disconnect(),delete n.ws}catch(e){}sessionStorage.loginedUser&&null==d&&(d=o(n.registWebSocket,3e3))},n.onCallbackFunc=function(e){n.ws=e,n.ws.connect(s.subscribe.un,s.subscribe.up,n.onConnect,n.onError)}}return function(n){n.controller("RootController",["$rootScope","$scope","$interval","$translate","i18nService","initialize","apiService","utilService","CONSTANT","usSpinnerService",e])}});