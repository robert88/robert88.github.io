var alldogs = []

function findDogSpace(){
    var rate = divice.width/1080
    var x0 = 65 * rate;
    var s = 35 * rate
    var y0 = 735 * rate
    var w = 210 * rate
    var h = 210 * rate

    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            alldogs.push({x:w/2 + x0 +(s+w)*i,y:h/2 + y0 +(s+h)*j})
        }
    }
 
}
findDogSpace()
console.show()
    var left,top,right,buttom;
    for(var k=0;k<12;k++){
       left=alldogs[k].x,top=alldogs[k].y,right=alldogs[k].x+115,buttom=alldogs[k].y+115;
       swipe(left, top, right, buttom,1000)
       var in =  boundsInside(left, top, right, buttom).find()
       var con = boundsContains(left, top, right, buttom).find()
       console.log(in.size())
       console.log(con.size())
       sleep(3000)
    }
