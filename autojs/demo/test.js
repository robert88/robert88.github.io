
setScreenMetrics(1080, 1920);
// setInterval(() => {
//     var button = id("button2").findOne(500)
//     if (button) {
//         toast("取消前往")
//         button.click()
//     }
// }, 1000);

//全部dog
var rate = device.width / 1080

var s = 35 * rate
var w = 210 * rate
var h = 210 * rate


function findDogSpace() {
    var alldogs = []
    var x0 = 65 * rate;
    var y0 = 740 * rate+(device.height-device.width*1920/1080)

    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 4; i++) {
            alldogs.push({ x: w / 2 + x0 + (s + w) * i, y: h / 2 + y0 + (s + h) * j })
        }
    }
    return alldogs
}
