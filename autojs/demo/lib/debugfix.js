var currpackage;
  global.app = {
    launch: function(appname) {
      console.log("call app.launch");
      currpackage = appname;
    }
  }
  var findOne =  function() {
    return {
      click: function() {},
      bounds:function(){return {top:100,height:100,left:100,bottom:100,right:100,width:100}},
      clickable:function(){return true},
      parent: function() { return { click: function() {} } }
    }
  }
  
  global.currentPackage = function() { return currpackage }
  global.id = function(name) {
    return {
      findOne:findOne,
      text(){return {findOne:findOne}},
      textContains(){return {findOne:function(){return false}}},
    }
  }
  global.className = global.id
  global.swipe = function(){console.log("call swipe")}
  global.click = function(){console.log("call click")}
  
  console.show = function() {}
  console.setSize = function() {}
  
  global.sleep = function() {}
  global.events = { emitter: function() {
     var stack = {};
    return {
      on: function(e, handler) {
        stack[e] = handler;
      },
      emit: function(e, args) {
        console.log("call events", e);
        if (typeof stack[e] == "function") {
          stack[e].apply(this, args);
        }
      }
    }
  } }

  global.org={autojs:{autojs:{R:{drawable:{autojs_material:{}}}}}};
  //  android.app.Notification.Builder
  global.android={app:{
    NotificationChannel:function(){
      this.enableLights = function(){}
      this.setLightColor = function(){}
      this.setShowBadge = function(){}
    },
    Service:{NOTIFICATION_SERVICE:1},
    NotificationManager:{
      IMPORTANCE_DEFAULT:1
    },
    Notification:{
      Builder:function(){

    this.setContentTitle=function(){return this;}
    this.setContentText=function(){return this;}
    this.setWhen=function(){return this;}
    this.setSmallIcon=function(){return this;}
    this.setTicker=function(){return this;}
    this.build=function(){return this;}
    return this;
  }}}};
  
  global.context={
    getSystemService:function(ret){
      if(ret==android.app.Service.NOTIFICATION_SERVICE){
        return {
          createNotificationChannel:function(){},
          notify:function(){}
        }
      }
      return {}
    }
  }

  global.device = {
    sdkInt:58,
    width:720,
    height:1920
  }
