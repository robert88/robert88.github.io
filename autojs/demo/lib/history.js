var parse = require("./parse.js");
var cacheInfo;
if (files.exists("./cache.json")) {
  cacheInfo = JSON.parse(require("./cache.json"));
}
//请求页面数据
function getDataByUrl(url){
  url = "https://github.com/robert88/robert88.github.io/tree/8669023de0f1af586008a21438cb97bee2c20e10/autojs/demo/"+url;
  try{
    var res = http.get(url, {});
    return  res.body.string();
  }catch(e){
    console.log("请求失败",url)
  }
  return "";
}

function parseTreeData(obj,url){
	var data = getDataByUrl(url);
	var parentDir = parentDir||"";
	var obj = obj ||{dirs:{},files:{}};
	var ol = parse("table",data);
	if(ol&&ol[0]){
		var li = parse("tbody",ol[0].template)
		li = li[li.length-1];
		if(li){
			var tr = parse("tr",li.template);
			tr.forEach(function(t){
				var td =  parse("td",t.template);
				if(td.length<4){
					return;
				}
				var isdir =  td[0].template.indexOf("octicon-file-directory")!=-1?1:0
				var name =  parse("a",td[1].template)[0].attrs.title;
				var time =  parse("time-ago",td[3].template)[0].attrs.datetime;
				
				if(isdir){
					obj.dirs[name]={dirs:{},files:{}};
					parseTreeData(obj.dirs[name],url+"/"+name);
				}else{
					obj.files[name] ={
						time: new Date(time),
						absolute:url+"/"+name
					} 
				}
	
			})
		}
	
	}

	return obj;
}
function writeTree(obj){
  for(var dir in obj.dirs){
    writeTree(dir);
  }
  for(var file in obj.files){
    r(file.absolute);
  }
}

var treedata = parseTreeData(null,"autojs","");

if(cache){
  wake.write("./cache.js",JSON.stringify(treedata))
  writeTree(treedata)
}else{
  diff(treedata,cache);
}

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

