	var polygon_js = true;

	function Point(obj){
		this.x=obj&&obj.x||0;
		this.y=obj&&obj.y||0;
		this.r=obj&&obj.r||2;
		this.color =obj&&obj.color||"black";
		this.visible =true;
		this.close= false;
	}
	function Line(obj){
		this.points=obj&&obj.points||[];
		this.color =obj&&obj.color||"black";
		this.size =obj&&obj.size||1;
		this.style =obj&&obj.style||"solid";
		this.visible = true;
		this.vertor={x:0,y:0};
		this.k=0;
		this.distance=0;
	}
	function Polygon(obj){
		this.points=obj&&obj.points||[];
		this.bgColor = obj&&obj.bgColor||"rgba(116,150,188,0.5)";
		this.border ="2px solid black";
		this.bgColorEable = true;
		this.visible = true;
		this.rotateAble =false;//canvas api 旋转功能
		this.dragAble= true;
		this.lines	= [];
		this.collisionPoints=[];
		this.validcollisionPointsNum=0;
		this.angles = [];
		this.rotate_radian=0;
		this.heart={x:0,y:0};
		this.rotateArea={x:0,y:0,r:10};
		this.selected = false;
	}

/**********************************************************************
	初始化函数 40~168
**/
	/*
			初始化	多个	多边型
	**/
	function initPolygon_s(_p_s,_data){
			for(var i=0;i<_p_s.length;i++){
					initPolygon(_p_s[i], _data);
			}
	}
	/*
			单独初始化	多个	旋转区域
	**/
	function initPolygons_rotateArea(_p_s){
			for(var i=0;i<_p_s.length;i++){
				getrotateArea(_p_s[i],16,16)
			}
	}
	/*
			初始化	多边型
	**/
	function initPolygon(_p,_data){
			getPoints(_p,_data);
			getheart(_p);
			initPolygonLine_s(_p,_p.border);
			getAngle_s(_p);
	}
	/*
			初始化	多边型	顶点
	**/
	function getPoints(_p,_data){
			if(_p.points.length < 3 ){
				if(!_data){throw "初始化坐标错误 未传初始化数据";}
				var x=_data.point.x;
				var y=_data.point.y;
				var w=_data.size.x;
				var h=_data.size.y;
				var step=_data.step;
				var len =step.length;
			//	console.log(x+" "+y+" "+w+" "+h)
				for(var i =0;i<len;i++){
					_p.points[i] =new Point();
					_p.points[i].x = x + w*step[i].x;
					_p.points[i].y = y + h*step[i].y;
				}
				_p.points[len-1].close = true;
			}
	}
	/*
			初始化	多边型	重心(有误差)
	**/

		function getheart(_p){
				var x=0,y=0,len=_p.points.length;
				if(len<3){throw "未初始化多边形！缺省顶点";}
				for(var i=0;i<len;i++){
					x += _p.points[i].x;
					y += _p.points[i].y;
				}
				_p.heart.x=x/len;
				_p.heart.y=y/len;
				 //drawDot(g_polygonBgContext,_p.heart.x,_p.heart.y,5,"red")
		}
	/*
			初始化	多边型	边
	**/
	function initPolygonLine_s(_p,style){
		var x0,y0,x1,y1;
		var len= _p.points.length;
		if(len<3){throw "多边形顶点不能少于3"}
		var next=0;
		for(var i=0;i<len;i++){
			next=getNextIndex(i,len)
			x0=_p.points[i].x;
			y0=_p.points[i].y;
			x1=_p.points[next].x;
			y1=_p.points[next].y;
			_p.lines[i]=initPolygonLine(x0,y0,x1,y1,style);
		}
	}
	function initPolygonLine(x0,y0,x1,y1,style){
			var l= new Line({points:[new Point(),new Point()]});
			l.points[0].x=x0;
			l.points[0].y=y0;
			l.points[1].x=x1;
			l.points[1].y=y1;
			l.vertor.x=x0-x1;
			l.vertor.y=y0-y1;
			l.k=getK(x0,y0,x1,y1);
			l.distance = getDistance(x0,y0,x1,y1);
			if(style){
				var styleObj=getBorderStyle(style);
				l.style = styleObj.borderStyle;
				l.color = styleObj.borderColor;
				l.size = parseInt(styleObj.borderSize,10);
			}
			return l;
	}
	/*
			获得	直线样式
	**/
	function getBorderStyle(style){
		if(style.constructor!==String){throw "转变边框样式参数出错";}
		var space= /\s+/;
		var s1=/.*(solid|dashed)/.exec(style);
		var s2=/.*(\d+px)/.exec(style);
		var s=style.split(space);
		var s3;
		if(s.length!==3){throw "边框样式出错，格式长度不对";}
		for(var i=0;i<s.length;i++){
			if((s[i]!==s1[1])&&(s[i]!==s2[1])){
				s3=s[i];
				break;
			}
		}
		return {borderColor:s3,borderSize:s2[1],borderStyle:s1[1]};
	}
	/*
			获得	直线斜率
	**/
	function getK(x0,y0,x1,y1){
		if(x0!==x1){
			return (y1-y0)/(x1-x0);
		}else{
			return Infinity;
		}
	}
	/*
			获得	两点	距离
	**/
	function getDistance(x0,y0,x1,y1){
		var dx = x0-x1;
		var dy = y0-y1;
		return	(Math.sqrt(dx*dx+dy*dy));
	}
	
	/*
			获得	多边形	夹角
	**/
	function getAngle_s(_p){
			var len=_p.points.length;
			var pi =  Math.PI;
			_p.angles[0]=pi-getAngle(_p.lines[0].vertor,_p.lines[len-1].vertor);
			for(var i=1;i<len;i++){
					_p.angles[i]=pi-getAngle(_p.lines[i-1].vertor,_p.lines[i].vertor);
			}
			if(len!==_p.angles.length){throw "多边形夹角计算错误";}
	}
	/*
			获得	两个向量	夹角
	**/
	function getAngle(vertor0,vertor1){
		if((typeof vertor0 !=="object")||(typeof vertor0 !=="object")){
			throw " 计算向量的夹角出错，参数不是向量";
		}
		var x0 = vertor0.x;
		var y0 = vertor0.y;
		var x1 = vertor1.x;
		var y1 = vertor1.y;
		return	Math.acos((x0*x1+y0*y1)/(Math.sqrt(x0*x0+y0*y0)*Math.sqrt(x1*x1+y1*y1)));
	}
	
