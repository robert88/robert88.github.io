//调试
if(global&&!global.app){
  global.debugger = true;
  require("./debugfix.js");
}else{
  if(!global.__dirname){
    global.__dirname = ""
  }
}

var history = require("./history.js")

console.show();
console.log("缓存已清除")



history("https://github.com/robert88/robert88.github.io/file-list/master/autojs/demo","https://robert88.github.io/autojs/demo")