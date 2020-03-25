module.exports = {
    writeData:function(path,content){
        try{
            console.log("写入数据",path)
            files.ensureDir(path)
            files.write(path, content);
        }catch(e){
            console.error("写文件",path,"失败",e.stack)
        }

    }
}