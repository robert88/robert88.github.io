/**
 * 今日签到领现金
 */

//检查今日签到弹框
exports.checkIsJinriqiandaoDialog = function () {
    const dialogUiClassName = "com.lynx.tasm.behavior.ui.LynxFlattenUI"
    const textClassName = "com.lynx.tasm.behavior.ui.text.FlattenUIText"
    const notDialogStr = "当前不是今日签到领现金弹框"
    
    //签到最外面的弹框
    const dialogUi = className(dialogUiClassName).descContains("今日签到").find()
    const dsize = dialogUi.size()
    l("今日签到" + dsize)
    if (!dsize) {
        l("当前不是今日签到领现金弹框")
        return
    }

    const getMoneyButtom = className(dialogUiClassName).text("领取今日现金").find()
    const tomorrowButtom = className(dialogUiClassName).text("明日再来").find()
    const msize = getMoneyButtom.size()
    const tmsize = tomorrowButtom.size()
    l("点击领取按钮" + msize)
    l("明日再来" + tmsize)
    if (!msize && !tmsize) {
        l(notDialogStr)
        return
    }

    const topSubTitle = className(textClassName).text("今日签到必得现金红包").find()
    const tstsize = topSubTitle.size()
    l("头部小标题" + tstsize)
    if (!tstsize) {
        l(notDialogStr)
        return
    }

    const tips = className(textClassName).text("待领取为最高值，收益以实发为准").find()
    const tpsize = tips.size()
    l("领取按钮下的说明" + tpsize)
    if (!tpsize) {
        l(notDialogStr)
        return
    }

    const topTips = className(textClassName).text("现金可微信提现").find()
    const ttsize = topTips.size()
    l("领取左上角标题" + ttsize)
    if (!ttsize) {
        l(notDialogStr)
        return
    }

    const keyWorkDay = className(textClassName).descContains("第").find()
    const ksize = keyWorkDay.size()
    l("关键字 ‘第’" + ksize)
    if (!ksize) {
        l(notDialogStr)
        return
    }

    const [left, top, right, bottom] = [323, 1146, 397, 1220]
    const closeButtom = className(dialogUiClassName).boundsContains(left + 10, top + 10, right - 10, bottom - 10).find()
    l("关闭按钮" + closeButtom.size())

    l("确认为今日签到弹框")
    if (msize) {
        return getMoneyButtom
    } else {
        return tomorrowButtom
    }

}

exports.toQiandaolxj = function () {

}