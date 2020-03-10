

http.get(url[, options, callback])
url {string} 请求的URL地址，需要以"http://"或"https://"开头。如果url没有以"http://"开头，则默认为"http://"。

var r = http.get("www.baidu.com");
log("code = " + r.statusCode);
log("html = " + r.body.string());

可以
console.show();
http.get("www.baidu.com", {}, function(res, err){
    if(err){
        console.error(err);
        return;
    }
    log("code = " + res.statusCode);
    log("html = " + res.body.string());
});

//bug 
//不要去定义ajaxcount，目前发现这个变量在系统中会不确性

http.post(url, data[, options, callback])
//具体含义取决于options.contentType的值。默认为"application/x-www-form-urlencoded"(表单提交), 这种方式是JQuery的ajax函数的默认方式。

http.postJson(url[, data, options, callback])//并在HTTP头部信息中把"Content-Type"属性置为"application/json"
http.postMultipart(url, files[, options, callback])
向目标地址发起类型为multipart/form-data的请求（通常用于文件上传等), 其中files参数是{name1: value1, name2: value2, ...}的键值对，value的格式可以是以下几种情况：

string
文件类型，即open()返回的类型
[fileName, filePath]
[fileName, mimeType, filePath]

如果使用格式2的同时要附带非文件参数"appId=abcdefghijk"，则为:

var res = http.postMultipart(url, {
    appId: "adcdefghijk",
    file: open("/sdcard/1.txt")
});

http.request(url[, options, callback])
选项options可以包含以下属性：

headers {Object} 键值对形式的HTTP头部信息。有关HTTP头部信息，参见菜鸟教程：HTTP响应头信息。
method {string} HTTP请求方法。包括"GET", "POST", "PUT", "DELET", "PATCH"。
contentType {string} HTTP头部信息中的"Content-Type", 表示HTTP请求的内容类型。例如"text/plain", "application/json"。更多信息参见菜鸟教程：HTTP contentType。
body {string} | {Array} | {Function} HTTP请求的内容。可以是一个字符串，也可以是一个字节数组；或者是一个以BufferedSink为参数的函数。

Response
.statusCode
.statusMessage
.headers
.body
.request
.url
.method
