//更新对象
var time = new Date().getTime();
var ajaxcount = 0;
var backMessage = [];

/**ajax请求 */
function r(name,localname) {
  localname = localname ||name
  ajaxcount++;
  http.get("https://robert88.github.io//autojs/demo/" + name + ".js?ver=" + time, {}, function(res, err) {
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
  });
}

/* 消息队列*/

function t(message) {
  ajaxcount--;
  backMessage.push(message);
  if (ajaxcount == 0) {
    backMessage.forEach(function(msg) {
      toast(msg)
      sleep(1000)
    })

  }
}

r("travel")
r("merge")
r("ad")
r("launch")
r("glod")
r("offline")
