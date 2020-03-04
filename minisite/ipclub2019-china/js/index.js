$(function () {

  var winW = $('body').width();
  var ua = navigator.userAgent.toLowerCase();
  var aLi = $('.agenda .tab_hd li');
  var aTabB = $('.agenda .tab_bd .bd_wrap');

  $(window).on('resize',function() {
    console.log(winW);
    // slideMenu();
    slideMenu.build('sm',600,4,10,1);
  })

  // 判断pc端是否是墨西哥页面 
  if ($('.agenda').hasClass('agenda-mx')) { 

  } else {
    $(window).scroll( function ()  {
      var top = parseInt($(window).scrollTop());
      var aCon = $('.content');
      var offH = window.screen.availHeight;
      var num = $(".content").size(),
          moduleH = [];
      for (var i = 0; i < num; i++) {
          moduleH[i] = aCon.eq(i).offset().top - 380;
      }
      if (top > $('.speaker').offset().top - (offH * 3 / 4)) {
        $('.speaker .row dl').each(function () {
          $(this).addClass('transform_');
        })
      } 
      // if (top > $('.journey').offset().top - (offH * 3 / 4)) {
      //   var articles = $('.journey .journey-con .content-wrap li article');
      //   articles.each(function () {
      //     $(this).addClass('transform_');
      //   })
      // }
    })
     // speaker  检测 高度 
    if ($('.speaker '))　{
      baseLib.contourFun('.row', 'dl', 'dt');
    }
    if($('.swiper-container').length > 0){
      baseLib.contourFun(".swiper-wrapper",".swiper-slide","p");
    }
  }

  // 检测移动端
  if (winW < 961 && /iphone|ipod|android|windows phone|blackberry/.test(ua)) { 
    $('.solutions').addClass('wap');
    // agendaWap ();
    journeySlide();
    $('#showSlide').on('click','.swiper-slide',function () {
      imgUrl = $(this).find('.slider-con a').attr('href');
      window.open(imgUrl);
    })
  } else {
    $('.solutions').removeClass('wap');
    slideMenu.build('sm',600,4,10,1);
    // agendaPc ();
  }
  // tab
  // function agendaPc () {
  //   aLi.each(function(){
  //     $(this).on('click',function() {
  //       var nIndex = $(this).index(); 
  //       $(this).addClass('active').siblings().removeClass('active');
  //       aTabB.eq(nIndex).stop(false,false).fadeIn(400).siblings().stop(false,false).fadeOut(10);
  //     })
  //   })
  // }
  // function agendaWap () {
  //   if ($('.agenda').hasClass('agenda-mx')) { //墨西哥页面日程
  //     $('.bd_wrap').show();
  //   } else { //英文日程
  //     aTabB.hide();
  //     $('.tab_hd').addClass('tab_hd_wap');
  //     $('.tab_bd').addClass('tab_bd_wap');
  //     aLi.each(function(){
  //       $(this).on('click',function() {
  //         $('.tab_bd').fadeIn(400);
  //         $('body').css('overflow','hidden');
  //         var nIndex = $(this).index(); 
  //         $(this).addClass('active').siblings().removeClass('active');
  //         aTabB.eq(nIndex).fadeIn(400).siblings().fadeOut(400);
  //         $('.tab_bd').find('.close').stop().on('click',function () {
  //           $('.tab_bd').find('.bd_wrap').scrollTop(0);
  //           $('body').css('overflow','auto');
  //             $('.tab_bd').fadeOut(400);
  //             aTabB.eq(nIndex).fadeOut(400);
  //           })
  //       })
  //     })
  //   }
  // }
  // mobile slide 
  function journeySlide() {
    var swipers = new Swiper('.swiper-containers',{
      // autoplay : 5000,//可选选项，自动滑动
      pagination: '.paginations',
      paginationClickable: true
    })
  }

  // swiper
  var mySwiper = new Swiper('.swiper-container',{
      autoplay : 5000,//可选选项，自动滑动
      loop : true,//可选选项，开启循环
      pagination: '.pagination',
      slidesPerView :'auto',
      loopedSlides:6,
      centeredSlides: true,
      paginationClickable: true, //
      simulateTouch : false, //禁止手指拖动
  })
    
  $('.arrow-left').on('click', function(e){
  e.preventDefault()
      var swiper = $(this).siblings('.swiper-container').data('swiper');
      mySwiper.swipePrev();
  });
  $('.arrow-right').on('click', function(e){
      e.preventDefault()
      var swiper = $(this).siblings('.swiper-container').data('swiper');
      mySwiper.swipeNext();
  });   
 
  $('.solutions .fold_wrap li').eq(0).addClass('active').siblings().removeClass('active');
  
})
// accordion 
var slideMenu = function(){
  var sp,st,t,m,sa,l,w,gw,ot;
  return{
    destruct:function(){
        if(m){
          clearInterval(m.htimer);
          clearInterval(m.timer);
        }
    },
    build:function(sm,sw,mt,s,sl,h){
      sp=s; 
      st=sw; 
      t=mt;
      m=document.getElementById(sm);
      sa=m.getElementsByTagName('li');
      l=sa.length; 
      w=m.offsetWidth; 
      gw=w/l;
      ot=Math.floor((w-st)/(l-1)); 
      var i=0;
      for(i;i<l;i++){
        s=sa[i]; 
        s.style.width=gw+'px'; 
        this.timer(s)
      }
      if(sl!=null){
        m.timer=setInterval(function(){
          slideMenu.slide(sa[sl-1])
        },t)}
    },
    timer:function(s){
      s.onmouseover=function(e){
        if( !e ) e = window.event;    
        var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;    
        while( reltg && reltg != this ) reltg = reltg.parentNode;    
        if ($(this).index() == 0) {
          $('.solutions .fold_wrap li').eq(0).removeClass('normalFocuse');
        } else {
          $('.solutions .fold_wrap li').eq(0).addClass('normalFocuse');
        }
        
        if( reltg != this ){  
          // console.log('move');
          clearInterval(m.htimer);
          clearInterval(m.timer);
          m.timer = setInterval(function(){
            slideMenu.slide(s)
          },t);

          $(this).addClass('active').siblings().removeClass('active');
          $(this).find('.adv_intro').stop(true,true).show().animate({
            'top':'30px',
            'opacity': '1'
          },0);
          $(this).find('.mask_b').stop(true,true).hide(); 
        }
      }
      s.onmouseout=function(e){
        if( !e ) e = window.event;    
        var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;    
        while( reltg && reltg != this ) reltg = reltg.parentNode;    
        if( reltg != this ){ 
          clearInterval(m.timer);
          clearInterval(m.htimer);
         
          m.htimer=setInterval(function(){
            slideMenu.slide(s,true)
          },t);
          $(this).removeClass('active');
          $(this).find('.adv_intro').stop(true,true).hide(0);
          
          $(this).find('.adv_intro').css({'opacity': '0'})
          $(this).find('.adv_intro').stop(true,true).animate ({
            'top':'60%',
          },0);
          $(this).find('.mask_b').stop(true,true).delay(200).fadeIn(); 
        }
      }
    },
    slide:function(s,c){
      var cw=parseInt(s.style.width);
      if((cw<st && !c) || (cw>gw && c)){
        var owt=0; var i=0;
        for(i;i<l;i++){
          if(sa[i]!=s){
            var o,ow; var oi=0; o=sa[i]; ow=parseInt(o.style.width);
            if(ow<gw && c){
              oi=Math.floor((gw-ow)/sp); 
              oi=(oi>0)?oi:1; 
              o.style.width=(ow+oi-3)+'px';
              //console.log(o);
            //console.log(o.style.width);
            }else if(ow>ot && !c){
              oi=Math.floor((ow-ot)/sp); 
              oi=(oi>0)?oi:1; 
              o.style.width=(ow-oi-3)+'px';
              //console.log(o);
              //console.log(o.style.width);
            }
            if(c){
              owt=owt+(ow+oi)
            }else{
              owt=owt+(ow-oi)
            }
          }
        }
        s.style.width=(w-owt-3)+'px';
      }else{
        if(m.htimer)
          clearInterval(m.htimer)
        if(m.timer)
          clearInterval(m.timer);
      }
    }
  };
}();