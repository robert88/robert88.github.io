console.show()
setScreenMetrics(720, 1560);
let dianCount = 0
let dianTime;
function loop() {
    clearTimeout(dianTime)
    dianCount++;
    console.clear()
    console.log(dianCount)
    const random = Math.random()
    click(186 + 5 * random, 456 + 5 * random);// pk的时候
    dianTime = setTimeout(() => {
        loop()
    }, 200 + 300 * random)
}


