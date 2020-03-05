
//领取金币
var topGlodtimer

function topGlod() {

  var countdonw = id("countdown_view").findOne(1000)

  if (countdonw) {
    id("lyt_free_coin").findOne(1000).click()
    sleep(1000)
    id("iv_close").findOne(1000).click()
    sleep(1000)
  }

  var nextTime = 35 * 60 * 1000;

  clearTimeout(topGlodtimer)
  //35分钟领取一次
  topGlodtimer = setTimeout(function() {
    topGlod();
  }, nextTime)
}
