
// console: 控制台。记录运行的日志、错误、信息等。
// 全局对象
// keys: 按键模拟。比如音量键、Home键模拟等。
//安卓7.0以上的触摸和手势模拟
//基于控件的操作
// device: 设备。获取设备屏幕宽高、系统版本等信息，控制设备音量、亮度等。
// events: 事件与监听。按键监听，通知监听，触摸监听等。
// http: HTTP。发送HTTP请求，例如GET, POST等。
// engines: 脚本引擎。用于启动其他脚本。
// files: 文件系统。文件创建、获取信息、读写。
// images, colors: 图片和图色处理。截图，剪切图片，找图找色，读取保存图片等。
// app: 应用。启动应用，卸载应用，使用应用查看、编辑文件、访问网页，发送应用间广播等。
// floaty: 悬浮窗。用于显示自定义的悬浮窗。
// shell: Shell命令。
// threads: 多线程支持。
// ui: UI界面。用于显示自定义的UI界面，和用户交互。
// 除此之外，Auto.js内置了对Promise。

//接下来我们将按这个顺序来学习

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




