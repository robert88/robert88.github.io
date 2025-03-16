/**
 * 今日签到
 */

//检查今日签到弹框
exports.checkIsJinriqiandaoDialog = function () {
    const dialogUiClassName = "com.lynx.tasm.behavior.ui.LynxFlattenUI"
    const textClassName = "com.lynx.tasm.behavior.ui.text.FlattenUIText"
    const dialogUi = className(dialogUiClassName).descContains("今日签到").find()
    const getMoneyButtom = className(dialogUiClassName).text("领取今日现金").find()
    const tomorrowButtom = className(dialogUiClassName).text("明日再来").find()
    const topSubTitle = className(textClassName).text("今日签到必得现金红包").find()
    const tips = className(textClassName).text("待领取为最高值，收益以实发为准").find()
    const topTips = className(textClassName).text("现金可微信提现").find()
    const keyWorkDay = className(textClassName).descContains("第").find()
    const [left, top, right, bottom] = [323, 1146, 397, 1220]
    const closeButtom = className(dialogUiClassName).boundsContains(left + 10, top + 10, right - 10, bottom - 10).find()
    l("弹框" + dialogUi.size())
    l("点击领取按钮" + getMoneyButtom.size())
    l("点击领取按钮" + tomorrowButtom.size())
    l("头部小标题" + topSubTitle.size())
    l("领取按钮下的说明" + tips.size())
    l("领取左上角标题" + topTips.size())
    l("关键字 ‘第’" + keyWorkDay.size())
    l("关闭按钮" + keyWorkDay.size())
    l("确认为今日签到弹框")
}

