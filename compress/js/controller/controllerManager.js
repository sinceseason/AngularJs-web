define(function(require){return function(o,r){var n=["./app/controller/rootController"];"run"==status&&(n=["./compress/js/controller/rootController"]);var t=[];t=t.concat(n),require(t,function(){for(var n=0;n<arguments.length;n++)arguments[n](o);r()})}});