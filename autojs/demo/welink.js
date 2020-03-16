//welink自动打卡
console.show()

var launchApp =  requrie("./lib/launch.js")

//1
console.log("启动app")
launchApp("com.huawei.works")

var workBtn = id("tab_icon").text("业务").findOne(2000)
if (workBtn) {
  //2
  console.log("点击业务按钮")
  workBtn.click();
  sleep(1000);

  var tv_app_name = id("tv_app_name").text("健康打卡轻应用").findOne(2000);
  if (tv_app_name) {

    //3
    console.log("点击进入健康打卡")
    tv_app_name.parent().click();
    sleep(5000);

    if(checkWorkEnd()){
      console.log("当天已打卡")
      return
    }
    
   console.log("滑出workplace")
   swipe(248, 1626, 304, 1305, 1000)
    
    //4
    var workPlace = className("android.view.View").text("WorkPlace").findOne(2000);
    if (workPlace) {
      console.log("点击下拉选择")
      click(100, workPlace.bounds().bottom - 10);
      console.log("选择非研究")
      sleep(1000)

      //5
      swipe(248, 1626, 304, 1305, 1000)
      sleep(1000)
      console.log("点击确定")
      var ok = className("android.view.View").text("确定/ok").findOne(2000);
      if (ok) {
        //6
        ok.click();
        sleep(1000)
        
          console.log("滑倒底部")
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
          swipe(248, 1626, 304, 1005, 1000)
        //7
        var submit = className("android.widget.Button").findOne(2000)
        if (submit) {
          submit.click()
        } else {
          console.log("没有找到提交按钮")
        }
        
      } else {
        console.log("没有找到确认按钮")
      }
    } else {
      console.error("没有工作地点选择项")
    }
  } else {
    console.error("没有找到打卡入口")
  }
} else {
  console.error("没有找到，点击业务按钮")
}

function checkWorkEnd() {
  var history = className("android.view.View").text("打卡记录").findOne(3000);

  if (history) {
    history.click();
    sleep(10000)
    var curD = new Date()
    var cur = className("android.view.View").textContains(curD.getFullYear() + "-" + (curD.getMonth() + 1) + "-" + curD.getDate()).findOne(3000);
    if (cur) {
      console.log("")
    }
    var back = id("tv_left_button").findOne()
    if(back){
      back()
      sleep(3000)
    }else{
        console.error("没有找到返回按钮");
    }
  } else {
    console.error("未知界面");
  }

}


