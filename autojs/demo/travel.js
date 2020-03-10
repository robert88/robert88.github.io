console.show();

console.log("保持手机常亮")
device.keepScreenOn();


function toArray(p){
    if(p==null){
        return [];
    }
    return Object.prototype.toString.call(p)=="[object Array]"?p:[p]
}

var runstack=[];
var currentHandler;
var gameover = false;
//事件
app.e = events.emitter();

//添加到队列中
app.g = function(handler,args,timeout,context){
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
    if(gameover&&runstack.length){
        console.log("循环结束")
        console.log("取消手机常亮")
        device.cancelKeepingAwake();
        return;
    }
    try{
        if(runstack.length && !currentHandler || currentHandler.status=="finish"){
            currentHandler = runstack.shift();
        }
        if(currentHandler){
            var time= new Date().getTime();
            if(time>currentHandler.timeout){
                currentHandler.handler.apply(currentHandler.context,currentHandler.args);
                currentHandler.status="finish";
            }
        }
    }catch(e){
        runstack = [];
        currentHandler=null;
        app.e.emit("systemError",e.message);
    }


    setTimeout(function(){
        loop();
    },34);

}

loop();

app.e.on("gameover",function(msg){
    gameover = true;
});


 require("./travel/merge.js");
console.log("成功加载组件 merge")