/**********************************************************************
	数据处理函数
**/
	/*
			获得	直线与多边形碰撞	交点坐标
	**/
	function polygon2LineCrash(_p,l,accuracy){
				var len=_p.lines.length;
				var num=0;
					_p.collisionPoints.length=0;
					for(var i=0;i<len;i++){
						_p.collisionPoints[i]=line2LineCrash(_p.lines[i],l,accuracy);
						if(_p.collisionPoints[i].visible){
							num++;
						}
					}
					_p.validcollisionPointsNum=num;
					//for(var i=0;i<_p.collisionPoints.length;i++){
						//	if(l.points.length>=2){drawDot(g_polygonBgContext,_p.collisionPoints[i].x,_p.collisionPoints[i].y,3,"blue");}
				//	}

	}
	/*
			获得	直线与直线碰撞	交点坐标
	**/
	function line2LineCrash(line0,line1,accuracy){
		if((line0.constructor!==Line)||(line1.constructor!==Line)){throw "直线与直线的交点出错，参数不是直线对象";}
		var newPoint = new Point();
		var x0 = line0.points[0].x , 
			y0 = line0.points[0].y , 
			k0 = line0.k ;
		var x1 = line1.points[0].x , 
			y1 = line1.points[0].y , 
			k1 = line1.k ;
			if(k1!==k0){
				if(k0===Infinity){//line0直线为垂直线
					newPoint.x = x0;
					newPoint.y = k1*(x0-x1)+y1;//将x0代入line1方程中
				}else{
					if(k1===Infinity){//line1直线为垂直线
						newPoint.x=x1;
						newPoint.y=k0*(x1-x0)+y0;//将x1代入line0方程中
					}else{
						newPoint.x=(y1-y0+k0*x0-k1*x1)/(k0-k1);
						newPoint.y=(k0*y1-k1*y0+(x0-x1)*k0*k1)/(k0-k1);
					}
				}
			}else{
				newPoint.x=newPoint.y=Infinity;
			}

			if(line1.points.length==2){//如果直线是线段
				checkPoint2Point(newPoint,line1,accuracy);
			//	console.log("zhixian"+newPoint.visible)				
			}

			if(line0.points.length==2){
				checkPoint2Point(newPoint,line0,accuracy);
			}

			return newPoint;
	}
	/*
			检验交点是否在线段中
	**/
	function checkPoint2Point(point,line,accuracy){
	if((point.constructor!==Point)||(line.constructor!==Line)){throw "检验交点是否在线段,参数错误";}
		var x_s=getMaxAndMin(line.points[0].x,line.points[1].x);
		var y_s=getMaxAndMin(line.points[0].y,line.points[1].y);
		var overX=(x_s[0]>(point.x+accuracy))||((point.x-accuracy)>x_s[1]);
		var overY=(y_s[0]>(point.y+accuracy))||((point.y-accuracy)>y_s[1]);
		if((overX||overY)){
			point.visible = false;
		}
	}
	/*
			获得 两点最小值和最大值
	**/
	function getMaxAndMin(x0,x1){
		return [Math.min(x0,x1),Math.max(x0,x1)];
	}
	/*
			检测 两点是否重合
	**/
	function checkSamePoint(point0,point1,accuracy){
		if((point0.constructor!==Point)||(point1.constructor!==Point)){throw "检测两点重合，参数错误";}
		if(!accuracy){
			accuracy=5;
		}
		//console.log(accuracy)
		var dis=getDistance(point0.x,point0.y,point1.x,point1.y);
		if(dis<accuracy){
		//	drawDot(g_polygonBgContext,point0.x,point0.y,5,"blue");
			//console.log("ture")
			return true;
		}else{
			return false;
		}
	}
	/*
			通过交点分割多边形
	**/
	function segment(_p,accuracy){
				var temp1=[],temp2=[],temp3=[];
				var len = _p.points.length;
				var n=0;
				var record = [];
				var segmentFlag=false;
				for(var i=0;i<len;i++){
					temp1[i] = new Point();
					temp1[i].x =_p.points[i].x;
					temp1[i].y =_p.points[i].y;
				}
				//console.log(_p.collisionPoints)
				var segmentLen = 1;
				var collNext;
					for( i=0;i<len;i++){//将交点插入到剪切多边形中
						collNext=getNextIndex(i,len);	
						//console.log(collNext)
						if(checkSamePoint(_p.collisionPoints[i],_p.points[collNext],accuracy)){//跳过重合的点	
							continue;		
						}else{
							if(_p.collisionPoints[i].visible){	
								//drawDot(g_polygonContext,_p.collisionPoints[i].x,_p.collisionPoints[i].y,5,"red")		
								temp1.splice(i+segmentLen,0,_p.collisionPoints[i]);//插在i的前面
								record.push(i+segmentLen); //记录交点的位置		
								segmentLen++;//长度增加								
							}						
						}				
					}

					for( n=0,i=0;i<record[0]+1;i++){//分割出第一个图像
						segmentFlag=(n==0)||((n!==0)&&(!(checkSamePoint(temp1[i],temp2[n-1]))));
						if(segmentFlag){//跳过重合的点
							temp2[n] =new Point();
							temp2[n].x=temp1[i].x;
							temp2[n].y=temp1[i].y;
							n++;
						}
					}
					for( i=record[1];i<temp1.length;i++){//分割出第一个图像	
						segmentFlag=(n==0)||((n!==0)&&(!(checkSamePoint(temp1[i],temp2[n-1]))));
						if(segmentFlag){//跳过重合的点
							temp2[n] =new Point();
							temp2[n].x=temp1[i].x;
							temp2[n].y=temp1[i].y;
							n++;
						}
					}
					for( n=0,i=record[0];i<record[1]+1;i++){//分割出第二个图像
						segmentFlag=(n==0)||((n!==0)&&(!(checkSamePoint(temp1[i],temp3[n-1]))));
						if(segmentFlag){
							temp3[n] =new Point();
							temp3[n].x=temp1[i].x;
							temp3[n].y=temp1[i].y;		
							n++;
						}	
					}
				//	console.log(record)
				//	console.log("temp2 "+temp2);
					//console.log("temp3 "+temp3);
					var tempLen2=temp2.length;
					if(tempLen2>2){
						if(checkSamePoint(temp2[0],temp2[tempLen2-1])){
							temp2.shift();
						}
					}
					
					var tempLen3=temp3.length;
					if(tempLen3>2){
						if(checkSamePoint(temp3[0],temp3[tempLen3-1])){
							temp3.shift();
						}
									
					}
					tempLen2=temp2.length;
					tempLen3=temp3.length
				if((tempLen2>2)&&(tempLen3>2)){
						temp2[tempLen2-1].close =true;
						temp3[tempLen3-1].close =true;	
					var newPolgon1=new Polygon({points:temp2});
					var newPolgon2=new Polygon({points:temp3});
					return [newPolgon1,newPolgon2];
				}else{
					return null;
				}

	}
	/*
			获得 交点 个数
	**/
	function getcollisionPointNum(_p,_x){
			var len=0;
			var cp =_p.collisionPoints;
			for(var i=0;i<cp.length;i++){
				if(cp[i].visible){
					len++;
				}
			}
			return len;
	}
	/*
			检测 点 在多边形内
	**/
	function isPointInPolygon(_p, _x, _y,accuracy){
		var l=new Line({points:[new Point()]});//构建一个水平线。
		l.points[0].y=_y;
		polygon2LineCrash(_p,l,accuracy);
		var len=PointLeftNum(_p, _x,accuracy);//在点左边的个数*/
		if(len%2){
			return true;
		}else{
			return false;
		}
	}
	/*
			检测 多边形交点 在点的坐标的个数
	**/
	function PointLeftNum(_p,_x,accuracy){
		if(_p.constructor!==Polygon){throw "检测 点是否在多边形中错误 ：参数错误";}
		var num=0;
		var next=0;
		var len=_p.collisionPoints.length;
		for(var i=0;i<len;i++){
			next=getNextIndex(i,len);
			if(_p.collisionPoints[i].x<_x){
				if(point2Point2point(_p.collisionPoints[i],_p.points[i],_p.points[next],accuracy)){
					num++;
				}
			}
		}
		return num;
	}
	/*
			检测 多边形交点 是否有效
	**/
	function point2Point2point(point0,point1,point2,accuracy){
		if((point0.constructor!==Point)||(point1.constructor!==Point)||(point2.constructor!==Point)){
			throw "检测交点是否在存在错误：参数错误";
		}
		if(point0.visible){//如果该点是可见的
			if(checkSamePoint(point0,point1,accuracy)){//交点和顶点重合
				if(point0.y>(point2.y+accuracy)){//误差精度必须保持一致（bug 两点连线接近水平线，但又不是水平线点会认为在外部）
					return true;
				}
			}else if(checkSamePoint(point0,point2,accuracy)){
				if(point0.y>(point1.y+accuracy)){
					return true;
				}
			}else{
				if(((point0.y-point1.y)*(point0.y-point2.y))<0){
					return true;
				}
			}
		}
		return false;
	}
	/*
			移动多边形
	**/
	function movePolygon(_p,offx,offy){
			for( i=0;i<_p.points.length;i++){
				_p.points[i].x+=offx;
				_p.points[i].y+=offy;
			}
			_p.rotateArea.x+=offx;
			_p.rotateArea.y+=offy;
	}
	/*
			克隆对象
	**/
	function clone(obj){  
		var o;  
		switch(typeof obj){  
		case 'undefined': break;  
		case 'string'   : o = obj + '';break;  
		case 'number'   : o = obj - 0;break;  
		case 'boolean'  : o = obj;break;  
		case 'object'   :  
			if(obj === null){  
				o = null;  
			}else{  
				if(obj instanceof Array){  
					o = [];  
					for(var i = 0, len = obj.length; i < len; i++){  
						o.push(clone(obj[i]));  
					}  
				}else{  
					o = new (obj.constructor)();  //与obj保持一致
					for(var k in obj){  
						o[k] = clone(obj[k]);  
					}  
				}  
			}  
			break;  
		default:          
			o = obj;break;  
		}  
		return o;     
	}  
	/*
			旋转 多边形
	**/
	function rotatePolygon(_q,angle){
			var temp;	
			var len= _q.points.length;
			for(var i=0;i<len;i++){
				temp=convertCoorByAngle(_q.points[i].x, _q.points[i].y, _q.heart.x, _q.heart.y,angle);
				_q.points[i] =temp;
			}
			_q.points[len-1].close=true;
			temp = convertCoorByAngle(_q.rotateArea.x, _q.rotateArea.y, _q.heart.x, _q.heart.y,angle);
		_q.rotateArea.x =temp.x;
		_q.rotateArea.y =temp.y;
	}
	/*
			根据 角度 计算	偏移值
	**/
	function convertCoorByAngle(x0,y0,heartX,heartY,angle){
		var x,y;
		x=x0-heartX;
		y=y0-heartY;
		temp1=Math.atan2(y,x);
		temp2=temp1+angle;
		len =Math.sqrt(x*x+y*y);
		x=len*Math.cos(temp2)+heartX;
		y=len*Math.sin(temp2)+heartY;
		return new Point({x:x,y:y});
	} 
	/*
			根据 第一个角度 计算 角平分线上的旋转点
	**/
	function getrotateArea(_p,iconW,iconH){
			var x,y,x0,y0,x1,y1,newLen;
			var len = _p.lines.length;
			x0 = _p.lines[0].vertor.x;
			y0 = _p.lines[0].vertor.y;
			var dis0 =getDistance(x0,y0,0,0);
			x1 = _p.lines[len-1].vertor.x;
			y1 = _p.lines[len-1].vertor.y;
			var dis1 =getDistance(x1,y1,0,0);
			var newLen = getDistance(iconW,iconH,0,0)/2;
			var vertorX=(-(x0/dis0)+(x1/dis1));//顺时针第一个向量是反方向
			var vertorY=(-(y0/dis0)+(y1/dis1));
			if(vertorX>0.05){
				x=_p.points[0].x-iconW;
			}else if(vertorX<0.05){
				x=_p.points[0].x+iconW;
			}
			if(vertorY>0.05){
				y=_p.points[0].y-iconH;
			}else if(vertorY<0.05){
				y=_p.points[0].y+iconH;
			}
			//if((vertorX>0.05)||(vertorX<-0.05)){
				_p.rotateArea.x=x+iconW/2;//回到中心位置
		//	}
		//	if((vertorY>0.05)||(vertorY<-0.05)){
				_p.rotateArea.y=y+iconH/2;//回到中心位置
		//	}
			_p.rotateArea.r=newLen/2+4;
			//drawDot(g_polygonBgContext,_p.rotateArea.x,_p.rotateArea.y,newLen/2,"red")
	}
	/*
			检测点是否在旋转按钮上
	**/
	function hitrotatePath(_p, _x, _y){
		var x0=_p.rotateArea.x;
		var y0=_p.rotateArea.y;
		var r=getDistance(x0, y0, _x, _y);
		if(r<_p.rotateArea.r){
			return true;
		}
	}
	/*
			合并 多个 多边形顶点
	**/
		function PolygonConnection_s(_p_s){
			var newPolgons=clone(_p_s);
			var len=newPolgons.length;
			var temp_points=[];
			var temp={};
			var deleteIdx=[]			
			if(len>1){
				for(var i=0;i<(newPolgons.length-1);i++){
					for(var j=i+1;j<(newPolgons.length);j++){
						temp=PolygonConnection(newPolgons[i],newPolgons[j]);
						if(temp.concat){
							newPolgons[i]=temp.newPolgon;
							newPolgons.splice(j,1)
							i=-1;
							break;
						}
					}
					
				}
			}
			/*temp_points=checkSameK(temp_polygon.points);
			var temp_len=temp_points.length
			if(temp_len>2){
				temp_points[temp_len-1].close=true;
			}*/
			return (newPolgons);
		}
	/*
			返回 合并后新的多边形
	**/
	
		function PolygonConnection(q1,q2){
			var q1CurIdx=0,q1NextIdx,q1PerIdx;
			var q2CurIdx,q2NextIdx,q2PerIdx;
			var q1Len=q1.points.length;
			var q2Len=q1.points.length;
			var temp=[],points=[];
			var tempO={};
			var connectionFlag;
			var concatFlag=false;
			//var closeOver=0
			//drawText(g_polygonContext,"q1",q1.heart.x,q1.heart.y,"blue","17px Arial");
			//drawText(g_polygonContext,"q2",q2.heart.x,q2.heart.y,"blue","17px Arial");
			for(var i=0;i<q1Len;i++){
				q1NextIdx= getNextIndex(i,q1Len);
				q2CurIdx=isPointOnPolygon(q1.points[i],q2);
				q2NextIdx=isPointOnPolygon(q1.points[q1NextIdx],q2);
				temp.push(q1.points[i]);//q1当前点是否入栈
				//closeOver=getCloseIndex(i,q1.points)
				connectionFlag=((typeof q2CurIdx)==="number")&&((typeof q2NextIdx)==="number");
				if(connectionFlag){
					tempO=PolygonConnectionByIndex(q2,q1,q2CurIdx);
					temp=temp.concat(tempO.temp);
				//	temp.points[q2.points.length-1].close=false;
					concatFlag=true;
				}
			}
			

			points=checkSameK(temp);
		/*	for(var i=0;i<temp.length;i++){
				drawText(g_polygonContext,i+"",temp[i].x,temp[i].y,"blue","17px Arial");
			}*/
			var newLen=points.length;
			if(newLen>2){
				points[newLen-1].close=true;
			}

		return {newPolgon:(new Polygon({points:points})),concat:concatFlag};
	}
	/*
			获得当前闭合点的位置
	**/
	function getCloseIndex(start,points){
		if(points.constructor!==Array){throw "获得当前闭合点的points参数错误"}
		for(var i=start;i<points.length;i++){
			if(points[i].constructor!==Point){throw "获得当前闭合点point参数错误"}
			if(points[i].close){
				return i;
			}
		}
		return (points.length-1);
	}
	/*
			当前重合点开始查询下一个重合点
	**/
	function PolygonConnectionByIndex(q2,q1,idx){
			if((typeof isPointOnPolygon(q2.points[idx],q1))!=="number"){throw "不是重合点开始";}
			var q2Len=q2.points.length;
			var q2CurIdx= idx;
			var q1NextIdx;
			var temp=[];
			var direction;
			var directionBackPoint;
			var per=getPerIndex(idx,q2Len);
			var next=getNextIndex(idx,q2Len);
			 q1NextIdx=isPointOnPolygon(q2.points[next],q1);//返回点在多边形的位置	

				if((typeof q1NextIdx)==="number"){//前面的点为重合点 走后面
					direction =new Function("return getPerIndex;");
					directionBackPoint=next;
				}else{//后面的点为重合点 走前面
					direction =new Function("return getNextIndex;");
					directionBackPoint=per;
				}			
				direction =new direction;
				for(var i=0;i<q2Len;i++){
				//console.log(direction)
					q2CurIdx=direction(q2CurIdx,q2Len);

					if(q2CurIdx==directionBackPoint){ //已经走了一圈
						return {temp:temp,index:q1NextIdx};
					}
					temp.push(q2.points[q2CurIdx]);		
				}
	}
		/*
			根据顶点得到新的多边形
	**/
	function checkSameK(obj){
		if(obj.constructor!==Array){throw "根据顶点得到新的多边形 参数错误";}
		var len=obj.length;
		var temp = [];
		var newTemp = [];//与之前的数组引用脱离
		var per,next;
		var vertor0={x:0,y:0}
		var vertor1={x:0,y:0}
		var test_angle;
		for(var i=0;i<len;i++){
			per=getPerIndex(i,len);
			next=getNextIndex(i,len);
			vertor0.x=obj[i].x-obj[per].x;
			vertor0.y=obj[i].y-obj[per].y;
			vertor1.x=obj[i].x-obj[next].x;			
			vertor1.y=obj[i].y-obj[next].y;
			test_angle=getAngle(vertor0,vertor1);
			dk=Math.abs(test_angle-Math.PI)>Math.PI/60;
			if(dk){
				temp.push(obj[i]);
			}
		}
		//for(var i=0;i<temp.length;i++){
		//	drawText(g_polygonContext,i+"",temp[i].x,temp[i].y,"blue","17px Arial");
		//}
		for(var i=0;i<temp.length;i++){
			newTemp[i] = new Point();
			newTemp[i].x=temp[i].x;
			newTemp[i].y=temp[i].y;
		}
		return newTemp;
	}
	/*
			下一个索引点
	**/
	function getNextIndex(idx,len){
		//console.log("next")
		if(idx===(len-1)){
			return 0;
		}else{
			return (idx+1);
		}
	}
	/*
			上一个索引点
	**/
	function getPerIndex(idx,len){
		//console.log("per")
		if(idx===0){
			return len-1;
		}else{
			return (idx-1);
		}
	}

	/*
			点是否是多边形的一个顶点
	**/
	function isPointOnPolygon(point,_p){
			for(var i=0;i<_p.points.length;i++){
				if(checkSamePoint(_p.points[i],point)){
					//drawDot(g_polygonContext,_p.points[i].x,_p.points[i].y,5,"red")
					return i;
				}
			}
			return "";
	}
	/*
		得到相对重心的角度
	**/
	function getRelativeAngle(x,y,_p){
		var x0,y0;
		x0=x-_p.heart.x;
		y0=y-_p.heart.y;
		angle=Math.atan2(x0/y0);
		return angle;
	}
