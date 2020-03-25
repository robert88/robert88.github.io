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

    if (time > h.timeout  && running == null) {
      var condition = h.condition();
      if(condition){
        s.splice(i, 1);
        running = h;
        running.conditionResult = condition;
        console.info("=>>", running.name);
        break;
      }
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



//text查询
function selectWithText(klassName,text,context){
  if(context){
   return  context.className(klassName).text(text).find();
  }
  return  className(klassName).text(text).find();
}
//包含文字查询
function selectWithContains(klassName,text,context){
  if(context){
   return  context.className(klassName).textContains(text).find();
  }
  return  className(klassName).textContains(text).find();
}
////开始
function selectWithStart(klassName,text,context){
    if(context){
   return  context.className(klassName).textStartsWith(text).find();
  }
  return  className(klassName).textStartsWith(text).find();

}
//不同的处理分支
function findWidth(text,context,handler){
  var textObj = handler.call(null,"android.widget.TextView",text,context)
    
    if(textObj.size()==0){
      textObj = handler.call(null,"android.view.View",text,context)
     if(textObj.size()){
        console.log(text+":find view.View")
        }
      if(!textObj.size()==0){
        textObj = handler.call(null,"android.view.TextView",text,context)
        if(textObj.size()){
        console.log(text+":find view.TextView")
        }
      }
    }else{
      console.log(text+":find widget.TextView")
    }
    return textObj;
}

module.exports = {
  t:function(text,flag,context){
    var list;
    if(flag==="contain"){
          list = findWidth(text,context,selectWithContains)
    }else if(flag==="start"){
          list = findWidth(text,context,selectWithStart)
    }else{
          list = findWidth(text,context,selectWithText)
    }
    if(list.size()==1){
      return list.get(0);
    }else{
      if(list.size()>1){
        console.warn("查找出来不止一个！")
      }
      return null;
    }
  }
}
