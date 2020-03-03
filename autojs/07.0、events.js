  
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

events本身是一个EventEmiiter, 但内置了一些事件、包括按键事件、通知事件、Toast事件等。

需要注意的是，事件的处理是单线程的，并且仍然在原线程执行，
如果脚本主体或者其他事件处理中有耗时操作、轮询等，
则事件将无法得到及时处理（会进入事件队列等待脚本主体或其他事件处理完成才执行）

.emitter()
返回一个新的EventEmitter。这个EventEmitter没有内置任何事件。
.observeKey()
启用按键监听，例如音量键、Home键。按键监听使用无障碍服务实现
只有这个函数成功执行后, onKeyDown, onKeyUp等按键事件的监听才有效

.onKeyDown ,.onKeyUp(keyName, listener),.onceKeyDown(keyName, listener),.onceKeyUp(keyName, listener)
.removeAllKeyDownListeners(keyName),
.removeAllKeyUpListeners(keyName)

//启用按键监听
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function(event){
    toast("音量上键被按下了");
});


.setKeyInterceptionEnabled([key, ]enabled)
设置按键屏蔽是否启用。所谓按键屏蔽指的是
只要有一个脚本屏蔽了某个按键，该按键便会被屏蔽；当脚本退出时，会自动解除所有按键屏蔽

.observeTouch()
启用屏幕触摸监听。（需要root权限）
.setTouchEventTimeout(timeout)
timeout {number} 两个触摸事件的最小间隔。
例如间隔为10毫秒的话，前一个触摸事件发生并被注册的监听器处理后，至少要过10毫秒才能分发和处理下一个触摸事件，这10毫秒之间的触摸将会被忽略。
.getTouchEventTimeout()
返回触摸事件的最小时间间隔。
.onTouch(listener)

//启用触摸监听
events.observeTouch();
.removeAllTouchListeners()
//注册触摸监听器
events.onTouch(function(p){
    //触摸事件发生时, 打印出触摸的点的坐标
    log(p.x + ", " + p.y);
});

通过on
events.on

events.observeKey();
events.on("key", function(keyCode, event){
    //处理按键事件
});

其中监听器的参数KeyCode包括：

keys.home 主页键
keys.back 返回键
keys.menu 菜单键
keys.volume_up 音量上键
keys.volume_down 音量下键
'key_down'
'key_up'
 'exit`
 
 Toast，Notification();和on，obverse都可以组合成api，也可以提供on的key，都小写
 
 Notification
通知对象，可以获取通知详情，包括通知标题、内容、发出通知的包名、时间等，也可以对通知进行操作，比如点击、删除。
.number 通知数量
.when 通知发出时间的时间戳，
.getPackageName() 获取发出通知的应用包名
.getTitle() 获取通知的标题。
.getText() 获取通知的内容。
.click() 点击该通知。
.delete() 删除该通知。

KeyEvent对象
.getAction() 返回事件的动作
KeyEvent.ACTION_DOWN 按下事件
KeyEvent.ACTION_UP 弹起事件

.getKeyCode()，
返回按键的键值。包括：
.keyCodeToString(keyCode)转为字符串 "KEYCODE_HOME"

KeyEvent.KEYCODE_HOME 主页键
KeyEvent.KEYCODE_BACK 返回键
KeyEvent.KEYCODE_MENU 菜单键
KeyEvent.KEYCODE_VOLUME_UP 音量上键
KeyEvent.KEYCODE_VOLUME_DOWN 音量下键

.getEventTime() 返回事件发生的时间戳。
.getDownTime()

