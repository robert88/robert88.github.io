var parse = require("./parse.js");
var githubPage //github代码列表页
var githubUrl //github代码访问地址

//请求页面数据
function getDataByUrl(url) {
  url = githubPage + url;
  try {
    console.log("请求url", url)
    var res = http.get(url, {});
    return res.body.string();
  } catch (e) {
    console.log("请求失败", url,e.stack)
  }
  return "";
}
//解析页面数据 得到文件的更新时间
function parseTreeData(obj, url) {
  var data = getDataByUrl(url);
  var parentDir = parentDir || "";
  var obj = obj || { dirs: {}, files: {} };
  var ol = parse("table", data);
  if (ol && ol[0]) {
    var li = parse("tbody", ol[0].template)
    li = li[li.length - 1];
    if (li) {
      var tr = parse("tr", li.template);
      tr.forEach(function(t) {
        var td = parse("td", t.template);
        if (td.length < 4) {
          return;
        }
        var isdir = td[0].template.indexOf("octicon-file-directory") != -1 ? 1 : 0
        var name = parse("a", td[1].template)[0].attrs.title;
        var time = parse("time-ago", td[3].template)[0].attrs.datetime;
        if (isdir) {
          obj.dirs[name] = { dirs: {}, files: {} };
          parseTreeData(obj.dirs[name], url + name+"/");
        } else {
          obj.files[name] = {
            time: new Date(time),
            absolute: url +  name
          }
        }

      })
    }

  }
  return obj;
}

//写文件
function writeTree(obj, cache) {
  for (var dir in obj.dirs) {
    writeTree(obj.dirs[dir], cache && cache[dir]);
  }
  for (var file in obj.files) {
    var notModify = cache && cache[file] && cache[file].time.getTime() == obj.files[file].time.getTime()
    //时间不一致
    if (!notModify) {
      r(obj.files[file].absolute, localUrl + obj.files[file].absolute);
    }else{
      console.info(obj.files[file].absolute,"is not modify")
    }
  }
}



/**ajax请求 */
function r(name, localname) {

  var url = githubUrl + name ;
  console.log("请求", url,"写入文件",localname)
  try {
    var res = http.get(url, {});
    w(name, localname, res)
  } catch (e) {
    console.log(e.stack)
    t("更新失败" + name);
  }

}

/* 消息队列*/
function t(msg) {
  toast(msg)
  sleep(1000)
}

/*写文件*/
function w(name, localname, res) {
  var content = res.body.string();
  console.log("写入数据", localname)
  files.ensureDir(localname)
  files.write(localname, content);
  t("更新成功" + name)
}

module.exports = function(url, page,local) {
  console.log(module)
  githubPage = page; //github代码列表页
  githubUrl = url //github代码访问地址
  localUrl = local //github代码访问地址
  var cacheInfo;
  if (files.exists("./cache.js")) {
    cacheInfo = require("./cache.js")
  }

  var treedata = parseTreeData(null, "", "");

  writeTree(treedata,cacheInfo)

  files.write("./cache.js", "module.exports="+JSON.stringify(treedata))

}