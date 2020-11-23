function parseAttrs(attrArr, obj) {
    if (attrArr) {
        var attrs = {};
        attrArr.forEach(function (attrStr) {
            var splitAttr = attrStr.split("=");
            var key = splitAttr[0].trim()
            if (key) {
                attrs[key] = splitAttr[1].trim().replace(/^'|^"|'$|"$/g, "");
                if (key == "src" || key == "href") {
                    attrs["params"] = attrs[key].split("?")[1];
                    attrs[key] = attrs[key].split("?")[0];
                }
            }
        });
        obj.attrs = attrs;
    }
}

//去掉注释
function getNoteArr(fileData) {

    var noteReg = /<!--[\u0000-\uFFFF]*?-->/gm;
    var noteAttr = fileData.match(noteReg);
    if (noteAttr) {
        noteAttr.forEach(function (note, idx) {
            fileData = fileData.replace(note, "<!--" + idx + "-->");
        })
    }
    return [fileData, noteAttr];
}
//还原注释
function replaceNote(innerHTML, noteAttr) {
    var reg = /<!--[\u0000-\uFFFF]*?-->/gm;
    var orgArr = innerHTML.match(reg);
    if (orgArr) {
        orgArr.forEach(function (item) {
            var index = item.replace(/<!--([\u0000-\uFFFF]*?)-->/gm, "$1") * 1 || 0;
            innerHTML = innerHTML.replace(item, noteAttr[index])
        })
    }
    return innerHTML;
}

//提取params和修正src
function parseSrc(obj, requireCode, importReg) {
    var src = requireCode.replace(importReg, "$1");
    src = src && src.trim().replace(/^'|^"|'$|"$/g, "") || "";
    obj.src = src.split("?")[0];
    obj.params = src.split("?")[1];
}

function toTree(len,allSplit, reg, reg1, serial, arrSplit, obj) {
    obj = obj || {};
    var item = allSplit.shift();

    reg.lastIndex = 0;
    reg1.lastIndex = 0;
    if (reg.test(item)) { //匹配到
        if (obj.start != null) {
            obj.children = [];
            var nextObj =  {isChildred:true};
            nextObj.start = len- allSplit.length-1 ;
            obj.children.push(obj);
            arrSplit.push(obj);
            toTree(len,allSplit, reg, reg1, obj.children, arrSplit,nextObj)
        } else {
            obj.start = len- allSplit.length-1 ;
            serial.push(obj);
            arrSplit.push(obj);
        }
    } else if (reg1.test(item)) {
        obj.end = len- allSplit.length-1 ;
        if(obj.isChildred){//闭合
            return;
        }
        obj = {};
       
    }
    if (allSplit.length) {
        toTree(len,allSplit, reg, reg1, serial, arrSplit, obj);
    }

}
module.exports = function (tag, fileData, single, treeFlag) {
    var arr = [];
    var regStr, attrRegStr, regStr1;
    if (single) {
        regStr = "(<" + tag + "[^>]*>)";
        attrRegStr = "<" + tag + "([^>]*)>";
    } else {
        regStr = "(<" + tag + "[^>]*>)";
        regStr1 = "(<\\/" + tag + ">)"
        attrRegStr = "<" + tag + "([^>]*)>([\\u0000-\\uFFFF]*?)<\\/" + tag + ">";
    }

    if (/^[\w-]+$/.test(tag)) {
        var reg = new RegExp(regStr, "gmi");
        var reg1 = new RegExp(regStr1, "gmi");

        var noteInfo = getNoteArr(fileData);

        fileData = noteInfo[0];

        var tags = fileData.split(reg);
        var allSplit = [];
        tags.forEach(item => {
            var split2 = item.split(reg1);
            allSplit = allSplit.concat(split2);
        });


        var treeSplit = [];
        var arrSplit = []
        toTree(allSplit.length,Object.assign([], allSplit), reg, reg1, treeSplit, arrSplit);

        if (treeFlag) {
            create( arr, allSplit, treeSplit,single,attrRegStr,noteInfo,tag);
        } else {
            create( arr, allSplit, arrSplit,single,attrRegStr,noteInfo,tag);
        }

    } else {
        console.error("tag must is word");
    }
    return arr;
}

function create( arr, allSplit, arrSplit,single,attrRegStr,noteInfo,tag) {
    arrSplit.forEach(code => {
        var obj = {
            attrs: {}
        };
        var len = allSplit.length;
        obj.startTag = allSplit[code.start];
        if (!single) {
            if (code.end != null) {
                obj.innerHTML = replaceNote(allSplit.slice(code.start + 1,  code.end ).join(""), noteInfo[1])
                obj.template = replaceNote(allSplit.slice( code.start,  code.end+1).join(""), noteInfo[1])
            } else {
                obj.innerHTML = replaceNote(allSplit.slice(code.start + 1).join(""), noteInfo[1])
                obj.template = replaceNote(allSplit.slice( code.start).join(""), noteInfo[1])
            }
            obj.endTag = "</" + tag + ">";
        } else {
            obj.template = obj.startTag
        }
        var attrStrOrg = obj.startTag.replace(new RegExp(attrRegStr, "i"), "$1")
        var attrArr1 = attrStrOrg.match(/[^='"\s]+="[^"]+"/g) || [];
        var attrArr2 = attrStrOrg.match(/[^='"\s]+='[^']+'/g) || [];
        var attrArr3 = attrStrOrg.match(/[^='"\s]+=[^"'\s]+/g) || [];
        var attrArr = attrArr1.concat(attrArr2).concat(attrArr3);
        parseAttrs(attrArr, obj);
        arr.push(obj);
        //树型结构
        if (arrSplit.children) {
            obj.children = [];
            //一定是闭合标签
            create( obj.children, allSplit, arrSplit.children,single,attrRegStr,noteInfo,tag)
        }
    })
}
