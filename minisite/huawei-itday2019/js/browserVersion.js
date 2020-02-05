function Base(){};

// 检测浏览器的版本
Base.prototype.browserVersion = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

    if ((userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        var isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断移动端浏览器
        var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //判断移动端浏览器
        if (isIos) {
            return "ios";
        }
        if (isAndroid) {
            return "android";
        }
    } else {
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isIE11 =  userAgent.indexOf("rv:11") > -1;
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1; //判断Chrome浏览器
            
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            switch (fIEVersion) {
                case 6:
                    return "6";
                case 7:
                    return "7";
                case 8:
                    return "8";
                case 9:
                    return "9";
                case 10:
                    return "10";
                case 11:
                    return "11";
                default:
                    return "0"; //IE版本过低
            }
        }
        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        if (isEdge) {
            return "Edge";
        }
        if (isIE11) {
            return '11'
        }
    }
}

var baseLib2 = new Base();