console.show();

var merge = require("./travel/merge.js");
console.log("成功加载组件 merge")

var gold = require("./travel/gold.js");
console.log("成功加载组件 glod")

var offline = require("./travel/offline.js");
console.log("成功加载组件 offline")

var launchApp = require("./travel/launch.js");
console.log("成功加载组件 launch")

var city = require("./travel/city.js");
console.log("成功加载组件 city")

var error = console.error;
var appName = "com.jiayouya.travel";
var friendName = "rap";
var tryTime=0
 function handlerError(msg){

   error.apply(console,arguments);

  if(msg=="未知页面"||msg=="流程未走完"||"服务启动慢或者未启动"){
    if(tryTime>15){
        error.apply("已经尝试重启15次");
        return;
    }
    console.log("唤醒屏幕")
    device.wakeUpIfNeeded();
    //检查app是否还在
    if (currentPackage() != app) {
        console.log("当前不在app内，服务重新启动");
        run();
    }else{
        var close = id("iv_close").findOne(3000);
        var close2 = id("tt_video_ad_close_layout").findOne(5000)
        var btn = id("btn").findOne(1000);
        var button2 = id("button2").findOne(1000);

        if(close){
            console.log("发现未知关闭按钮,服务重新启动");
            close.click();
            run();
        }else if(close2){
            console.log("发现未知广告关闭按钮,服务重新启动");
            close2.click();
            run();
        }else if(btn){
            console.log("发现未知确认按钮,服务重新启动");
            btn.click();
            run();
        }else if(button2){
            console.log("发现未知系统取消按钮,服务重新启动");
            button2.click();
            run();
        }
    }
  }

}

function toArray(p){
    if(p==null){
        return [];
    }
    return Object.prototype.toString.call(p)=="[object Array]"?p:[p]
}

var runstack=[];
var currentHandler;
//添加到队列中
app.g=function(handler,args,timeout,context){
    var time = new Date();
    args = toArray(p)
    timeout = time.getTime()+(timeout||0);
        
    runstack.push({
        args:args,
        handler:handler,
        timeout:timeout,
        context:context
    })
}

//循环执行
function loop(){
    try{
        if(!currentHandler || currentHandler.status=="finish"){
            currentHandler = runstack.shift();
        }
        var time= new Date().getTime();
        if(time>currentHandler.timeout){
            currentHandler.handler.apply(currentHandler.context,currentHandler.args);
            currentHandler.status="finish";
        }
    }catch(e){
        runstack = [];
        currentHandler=null;
        handlerError(e.message);
    }


    setTimeout(function(){
        loop();
    },34);

}



function run(){

    console.log("保持手机常亮")

    device.keepScreenOn();

    app.g(launchApp,appName,0)
    
    app.g(offline,friendName,0)

    app.g(gold,null,0)
    
    app.g(city,null,0)
    
    app.g(merge,null,0);

}


run();
loop();


