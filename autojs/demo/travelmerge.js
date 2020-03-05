console.show()
//全部dog
var rate = device.width / 1080
var s = 35 * rate
var w = 210 * rate
var h = 210 * rate

function findDogSpace() {
    var alldogs = []
    var x0 = 65 * rate;
    var y0 = 740 * rate

    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            alldogs.push({ x: w / 2 + x0 + (s + w) * i, y: h / 2 + y0 + (s + h) * j })
        }
    }
    return alldogs
}

function getDogInfo(dog) {

    var left = dog.x;
    var top = dog.y;
    var right = dog.x + (s + w) / 2
    var buttom = dog.y + (s + h) / 2
    var hasDog = boundsInside(left, top, right, buttom).find()
    if (hasDog.size() == 1) {
        return { level: hasDog.get(0).text(), x: dog.x, y: dog.y }
    } else {
        return null
    }
}



function swiperDog() {
    var dogspace = findDogSpace();
    var dogs = {}
    dogspace.forEach(function (dog) {
        dog = getDogInfo(dog);
        if (dog) {
            if (dogs[dog.level]) {
                mergeDog(dogs, dog)
            } else {
                dogs[dog.level] = Object.assign({}, dog)
            }
        }
    })
}

//是否有两只相同的狗
function mergeDog(dogs, dog) {
    var mgdog = dogs[dog.level];
    swipe(mgdog.x, mgdog.y, dog.x, dog.y, 300);
    sleep(800)
    dogs[dog.level] = null;
    var addLevel = Math.floor(parseInt(dog.level, 10) + 1);
    if (dogs[addLevel]) {
        mergeDog(dogs, { level: addLevel, x: dog.x, y: dog.y })
    } else {
        dogs[addLevel] = { level: addLevel, x: dog.x, y: dog.y }
    }
}



function buyDog(dogspace) {
    for (var i = 0; i < dogspace.length; i++) {
        var dog = getDogInfo(dogspace[i]);
        if (!dog) {
            id("lyt_add").findOne(1000).click()
        }
    }
}

swiperDog();

toast("已合并全部狗")
sleep(1000)
toast("已合并全部狗")

buyDog(findDogSpace())


toast("买完狗了")
sleep(1000)
toast("买完狗了")

setInterval(() => {
    var button = id("button2").findOne(500)
    if (button) {
        button.click()
    }
}, 1000);


