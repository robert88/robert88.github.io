//更新对象
var time = new Date().getTime();
var ajaxcount = 0;


/**ajax请求 */
function r(name,localname) {
  localname = localname ||name
  ajaxcount++;
  http.get("https://robert88.github.io//autojs/demo/" + name + ".js?ver=" + time, {},
   function(res, err) {
    ajaxcount--;
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

function t(message) {
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
    if (files.read("./" + localname + ".js") == content) {
      return t("服务器代码未变动" + "./" + name + ".js")
    }

    files.remove("./" + localname + ".js")
  }
  files.write("./" + localname + ".js", content);
  t("更新成功" + "./" + name + ".js")
}

r("travel")
r("travel/merge")
r("travel/ad")
r("travel/launch")
r("travel/gold")
r("travel/offline")

//r("test/merge")