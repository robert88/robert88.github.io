console.show()
//更新对象
var time = new Date().getTime();
var ajaxcount = 0;


/**ajax请求 */
function r(name,localname) {
  console.log("请求",name)
  localname = localname ||name
  ajaxcount++;
  http.get("https://robert88.github.io//autojs/demo/" + name + ".js?ver=" + time, {},
   function(res, err) {
    ajaxcount--;
     console.log("请求end",name,ajaxcount)
    c(name,localname,res, err);
  });
}

/**回调队列 */
var backMessage = [];
function c(name,localname,res, err){
  backMessage.push([name,localname,res, err]);
  if (ajaxcount == 0) {
    backMessage.forEach(function(params) {
      w.apply(null,params);
    })

  }

}
/* 消息队列*/

function t(msg) {
  toast(msg)
  sleep(1000)
}
/*写文件*/
function w(name,localname,res, err){
  if (err) {
    t("更新失败"+ name + ".js")
    return;
  }
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
