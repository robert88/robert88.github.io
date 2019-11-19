1、浏览器禁用js   
< html  class ="no-js"  >   

2、浏览器文档语言   
< html  lang="en" > 

3、文档编码  
<meta charset="utf-8">  
应该放到<title>之前 
  
4、文档简短描述  
< meta  name = “ description ”  content = “这是一个描述” >  
  
5、窄屏优化  
对应正对移动做过样式优化（响应式、媒体查询），viewport应该1:1还原,对应想在移动端直接看pc端的样式，那么viewPort就应该是默认，让移动端可以自由伸缩网页来查看页面
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86">

5、PWAs
<link rel="manifest" href="site.webmanifest">

6、小图标
favicon.ico
浏览器默认会请求这个

参考地址：
规范
https://github.com/h5bp/html5-boilerplate/blob/v7.2.0/dist/doc/html.md
pwas
https://developer.mozilla.org/en-US/docs/Web/Manifest
