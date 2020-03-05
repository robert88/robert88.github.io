console.show()

// setInterval(() => {
//     var button = id("button2").findOne(500)
//     if (button) {
//         toast("取消前往")
//         button.click()
//     }
// }, 1000);

//全部dog
var rate = device.width / 1080

var s = 35 * rate
var w = 210 * rate
var h = 210 * rate

setScreenMetrics(1080, 1920);

function findDogSpace() {
    var alldogs = []
    var x0 = 65 * rate;
    var y0 = 740 * rate

    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 4; i++) {
            alldogs.push({ x: w / 2 + x0 + (s + w) * i, y: h / 2 + y0 + (s + h) * j })
        }
    }
    return alldogs
}

function getDogInfo(dog,time) {
    sleep(time)
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



function swiperDog() {
    var dogspace = findDogSpace();
    var dogs = {}
    dogspace.forEach(function (dog,idx) {

        dog = getDogInfo(dog,1000);
        console.log("获取位置"+idx+((!!dog)?"有":"无")+"狗 等级:",dog&&dog.level)
        if (dog) {
            if (dogs[dog.level]) {
                console.log("合并狗："+dog.level)
                mergeDog(dogs, dog)
            } else {
                dogs[dog.level] = Object.assign({}, dog)
            }
        }
    })
    dogs= null;
    dogspace.length=0
}

//是否有两只相同的狗
function mergeDog(dogs, dog) {
    var mgdog = dogs[dog.level];
    console.log("移动开始",mgdog.x, mgdog.y,"->",dog.x, dog.y)
    sleep(2000)
    swipe(mgdog.x, mgdog.y, dog.x, dog.y, 300);
    sleep(2000)
    console.log("移动结束")
    dogs[dog.level] = null;
    var addLevel = Math.floor(parseInt(dog.level, 10) + 1);
    if (dogs[addLevel]) {
        console.log("递归合并狗"+dog.level)
        mergeDog(dogs, { level: addLevel, x: dog.x, y: dog.y })
    } else {
        dogs[addLevel] = { level: addLevel, x: dog.x, y: dog.y }
    }
}

function checkneedLookAD(flow){
    var coin = className("android.widget.TextView").text("金币不足").findOne(1000)
    console.log("是否金币不足",!!coin)
    if(coin){
        var num = className("android.widget.TextView").textContains("剩余").findOne(1000)
        num = num&&num.text()

        if(num){
            num = /剩余(\d+)/.exec(num)
            if(num&&num[1]){
                num = Math.floor(parseInt(num[1],0)||0)
            }else{
                num=0
            }
        }else{
            num=0;
        }
        console.log("可以观看视频的次数",num)
        if(num){
            //异步的
            lookAD(flow);
            return;
        }else{
            console.log("视频次数已看完",num)
           var  closeb = id("iv_close").findOne(1000)
           if(closeb){
            closeb.click()
           }
           flow(false)
        }
    }else{
        console.error("未知界面")
        flow(false);
    }
}

function buyDog(dogspace,flow) {
    for (var i = 0; i < dogspace.length; i++) {
        var dog = getDogInfo(dogspace[i],800);
        console.log("买狗-获取位置"+i+((!!dog)?"有":"无")+"狗 等级:",dog&&dog.level)
        var add = id("lyt_add").findOne(1000)
        if (!dog) {
            if(add){
                add.click();
                console.log("点击购买按钮")
                sleep(2000);
            }else{
                console.log("需要观看视频")
                return checkneedLookAD(flow)
            }
     
        }
    }
    flow(true)
}

var lookADTime=0
function checkAdEND(flow){
    console.log("检查广告是否结束")
//有钱花
var ad1 = id("tt_click_upper_non_content_layout").findOne(150000)
if(ad1){
    console.log("广告进行中")
    clearTimeout(lookADTime)
    lookADTime = setTimeout(function(){
        checkAdEND(flow)
    },5000)
}else{
   var close =id("tt_video_ad_close_layout").findOne(15000)
    if(!close){
        console.error("广告结束但是没有找到结束按钮")
        flow(false);
    }else{
        console.log("广告结束")
        close.click()
        sleep(5000)
        var btn =  id("btn").findOne(1000);
        if(!btn){
            console.error("观看之后确认收益按钮没找到");
            flow(false);
            return;
        }
        console.error("点击确认收益按钮");
        btn.click()
        sleep(2000)
        flow(true);
    }
}
}

function lookAD(flow){

   var btn =  id("btn_see").findOne(1000)
   if(!btn){
    console.error("没有找到观看视频的按钮");
    flow(false);
    return;
   }
   console.log("进入广告")
   btn.click();

    sleep(5000)

    checkAdEND(flow);
    
    
}

var initflowTimer=0
function initflow(){

    console.log("脚本开始运行")

    swiperDog();

    console.info("已合并全部狗")

    
    var canBuy = buyDog(findDogSpace(),function(flag){
        console.info("买完狗了");
        if(!flag){
            console.error("游戏没有走完正常流程" )
        }else{
            clearTimeout(initflowTimer)
           initflowTimer =  setTimeout(function(){
            initflow
            },1000)
        }
        
    })
 

}





initflow()