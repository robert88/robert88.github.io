console.show()
global.l = console.log
global.d = device
global.e = events
global.st = setTimeout
global.lp = (callback, time) => {
    let loopTime
    const loop = () => {
        callback()
        loopTime = setTimeout(() => {
            loop()
        }, time - 300 + 300 & Math.random())
    }
    loop()
}