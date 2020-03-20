//welink自动打卡
require("./lib/work.js")

console.show()

var launchApp =  require("./lib/launch.js")

function findWorkBtn(args,workBtn){
  console.log("点击进入业务页面")
  workBtn.click();
  sleep(1000);
}

function findTvApp(args,tv_app_name){
    console.log("点击进入健康打卡")
    tv_app_name.parent().click();
    sleep(5000);
}

function checkSummit(args,condition,hd){
  var curD = new Date()
  var MM= (curD.getMonth() + 1) 
  var dd = curD.getDate()
  var cur = className("android.view.View").textContains(curD.getFullYear() + "-" +("00"+MM).slice(-2) + "-" + ("00"+dd).slice(-2)).findOne(3000);
  if(cur){
    console.log("今日已打卡");
    app.e.emit("gameKill");
  }else{
    console.log("今日未打卡");
    var back = id("tv_left_button").findOne()
    if(back){
      back.click()
      sleep(3000);
      hd.result="not"
    }else{
        throw Error("没有找到返回按钮");
    }
  }
}
function toCheckSummit(args,historyBtn){
  console.log("点击进入打卡历史页面")
  historyBtn.click();
  sleep(1000);
}
function inputAndsubmit(){
   console.log("滑出workplace")
   swipe(248, 1626, 304, 1305, 1000);
  
    //4
    var workPlace = className("android.view.View").text("WorkPlace").findOne(2000);
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
      var ok = className("android.view.View").text("确定/ok").findOne(2000);
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
},"launchApp-启动welink")

app.g(findWorkBtn,null,0,function(){
  return id("tab_icon").text("业务").findOne(2000);
},"findWorkBtn-导向业务页面")

app.g(findTvApp,null,0,function(){
  return className("android.widget.TextView").text("健康打卡轻应用").findOne(3000);
},"findTvApp-导向打卡页面")

 app.g(toCheckSummit,null,0,function(){
  return className("android.view.View").text("打卡记录").findOne(2000);
},"toCheckSummit-导向历史页面")


var hanlder = app.g(checkSummit,null,0,function(){
  return className("android.view.View").text("默认展示最近20次打卡记录").findOne(2000)
},"checkSummit-是否打卡")

app.g(inputAndsubmit,null,0,function(){
  return hanlder.result=="not" && className("android.view.View").text("打卡记录").findOne(2000);
},"inputAndsubmit-打卡")
