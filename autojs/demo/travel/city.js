function clickCity() {

  var citybackground = id("progress_bar").findOne(1000);

  if (!citybackground) {
    console.log("没有找到城市轨迹按钮")
    return;
  }

  console.log("点击城市轨迹按钮")
  citybackground.click()
  sleep(1000);

  var textImageView = className("android.widget.TextView").text("领取").find();

  if (!textImageView || textImageView.size()) {
    console.log("没有找到领取按钮")
    return;
  }

  console.log("找到领取list", textImageView.size());

  textImageView.forEach(child2 => {

    console.log("点击领取")
    child2.parent().click();
    sleep(1000);

    var close = id("iv_close").findOne(3000) || id("btn").findOne(1000);
    if (!close) {
      throw Error("没有找到确认按钮")
    }

    console.log("确认领取")
    close.click();
    sleep(1000)

  })

  console.log("返回主页")
  var backbtn = id("iv_back").findOne(1000);
  if (!backbtn) {
    throw Error("城市轨迹不能返回")
  }
  backbtn.click();
  sleep(1000)

  console.info("-----city -end --")
}



module.exports = clickCity
