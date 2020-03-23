
/*
  1、论证promise和callback性能问题
*/
var manyPromise=[];
var len =100000;
var count=100000
var oldTime= +new Date();
for(var i=0;i<len;i++){
  manyPromise.push(new Promise((resove)=>{setTimeout(()=>{resove();count--},0)}))
}
Promise.all(manyPromise).then(()=>{
console.log(new Date()-oldTime)
})
//1435ms

//callback
var len = 100000
var count=len
var oldTime= +new Date();
function loop(){
  if(count<0){
    console.log(new Date()-oldTime)
  }
  count--;
}
for(var i=0;i<len;i++){
  setTimeout(()=>{loop()},0)
}
//205839ms

//看来还是promise快一些
