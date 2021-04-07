	//no use jquery ui disableselection()
	document.onfocus=function(){return false;};
	document.ondragstart=function(){return false;};
	document.onselect=function(){return false;};
	document.onselectstart=function(){return false;};
	
	$("#cvs").bind("mousedown",function(e){
						close_b_prompt();
						g_cvsMouse.width = g_cvsMouse.width;
						var x = e.pageX-g_left,
						y = e.pageY-g_top;
						g_l.points[0].x = x;
						g_l.points[0].y = y;
					
						//锁题
						if(g_lockcanvas[g_pageIdx]){
							return;
						}
						
						if(hitrotatePath(g_p[g_polygonIdx],x,y)){
						
							//只检测当前的旋转按钮
							g_mousepolygonrotateAble= true;
						}else{
								if(isPointInPolygon(g_p[g_polygonIdx],x,y,1)){
								
									//鼠标是否选中当前多边形
									g_mouseDragPolygon=true;
										g_p[g_polygonIdx].selected= true;
								}else{
								
								//检索鼠标是否选中其他多边形
									g_p[g_polygonIdx].selected= false;
									
									//取消当前选中
									for(var i=0;i<g_p.length;i++){
										if(g_polygonIdx !==i){
											if(isPointInPolygon(g_p[i],x,y,1)){
											
												//鼠标选中多边形
												g_mouseDragPolygon=true;
												g_polygonIdx =i;
												g_p[g_polygonIdx].selected= true;
												break;
											}
										}
										g_p[g_polygonIdx].selected= false;
									} 
								}
						}
						
						//更新数据
						initPolygon_s(g_p,g_polygonData);
						
						//重绘
						//updatePolygonsData(g_p);
						redrawPolygons(g_p);
						
						//console.log("mousedown 更新多边形数据")
						g_mouseDown = true;
						
						if (g_mouseDragPolygon){
							g_polygonCanvas.style.cursor="move";
						} 
						
						if (g_mousepolygonrotateAble&&g_p[g_polygonIdx].selected){
							g_polygonCanvas.style.cursor="crosshair";
						}
							
	});
		
	$("#cvs").bind("mousemove",function(e){
						var x = e.pageX-g_left,
							y = e.pageY-g_top,
							tempO;
							
						if(g_lockcanvas[g_pageIdx]){
							return;
						}
						
						//鼠标按下
						if(g_mouseDown){
						
						//旋转
							if(g_mousepolygonrotateAble&&g_p[g_polygonIdx].selected){
								var vertorCurMsX=x-g_p[g_polygonIdx].heart.x;
								var vertorCurMsY=y-g_p[g_polygonIdx].heart.y;
								var vertorMsX=g_mouseMovX - g_p[g_polygonIdx].heart.x;
								var vertorMsY=g_mouseMovY - g_p[g_polygonIdx].heart.y;
								var ag1=Math.atan2(vertorMsY,vertorMsX);
								var ag2=Math.atan2(vertorCurMsY,vertorCurMsX);
								var ag = ag2-ag1;
								rotatePolygon(g_p[g_polygonIdx],ag);
								
						//拖动
							}else if(g_mouseDragPolygon){
									g_connection=false;
									movePolygon(g_p[g_polygonIdx],x-g_mouseMovX,y-g_mouseMovY);
									
									//刚体
									if(g_polygonDigidEnabe){
										var crashFlag1 = false;
										var crashFlag2 = false;
										var limitFlag = false;
										for(var i=0;i<g_p.length;i++){
											if(i!==g_polygonIdx){
												crashFlag1 = checkCrashPolygon(g_p[g_polygonIdx],g_p[i]);
												crashFlag2 = checkCrashPolygon(g_p[i],g_p[g_polygonIdx]);
												if(crashFlag1||crashFlag2){
													limitFlag=true;
													break;
												}
											}
										}
										if(limitFlag){
										
											//移动取消
											movePolygon(g_polygonIdx,g_mouseMovX-x,g_mouseMovY-y);
										}
									}
									
							//分割线
							}else if((g_lmtSeg>=g_p.length)&&(g_userAllowSegment)){
									g_cvsMouse.width=g_cvsMouse.width;
									drawMoveLine(g_cvsMouseContext, g_l.points[0].x , g_l.points[0].y ,x ,y ,"#ff00ff" ,1);
							}
							
							//更新数据
							initPolygon_s(g_p,g_polygonData);
							
							//重绘
							//console.log("mousemove 更新多边形数据")
							redrawPolygons(g_p);
						}
						g_mouseMovX = x;
						g_mouseMovY = y;
	});
	
	$(document).bind("mousemove",function(e){
					var x = e.pageX - g_left;
					var y = e.pageY - g_top;
					if(g_mouseDown){
					
						//鼠标出局
						if((x<0||x>g_w)||(y<0||y>g_h)){
						
							//重绘分割線
							g_cvsMouse.width=g_cvsMouse.width;
							
							//重绘
							//redrawPolygons(g_p);
							//console.log("document moveup 更新多边形数据")
							clearMouseData();
							g_polygonCanvas.style.cursor="default";
						}
					}
	});
	
	
	$(document).bind("mouseup",function(e){
	
						var x = e.pageX-g_left,
						y = e.pageY-g_top;
						
						if(g_lockcanvas[g_pageIdx]){
							return;
						}
						
						if((x>0&&x<g_w)&&(y>0&&y<g_h)&&(g_mouseDragPolygon == false)&&(g_lmtSeg>=g_p.length)&&(g_mousepolygonrotateAble==false)&&g_userAllowSegment){//在鼠标没有超出画板，小于分割次数，用户允许分割，下分割
							if(g_lmtSeg>=g_p.length-1){
									g_cvsMouse.width=g_cvsMouse.width;
									drawMoveLine(g_cvsMouseContext, g_l.points[0].x , g_l.points[0].y ,x ,y ,"#ff00ff" ,1);
							}
							var temp = [];
							var n=0
							var vertexTemp = [];
							var vertexCrash = [];
							var minIdx=0;
							var minIdxTemp =0;
							g_l.points[1].x = x;
							g_l.points[1].y = y;
							var x0=g_l.points[0].x;
							var y0=g_l.points[0].y;
							
							//如果是直线
							if(!checkSamePoint(g_l.points[0],g_l.points[1],1)){
								g_l.k=getK(x0,y0 ,x,y );
								for(var i=0;i<g_p.length;i++){
								
								//求相交直线。
									polygon2LineCrash(g_p[i],g_l,1);
									vertexTemp[i]=Infinity;
									
									//相交两点
									if(g_p[i].validcollisionPointsNum>=2){
										for(var j=0;j<g_p[i].collisionPoints.length;j++){
											if(g_p[i].collisionPoints[j].visible){
											
											//获得交点到线段开始点的位置
												vertexCrash[n]=(getDistance(x0,y0,g_p[i].collisionPoints[j].x,g_p[i].collisionPoints[j].y));
												if(vertexCrash[minIdxTemp]>vertexCrash[n]){
												
													//离起点位置最近的一个交点
													minIdxTemp=n;
												}	
												n++;
											}
										}
										
										//记录 离起点位置最近的一个交点
										vertexTemp[i]=vertexCrash[minIdxTemp];
									}

								}
								if(vertexTemp.length!==g_p.length)throw "分割对象出错 不是最近的对象";
								for( i=0;i<g_p.length;i++){
									if(vertexTemp[minIdx]>vertexTemp[i]){
									
										//记录 离起点位置最近的一个多边形
										minIdx=i;
									}
								}
								
							//	console.log("分割对象为"+minIdx+"有效的交点个数"+g_p[minIdx].validcollisionPointsNum)
								if(g_p[minIdx].validcollisionPointsNum>=2){
										temp=segment(g_p[minIdx],1);
										if(temp){
											g_p.splice(minIdx,1,temp[0]);
											g_p.splice(minIdx+1,0,temp[1]);
										}
								}
							}
						}
						g_polygonCanvas.style.cursor="default";
						updatePolygonsData(g_p);
						
						//更新数据
						initPolygon_s(g_p,g_polygonData);
						
						//console.log("mouseup 更新多边形数据")
						//	redrawPolygons(g_p);
						clearMouseData();
	});

	