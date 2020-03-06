

对设备的设置，需要设置系统权限
WRITE_SETTINGS

.requestPermissions(permissions)

height，width设备屏幕分辨率宽度,高度

.buildId 修订版本号
.broad 设备的主板(?)型号
.brand 与产品或硬件相关的厂商品牌，如"Xiaomi", "Huawei"等。
.device 设备在工业设计中的名称。
.model 设备型号。
.product 整个产品的名称。
.bootloader 设备Bootloader的版本。
.hardware 设备的硬件名称(来自内核命令行或者/proc)。
.fingerprint 构建(build)的唯一标识码。
.serial 硬件序列号。


.sdkInt 安卓系统API版本。例如安卓4.4的sdkInt为19
.incremental svn版本号
.release Android系统版本号。例如"5.0", "7.1.1"。
.baseOS 基础系统型号
.securityPatch 安全补丁程序级别。
.codename 开发代号，例如发行版是"REL"。
.getIMEI() 返回设备的IMEI.
.getAndroidId() 返回设备的Android ID。
.getMacAddress() 返回设备的Mac地址。


.getBrightnessMode() 返回当前亮度模式，0为手动亮度，1为自动亮度。
.getBrightness() 返回当前的(手动)亮度。范围为0~255
.setBrightnessMode(mode)
.setBrightness(b) 设置当前手动亮度。如果当前是自动亮度模式，该函数不会影响屏幕的亮度。

//按键条件音量
VolumeDown()
VolumeUp()
.getMusicVolume()返回当前媒体音量。
.getNotificationVolume() 返回当前通知音量
.getAlarmVolume() 返回当前闹钟音量。
同理都有和Max，set组合的api 如.getMusicMaxVolume()，.setMusicVolume(volume)

.getBattery() 返回当前电量百分比
.isCharging() 返回设备是否正在充电。

.getTotalMem() 返回设备内存总量，
.getAvailMem() 返回设备当前可用的内存

.isScreenOn()
返回设备屏幕是否是亮着的。如果屏幕亮着，返回true; 否则返回false。
.wakeUp()
唤醒设备。包括唤醒设备CPU、屏幕等。可以用来点亮屏幕。
.wakeUpIfNeeded()
如果屏幕没有点亮，则唤醒设备。
.keepScreenOn([timeout])
timeout {number} 屏幕保持常亮的时间, 单位毫秒。如果不加此参数，则一直保持屏幕常亮。
.cancelKeepingAwake()来取消屏幕常亮。
.keepScreenDim([timeout])
timeout {number} 屏幕保持常亮的时间, 单位毫秒。如果不加此参数，则一直保持屏幕常亮。，但是可以降低亮度来节省电量

vibrate(millis)  millis {number} 震动时间，单位毫秒
.cancelVibration() 如果设备处于震动状态，则取消震动。
