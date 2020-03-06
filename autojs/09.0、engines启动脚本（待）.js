



.execScript(name, script[, config])
// 返回ScriptExecution对象
// name {string} 要运行的脚本名称。这个名称和文件名称无关，只是在任务管理中显示的名称。
// script {string} 要运行的脚本内容。
// config {Object} 运行配置项
// delay {number} 延迟执行的毫秒数，默认为0
// loopTimes {number} 循环运行次数，默认为1。0为无限循环。
// interval {number} 循环运行时两次运行之间的时间间隔，默认为0
// path {Array} | {string} 指定脚本运行的目录。这些路径会用于require时寻找模块文件。

//用字符串来编写脚本非常不方便，可以结合 Function.toString()的方法来执行特定函数:

.execScriptFile(path[, config])
// 返回ScriptExecution对象
// path {string} 要运行的脚本路径。
// config {Object} 运行配置项同上

.execAutoFile(path[, config])
// 返回ScriptExecution对象
// path {string} 要运行的录制文件路径。
// config {Object} 运行配置项同上

.stopAll()
// 停止所有正在运行的脚本。包括当前脚本自身。
.stopAllAndToast()
// 会显示显示停止的脚本数量

.myEngine()
// 返回当前脚本的脚本引擎对象(ScriptEngine)
// [v4.1.0新增] 特别的，该对象可以通过execArgv来获取他的运行参数，包括外部参数、intent等
.all()
// 返回当前所有正在运行的脚本的脚本引擎ScriptEngine的数组。

ScriptExecution对象
.getEngine()//返回执行该脚本的脚本引擎对象(ScriptEngine)
.getConfig()//返回该脚本的运行配置(ScriptConfig)

ScriptEngine对象
.forceStop()//停止脚本引擎的执行。
.cwd() //返回脚本执行的路径。
.getSource() //返回当前脚本引擎正在执行的脚本对象。返回 ScriptSource
.emit(eventName[, ...args]) //向该脚本引擎发送一个事件,这个可以跨脚本传递事件//需要保持脚本运行setInterval(()=>{}, 1000);

ScriptConfig对象，同上config

