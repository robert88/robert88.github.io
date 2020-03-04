//test

//无障碍服务
auto.waitFor()

function lottery() {
  //抽奖入口
  var lotteryenter = [441, 135],

    //抽奖开始按钮
    lotterystart = [348, 1081],

    //抽奖关闭按钮
    lotteryclose = [597, 437],

    //关闭按钮
    lotteryend = [353, 899]

  //每天5次抽奖
  var time = 5;

  //打开抽奖 3s延时
  k(lotteryenter, 20)

  for (var i = 0; i < time; i++) {
    //获奖次数
    var lotterNumView = getViewInfoByXY({ x: 444, y: 927 })
    if (lotterNumView.className == "android.view.TextView" && viewInfo.text == "x0") {
      break;
    }
    k(lotterystart, 100)
    //35秒延时
    k(lotteryend, 20)

  }

  //退出
  k(lotteryclose, 20);


}

//点击函数
function k(t, n) {
  click(t[0], t[1]);
  sleep(n * 100)
}
//移动函数
function s(t1, t2, n) {
  swipe(t1.x, t1.y, t2.x, t2.y, 1000);
  sleep(n * 100)
}


function topGlod() {
  //点击1小时领取金币
  var topGlodEnter = [306, 126];

  var topGlodOk = [481, 1226];

  k(topGlodEnter, 20);

  k(topGlodOk, 20);

}

//离线收益
function offlineBtn() {
  var offlineObj =  className("android.widget.TextView").text("离线收益").findOne()
  if(offlineObj){
    
  }
 
  var double = [522, 1165]
  var share = [318, 1551]
  var onePerson = [756, 661];
  var shareOk = [739, 1410];
  var backapp = [323, 1211]

  //bug需要判断一下是否有离线按钮

  //翻倍按钮
  k(double, 20);

  //分享
  k(share, 100);

  //第一个好友，最好将比较熟的好友置顶
  k(onePerson, 20);

  //延时稍微长一些
  k(shareOk, 200);

  //返回app
  k(backapp, 500);

}

//使用坐标来定位到view
function getViewInfoByXY() {
  var obj = {}
  return obj
}

var alldogs = [
  { x: 110, y: 846 }, { x: 270, y: 850 }, { x: 437, y: 864 }, { x: 596, y: 864 },
  { x: 124, y: 1011 }, { x: 281, y: 1007 }, { x: 436, y: 1014 }, { x: 601, y: 1009 },
  { x: 124, y: 1175 }, { x: 276, y: 1175 }, { x: 440, y: 1179 }, { x: 578, y: 1191 }
]
//合成狗
function swiperDog() {

  var dogs = [];
  for (var i = 0; i < alldogs.length; i++) {
    var viewInfo = getViewInfoByXY(alldogs[i]);
    if (viewInfo.className == "android.view.ImageView") {
      dogs.push(Object.assign({}, alldogs[i]))
    }
  }
  swiperingDog(dogs[0], dogs)
}

function swiperingDog(dog, dogs) {
  var newdog
  //没有可以移动的狗
  if (!dogs || dogs.length == 0) {
    return;
  }
  //当前狗已经移走了
  if (dog.merge) {
    newdog = dogs.shift();
    swiperingDog(newdog, dogs)
  } else {
    for (var i = 0; i < dogs.length; i++) {
      s(dog, dogs[i], 5000);
      var dogviewInfo = getViewInfoByXY(dog);
      if (dogviewInfo.className != "android.view.ImageView") {
        newdog = dogs.shift();
        swiperingDog(newdog, dogs)
        break;
      }
    }
    //没有匹配到
    if (i == dogs.length) {
      dog.merge = true;
      newdog = dogs.shift();
      swiperingDog(newdog, dogs)
    }
  }

}
//检查是否有位置
function hasEmptySpace(dogs) {
  for (var i = 0; i < dogs.length; i++) {
    var dogviewInfo = getViewInfoByXY(dogs[i]);
    if (dogviewInfo.className != "android.view.ImageView") {
      return true;
    }
  }
  return false;
}
//检查是否钱够
function checkNotMoney() {
  var moneyText = [385, 690];
  var viewInfo = getViewInfoByXY({ x: moneyText[0], y: moneyText[1] });
  if (viewInfo.className == "android.view.TextView" && viewInfo.text == "金额不足") {
    return true
  }
  return false
}
//看广告
function lookAD(btn) {
  var closeBtn = [641, 132]
  var adend = [361, 919]
  k(btn, 400);
  var viewInfo = getViewInfoByXY({ x: closeBtn[0], y: closeBtn[1] });
  if (viewInfo.className == "android.view.ImageView") {
    k(closeBtn, 10);
    k(adend, 10);
  } else {
    console.log("不能关闭广告")
  }
}
var lookTime = 0;

//买狗
var maxLen = 0;

function buyDog() {
  //只能买这么多
  if (maxLen > alldogs.length) {
    return
  }
  maxLen++;

  var buybtn = [398, 1317];
  //没有钱看视频
  if (checkNotMoney()) {
    if (lookTime < 15) {
      lookAD();
      lookTime++;
      buyDog();
    }
  } else {
    if (hasEmptySpace(alldogs)) {
      k(buybtn, 500);
      buyDog();
    }
  }

}

offlineBtn();

topGlod()

lottery();

swiperDog()

maxLen = 0
buyDog()
