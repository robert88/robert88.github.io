var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
    var notification;
    if (device.sdkInt >= 26) {
        var channel = new android.app.NotificationChannel("channel_id", "channel_name", android.app.NotificationManager.IMPORTANCE_DEFAULT);
        channel.enableLights(true);
        channel.setLightColor(0xff0000);
        channel.setShowBadge(false);
        manager.createNotificationChannel(channel);
        notification = new android.app.Notification.Builder(context, "channel_id")
    } else {
        notification = new android.app.Notification.Builder(context)
    }

    var uuid=0;

    function notice(title,msg){
        notification.setContentTitle(title)
        .setContentText(msg)
        .setWhen(new Date().getTime())
        .setSmallIcon(org.autojs.autojs.R.drawable.autojs_material)
        .setTicker(msg+"状态栏")//没看到效果
        .build();
        manager.notify(uuid++, notification);
    }

    module.exports = notice;