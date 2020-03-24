//调试
if(global&&!global.app){
  require("./debugfix.js")
}


var toArray = require("./toArray");
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
app.g = function(handler, args, timeout, condition, name) {
  var handlerObj = app.createG(handler, args, timeout, condition, name);
  g_handler.push(handlerObj);
  console.log("<<=", name);
  return handlerObj;
}

//添加到队列中
app.createG = function(handler, args, timeout, condition, name) {
  var time = new Date();
  args = toArray(args)
  timeout = time.getTime() + (timeout || 0);

  var handlerObj = {
    args: args,
    condition: condition,
    handler: handler,
    timeout: timeout,
    name: name
  }
  return handlerObj;
}

//释放队列
function releaseStack(s) {
  var time = new Date().getTime();
  for (var i = 0; i < s.length; i++) {
    var h = s[i];
    var condition = h.condition();
    if (time > h.timeout && condition && running == null) {
      s.splice(i, 1);
      running = h;
      running.conditionResult = condition;
      console.info("=>>", running.name);
      break;
    }
  }
  h = null;
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

    if (running) {

      running.handler( running.args, running.conditionResult,running);

      //需要等待执行
      if (running.waitFor) {
        g_handler.unshift(running.waitFor);

      }

      //执行完毕
      running = null;
    }

  } catch (error) {
    error = error || {};
    console.error("任务", running && running.name, "发生错误",error.stack);
    releaseVar()
    app.e.emit("systemError", error);
  }

  timer = setTimeout(function() {
    loop();
  }, 34);

}

loop();

// function a1(a,b){
//   console.log("a1",a,b)
// }
// function a2(){
//   console.log("a2")
// }
// function a3(){
//   console.log("a3")
//   throw Error("高兴")
// }
// function a4(){
//   console.log("a4")

// }

// app.g(a1,[1,2],0,function(){return true},"a1handler")
// app.g(a2,[1,2],0,function(){return true},"a2handler")
// app.g(a3,[1,2],0,function(){return true},"a3handler")
// app.g(a4,[1,2],0,function(){return true},"a4handler")

//text查询
function selectWithText(klassName,text,context){
  if(context){
   return  context.className(klassName).text(text).findOne(1000);
  }
  return  className(klassName).text(text).findOne(1000);
}
//包含文字查询
function selectWithContains(klassName,context){
  if(context){
   return  context.className(klassName).text(text).findOne(1000);
  }
  return  className(klassName).text(text).findOne(1000);
}
//不同的处理分支
function findWidth(text,context,flag){
  var handler;
  if(flag){
    handler = selectWithText;
  }else{
    handler = selectWithContains;
  }
  var textObj = handler.call(null,"android.widget.TextView",text,context)
    if(!textObj){
      textObj = handler.call(null,"android.view.View",text,context)
      if(!textObj){
        textObj = handler.call(null,"android.view.TextView",text,context)
      }
    }
    return textObj;
}

module.exports = {
  t:function(text,flag,context){
    if(flag===true){
     return findWidth(text,context,flag)
    }else if(flag===false){
      return findWidth(text,context,flag)
    }else{
      return findWidth(text,context,true)||findWidth(text,context,false)
    }
  }
}
