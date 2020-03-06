//更新对象
var time = new Date.getTime();

function r(name){
    http.get("https://robert88.github.io//autojs/demo/"+name+".js?ver="+time, {}, function(res, err){
        if(err){
            toast("更新失败")
            return;
        }
        var content = res.body.string();
        
        if(files.exists("./"+name+".js")){
           files.remove("./"+name+".js")
        }
        files.write("./"+name+".js", content);
    });
}

r("travel")
r("travelmerge")
r("test")
