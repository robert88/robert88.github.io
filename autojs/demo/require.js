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
storages.clear();

var b = "github"
var r = "/robert88"
var h = "https://"
var g = r+"."+b+".io"
var p = "/autojs/demo/"
var u = h+"raw."+b+"usercontent.com"+r+g+"/master"+p;
var e = h+b+".com"+r+g+"/tree/8669023de0f1af586008a21438cb97bee2c20e10"+p
console.log(u,e)

history(u,e,"./build/")