/******************************************************************************************************************************************************
	ui处理函数
**/
	/*
			画出 多个 多边形
	**/
	function drawPolygon_s(_c,_p_s,dashFlag,bgColor){
		for(var i=0;i<_p_s.length;i++){
			drawPolygon(_c,_p_s[i],bgColor,dashFlag,i);
	//		drawText(_c,i+"",_p_s[i].heart.x,_p_s[i].heart.y,"#e36c08","10px Arial");
		}
	}
	/*
			画出多边形
	**/
	function drawPolygon(_c,_p,bgColor,dashFlag,idx){
			var len=_p.points.length;
			_c.save();
			if(_p.rotateAble){
				_c.translate(_p.heart.x,_p.heart.y);
				_c.rotate(_p.rotate_radian);
				_c.translate(-_p.heart.x,-_p.heart.y);
			}
			if((g_polygonIdx==idx)&&(_p.selected)){//当前选中
					drawPicture(_c,ROTATEiCON.join(""),_p.rotateArea.x-8,_p.rotateArea.y-8,1);
			}
			if(dashFlag){		
				for(var i=1; i<len;i++){
					dashedLine(_c,_p.points[i-1].x,_p.points[i-1].y,_p.points[i].x,_p.points[i].y,_p.lines[i-1].color,_p.lines[i-1].size);
				}
				if(len>=3){
					dashedLine(_c,_p.points[i-1].x,_p.points[i-1].y,_p.points[0].x,_p.points[0].y,_p.lines[i-1].color,_p.lines[i-1].size);
				}
			}else{
				_c.beginPath();
				for( i=0; i<len;i++){
					if(	(i==0)||((i!=0)&&(_p.points[i-1].close))){//当前为0时或者之前为闭合曲线
						_c.lineCap="round";
						_c.lineJoin="round";
						_c.moveTo(_p.points[i].x,_p.points[i].y);
					}else{
						if(_p.points[i].close){//闭合曲线
							drawLine(_c,_p.points[i].x,_p.points[i].y,_p.lines[i].color,_p.lines[i].size);
							_c.closePath();
						}else{
							drawLine(_c,_p.points[i].x,_p.points[i].y,_p.lines[i].color,_p.lines[i].size);
						}
					}
				}
				_c.stroke();
			}
			if(bgColor){
				_p.bgColor=bgColor;
			}
			if(_p.bgColorEable){
				_c.fillStyle=_p.bgColor;
				_c.fill();
			}
		
		//	for( i=0; i<len;i++){
				//drawText(_c,i+"",_p.points[i].x,_p.points[i].y,"#e36c08","16px Arial");
			//	drawDot(_c,_p.points[i].x,_p.points[i].y,3,"rgba(255,0,0,0.4)");//rgba(116,150,188,0.5)
		//	}
			_c.restore();
	}
