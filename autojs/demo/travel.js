function findDogSpace(){
    try{
        console.show()
   var reatshop = id("iv_shop").findOne(1000).bounds()
   var reatadd = id("iv_shop").findOne(1000).bounds()

   var daoigrad = bounds(0,reatshop.bottom,device.width,reatadd.top).find()
   console.log(daoigrad.size())
        
        if(daoigrad.empty()){
            toast("找到啦");
        }else{
            toast("没找到╭(╯^╰)╮");
        }
    }catch(e){
          console.log(e.trace) 
    }

}
findDogSpace()
