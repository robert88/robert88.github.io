
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


依赖无障碍服务的按键
back()//模拟按下返回键
home()模拟按下Home键。
powerDialog()弹出电源键菜单。（开关机键）
notifications()拉出通知栏。
quickSettings()显示快速设置(下拉通知栏到底)。
recents()显示最近任务（按正方形键（home键旁边））
splitScreen()分屏。返回是否执行成功//系统自身功能的支持。（有些应用无法在分屏模式下运行）
VolumeUp()按下音量上键。执行一次调节，第一次是调出弹框
VolumeDown() 按键音量下键
Up()模拟按下物理按键上。 体现在有键盘的方式。如输入框，光标的上下左右移动
 Down()模拟按下物理按键下。  体现在有键盘的方式。
Left()模拟按下物理按键左。 体现在有键盘的方式。
Right()模拟按下物理按键右 体现在有键盘的方式。
Text(text)要输入的文字 当前必须是输入控件
KeyCode(code)

打开通信录
KEYCODE_CALL 5
KEYCODE_ENDCALL 6

0-9 》 7-16
* 17
# 18
a-z > 29-54
, 55
. 56

上下左右 57-60

ODE_TAB 61
KEYCODE_SPACE 62

KEYCODE_SYM 63 切换输入法

KEYCODE_ENTER 66
KEYCODE_DEL 67
` 68
- 69
[ 70
] 71 
\ 72
; 73
' 75
/ 76
@ 77

KEYCODE_HEADSETHOOK 79 播放音乐

+ 81

KEYCODE_MENU 82 右上角三个点

应该要root（未root测试）
Menu()模拟按下菜单键。 
OK()模拟按下物理按键确定。
