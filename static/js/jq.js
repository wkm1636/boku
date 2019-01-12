$(function(){
	$("#header").load("../html_1/header.html");
	$("#re").load("../html_1/retui.html");
	$("#tu").load("../html_1/tushu.html");	
	$("#tong").load("../html_1/retui.html");	
	$("#fen").load("../html_1/retui.html");	
	$("#wen").load("../html_1/retui.html");	
	$("#mei").load("../html_1/retui.html");
	$("#mxue").load("../html_1/tushu.html");
	$("#dvd").load("../html_1/yingyin.html");
	$("#top").load("../html_1/top.html");
	$("#footer").load("../html_1/footer.html");
	$("#le-nav").load("../html_1/nav.html");
	
	$("#list_le li").click(function(){
		//$(this).addClass("active").siblings().removeClass("active")
		
		var index = $(this).index();
		var top = $(".mve").eq(index).offset().top;
		console.log(index);
		$("html,body").stop(true).animate({scrollTop: top}) 
	})
	
	
	
	
	
	
	
})