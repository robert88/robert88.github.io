// ==S index.html topic zl 2017/02/22

window.console = window.console || { log: function() {} };
/**
 * 外部调用
 * */
var CAROU = function(options) {

    //默认参数
    var defaluts = {
        oCon: '.J-carousel-wrap', //最外层div
        ulWrap: '.J-carousel-ul-wrap', //最ul包裹
        oul: '.J-carousel-ul', //ul
        oList: '.J-carousel-li', //li
        oPrev: '.J-carousel-prev', //前按钮
        oNext: '.J-carousel-next', //后按钮
        oConPoint: '.J-carousel-oconpoint', //数字
        oPoint: '.J-carousel-oconpoint>span', //点点
        showNum: 1, //切换的数量
        showWidth: null, //不按子类的数量来切换，按指定宽度来切换
        showHeight: null,
        topic_index: 0, //当前播放index
        filterSize: null, //播放切换的尺寸
        initDefaultBefore: true,
        dir: "horizontal", //垂直还是水平
        oPointNum: false, //如果是数字的话。默认是关闭false
        pcMove: false,
        unlimited: false // 一屏显示一个的时候，是否无限轮播。默认无限轮播关闭
    };

    $(options && options.oCon || defaluts.oCon).each(function() {

        //防止重复初始化
        if ($(this).data("init")) {
            return;
        }
        new Carousel($(this), options, defaluts);
        $(this).data("init", true);
    })

}
/**
 * 构造器
 * */
var Carousel = function($target, options, defaluts) {

    if ($target.is(":hidden")) {
        console.log("target is hidden!");
    }

    var _this = this;

    // 获取对象，初始化参数
    _this.initOption($target, options, defaluts);

    _this.init();
    _this.initEvent();

    $target.on("resizeInit", function() {
        _this.init("resize")
    });
    Carousel.prototype.target.push($target);
};
/**
 * 获取对象，初始化参数函数
 * */
Carousel.prototype.initOption = function($target, options, defaluts) {

    this.opts = $.extend({}, defaluts, options);

    //外部对象
    this.oCon = $target;

    //ulwrap带overflow:hidden;的容器;
    this.ulWrap = this.oCon.find(this.opts.ulWrap);

    if (this.ulWrap.length == 0) {
        this.ulWrap = this.oCon.find(".carousel-ul-wrap"); //学习中心
        if (this.ulWrap.length == 0) {
            this.ulWrap = this.oCon;
        }
    }

    //当前切换值
    this.topic_per_index = this.topic_index = this.opts.topic_index || 0;
    this.li_point = 0;

    //list区
    this.oul = this.oCon.find(this.opts.oul);
    this.oList = this.oCon.find(this.opts.oList);

    //辅助切换
    this.oPrev = $("html").hasClass("LANG-sa")?this.oCon.find(this.opts.oNext):this.oCon.find(this.opts.oPrev);
    this.oNext = $("html").hasClass("LANG-sa")?this.oCon.find(this.opts.oPrev):this.oCon.find(this.opts.oNext);
    this.oConPoint = this.oCon.find(this.opts.oConPoint);
    this.oPoint = this.oCon.find(this.opts.oPoint);

}

/**
 * 初始化
 * */
Carousel.prototype.init = function(type) {
    if (this.opts.dir == "vertical") {
        if (type == "resize") {
            if (this.ulWrap.height() == this.con_h) {
                return;
            }
        }
    } else {
        if (type == "resize") {
            if (this.ulWrap.width() == this.con_w) {
                return;
            }
        }
    }

    if (this.opts.initDefaultBefore === true && this.screenShowNumFun() != 1 && this.opts.unlimited == false) {
        this.initDefaultBefore();
    }
    if (typeof this.opts.initBefore == "function" && this.opts.initBefore.call(this, this) === false) {
        return;
    }
    // 判断是横向轮播器还是纵向轮播器
    if (this.opts.dir == "vertical") {
        // 纵向
        this.initVertical(type);
    } else {
        // 横向
        this.initHorizontal(type);
    }
    if (this.opts.initDefaultAfter === true) {
        this.initDefaultAfter();
    }
    if (typeof this.opts.initCallback == "function") {
        this.opts.initCallback.call(this, this)
    }

}

