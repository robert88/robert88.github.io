$(function () {
    var winW = $(window).width();
    var winH = $(window).height();
    var conW = $("footer").width() - 90;
    var SboxScrollT = [];
    var timeOff = 1;
    var HW = {
        scrollHead: function () {
            var scrollT = $(document).scrollTop();
            if (scrollT > 0) {
                $("#all-container").addClass("min");
                // $('.logo img').attr('src','../images/logo_min.png');
            } else {
                $("#all-container").removeClass("min");
                // $('.logo img').attr('src','../images/logo.png');
            }
        },
        boxScrollT: function () {
            $('.content').each(function () {
                SboxScrollT.push($(this).offset().top);
            });
        },
        scrollFastNav: function () {
            if (timeOff) {
                timeOff = 0;
                var timer = setTimeout(function () {
                    var scrollT = $(document).scrollTop() + 80;
                    for (var i = 0; i < SboxScrollT.length; i++) {
                        if (i == SboxScrollT.length - 1) {
                            if (SboxScrollT[i] < scrollT) {
                                $('.pc-nav li').eq(i).addClass("current").siblings().removeClass("current");
                            }
                        } else {
                            if (SboxScrollT[i] < scrollT && scrollT < SboxScrollT[i + 1]) {
                                $('.pc-nav li').eq(i).addClass("current").siblings().removeClass("current");
                            }
                        }

                    };
                    timeOff = 1;
                }, 500);
            };
        },
        fastNav: function () {
            $(this).addClass("current").siblings().removeClass("current");
            var charClass = "content" + $(this).index();
            if ($("." + charClass).offset()) {
                var $scrollT = $("." + charClass).offset().top - 50;
            };
            $('html,body').animate({
                'scrollTop': $scrollT
            });
        },
        wapNav: function () {
            var wap_navbtn = $('.wap_navbtn'),
                wap_nav = $('#wap-nav');
            $(".wap_navbtn span").addClass("change");
            $('.wap_navbtn,#wap-nav').on('click', function () {
                if (!$(this).hasClass('close')) {
                    wap_navbtn.addClass('close');
                    wap_nav.addClass('close');
                    wap_nav.animate({
                        'top': '0%'
                    });
                    $('#wap-nav > div').css('display', 'block');
                    $(".wap_navbtn span").removeClass("change");
                } else {
                    wap_navbtn.removeClass('close');
                    wap_nav.removeClass('close');
                    wap_nav.animate({
                        'top': '-100%'
                    });
                    $('#wap-nav > div').css('display', 'none');
                    $(".wap_navbtn span").addClass("change");
                };
            });
        },
        dblclick: function () {
            if (winW < 1024) {
                document.documentElement.addEventListener('dblclick', function (e) {
                    e.preventDefault();
                });
            }
        },
        setContactW: function () {
            winW = $(window).width();
            if (winW > 768) {
                $(".footer-box").width('auto');
                var contactW = 0,
                    num = 0,
                    conW = $(".footer-box").outerWidth();
                $(".js_contact_us ul").each(function () {
                    $(this).width('auto');
                    var W = $(this).outerWidth(true);
                    contactW += $(this).outerWidth(true);
                    W > num ? num = W : num;
                })
                if (contactW > conW) {
                    $(".footer-box").width(num + 10);
                    $('.contact-us ul').width(num + 10)
                    contactW = 0;
                } else {
                    $(".footer-box").width(contactW + 10);
                    num = 0;
                }
            } else {
                $(".footer-box").width("auto");
                $('.contact-us ul').width("auto");
            }
        },
        backTop: function () {
            //返回顶部
            $(".js_back_top").click(function () {
                $("html,body").animate({
                    "scrollTop": 0
                });
            })
            $(window).scroll(function () {
                var htmlScrollT = $(document).scrollTop();
                if (htmlScrollT > 100) {
                    $(".js_back_top").fadeIn();
                } else {
                    $(".js_back_top").fadeOut();
                }
            })
        },
        setBgAndPosition: function () {
            var num = 0,
                index = 0;
            $('.content').each(function () {
                if (!$(this).hasClass('none')) {
                    $(this).addClass('content' + index + '');
                };
                index++;
                if (!$(this).hasClass('special')) {
                    num++;
                    num = num % 2;
                    if (num == 0) {
                        // $(this).css('background' , '#f8f9fc')
                    };
                };
            });
        },
        setBlockCenter: function (Object) {
            var obj = $(Object);
            obj.each(function () {
                var len = $(this).find('li').length;
                if (len == 1) {
                    $(this).addClass('col-1');
                } else if (len == 2) {
                    $(this).addClass('col-2');
                } else if (len == 3) {
                    $(this).addClass('col-3');
                } else if (len == 4) {
                    $(this).addClass('col-4');
                } else if (len == 5) {
                    $(this).addClass('col-5');
                } else if (len == 6) {
                    $(this).addClass('col-6');
                };
            })
        },
        setHeight: function (obj, obj2, num) {
            var This = $(obj),
                oList = This.find(obj2);
            if (winW > num) {
                This.each(function () {
                    var _this = $(this),
                        oList = _this.find(obj2),
                        oList_len = oList.length,
                        oBox_w = _this.outerWidth(true),
                        oList_w = oList.width(),
                        oColumn_len = Math.floor(oBox_w / oList_w),
                        oRow_len = Math.ceil(oList_len / oColumn_len),
                        oList_H = 0,
                        oList_obj = null;
                    oList.height('auto');
                    for (var i = 0; i < oRow_len; i++) {
                        for (var j = i * oColumn_len; j < oColumn_len * (i + 1); j++) {
                            oList.eq(j).addClass('oList_obj');
                            var H = oList.eq(j).height();
                            H > oList_H ? oList_H = H : oList_H;
                            oList_obj = $('.oList_obj');
                        }
                        oList_obj.height(oList_H).removeClass('oList_obj');
                        oList_H = 0;
                    }
                });

            } else {
                oList.height('auto');
            }
        },
        setHeight2: function (obj, obj2) {
            var obj = $(obj),
                obj2 = $(obj2);
            obj2.height(obj.height());
        },
        setHeight3: function (obj) {
            var This = $(obj);
            var oList_len = This.length,
                oList_H = 0;
            This.height('auto');
            for (var i = 0; i < oList_len; i++) {
                var H = This.eq(i).height();
                H > oList_H ? oList_H = H : oList_H;
                This.height(oList_H);
            }
        },
        browserVersion: function () {
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
                var isIE11 = userAgent.indexOf("rv:11") > -1;
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
    }


    //获取每一个块的高度
    HW.boxScrollT();
    HW.wapNav();
    HW.dblclick();
    HW.setBgAndPosition(); //设置content索引
    HW.setContactW(); //设置底部footer宽度自适应

    $(window).resize(function () {
        var windowW = $(window).width();
        if (windowW != winW) {
            //获取每一个块的高度
            HW.boxScrollT();
            winW = windowW;
            HW.setContactW(); //设置底部footer宽度自适应
        };
    });

    //顶部滚动时改变高度
    if (winW > 992) {
        $(window).bind("scroll", HW.scrollHead);
    }

    //pc端，导航定位
    $("#pc-nav li").bind("click", HW.fastNav);

    //wap端，导航定位
    $("#wap-nav li").bind("click", HW.fastNav);

    //加载条
    $(".loader").fadeOut();

    /**
     * 功能：空校验
     */
    function checkCookieEmpty(value) {
        value = $.trim(value);
        return value != null && value != "undefined" && value != "" && value != "\"\"" && value != "null"
    }

    //注册页导航跳转到首页对应位置
    if ($("#index").length <= 0) {
        $(".anchor li").on("click", function () {
            var key = $(this).index(); //index()搜索匹配的元素，并返回相应元素的索引值，从0开始计数————意思是点击第几个li
            $.cookie("anchors", key, {
                expires: 1,
                path: '/'
            }); //创建一个cookie并设置 cookie的有效路径
            var action = $(this).parents(".anchor").data("action") || "index.html";
            location.href = action + window.location.search; //点击后跳转到对应页面
        });
    } else { //否则，也就是存在id,就是首页执行以下
        if (checkCookieEmpty($.cookie('anchors'))) { //如果存在cookie
            var value = $.cookie('anchors'); //获取cookie值，也就是第几个li,从0开始
            $("#pc-nav li").eq(value).click();
            $.cookie('anchors', null, {
                expires: 1,
                path: '/'
            }); //删除cookie,设置有效路径能快速方便找到这个cookie
            //如果不删除cookie,反复点击时会出错
        }
    }



    var browserVersion = Number(HW.browserVersion());
    if (browserVersion > 8) {
        var css = 'h2.title-color{color:#3ea3f6;background-image:none;} .global-it-day-map .con .tab1 ul li span,.global-it-day-map .con .tab1 ul li.current span{padding-top:8px;}'
        $("head").append("<style>" + css + "</style>");
    };
})