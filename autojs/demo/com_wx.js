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

function loop() {

  launchApp("com.tencent.wework")

  var workbar = id("d0j").className("android.view.TextView").text("工作台").findOne(3000)
  if (workbar) {
    console.log("点击工作台")
    workbar.click();
    sleep(1000);

    var dakai = id("ajo").className("android.view.TextView").text("打卡").findOne(3000)

    if (dakai) {
      console.log("进入打卡界面")
      dakai.parent().click()
      var xiaban = id("acs").className("android.view.TextView").text("下班打卡").findOne(3000)
      var shangban = id("acs").className("android.view.TextView").text("上班打卡").findOne(3000)
      var local = id("ft").className("android.view.TextView").text("你已再打卡范围内").findOne(3000)
      var curret = new Date()
      var h = curret.getHours();
      var m = curret.getMinutes();
      if (!local) {
        console.log("不在打卡区域")
        return;
      }
      //早上
      if (h < 8 || h == 8 && m < 30) {

        if (!shangban) {
          console.log("已经打了上班卡")
        } else {
          shangban.parent().click();
          console.log("上班打卡")
        }
        //晚上
      } else if (h > 18) {
        if (!xiaban) {
          console.log("已经打了下班卡")
        } else {
          xiaban.parent().click();
          console.log("下班打卡")
        }
        //中间时间
      } else {
        console.log("工作时间,不需要打卡")
      }


    } else {
      console.log("没有找到打卡按钮")
    }

  } else {
    console.error("没有找到工作台")
  }


}
loop()