/**
 * 获取切换的宽度
 * */
Carousel.prototype.getHorizontalSize = function() {

    if (typeof this.opts.filterSize == "function") {
        return this.opts.filterSize(this);
    }

    // 初始化
    var winW = $(window).width();
    var li_w = 0;
    // 根据不同尺寸显示不同数量
    if (this.opts.showNum == 4) {
        if (winW > 1366) {
            if (this.oList.length <= 3) {
                li_w = this.con_w / 3;
            } else {
                li_w = this.con_w / 4;
            }
        } else if (winW > 1024) {
            li_w = this.con_w / 3;
        } else if (winW > 560) {
            li_w = this.con_w / 2;
        } else {
            li_w = this.con_w / 1;
        }
    }else if (this.opts.showNum == 3) {
        if (winW > 1300) {
            li_w = this.con_w / 3;
        } else if (winW > 750) {
            li_w = this.con_w / 2;
        } else {
            li_w = this.con_w / 1;
        }
    }else if (this.opts.showNum == 2) {
        if (winW > 1024) {
            li_w = this.con_w / 2;
        } else {
            li_w = this.con_w / 1;
        }
    }else if (this.opts.showNum == 1) {
        li_w = this.con_w / 1;
    }else{
        li_w = this.con_w / this.opts.showNum;
    }
    return li_w;
}
/**
 *初始化宽度
 * */
Carousel.prototype.initWidth = function() {
    var _this = this;
    var li_length = this.oList.length;
    var dw, itemw;

    this.con_w = this.ulWrap.width() - (parseFloat(this.ulWrap.css("padding-right"), 10) || 0) - (parseFloat(this.ulWrap.css("padding-left"), 10) || 0);

    if (this.opts.showWidth) {
        this.ulw = 0;
        this.oList.each(function() {
            _this.ulw += $(this).width();
        });
        //保证切换的长度要小于可见容器的大小
        dw = this.con_w - this.opts.showWidth;
        itemw = dw >= 0 ? this.opts.showWidth : this.con_w;
        dw = dw >= 0 ? dw : 0;
        this.li_point = Math.ceil((this.ulw - dw) / itemw);
        this.animateWidth = this.opts.showWidth;
    } else {
        this.liw = this.getHorizontalSize();
        //获取点数量并添加到页面
        this.li_point = Math.ceil(li_length / (this.con_w / this.liw));
        this.ulw = Math.ceil(this.liw * li_length);
        this.oList.width(this.liw);
        this.animateWidth = this.con_w;
    }

    this.maxAnimateWidth = this.ulw - this.con_w;
    this.maxAnimateWidth = this.maxAnimateWidth < 0 ? 0 : this.maxAnimateWidth;
    this.oul.width(this.ulw);
}
/**
 *初始化水平轮播
 * */
Carousel.prototype.initHorizontal = function(type) {


    // 判断是横向一屏显示多个还是一个，多个就不能无限轮播，单个就可以选择无限轮播是否需要无限轮播
    if (this.screenShowNumFun() == 1 && this.opts.unlimited) {
        this.initNnlimitedWidth();
        this.initPoint();
        this.initNnlimitedBtn();
    } else {
        this.initWidth();
        this.initPoint();
        this.initBtn();
        //加了class影响到容器的宽度
        this.initWidth();
        //resize的时候不会改变当前的状态
        this.setMargin("css", this.topic_index);
    }

}

/**
 *初始化一屏是否显示一个
 * */
Carousel.prototype.screenShowNumFun = function(type) {
    this.con_w = this.ulWrap.width() - (parseFloat(this.ulWrap.css("padding-right"), 10) || 0) - (parseFloat(this.ulWrap.css("padding-left"), 10) || 0);
    this.liw = this.getHorizontalSize();
    var screenShowNum = Math.round(this.con_w / this.liw);
    return screenShowNum;
}

