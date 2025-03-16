/**
 * 今日签到
 */

//检查今日签到弹框
exports.checkIsJinriqiandaoDialog = function ($ui, $text) {
    const dialogUiClassName = "com.lynx.tasm.behavior.ui.LynxFlattenUI"
    const textClassName = "com.lynx.tasm.behavior.ui.text.FlattenUIText"
    $ui = $ui || className(dialogUiClassName)
    $text = $text || className(textClassName)
    //签到最外面的弹框
    const dialogUi = $ui.descContains("今日签到").find()
    const dsize = dialogUi.size()
    l("弹框" + dsize)
    if (!dsize) {
        l("当前不是今日签到弹框")
        return
    }

    const getMoneyButtom = $ui.text("领取今日现金").find()
    const tomorrowButtom = $ui.text("明日再来").find()
    const msize = getMoneyButtom.size()
    const tmsize = tomorrowButtom.size()
    l("点击领取按钮" + msize)
    l("明日再来" + tmsize)
    if (!msize && !tmsize) {
        l("当前不是今日签到弹框")
        return
    }

    const topSubTitle = $text.text("今日签到必得现金红包").find()
    const tstsize = topSubTitle.size()
    l("头部小标题" + tstsize)
    if (!tstsize) {
        l("当前不是今日签到弹框")
        return
    }

    const tips = $text.text("待领取为最高值，收益以实发为准").find()
    const tpsize = tips.size()
    l("领取按钮下的说明" + tpsize)
    if (!tpsize) {
        l("当前不是今日签到弹框")
        return
    }

    const topTips = $text.text("现金可微信提现").find()
    const ttsize = topTips.size()
    l("领取左上角标题" + ttsize)
    if (!ttsize) {
        l("当前不是今日签到弹框")
        return
    }

    const keyWorkDay = $text.descContains("第").find()
    const ksize = keyWorkDay.size()
    l("关键字 ‘第’" + ksize)
    if (!ksize) {
        l("当前不是今日签到弹框")
        return
    }

    const [left, top, right, bottom] = [323, 1146, 397, 1220]
    const closeButtom = $ui.boundsContains(left + 10, top + 10, right - 10, bottom - 10).find()
    l("关闭按钮" + closeButtom.size())

    l("确认为今日签到弹框")
    if (msize) {
        return getMoneyButtom
    } else {
        return tomorrowButtom
    }

}

