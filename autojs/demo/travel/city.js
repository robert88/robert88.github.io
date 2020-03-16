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

  if (!textImageView || !textImageView.size()) {
    console.log("没有找到领取按钮");
    back()
    return;
  }
  var len = textImageView.size();
  console.log("找到领取list", len);

  var r = textImageView.get(0).bounds()


  var x0 = (r.left + r.right) / 2;
  var y0 = (r.top + r.bottom) / 2;
  //var
  for (var i = 0; i < len; i++) {
    console.log("点击领取")
    click(x0, y0);
    sleep(1000);

    var close = id("iv_close").findOne(3000) || id("btn").findOne(1000);
    if (!close) {
      throw Error("没有找到确认按钮")
    }

    console.log("确认领取")
    close.click();
    sleep(1000)
  }


  back();

  console.info("-----city -end --")
}

function back() {
  console.log("返回主页")
  var backbtn = id("iv_back").findOne(1000);
  if (!backbtn) {
    throw Error("城市轨迹不能返回")
  }
  backbtn.click();
  sleep(1000)
}


module.exports = clickCity
