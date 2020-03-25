function pageTo(args,condition){
    console.log("点击进入页面");
    if(!condition.clickable()){
         console.log("当前条件不可点击");
        if(!args[0]&&condition.parent().clickable()){
            console.log("当前条件父类可点击");
            condition.parent().click()
        }else{
           console.log("点击中间点");
            var bd = condition.bounds();
            click((bd.left+bd.right)/2,(bd.top+bd.bottom)/2);
        }
    }else{
       console.log("当前条件可点击");
      condition.click();
    }
    sleep(2000);
  }

  module.exports = pageTo
