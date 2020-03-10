console.show()
//更新对象
var time = new Date().getTime();

/**ajax请求 */
function r(name,localname) {
  console.log("请求",name)
  localname = localname ||name;
  try{
    var res = http.get("https://robert88.github.io//autojs/demo/" + name + ".js?ver=" + time, {});
    w(name,localname,res)
  }catch(e){
    t("更新失败"+ name + ".js");
  }

}

/* 消息队列*/
function t(msg) {
  toast(msg)
  sleep(1000)
}
/*写文件*/
function w(name,localname,res){

  var content = res.body.string();

  if (files.exists("./" + localname + ".js")) {
      console.log("存在",localname)
    if (files.read("./" + localname + ".js") == content) {
      return t("服务器代码未变动" + "./" + name + ".js")
    }
     console.log("内容不相同")
    files.remove("./" + localname + ".js")
  }else{
    console.log("不存在",localname)
  }
   console.log("写入数据",localname)
  files.ensureDir("./" + localname + ".js")
  files.write("./" + localname + ".js", content);
  t("更新成功" + "./" + name + ".js")
}

r("travel")
r("travel/merge")
r("travel/ad")
r("travel/launch")
r("travel/gold")
r("travel/offline")
r("travel/city")
//r("test/merge")