/**
 *设置margin，type=animate 动画方式
 * */
Carousel.prototype.setMargin = function(type, num) {
    var animateSize
    if (this.opts.dir == "vertical") {
        animateSize = this.animateHeight * num;
        this.oul.stop()[type]({ 'marginTop': -(animateSize > this.maxAnimateHeight ? this.maxAnimateHeight : animateSize) });
    } else {
        animateSize = this.animateWidth * num;
        if($("html").hasClass("LANG-sa")){
            this.oul.stop()[type]({ 'marginRight': -(animateSize > this.maxAnimateWidth ? this.maxAnimateWidth : animateSize) });
        }else{
            this.oul.stop()[type]({ 'marginLeft': -(animateSize > this.maxAnimateWidth ? this.maxAnimateWidth : animateSize) });
        }

    }
}



/**
 *初始化高度
 * */
Carousel.prototype.initHeight = function() {
    var _this = this;
    var li_length = this.oList.length;
    this.con_h = this.ulWrap.height() - (parseFloat(this.ulWrap.css("padding-top"), 10) || 0) - (parseFloat(this.ulWrap.css("padding-bottom"), 10) || 0);;
    var dh, itemh;

    if (this.opts.showHeight) {
        this.ulh = 0;
        this.oList.each(function() {
            _this.ulh += $(this).height();
        });
        //保证切换的长度要小于可见容器的大小
        dh = this.con_h - this.opts.showHeight;
        itemh = dh >= 0 ? this.opts.showHeight : this.con_h;
        dh = dh >= 0 ? dh : 0;
        this.li_point = Math.ceil((this.ulh - dh) / itemh);
        this.animateHeight = this.opts.showHeight;
    } else {
        this.lih = this.con_h / this.opts.showNum;
        //获取点数量并添加到页面
        this.li_point = Math.ceil(li_length / (this.con_h / this.lih));
        this.oList.height(this.lih);
        this.ulh = this.lih * li_length;
        this.animateHeight = this.con_h;
    }
    this.maxAnimateHeight = this.ulh - this.con_h;
    this.maxAnimateHeight = this.maxAnimateHeight < 0 ? 0 : this.maxAnimateHeight;
    this.oul.height(this.ulh);
}
/**
 *垂直
 * */
Carousel.prototype.initVertical = function(type) {

    this.initHeight();

    this.initPoint();

    this.initBtn();

    this.initHeight();

    this.oul.css('marginTop', this.con_h * this.topic_index);

}
/**
 *统一初始化
 * 最多显示4个，每个宽度为25%，超过4个出现滚动
 3个，每个宽度是33.3%
 2个，每个宽度是33.3%，整体居中
 1个，每个宽度是33.3%，整体居中
 * */
Carousel.prototype.initDefaultBefore = function() {
    var carousel = this;
    var len = carousel.oList.length;
    carousel.oCon.addClass("carousel-max" + this.opts.showNum + " carousel-wrap-" + len);
    carousel.oCon.css("width", "auto");
    carousel.oul.css("width", "auto");
    carousel.oList.each(function() {
        //清除行内样式
        $(this)[0].style.width = null;
    });
}
/**
 *未開放
 * */
Carousel.prototype.initDefaultAfter = function() {
    var carousel = this;
    if (carousel.li_point <= 1) {
        var totalWidth = 0;
        carousel.oList.each(function() {
            //清除行内样式
            totalWidth += $(this).width();
        });
        var innerMargin;
        if($("html").hasClass("LANG-sa")){
         innerMargin = (parseFloat(carousel.ulWrap.css("margin-right"), 10) + parseFloat(carousel.ulWrap.css("margin-right"), 10)) || 0
        }else{
         innerMargin = (parseFloat(carousel.ulWrap.css("margin-left"), 10) + parseFloat(carousel.ulWrap.css("margin-left"), 10)) || 0
       
        }
        if (carousel.oCon.width() - innerMargin > totalWidth) {
            carousel.oCon.width(totalWidth + innerMargin);
        }
    }
}
/**
 *初始化按钮
 * */
