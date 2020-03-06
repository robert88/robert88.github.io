console.show()
const merge = require("./merge");
const glod = require("./glod");
const offline = require("./offline");
const launchApp = require("./launch");
console.log("已经加载全部组件")
launchApp();
offline();
glod();
merge();
