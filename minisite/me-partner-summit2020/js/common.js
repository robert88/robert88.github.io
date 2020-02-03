$(function(){

    var win_w = $(window).width();

	// header
    var scrollTop;
    function FixedNav(){
        scrollTop = $(document).scrollTop();
        if(scrollTop > 0){
            $(".all-container").addClass("min"); 
        }else{
            $(".all-container").removeClass("min");  
        }
    }
    $(window).scroll(function(){
        FixedNav();
    })
    
    // 单个banner自定义属性
    if($(".banner-box").length > 0){
        if(win_w > 768){
            var imgsrc = $(".banner-box img.bannerData").attr("data-pcsrc");
            $(".banner-box img.bannerData").attr("src",imgsrc);
        }else{
            var wapimgsrc = $(".banner-box img.bannerData").attr("data-wapsrc");
            $(".banner-box img.bannerData").attr("src",wapimgsrc);
        }
    }


    //日程切换
    if($('.agenda1').length > 0){
        $('.agenda1-btn li').on('click',function(){
            var _this = $(this);
            var key = _this.index();
            _this.addClass('current').siblings('li').removeClass('current');
            $('.agenda1-con .agenda1-block').eq(key).show().siblings('.agenda1-block').hide();
        });
        baseLib.contourFun(".agenda1-btn","li","p");
    }


    // 购买咨询
    $(".js_ss_back_top").click(function(){
        $("html,body").animate({"scrollTop":0});
    });
    $(window).scroll(function(){
        var htmlScrollT = $(document).scrollTop();
        if(htmlScrollT>100){
            $(".js_back_top").fadeIn();
        }else{
            $(".js_back_top").fadeOut();
        }
    });

    if(win_w > 768){
        $('.back-topt span').mouseenter(function(){
            var dataWidth = $(this).attr('data-width');
            $(this).animate({'width':dataWidth});
            $("js_ss_back_top").css("position","fixed");
        })
        .mouseleave(function(){
            $(this).animate({'width':48});
        })
    }else{
        $(".back-topt span:last-child").on("click",function(){ 
            if($(".wap-top-more.on").length > 0){
                $(".wap-top-more").removeClass("on");
                $(".back-topt span:first-child,.back-topt span:nth-child(2)").removeClass("on");
            }else{
                $(".wap-top-more").addClass("on");
                $(".back-topt span:first-child,.back-topt span:nth-child(2)").addClass("on");
            }  
        });
        //点击置顶按钮展开合上
        $(".js_ss_back_top").on("click",function(){
            if($(".wap-top-more.on").length > 0){
                $(".wap-top-more").removeClass("on");
                $(".back-topt span:first-child,.back-topt span:nth-child(2)").removeClass("on");
            }
        });
    }


    //注册页导航跳转到首页对应位置
    if($("#index").length <= 0){
        $(".anchor li").on("click",function(){
            var key = $(this).index();//index()搜索匹配的元素，并返回相应元素的索引值，从0开始计数————意思是点击第几个li
            $.cookie("anchors",key,{ expires: 1, path: '/' });//创建一个cookie并设置 cookie的有效路径
            location.href = 'index.html' + window.location.search;//点击后跳转到对应页面
        });
    }else{//否则，也就是存在id,就是首页执行以下
        if($.cookie('anchors') != null){//如果存在cookie
            var value = $.cookie('anchors');//获取cookie值，也就是第几个li,从0开始
            var toplength = $(".content"+value).offset().top;//第几个li对应第几个带有content几的内容获取到置顶的距离
            $('html,body').animate({'scrollTop' : toplength - 50},200);//整个页面向上移动这个距离到顶部
            $.cookie('anchors', null,{ expires: 1, path: '/' });//删除cookie,设置有效路径能快速方便找到这个cookie
            //如果不删除cookie,反复点击时会出错 
        }
    }


    

    




});