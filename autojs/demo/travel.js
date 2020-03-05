function findDogSpace(){
    try{
        
   var reatshop = id("iv_shop").findOne(1000).bounds()
   var reatadd = id("iv_shop").findOne(1000).bounds()

   var daoigrad = bounds(0,reatshop.bottom,device.width,reatadd.top).find()
        console.log(daoigrad)
    }catch(e){
          console.log(e.trace) 
    }

}
findDogSpace()
