//更新对象
var time = new Date.getTime();
http.get("https://robert88.github.io//autojs/demo/travel.js?ver="+time, {}, function(res, err){
    if(err){
        toast("更新失败")
        return;
    }
    var content = res.body.string();
    files.write("./travel.js", content);
});