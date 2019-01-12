
function getStyleAttr(obj, attr){
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr];
}  
function fnn1(cal){
	return document.getElementsByClassName(cal)[0];
}
function xianshi(){
	//限时抢购移入效果
	var list =  fnn1("list");
	fnn1("ralt").onmouseenter = function(){
		if(parseInt(getStyleAttr(list, "left")) == 0){
			fnn1("up").style.display = "block";
		}
		else {
			fnn1("nxt").style.display = "block";
		}
		fnn1("up").onclick = function(){
			move_yun(list,"left",-1200)
			fnn1("up").style.display = "none";
			fnn1("nxt").style.display = "block";
		}
		fnn1("nxt").onclick = function(){
			move_yun(list,"left",0)
			fnn1("up").style.display = "block";
			fnn1("nxt").style.display = "none";
		}
	}
	fnn1("ralt").onmouseleave = function(){
		fnn1("up").style.display = fnn1("nxt").style.display = "none";
	}

	//热销排行导航效果
	var aL = document.getElementsByClassName("lw-hg4");
	var aD = document.getElementsByClassName("lst");
	var bdr = document.getElementById("bdr");
	aL[0].style.borderBottom = "3px solid #2db4ea";
	for(var i = 0; i < aL.length; i++){
		aL[i].index = i;
		aL[i].onmouseenter = function(){
			move(aD[this.index],"width",80);
		}
		aL[i].onmouseleave = function(){
			move(aD[this.index],"width",0);
		}
		aL[i].onclick = function(){
			for(var j = 0; j< aL.length; j++){
				aL[j].style.border= "0";
				aL[j].style.height = "40px";
			}
			this.style.height = "37px";
			this.style.borderBottom = "3px solid #2db4ea";
		}
	}
	//热销书籍列表效果
	function fnn(cal){
		return document.getElementsByClassName(cal);
	}
	var aLi = fnn("lw-hg6");
	var aBm1 = fnn("bm1");
	var aBm2 = fnn("bm2");
	var aBm3 = fnn("bm3");
	var aAddBm = fnn("addBm");
	var hg0 = "49px";
	var lHg0 = "49px";
	var hg1 = "128px";
	var lHg1 = "128px";
	function shw(a){
		aLi[a].style.height = hg1;
		aAddBm[a].style.display = "block";
		aBm1[a].style.height = hg1;
		aBm1[a].style.lineHeight = lHg1;
		aBm2[a].style.lineHeight = hg1;
		aBm2[a].style.width = "90px";
		aBm3[a].style.lineHeight = hg1;
	}
	function hidd(a){
		aLi[a].style.height = hg0;
		aAddBm[a].style.display = "none";
		aBm1[a].style.height = hg0;
		aBm1[a].style.lineHeight = lHg0;
		aBm2[a].style.lineHeight = hg0;
		aBm2[a].style.width = "200px";
		aBm3[a].style.lineHeight = hg0;
	}
	shw(0);
	fnn1("dpl").style.display = "block";
	var aA = fnn1("list_3").getElementsByTagName("a");
	var aDpl = fnn("dpl");
	for(var i = 0; i < aDpl.length; i++){
		aA[i].index = i;
		aA[i].onclick = function(){
			for(var j = 0; j < aDpl.length; j++){
				aDpl[j].style.display = "none";
			}
			aDpl[this.index].style.display = "block";
			//每次点击换页，让显示页面的第一个显示效果
			for(var j = 0; j < aLi.length; j++){
				if(j%5 == 0){
					shw(j);
				}
				else{ hidd(j)};
			}
		}
	}
				//移入
	for(var i = 0; i < aLi.length; i++){
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			for (var j = 0; j< aLi.length; j++){
				hidd(j);
			}
			shw(this.index);
		}
	}

	//人气作家 点击换页效果
	var aName = fnn("onc");
	var aNae = fnn("nae");
	aNae[0].style.display = "block"
	fnn1("onc").style.background = "#62adbb";
	for(var i = 0; i < aName.length; i++){
		aName[i].index = i;
		aName[i].onclick = function(){
			for(var j = 0; j < aName.length; j++){
				aName[j].style.background = "";
				aNae[j].style.display = "none"
			}
			this.style.background = "#62adbb";
			aNae[this.index].style.display = "block";
		}
		
	}
	var aP = fnn("posi");
	for(var m = 0; m < aP.length; m++){
		aP[m].style.background = "url(../images/writer/box3-"+ (m+1 )+".jpg) no-repeat";
		aP[m].style.backgroundSize = "contain";
	}

 //博库热推
 	var aNames = fnn("two");
 	var retui = fnn1("retui");
 	var aBg = fnn("lw-hg10");
 	var aImg = fnn("retui");
 	var aBimg = fnn("bg-re");
 	var aBookName = fnn("col-6-14");
 	var aNprc = fnn("prce-new");
 	var aOprc = fnn("l-th");
 	//console.log(aOprc.length); 
 	//初始化
   	function initial(a,b,c,arr) {
   		for(var n = 0; n < b; n++){
	 		aBimg[n+c].style.background = arr[a][n].bg;
			aBimg[n+c].style.backgroundSize = "contain";
			aBimg[n+c].style.backgroundPosition = "center center";
			aBookName[n+c].innerHTML = arr[a][n].name;
			aNprc[n+c].innerHTML = arr[a][n].new;
			aOprc[n+c].innerHTML = arr[a][n].old;
			aNames[a].style.background = "#62adbb";
		}	
   	}
    aImg[0].src = "../images/retui/1/1.jpg"
	aImg[1].src = "../images/retui/1/12.jpg";
	aImg[2].src = "../images/tongshu/1/1.jpg"
	aImg[3].src = "../images/tongshu/1/12.jpg";
	aImg[4].src = "../images/fenlei/1/1.jpg"
	aImg[5].src = "../images/fenlei/1/12.jpg"
	aImg[6].src = "../images/wenchuan/1/1.jpg"
	aImg[7].src = "../images/wenchuan/1/12.jpg";
	aImg[8].src = "../images/meishi/1/1.jpg"
	aImg[9].src = "../images/meishi/1/12.jpg";
   	//点击效果
 	function clk(a,b,c,d,arr){
 		for(var j = a; j < b; j++){
			aNames[j].style.background = "";
		}
 		for(var n = 0; n < 10; n++){
 			console.log(arr[d][n]);
			aBimg[n+c].style.background = arr[d][n].bg;
			aBimg[n+c].style.backgroundSize = "contain";
			aBimg[n+c].style.backgroundPosition = "center center";
			aBookName[n+c].innerHTML = arr[d][n].name;
			aNprc[n+c].innerHTML = arr[d][n].new;
			aOprc[n+c].innerHTML = arr[d][n].old;
		}
 	}
 	
	ajax({
		url: "../JSON/retui.json", 
		data:{}, 
		success: function(data){ 
			var arr = JSON.parse(data);
				//初始化
				initial(0,10,0,arr);
				initial(4,10,10,arr);
				initial(9,10,20,arr);
				initial(13,10,30,arr);
				initial(16,10,40,arr);
				initial(18,12,50,arr);
			//点击效果
			for(var i = 0; i < aNames.length; i++){
				aNames[i].index = i;
				aNames[i].onclick = function(){
					if(this.index < 4) {
				 		clk(0,4,0,this.index,arr)
				 		aImg[0].src = "../images/retui/"+(this.index+1)+"/1.jpg"
						aImg[1].src = "../images/retui/"+ (this.index+1) + "/12.jpg";
				 	}
				 	if(this.index < 9 && this.index >= 4) {
				 		clk(4,9,10,this.index,arr)
				 		aImg[2].src = "../images/tongshu/"+(this.index-3)+"/1.jpg"
						aImg[3].src = "../images/tongshu/"+ (this.index-3) + "/12.jpg";
				 	}
				 	if(this.index < 13 && this.index >= 9) {
				 		clk(9,13,20,this.index,arr)
				 		aImg[4].src = "../images/fenlei/"+(this.index-8)+"/1.jpg"
						aImg[5].src = "../images/fenlei/"+ (this.index-8) + "/12.jpg"
				 	}
				 	if(this.index < 16 && this.index >= 13) {
				 		clk(13,16,30,this.index,arr)
				 		aImg[6].src = "../images/wenchuan/"+(this.index-12)+"/1.jpg"
						aImg[7].src = "../images/wenchuan/"+ (this.index-12) + "/12.jpg";
				 	}
				 	if(this.index < 18&& this.index >= 16) {
				 		clk(16,18,40,this.index,arr)
				 		aImg[8].src = "../images/meishi/"+(this.index-15)+"/1.jpg"
						aImg[9].src = "../images/meishi/"+ (this.index-15) + "/12.jpg";
				 	}
				 	if (this.index >= 18) {
				 		clk(18,21,50,this.index,arr)
				 	}
					this.style.background = "#62adbb";
				}
				
			}
		}
	})

	//图书频道
	var aTer = fnn("ter");
	var aBgTu = fnn("bg-tu");
	var aBk = fnn("nm");
	var aWrt = fnn("p1");
	var aJ = fnn("p2");
	var aPn = fnn("p3-1");
	var aPo = fnn("p3-2");
	var aDm = fnn("img3");
	function fm1(a,b,c,d,e){
		for(var j = a; j < b; j++){
		aTer[j].style.background = "";
		}
		for(var n = 0; n < 4; n++){
			aBgTu[n+c].style.background = d[e][n].img;
			aBgTu[n+c].style.backgroundPosition = "center center";
			aBgTu[n+c].style.backgroundSize = "contain";
			aBk[n+c].innerHTML = d[e][n].bk;
			aWrt[n+c].innerHTML = d[e][n].wrt;
			aJ[n+c].innerHTML = d[e][n].jj;
			aPn[n+c].innerHTML = d[e][n].pri1;
			aPo[n+c].innerHTML = d[e][n].pri2;			
		}
	}

	aTer[0].style.background = "#62adbb";
	aTer[8].style.background = "#62adbb";
	ajax({
		url: "../JSON/tushu.json", 
		data:{}, 
		success: function(data){ 
			var arr1 = JSON.parse(data);
			for(var n = 0; n < 4; n++){
				aBgTu[n].style.background = arr1[0][n].img;
				aBgTu[n].style.backgroundPosition = "center center";
				aBgTu[n].style.backgroundSize = "contain";
				aBk[n].innerHTML = arr1[0][n].bk;
				aWrt[n].innerHTML = arr1[0][n].wrt;
				aJ[n].innerHTML = arr1[0][n].jj;
				aPn[n].innerHTML = arr1[0][n].pri1;
				aPo[n].innerHTML = arr1[0][n].pri2;
				aBgTu[n+4].style.background = arr1[8][n].img;
				aBgTu[n+4].style.backgroundPosition = "center center";
				aBgTu[n+4].style.backgroundSize = "contain";
				aBk[n+4].innerHTML = arr1[8][n].bk;
				aWrt[n+4].innerHTML = arr1[8][n].wrt;
				aJ[n+4].innerHTML = arr1[8][n].jj;
				aPn[n+4].innerHTML = arr1[8][n].pri1;
				aPo[n+4].innerHTML = arr1[8][n].pri2;
			}
			
			for(var i = 0; i < aTer.length; i++){
				aTer[i].index = i;
				aTer[i].onclick = function(){
					if(this.index < 8){
						fm1(0,8,0,arr1,this.index);
						aDm[0].src = "../images/tushu/" + (this.index+1) + "/5.jpg";
					}
					else {
						fm1(8,10,4,arr1,this.index);
						aDm[1].src = "../images/meixue/" + (this.index-7) + "/5.jpg";
					}
					this.style.background = "#62adbb"; 
				}
			}
		}
	})

	//左侧导航
	var aMve = document.getElementsByClassName("mve");
	var listLe = document.getElementById("list_le");
	var aLio = listLe.getElementsByTagName("li");
	for(var i = 0; i<aLio.length; i++){
		aLio[i].index = i;
		aLio[i].onclick = function(){
			for(var i = 0; i<aLio.length; i++){
				aLio[i].style.background = "";
			}
			var top = aMve[this.index].offsetTop;
			console.log(top);
			document.documentElement.scrollTop = (top-50);
			document.body.scrollTop = (top-50);
			this.style.background = "red";
			
		}
	}

	var aImgck = document.getElementsByClassName("bg-re");
	var aBkName = document.getElementsByClassName("col-6-14");
	ajax({
		url: "../JSON/retui.json", 
		data:{}, 
		success: function(data){ 
			var arr = JSON.parse(data);
			for(var i = 0; i<aImgck.length; i++){
				aImgck[i].index = i;
				aImgck[i].onclick = function(){
				for (var n = 0; n < 19; n++){
					for (var m = 0; m < 10; m++){
							if (arr[n][m].name == aBkName[this.index].innerHTML){
								var id = arr[n][m].id
								console.log(n +" ," + m);
								console.log(aBkName[this.index].innerHTML)
								open("details.html?id=" + id);
							}
						
						}
					}
				}	
			}
		}	
	});
		
	var aImgcks = document.getElementsByClassName("bg-tu");
	var aBkNames = document.getElementsByClassName("nm");
	ajax({
		url: "../JSON/tushu.json", 
		data:{}, 
		success: function(data){ 
			var arr1 = JSON.parse(data);
			for(var i = 0; i<aImgcks.length; i++){
				aImgcks[i].index = i;
				aImgcks[i].onclick = function(){
				for (var n = 0; n < 10; n++){
					for (var m = 0; m < 4; m++){
							if (arr1[n][m].bk == aBkNames[this.index].innerHTML){
								var id = arr1[n][m].id
								console.log(n +" ," + m);
								console.log(aBkName[this.index].innerHTML)
								open("details.html?id=" + id);
							}
						
						}
					}
				}	
			}
		}	
	})

	
	

}
