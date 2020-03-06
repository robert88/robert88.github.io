console.show();

console.log("保持手机常亮")

device.keepScreenOn();

var merge = require("./travel/merge.js");
console.log("成功加载组件 merge")

var gold = require("./travel/gold.js");
console.log("成功加载组件 glod")

var offline = require("./travel/offline.js");
console.log("成功加载组件 offline")

var launchApp = require("./travel/launch.js");
console.log("成功加载组件 launch")

launchApp("com.jiayouya.travel");
console.info("-----launchApp -end --")

offline("rap",function(){console.log("endoffline")});
console.info("-----offline -end --")

gold();
console.info("-----glod -end --")

merge();
console.info("-----merge -end --")

console.log("取消手机常亮")
device.cancelKeepingAwake();
