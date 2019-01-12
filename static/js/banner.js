
function banner(){
	function getStyleAttr(obj, attr){
		if (window.getComputedStyle) {
			return getComputedStyle(obj, null)[attr];
		}
		return obj.currentStyle[attr];
	}  
	// 分类列表
	var aCll = document.getElementsByClassName("cll");
	var oLie = fnn1("lie");
	for(var i = 0; i < aCll.length; i++){
		aCll[i].index = i;
		aCll[i].onmouseenter = function(){
			oLie.style.display = "block";
		}
		aCll[i].onmouseleave = function(){
			oLie.style.display = "none";
		}
	}
	
	// 轮播图
	var oUl = fnn1("banner-list");
	var aLi = oUl.getElementsByTagName("li");
	var aDd = fnn1("ft").getElementsByTagName("a");
	oUl.appendChild(aLi[0].cloneNode(true));
    var sice = aLi.length;
    var liW = parseInt(getStyleAttr(aLi[0], "width"));
    oUl.style.width = sice*liW + "px";
    var index = 0;
	var timer = setInterval(function(){
		index++;
		move();
	},10000)
	
	//运动
    function move(){
		if (index > sice -1){
			oUl.style.left = 0;
			index = 1;
		}
		if (index <0){
			oUl.style.left = itag*(sice-1) + "px";
			index = sice-2;
		}
		var itag = -index*aLi[0].offsetWidth;
		move3(oUl,{left:itag});
		for (var j=0; j<aDd.length; j++) {
			if (index == j) {
				aDd[j].className = "active"; 
			}
			else {
				aDd[j].className = "";
			}
		}
		if (index == sice-1) {
			aDd[0].className = "active";
		}
	}
	//点击dd
	for(var i = 0; i < aDd.length; i++){
		aDd[i].index = i;
		aDd[i].onclick = function(){
			index = this.index; 
			move();
		}
	}
	
	// 移入图片
	oUl.onmouseenter = fnn1("le").onmouseenter = fnn1("ri").onmouseenter  = function(){
		fnn1("le").style.display = "block";
		fnn1("ri").style.display = "block";
	}
	oUl.onmouseleave = function(){
		fnn1("le").style.display = "none";
		fnn1("ri").style.display = "none";
	}
	
	// 上一页
	fnn1("le").onclick = function(){
		index--;
		move();
	}
	
	// 下一页
	fnn1("ri").onclick = function(){
		index++;
		move();
	}
}
