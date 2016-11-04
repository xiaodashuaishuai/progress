window.onload=window.onresize=function(){
		var winH=document.documentElement.clientHeight;
		$(".content").height(winH-$(".head").height()-$(".bottom").height());
		$(".fullwidthbanner").get(0).style.height="919px";
	}
