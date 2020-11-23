//解析html
var parse = require("./parse.js");


//请求页面数据
function loadPageHtml(url) {
  try {
    console.log("请求url", url)
    var res = http.get(url, {});
    sleep(5000);
    return res.body.string();
  } catch (e) {
    console.log("请求失败", e.message, url, e.stack)
  }
  return "";
}


function find(content, tag, className, attrsName) {
  if (content) {
    var li = parse(tag, content.innerHTML)
    if (className && attrsName) {
      li = li.filter(item => {
        if ((item.attrs && item.attrs[attrsName] && item.attrs[attrsName] == className)) {
          return true
        }
        return false
      })
    }
    return li;
  }
  return ""
}

function parseTreeData(githubPage, obj) {
  var html = loadPageHtml(githubPage);
  var parentDir = parentDir || "";
  var obj = obj || {
    dirs: {},
    files: {}
  };

  //得到内容
  var content = find({
    innerHTML: html
  }, "div", "row", "role");
  content.forEach(item => {
    if (~item.attrs["class"].indexOf("py-2")) {
      item = find(item, "div");
      var isDir = ~item[0].template.indexOf('aria-label="Directory"');
      var filename = find(item[1], "a")[0].innerHTML
      var time = new Date(find(item[3], "time-ago")[0].attrs.datetime).getTime()
      if (isDir) {
        obj.dirs[githubPage + "/" + filename] = time;
        parseTreeData(githubPage + "/" + filename, obj)
      } else {
        obj.files[githubPage + "/" + filename] = time;
      }
    }
  })
  return obj;
}

//写文件
function writeTree(treedata, cacheInfo, githubPage, githubLoad) {

  for (var file in treedata.files) {
    var notModify = cacheInfo && cacheInfo[file] == treedata.files[file];
    var loadFile = file.replace(githubPage, githubLoad);
    var localFile = file.replace(githubPage, "");
    //时间不一致
    if (!notModify) {
      r(loadFile, localFile);
    } else {
      console.info(file.replace(githubPage), "is not modify")
    }
  }
}



/**ajax请求 */
function r(loadFile, localFile) {
  var content 

  try {
    console.log("请求：", loadFile, " 即将写入文件：", localFile)
    var res = http.get(loadFile, {});
    sleep(5000)
     content = res.body.string();
  } catch (e) {
    console.log(e)
    console.log(e.stack);

  }
  try {
    w(localFile,  content )
  } catch (e) {
    t("更新失败" + localFile);
  }

}

/* 消息队列*/
function t(msg) {
  toast(msg)
  sleep(1000)
}

/*写文件*/
function w(localFile,  content ) {
  if (global.debugger) {
    localFile = ("build/" + localFile).replace(/\/+/g, "/");
  } else {
    localFile = "./"+(localFile).replace(/\/+/g, "/");
  }
  console.log("写入数据到文件：", localFile)
  sleep(2000)
  files.ensureDir(localFile)
  files.write(localFile, content);
  t("更新成功" + localFile)
}

module.exports = function (githubPage, githubLoad) {

  var cacheInfo = {}
  if (files.exists("./cache.js")) {
    cacheInfo = require("../cache.js")
  }
  //解析github文件列表
  var treedata = parseTreeData(githubPage);

  writeTree(treedata, cacheInfo, githubPage, githubLoad)

  files.write("./cache.js", "module.exports=" + JSON.stringify(treedata))

}