Carousel.prototype.initBtn = function() {
    this.oPrev.removeClass('notClick');
    this.oNext.removeClass('notClick');
    if (this.li_point <= 1) {
        this.oPrev.hide();
        this.oNext.hide();
    } else {
        if (this.topic_index <= 0) {
            this.oPrev.addClass('notClick');
        } else if (this.topic_index >= this.li_point - 1) {
            this.oNext.addClass('notClick');
        }
    }
}

/**
 *初始化水平轮播点点
 * */
Carousel.prototype.initPoint = function() {
    var point_span = '';
    if (this.li_point <= 1) {
        this.oPoint.hide();
        this.oCon.addClass("oneCarousel");
    } else {
        this.oCon.removeClass("oneCarousel");
        var len = this.li_point
        // 如果是数字
        if (this.opts.oPointNum) {
            point_span = '<p class="btn-before">1</p><em>/</em><p class="btn-after">' + len + '</p>';
        } else {
            // 如果是点点
            for (var i = 0; i < len; i++) {
                point_span += '<span><em></em></span>';
            }
        }
        this.oConPoint.empty().append(point_span);
        this.oPoint = this.oCon.find(this.opts.oPoint);
    }
    // 获取点的对象
    this.oPoint.removeClass('hover').eq(this.topic_index).addClass('hover');
}
/**
 *初始化切换动画
 * */
Carousel.prototype.carouselAnimate = function(num) {
    var _this = this;
    this.oPrev.removeClass('notClick');
    this.oNext.removeClass('notClick');
    if (num >= this.li_point - 1) {
        num = this.li_point - 1;
        this.oNext.addClass('notClick');
    } else if (num <= 0) {
        num = 0;
        this.oPrev.addClass('notClick');
    }
    //切换的时候点击两次topic_index实际已经改变，应放到return的前面
    this.topic_index = num;
    if (num == this.topic_per_index && this.oul.is(":animated")) {
        return;
    }
    //动画
    _this.setMargin("animate", num);
    _this.topic_per_index = num;
    if (this.opts.oPointNum) {
        this.oConPoint.find('.btn-before').text(num + 1);
    } else {
        this.oPoint.removeClass('hover').eq(num).addClass('hover');
    }

}


/**
 *懒加载
 * */
Carousel.prototype.imgPppear = function(num) {
    var _this = this;
    //懒加载
    if (!_this.oul.data("img-appear")) {
        _this.oul.find("img").trigger("appear");
    }
    _this.oul.data("img-appear", true);
}


/**
 *选择文字操作
 * */
var documentSelectEvent = document.onselectstart;

function stopSelect() {
    document.onselectstart = function() {
        return false
    }
}

function resetSelect() {
    document.onselectstart = documentSelectEvent;
}

function isMobileFun() {
    var isMobile = false;
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i) || $(window).width() < 1200)) {
        isMobile = true;
    }
    return isMobile;
}
/**
 *初始化滑动切换
 * */
