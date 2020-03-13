console.show();

console.log("保持手机常亮")
device.keepScreenOn();


function toArray(p) {
  if (p == null) {
    return [];
  }
  return Object.prototype.toString.call(p) == "[object Array]" ? p : [p]
}

var runstack1 = [];
var runstack2 = [];
var currentHandler1;
var currentHandler2;
var gameover = false;
//事件
app.e = events.emitter();

//添加到队列中
app.g = function(handler, p, timeout, context) {
  var time = new Date();
  args = toArray(p)
  timeout = time.getTime() + (timeout || 0);

  runstack1.push({
    args: args,
    handler: handler,
    timeout: timeout,
    context: context
  })
}
//添加到子队列中
app.g2 = function(handler, p, timeout, context) {
  var time = new Date();
  args = toArray(p)
  timeout = time.getTime() + (timeout || 0);

  runstack2.push({
    args: args,
    handler: handler,
    timeout: timeout,
    context: context
  })
}

//释放队列
function releaseStack(s,h){

    if (s.length && !h) {
        h = s.shift();
      }
      if (h) {
        var time = new Date().getTime();
        if (time > h.timeout) {
          h.handler.apply(h.context, h.args);
          h = null;
        }
      }
      return h
}

//循环执行
function loop() {

  try {

    if (gameover && runstack1.length == 0 && runstack2.length == 0) {
      console.log("循环结束")
      console.log("取消手机常亮")
      device.cancelKeepingAwake();
      return;
    }
    //当前子队列有执行 runstack2 ->runstack1
    if (runstack2.length) {
        currentHandler2 = releaseStack(runstack2,currentHandler2);
    } else {
        currentHandler1 = releaseStack(runstack1,currentHandler1);
    }
  } catch (e) {
    e = e || {}
    runstack1 = [];
    runstack2 = [];
    currentHandler2 = null;
    currentHandler1 = null;
    app.e.emit("systemError", e.message, e.stack);
  }

  setTimeout(function() {
    loop();
  }, 34);

}

loop();

app.e.on("gameover", function(msg) {
  gameover = true;
});


require("./travel/merge.js");
console.log("成功加载组件 merge")
