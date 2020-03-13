

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
(观看视频无效)
Up()模拟按下物理按键上。 体现在有键盘的方式。如输入框，光标的上下左右移动
 Down()模拟按下物理按键下。  体现在有键盘的方式。
Left()模拟按下物理按键左。 体现在有键盘的方式。
Right()模拟按下物理按键右 体现在有键盘的方式。
Text(text)要输入的文字 当前必须是输入控件
对比setText和setInput，Text必须当前focus的是输入控件，它不会去找控件

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
