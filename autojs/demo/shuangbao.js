auto.waitFor();

var height = device.height;
var width = device.width;
setScreenMetrics(1080, 2400);
// waitForActivity("com.jm.video.ui.main.MainActivity");
doit("刷宝短视频");
toast("准备开启刷宝短视频");
doit("刷宝短视频");

shell("am force-stop com.jm.video", true);

function doit(app) {
    launchApp(app);
    sleep(3500);
    for (var i = 0; i < 11; i++) {
        sleep(1500);
        id("com.jm.video:id/comment").waitFor();
        id("com.jm.video:id/comment").findOne().click();
        sleep(1500);
        if (text("暂不支持评论").exists()) {
            back(); sleep(1000);
            swipe(width / 2, height - 600, width / 2, 0, 600);
            continue;
        }
        var comment = id("com.jm.video:id/editComment");
        comment.waitFor();
        comment.click();

        // var r = http.get("sslapi.hitokoto.cn/?encode=text").body.string();
        var r = http.get("http://honeygain.cn/dpjs").body.string();
        r = r.split(/[(\r\n)\r\n]+/);
        r = r[random(0, r.length - 1)];

        sleep(1500);
        id("com.jm.video:id/et_comment").waitFor();
        id("com.jm.video:id/et_comment").click();
        id("com.jm.video:id/et_comment").findOne().setText(r);
        //KeyCode(66);
        click(1010, 2308);
        sleep(2000);
        while (!id("com.jm.video:id/comment").exists()) { sleep(200); back(); sleep(500); }
        press(width / 2, height / 2, 1);
        sleep(100);
        press(width / 2, height / 2, 1);

        sleep(random(5, 15) * 1000);
        swipe(width / 2, height - 600, width / 2, 0, 500);
    }
    no_comment();
}

function no_comment() {
    sleep(3000);
    for (var i = 0; i < 200; i++) {
        sleep(3000);
        press(width / 2, height / 2, 1);
        sleep(100);
        press(width / 2, height / 2, 1);

        sleep(random(5, 15) * 1000);
        swipe(width / 2, height - 600, width / 2, 0, 500);
    }
}
