
/**检查广告是否结束*/

var checkTime = 0;

function checkAdEND(flow) {

checkTime++;

  console.log("检查广告是否结束")
  //有钱花
  var close = id("tt_video_ad_close_layout").findOne(5000)
  if (!close) {
    console.log("广告进行中")
    
    if(checkTime>20){
      checkTime=0;
      throw Error("广告结束检测次数太多");
    }

    //加入队列当中
    app.g2(checkAdEND,null,3000);

  } else {
      console.log("广告结束")
      close.click()
      sleep(2000)

      var btn = id("btn").findOne(1000);
      if (!btn) {
        throw Error("观看之后确认收益按钮没找到");
      }

      console.log("点击确认收益按钮");
      btn.click()
      sleep(1000)

  }
}

/*关闭声音*/
var maxCount=0;
function closeVolume(){
 maxCount++;
  if(maxCount<20){
    var currentVolume =  device.getMusicVolume();
    console.log("声音",currentVolume,"启动","VolumeDown");
    VolumeDown();
    if(currentVolume>0){
       closeVolume()
    }else{
      console.log("声音已关闭");
      maxCount=0
    }
  }else{
      console.log("声音关闭不了");
      maxCount=0
  }
  maxCount--
}

/**观看广告*/
function lookAD() {

 //购买观看，离线观看按钮
  var btn = id("btn_see").findOne(1000)||id("btn_share").findOne(1000)
  if (!btn) {
    throw Error("没有找到观看视频的按钮");
  }
  console.log("启动关闭声音")
    
  closeVolume();

  console.log("进入广告")
  btn.click();
  sleep(5000)

  checkAdEND();
}

module.exports = lookAD;
