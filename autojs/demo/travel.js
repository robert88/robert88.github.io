
//领取金币
var topGlodtimer

function topGlod() {

  var countdonw = id("countdown_view").findOne(1000)

  if (!countdonw) {
    console.log("可以领取了")
    id("lyt_free_coin").findOne(1000).click()
    sleep(1000)
    console.log("领取完毕")
    id("iv_close").findOne(1000).click()
    sleep(1000)
  }else{
        console.log("不能领")
  }

  var nextTime = 35 * 60 * 1000;

  clearTimeout(topGlodtimer)
  //35分钟领取一次
  topGlodtimer = setTimeout(function() {
    topGlod();
  }, nextTime)
}
