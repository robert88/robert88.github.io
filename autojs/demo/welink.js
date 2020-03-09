//welink自动打卡

var workBtn = id("tab_icon").className("android.widget.RedioButton").text("业务").findOne(2000)

if(workBtn){
  console.log("点击业务按钮")
  workBtn.click();
  sleep(1000);
  var  tv_app_name = id("tv_app_name").text("健康打卡轻应用").findOne(2000);
  if(tv_app_name){
    console.log("点击进入健康打卡")
    tv_app_name.parent().click();
    sleep(5000);
    var workPlace = className("android.view.View").text("WorkPlace").findOne(2000);
    if(workPlace){
      console.log("点击下拉选择")
     click(100, workPlace.bounds().buttom-10);
     
    }else{
  console.error("没有工作地点选择项")
   }
  }else{
  console.error("没有找到打卡入口")
  }
}else{
  console.error("未知界面")
}

function checkWorkEnd(){
  var history =  className("android.view.View").text("打卡记录").findOne(3000);
  if(history){
    history.click();
    sleep(3000);
    var curD = new Date()
    var cur  = className("android.view.View").textContains(curD.getFullYear()+"-"+(curD.getMonth()+1)+"-"+curD.getDate()).findOne(3000);
    if(cur){
      console.log("")
    }
  }else{
    console.error("未知界面");
  }
  
}
