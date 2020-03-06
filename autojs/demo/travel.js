const merge = require("./merge");
const glod = require("./glod");
const offline = require("./offline");
const launchApp = require("./launch");

launchApp();
offline();
glod();
merge();
