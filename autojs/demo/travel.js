console.show()
var merge = require("./merge.js");
console.log("成功加载组件 merge")
var gold = require("./gold.js");
console.log("成功加载组件 glod")
var offline = require("./offline.js");
console.log("成功加载组件 offline")
var launchApp = require("./launch.js");
console.log("成功加载组件 launch")

launchApp("com.jiayouya.travel");
console.info("-----launchApp -end --")
offline(function(){console.log("endoffline")});
console.info("-----offline -end --")
gold();
console.info("-----glod -end --")
merge();
console.info("-----merge -end --")