/**  
		author:robert  
		date:2013-08-13  
		description:	draw line with variable point param0 is context2D laster param is stroke style
**/
	function drawLine(c,x,y,color,border){
			if(!c){throw "画线cavnas 不存在！";}
			if(x%2){
				x+=.5;
			}			
			if(y%2){
				y+=.5;
			}
			c.lineTo(x,y);
			c.strokeStyle=color;
			c.lineWidth=border;
			c.stroke();
	}
/**  
		author:robert  
		date:2013-08-13  
		description:	draw line with variable point param0 is context2D laster param is stroke style
**/
	function drawMoveLine(c,x0,y0,x1,y1,color,border){
			if(!c){throw "画线cavnas 不存在！";}
			c.beginPath();
			c.lineCap="round";
			c.lineJoin="round";
			c.moveTo(x0,y0);
			drawLine(c,x1,y1,color,border);
	}
/**  
	author:robert  
	date:2014-01-16  
	description:	dash line dot to dot  dashArray is length of solid line and dash line;
**/
	function dashedLine(c,x,y,x2,y2,color,border,dashArray){
		if (!dashArray){dashArray=[10,5];}
		var dx = (x2-x), dy = (y2-y);
		var distRemaining = Math.sqrt( dx*dx + dy*dy );
		var dashLen =(dashArray[0]+dashArray[1]);
		var step = Math.floor(distRemaining/dashLen);
		var dashArraySlop = dashArray[0]/dashLen;
		var xStep = dx/ step;
		var yStep = dy/ step;
		var dashIndex=0, draw=true;
		var x0,y0;
		for(var i=0;i<step;i++){
			x0=x+i*xStep;
			y0=y+i*yStep;
			drawMoveLine(c,x0,y0,x0+xStep*dashArraySlop,y0+yStep*dashArraySlop,color,border);
		}
	}
		/**  
			author:robert  
			date:2014-01-16  
			description:	fill dot
	**/
	function drawDot(){
		var argLen=arguments.length;
		var c =arguments[0];
		if(!c){throw ("画点 canvas对象不存在！");}
		if(argLen>=5){
			c.beginPath();  
		//	console.log(arguments[argLen-1])
			for(var i=2;i<arguments.length-1;i+=2){
				c.arc(arguments[i-1], arguments[i], arguments[argLen-2], 0, Math.PI * 2, true);
			}
			c.fillStyle=arguments[argLen-1];
			c.fill();
		}else{
			throw ("画点 参数不对！");
		}
	}
			/**  
			author:robert  
			date:2014-01-16  
			description:	fill text
	**/
	function drawText(c,t,x,y,color,font){
			if(!c){return;}
			c.beginPath();
			c.fillStyle=color;
			if(font){
				c.font=font;
			}
			c.fillText(t,x,y);
	}
		/**  
			author:robert  
			date:2014-01-16  
			description:	fill picture
	**/
	function drawPicture(c,src,x,y,_load){
			if(!c){throw "画图 canvas对象不存在！";}
			var img =new Image();
				img.src = src;
			if(!_load){
				img.onload = function(){
					c.beginPath();
					c.drawImage(img,x,y);
				};
			}else{
				c.beginPath();
				c.drawImage(img,x,y);
			}
	}
	
	
	
	
	
	
	
	
	
	
	
	