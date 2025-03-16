require("./common.js")
const currTime = new Date().getTime()

/** 请求github的js文件 */
function getGithubBy(remoteUrl, localUrl) {
    l("发送请求" + remoteUrl)
    localUrl = localUrl || remoteUrl
    try {
        const res = http.get("https://github.com/robert88/robert88.github.io/file-list/master/autojs/demo/" + remoteUrl + ".js?ver=" + currTime)
        l("请求成功" + res.statusCode)
        writeRemoteToLocal(localUrl, res)
    } catch (error) {
        l("请求失败" + remoteUrl)
    }
}

/** 将服务器文件写入本地 */
function writeRemoteToLocal(localUrl, res) {
    const content = res.body.string()
    const localFile = "./" + localUrl + ".js"
    if (files.exists(localFile)) {
        l("本地存在" + localUrl)
        if (files.read(localFile) === content) {
            return l("更新结束：304")
        }
        l("覆盖")
    } else {
        l("本地不存在" + localUrl)
        l("新建")
    }
    l("写入数据" + localUrl)
    files.ensureDir(localFile)
    files.write(localFile, content)
    l("更新成功" + localFile)
}

module.exports = getGithubBy