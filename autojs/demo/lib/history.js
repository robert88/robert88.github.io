var parse = require("parse.js");

module.exports=function () {

  try{
    var res = http.get("https://github.com/robert88/robert88.github.io/commits/master/autojs/demo?ver=" + (new Date().getTime()), {});
    var content = res.body.string();

  }catch(e){
    console.log(e)
  }

}
