var toArray = require("./toArray");
var g_handler = [];
var timer;
var running = null;
var g_overFlag = false;
app.e = new events.emitter();

//停止执行
app.e.on("gameKill", function(msg) {
  g_overFlag = true;
});

//添加到队列中
app.g = function(handler, args, timeout, condition, context) {
 var handlerObj= app.createG(handler, args, timeout, condition, context);
  g_handler.push(handlerObj);
}

//添加到队列中
app.createG = function(handler, args, timeout, condition, context) {
  var time = new Date();
  args = toArray(args)
  timeout = time.getTime() + (timeout || 0);
  var handlerObj = {
    args: args,
    condition: condition,
    handler: handler,
    timeout: timeout,
    context: context
  }
  return handlerObj;
}

//释放队列
function releaseStack(s) {
  var time = new Date().getTime();
  for (var i = 0; i < s.length; i++) {
    var h = s[i];
    if (time > h.timeout && h.condition() && running == null) {
      s.splice(i, 1);
      running = h;
      break;
    }
  }
}

//释放变量
function releaseVar() {
  g_handler = [];
  running = null;
}

//循环执行
function loop() {

  try {
    if (g_overFlag) {
      console.log("loop stop")
      releaseVar();
      clearTimeout(timer);
      return;
    }

    releaseStack(g_handler);

    if (running ) {

      running.handler.apply(running, running.args);
      
      //需要等待执行
      if (running.waitFor) {
        g_handler.unshift(running.waitFor);

      }

      //执行完毕
      running = null;
    }

  } catch (error) {
    error = error || {}
    releaseVar()
    app.e.emit("systemError", error);
  }

  timer = setTimeout(function() {
    loop();
  }, 34);

}

loop();
