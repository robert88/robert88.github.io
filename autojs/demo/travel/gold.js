//领取金币

var nextTime,splitTime;

function topGlod() {
  var curTime = new Date();
  if(curTime<nextTime){
    console.log("等待topGlog的执行");
    return;
  }
  nextTime = curTime+splitTime;
  var countdonw = id("countdown_view").findOne(1000)

  if (!countdonw){
    console.log("可以领金币了");

    var freeIcon = id("lyt_free_coin").findOne(1000);

    if(freeIcon){
      console.log("点击领金币");
      freeIcon.click();
      sleep(1000)

     var btn =  id("btn").findOne(1000)
      if(btn){
        console.log("确认领取金币")
        btn.click();
        sleep(1000)
      }else{
        console.info("没有找到获取金币的确认按钮")
      }

    }else{
      console.info("没有找到获取金币的按钮")
    }

  }else{
    console.log("还在计时")
  }

}
module.exports = function(timeStack,time){
  splitTime = time;
  topGlod()
  timeStack.push(topGlod);
}
