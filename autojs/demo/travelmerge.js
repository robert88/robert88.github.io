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
}

//是否有两只相同的狗
function mergeDog(dogs, dog) {
    var mgdog = dogs[dog.level];
    console.log("移动开始")
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



function buyDog(dogspace,flow) {
    for (var i = 0; i < dogspace.length; i++) {
        var dog = getDogInfo(dogspace[i],800);
        console.log("买狗-获取位置"+i+((!!dog)?"有":"无")+"狗 等级:",dog&&dog.level)
        var add = id("lyt_add").findOne(1000)
        if (!dog) {
            if(add){
                add.click();
                sleep(2000)
            }else{
                var coin = className("android.widget.TextView").text("金币不足").findOne(1000)
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
                    if(num){
                        //异步的
                        lookAD(flow);
                        return;
                    }else{
                       toast("没有金币了，游戏结束")
                       id("iv_close").findOne(1000).click()
                       return false;
                    }
                }else{
                    toast("没有金币了，游戏结束")
                    id("iv_close").findOne(1000).click()
                    return false;
                }
            }
     
        }
    }
    flow()
}

var lookADTime=0
function lookAD(flow){
    sleep(5000)
    //有钱花
    var ad1 = id("tt_click_upper_non_content_layout").findOne(10000)
    if(ad1){
        clearTimeout(lookADTime)
        lookADTime = setTimeout(function(){
            lookAD(flow)
        },5000)
    }else{
       var addBtn = id("lyt_add").findOne(1000)
       var close =id("tt_video_ad_close_layout").findOne(1000)
      var close2 = id("iv_close").findOne(1000)
        if(!close&&!addBtn&!close2){
            clearTimeout(lookADTime)
            lookADTime = setTimeout(function(){
                lookAD(flow)
            },5000)
        }else{
            close.click()
        }
    }
    
}

function initflow(){

    console.log("脚本开始运行")

    swiperDog();

    console.info("已合并全部狗")

    
    var canBuy = buyDog(findDogSpace(),function(){
        initflow()
    })
    
    if(canBuy===false){
        toast("不会循环下去了")
    }else{
        console.info("买完狗了")
        initflow();
    }
    

}





initflow()