require("../lib/common.js")
setScreenMetrics(720, 1560);
let dianCount = 0
lp(() => {
    dianCount++;
    console.clear()
    l(dianCount)
    const randomw = Math.random()
    const randomh = Math.random()
    click(186 + 10 * randomw, 456 + 10 * randomh);// pk的时候
}, 500)