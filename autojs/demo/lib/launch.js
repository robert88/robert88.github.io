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
module.exports = launchApp
