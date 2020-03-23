


//welink自动打卡
require("./lib/work.js")

console.show()

var launchApp =  require("./lib/launch.js")
var pageTo =  require("./lib/pageTo.js")

//
function offwork(args,condition){
  var local = id("ft").className("android.view.TextView").text("你已再打卡范围内").findOne(3000)
    if(local){
      condition.parent().click();
      console.log("下班打卡成功")
    }else{
      console.log("不在打卡区");
    }
}
//
function onwork(args,condition){
  var local = id("ft").className("android.view.TextView").text("你已再打卡范围内").findOne(3000)
  if(local){
    condition.parent().click();
    console.log("上班打卡成功")
  }else{
    console.log("不在打卡区");
  }
}
//
function ontime(){
  var curret = new Date()
  var h = curret.getHours();
  var m = curret.getMinutes()/60;
  var t = h+m;
    //早上7点30-8点30
    if (t <= 8.5 && t>7.5) {
     return  "onwork";
      //晚上
    } else if (t > 18) {
      return "offwork";
    } 
}

var workstatus;
app.g(launchApp,"com.tencent.wework",0,function(){
  workstatus = ontime();
  return workstatus&&(currentPackage() != "com.tencent.wework")
},"2-启动企业微信")

app.g(pageTo,null,0,function(){
  return  workstatus&&(id("d0j").className("android.view.TextView").text("工作台").findOne(3000));
},"3-导向工作台页面")

app.g(pageTo,null,0,function(){
  var textObj = id("ajo").className("android.view.TextView").text("打卡").findOne(3000)
  return workstatus&&(textObj&&textObj.parent());
},"4-导向打卡页面")



 app.g(onwork,null,0,function(){
  return workstatus=="onwork"&&(id("acs").className("android.view.TextView").text("下班打卡").findOne(3000))
},"toCheckSummit-上班打卡")

app.g(offwork,null,0,function(){
  return workstatus=="offwork"&&(id("acs").className("android.view.TextView").text("下班打卡").findOne(3000))
},"toCheckSummit-下班打卡")