Carousel.prototype.initMobileEvent = function() {
    var _this = this;
    var moveLeft, moveTop, $videoPlay, isLockA, checkDir, startDir, $downTarget;
    var isPressed, downX, downY, marginLeft, marginTop, isMobile, turnHorizontal, turnVertical;
    isMobile = isMobileFun();

    function clearOption() {
        moveLeft = 0;
        moveTop = 0;

        $videoPlay = null;
        $downTarget = null;


        checkDir = false;
        startDir = "";

        _this.isPressed = isPressed = false;
        resetSelect();
        turnHorizontal = false;
        turnVertical = false;

    }


    this.oCon.on("click", function(e) {

    }).on("touchstart mousedown", function(e) {

        // 当点击事件时，判断动画是否停止，如果没有停止，不执行当前动画
        if (_this.isAnimatedEvent()) {
            return false;
        }

        //防止某些机型抛出错误事件
        if (isMobile && e.type == "mousedown") {
            return;
        }

        if (e.originalEvent.touches) {
            e = e.originalEvent.touches[0];
        }

        clearOption();

        _this.isPressed = isPressed = true;

        Carousel.prototype.activeCarousel = _this;

        downX = e.pageX;
        downY = e.pageY;

        $(".J-dragElement").removeClass("J-dragElement");
        isLockA = false;
        $downTarget = $(e.target);

        if ($(e.target).hasClass("J-videoPlay")) {
            $videoPlay = $(e.target);
        } else {
            $videoPlay = $(e.target).parents(_this.opts.oList)
        }
        if (!$videoPlay.hasClass("J-videoPlay")) {
            $videoPlay = $videoPlay.find(".J-videoPlay")
        }
        if($("html").hasClass("LANG-sa")){
            marginLeft = parseFloat(_this.oul.css("marginRight"), 10) || 0;
        }else{
            marginLeft = parseFloat(_this.oul.css("marginLeft"), 10) || 0;
        }
        marginTop = parseFloat(_this.oul.css("marginTop"), 10) || 0;
        // stopSelect();
    }).on("touchmove mousemove", function(e) {


        // 当点击事件时，判断动画是否停止，如果没有停止，不执行当前动画
        if (_this.isAnimatedEvent()) {
            return false;
        }

        if (isPressed) {
            if (isMobile && e.type == "mousemove") {
                return;
            }
            if (e.originalEvent.touches) {
                e = e.originalEvent.touches[0];
            }

            moveLeft = $("html").hasClass("LANG-sa")?(downX-e.pageX):(e.pageX - downX);
            moveTop = e.pageY - downY;

            if (!checkDir) {
                var angleValue = Math.abs(moveLeft / moveTop); //介意30度45度之间一个度数
                var angleValue2 = Math.abs(moveTop / moveLeft); //介意45度60度之间一个度数
                if (angleValue > 1.5 && moveLeft > 0) { // right

                    startDir = $("html").hasClass("LANG-sa")?'left':'right';
                } else if (angleValue > 1.5 && moveLeft < 0) { // left
                    startDir = $("html").hasClass("LANG-sa")?'right':'left';
                } else if (angleValue2 > 1.5 && moveTop > 0) { // down
                    startDir = 'down';
                } else if (angleValue2 > 1.5 && moveTop < 0) { // up
                    startDir = 'up';
                } else {
                    //四个斜角
                }

                turnHorizontal = (_this.opts.dir != "vertical" && (startDir == 'right' || startDir == 'left'));
                turnVertical = (_this.opts.dir == "vertical" && (startDir == 'down' || startDir == 'up'));

                if (turnHorizontal || turnVertical) {
                    checkDir = true;
                    stopSelect();
                }

            }

            if (turnHorizontal) {
                if($("html").hasClass("LANG-sa")){
                    _this.oul.css("marginRight", marginLeft + moveLeft);
                }else{
                    _this.oul.css("marginLeft", marginLeft + moveLeft);
                }
        
                isLockA = true;
                return false;
            }
            if (turnVertical) {
                _this.oul.css("marginTop", marginTop + moveTop);
                isLockA = true;
                return false;
            }

        }
    }).on("touchend mouseup", function(e) {
        handlerUp();
    });

    /**
     *初始化按钮事件
     * */
    function handlerUp() {
        if (isPressed) {

            // 懒加载
            _this.imgPppear();
            
            if ((turnHorizontal && moveLeft < -20) || (turnVertical && moveTop < -20)) {
                _this.topic_index++;

                if (_this.screenShowNumFun() == 1 && _this.opts.unlimited) {
                    _this.carouselNnlimiteAnimate(_this.topic_index,'left');
                }else{
                    _this.carouselAnimate(_this.topic_index);
                }

            } else if ((turnHorizontal && moveLeft > 20) || (turnVertical && moveTop > 20)) {
                _this.topic_index--;

                if (_this.screenShowNumFun() == 1 && _this.opts.unlimited) {
                    _this.carouselNnlimiteAnimate(_this.topic_index,'right');
                }else{
                    _this.carouselAnimate(_this.topic_index);
                }
            } else {
                //还原原来的位置
                if ((turnHorizontal && moveLeft != 0) || (turnVertical && moveTop != 0)) {
                    _this.carouselAnimate(_this.topic_index);
                }
            }
            //拖动不是点击
            if ((Math.abs(moveLeft) > 20) || (Math.abs(moveTop) > 20)) {
                if ($videoPlay.length) {
                    $videoPlay.data("lockplay", true);
                }
                //表示点击的对象处于轮播中
                $downTarget.addClass("J-dragElement")
                clearOption();
                return false;
            }
            clearOption();
        }
    }

    this.oCon.on("click", "a", function() {
        if (isLockA) {
            return false;
        }
    }).on("clearCarousel", function() {
        handlerUp();
    })

}





