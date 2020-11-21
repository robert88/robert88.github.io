//解析html
var parse = require("./parse.js");


//请求页面数据
function loadPageHtml(url) {
  try {
    console.log("请求url", url)
    var res = http.get(url, {});
    return res.body.string();
  } catch (e) {
    console.log("请求失败", url, e.stack)
  }
  return "";
}

//解析页面数据 得到文件的更新时间
// function parseTreeData( githubPage,localPath) {
//   var html = loadPageHtml(githubPage);
//   var parentDir = parentDir || "";
//   var obj = obj || { dirs: {}, files: {} };

//   //得到内容
//   var ol = parse("table", html);

//   if (ol && ol[0]) {
//     var li = parse("tbody", ol[0].template)

//     li = li[li.length - 1];

//     if (li) {
//       var tr = parse("tr", li.template);
//       tr.forEach(function(t) {
//         var td = parse("td", t.template);
//         if (td.length < 4) {
//           return;
//         }
//         var isdir = td[0].template.indexOf("octicon-file-directory") != -1 ? 1 : 0
//         var name = parse("a", td[1].template)[0].attrs.title;
//         var time = parse("time-ago", td[3].template)[0].attrs.datetime;
//         if (isdir) {
//           obj.dirs[name] = { dirs: {}, files: {} };
//           parseTreeData(obj.dirs[name], url + name+"/");
//         } else {
//           obj.files[name] = {
//             time: new Date(time),
//             absolute: url +  name
//           }
//         }

//       })
//     }

//   }
//   return obj;
// }
function find(content, tag, className,attrsName) {
  if (content) {
    var li = parse(tag, content.innerHTML)
    if(className&&attrsName){
      li = li.filter(item => {
        if ((item.attrs&&item.attrs[attrsName]&&item.attrs[attrsName]==className)) {
          return true
        }
        return false
      })
    }
    return li;
  }
  return ""
}

function parseTreeData(githubPage,obj) {
  var html = loadPageHtml(githubPage);
  var parentDir = parentDir || "";
  var obj = obj || { dirs: {}, files: {} };

  //得到内容
  var content = find({innerHTML:html}, "div","row","role");
  content.forEach(item => {
    if (~item.attrs["class"].indexOf("py-2")) {
      item = find(item,  "div");
      var isDir = ~item[0].template.indexOf('aria-label="Directory"');
      var filename = find(item[1],  "a")[0].innerHTML
      var time = new Date(find(item[3],  "time-ago")[0].attrs.datetime).getTime()
      if (isDir) {
        obj.dirs[githubPage + "/" + filename] = time;
        parseTreeData(githubPage + "/" + filename,obj)
      } else {
        obj.files[githubPage + "/" + filename] = time;
      }
    }
  })
  return obj;
}

//写文件
function writeTree(treedata, cacheInfo,githubPage,githubLoad) {

  for (var file in treedata.files) {
    var notModify = cacheInfo && cacheInfo[file] == treedata.files[file];
    var loadFile = file.replace(githubPage,githubLoad);
    var localFile = file.replace(githubPage,"");
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

  console.log("请求", loadFile, "写入文件", localFile)
  try {
    var res = http.get(loadFile, {});
    w(localFile, res)
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
function w(localFile, res) {
  if( global.debugger){
    localFile = "build/"+localFile
  }
  var content = res.body.string();
  console.log("写入数据", localFile)
  files.ensureDir(localFile)
  files.write(localFile, content);
  t("更新成功" + localFile)
}

module.exports = function(githubPage, githubLoad) {

  var cacheInfo ={}
  if (files.exists("./cache.js")) {
    cacheInfo = require("./cache.js")
  }
  //解析github文件列表
  var treedata = parseTreeData(githubPage);

  writeTree(treedata, cacheInfo,githubPage,githubLoad)

  files.write("./cache.js", "module.exports=" + JSON.stringify(treedata))

}