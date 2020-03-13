console.show();
console.log("设备",device.width,device.height);

//坐标参数
var rate = device.width / 1080
var homeMap ={"HWI-AL00":1}
var s = 35 * rate
var w = 210 * rate
var h = 210 * rate
var hashome = homeMap[device.model]?135:0

/**狗的位置信息*/
function findDogSpace() {
  var fristOne = id("tv").className("android.widget.TextView").text("旅行").findOne(3000);
  if(!hashome){
    if(!fristOne){
      throw Error("未知页面");
      return;
    }else{
      hashome = 135*rate - (device.height - fristOne.bounds().bottom);
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
  console.log(hasDog.size())
  if (hasDog.size() == 1) {
    return { level: hasDog.get(0).text(), x: dog.x, y: dog.y }
  } else {
    return null
  }

}
findDogSpace().forEach(function(d,i){
  var dg = getDogInfo(d);

       console.log("移动",i,"d",dg&&dg.level,"x",dg&&dg.x,"y",dg&&dg.y);
   swipe(d.x,d.y,d.x+(w+s)/2,d.y+(h+s)/2,1000)
   sleep(1000)
})
