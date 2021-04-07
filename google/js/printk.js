	var newWindow;
	
	function makeNewWindow(){
		newWindow = window.open("","","status,height=700,width=500,scrollbars=yes");
	}
	
	function checkNewWindow(){
		// 测试调试窗口是否存在
		if((!newWindow)||(newWindow.closed)){
			makeNewWindow();
			var newContent = "<html><head><title>WEB UART</title>";
			newContent +="<style type='text/css'>body{margin:0;padding:0;font-size:12px;background:#ddd;overflow:scroll}</style></head>";
			newContent += "<body><h1>WEB UART</h1></body></html>";
			
			newWindow.document.write(newContent);
		}
	}
	
	function printk(info){
		checkNewWindow();
		newWindow.document.write("<br\>"+info);
		//newWindow.focus();
		newWindow.scrollTo(0,Math.pow(2,25)-2);
	}
	function printk_co(param0,info){
		checkNewWindow();
		newWindow.document.write("<p style='color:"+param0+";'>"+info+"</p>");
		newWindow.scrollTo(0,Math.pow(2,25)-2);
	}
	function printf(){
		checkNewWindow();
		var info="";
		for(var i=0;i<arguments.length;i++){
			if(!(1&i)){
				info += arguments[i].toString();
			}else{
				info += "<span style='color:red;'>"+arguments[i].toString()+"</span>";
			}
		}
		newWindow.document.write(info+"<br>");
		newWindow.scrollTo(0,Math.pow(2,25)-2);
	}
	window.onbeforeunload=function (){
		//newWindow.document.close();
		//newWindow.close();
		//newWindow = null;
	}