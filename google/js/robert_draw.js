
function $(id){
			if(this===window){
				return new $(id)
			}
			var elem;
			var evTypes =[];
			if(id.nodeType){
				elem = id;
			}else{
				elem = document.getElementById(id)||document;
			}
			[].push.call(this,elem);
			this.bind =function(evType,fn){
				evTypes = evType.split(",")
				for(var i =0;i<evTypes.length; i++){
					if (elem.addEventListener) {
						elem.addEventListener(evTypes[i], fn, false);//DOM2.0
					}else if (elem.attachEvent) {
						elem.attachEvent("on" + evTypes[i], fn);//IE5+
					}else {
						elem["on" + evTypes[i]] = fn;//DOM 0
					}					
				}

				return this;
			} 
			this.html = function(){
				if(arguments){
					elem.innerHTML ="";
					for(var i=0; i<arguments.length;i++){
						elem.innerHTML += arguments[i];
					}
					
				}else{
					return elem.innerHTM;
				}
				return this;
			}
			return this;
	}

$.toArray =	function(x,flag){
			if(flag){
				return (x.constructor === Array)?true:false;
			}
			return (x.constructor !== Array)?[x]:x;
		}

$.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( (typeof target !== "object") && !( typeof target==="function") ) {
			target = {};
		}

			// extend jQuery itself if only one argument is passed
			if ( length === i ) {
				target = this;
				--i;
			}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays//robert typeof array is object 
				if ( deep && copy && (!copy.nodeType) &&((copyIsArray = $.toArray(copy,true)) ||(typeof copy ==="object")   ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && $.toArray(src,true) ? src : [];

					} else {
						clone = src && (typeof src ==="object") ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = arguments.callee( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

	var Panel;
	(Panel=function(id){
		this.canDom = document.getElementById(id)||document;
		this.width = this.canDom.width;
		this.height = this.canDom.height;
		this.canvas = this.canDom.getContext("2d");
		
	}).prototype = Object.create({
		drawPic : function(options){
			var c = this.canvas,
				 opts = {
					//开始剪切的 x y坐标位置。
					sx:0,
					sy:0,
					//被剪切图像的宽度
					swidht:0,
					sheight:0,
					//画布上放置图像的 x y坐标位置
					x:0,
					y:0,
					//图像的宽度
					width:0,
					height:0,
					//图像对象
					img:null,
					//图像是否剪切
					iscut:false,
					//图像是伸张和缩小
					iszoom:false,
					loaded:false,
					isbase64:false
				 }
			$.extend(opts, options);
			var img = opts.img;
			if(img){
				if(!opts.loaded){
					img.onload = function(){
						c.beginPath();
						drawImage();
						options.loaded =true;
					};
				}else{
					c.beginPath();
					drawImage();
				}
			}
			
			function drawImage(){
				if(!opts.width){
					opts.width = img.width;
				}
				if(!opts.height){
					opts.height = img.height;

				}
				if(opts.iszoom){
					c.drawImage(img,opts.x,opts.y,opts.width,opts.height);
				}else if(opts.iscut){
					c.drawImage(img,
						opts.sx,opts.sy,opts.swidth,opts.sheight,
						opts.x,opts.y,opts.width,opts.height
					)
				}else{
					c.drawImage(img,opts.x,opts.y);
				}
			}
			return this;
		},
		drawText : function (){
			var c = this.canvas,
				 opts = {
					//文字位置。
					x:0,
					y:0,
					//文字内容
					str:"",
					//文字的最大宽度
					maxWidth : 200,
					//文字的字体和大小颜色
					font : "12px arail",
					color:"#fff"
				 };
			$.extend(opts, arguments[0]);
			c.beginPath();
			c.fillStyle = opts.color;
			if(opts.font){
				c.font = opts.font;
			}
			c.fillText(opts.str, opts.x, opts.y);
			return this;
		},
		clear:function(){
			var c = this.canvas,
				 opts = {
					x:0,
					y:0,
					width:this.width,
					height : this.height
				 };
			$.extend(opts, arguments[0]);
			c.clearRect(opts.x,opts.y,opts.width,opts.height);
			return this;
		},
		drawArc : function (){
			var c = this.canvas,
				 opts = {
					//圆的中心的 x ,y坐标。
					x:[],
					y:[],
					//圆半径。
					r:1,
					//起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
					sAgent : 0,
					//结束角，以弧度计。
					eAgent : Math.PI * 2,
					//False = 顺时针，true = 逆时针。
					counterclockwise : true,
					strokeStyle:"",
					fillStyle:""
				 };
			
			$.extend(opts, arguments[0]);

			opts.x = $.toArray(opts.x);
			opts.y = $.toArray(opts.y);
			
			var len=opts.x.length,
				 x = opts.x,
				 y = opts.y,
				 r = opts.r,
				 sA = opts.sAgent,
				 eA = opts.eAgent,
				 ccw = opts.counterclockwise;
			for(var i=0;i<len;i++){
				c.beginPath();
				c.moveTo(x[i],y[i])
				c.arc(
					x[i], y[i], r,
					sA,eA,ccw
				);
				this.fillOrStroke(c,opts);
			}
			
			return this;
		},
		drawDash : function(){
			var c = this.canvas,
				 opts = {
					x0:0,
					y0:0,
					x1:0,
					y1:0,
					border : 1,
					space : 10,
					line : 5,
					color:"#fff"
				 };
			
			$.extend(opts, arguments[0]);
			var x = opts.x1 - opts.x0, 
				 y = opts.y1 - opts.y0,
				 s = Math.sqrt( x*x + y*y ),
				 //空白长
				 dx = opts.space,
				 //线段长
				 dy = opts.line,
				 //线段+空白长
				 len =  dx + dy,
				 //线段个数
				 dashSlop = dx/len,
				 //线段个数
				 step = Math.floor( s/len ),
				 //线段间距
				 xStep = x/ step,
				 yStep = y/ step,
				 color = opts.color,
				 border = opts.border,
				 x0 = 0,
				 y0 = 0,
				 x1 = 0,
				 y1 = 0;
			for(var i=0;i<step;i++){
				x0 = opts.x0 + i*xStep;
				y0 = opts.x0 + i*yStep;
				x1 = x0 + xStep*dashSlop;
				y1 = y0+yStep*dashSlop
				this.drawLine({
					x:[x0,x1],
					y:[y0,y1],
					color:color,
					border:border
				});
			}
			return this;
		},
		drawLine:function(){
			var c = this.canvas,
				 opts = {
					x:[],
					y:[],
					border : 1,
					lineCap :"round",
					lineJoin : "round",
					strokeStyle:"",
					fillStyle:"",
					closed:false
				 };
			$.extend(opts, arguments[0]);
			opts.x = $.toArray(opts.x);
			opts.y = $.toArray(opts.y);
			
			var x = opts.x||[],
				y = opts.y||[];
				//console.log(x[i])
			c.beginPath();
			for(var i=0;i<x.length;i++){
				if(i===0){
					c.moveTo(x[i],y[i]);
				}else{
					c.lineTo(x[i],y[i]);
				}
			}
			c.lineCap = opts.lineCap;
			c.lineJoin = opts.lineJoin;
			c.lineWidth=opts.border;
			if(opts.closed){
				c.closePath();
			}
			this.fillOrStroke(c,opts);
			
			
			return this;
		},
		drawRect:function(){
			var c = this.canvas,
				 opts = {
					x:0,
					y:0,
					width:0,
					height:0,
					border : 1,
					lineCap :"round",
					lineJoin : "round",
					strokeStyle:"",
					fillStyle:"",
					closed:false
				 };
			$.extend(opts, arguments[0]);

			var x = opts.x,
				y = opts.y,
				w = opts.width,
				h = opts.height;
			c.beginPath();

			this.fillOrStroke(c,opts);
			c.lineCap = opts.lineCap;
			c.lineJoin = opts.lineJoin;
			c.lineWidth=opts.border;			
			c.fillRect(x,y,w,h)
			if(opts.closed){
				c.closePath();
			}

			return this;
		},
		drawEllipse :function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					x:0,
					y:0,
					oa:1,
					ob:2,
					fillStyle:"",
					strokeStyle:""
				 };
			$.extend(opts, arguments[0]);
			var x = opts.x+opts.oa;
			var y = opts.y;
			c.beginPath();
			c.moveTo(x,y);

			for (var i=0;i<=360;i++){
				ii=i*Math.PI/180;
				x=opts.x+opts.oa*Math.cos(ii);
				y=opts.y+opts.ob*Math.sin(ii);
				c.lineTo(x,y);
			}
			c.closePath();
			this.fillOrStroke(c,opts);
			return this;
		},
		drawSector:function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					sx:0,
					sy:0,
					ex:0,
					ey:0,
					r:1,
					l:1,
					reserve:false,
					fillStyle:"",
					strokeStyle:"",
					border:1,
					flag:false
				 };
			$.extend(opts, arguments[0]);

			var t1 ={
					x:opts.sx,
					y:opts.sy,
					ex:opts.ex,
					ey:opts.ey,
					h:0,
					mul:1/2
				},
				t2,
				t3,
				sAgent,
				eAgent,
				x,
				y,
				r,
				reserve = 1;

			x = opts.sx-opts.ex;
			y = opts.sy-opts.ey;
			r = Math.sqrt(x*x+y*y)
			if(opts.r<r){
				opts.r =r;
			}
			if(opts.reserve){
				reserve =-1;
			}
			t1.h = reserve*Math.sqrt(opts.r*opts.r-r*r/4);
			t2 = this.getQuadratic(t1);
			x = t2.cx-opts.ex;
			y = t2.cy-opts.ey;
			eAgent = Math.acos(-x/Math.sqrt(x*x+y*y));
			x = t2.cx-opts.sx;
			y = t2.cy-opts.sy;
			sAgent = Math.acos(-x/Math.sqrt(x*x+y*y));

			t1.h = reserve*opts.l;
			t3 = this.getQuadratic(t1);
			x = t3.cx-opts.sx;
			y = t3.cy-opts.sy;

			c.moveTo(t3.cx,t3.cy);
			c.arc(t2.cx, t2.cy, opts.r, -reserve*sAgent,  -reserve*eAgent, false);
			c.closePath();
			//辅助
			if(opts.flag){
				c.fillRect(t2.cx, t2.cy,6,6)
				c.fillRect(t3.cx, t3.cy,8,8)
				c.fillRect(t1.x, t1.y,10,10)
				c.fillRect(t1.ex, t1.ey,12,12)				
			}

			c.lineWidth = opts.border;

			this.fillOrStroke(c,opts);
		},
		fillOrStroke : function (c,opts) {
			if(opts.fillStyle){
				c.fillStyle =opts.fillStyle;
				c.fill();			
			}
			if(opts.strokeStyle){
				c.strokeStyle = opts.strokeStyle;
				c.stroke();
			}
		},
		drawBezirEllipse:function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					x:0,
					y:0,
					oa:1,
					ob:2,
					fillStyle:"",
					strokeStyle:""
				 };
			$.extend(opts, arguments[0]);
			//关键是bezierCurveTo中两个控制点的设置
			//0.5和0.6是两个关键系数（在本函数中为试验而得）
			var a = opts.a,
				b = opts.b;
			var ox = 0.5 * a,
				oy = 0.6 * b;
			var x = opts.x,
				y = opts.y;
			c.save();
			c.translate(x, y);
			c.beginPath();
			//从椭圆纵轴下端开始逆时针方向绘制
			c.moveTo(0, b); 
			c.bezierCurveTo(ox, b, a, oy, a, 0);
			c.bezierCurveTo(a, -oy, ox, -b, 0, -b);
			c.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
			c.bezierCurveTo(-a, oy, -ox, b, 0, b);
			c.closePath();
			this.fillOrStroke(c,opts);
			c.restore();

		},
		drawCurve : function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					x:0,
					y:0,
					ex:0,
					ey:0,
					h:0,
					//中点所在比例
					mul:0,
					fillStyle:"",
					strokeStyle:"",
					border:1
				 };
			$.extend(opts, arguments[0]);
			var x = opts.x,
				y = opts.y,
				ex = opts.ex,
				ey = opts.ey,
				cx,
				cy,
				temp;

			temp = this.getQuadratic(opts);
			cx = temp.cx;
			cy = temp.cy;

			//c.fillRect(cx,cy,6,6)
			c.beginPath();
			c.moveTo(x,y);
			c.quadraticCurveTo(cx,cy,ex,ey);
			c.lineWidth = opts.border;
			this.fillOrStroke(c,opts);
		},
		getQuadratic:function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					x:0,
					y:0,
					ex:0,
					ey:0,
					h:0,
					mul:0
				 };
			$.extend(opts, arguments[0]);
			var x = opts.x,
				y = opts.y,
				ex = opts.ex,
				ey = opts.ey,
				h = opts.h,
				mul = opts.mul,
				cx,
				cy,
				zx,
				zy,
				convx,
				convy,
				convw;
				//直线与水平线的夹角
			convx = ex - x;
			convy = ey - y;
			convw = Math.sqrt(convx*convx+convy*convy);
			//convAgent = Math.acos(-convx/convw);
			//中点坐标计算
			zx = convx*mul + x;
			zy = convy*mul + y;

			//控制点坐标
			cx = -h*convy/convw + zx;
			cy = h*convx/convw + zy;

			return {cx:cx,cy:cy}
		},
		queue:0,
		animate:function(fn,options,speed){
			var c = this.canvas;
			var that = this;
			var count = {num:0};//能够被修改
			(function drawFrame(){
				that.queue = window.requestAnimationFrame(drawFrame);

				count.num++;
				if(count.num===Infinity){
					count.num = 0;
				}
				if(typeof fn ==="function"){
					fn.call(that,count,that.queue);
				}

			}());

			return this;
		},
		stop:function(idx,flag){
			if(flag){
				for(var i=idx;i<this.queue.length;i++){
					window.clearInterval(this.queue[i]);
				}
				this.queue = this.queue.slice(0,idx);
			}else{
				window.clearInterval(this.queue[idx]);
				this.queue.splice(idx,1);
			}
			
			return this;
		},
		rotateAbort:function(x,y,agent){
				var ct = Math.cos(agent),
					st = Math.sin(agent);
				var c =this.canvas;
				c.transform(ct, -st, st, ct, -x*ct-y*st+x, x*st-y*ct+y);

		},
		//默认坐标
		defaultCoor:function(){
			this.canvas.setTransform(1,0,0,1,0,0);
		},
		flipH:function(o,x){
			var d=0;
			if(typeof o ==="object"){
				if(o.x){
					o.x = $.toArray(o.x);
					for(var i=0;i<o.x.length;i++){
						d = x- o.x[i];
						o.x[i] += 2*d;
					}
				}
			}
		},
		zoom:function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					x:0,
					y:0,
					fn:[],
					obj:[],
					agent:0,
					zx:1,
					zy:1
				 };
			$.extend(opts, arguments[0]);
			var x = opts.x,
				y = opts.y,
				fn = opts.fn,
				agent = opts.agent,
				obj = opts.obj,
				nested = arguments[1],
				zx = opts.zx,
				zy = opts.zy;
			c.save();
			c.translate(x, y);
			c.scale(zx,zy);

			c.translate(-x, -y);
			fn = $.toArray(fn);
			obj = $.toArray(obj);
			for(var i=0;i<fn.length; i++){
				if(fn[i] in this){
					if(obj.length===1){
						this[fn[i]](obj[0]);
					}else{
						this[fn[i]](obj[i]);
					}

				}
			}
			//如果不是父类坐标
			if(!nested){
				this.defaultCoor();
			}
			return this;
		},
		convertCoor:function(x0,y0,heartX,heartY,angle){
			var x,y;
			x=x0-heartX;
			y=y0-heartY;
			temp1=Math.atan2(y,x);
			temp2=temp1+angle;
			len =Math.sqrt(x*x+y*y);
			x=len*Math.cos(temp2)+heartX;
			y=len*Math.sin(temp2)+heartY;
			return {x:x,y:y};
		} ,
		rotate:function(){
			var c = this.canvas,
				 opts = {
				 	//中点坐标
					x:0,
					y:0,
					fn:null,
					obj:obj,
					agent:0,
					zx:1,
					zy:1,
					tx:0,
					ty:0
				 };
			$.extend(opts, arguments[0]);
			var x = opts.x,
				y = opts.y,
				fn = opts.fn,
				agent = opts.agent,
				obj = opts.obj,
				zx = opts.zx,
				zy = opts.zy,
				nested = arguments[1],
				tx = opts.tx,
				ty = opts.ty,
				len=0,
				temp;
			c.save();
			c.translate(x+tx, y+ty);
			c.rotate(agent);
			c.scale(zx,zy);
			c.translate(-x-tx, -y-ty);
			c.translate(tx, ty);	
			if(fn){
				this[fn](obj);
			}	

			//如果不是父类坐标
			if(!nested){
				c.restore();
			}
			return this;
		}
	});