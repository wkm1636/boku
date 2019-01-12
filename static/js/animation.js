// 获取css样式
function getStyleAttr(obj, attr){
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr];
}  
//匀速运动封装
function move_yun(obj, attr, iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		//1, current
		var current = parseInt( getStyleAttr(obj, attr) );
		
		//2, speed
		var speed = iTarget>current ? 60 : -60;
		
		//3, 临界值
		if ( Math.abs(iTarget-current) < Math.abs(speed) ){    
			clearInterval(obj.timer); //停止运动
			obj.style[attr] = iTarget + "px"; //直接设置成目标位置
			return;
		}
		
		//4, 运动
		obj.style[attr] = current + speed + "px";
		
	}, 30);
}
	// 一次移动(scrolltop) ------封装函数          	
function moveTop(attr,iTarget){
	clearInterval(timer);
	timer = setInterval(function(){
		
		var current = document.documentElement.scrollTop || document.body.scrollTop;
		
		var speen = (iTarget - scrollTop)/8;
		speen = speen>0 ? Math.ceil(speen) : Math.floor(speen);  
		
		attr = current + speen + "px";
		
		if(current == iTarget){
			clearInterval(timer);
			return;
		}
	},30)	
}			
        	
// 一次移动 ------封装函数          	
function move(obj,attr,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var current = parseInt(getStyleAttr(obj,attr));
		
		var speen = (iTarget - current)/8;
		speen = speen>0 ? Math.ceil(speen) : Math.floor(speen);  
		
		obj.style[attr] = current + speen + "px";
		
		if(current == iTarget){
			clearInterval(obj.timer);
			return;
		}
	},30)	
}

//多次运动（链式运动）----封装函数
function move1(obj,attr,iTarget,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var current = parseInt(getStyleAttr(obj,attr));
		
		var speen = (iTarget - current)/8;
		speen = speen>0 ? Math.ceil(speen) : Math.floor(speen);  
		
		obj.style[attr] = current + speen + "px";
		
		if(current == iTarget){
			clearInterval(obj.timer);
			if(fn) fn(); //判断fn是否存在
		}
	},30)	
}

//链式运动，且改变透明度 -----封装函数
function move2(obj,attr,iTarget,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		if(attr == "opacity"){
			var current = parseFloat(getStyleAttr(obj,attr))*100;
		}
		else{
			var current = parseInt(getStyleAttr(obj,attr));
		}
		var speen = (iTarget - current)/8;
		speen = speen>0 ? Math.ceil(speen) : Math.floor(speen);  
		
		if(attr == "opacity"){
			obj.style[attr] = (current + speen)/100;
			obj.style.filter = "alpha(opacity =" + (current + speen);
		}
		else{
			obj.style[attr] = current + speen + "px";
		}
		if(current == iTarget){
			clearInterval(obj.timer);
			if(fn) fn(); //判断fn是否存在
		}
	},30)	
}

//多属性同时运动 ----封装函数
//例如：function move3(obj,{width:100, height:200, left:10, top:300},fn)
function move3(obj,json,fn){
	clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bStop = true;
			for (var attr in json){ 
				var iTarget = json[attr];
				
				if(attr == "opacity"){
					var current = parseFloat(getStyleAttr(obj,attr))*100;
				}
				else{
					var current = parseInt(getStyleAttr(obj,attr));
				}
				var speen = (iTarget - current)/8;
				speen = speen>0 ? Math.ceil(speen) : Math.floor(speen);  
				
				if(attr == "opacity"){
					obj.style[attr] = (current + speen)/100;
					obj.style.filter = "alpha(opacity =" + (current + speen);
				}
				else{
					obj.style[attr] = current + speen + "px";
				}
				if(current != iTarget){
					bStop = false;
				}
			}
			if (bStop){
				clearInterval(obj.timer);
				if(fn) fn(); //判断fn是否存在
			}
		},30)	
	
	
}


//
//function move3(obj,json,fn){
//	clearInterval(obj.timer);
//		obj.timer = setInterval(function(){
//			var bStop = true;
//			for (var attr in json){ 
//				var iTarget = json[attr];
//				
//				if(attr == "opacity"){
//					var current = parseFloat(getStyleAttr(obj,attr))*100;
//				}
//				else{
//					var current = parseInt(getStyleAttr(obj,attr));
//				}
//				var speen = (iTarget - current)/8;
//				speen = speen>0 ? Math.ceil(speen) : Math.floor(speen);  
//				
//				if(attr == "opacity"){
//					obj.style[attr] = (current + speen)/100;
//					obj.style.filter = "alpha(opacity =" + (current + speen);
//				}
//				else{
//					obj.style[attr] = current + speen + "px";
//				}
//				if(current != iTarget){
//					bStop = false;
//				}
//			}
//			if (bStop){
//				clearInterval(obj.timer);
//				if(fn) fn(); //判断fn是否存在
//			}
//		},30)	
//}