/**
 * 当点击事件时，判断动画是否停止，如果没有停止，不执行当前动画,函数
 * */
Carousel.prototype.isAnimatedEvent = function() {
    var _this = this;
    if (_this.oul.is(":animated")) {
        return true;
    }
}

/**
 *初始化按钮事件
 * */
Carousel.prototype.initEvent = function() {

    var _this = this;
    if ($(window).width() > 750 || this.opts.dir == "vertical") {
        //如果用click的话 两次点击时间差会大于100，这样会导致触发两次动画
        this.oNext.on('click', function() {
            // 当点击事件时，判断动画是否停止，如果没有停止，不执行当前动画
            if (_this.isAnimatedEvent()) {
                return false;
            }

            // 懒加载
            _this.imgPppear();

            _this.topic_index++;
            if (_this.screenShowNumFun() == 1 && _this.opts.unlimited) {
                _this.carouselNnlimiteAnimate(_this.topic_index, 'left');
            } else {
                _this.carouselAnimate(_this.topic_index);
            }
            return false;
        })

        this.oPrev.on('click', function() {
            // 当点击事件时，判断动画是否停止，如果没有停止，不执行当前动画
            if (_this.isAnimatedEvent()) {
                return false;
            }
            _this.topic_index--;
            if (_this.screenShowNumFun() == 1 && _this.opts.unlimited) {
                _this.carouselNnlimiteAnimate(_this.topic_index, 'right');
            } else {
                _this.carouselAnimate(_this.topic_index);
            }
            return false;
        })
        this.oConPoint.on('click', 'span', function() {
            // 当点击事件时，判断动画是否停止，如果没有停止，不执行当前动画
            if (_this.isAnimatedEvent()) {
                return false;
            }
            _this.topic_index = $(this).index() || 0;
            _this.carouselAnimate(_this.topic_index);
            return false;
        })

    }

    if (!navigator.userAgent.match('MSIE') && this.li_point > 1 && isMobileFun()) {
        this.initMobileEvent()
    }

}


/**
 *初始化切换动画，如果当前一屏显示一个，并且是无限轮播
 * */
Carousel.prototype.carouselNnlimiteAnimate = function(num, dir) {
    var _this = this;
    if (num > _this.li_point - 1) {
        _this.topic_index = num = 0;
    } else if (num < 0) {
        _this.topic_index = num = _this.li_point - 1;
    }
    //动画
    _this.setNnlimiteMargin("animate", num, dir);
    _this.topic_per_index = num;
    if (_this.opts.oPointNum) {
        _this.oConPoint.find('.btn-before').text(num + 1);
    } else {
        _this.oPoint.removeClass('hover').eq(num).addClass('hover');
    }

}

/**
 *初始化按钮，如果当前一屏显示一个，并且是无限轮播
 * */
