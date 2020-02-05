$(function() {
  //兼容
  if (!Object.keys) {
    Object.keys = (function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable("toString"),
        dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ],
        dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (
          (typeof obj !== "object" && typeof obj !== "function") ||
          obj === null
        )
          throw new TypeError("Object.keys called on non-object");

        var result = [];

        for (var prop in obj) {
          if (hasOwnProperty.call(obj, prop)) result.push(prop);
        }

        if (hasDontEnumBug) {
          for (var i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i]))
              result.push(dontEnums[i]);
          }
        }
        return result;
      };
    })();
  }

  var winW = $(window).width();

  var gMap = $(".global-it-day-map");

  var tab1 = gMap.find(".tab1");
  var tab2 = gMap.find(".tab2");
  var tab3 = gMap.find(".tab3");

  //html数据填充 tab1 tab2
  var appendTab = function(data, dom) {
    if (!!data || !!dom) {} else {
      console.log("data dom 为空！");
      return false;
    }
    var html = [];
    // 清空对象里面的值
    $.each(data, function(i, v) {
      // console.log(v);
      html.push(
        "<li class='li' data-key='" + v + "'><span>" + v + "</span></li>"
      );
    });
    dom.append(html);
  };

  //html数据填充 tab3-1
  var appendTab1 = function(data, dom) {
    if (!!data || !!dom) {} else {
      console.log("data dom 为空！");
      return false;
    }
    var html = "";
    // 清空对象里面的值
    // ul.empty();
    var region = data["By Region"];
    var country = data["country"];
    $.each(region, function(i, v) {
      html +=
        "<div class='posi' data-key='" +
        i +
        "'><img src='../images/" +
        i +
        ".jpg' class='img' data-key='' alt=''><ul class='ul'>";
      $.each(v, function(i, v) {
        var v = country[v];
        html +=
          "<li class='animate " +
          v.className +
          " " +
          v.status +
          "'><span class='point'><em></em></span><p class='p'>" +
          v.name +
          "</p><div class='bubble'><div class='box'><h5 class='title'>" +
          v.name +
          "</h5><div class='div clearfix'>";
        $.each(v.time, function(i, v) {
          html += "" +
            inset(
              "<span class='col2'>" + v.date.split('/')[2] + '/' + v.date.split('/')[1] + '/' + v.date.split('/')[0] + "</span>",
              " <a class='box-link' href='" + v.link + "' target='_blank'><span class='col2'>" + v.date.split('/')[2] + '/' + v.date.split('/')[1] + '/' + v.date.split('/')[0] + "</span></a>",
              v.link) + ""
        })
        "</div></div></li>";
      });
      html +=
        '</ul><div class="tips"><ul class="ul align-center"><li class="status1"><span class="point"></span><p>Ongoing Events</p></li><li class="status2"><span class="point"></span><p>Upcoming Events</p></li><li class="status3"><span class="point"></span><p>Past Events</p></li></ul></div></div>';
    });
    dom.append(html);
  };

  //html数据填充 tab3-2
  var appendTab2 = function(data, dom) {
    if (!!data || !!dom) {} else {
      console.log("data dom 为空！");
      return false;
    }
    var html = "";
    var region = data["By Time"];
    var country = data["country"];
    $.each(region, function(i, v) {
      // console.log(i,v);
      var v = getSort(v);
      //月份
      html += "<ul class='ul posi clearfix' data-key='" + i + "'>";

      var length = Object.keys(v).length;
      var len = Math.ceil(length / 4);
      var j = 0,
        n = 0;
      $.each(v, function(i, v) {
        // console.log(i, v);
        //天数
        if (j == n * len) {
          n++;
          html += "<li class='li col" + (v.date.split('/')[2] == undefined ? "1" : "4") + "'>";
        }
        html +=
          "<dl class='dl clearfix'>" +
          "<dt class='dt fw6'>" +
          "<p class='p'>" +
          (v.date.split('/')[2] == undefined ? '' : v.date.split('/')[2] + '/') + v.date.split('/')[1] + '/' + v.date.split('/')[0] +
          "</p>" +
          "</dt>";
        $.each(v.region, function(i, v) {
          html +=
            "<dd class='dd'>" +
            inset(
              "<span>" + v.country + "</span>",
              "<a href='" + v.link + "'  target='_blank'>" + v.country + "</a>",
              v.link) +
            "</dd>";
        });
        html += "</dl>";

        if (j == n * len - 1) {
          html += "</li>";
        }

        j++;
      });
      html += "</li></ul>";
    });
    dom.append(html);
    $('ul.posi').each(function() {
      if ($(this).find('li').length > 0) {} else {
        $(this).html('<span class="no-plan">No plan </span>')
      }
    })
  };

  function inset(str, str2, url) {
    if (url == 'javascript:void(0);') {
      return str;
    } else {
      return str2;
    }
  }

  function getSort(timeData) {
    var newArr = [];
    for (var p1 in timeData) {
      var o = {};
      if (timeData.hasOwnProperty(p1)) {
        o.date = p1;
        o.region = timeData[p1]
        newArr.push(o);
      }
    }

    // console.log('111',newArr, newArr[0].date);
    // console.log('222', newArr.sort(compares('date'))) 
    return newArr.sort(compares('date'));
  }

  function compares(property) {
    return function(a, b) {

      var value1 = parseInt(a[property].split('/')[2]);
      var value2 = parseInt(b[property].split('/')[2]);
      return value1 - value2;
    }
  }


  //时间对比 时间排序数组 增加状态
  var timeCompare = function(timer, that, data) {
    // console.log(timer, that)
    if (!timer || !that || !data) {
      return false;
    }
    var time = new Date();
    var year = time.getFullYear();
    var mon = time.getMonth();
    var day = time.getDate();
    var status = "status";

    $.each(timer, function(i, val) {
      var v = val.date.split("/");
      var y = v[0];
      var m = v[1] - 1;
      var d = v[2];

      //按月份添加至data数据
      var time = data["By Time"];
      var month = data["month"];
      if (!(typeof time[month[m]] === "object")) {
        time[month[m]] = {};
      }
      var mm = time[month[m]];
      if (!Array.isArray(mm[val.date])) {
        mm[val.date] = [];
      }

      mm[val.date].push({ "country": that.name, "link": val.link });

      //判断状态

      if (year == y) {
        if (mon == m) {
          status = "status1";
          that["status"] = status;
          return;
          if (day == d) {
            //正在进行
            status = "status1";
            that["status"] = status;
            return false;
          } else if (day < d) {
            //准备
            status = "status2";
          } else if (day > d) {
            //结束
            status = "status3";
          }
        } else if (mon < m) {
          //准备
          status = "status2";
        } else if (mon > m) {
          //结束
          status = "status3";
        }
      } else if (year < y) {
        //准备
        status = "status2";
      } else if (year > y) {
        //结束
        status = "status3";
      }
      that["status"] = status;
    });
  };

  //地区排序数组
  var regionCompare = function(region, that, data) {
    if (!region || !that || !data) {
      return false;
    }
    var r = data["By Region"];
    if (!Array.isArray(r[region])) {
      r[region] = [];
    }
    r[region].push(that["name"]);
  };

  $.ajax({
    type: "get",
    dataType: "json",
    url: "../js/map.json",
    success: function(msg) {
      //数据
      var data = msg;
      var country = data["country"]; //国家信息
      var option = data["option"]; // tab1的HTML
      var month = data["month"]; //月份
      var time = data["By Time"]; //按时间排列
      var region = data["By Region"]; //按地区排列

      $.each(country, function(i, v) {
        var d = v["time"];
        var r = v["region"];
        var that = this;
        timeCompare(d, that, data);
        regionCompare(r, that, data);
      });
      var mon = Object.keys(time);
      var reg = Object.keys(region);
      appendTab(option, tab1.find("ul"));
      appendTab(mon, tab2.find(".time"));
      appendTab(reg, tab2.find(".region"));
      appendTab2(data, tab3.find(".time"));
      appendTab1(data, tab3.find(".region"));
      getMbWidth($('ul.time'));

      cilckTab(tab1, month);
      cilckTab(tab2, month);
      setTimeout(function() {
        tab1.find("[data-key='By Time']").trigger("click");
      });
    },
    error: function() {
      alert("Request failed.");
    },
    complete: function(msg) {},
  });

  var addRemove = function(dom) {
    dom
      .siblings()
      .removeClass("current")
      .end()
      .addClass("current");
  };

  var cilckTab = function(panrent, data) {
    var data = data || "",
      index;
    panrent.on("click", ".li", function() {
      var $this = $(this);
      var key = $this.data("key");
      addRemove($this);
      var chirld1 = tab2.find("[data-key='" + key + "']");
      addRemove(chirld1);
      if (key == "By Time") {
        var today = new Date();
        var mon = today.getMonth();
        index = "[data-key='" + data[mon] + "']";
        getMbWidth($('ul.time'));
      } else if (key == "By Region") {
        index = ":first";
        if (winW < 960) {
          getMbWidth($('ul.region'));
        }
      }

      var chirld2 = chirld1.find(index);
      addRemove(chirld2);
      var key2 = chirld2.data("key");
      var chirld3 = tab3.find("[data-key='" + key + "']");
      var chirld4 = chirld3.find("[data-key='" + key2 + "']");
      addRemove(chirld3);
      addRemove(chirld4);
    });
  };

  function getMbWidth(obj) {
    if (obj.find('li').length > 0) {
      if (winW < 960) {
        var aLi = obj.find('li');
        var allW = 0;
        aLi.each(function() {
          allW += $(this).outerWidth() + 10;
        })
        obj.css('width', (allW + 20) + 'px');
      }
    }
  }

  function dbClick(url) {
    if (url == "javscript:;") {
      return false;
    } else {
      window.open(url);
    }
  }

});