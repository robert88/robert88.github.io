web app manifest
service worker
promise async await
fetch api
cache storage
notification

对于启动了pwa的应用来讲，在chrome下的自定义菜单（右上角三个点）里面有个安装选项 

然后在应用里面可以看到

在手机端会自动提示是否添加app

文档
https://developer.mozilla.org/en-US/docs/Web/Manifest


视频
https://www.bilibili.com/video/BV13E411e7kh?from=search&seid=6140469075767769319

支持条件
https或者localhost

文档
background_color
categories
description
dir
display
iarc_rating_id
icons
lang
name
orientation
prefer_related_applications
related_applications
scope
screenshots
serviceworker
short_name
start_url
theme_color

<link rel="manifest" href="/manifest.webmanifest">
服务器必须支持Content-Type: application/manifest+json

视频
<link rel="manifest" href="/manifest.json">


name：1、安装提示的名称，3、启动显示的名称
short_name：2、桌面显示的名称，

start_url：启动的页面地址
background_color :1、启动时候的背景色

要在chrome上起作用还得配置离线访问

service worker

web worker

let worker = new Workers("xx.js")
worker.addEventListener("message",function(e){
console.log(e.data)
})
在xx.js里面设置
self.postMessage({data:1})
