//调试
if(global&&!global.app){
  require("./lib/debugfix.js");
}else{
  if(!global.__dirname){
    global.__dirname = ""
  }
}

var history = require("./lib/history.js")

console.show();
console.log("缓存已清除")



history("https://github.com/robert88/robert88.github.io/tree/master/autojs/demo","./build/")