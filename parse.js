function parseAttrs(attrArr, obj) {
  if (attrArr) {
    var attrs = {};
    attrArr.forEach(function(attrStr) {
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
    noteAttr.forEach(function(note, idx) {
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
    orgArr.forEach(function(item) {
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

function toTree(allSplit, reg, reg1, serial, arrSplit, obj) {
  obj = obj || {};
  item = allSplit.shift();

  reg.lastIndex = 0;
  reg1.lastIndex = 0;
  if (reg.test(item)) { //匹配到
    if (obj.start != null) {
      obj.children = [];
      toTree(allSplit, reg, reg1, obj.children, arrSplit, {})
    } else {
      obj.start = allSplit.length + 1;
      serial.push(obj);
      arrSplit.push(obj);
    }
  } else if (reg1.test(item)) {
    obj.end = allSplit.length + 1;
    obj = {}
  }
  if (allSplit.length) {
    toTree(allSplit, reg, reg1, serial, arrSplit, obj);
  }

}
module.exports = function(tag, fileData, single, treeFlag) {
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
    toTree(Object.assign([], allSplit), reg, reg1, treeSplit, arrSplit)

    if (treeFlag) {
      tags = arrSplit
    } else {
      arrSplit.forEach(code => {
        create(code,arr,allSplit)
      })
    }

  } else {
    console.error("tag must is word");
  }
  return arr;
}

function create(){

    var obj = { attrs: {} };
    var len = allSplit.length;
    obj.startTag = allSplit[len - code.start];
    if (!single) {
      if (code.end != null) {
        obj.innerHTML = allSplit.slice(len - code.start+1, code.start - code.end-1).join("")
        obj.template = replaceNote(allSplit.slice(len - code.start, code.start - code.end).join(""), noteInfo[1])
      } else {
        obj.innerHTML = allSplit.slice(len - code.start+1).join("")
        obj.template =allSplit.slice(len - code.start).join("")
      }
      obj.endTag = "</" + tag + ">";
    }else{
        obj.template = obj.startTag
    }
    var attrStrOrg = obj.startTag.replace(new RegExp(attrRegStr, "i"), "$1")
    var attrArr1 = attrStrOrg.match(/[^='"\s]+="[^"]+"/g) || [];
    var attrArr2 = attrStrOrg.match(/[^='"\s]+='[^']+'/g) || [];
    var attrArr3 = attrStrOrg.match(/[^='"\s]+=[^"'\s]+/g) || [];
    var attrArr = attrArr1.concat(attrArr2).concat(attrArr3);
    parseAttrs(attrArr, obj);
    arr.push(obj);
}