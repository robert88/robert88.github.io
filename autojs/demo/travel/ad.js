
/**检查广告是否结束*/
var lookADTime = 0

function checkAdEND(flow) {
  
 console.log("启动关闭声音")
  
 closeVolume();
  
  console.log("检查广告是否结束")
  //有钱花
  var close = id("tt_video_ad_close_layout").findOne(5000)
  if (!close) {
    console.log("广告进行中")
    clearTimeout(lookADTime)
    lookADTime = setTimeout(function() {
      checkAdEND(flow)
    }, 3000)
  } else {
      console.log("广告结束")
      close.click()
      sleep(1000)
      flow(true);
  }
}

/*关闭声音*/
var maxCount=0;
function closeVolume(){
 maxCount++;
  if(maxCount<10){
    var currentVolume =  device.getMusicVolume;
    VolumeDown();
    if(currentVolume){
       closeVolume()
    }else{
      console.log("声音已关闭");
    }
  }else{
      console.log("声音关闭不了");
  }
  maxCount--
}

/**观看广告*/
function lookAD(flow) {
  
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
