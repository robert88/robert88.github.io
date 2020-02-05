$(document).ready(function() {
  var win_w = $(window).width();

  var pageHtml = '';

  if (win_w > 768) {

    var mySwiper1 = new Swiper('.highlights-container', {
      pagination: '.highlights .pagination',
      loop: true,
      autoplay: 3000,
      grabCursor: true,
      paginationClickable: true
    })

    $('.swiper-container').hover(function() {
      mySwiper1.stopAutoplay();
    }, function() {
      mySwiper1.startAutoplay();
    });

    $('.highlights-slide .arrow-left').on('click', function(e) {
      e.preventDefault()
      mySwiper1.swipePrev()
    })
    $('.highlights-slide .arrow-right').on('click', function(e) {
      e.preventDefault()
      mySwiper1.swipeNext()
    });
    // 点击查看大图 
    var aSlide = $('.slide-item');
    aSlide.each(function(i, v) {
      aSlide.on('click', function(e) {
        e.stopPropagation();
        var index = $(this).attr('data-index');
        $('.light-box').fadeIn(400);
        lightSwiper(index);
      })
      return;
    })

    var lightSlide = new Swiper('.light-slides', {
      paginationClickable: true,
      nextButton: '.light-slides-button-next',
      prevButton: '.light-slides-button-prev',
      spaceBetween: 30,
      simulateTouch: false,
      onSlideChangeStart: function(swiper) {
        $('.light-slides-page').html('');
        pageHtml = '';
        pageHtml = '<span class="page-num">' + (parseInt(swiper.activeIndex) + 1) + ' / ' + lightSlide.slides.length + '</span>';

        $('.light-slides-page').append(pageHtml);
      }
    });

    function lightSwiper(i) {

      pageHtml = '';
      $('.light-slides-page').html('');
      lightSlide.swipeTo(i, 0, false);

      pageHtml = '<span class="page-num">' + (parseInt(i) + 1) + ' / ' + lightSlide.slides.length + '</span>';
      $('.light-slides-page').append(pageHtml);

      $('.light-slides-button-prev').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        lightSlide.swipePrev()
      })
      $('.light-slides-button-next').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        lightSlide.swipeNext()
      })
    }

    $(document).click(function() {
      if ($('.light-box').is(":visible")) {
        $('.light-box').fadeOut(400);
        mySwiper1.startAutoplay();
      }
    })


    // topic slide
    var mySwiper2 = new Swiper('.topic-container', {
      pagination: '.cloud-customer-story .pagination',
      loop: true,
      grabCursor: true,
      paginationClickable: true
    })
    $('.topic-slide .arrow-left').on('click', function(e) {
      e.preventDefault()
      mySwiper2.swipePrev()
    })
    $('.topic-slide .arrow-right').on('click', function(e) {
      e.preventDefault()
      mySwiper2.swipeNext()
    })
  } else {
    $('.highlights .cistern').addClass('no-padd')
    $('.highlights-slide').addClass('mb-highlights');
    $('.highlights-container').addClass('mb-highlights-container');

    var slides = $('.slide-item');
    $('.highlights-container .swiper-wrapper').html('');
    var cong = '';
    slides.each(function() {
      cong += '<div class="swiper-slide">' + $(this).html() + '</div>';
    })
    $('.highlights-container .swiper-wrapper').append(cong);

    var newSlide = $('.highlights-container .swiper-wrapper').find('.swiper-slide');
    if (newSlide.length > 1) {
      setTimeout(function() {
        var mySwiper3 = new Swiper('.mb-highlights-container', {
          pagination: '.highlights .pagination',
          // slidesPerView: 1.1,
          // centeredSlides: true,
          // paginationClickable: true,
          // spaceBetween: 28,
          // slidesOffsetBefore : 100
          autoplay: 5000,
          slidesPerView: 'auto',
          centeredSlides: !0,
          watchSlidesProgress: !0,
        })
      }, 1000);
    }
  }

  //cloud Customer story 客户故事
  CAROU({ oCon: ".J-carousel-wrap-story", showNum: 1 });
})