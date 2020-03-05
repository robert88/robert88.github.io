var rate = device.width / 1080
var ratey = device.height / 1920
var s = 35 * rate
var sy = 35 * ratey
var w = 210 * rate
var h = 210 * ratey

function findDogSpace() {
    var alldogs = []
    var x0 = 65 * rate;
    var y0 = 740 * ratey

    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 4; i++) {
            alldogs.push({ x: w / 2 + x0 + (s + w) * i, y: h / 2 + y0 + (sy + h) * j })
        }
    }
    return alldogs
}
console.show()
console.log(device.width)
console.log(device.height)

findDogSpace().forEach(function (dog) {
    swipe(dog.x, dog.y, dog.x + (s + w) / 2,
        dog.y + (s + h) / 2, 1000)
    sleep(2000)
})