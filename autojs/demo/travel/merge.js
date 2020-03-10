var lookAd = require("./ad.js");

var gold = require("./gold.js");
console.log("成功加载组件 glod")

var offline = require("./offline.js");
console.log("成功加载组件 offline")

var launchApp = require("./launch.js");
console.log("成功加载组件 launch")

var city = require("./city.js");
console.log("成功加载组件 city")

var appName = "com.jiayouya.travel";
var friendName = "rap";
var tryTime=0


 function handlerError(msg){

    console.error(msg);
    tryTime++;
    if(tryTime>15){
        error.apply("已经尝试重启15次");
        return;
    }
    console.log("唤醒屏幕")
    device.wakeUpIfNeeded();
    //检查app是否还在
    if (currentPackage() != appName) {
        console.log("当前不在app内，服务重新启动");
        run();
    }else{
        var close = id("iv_close").findOne(3000);
        var close2 = id("tt_video_ad_close_layout").findOne(5000)
        var btn = id("btn").findOne(1000);
        var button2 = id("button2").findOne(1000);
        var add = id("lyt_add").findOne(1000)
        var back = id("iv_back").findOne(1000)

        if(close){
            console.log("发现未知关闭按钮,服务重新启动");
            close.click();
            run();
        }else if(close2){
            console.log("发现未知广告关闭按钮,服务重新启动");
            close2.click();
             btn = id("btn").findOne(1000);
            if(btn){
              console.log("点击确认按钮");
              btn.click();
            }
            run();
        }else if(btn){
            console.log("发现未知确认按钮,服务重新启动");
            btn.click();
            run();
        }else if(button2){
            console.log("发现未知系统取消按钮,服务重新启动");
            button2.click();
            run();
        }else if(add) {
          console.log("已回到主页,服务重新启动");
          run();
        }else if(back){
          console.log("找到返回按钮,返回并,服务重新启动");
          btn.click();
          run();
        }else{
          console.log("没有找到任何按钮,3s之后再检测");
          app.g(handlerError,null,3000)
        }
    }
  
}

app.e.on("systemError",handlerError)

//坐标参数
var rate = device.width / 1080
var homeMap ={"HWI-AL00":1}
var s = 35 * rate
var w = 210 * rate
var h = 210 * rate
var hashome = homeMap[device.model]?134:0

/**狗的位置信息*/
function findDogSpace() {
  var fristOne = id("tv").className("android.widget.TextView").text("旅行").findOne(3000);
  if(!hashome){
    if(!fristOne){
      throw Error("未知页面");
      return;
    }else{
      hashome =  134*rate - (device.height - fristOne.bounds().bottom);
    }
  }else{
     console.log("有home键");
  }
  var alldogs = []
  var x0 = 65 * rate;
  var y0 = 740 * rate + (device.height - device.width * 1920 / 1080)+hashome

  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 4; i++) {
      alldogs.push({ x: w / 2 + x0 + (s + w) * i, y: h / 2 + y0 + (s + h) * j })
    }
  }
  return alldogs
}

/**位置对应狗的信息*/
function getDogInfo(dog) {
  var left = dog.x;
  var top = dog.y;
  var right = dog.x + (s + w) / 2
  var buttom = dog.y + (s + h) / 2;
  var hasDog = boundsInside(left, top, right, buttom).find()
  if (hasDog.size() == 1) {
    return { level: hasDog.get(0).text(), x: dog.x, y: dog.y }
  } else {
    return null
  }

}

/**查找合并狗*/
function swiperDog() {
  var dogspace = findDogSpace();
  if(!dogspace){
    return;
  }
  var dogs = {}
  dogspace.forEach(function(dog, idx) {

    dog = getDogInfo(dog);
    console.log("获取位置" + idx + ((!!dog) ? "有" : "无") + "狗 等级:", dog && dog.level)
    if (dog) {
      if (dogs[dog.level]) {
        console.log("合并狗：" + dog.level)
        mergeDog(dogs, dog)
      } else {
        dogs[dog.level] = Object.assign({}, dog)
      }
    }
  })
  dogs = null;
  dogspace.length = 0
}

/**合并狗*/
function mergeDog(dogs, dog) {
  var mgdog = dogs[dog.level];
  console.log("移动开始", mgdog.x, mgdog.y, "->", dog.x, dog.y)
  sleep(2000)
  swipe(mgdog.x, mgdog.y, dog.x, dog.y, 300);
  sleep(2000)
  console.log("移动结束")
  dogs[dog.level] = null;
  var addLevel = Math.floor(parseInt(dog.level, 10) + 1);
  if (dogs[addLevel]) {
    console.log("递归合并狗" + dog.level)
    mergeDog(dogs, { level: addLevel, x: dog.x, y: dog.y })
  } else {
    dogs[addLevel] = { level: addLevel, x: dog.x, y: dog.y }
  }
}

/**校验是否需要看广告*/
function checkneedlookAd(flow) {
  var coin = className("android.widget.TextView").text("金币不足").findOne(1000)
  console.log("是否金币不足", !!coin)
  if (coin) {
    var num = className("android.widget.TextView").textContains("剩余").findOne(1000)
    num = num && num.text()

    if (num) {
      num = /剩余(\d+)/.exec(num)
      if (num && num[1]) {
        num = Math.floor(parseInt(num[1], 0) || 0)
      } else {
        num = 0
      }
    } else {
      num = 0;
    }
    console.log("可以观看视频的次数", num)
    if (num) {
      //异步的
      lookAd(flow);
      return;
    } else {
      console.log("视频次数已看完", num)
      var closeb = id("iv_close").findOne(1000);
    
      console.log("游戏结束")
      device.cancelKeepingAwake()

      if (closeb) {
        closeb.click()
      }
    }
  } else {
    //升级界面，等等
    var btn = id("btn").findOne(1000);
    if (!btn) {
      throw Error("未知界面")
      return;
    } else {
      btn.click();
      sleep(800)
      flow(true);
    }

  }
}

/**买狗*/
function buyDog(dogspace, flow) {
  if(!dogspace){
    return;
  }

  for (var i = 0; i < dogspace.length; i++) {
    var dog = getDogInfo(dogspace[i]);
    console.log("买狗-获取位置" + i + ((!!dog) ? "有" : "无") + "狗 等级:", dog && dog.level)
    var add = id("lyt_add").findOne(1000)
    if (!dog) {
      if (add) {
        add.click();
        console.log("点击购买按钮")
        sleep(2000);
      } else {
        console.log("需要观看视频")
        return checkneedlookAd(flow)
      }

    }
  }
  flow(true)
}


/**入口*/

var initflowTimer = 0

function initflow() {
  
  console.log("脚本开始运行")

  swiperDog();

  console.info("已合并全部狗")


 var canbuyTimes = buyDog(findDogSpace())

 console.info("买完狗了");

 console.info("-----merge -end --")

 if(canbuyTimes){
  app.g(initflow,null,0)
 }else{
  app.g(gold,null,60000)
  app.g(city,null,0);
  app.e.emit("gameover")
 }


}


function run(){

  app.g(launchApp,appName,0)
  
  app.g(offline,friendName,0)

  app.g(gold,null,0)
  
  app.g(city,null,0)
  
  app.g(initflow,null,0);

}


run();

