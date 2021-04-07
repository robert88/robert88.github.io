
window.onload = function(){
	var panel = new Panel("hplogoc"),
		sin = Math.sin,
		cos =Math.cos,
		pi = Math.PI/180,
		str = ["g1","o1","o2","e","l","g2"];
		var animate_stop = false,
			timeout;
	var sun = g_data.sun,
		sunLight = g_data.sun.light,
		googleText = g_data.googleText,
		letter = googleText.letter,
		city = g_data.city,
		trees = g_data.trees,
		leafs = g_data.leafs,
		tram = g_data.tram,
		lawn = g_data.lawn,
		sector = g_data.sector,
		cloud = g_data.cloud,
		ball = g_data.ball,
		cityCover = g_data.cityCover;


//---------------------------------------------------------------------------------------------------------------
	function rotate(obj,fn,x,y,agent,zx,zy,tx,ty){
				panel.rotate({
					x:x,
					y:y,
					obj:obj,
					fn:fn,
					agent:agent,
					zx:zx,
					zy:zy,
					tx:tx,
					ty:ty
				})	
	}
//---------------------------------------------------------------------------------------------------------------
	function draw(obj,x,y,tx,ty,zx,zy){
		var agent,fn;
		if(obj){
			if((typeof x!=="undefined")&&(typeof y!=="undefined")){
				//log("x"+x)
				tx = tx || 0;
				ty = ty || 0;
				if(obj.constructor === Array){
					for(var i=0; i<obj.length; i++){
						agent = obj[i].agent||0;
						fn = obj[i].fn
						if(typeof zx==="undefined"){
							zx = obj[i].zx||1;
							zy = obj[i].zy||1;	
						}

						rotate(obj[i], fn, x, y, agent, zx, zy,tx,ty);
					}
				}else{
					agent = obj.agent||0;
					fn = obj.fn
					if(typeof zx==="undefined"){
						zx = obj.zx||1;
						zy = obj.zy||1;
					}
					rotate(obj, fn, x, y, agent, zx, zy,tx,ty);
				}

			}else{
				//console.log(obj)
				panel[obj.fn](obj);
			}
		}
	}
//---------------------------------------------------------------------------------------------------------------
	function drawDram(s1,s2){
		var x=0,y=0;
		var rect1,rect2;
		var line1,line2;
		var s,
		count,
		k;



		draw(tram.nomove.rect[0]);
		draw(tram.nomove.rect[1]);

		s = tram.nomove.rect[1].y-tram.nomove.rect[0].y;
		k = Math.tan(tram.line1.kAgent);
		drawTramLine1(-s,-k);
		//
		if(tram.line1.finish){
			s = tram.line2.y[0]-tram.line3.y[0];
			drawTramLine2(s,k);			
		}

	}
	function drawTramLine2(len,k){
		var line2 = tram.line2;
		var line3 = tram.line3;
		var rect2 = tram.move.rect[0];
		var rect3 = tram.move.rect[1];
		var x,y;

		if(typeof line2.count ==="undefined"){
			line2.count = 0;
		}

		y = (line2.count++)*0.5;
		if(len<0){
			len = -len;
		}
		if(y<len){

			x = y*k
		}else if(y<2*len){
			y = -y+2*len;
			x = y*k
		}else{
			line2.count = 0;
			x = 0;
			y = 0;
		}

		draw(tram.line2,0,0,-x,-y);
		draw(rect2,0,0,-x,-y);
		draw(tram.line3,0,0,x,y);
		draw(rect3,0,0,x,y);
	}
	function drawTramLine1(len,k){
		var line1 = tram.line1;
		var x,y;
		if(!line1.finish){
			if(typeof line1.count ==="undefined"){
				line1.count = 0;
			}
			y = line1.count++;

			if(y>len){
				y = len;
				line1.finish = true;
			}
			x = k*y;
			line1.x[1] = line1.x[0] + x;
			line1.y[1] = line1.y[0] - y;
		}

		draw(tram.line1);

	}
//---------------------------------------------------------------------------------------------------------------
	function drawgoogleText(ani,timer,id){
		var x,y;
		var tx = 0,
			ty = 0,
			t = timer.num;
		var hand = [];
		var foot = [];
		var line = [];
		var shadow = [];
		var letter = [];
		var handTx = 0;
		var handTy = 0;
		var handcount = 0;
		var letterRotate = [15,0,0,-5,0,-15];
		var odd = false;
		if(typeof googleText.sigle==="undefined"){
			googleText.sigle = 0;
		}
		for(var i = 0;i<str.length;i++ ){
			tx = 0;
			ty = 0;
			odd = 1&i;
			handTy = 0;
			letter[i] = googleText[str[i]];
			line[i] = letter[i].line;
			hand[i] = letter[i].hand;
			shadow[i] = letter[i].shadow;
			foot[i] = letter[i].foot;
			x= letter[i].img.width/2 + letter[i].x;
			y= letter[i].img.height/2 + letter[i].y;

			if(ani.step>0){
				if((ani.step===1)&&(t>ani.delay)){
					//缆线完成了

						hand[i].agent = hand[i].bAgent + letterRotate[i]*pi;
						letter[i].agent =letter[i].bAgent + letterRotate[i]*pi;

					
					if(line[i].finish&&(i===str.length-1)){
						ani.step = 2;
						timer.count = 0;
						ani.delay = 20
					}
					drawLine(line[i],x,y);						
				}

				if(tram.line1.finish){

					hand[i].agent = hand[i].bAgent;
					letter[i].agent =letter[i].bAgent ;

					if(typeof hand[i].count==="undefined"){
						hand[i].count = 0;
					}
					handTy = (hand[i].count++);
					//only one
					if(hand[i].h>0){
						hand[i].bh = hand[i].h = -(hand[i].h+10);
						hand[i].mul =1/3;
						hand[i].bex = hand[i].ex = hand[i].ex;
						hand[i].bey = hand[i].ey = hand[i].ey-10;
						shadow[i].br = shadow[i].r;
					}
					//delay 80
					if(handTy>40){
						handTy -=40;
						
						//上升20ms;
						if(handTy>18){
							//stop animate
							if(animate_stop){
								window.cancelRequestAnimationFrame(id)
							}
						}
						if(handTy>45){
							//window.cancelRequestAnimationFrame(id);
							hand[i].count = 0;
							handTy = 0;
							hand[i].h = hand[i].bh;
							hand[i].ex = hand[i].bex;
							hand[i].ey = hand[i].bey;
							shadow[i].r = shadow[i].br;
							googleText.sigle++;
							if(googleText.sigle>4){
								googleText.sigle =0;
							}

						}
						//奇数跳跃
						if((odd&&(googleText.sigle===0)) || ((!odd)&&(googleText.sigle===2))){
							//蹲下
							if(handTy<5){//0-5 -->ty0~5
								ty +=  handTy;
								foot[i].h++;
								foot[i].y[0]++
							//最高点
							}else{
								if(handTy<10){//5-10 -->ty5~0
									ty += 10-handTy;
									foot[i].h--;
									foot[i].y[0]--;
								}else{//>10
									if(handTy<30){//<ty0~-20
										handTy = handTy -10;
									}else{//>30
										handTy =  20-(handTy-30);
									}
									ty -= handTy;
									//console.log(ty)
									hand[i].ex = hand[i].bex -handTy*0.6; 
									hand[i].ey = hand[i].bey -handTy*0.8; 
									hand[i].h = hand[i].bh + handTy;
									shadow[i].r = shadow[i].br - handTy*0.6;
									if(shadow[i].r<0){
										shadow[i].r = 0;
									}
									if(hand[i].h>0){
										hand[i].h = 0;
									}									
								}

							}

						}
						
					}//过程


				}
					
				drawGoogleShadow(shadow[i],x,y);
				if(str[i]==="l"){
					drawHand(hand[i],x+2,y,tx,ty);
				}else{
					drawHand(hand[i],x,y,tx,ty);					
				}	

				drawFoot(foot[i],x,y,tx,ty);

			}else{
				tx = 0;
				ty = 5;
			}
			//画文字
			
			draw(letter[i],x,y,tx,ty);
		}
	}
	//画阴影
	function drawGoogleShadow(shadow,x,y){
			draw(shadow,x,y);
	}
	//画脚
	function drawFoot(foot,x,y,tx,ty){
		draw(foot,x, y, tx, ty);
		draw(foot,x, y, tx+foot.space, ty);
	}
	//画手
	function drawHand(hand,x,y,tx,ty){
		draw(hand,x,y,tx,ty);
		draw(hand,x,y,tx+hand.space,ty,-1,1);	
	}
	//画汗
	function drawLine(line,x,y){

				var opacity,count;

				if(!line.count){
					line.count = 0;
				}

				line.count++;
				count = line.count*0.03;

				if(count>1){
					count = 1;
					line.finish = true;
				}

				//渐变
				opacity =  1 - count;
				line.strokeStyle = "rgba(214,216,228,"+ opacity + ")";

				//移动
				count = -10*count;
				line.agent = 0;
				draw(line,x,y,count,count);
				line.agent =  line.rotate;
				draw(line,x,y,count,count);
				line.agent = 2*line.rotate;
				draw(line,x,y,count,count);
	}
//---------------------------------------------------------------------------------------------------------------
	//画草坪
	function drawLawn(ani,timer){
		var flag1 = false,
			flag2 = false,
			count,
			len;
		if(ani.step===2&&!lawn.finish){
			if(!lawn.count){
				lawn.count = 0;
			}
			count = lawn.count++;
			len = lawn.width;

			if(!lawn.finish){
				len = count*5;
			}
			if(len> lawn.width){
				lawn.finish = true;
				ani.step =3;
				timer.num = 0;
				lawn.count = 0;
			}

			lawn.sx = ball.x+ball.img.width/2-len;
			lawn.sy = ball.y+ball.img.height-10-lawn.l;	
					
			lawn.ex = ball.x+ball.img.width/2+len;
			lawn.ey = lawn.sy
			draw(lawn);
		}else if(animate.step>2){
			draw(lawn);
		}		
	}

//---------------------------------------------------------------------------------------------------------------
	function updateBallState(timer,s,v){
		var v = ball.vy-ball.maxSvy*ball.hindrance
		if(v>0){
			ball.svy = -v;
		}else{
			ball.svy = 0;
		}
		ball.st = timer.num;
		ball.sx += s;
		ball.sy = ball.y;
	}

	function ballFall(ani,timer){

		//vx水平速度增量 ，vy 垂直速度增量 ，ds是水平位移增量 ，
		//ball.svx水平开始速度 ，ball.svy垂直开始速度 
		//ball.a摩擦力加速度， ball.angle 球的角度，
		//ball.st 相对起始时间，ball.hindrance碰撞地面能量损失系数
		//ball.sx 起始x坐标，ball.sy 起始y坐标
		//ball.vx水平瞬时速度，ball.vy垂直瞬时速度

		var g =0.08,
			floor = 210,
			vx,
			vy,
			ds,
			t = timer.num - ball.st,
			zy;

		
		//printf("球体y坐标",ball.y,"球瞬时速度",ball.vy,"当前时间",t,"球初始速度",ball.svy ,"开始计时时间",ball.st)
		if(ball.zx<1){
			if(t>10){
				ball.zx = 1;
			}
		}
		if(ball.y === floor){
			//反弹
			if(ball.vy<0){
				ball.y = g*t*t/2 + ball.sy + ball.svy*t;
			}else{
				ball.vy = 0;
			}

			vx = ball.svx + ball.a*t;
			if(vx>1){
				ds = ball.svx*t + ball.a*t*t/2;
				ball.x = ball.sx + ds;
				ball.vx = ball.svx + ball.a*t;
				ds = ball.vx/2+ball.a/8;
				ball.agent += 2*ds/ball.r //旋转角速度
			}else{
				timer.num = 0;
				ani.step = 1;
				ani.delay = 30;							
			}

		//在空中
		}else if(ball.y < floor){

			vy = g*t;
			ball.vy = vy + ball.svy;
			ds = ball.svx*t;
			ball.y = g*t*t/2 + ball.svy*t + ball.sy;
			ball.x = ds + ball.sx;
			//碰撞
			if(ball.y > floor){

				ball.y = floor;
				if(!ball.maxSvy){
					ball.maxSvy = g*t;
				}
				//更新足球初始信息
				ball.zx = 0.9;
				updateBallState(timer, ds, vy);							
				ball.vy = ball.svy;
			}
			ball.agent += pi;
		}
		ball.shadow.y = floor + ball.img.height-4;
	}

	function drawBall(ani,timer){
		var len;
		if(ball.loaded){

				if(ani.step === 0){
					ballFall(ani, timer );
				}

				if(ani.step ===2){
					len = 1;
					if(!ball.finish){
						if(!ball.count){
							ball.count = 0;
						}
						ball.count++;
						len = 1 - ball.count*0.08;
						//console.log(len)
						if(len<0.01){
							ball.finish = true;
							ball.zx = 1;
							ball.zy = 1;
						}else{
							ball.zx = ball.zy =len;
						}
					}
				}
				var w = ball.img.width,
					h = ball.img.height,
					x = ball.x + w/2,
					y = ball.y + h/2;

				ball.shadow.x = x;
				ball.shadow.r = ball.y/100*ball.shadow.br;

				draw(ball.shadow,ball.shadow.x,ball.shadow.y);

				draw(ball,x,y);
		}else{
			;//console.log("ball is not load");
		}
	}
//---------------------------------------------------------------------------------------------------------------
	function drawLeafs(){
		var x,y,temp,count,left,right;

		if(leafs.base.loaded){
			if(typeof leafs.count==="undefined"){
				leafs.count =0;
			}
			count = ~~((leafs.count++)/10);
			left = count;
			if(count>=4){
				left = 4; 
			}
			for(var i =0;i<left+1;i++){
					x = leafs.all[0].x;
					y = leafs.all[0].y+leafs.base.img.height;
					draw(leafs.all[i],x,y);
				if(i<3){
					x = leafs.all[4].x;
					y = leafs.all[4].y+leafs.base.img.height;
					draw(leafs.all[i+4],x,y);
				}

			}
				
		}else{
			;//console.log("leafs is not load");
		}

	}
//---------------------------------------------------------------------------------------------------------------

	function drawTrees(){
		var count,
			w,
			h;
		if(trees.base.loaded){
			w = trees.base.img.width;
			h = trees.base.img.height;
			if(typeof trees.count==="undefined"){
				trees.count = 0;
				trees.agent = 90*pi;
			}
			count = trees.count++;
			if(!trees.finish){
				if(count>90){
					count = 90; 
					trees.finish = true;
				}
				trees.all[0].agent = trees.agent-count*pi;
				trees.all[1].agent = count*pi-trees.agent;
				
			}
			draw(trees.all[0],trees.all[0].x+w,trees.all[0].y+h);
			draw(trees.all[1],trees.all[1].x+w,trees.all[1].y+h,-28,0);
		}else{
			;//console.log("trees is not load");
		}

	}
//---------------------------------------------------------------------------------------------------------------
function drawCloud(){
	var x,y;
	var len = 100;
	var count;
		if(typeof cloud.count==="undefined"){
			cloud.count = 0;
		}
		x = cloud.count++;
		if(x>len){
			x =  len;
		}
		draw(cloud,0,0,x,0);
		draw(cloud,0,0,-x,-20);
		draw(cloud,cloud.x,cloud.y,-x,10,-1,1);
}
	
//---------------------------------------------------------------------------------------------------------------

	function drawSector(){
		//console.log(sector.all[0])
		var count;
		if(typeof sector.count==="undefined"){
			sector.count = 0;
			//console.log("a"+sector.all[0].eAgent)
			sector.all[0].sAgent = -180*pi;
		}
		count = (sector.count++)*pi;
		if(count>36*pi){
			sector.count = 0;
			count = 36*pi;
		}
		if(!sector.finish){
			sector.all[0].sAgent +=pi;
			//console.log(~~(sector.all[0].eAgent/pi))
			if(sector.all[0].sAgent>0){
				sector.all[0].sAgent = 0;
				sector.finish = true;
			}			
		}

		draw(sector.all[0]);
		for(var i=0;i<5;i++){
			sector.all[1].agent = sector.all[1].bAgent+i*36*Math.PI/180+count;
			//console.log(~~(sector.all[1].agent/pi))
			if(sector.all[1].agent>(140*pi+sector.all[0].sAgent)){
				sector.all[1].agent =0;
			}
			draw(sector.all[1], sector.all[1].x, sector.all[1].y);				
		}
	}
	function drawCity(ani,timer){
		draw(city);
		if(!cityCover.finish){
			drawCityCover(ani,timer);				
		}
	}
	function drawCityCover(ani,timer){
		var agent,count;
		if(!cityCover.count){
			cityCover.count = 0;
		}
		count = cityCover.count++;
		agent = count*pi;
		if(agent>90*pi){
			cityCover.finish = true;
			ani.step = 4;
			timer.num = 0;
			agent = 90*pi;
		}
		//draw({x:2,y:2,r:2,fillStyle:"#fff",fn:"draArc"})
		//cityCover.fillStyle ="#ffffff"
		cityCover.agent = cityCover.bAgent+agent;
		draw(cityCover,cityCover.x,cityCover.y)
		cityCover.agent = cityCover.bAgent-agent;
		//cityCover.fillStyle ="#ffffff"
		draw(cityCover,cityCover.x,cityCover.y,0,0,-1,1);
	}
//---------------------------------------------------------------------------------------------------------------

		/* var city2 = {
				src:"bg2.jpg",
				loaded:false,
				x:-8,
				y:-39,
				r:10,
				img:null,
				fn:"drawPic"
		}
		g_init.getImg(city2)
		draw(city2)
		$(city2.img).bind("load",function(){

		})*/
		var animate={
			step:0,
			finish:false,
			delay:10
		}

	function startAnimate(){
		panel.animate(
			function(timer,id){
				this.clear();
				var c = this.canvas
					letter;
				var t = timer.num,
					len = 0,
					flag1 =false,
					flag2 = false;
				if(!googleText.loaded){
					for(var i=0;i<str.length;i++){
						letter = googleText[str[i]]
						if(!letter.loaded){
							break;
						}
					}
					if(i===str.length){
						googleText.loaded = true;
					}					
				}

				
				if(!g_data.loaded){
					g_data.loaded = trees.base.loaded&&googleText.loaded&&leafs.base.loaded&&city.loaded&&cloud.loaded&&ball.loaded;
				}else{
					c.globalCompositeOperation ="source-over";
					c.globalAlpha = 1;
						if(animate.step >=4){
							drawSector();
						}
						
						//缆车
						if(sector.finish){
							drawDram();
						}

						if(animate.step>=3){
							drawCity(animate,timer);
							drawCloud();
						}
						//console.log(sunLight)
						if(animate.step >=4){
							sunLight.agent += 2*pi
							if(sunLight.agent>=360*pi){
								sunLight.agent = 0;
							}
							//console.log(sunLight.agent)
							draw(sunLight,sun.x,sun.y);
							draw(sun);			
						}
						
						
						if(animate.step>=4){

							if(trees.finish){
								drawLeafs();	
							}							
							drawTrees();
						
						}

						//animate.step =1;
						if(animate.step>=1){
							drawLawn(animate,timer)							
						}
						drawgoogleText(animate,timer,id);
						drawBall(animate,timer);

				}

		})
	}
	function init(){
		g_init.sun(sun, sunLight)
		.googleText(googleText)
		.trees(trees)
		.getImg(city)
		.leafs(leafs)
		.tram(tram)
		.sector(sector)
		.cloud(cloud)
		.ball(ball);		
	}

	init();
	startAnimate();

	timeout = setTimeout(function(){animate_stop= true;},60000);
	$(document).bind("mousemove,touchmove,mousedown,touchstart",function(){
	 	clearTimeout(timeout);
	 	timeout = setTimeout(function(){animate_stop= true;},60000);
	 	if(animate_stop){
		 	animate_stop = false;
		 	init();
		 	startAnimate() 		
		 }
	})
	$(document).bind("mouseup,touchend",function(){
		timeout = setTimeout(function(){animate_stop= true;},60000);
	})

		/*
		$(document).bind("click",function(e){
			console.log("%s %c %s %c %s %c %s","你点击了画布x:",
				"color:red",e.pageX-panel.canDom.offsetLeft,
				"color:balck","y:",
				"color:red",e.pageY-panel.canDom.offsetTop)
		})*/
return ;
	
};