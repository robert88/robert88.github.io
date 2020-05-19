默认情况下babel会将全局的this转为vode0

原因：

在babel中，如果您正在使用任何模块转换（默认情况下在预设中使用），则所有文件均被视为模块，而不是脚本，
并且模块的顶级this为undefined。
如果您的函数需要自己的函数this，
则应将其写为function() {}表达式或声明。
但是如果您尝试使用它this来访问全局变量，
它将无法正常工作。Babel会将任何输入代码写为严格模式代码，除非您禁用模块转换。

安装方法：npm install babel-plugin-transform-remove-strict-mode

修改 .babelrc文件 如下：

{
    "plugins": ["transform-remove-strict-mode"]
}
