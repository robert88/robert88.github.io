//welink自动打卡
var wk = require("./lib/work.js")
var notice = require("./lib/notice.js")

console.show()

var launchApp =  require("./lib/launch.js")
var pageTo =  require("./lib/pageTo.js")

function checkSummit(args,condition,hd){
  var curD = new Date()
  var MM= (curD.getMonth() + 1) 
  var dd = curD.getDate()
  var cur = wk.t(curD.getFullYear() + "-" +("00"+MM).slice(-2) + "-" + ("00"+dd).slice(-2));className("android.view.View");
  if(cur){
    console.log("今日已打卡");
    notice("welink 已健康打卡",new Date().toString())
    app.e.emit("gameKill");
  }else{
    console.log("今日未打卡");
    var back = id("tv_left_button").findOne(2000)
    if(back){
      back.click()
      sleep(3000);
      hd.result="not"
    }else{
        throw Error("没有找到返回按钮");
    }
  }
}

function inputAndsubmit(){
   console.log("滑出workplace")
   swipe(248, 1626, 304, 1305, 1000);
  
    //4
    var workPlace = wk.t("WorkPlace");
      if (!workPlace) {
        throw Error("没有工作地点选择项")
      }
  
      console.log("点击下拉选择")
      click(100, workPlace.bounds().bottom - 10);
      sleep(1000)
  
       //5
      console.log("选择非研究")
      swipe(248, 1626, 304, 1305, 1000)
      sleep(1000)
    
       //6
      console.log("点击确定")
      var ok = wk.t("确定/ok");
      if (!ok) {
          throw Error("没有找到确认按钮")
      }
      ok.click();
      sleep(1000)
  
        //7
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)

        var submit = className("android.widget.Button").findOne(2000)
        if (submit) {
          console.log("点击提交打卡")
          submit.click();
          app.e.emit("welinkKill");
        } else {
          console.log("没有找到提交按钮")
        }
        
}

app.g(launchApp,"com.huawei.works",0,function(){
  return currentPackage() != "com.huawei.works"
},"1-启动welink")

app.g(pageTo,true,0,function(){
  return id("tab_icon").className("android.widget.RadioButton").text("业务").findOne(2000);
},"2-导向业务页面")

app.g(pageTo,null,0,function(){
  return wk.t("健康打卡轻应用"); 
},"3-导向打卡页面")

 app.g(pageTo,true,0,function(){
   var list = wk.t("打卡记录")
  return list&&list.size()>1&&list.get(0); 
},"4-导向历史页面")


var hanlder = app.g(checkSummit,null,0,function(){
  return   wk.t("默认展示最近20次打卡记录"); 
},"5-是否打卡")

app.g(inputAndsubmit,null,0,function(){
  return hanlder.result=="not" && wk.t("打卡记录"); 
},"6-打卡")
