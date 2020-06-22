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



web worker

let worker = new Workers("xx.js")
worker.addEventListener("message",function(e){
console.log(e.data)
})
在xx.js里面设置 self或者this
self.postMessage({data:1})


service worker
可以理解一个代理服务器，用于读取缓存和服务切换

window.onload=function(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("wx.js").then().catch()
  }
}


生命周期
install
activate
fetch
wx.js
```
self.addEventListener("install",()=>{
console.log()
})

self.addEventListener("activate",()=>{
console.log()
})

self.addEventListener("fetch",()=>{
console.log()
})
```

install
是在安装第一次的触发和在wx.js改变时候触发

第二次修改
install会触发，而activate会等待上一个worker停止之后执行

可以通过api跳过
self.addEventListener("install",()=>{
self.skipWaiting()//这个是异步的
})
self.addEventListener("install",(e)=>{
e.waitUntil(self.skipWaiting())//这个是异步的
})

激活之后立即获得控制权

self.addEventListener("activate",(e)=>{
console.log()
//激活之后立即获得控制权
e.waitUntil(self.clients.claim())
})


cacheStorage

caches.open(cachename).then(cach=>{})
caches.keys()获取全部缓存
caches.delete(key)//删除缓存

caches.put(req,res)
caches.add(url)
caches.addAll(urls)
caches.match()



install事件获取缓存
activate事件清除缓存
fetch事件设置缓存
```
const CACHENAME="cachekey"
self.addEventListener("install",async ()=>{
 await caches.open(CACHENAME);
 await caches.addAll("/index.html","/logo.png")
 await self.skipWaiting()
})

self.addEventListener("activate",async()=>{
  await keys = cache.keys();
  keys.forEach(key=>{
    if(key!=CACHENAME){
      caches.delete(key)
    }
  })
  await self.clients.claim()
})

self.addEventListener("fetch",async (e)=>{
const req = e.request
e.respondWith(networkFirst(req))
})

function async networkFirst(req){
  try{
    var first =await fetch(req);
    return first;
  }catch(){
    var c = await caches.open(CACHENAME);
    var cacheReq = await c.match(req);
    return cacheReq
  }
}
```
notification
```
Notification.permission
Notification.requestPermission

//default:咨询
//denied:拒绝
//granted:允许

navigator.online来判断是否有网络

if(Notification.permission=="default"){
  Notification.requestPermission()
}
if(!window.navigator.online){
new Notification("提示","当前网络")
}
window.addEventListener("online",(){
new Notification("提示","当前网络")
})

```
