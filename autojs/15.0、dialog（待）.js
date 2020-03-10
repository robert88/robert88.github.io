dialog
.alert(title[, content, callback])
.confirm(title[, content, callback])

.prompt(title[, prefill, callback])
.rawInput(title[, prefill, callback])
都是输入性的弹框

.input(title[, prefill, callback])
该函数和rawInput的区别在于，会把输入的字符串用eval计算一遍再返回，返回的可能不是字符串。

.select(title, items, callback)
items {Array} 对话框的选项列表，是一个字符串数组。
显示一个带有选项列表的对话框，等待用户选择

单选
.singleChoice(title, items[, index, callback])
显示一个单选列表对话框，等待用户选择，返回用户选择的选项索引(0 ~ item.length - 1)。如果用户取消了选择，返回-1。

//多选
.multiChoice(title, items[, indices, callback])

dialogs.build(properties)
properties {Object} 对话框属性，用于配置对话框。
选项properties可供配置的项目为:

title {string} 对话框标题
titleColor {string} | {number} 对话框标题的颜色
buttonRippleColor {string} | {number} 对话框按钮的波纹效果颜色
icon {string} | {Image} 对话框的图标，是一个URL或者图片对象
content {string} 对话框文字内容
contentColor{string} | {number} 对话框文字内容的颜色
contentLineSpacing{number} 对话框文字内容的行高倍数，1.0为一倍行高
items {Array} 对话框列表的选项
itemsColor {string} | {number} 对话框列表的选项的文字颜色
itemsSelectMode {string} 对话框列表的选项选择模式，可以为:
select 普通选择模式
single 单选模式
multi 多选模式
itemsSelectedIndex {number} | {Array} 对话框列表中预先选中的项目索引，如果是单选模式为一个索引；多选模式则为数组
positive {string} 对话框确定按钮的文字内容(最右边按钮)
positiveColor {string} | {number} 对话框确定按钮的文字颜色(最右边按钮)
neutral {string} 对话框中立按钮的文字内容(最左边按钮)
neutralColor {string} | {number} 对话框中立按钮的文字颜色(最左边按钮)
negative {string} 对话框取消按钮的文字内容(确定按钮左边的按钮)
negativeColor {string} | {number} 对话框取消按钮的文字颜色(确定按钮左边的按钮)
checkBoxPrompt {string} 勾选框文字内容
checkBoxChecked {boolean} 勾选框是否勾选
progress {Object} 配置对话框进度条的对象：
max {number} 进度条的最大值，如果为-1则为无限循环的进度条
horizontal {boolean} 如果为true, 则对话框无限循环的进度条为水平进度条
showMinMax {boolean} 是否显示进度条的最大值和最小值
cancelable {boolean} 对话框是否可取消，如果为false，则对话框只能用代码手动取消
canceledOnTouchOutside {boolean} 对话框是否在点击对话框以外区域时自动取消，默认为true
inputHint {string} 对话框的输入框的输入提示
inputPrefill {string} 对话框输入框的默认输入内容
