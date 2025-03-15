require("../lib/common.js")
setScreenMetrics(720, 1560);
let dianCount = 0
lp(() => {
    dianCount++;
    console.clear()
    l(dianCount)
    const random = Math.random()
    click(186 + 5 * random, 456 + 5 * random);// pk的时候
}, 500)