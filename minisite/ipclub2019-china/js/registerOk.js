$(function(){
    //注册成功跳转
    function jump(count) {
        window.setTimeout(function () {
            count--;
            if (count > 0) {
                $('.count label').html(count);
                jump(count);
            } else {
                location.href = "index.html" + window.location.search;
            }
        }, 1000);
    }
    if ($('.count').length > 0) {
        jump(3);
    }
});