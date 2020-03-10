
console.show()

/*关闭声音*/
var maxCount=0;
function closeVolume(){
 maxCount++;
  if(maxCount<20){
    var currentVolume =  device.getMusicVolume();
    console.log("声音",currentVolume,"启动","VolumeDown");
    VolumeDown();
    if(currentVolume>0){
       closeVolume()
    }else{
      console.log("声音已关闭");
      maxCount=0
    }
  }else{
      console.log("声音关闭不了");
      maxCount=0
  }
  maxCount--
}
closeVolume()