Carousel.prototype.initNnlimitedBtn = function() {
    this.oPrev.removeClass('notClick');
    this.oNext.removeClass('notClick');
    if (this.li_point <= 1) {
        this.oPrev.hide();
        this.oNext.hide();
    }
}


/**
 * 初始化无限轮播width，height，定位, 点点, 动画width
 * */
Carousel.prototype.initNnlimitedWidth = function(type) {
    var _this = this;
    var li_length = _this.oList.length;

    // 给ul， li 设置高度

    _this.oList.css({ 'width': _this.oul.width() });
    _this.oul.css({ 'width': _this.oList.width(), 'height': _this.oList.height() });

    // 给ul添加相对定位
    _this.oul.css('position', 'relative');
    // 定位每个li的位置
    _this.oList.each(function() {
        var _index = $(this).index();
        $(this).css({ 'position': 'absolute', 'left': 0, 'zIndex': 5 });
        if (_index == 0) {
            $(this).css('zIndex', '10');
        }
        if (_index == 1) {
            $(this).css('left', '100%');
        }
        if (_index == li_length - 1 && _index != 0) {
            $(this).css('left', '-100%');
        }
    })

    // 获取点点数量
    _this.li_point = _this.oList.length;

    // 给点点，左右按钮样式比图片更高的层级
    _this.oPrev.css('zIndex', 11);
    _this.oNext.css('zIndex', 11);
    _this.oConPoint.css('zIndex', 11);

    // 获取需要执行的动画width
    this.maxAnimateWidth = -_this.oList.width();
}



/**
 *设置margin，type=animate 动画方式，如果是一屏显示一个，并且无限轮播
 * */
Carousel.prototype.setNnlimiteMargin = function(type, num, dir) {
    var _this = this,
        runWidth;
    if (dir == 'left') {
        runWidth = this.maxAnimateWidth;
    } else {
        runWidth = -this.maxAnimateWidth;
    }
    if($("html").hasClass("LANG-sa")){
        _this.oul.stop()[type]({ 'marginRight': runWidth }, function() {
            // 重置动画
            _this.ResetNnlimiteMargin(num);
        });
    }else{
        _this.oul.stop()[type]({ 'marginLeft': runWidth }, function() {
            // 重置动画
            _this.ResetNnlimiteMargin(num);
        });
    }
}

/**
 *重置动画，如果是一屏显示一个，并且无限轮播
 * */
Carousel.prototype.ResetNnlimiteMargin = function(num) {
    var _this = this;
    var li_length = _this.oList.length;
    if($("html").hasClass("LANG-sa")){
        _this.oul.css('marginRight', 0);
    }else{
        _this.oul.css('marginLeft', 0);
    }
    _this.oList.eq(num).css({ 'left': '0', 'zIndex': 10 });
    if (num != 0) {
        _this.oList.eq(num - 1).css({ 'left': '-100%', 'zIndex': 5 });
    } else {
        _this.oList.eq(li_length - 1).css({ 'left': '-100%', 'zIndex': 5 });
    }
    if (num != li_length - 1) {
        _this.oList.eq(num + 1).css({ 'left': '100%', 'zIndex': 5 });
    } else {
        _this.oList.eq(0).css({ 'left': '100%', 'zIndex': 5 });
    }
}




/**
 * 性能优化，resize事件
 * */
;
(function() {

    //只针对宽
    var timer, perWidth, $win = $(window);
    $win.on("resize.carousel", function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            if ($win.width() != perWidth) {
                var target = Carousel.prototype.target;
                for (var i = 0; i < target.length; i++) {
                    target[i].trigger("resizeInit");
                }
            }
        }, 200)
    });

    Carousel.prototype.target = [];
    Carousel.prototype.activeCarousel = null;
    $(document).on("touchend mouseup", function(e) {
        var carousel = Carousel.prototype.activeCarousel;
        //如果触发
        if (carousel && carousel.isPressed) {
            carousel.oCon.trigger("clearCarousel");
            Carousel.prototype.activeCarousel = null;
        }
    });
})()
