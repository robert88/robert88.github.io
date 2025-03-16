/**
 * 领现金
 */

//检查今日签到弹框
exports.getlingxianjin = function () {
    const dialogUiClassName = "com.lynx.tasm.behavior.ui.LynxFlattenUI"

    const allUi = className(dialogUiClassName).find()

    if (allUi.size() > 300) {
        l("当前是领现金页面" + allUi.size())
        return allUi
    }
    l("当前不是领现金页面")
    return null

}

exports.golingxianjin = function () {
    const allUi = getlingxianjin()
    if (allUi) {

    }
} 