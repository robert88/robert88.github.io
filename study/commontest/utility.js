var utility_js=true;
	
	function getRandom(max){
		return Math.round(max*Math.random());
	}
	function isSameQuestion(a,idx){
		for(var i=0;i<g_question.length;i++){
			if(i!=idx){
				if((a[0]==g_question[i].a[0])&&(a[1]==g_question[i].a[1])){
					return false;
				}
			}
		}
		return true;
	}
/**  
	回到最初的数据
**/
	function allReset(){
		initPolygonBaseData(g_pageIdx)
		clearGloberData();
		initBgData(g_pageIdx);
		drawBg(g_polygonBgContext,g_bgData,g_polygonData,true);
		initPolygonsData();	
		drawTip(g_tipContext,g_bgData,g_polygonData,true);
		if(g_lockcanvas[g_pageIdx]){
			redrawPolygons(g_recordData[g_pageIdx].newPolygons);
		}else{
			redrawPolygons(g_p);
		}
	}
	/*初始化背景数据*/
	function initBgData(idx){
			var x,y,w,h,x0,y0,dx,dy;
				g_bgData.initDraw =true;
				g_bgData.polygon=null;
				g_bgData.polygon=new Polygon();
				x=g_bgData.grid.x;
				y=g_bgData.grid.y;
				w=g_bgData.grid.w;
				h=g_bgData.grid.h;
				g_bgData.bgText[0].word = (idx+1)+".";//题目序号
				//直线：高 底
				for(var i=0;i<g_question[idx].line.length;i++){
						 g_bgData.line[i].x.length = 0;
						 g_bgData.line[i].y.length = 0;
						for(var j=0;j<g_question[idx].line[i].x.length;j++){
							dx =  g_question[idx].line[i].dx[j];
							dy =  g_question[idx].line[i].dy[j];
							x0 = g_question[idx].line[i].x[j];
							y0 = g_question[idx].line[i].y[j];
							g_bgData.line[i].x[j]=x0*w +x+dx;
							g_bgData.line[i].y[j]=y0*h +y+dy;
							if(g_question[idx].line[i].style){
								g_bgData.line[i].style=g_question[idx].line[i].style;
							}else{
								g_bgData.line[i].style="";
							};
						}
				}
				//拐角
				for(i=0;i<g_question[idx].turning.length;i++){
						g_bgData.turning[i].x=g_question[idx].turning[i].x*w+x;
						g_bgData.turning[i].y=g_question[idx].turning[i].y*h+y;
						g_bgData.turning[i].dx=g_question[idx].turning[i].dx;
						g_bgData.turning[i].dy=g_question[idx].turning[i].dy;
				}
				//文字：高 底
				for(i=0;i<g_question[idx].text.length;i++){
					x0=g_question[idx].text[i].x;
					y0=g_question[idx].text[i].y;
					dx =g_question[idx].text[i].dx;
					dy =g_question[idx].text[i].dy;
					g_bgData.text[i].x=x0*w+x+dx;
					g_bgData.text[i].y=y0*h+y+dy;
				}
	}
	
	/*重画背景*/
	function drawBg(c,o,data,drawFlag,newPolygon){
		if((!c)||((typeof o )!=="object")){throw "初始化背景错误 参数不对！";}
		var tempPolygon=[];
		var borderStyle;
		if(newPolygon){
			if(newPolygon.constructor===Array){
				tempPolygon=clone(newPolygon); 
			}else{
				tempPolygon.push(clone(newPolygon));
			}
			borderStyle="1px solid blue";
			drawFlag=false;
		}else{
			tempPolygon.push(new Polygon());
			borderStyle="2px solid blue";
		}
	//	console.log(tempPolygon)
		g_polygonBgCanvas.width =g_polygonBgCanvas.width;
		if(o.bgText){
			for(var i=0;i<o.bgText.length;i++){
				drawText(c, o.bgText[i].word , o.bgText[i].x , o.bgText[i].y , o.bgText[i].color, o.bgText[i].font);
			}
		}
		if(o.pic){
			for( i=0;i<o.pic.length;i++){
				drawPicture(c , o.pic[i].src, o.pic[i].x , o.pic[i].y , o.pic[i].load);
				if(!o.pic[i].load){
					o.pic[i].load = true;
				}
			}
		}
		
		if(o.grid){

			for( i=0;i<(o.grid.col+1);i++){
				drawMoveLine(c , (o.grid.x+i*o.grid.w) , o.grid.y , (o.grid.x+i*o.grid.w) , (o.grid.y+o.grid.row*o.grid.h) , o.grid.color , o.grid.border);
			}

			for( i=0;i<(o.grid.row+1);i++){
				drawMoveLine(c , o.grid.x , (o.grid.y+i*o.grid.h) , (o.grid.x+o.grid.col*o.grid.w), (o.grid.y+i*o.grid.h) ,o.grid.color , o.grid.border);
			}
		}

		for( i=0;i<tempPolygon.length;i++){
			tempPolygon[i].rotateAble = false;
			tempPolygon[i].border = borderStyle;
			tempPolygon[i].dragAble = false;
			tempPolygon[i].bgColorEable = false;
			initPolygon(tempPolygon[i],data)
			drawPolygon(c,tempPolygon[i],"blue",drawFlag)		
		}

	}
	/*画提示信息*/
	function drawTip(c,o,data,drawFlag){
		g_tipCanvas.width =g_tipCanvas.width;
		var notdashLine=true;

		if(o.text){
			for(var i=0;i<o.text.length;i++){
				drawText(c, o.text[i].word , o.text[i].x , o.text[i].y , o.text[i].color, o.text[i].font);
			}
		}


		if(o.line){
			var x,y,x1,y1;		
			var len=g_p[0].points[0].length;
			var x=o.line[0].x[0];
			var y=o.line[0].y[0];
			var x1=o.line[0].x[1];
			var y1=o.line[0].y[1];
			if(x<g_p[0].points[0].x){
				dashedLine(c , x , y, g_p[0].points[0].x ,y ,o.line[1].color, 2);	
			}else if((len>3)&&(x>g_p[0].points[3].x)){
				dashedLine(c , x , y, g_p[0].points[3].x ,y ,o.line[1].color, 2);	
			}
			if(x1<g_p[0].points[1].x){
				dashedLine(c , x1 , y1, g_p[0].points[1].x ,y1 ,o.line[1].color, 2);	
			}else if(x1>(g_p[0].points[2].x)){
				dashedLine(c ,x1 , y1, g_p[0].points[2].x ,y1 ,o.line[1].color, 2);	
			}
			var dashFlag;
			dashFlag=(x1!=g_p[0].points[1].x)&&(x1!=g_p[0].points[2].x)		
			if((x!=g_p[0].points[0].x)||dashFlag){
				o.line[0].style="dashed";
			}
			for( i=0;i<o.line.length;i++){
				for(var  j=1 ; j<o.line[i].x.length;j++){
					if(o.line[i].style=="dashed"){
						dashedLine(c , o.line[i].x[j-1] , o.line[i].y[j-1] , o.line[i].x[j] , o.line[i].y[j] , o.line[i].color, o.line[i].border);
					}else{
						drawMoveLine(c , o.line[i].x[j-1] , o.line[i].y[j-1] , o.line[i].x[j] , o.line[i].y[j] , o.line[i].color, o.line[i].border);
					}
				}
			}
			o.line[0].style="";
		}
		
		if(o.turning){
			var tx0,ty0,tx1,ty1,tx2,ty2,tp;
			for(i=0;i<o.turning.length;i++){
				tp=o.turning[i];
				tx0=tp.x;
				ty0=tp.y+tp.dy[0]*tp.dy[1];
				
				tx1=tp.x+tp.dx[0]*tp.dx[1];
				ty1=tp.y+tp.dy[0]*tp.dy[1];
				
				tx2=tp.x+tp.dx[0]*tp.dx[1];
				ty2=tp.y;
				//drawDot(c,tx2,ty2,5,"red");
				//debugger;
				if(o.turning[i].style=="dashed"){
					dashedLine(c ,tx0, ty0 , tx1 , ty1 , o.turning[i].color, o.turning[i].border);
					dashedLine(c ,tx1, ty1 , tx2 , ty2 , o.turning[i].color, o.turning[i].border);
				}else{
					drawMoveLine(c ,tx0, ty0 , tx1 , ty1 , o.turning[i].color, o.turning[i].border);
					drawMoveLine(c ,tx1, ty1 , tx2 , ty2 , o.turning[i].color, o.turning[i].border);
				}
			}
		}
	}
	/*初始化多边形数据 清除g_p数据*/
	function initPolygonsData(){
			resetPolygonsData();
			updatePolygonsData(g_p);
	}
	/*重设多边形数据*/
	function resetPolygonsData(){
			g_p =null;
			g_l = null;
			g_p = [];
			g_p[0]= new Polygon();
			//console.log(g_p[0].constructor)
			var g_l = new Line({points:[new Point(),new Point()]});
			g_userAllowSegment =false;	
			updateButtonStyle();
	}
	/*清除数据*/
	function clearMouseData(){
		g_mousepolygonrotateAble= false;
		g_mouseDragPolygon=false;
		g_mouseDown =false;
	}
	function clearGloberData(){
		clearMouseData();
		g_polygonIdx=0;
	}
	/*初始化多边形顶点数据*/
	function initPolygonBaseData(idx){
		g_polygonData.point.x=g_bgData.grid.x;
		g_polygonData.point.y=g_bgData.grid.y;
		g_polygonData.size.x=g_bgData.grid.w;
		g_polygonData.size.y=g_bgData.grid.h;
		g_polygonData.length = 0;
		for(var i=0;i<g_question[idx].stepX.length;i++){
			g_polygonData.step[i] = new Point();
			g_polygonData.step[i].x=g_question[idx].stepX[i]
			g_polygonData.step[i].y=g_question[idx].stepY[i]
			//console.log("what",g_question[idx].stepX[i])
		}
	}
	/*重画多边形*/
	function redrawPolygons(obj){
		g_polygonCanvas.width=g_polygonCanvas.width;
		drawPolygon_s(g_polygonContext, obj, false);
	}
	/*****************************************************************************
	用户交互
	******************************************************************************/
	/*验证答案a*/
	function check_A_answer(obj){
	var ansVal=0;
	var isRight = true;
	var $input=$(".a .num input");
		for(var i=0;i<$input.length;i++){
			ansVal= $input.eq(i).val();
			g_recordData[g_pageIdx].inputData[i]=ansVal;
			//console.log(g_question[g_pageIdx].a[i])
			if( ansVal != g_question[g_pageIdx].a[i]){
				isRight =false;
				break;
			}
		}
		//isRight=true;
		if(g_test||isRight){
			$("#tip").hide();
			g_recordData[g_pageIdx].tipShow=false;
			$(".b").show();
			$(".a .wrong").hide();
			$(".a .right").show();
			$(obj).hide();
			for(var i=0;i<g_question[g_pageIdx].a.length;i++){
				$(".a .num0"+i+" input").attr("readonly",true);
			}
		}else{
			$(".a .right").hide();
			$(".a .wrong").show();
		}
	}
	/*允许分割*/
	function allowSegment(obj){
		g_userAllowSegment =true;
		updateButtonStyle(obj);
	}
	/*克隆对象*/
	function clonePolygon(obj){
		close_b_prompt()
		updateButtonStyle(obj);
		if(g_p.length<2){
			g_p.push(clone(g_p[g_polygonIdx]));
		}
	}
	function close_b_prompt(){
		if($(".b .prompt").attr("display")!=="none"){
			$(".b .prompt").hide();
		}
	}
		/*重设画布*/
	function canvasReset(){
		close_b_prompt();
		clearGloberData();
		initPolygonsData();
		redrawPolygons(g_p);
		g_cvsMouse.width=g_cvsMouse.width;
	}
		/*更新数据*/
	function updatePolygonsData(_p_s){
		initPolygon_s(_p_s,g_polygonData);
		initPolygons_rotateArea(_p_s);
	}
	function check_B_connection(){
		var newPolygons=[];
		var ds01,ds02,grid,equilateral;//边
		var ds=2;//直线距离 2px的误差
		var da01,da03,da90;	
		var da=Math.PI/90;//角度 两度的误差
		var polygonType={en:"",cn:""};	
		var showNextQuestion = false;
		var isConnection = false;
		var notConnection = false;//不合并底

		newPolygons=PolygonConnection_s(g_p);
		updatePolygonsData(newPolygons);
		ds01=getDistance(newPolygons[0].points[0].x,newPolygons[0].points[0].y,newPolygons[0].points[1].x,newPolygons[0].points[1].y)
		ds02=getDistance(newPolygons[0].points[1].x,newPolygons[0].points[1].y,newPolygons[0].points[2].x,newPolygons[0].points[2].y)
		equilateral=Math.abs(ds01-ds02);
		if(g_question[g_pageIdx].a.length!=3){
			grid=g_question[g_pageIdx].a[0]*g_bgData.grid.w;//底边长
		}else{
			grid=ds01;
		}
		da02=Math.abs(newPolygons[0].angles[0]-newPolygons[0].angles[2]);
		da13=Math.abs(newPolygons[0].angles[1]-newPolygons[0].angles[3]);
		da90=Math.abs(newPolygons[0].angles[0]-Math.PI/2);
		if(g_lmtSeg <2){
			notConnection=!((Math.abs(ds01-grid)<ds)||(Math.abs(ds02-grid)<ds));
		}
		//console.log(g_lmtSeg)
		if((newPolygons.length==1)){
			if(!notConnection){
				polygonType.en="ok";
				polygonType.cn="多邊形";
			}
		}
		if((polygonType.en==="ok")&&(newPolygons[0].angles.length==4)){
			polygonType.en="quadrilateral";
			polygonType.cn="四邊形";
		}
		if((da02<da)&&(da13<da)&&(polygonType.en==="quadrilateral")){
			polygonType.en="parallelogram";
			polygonType.cn="平行四邊形";
		}
		if((da90<da)&&(polygonType.en==="parallelogram")){
			polygonType.en="rectangle";
			polygonType.cn="長方形";
		}
		if((equilateral<=ds)&&(polygonType.en==="rectangle")){
			polygonType.en="square";
			polygonType.cn="正方形";

		}
		//console.log(newPolygons.length+" "+notConnection)
		if(g_lmtSeg <2){
			showNextQuestion=(polygonType.en==="parallelogram")||(polygonType.en==="rectangle")||(polygonType.en==="square");//平行四边形对角相等
		}else{
			showNextQuestion=(polygonType.en==="rectangle")||(polygonType.en==="square");//平行四边形对角相等
		}
		return{polygons:newPolygons,type:polygonType,isRight:showNextQuestion}
	}
	/*检验答案b*/
	function check_B_answer(check){
		var temp = {};
		close_b_prompt()		
		if(check==="connection"){//确定
	
			if(g_p.length>=2){
				temp=check_B_connection();
				//console.log(temp.isRight)
				if(g_test||temp.isRight){
					redrawPolygons(temp.polygons);
					g_connection=true
				}
			}
		}else{
			if(g_p.length>=2){//计算
				temp=check_B_connection();
				if(g_test||(temp.isRight&&g_connection)){
					redrawPolygons(temp.polygons);
					$(".c").show();
					$(".c .calculate").show();
					$(".b input").hide();	
					//锁住画布
					g_lockcanvas[g_pageIdx] = true;
					//取消选中。记录中用到
					g_p[g_polygonIdx].selected= false;		
					//当前多边形
					g_recordData[g_pageIdx].polygons=clone(g_p);
					//合并的多边形
					g_recordData[g_pageIdx].newPolygons=temp.polygons;//clone(g_p);
					//合并的多边形的类型
					g_recordData[g_pageIdx].newPolygonType=temp.type;//clone(g_p);
					//合并参考线
					drawBg(g_polygonBgContext,g_bgData,g_polygonData,true,g_p);	
				}else{
					$(".b .prompt").show();
				}
			}
		}
				
	
	}
	/*检验答案c*/
	function check_C_answer(){
			var userAns = [];
			var $input=$(".c .num input");
			var aLen=$(".a .num input").length;
			var cLen=$input.length;
			var userFlag3=true;
			var userFlag4=true;
			var hasSelect=$("#selectType").length;
			for(var i=0;i<cLen;i++){
				g_recordData[g_pageIdx].inputData[aLen+i]=userAns[i]=parseFloat($input.eq(i).val(),10)||0;
				if((i>1)&&(userFlag3)){
					if(userAns[i]!=g_question[g_pageIdx].c[i]){
						userFlag3=false;
					}
				}
				
			}
			var newPolygonType=g_recordData[g_pageIdx].newPolygonType;
			if(hasSelect>0){
				var userType=g_recordData[g_pageIdx].inputData[aLen+cLen]=$.trim($("#selectType").find("option:selected").val()||"");			
				 userFlag4=(newPolygonType.en===userType)||(userType==="parallelogram");			
			}
			var userFlag1=(userAns[0]===g_question[g_pageIdx].c[0])&&(userAns[1]===g_question[g_pageIdx].c[1]);
			var userFlag2=(userAns[0]===g_question[g_pageIdx].c[1])&&(userAns[1]===g_question[g_pageIdx].c[0]);

			//console.log(userAns[0]+" "+userAns[1])
			//console.log(userFlag1||userFlag2)
			//console.log(userFlag3+" "+userFlag4)
			if(g_test||(userFlag1||userFlag2)&&(userFlag3)&&(userFlag4)){
				$(".c .prompt").show();
				$(".c .right").show();
				$(".c .wrong").hide();
				$(".c input").attr("readonly",true);
				$(".c .btn_blue").hide();
				g_recordData[g_pageIdx].isRight=true;
				if(	hasSelect>0){
					$(".question0"+g_pageIdx+" .selectAns").html(newPolygonType.cn);
					$("#selectType").attr("disabled", true)				
				}
				updateButtonUi();
			}else{
				$(".c .right").hide();
				$(".c .wrong").show();
			}
	}
	/*上一题*/
	function perPage(obj){
		if(g_pageIdx>0){
			g_recordData[g_pageIdx].ui=$(".user .ansui").html();
			g_pageIdx--;			
			updateUserUi();
			allReset();
		}
	}
	/*下一题*/
	function nextPage(obj){
		if(g_test||g_recordData[g_pageIdx].isRight){
			if(g_pageIdx<g_question.length-1){
				g_recordData[g_pageIdx].ui=$(".user .ansui").html();	
				g_pageIdx++;
				updateUserUi();
				allReset();
			}
		}
	}
	/*更新canvas控制按钮状态*/
	function updateButtonStyle(obj){
		$("body").find(".selectStyle").css("color","#fff");
		$("body").find(".selectStyle").removeClass("selectStyle");
		
		if(obj){
			$(obj).addClass("selectStyle");
			$("body").find(".selectStyle").css("color","#000");
		}
	}
	/*重置c答案*/
	function resetC(){
		$(".c input[type=number]").val(0);
	}
	/*显示 记录*/
	function recordShow(){
		var canvas=[];
		var context=[];
	
		g_recordData[g_pageIdx].ui=$(".user .ansui").html();
		var len=g_recordData.length;
		for( i=0;i<len;i++){
				initPolygonBaseData(i);
				initBgData(i);
				canvas[i]=document.getElementById("cvsAns"+i);
				context[i]=canvas[i].getContext("2d");
				canvas[i].width=canvas[i].width;
				drawBg(context[i],g_bgData,g_polygonData,true);
				if(i<g_pageIdx){
					
				}
				if(!g_recordData[i].tipShow){//答完第一题
					$(".question0"+i+" .anstext p").eq(0).show();
					if(g_lockcanvas[i]){//答完第二题
						$(".question0"+i+" .anstext p").eq(1).show();
						drawPolygon_s(context[i], g_recordData[i].polygons, false);
						if(g_recordData[i].isRight){//答完第三题
							$(".question0"+i+" .anstext p").eq(2).show();
							if(i!==(len-1)){
								$(".question0"+(i+1)+" .ansLayout").show();
							}
						}				
					}
				}				
		}
		$(".user").hide();
		$(".useAns").show();	
	}
	/*g更新用户作答界面*/
	function updateUserUi(){
		if(g_recordData[g_pageIdx].ui===""){
			g_recordData[g_pageIdx].ui=g_html;
		}

		if(g_recordData[g_pageIdx].tipShow){//判断是否答完第一题
				$("#tip").show();
		}else{
				$("#tip").hide();
		}
		updateButtonUi();
		$(".user .ansui").html("");
		$(".user .ansui").html(g_recordData[g_pageIdx].ui);
		var $aInput=$(".a .num input"),
			$cInput=$(".c .num input"),
			aLen=$aInput.length,
			cLen=$cInput.length;	
		for(i=0;i<aLen;i++){
			$aInput.eq(i).val(g_recordData[g_pageIdx].inputData[i]);
		}
		for(i=0;i<cLen;i++){
				$cInput.eq(i).val(g_recordData[g_pageIdx].inputData[aLen+i]);
		}
		if($("#selectType").length>0){
			$("#selectType").val(g_recordData[g_pageIdx].inputData[aLen+cLen]).attr("selected",true);
		}
	}
	/*更新button的界面*/
	function updateButtonUi(){

		//remove_btn_Position(".per_button");
	//	remove_btn_Position(".next_button");
	//	remove_btn_Position(".record_button");
		if(g_pageIdx==(g_question.length-1)){
				$(".next_button").hide();
				$(".per_button").show();
			//	$(".per_button").addClass("p1");
			//	$(".record_button").addClass("p2");
		}else if(g_pageIdx==0){	
				$(".per_button").hide();
				if(g_recordData[g_pageIdx].isRight){//答完第三题
					$(".next_button").show();
				//	$(".next_button").addClass("p1");
				//	$(".record_button").addClass("p2");
				}else{
					$(".next_button").hide();
				//	$(".record_button").addClass("p1");
				}
				
		}else{
				$(".per_button").addClass("p1");
				$(".per_button").show();
				if(g_recordData[g_pageIdx].isRight){//答完第三题
					$(".next_button").show();
				//	$(".next_button").addClass("p2");
				//	$(".record_button").addClass("p3");
				}else{
					$(".next_button").hide();
				//	$(".record_button").addClass("p2");
				}
		}
	}
	/*刪除定位*/
	function remove_btn_Position(type){
		$(type).removeClass("p1")
		$(type).removeClass("p2")
		$(type).removeClass("p3")
	}
	/*显示 记录*/
	function recordback(){

		initPolygonBaseData(g_pageIdx);
		initBgData(g_pageIdx);
		if(g_lockcanvas[i]){//答完第二题
			drawBg(g_polygonBgContext,g_bgData,g_polygonData,true);
		}else{
			drawBg(g_polygonBgContext,g_bgData,g_polygonData,true,g_p[0]);
		}
		$(".user").show()
		$(".useAns").hide()		
		updateUserUi();
	}
	/*显示使用说明*/
	function turnToInfo(){
		$(".info").show();
		$(".user").hide();
	}
		/*显示使用说明*/
	function infoBack(){
		$(".info").hide();
		$(".user").show();
	}
	function inputNumber(obj){
		var val=$(obj).val();
		var clear=!(/^\d/.test(val));
		if(clear){
			$(obj).val("");
		}
	}
	function restartHTML(){
		g_pageIdx=0;
		clearGloberData();
		g_lockcanvas.length=0
		g_recordData.length=0
		g_recordData=RecordData();
		initRandom(g_question.length-1);
		allReset();
		updateUserUi();
		$(".showAns p").hide();
		$(".showAns .ansLayout").hide();
		$(".question00 .ansLayout").show();
		recordShow();
	}