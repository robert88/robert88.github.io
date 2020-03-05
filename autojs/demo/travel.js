
console.show()
//全部dog
var rate = device.width/1080
var s = 35 * rate
var w = 210 * rate
var h = 210 * rate

function findDogSpace(){
    var alldogs = []
    var x0 = 65 * rate;
    var y0 = 740 * rate

    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            alldogs.push({x:w/2 + x0 +(s+w)*i,y:h/2 + y0 +(s+h)*j})
        }
    }
    return alldogs
}

function getDogInfo(dog){

    var left = dog.x;
    var top = dog.y;
    var right = dog.x+(s+w)/2
    var right = dog.y+(s+h)/2
   var hasDog = boundsInside(left, top, right, buttom).find()
   if(hasDog.size()==1){
    return {level:hasDog.get(0).text(),x:dog.x,y:dog.y}
   }else{
    return null
   }
}



function swiperDog() {
    var dogspace = findDogSpace();
    var dogs = {}
    dogspace.forEach(function(dog){
        dog = getDogInfo(dog);
        if(dog){
            dogs[dog.level] = dogs[dog.level]||[]
            dogs[dog.level].push(dog);
        }
    })

    swiperingDog( dogs);
}
//是否有两只相同的狗

function swiperingDog( dogs) {
    var a,b,len,addLevel,j;
    for(var level in dogs){
         len = dogs[level].length;
        if(len>1){
             addLevel = Math.floor(parseInt(level,10)+1)+"";
            dogs[addLevel] = dogs[addLevel] ||[];
            for(var j=0;j<len/2;j++){
                 a = dogs[level].shift();
                 b = dogs[level].shift();
                dogs[addLevel].push({level:addLevel,x:a.x,y:a.y}) 
                swipe(b.x,b.y,a.x,a.y,1000);
                sleep(2000)
            }
            return swiperingDog( dogs);
        }
    }
  }
