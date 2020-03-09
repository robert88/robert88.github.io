
var lookAd = require("./ad.js");

//坐标参数
var rate = device.width / 1080
var homeMap ={"HWI-AL00":1}
var s = 35 * rate
var w = 210 * rate
var h = 210 * rate
var hashome = homeMap[device.model]?120:0

/**狗的位置信息*/
function findDogSpace() {
  var fristOne = id("tv").className("android.widget.TextView").text("旅行").findOne(3000);
  if(!hashome){
    if(!fristOne){
      console.error("未知页面");
      return;
    }else{
      hashome = device.height - fristOne.bounds().bottom;
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
      var closeb = id("iv_close").findOne(1000)
      if (closeb) {
        closeb.click()
      }
      flow(false)
    }
  } else {
    //升级界面，等等
    var btn = id("btn").findOne(1000);
    if (!btn) {
      console.error("未知界面")
      flow(false);
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
    var dog = getDogInfo(dogspace[i], 800);
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


 buyDog(findDogSpace(), function(flag) {
    console.info("买完狗了");
    if (!flag) {
      console.error("游戏没有走完正常流程")
    } else {
      clearTimeout(initflowTimer)
      initflowTimer = setTimeout(function() {
        initflow()
      }, 1000)
    }

  })


}

module.exports = initflow
