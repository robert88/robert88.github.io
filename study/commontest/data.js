	var data_js=true;
	var ROTATEiCON=[];
	var BGiCON=[];
	ROTATEiCON.push("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBT",
		"UEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAICSURBVHjapFPLaiJREK0ee+ETof",
		"HRCLpwmYUgiiuVHpjdBLIL+QHzDSGBLAIZ8g3jD4TsAskukiycjZuAi3bEnS+CSvtE8YWpcyfd0wR3aShu3VPnnFvddV",
		"va7Xb0lUeCwfHTsR074DjhOORIfmCvHA8ctxy6Sbz7cUcyku12S5lMhiqVSkGW5atAIKAqikJer1cQZ7NZ0jCM5GAwKGw",
		"2m0vmFpn7v4OjxyPkBbfb/TsWi5Hf79/b7ng8pmazSfP5/JS3xfuf9/86WK/XBzg5EomQx+Oh4XBIvV6P+v2+EAaDQQqF",
		"QuTz+QicRqNxxZ38wet8A2G1Wp3wqSp3QNwq1Wq1aafTuUilUhICOTDUwAEXGmhNg0O4cyfUarVoMpncpNPpX9gjkAND",
		"DXtwobEMlstl0ul0AqR2uy0EyO0BDDXk4EIDrfzRgXD+nOMpl8u4KC/ZbPb7Z569g1cekQAxgVKpdG6ezDVSVVVj7Bk1",
		"YOBCY/8GD91uV7jzHSCHw3EGE+whyOfzFI1GtUQiITjgQmM3uOUP9IbRuVwuisfjPsauTQNd10nTNGu84EJjGTBRXywW",
		"l/V6Xcweo4KYZ22t1WpVrNPplJj7FxrLAIVcLlccjUanTHyDEWMvuOKoYTUjHA6L12H82brKypmy72dSOXBlQdT2XW3j",
		"xpCkr/7O7wIMAId5e33ca5oMAAAAAElFTkSuQmCC");
	BGiCON.push("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAA7CAYAAAFAnpeAAAAACXBIWXMAAA",
		"7EAAAOxAGVKw4bAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQ",
		"WaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmo",
		"moAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZ",
		"BSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKx",
		"AIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38",
		"vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79",
		"pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68",
		"ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTd",
		"w0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESgg",
		"SqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiew",
		"hi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZ",
		"SBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo",
		"81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7i",
		"EeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiO",
		"JMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3Y",
		"MeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX",
		"6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhm",
		"NIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqt",
		"Zq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0",
		"R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxe",
		"S+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lz",
		"rLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXM",
		"dmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00um",
		"xvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+I",
		"t89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8h",
		"v5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrOR",
		"Z+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX",
		"5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT",
		"1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA",
		"4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJ",
		"YUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3",
		"yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2",
		"Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo",
		"0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf",
		"/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytsl",
		"t0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxde",
		"o94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv",
		"9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7n",
		"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");
	var g_polygonCollisionFlag =false,
	g_polygonDragLimit = false,
	g_userAllowSegment = false,
	g_polygonCanvas = document.getElementById("cvs"),
	
	//多边形画板
	g_left = $("#cvs").offset().left,
	g_top = $("#cvs").offset().top,
	g_w = $("#cvs").width(),
	g_h = $("#cvs").height(),
	g_polygonContext = g_polygonCanvas.getContext("2d"),
	g_polygonBgCanvas = document.getElementById("cvsbg"),
	
	//鼠标画板
	g_polygonBgContext = g_polygonBgCanvas.getContext("2d"),
	g_tipCanvas = document.getElementById("tip"),
	g_tipContext = g_tipCanvas.getContext("2d"),
	
	//鼠标画板
	g_cvsMouse = document.getElementById("cvsMouse"),
	g_cvsMouseContext = g_cvsMouse.getContext("2d"),
	g_polygonDigidEnabe = false,
	
	//刚体使能
	g_mousepolygonrotateAble = false,
	
	//鼠标按下旋转使能
	g_mouseMovX=0,
	
	//记录鼠标移动的坐标
	g_mousemovY=0,
	
	g_mouseDown = false,
	
	//鼠标按下使能
	g_mouseFilter = true,
	
	//奇偶优化
	g_mouseDragPolygon = false,
	
	//当前拖动使能
	g_polygonIdx = 0,
	
	//当前拖动多边形的索引
	g_rotatePerDirection=1,
	
	g_mouseDownRotateRadian=0,
	
	g_lockcanvas = [],
	g_pageIdx = 0;
	
	//当前题目索引
	g_html = "";
	g_p = [];	
	g_connection = false;
	
	var g_polygonData = {
		point:{x:0,y:0},
		size:{x:0,y:0},
		step:[]
	}
	
	function polygons_orgain_data(){
		return {polygons:[],newPolygons:[],inputData:[0,0,0,0,0,0,0,0],ui:"",isRight:false,tipShow:true,newPolygonType:""};
	}
	
	//工厂
	function RecordData(){
		var newDATA = [];
		for(var i = 0;i<4;i++){
			newDATA.push(polygons_orgain_data());
		}
		return newDATA;
	}
	
	var g_recordData = RecordData();
	
	var g_l = new Line({points:[new Point(),new Point()]});
