
var lookAd = require("./ad.js");

//离线按钮
function offlineBtn(sharename, flow) {
  var offlineObj = className("android.widget.TextView").text("离线收益").findOne(1000);
  var shareBtnText = className("android.widget.TextView").text("分享翻倍").findOne(1000)
  var doubleadd = className("android.widget.TextView").text("看广告翻倍").findOne(1000)
  if (offlineObj) {
    console.log("离线收益提示")

    //微信分享
    if (shareBtnText) {
      console.log("分享翻倍 点击翻倍按钮")
      id("btn_share").findOne().click();
      sleep(3000);
      wxshare(sharename);
      flow(true)

    //广告翻倍
    } else if (doubleadd) {
      console.log("看广告翻倍，点击翻倍按钮")
      id("btn_share").findOne().click();
      sleep(3000);
      lookAd(flow)
    } else {
      console.error("未知界面")
    }
  } else {
    console.log("没有发现离线收益提示")
    flow(true)
  }
}

//微信分享
function wxshare(sharename) {

  //1点击微信分享按钮
  console.log("生成海报，点击微信朋友按钮")
  var ivwx = id("iv_wx").findOne(3000)
  if (!ivwx) {
    console.error("分享找不到生成海报按钮");
    return;
  }
  ivwx.click();
  sleep(9000);

  //2跳到微信的分享页面
  console.log("跳到微信的分享页面,查找朋友", sharename)
  var friend = className("android.widget.TextView").text(sharename).findOne(3000)
  if (!friend) {
    console.error("没有找到需要分享的朋友")
  }
  console.log("找到微信朋友");
  friend.parent().click();
  sleep(1000);

  //3输入分享文字确认
  console.log("输入分享的文字")
  var iptText = id("b4h").findOne(3000)
  if (iptText) {
    console.error("没有找到分享的输入文字界面")
    return;
  }
  iptText.setText("我在玩一个可以挣点小钱的工具，分享给你有空可以玩一下");
  sleep(1000);

  //4分享确认
  console.log("点击分享")
  id("b49").findOne(1000).click();
  sleep(1000);

  //5返回
  console.log("点击返回旅行世界按钮")
  var back = className("android.widget.Button").text("返回旅行世界").findOne(5000)
  if (!back) {
    console.error("分享之后没有找到分享的返回键")
    return
  }
  back.click()
  sleep(5000);


}

module.exports = offlineBtn
