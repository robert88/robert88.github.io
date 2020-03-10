//welink自动打卡
console.show()

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

    //4
    var workPlace = className("android.view.View").text("WorkPlace").findOne(2000);
    if (workPlace) {
      console.log("点击下拉选择")
      click(100, workPlace.bounds().buttom - 10);
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

        //7
        var submit = className("android.widget.Button").text("Submit").findOne(2000)
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
    sleep(3000);
    var curD = new Date()
    var cur = className("android.view.View").textContains(curD.getFullYear() + "-" + (curD.getMonth() + 1) + "-" + curD.getDate()).findOne(3000);
    if (cur) {
      console.log("")
    }
  } else {
    console.error("未知界面");
  }

}

//启动服务
function launchApp(name) {
  if (currentPackage() == name) {
    console.log("服务已启动")
    return
  }
  app.launch(name);
  sleep(3000);
  if (currentPackage() != name) {
    throw Error("服务启动慢或者未启动")
  } else {
    console.log("启动完毕")
    var skipbtn = id("tt_splash_skip_btn").findOne(2000);
    if (skipbtn) {
      console.log("点击跳过广告")
      skipbtn.click();
      sleep(5000);
    } else {
      console.log("启动没有发现广告")
    }
  }
}
