console.show()
//领取金币
var topGlodtimer=0

function topGlod() {

  var countdonw = id("countdown_view").findOne(1000)

  if (!countdonw) {
    console.log("点击领金币")
    id("lyt_free_coin").findOne(1000).click()
    sleep(1000)
    console.log("确认领取金币")
    id("btn").findOne(1000).click()
    sleep(1000)
  }else{
    console.log("还在计时")
  }

  var nextTime = 600000;

  clearTimeout(topGlodtimer)
  //35分钟领取一次
 console.log("十分钟之后再来检查是否可以领取金币")
  topGlodtimer = setTimeout(function() {
    topGlod();
  }, nextTime)
}

topGlod()
