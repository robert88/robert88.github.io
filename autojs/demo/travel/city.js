function clickCity(){
    var citybackground = id("progress_bar").findOne(1000)
    if(citybackground){
      console.log("点击城市轨迹按钮")
      citybackground.click()
      sleep(1000);
     var list =  id("list").findOne(1000);
     if(list){
       var children2 = list.children();
       if(children2&&children2.size()){
         console.log("找到list",children2.size())
        children2.forEach(child=>{
          child.children().forEach(child2=>{
            if(child.className()=="android.widget.ImageView"){
              var img =child;
            }
            if(img){
              console.log("找到子类图片")
              img.parent().click();
              sleep(1000);
              var close = id("iv_close").findOne(3000);
              var btn = id("btn").findOne(1000);
              close = close||btn;
              if(close){
                console.log("领取了城市轨迹礼物包")
                close.click();
                sleep(1000)
              }else{
                console.log("图片还没点亮")
              }
            }
          })
    
        })
       }else{
        console.log("没有找到城市轨迹list children")
       }
     
     }else{
        console.log("没有找到城市轨迹礼物包")
     }
     var backbtn = id("iv_back").findOne(1000);
     if(backbtn){
        backbtn.click();
        sleep(1000)
     }else{
       throw Error("城市轨迹不能返回")
     }
  
    }else{
      console.log("没有找到城市轨迹按钮")
    }
  
    console.info("-----city -end --")
   }
  
  
  
   module.exports = clickCity
