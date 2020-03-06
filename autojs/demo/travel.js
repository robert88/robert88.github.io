console.show()
var merge = require("./merge.js");
console.log("加载组件 merge")
var glod = require("./glod.js");
console.log("加载组件 glod")
var offline = require("./offline.js");
console.log("加载组件 offline")
var launchApp = require("./launch.js");
console.log("加载组件 launch")

launchApp();
console.info("-----launchApp -end --")
offline();
console.info("-----offline -end --")
glod();
console.info("-----glod -end --")
merge();
console.info("-----merge -end --")
