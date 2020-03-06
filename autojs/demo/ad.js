
/**检查广告是否结束*/
var lookADTime = 0

function checkAdEND(flow) {
  console.log("检查广告是否结束")
  //有钱花
  var ad2 = id("tt_reward_ad_countdown").findOne(5000)
  if (ad2) {
    console.log("广告进行中")
    clearTimeout(lookADTime)
    lookADTime = setTimeout(function() {
      checkAdEND(flow)
    }, 3000)
  } else {
    sleep(5000)
    var close = id("tt_video_ad_close_layout").findOne(5000)
    if (!close) {
      console.error("广告结束但是没有找到结束按钮")
      flow(false);
    } else {
      console.log("广告结束")
      close.click()
      sleep(1000)
      flow(true);
    }
  }
}

/**观看广告*/
function lookAD(flow) {
  var currentVolume = device.getMusicVolume();
  if (currentVolume) {
    alert("播放广告有声音")
    return;
  }
  var btn = id("btn_see").findOne(1000)
  if (!btn) {
    console.error("没有找到观看视频的按钮");
    flow(false);
    return;
  }
  console.log("进入广告")
  btn.click();

  sleep(5000)

  checkAdEND(function(flag) {
    if (flag) {
      var btn = id("btn").findOne(1000);
      if (!btn) {
        console.error("观看之后确认收益按钮没找到");
        flow(false);
        return;
      }
      console.log("点击确认收益按钮");
      btn.click()
      sleep(2000)
      flow(true)
    } else {
      flow(flag)
    }
  });
}

module.exports = lookAD;
