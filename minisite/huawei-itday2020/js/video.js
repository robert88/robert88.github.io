$(function() {

  //用构造函数方法写
  function playBox() {
    this.win_w = null;
    this.win_h = null;
    this.btn = null;
    this.videomask = null;
    this.close = null;
    this.jWUrl = null;
  };

  function isIE891011() {
    var ie = /msie ([6-9]|10)/i.test(navigator.userAgent);
    if(!ie){
      ie = /Trident|rv:11/i.test(navigator.userAgent);
    }
    return ie;
  }
  //初始化参数
  playBox.prototype.init = function(opts) {

    this.opts = opts;
    //750px,以上的需要content中播放
    if (this.opts.content && $(this.opts.content).length && $(window).width() > this.opts.wrapSize) {
      this.opts.playInContent = true;
    }
    if (playBox.prototype.preVideo) {
      playBox.prototype.preVideo.closeVideo()
    }

    playBox.prototype.preVideo = this;

    this.aNiMate();
  };

  //更新参数
  playBox.prototype.reset = function() {

    if (this.opts.playInContent) {
      this.win_w = this.videomask.width();
      this.win_h = this.videomask.height();
    } else {
      this.win_w = $(window).width();
      this.win_h = $(window).height();
    }

    var size = this.getVideoSize();

    $('.jWVideoFrame').css({
      'position': 'absolute',
      'width': size.w,
      'height': size.h,
      'top': size.y,
      'left': size.x
    });

    // this.player.resize(size.w, size.h)
  };

  //执行参数
  playBox.prototype.aNiMate = function() {
    this.btn = $(this.opts.btn);
    var $isStatus = this.btn.find(".J-play-status").length && this.btn.find(".J-play-status")
    var $isCon = this.btn.find(".videocon-btn").length && this.btn.find(".videocon-btn")
    this.statusBtn = $isStatus || $isCon || this.btn;
    this.jWUrl = this.opts.jWUrl;

    //创建区域
    if (this.opts.playInContent) {
      $(this.opts.content).html("");
      this.videomask = $(this.opts.content);
      this.win_w = this.videomask.width();
      this.win_h = this.videomask.height();
      this.opts.full = true;
      if (this.videomask[0] != this.btn[0]) {
        this.videomask.data("remark-btn", this.btn);
      }
      if (this.videomask.data("init-status-btn")) {
        this.statusBtn = this.videomask.data("init-status-btn");
        this.videomask.data("init-status-btn", null);
      }

      //创建弹框
    } else {
      //如果之前有弹框，先删除之前的弹框
      $('.videomask').remove();
      this.win_w = $(window).width();
      this.win_h = $(window).height();
      this.createPopUp();
      //调用关闭按钮事件
      this.bindClose();
      this.opts.full = false;
    }

    //创建视频
    this.createVideo();

    //如果是弹窗方式且有分享功能
    if (!this.opts.playInContent && (this.opts.shareFunc || this.opts.downloadPath)) {
      this.initShare();
    }
    this.bindEvent();
  };

  //视频弹框
  playBox.prototype.createPopUp = function() {

    var This = this;

    //创建弹框
    var div = "<style>.videomask{background: #000;background: rgba(0,0,0,.5);position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 8888;display: none;}.videomask i.icon-close:hover{ transform: rotate(90deg); }</style><div class='videomask' style=''><i class='iconfont icon-close' style='font-size:40px;color:#696969;position:absolute;right:50px;top:50px;cursor:pointer;transition: all ease .3s;'></i></div>";

    var wap_div = "<style>.videomask{background: #000;background: rgba(0,0,0,.5);position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 8888;display: none;} }</style><div class='videomask' style=''><i class='iconfont icon-close' style='font-size:40px;color:#696969;position:absolute;left:50%;bottom:50px; margin-left:-20px;cursor:pointer;transition: all ease .3s;'></i></div>";

    if (navigator.userAgent.match(/mobile/i)) {
      //把弹窗插入到body最下面
      $('body').append(wap_div);
    } else {
      //把弹窗插入到body最下面
      $('body').append(div);
    }

    //从新获取弹框对象
    this.videomask = $('.videomask');

    //从新获取弹框关闭按钮
    this.close = $('.videomask .icon-close2');

    //弹框透明度200S动画显示
    this.videomask.fadeIn(200);
  };

  /*获取视频大小*/
  playBox.prototype.getVideoSize = function() {

    var videoWidth,
      videoHeight,
      videoTop,
      videoleft;

    if (this.win_w > 980) {
      videoWidth = this.opts.full ? this.win_w : 980;
      videoHeight = videoWidth * 9 / 16;
      videoTop = (this.win_h - videoHeight) / 2;
      videoleft = (this.win_w - videoWidth) / 2;
    } else if (980 > this.win_w && this.win_w > 480) {
      videoWidth = this.opts.full ? this.win_w : this.win_w * 0.8;
      videoHeight = videoWidth * 9 / 16;
      videoTop = (this.win_h - videoHeight) / 2;
      videoleft = (this.win_w - videoWidth) / 2;
    } else {
      videoWidth = this.win_w;
      videoHeight = videoWidth * 9 / 16;
      videoTop = (this.win_h - videoHeight) / 2;
      videoleft = (this.win_w - videoWidth) / 2;
    }
    return { x: videoleft, y: videoTop, w: videoWidth, h: videoHeight }
  }

  playBox.prototype.createVideo = function() {
    $(".jWVideoFrame").remove();
    var playerid = "jWVideoFrameId";
    var This = this,

      oVideo = "<div class='jWVideoFrame'><div class='videojs-container'><video data-setup='{}' playsinline id='" + playerid + "' class='vjs-big-play-centered video-js  video-player center-block'></video></div></div>";

    var size = this.getVideoSize();

    this.videomask.append(oVideo).addClass("playing").data("url", This.jWUrl);
    this.btn.addClass("playing");
    var remarkBtn = this.videomask.data("remark-btn");
    if (remarkBtn) {
      remarkBtn.addClass("playing");
    }
    $('.jWVideoFrame').css({
      'position': 'absolute',
      'width': size.w,
      'height': size.h,
      'top': size.y,
      'left': size.x
    });

    $('.jWVideoFrame').click(function(e) {
      var e = e || window.event;
      e.stopPropagation();
    });


    var This = this;



    var player_options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
      "fluid": true,
      sources: [
        { "src": This.jWUrl, "type": "video/mp4", "label": "720P", selected: true, res: 720 }
      ],
      aspectRatio: "16:9",
      muted: false,
      plugins: {},
      "language": window["videojsLanguage"],
      techOrder: ["html5"]
    };


    if (isIE891011()) {
      player_options.plugins["videoJsResolutionSwitcher"] = {
        "default": 'low', // Default resolution [{Number}, 'low', 'high'],
        dynamicLabel: true
      };
      player_options["techOrder"] = ["flash", "html5"];
    }

    if (videojs.getPlugin && videojs.getPlugin("vjsdownload")) {
      player_options.plugins["vjsdownload"] = {
        beforeElement: 'playbackRateMenuButton',
        textControl: 'Download video',
        name: 'downloadButton',
        downloadURL: This.opts.downloadPath
      };
    }



    var player = videojs.getPlayers()[playerid];
    if (player) player.dispose();

    //调用接口
    var player = videojs(playerid, player_options);


    if (videojs.getComponent('QualitySelector')) {
      player.controlBar.addChild('QualitySelector', {
        text: 'Quality',
      });
    }

    if (player.ga)
      player.ga();

    player.on('play', function(e) {
      This.pausePlayVideo(true);
      This.videomask.trigger("play");
      $(".vjs-big-play-button").hide()
    });


    player.on('pause', function(e) {
      This.pauseVideo(true);
      This.videomask.trigger("pause");
      $(".vjs-big-play-button").show()
    });


    player.on('canplaythrough', function(e) {
      This.videomask.trigger("readyPlay");
      //隐藏下载按钮
      $(".vjs-vjsdownload.vjs-control.vjs-button").hide();

    });

    player.on('ended', function(e) {
      This.pauseVideo(true);
      This.videomask.trigger("complete");
      $(".vjs-big-play-button").show()
    });
    player.on('volumechange', function(e) {
      This.videomask.trigger("volumeChange")
    });

    this.player = player;

  };


  //分享功能
  playBox.prototype.initShare = function() {
    //含有分享
    this.shareGroup = $("<div class='videoShareGroup'></div>")
    this.shareWrapBox = $("<div class='videoShareWrap'></div>")
    $('.jWVideoFrame').append(this.shareGroup);
    this.shareGroup.append(this.shareWrapBox)
    if (this.opts.downloadPath) {

      if (!this.opts.shareFunc) {
        this.shareWrapBox.append("<a class='videoDownload nosbling' href='" + this.opts.downloadPath + "'><i class='iconfont icon-download2'></i></a>");
      } else {
        this.shareWrapBox.append("<a class='videoDownload' href='" + this.opts.downloadPath + "'><i class='iconfont icon-download2'></i></a>");
      }
    }
    if (this.opts.shareFunc) {
      this.shareBox = $("<div class='videoShare'></div>")
      this.shareWrapBox.append(this.shareBox);
      if (!this.shareBox.share) {
        alert("not find share function");
      } else {
        this.shareBox.share({
          sites: this.opts.shareFunc.split(","),
          url: this.opts.shareUrl,
          title: this.opts.shareTitle,
          description: this.opts.shareDescription,
          image: this.opts.shareImg
        })
      }
    }

  }
  playBox.prototype.bindClose = function() {
    var This = this;
    This.close.off("click.video").on('click.video', function(e) {
      var e = e || window.event;
      e.stopPropagation();
      This.closeVideo();
    });
    This.videomask.off("click.video").on('click.video', function(e) {
      var e = e || window.event;
      e.stopPropagation();
      This.closeVideo();

    });
  };
  playBox.prototype.bindEvent = function() {
    var This = this;
    This.statusBtn.off('click.video').on('click.video', function(e) {
      if (This.btn.hasClass("playing")) {
        This.pauseVideo();
        return false;
      } else if (This.btn.hasClass("pause")) {
        This.pausePlayVideo();
        return false;
      }
    });
  };
  /*关闭视频*/
  playBox.prototype.closeVideo = function() {
    this.player&&this.player.dispose();
    this.player = null;
    if (this.opts.playInContent) {
      this.videomask.removeClass("playing");
    } else {
      this.videomask.fadeOut(200);
    }

    this.videomask && this.videomask.off("click.video")
    this.close && this.close.off("click.video")
    this.statusBtn.off('click.video')
    this.btn && this.btn.removeClass("playing").removeClass("pause");
    var remarkBtn = this.videomask.data("remark-btn");
    if (remarkBtn) {
      remarkBtn.removeClass("playing");
    }

  }
  /*暂停视频*/
  playBox.prototype.pauseVideo = function(flag) {
    if (jWVideoFrameId && this.btn.hasClass("playing")) {
      if (!flag) {
        this.player.pause();
      }
      this.videomask.removeClass("playing").addClass("pause");
      this.btn.removeClass("playing").addClass("pause");
      var remarkBtn = this.videomask.data("remark-btn");
      if (remarkBtn) {
        remarkBtn.removeClass("playing").addClass("pause");
      }
    }
  }
  /*暂停中恢复视频*/
  playBox.prototype.pausePlayVideo = function(flag) {
    if (jWVideoFrameId && this.btn.hasClass("pause")) {
      if (!flag) {
        this.player.play();
      }
      this.videomask.removeClass("pause").addClass("playing");
      this.btn.removeClass("pause").addClass("playing");
      var remarkBtn = this.videomask.data("remark-btn");
      if (remarkBtn) {
        remarkBtn.removeClass("pause").addClass("playing");
      }
    }
  }
  //窗口发生变化，执行函数
  $(window).resize(function() {
    clearTimeout(playBox.prototype.timer);
    playBox.prototype.timer = setTimeout(function() {
      if (playBox.prototype.preVideo) {
        playBox.prototype.preVideo.reset()
      }
    }, 200);
  });

  //默认参数,这些参数只是为了不报错
  var defaluts = {
    'videomask': '.videomask',
    'close': '.videomask .icon-close2',
    wrapSize: 750
  };
  //分享样式
  if ($("#linkVideoShareStyle").length == 0) {
    var link = document.createElement("link");
    var ua = window.navigator.userAgent;
    var isIE8 = window.ActiveXObject != undefined && (ua.indexOf("MSIE 8") != -1 || ua.indexOf("MSIE 7") != -1);
    if (isIE8) {
      link.setAttribute("rel", "stylesheet")
      link.setAttribute("type", "text/css")
      link.setAttribute("id", "linkVideoShareStyle")
      link.setAttribute("href", "/Assets/enp/v2/css/vendor/videoShare.css")
      $("head")[0].appendChild(link);
    } else {
      link.rel = "stylesheet";
      link.type = "text/css";
      link.id = "linkVideoShareStyle";
      link.href = "/Assets/enp/v2/css/vendor/videoShare.css";
      $("head").append(link);
    }

  }
  //分享jquery.share.js
  if (!$.fn.share) {
    var script = document.createElement("script");
    $("body").append(script);
    script.src = "/Assets/enp/v2/js/vendor/jquery.share.js"
  }
  //二维码
  if (!$.fn.qrcode) {
    script = document.createElement("script");
    $("body").append(script);
    script.src = "/Assets/enp/v2/js/vendor/jquery.qrcode-0.12.0.min.js"
  }
  jQuery.loadScript = function(url, options) {
    options = $.extend(options || {}, {
      dataType: "script",
      cache: true,
      url: url
    });
    return jQuery.ajax(options);
  };

  function getVideoJs5() {
		$('<link rel="stylesheet" href="//www.huawei.com/Assets/public/js/vendor/video-js-5.20.5/video-js.min.css" />').prependTo("head");
    return jQuery.loadScript("//www.huawei.com/Assets/public/js/vendor/video-js-5.20.5/ie8/videojs-ie8.min.js")
      .then(function(d) {
        return jQuery.loadScript("//www.huawei.com/Assets/public/js/vendor/video-js-5.20.5/video.min.js");
      })
      .then(function(d) {
        videojs.options.flash.swf = "//www.huawei.com/Assets/public/js/vendor/video-js-5.20.5/video-js.swf";
        jQuery.loadScript("//cdnjs.cloudflare.com/ajax/libs/videojs-ga/0.4.2/videojs.ga.min.js");
        return jQuery.loadScript("//www.huawei.com/Assets/public/js/vendor/video-js-5.20.5/videojs-resolution-switcher.min.js");
      });
  }

  function getVideoJs7() {
		$('<link rel="stylesheet" href="//www.huawei.com/Assets/public/js/vendor/video-js-7.5.4/video-js.min.css" /><link rel="stylesheet" href="//unpkg.com/videojs-vjsdownload@1.0.4/dist/videojs-vjsdownload.css" />').prependTo("head");
    return jQuery.loadScript("//www.huawei.com/Assets/public/js/vendor/video-js-7.5.4/video.min.js")
      .then(function(d) {
        jQuery.loadScript("//cdnjs.cloudflare.com/ajax/libs/videojs-ga/0.4.2/videojs.ga.min.js");
        jQuery.loadScript("//unpkg.com/videojs-vjsdownload@1.0.4/dist/videojs-vjsdownload.min.js");
        return jQuery.loadScript("//www.huawei.com/Assets/public/js/vendor/video-js-7.5.4/silvermine-videojs-quality-selector.min.js");
      });
  }

  function loadVideoJs(){
    var videoFn = isIE891011() ? getVideoJs5 : getVideoJs7;
    videoFn().done(function(d) {
      bindClickPlay();
      $("body").trigger("videojsReady")
    });
  }

  loadVideoJs();




  function bindClickPlay() {
    //点击需要播放的视频按钮，执行事件
    $(document).off("click.play", '.vedioplay,.J-videoPlay,.js_video_player').on("click.play", '.vedioplay,.J-videoPlay,.js_video_player', function() {
      //不用弹框的开关
      if ($(this).attr("data-play-nopop")) {
        return
      }
      var data = $(this).data();
      data.url = $.trim(data.url)
      if (data.url) {
        // 已//开头的链接
        if (data.url.indexOf("//") == 0) {
          data.url = location.protocol + data.url
        }
      } else {
        return;
      }
      data.downloadPath = $.trim(data.downloadPath)

      var opts = $.extend({}, defaluts, {
        'jWUrl': data.url,
        "downloadPath": $.trim(data.downloadPath),
        "shareFunc": $.trim(data.shareFunc),
        "shareUrl": $.trim(data.shareUrl),
        "shareTitle": data.shareTitle,
        "shareDescription": data.shareDescription,
        "shareImg": $.trim(data.shareImg),
        "content": data.content,
        btn: $(this)
      });

      opts.wrapSize = $(this).data("wrapsize") || $("body").data("wrapsize") || defaluts.wrapSize
      if (!$(this).data("lockplay") && !$(this).hasClass("playing")) {
        //new出构造函数
        new playBox().init(opts);
      } else {
        $(this).data("lockplay", false);
      }
      return false;
    })

  }


});