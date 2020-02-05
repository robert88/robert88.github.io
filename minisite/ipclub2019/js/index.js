$(function() {

  var win_w = $(window).width();
  var slidesPerView, slidesPerColumn, stretch, noDepth, slidesPerView2;
  var browserVersion = baseLib2.browserVersion();
  if (win_w < 960) {

    var exList = $('.experts .swiper-slide');
    var hideBox = $('.mb-slideToggle');
    var btnToggle = $('.btn-toggle');
    exList.each(function(i) {
      if (i > 3) {
        hideBox.append($(this));
      }
    })
    if (hideBox.find('.swiper-slide').length > 0) {
      btnToggle.css('display', 'block');
      btnToggle.on('click', function() {
        hideBox.slideToggle();
        btnToggle.toggleClass('on')
      })
    }
  } else {
    // $('.vedioplay').each(function () {
    //     $(this).on('click',function() {
    //         console.log($(this).attr('data-url'));
    //     });
    // })

    if ($('.topic-dl').length > 1) {
      $('.topic-dl').each(function() {
        var dtH = $(this).find('.topic-dt').outerHeight();
        $(this).find('.topic-dd').css('height', dtH + 'px');
      })
    }

    if (browserVersion == 11 || browserVersion == 10 || browserVersion == 19) {
      $('.title-color').addClass('title-ie')
    }

    // $('.show-list').stop().on('click', function (e) {
    //     e.stopPropagation();
    //    $('.hidden-nav-bar').slideToggle(); 
    //    $(this).toggleClass('active');
    // });
    // $(document).on('click',function () {
    //     $('.hidden-nav-bar').slideUp(); 
    //     if ($('.show-list').hasClass('active')) {
    //         $('.show-list').removeClass('active');
    //     }
    // })

    baseLib.contourFun(".swiper-container", ".swiper-slide", "figcaption");

    if (win_w > 959 && win_w < 1024) {
      slidesPerView = 1;
      slidesPerColumn = 2;
    } else {
      slidesPerView = 3,
        slidesPerColumn = 1;
    }

    var swiper3 = new Swiper('.swiper-experts', {
      prevButton: '.experts .swiper-button-prev',
      nextButton: '.experts .swiper-button-next',
      pagination: '.experts .swiper-pagination',
      slidesPerView: slidesPerView,
      slidesPerGroup: slidesPerView,
      slidesPerColumn: slidesPerColumn,
      paginationClickable: true,
      simulateTouch: false,
      autoplay: 5000,
      loop: true,
      spaceBetween: 26
    });
  }
  var swiper = new Swiper('.banner-carousel', {
    pagination: '.banner-carousel .swiper-pagination',
    paginationClickable: true,
    nextButton: '.banner-carousel .swiper-button-next',
    prevButton: '.banner-carousel .swiper-button-prev',
    // spaceBetween: 30,
    simulateTouch: false,
    // loop: true
  });
  if ($('.banner-carousel .swiper-slide').length < 2) {
    // console.log(1);
    swiper.stopAutoplay(); //禁止轮播
    swiper.lockSwipes(); //禁止滑动
  } else {
    // console.log(2);
  }
  var swiper2 = new Swiper('.swiper-video-play', {
    pagination: '.swiper-video-play .swiper-pagination',
    paginationClickable: true,
    // loop: true,
    // autoplay: 5000,
  });

})