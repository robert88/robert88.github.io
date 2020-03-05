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

    for(var k=0;k<12;k++){
        click(alldogs[k].x,alldogs[k].y)
        sleep(3000)
    }
