console.show()
//离线按钮
function offlineBtn(sharename, flow) {
  var offlineObj = className("android.widget.TextView").text("离线收益").findOne(1000);
  var shareBtnText = className("android.widget.TextView").text("分享翻倍").findOne(1000)
  var doubleadd = className("android.widget.TextView").text("看广告翻倍").findOne(1000)
  if (offlineObj) {
    console.log("离线收益提示")
    if (shareBtnText) {
      console.log("分享翻倍 点击翻倍按钮")
      id("btn_share").findOne().click();
      sleep(3000);
      wxshare(sharename);
      flow()
    } else if (doubleadd) {
      console.log("看广告翻倍，点击翻倍按钮")
      id("btn_share").findOne().click();
      sleep(3000);
      lookAd(flow)
    } else {
      console.error("未知界面")
      flow(false)
    }
  } else {
    console.log("没有发现离线收益提示")
    flow(true)
  }
}

//微信分享
function wxshare(sharename) {
  console.log("生成海报，点击微信朋友按钮")
  //点击微信分享按钮
  id("iv_wx").findOne(1000).click();
  sleep(9000);

  console.log("跳到微信的分享页面,查找朋友", sharename)
  //跳到微信的分享页面
  var friend = className("android.widget.TextView").text(sharename).findOne(3000)

  if (friend) {
    console.log("找到微信朋友");
    friend.parent().click();
    sleep(1000);
    console.log("输入分享的文字")
    // 输入分享文字确认
    id("b4h").findOne(3000).setText("我在玩一个可以挣点小钱的工具，分享给你有空可以玩一下");
    sleep(1000);
    console.log("点击分享")
    id("b49").findOne(1000).click();
    sleep(1000);
    console.log("点击返回旅行世界按钮")
    className("android.widget.Button").text("返回旅行世界").findOne(5000).click()
    sleep(5000);
  } else {
    console.error("没有找到需要分享的朋友")
  }

}

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

offlineBtn("rap", function() {
  console.log("离线收益结束")
})
