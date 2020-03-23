function pageTo(args,condition){
    console.log("点击进入页面");
    if(!condition.clickable()){
      var bd = condition.bounds();
      click((bd.left+bd.right)/2,(bd.top+bd.bottom)/2);
    }else{
      condition.click();
    }
    sleep(2000);
  }

  module.exports = pageTo