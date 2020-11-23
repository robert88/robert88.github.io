//解析html
var parse = require("./parse.js");


//请求页面数据
function loadPageHtml(url, callback) {
  console.log("异步请求url", url)
  http.get(url, {}, res => {
    if (res.statusCode == 200) {
      callback(res.body.string());
    } else {
      console.log("error:", res.statusCode + ":" + "ajax ERROR")
    }
  });
}

/*
parse html结构
*/
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
/*
  得到文件数
*/
function parseTreeData(githubPage, obj, callback) {

  var obj = obj || {
    dirs: {},
    files: {},
    time: 0
  };

  loadPageHtml(githubPage, html => {
    //得到内容
    var content = find({
      innerHTML: html
    }, "div", "row", "role");

    obj.time += content.length;

    content.forEach(item => {
      obj.time--;
      if (~item.attrs["class"].indexOf("py-2")) {
        item = find(item, "div");
        var isDir = ~item[0].innerHTML.indexOf('aria-label="Directory"');
        var filename = find(item[1], "a")[0].innerHTML.trim()
        var time = new Date(find(item[3], "time-ago")[0].attrs.datetime).getTime()
        if (isDir && filename && !obj.dirs[githubPage + "/" + filename]) {
          obj.dirs[githubPage + "/" + filename] = time;
          parseTreeData(githubPage + "/" + filename, obj)
        } else if(~filename.indexOf(".")){
          obj.files[githubPage + "/" + filename] = time;
        }
      }
    })

    if (obj.time == 0) {
      callback(obj);
    }


  });




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

  if (global.debugger) {
    localFile = ("build/" + localFile).replace(/\/+/g, "/");
  } else {
    localFile = "./demo/" + (localFile).replace(/\/+/g, "/");
  }

  console.log("异步请求：", loadFile,"即将写入文件：",localFile);
  
  http.get(loadFile, {}, res => {
    if (res.statusCode == 200) {
      w(localFile, res.body.string());
    } else {
      console.log("资源文件请求失败", e.message, e.stack);
    }
  });
}


/*写文件*/
function w(localFile, content) {
  console.log("写入数据到文件：", localFile)
  sleep(1000)
  files.ensureDir(localFile)
  files.write(localFile, content);
  t( localFile+" 写入成功")
}

/* 消息队列*/
function t(msg) {
  toast(msg)
  sleep(1000)
}

//请求地址

module.exports = function(githubPage, githubLoad) {

  var cacheInfo = {}
  if (files.exists("./cache.js")) {
    cacheInfo = require("../cache.js"); // require的地址不一样
  }

  //解析github文件列表
  parseTreeData(githubPage, null, treedata => {

    writeTree(treedata, cacheInfo, githubPage, githubLoad);
    files.write("./cache.js", "module.exports=" + JSON.stringify(treedata));

  });



}