//更新对象
var time = new Date().getTime();

function r(name){
    http.get("https://robert88.github.io//autojs/demo/"+name+".js?ver="+time, {}, function(res, err){
        if(err){
            sleep(1000)
            toast("更新失败")
            return;
        }
        var content = res.body.string();
        
        if(files.exists("./"+name+".js")){
            if(files.read("./"+name+".js")==content){
                sleep(1000)
                return  toast("服务器代码未变动"+"./"+name+".js")
            }
            
           files.remove("./"+name+".js")
        }
        files.write("./"+name+".js", content);
        toast("更新成功"+"./"+name+".js")
        sleep(1000)
    });
}

r("travel")
r("travelmerge")
r("test")
