var g_init = {
		//初始化光线
		sun:function(sun,sunLight,start){
			var x0 = sun.x,
				y0 = sun.y,
				r1 = sun.r,
				r2 = sunLight.r,
				num = sunLight.num,
					agent = start||0,
					uAgent = Math.PI*2/num;

				for(var i=0;i<num*2;i++){
					if(i%2!==0){
						sunLight.x[i] = x0+Math.cos(agent-uAgent/2)*r2;
						sunLight.y[i] = y0+Math.sin(agent-uAgent/2)*r2;
						
					}else{
						sunLight.x[i] = x0+Math.cos(agent)*r1;
						sunLight.y[i] = y0+Math.sin(agent)*r1;
						agent += uAgent;
					}
				}
				return this;
		},
		getImg:function(obj,callback){
			if(typeof obj ==="object"){
				if(obj.isbase64){
					obj.src = "data:image/png;base64,"+obj.src;
				}
				obj.img = new Image();
				obj.img.src = obj.src;
				var args = [].slice.call(arguments,2);
				obj.img.onload = function(){
					obj.loaded= true;
					if(typeof callback === "function"){
						callback.apply(obj,args);						
					}

				}
			}
			return this;
		},
		ball:function(ball){
			this.getImg(ball);
			return this;
		},
		googleText : function(googleText){
			var str =["g1","o1","o2","g2","l","e"],
				color = ["#5869b3","#cc4f3e","#f3bc36","#5869b3","#3ca160","#cc4f3e"],
				rotate = [-10,-2,0,-2,2,2],
				letter;
			var googleLine = [
					{
						trans:{x:0,y:0},
						rotate:20*Math.PI/180,
						agent:45*Math.PI/180
					},
					{
						trans:{x:0,y:20},
						rotate:20*Math.PI/180,
						agent:70*Math.PI/180				
					},
					{
						trans:{x:0,y:20},
						rotate:20*Math.PI/180,
						agent:70*Math.PI/180
					},
					{
						trans:{x:0,y:0},
						rotate:20*Math.PI/180,
						agent:45*Math.PI/180				
					},
					{
						trans:{x:0,y:-10},
						rotate:10*Math.PI/180,
						agent:80*Math.PI/180
					},
					{
						trans:{x:0,y:20},
						rotate:30*Math.PI/180,
						agent:60*Math.PI/180
					}
				]
			var googleHand = [
					{
						space:0,
						trans:{x:0,y:-2}
						
					},
					{
						space:0,
						trans:{x:64,y:-2}
						
					},
					{
						space:0,
						trans:{x:115,y:0}
						
					},
					{
						space:-4,
						trans:{x:162,y:10}
						
					},
					{
						space:-2,
						trans:{x:214,y:-4}
					},
					{				
						space:-4,
						trans:{x:245,y:-4}
		
					}
			]
			var googleShadow = [
				{
					trans:{x:-4,y:80}
				},
				{
					trans:{x:-2,y:80}
				},
				{
					trans:{x:-2,y:90}
				},
				{
					trans:{x:2,y:140}
				},
				{
					trans:{x:0,y:140},
					zy:0.2
				},
				{
					trans:{x:1,y:80}
				}
			];
			var googleFoot = [
				{
					trans:{x:-3,y:-29}
				},
				{
					trans:{x:-5,y:-25}
				},
				{
					trans:{x:-3,y:-25},
					ex:-2
				},
				{
					trans:{x:0,y:-10}
				},
				{
					trans:{x:-2,y:-30},
					ex:2
				},
				{
					trans:{x:-4,y:-28}
				}
			];
			var googleLetter = [
				{
					trans:{x:3,y:0}
				},
				{
					trans:{x:72,y:-5}
				},
				{
					trans:{x:122,y:-5}
				},
				{
					trans:{x:172,y:-5}
				},
				{
					trans:{x:225,y:-3}
				},
				{
					trans:{x:254,y:-5}
				}
			];
			for(var i=0;i<str.length;i++){

				googleText[str[i]] = $.extend(true,{},googleText.letter); //Object.create();
				letter = googleText[str[i]];
				letter.src = "img//"+str[i]+".png";
				letter.agent = letter.bAgent + rotate[i]*Math.PI/180;
				letter.x = letter.bx + googleLetter[i].trans.x;
				letter.y = letter.by + googleLetter[i].trans.y;

			//图片加载中
				this.getImg(letter,function(idx){

					var w = this.img.width,
						h = this.img.height;

			//初始化汗水
					line = $.extend(true,{},googleText.line);//数组对象合并问题
					//line.strokeStyle = color[idx];
					line.bx = this.x + googleLine[idx].trans.x;
					line.by = this.y + googleLine[idx].trans.y;
					line.bAgent = googleLine[idx].agent;
					line.rotate = googleLine[idx].rotate;
					line.x[0] = line.bx;
					line.y[0] = line.by;

					line.x[1] = line.x[0] + line.len*Math.cos(line.bAgent);
					line.y[1] = line.y[0] + line.len*Math.sin(line.bAgent);	
					//console.log(line)
					this.line = line;

				//初始化手部
					var hand = $.extend(true,{},googleText.hand);

					//$.extend(hand, googleHand[idx]);
					hand.strokeStyle = color[idx];
					hand.bx += googleHand[idx].trans.x;
					hand.by += googleHand[idx].trans.y;
					//hand[i].bAgent = 0;
					hand.x = hand.bx;
					hand.y = hand.by;
					hand.space =  (googleHand[idx].space||0)
					hand.ex = hand.x - (googleHand[idx].ex||10);//第二象限
					hand.ey = hand.y + (googleHand[idx].ey||10);

					this.hand = hand;

				//初始化阴影
					var shadow = Object.create(googleText.shadow);
					$.extend(shadow, googleShadow[idx]);
					shadow.bx = this.x + shadow.trans.x + w/2;
					shadow.by = this.y + shadow.trans.y + h;

					shadow.x = shadow.bx;
					shadow.y = shadow.by;

					this.shadow = shadow;
			//初始化脚
					var foot = Object.create(googleText.foot);
					foot.strokeStyle = color[idx];
					foot.bx = this.x + googleFoot[idx].trans.x + w/2;
					foot.by = this.y + googleFoot[idx].trans.y + h;

					foot.x = foot.bx;
					foot.y = foot.by;

					foot.ex = foot.x + (googleFoot[idx].ex||0);
					foot.ey = foot.y + foot.len + (googleFoot[idx].ey||0);
					this.foot = foot;
				},i);
			}
			return this;
		},
		trees:function(trees){
			var base = trees.base;
			var all = trees.all;
			var allTrees = [
				{
					trans:{x:2,y:0},
					scale:{x:1,y:1}
				},
				{
					trans:{x:544,y:0},
					scale:{x:-1,y:1}
				}
			]
	
			this.getImg(base,function(){
				for(var i=0; i<allTrees.length;i++){
					all[i] = $.extend(true,{},this);
					all[i].bx += allTrees[i].trans.x;
					all[i].by += allTrees[i].trans.y;
					all[i].x = all[i].bx;
					all[i].y = all[i].by;
					all[i].zx = allTrees[i].scale.x;
					all[i].zy = allTrees[i].scale.y;
				}
			})
			
			return this;
		},
		leafs:function(leafs){
			var base = leafs.base;
			var all = leafs.all;
			var allLeafs = [
				{
					trans:{x:0,y:0},
					scale:{x:1,y:1},
					agent:-20*Math.PI/180
				},
				{
					trans:{x:3,y:-3},
					scale:{x:1,y:1},
					agent:45*Math.PI/180
				},
				{
					trans:{x:3,y:-3},
					scale:{x:0.9,y:0.9},
					agent:-90*Math.PI/180
				},
				{
					trans:{x:3,y:-3},
					scale:{x:1,y:1},
					agent:-135*Math.PI/180
				},
				{
					trans:{x:540,y:3},
					scale:{x:1,y:1},
					agent:60*Math.PI/180
				},
				{
					trans:{x:540,y:3},
					scale:{x:1,y:1},
					agent:-120*Math.PI/180
				},
				{
					trans:{x:540,y:3},
					scale:{x:0.9,y:0.9},
					agent:-30*Math.PI/180
				}
			]
	
			this.getImg(base,function(){
				for(var i=0; i<allLeafs.length;i++){
					all[i] = Object.create(leafs.base);
					all[i].bx += allLeafs[i].trans.x;
					all[i].by += allLeafs[i].trans.y;
					all[i].x = all[i].bx;
					all[i].y = all[i].by;

					all[i].zx = allLeafs[i].scale.x;
					all[i].zy = allLeafs[i].scale.y;

					all[i].agent = allLeafs[i].agent;
				}
			})
			
			return this;
		},
		cloud:function(cloud){

			this.getImg(cloud)

			return this;
		},
		tram:function(tram){
			var rect = tram.rect,
				line1 = tram.line1,
				line2 = tram.line2,
				line3 = tram.line3;

			var moveData ={
				line:
					[
						{
							trans:{x:0,y:0},
							agent:0*Math.PI/180,
						},
						{
							trans:{x:0,y:0},
							agent:0*Math.PI/180
						}
					],
				rect:
					[
						{
							trans:{x:0,y:0},
							agent:0*Math.PI/180,
							fillStyle:"#fff"
						},
						{
							trans:{x:0,y:0},
							agent:0*Math.PI/180,
							fillStyle:"#fff"
						}
					]
			}
			var nomoveData = {
				line:
					[
						{
							trans:{x:0,y:0},
							agent:0*Math.PI/180
						}
					],
				rect:
					[
						{
							trans:{x:0,y:0},
							agent:0*Math.PI/180,
							width:0,
							height:0,
							fillStyle:"#dde52f"
						},
						{
							trans:{x:125,y:-53},
							agent:0*Math.PI/180,
							width:-8,
							height:0,
							fillStyle:"green"
						}
					]
			}
			var nomove = tram.nomove = {};
			var move = tram.move = {}

			nomove.line = [];
			nomove.rect = [];
			move.line = [];
			move.rect = [];

			var x,y;

		//挂点
			for(var i=0;i<nomoveData.rect.length;i++){
				nomove.rect[i] = $.extend(true,{},rect);
				this.initBaseData(nomove.rect[i],nomoveData.rect[i]);
				nomove.rect[i].x = nomove.rect[i].bx;
				nomove.rect[i].y = nomove.rect[i].by;
				nomove.rect[i].fillStyle = nomoveData.rect[i].fillStyle;
			}

		//缆线

			line1.bx  = nomove.rect[0].x+nomove.rect[0].width;
			line1.by = line1.y[0] = nomove.rect[0].y;
			line1.x[0] = line1.bx;
			line1.y[0] = line1.by;
			line1.x[1] = nomove.rect[1].x;
			line1.y[1] = nomove.rect[1].y

			x = line1.x[1] - line1.x[0];
			y = line1.y[1] - line1.y[0];
			var agent = line1.kAgent = Math.atan2(x,y);
			//缆车吊绳1
			line2.x[1] = line2.x[0] = line2.bx = line1.x[0] + 5;
			line2.y[0] = this.initLinePoint(agent, line1.x[0], line1.y[0], line2.x[0]);

			line2.y[1] = line2.y[0]+5;
			//缆车吊绳2
			line3.x[0] = line3.x[1] = line3.bx = line1.x[1] - 5;
			line3.y[0] = this.initLinePoint(agent, line1.x[0], line1.y[0], line3.x[0]);
			line3.y[1] = line3.y[0]+10;

			var r = [];
			for(var i=0;i<moveData.rect.length;i++){

				r[i] = $.extend(true,{},rect);
				r[i].fillStyle = moveData.rect[i].fillStyle;
				r[i].x = tram["line"+(i+2)].x[0] -6;
				r[i].y = tram["line"+(i+2)].y[1];
				r[i].width = 12;
				r[i].height = 5;
				move.rect[i] = r[i];
			}

			return this;
		},
		initLinePoint:function(agent,x0,y0,x){
			if(x!==0){
				return ((x-x0)/Math.tan(agent)+y0);
			}else{
				return 0;
			}

		},
		initBaseLine:function(base){
			if(base){
				base.x[0] = base.bx;
				base.y[0] = base.by;
				base.x[1] = base.x[0]+base.len*Math.cos(base.agent);		
				base.y[1] = base.y[0]+base.len*Math.cos(base.agent);					
			}

		},
		initBaseData:function(base, data){
			if(base&&data){
				if((base.bx!=="undefined")&&data.trans){
					base.bx += data.trans.x;
					base.by += data.trans.y;
				}
				if((base.agent!=="undefined")){
					base.agent = data.agent;
				}
				if((base.zx!=="undefined")&&data.scale){
					base.zx = data.scale.x;
					base.zy = data.scale.y;
				}
				if(base.width!=="undefined"&&data.width){
					base.width += data.width;
					base.height += data.height;
				}
			}
		},
		sector:function(sector){
			var base = sector.base;
			sector.all[0] = $.extend(true,{},base);
			sector.all[1] = $.extend(true,{},base);
			sector.all[0].fillStyle = "#80bfc6";
			sector.all[1].fillStyle = "#97d6e5";
			sector.all[1].bAgent = 0;
			sector.all[1].sAgent = -18*9*Math.PI/180;
			return this;
		}
	}
