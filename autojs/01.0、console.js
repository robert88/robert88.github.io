



console.log("log")

log,warn,info,error,verbose,clear,show,hide,,assert,time,timeEnd,trace,input,rawInput,setSize,setPosition,setGlobalLogConfig,print

log,warn,info,error,verbose这些都是颜色方面的不同的输出，print和log差不多，目前还不知道有啥区别

看看console.hide和show，这个会在当前的页面弹一个框，这个框可以改变尺寸，还可以最小化

接着看setSize,setPosition，设置的宽高最好不要超过这手机的宽高

可以使用device.width和device.height来获取

input ，rawInput在apk上不知道怎么用，但是如果调出来之后会把运行这个按钮置灰,需要等待一段时间



time和timeEnd
[v4.1.0新增]，我提供的链接的apk没有这个功能（在当前app里输入可以看到支持的api）
trace
[v4.1.0新增]
console.setGlobalLogConfig(config)
[v4.1.0新增]




