var g_handler = [];
var timer;
var running = null;
var g_overFlag = false;
app.e = events.emitter();

//停止执行
app.e.on("gameKill", function(msg) {
  g_overFlag = true;
});

//添加到队列中
app.g = function(handler, args, timeout, condition,context) {
  var time = new Date();
   args = toArray(args)
  timeout = time.getTime() + (timeout || 0);
  var handlerObj = {
    args: args,
    condition:condition
    handler: handler,
    timeout: timeout,
    context: context,
    status:"wait"
  }
  g_handler.push(handlerObj);
  return handlerObj;
}

//释放队列
function releaseStack(s,h){
  var time = new Date().getTime();
  for(var i=0;i<s.length;i++){
    var h = s[i];
    if (time > h.timeout && h.condition()&&running==null) {
        s.split(i,1);
        running = h;
        running.status="start";
        break;
    }
  }
}
//释放变量
function releaseVar(){
    g_handler = [];
    running = null;
    g_overFlag = false;
    clearTimeout(timer);
}

//循环执行
function loop() {

  try {
    if ( g_overFlag ) {
      console.log("loop stop")
      releaseVar()
      return;
    }

  releaseStack();
  
  if(running&&running.status=="start"){
    running.status="running";
    running.handler.apply(running,running.args);
    //需要等待执行
    if(running.waitFor){
      running = running.waitFor;
    }else{
    //执行完毕
      running = null;
    }
  }
  
  } catch (e) {
   e = e || {}
   running = null
  }

 timer = setTimeout(function() {
    loop();
  }, 34);

}

loop();
