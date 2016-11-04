	/*	图片分步走js*/
	window.onload=function(){
						/*search的部分*/
			var divH=document.getElementsByClassName("dada")[0].offsetHeight;
			var divW=document.getElementsByClassName('dada')[0].offsetWidth;
			$("#btn").toggle(function(){
					$(".dada").stop().animate({
					height:"0px",
					width:"0px",
					opacity:0
				},900)	
			},function(){
				$(".dada").stop().animate({
					height:divH+"px",
					width:divW+"px",
					opacity:1
				},900)
			})
/*						中间转动的图片*/
			var div=document.getElementById('zhuanzhaun');
			var x=0;
			time=setInterval(function(){
				x++;
				setCSS3(div,{"transform":"rotate("+x+"deg)","transformOrigin":"140px 160px"})
			},1);
			function setCSS3(obj,cssjson){
				for(var i in cssjson){
					obj.style[i]=cssjson[i];
					i=i.replace(i.charAt(0),i.charAt(0).toUpperCase());
					obj.style["webkit"+i]=cssjson[i];
					obj.style["moz"+i]=cssjson[i];
					obj.style["ms"+i]=cssjson[i];
					obj.style["o"+i]=cssjson[i];
				}
			}

				/*画布时钟*/
		function drawClock(){
			for (var i = 0; i < 60; i++) {
				var angle=i*6*Math.PI/180;
				cobj.lineWidth=2;
				var r1=r-8;
				if(i%5==0){
					cobj.lineWidth=4;
					r1=r-10;
				}
				cobj.beginPath();
				cobj.moveTo(150+r*Math.cos(angle),150+r*Math.sin(angle));
				cobj.lineTo(150+r1*Math.cos(angle),150+r1*Math.sin(angle))
				cobj.stroke();
			};
		}
		function drawPoint(r,w,col,ang){
			cobj.beginPath();
			cobj.lineWidth=w;
			cobj.strokeStyle=col;
			cobj.moveTo(150,150);
			cobj.lineTo(150+r*Math.cos(ang*Math.PI/180),150+r*Math.sin(ang*Math.PI/180));
			cobj.stroke();
		}
		var canvas=document.getElementById('canvas');
		var audio=document.getElementById('audio');
		var cobj=canvas.getContext('2d');
		var r=100;
		var time=null;
		var colorObj=cobj.createRadialGradient(150,150,1,150,150,100);
		colorObj.addColorStop(0,"#efefef");
		colorObj.addColorStop(1,"#cecece");
		cobj.shadowColor='#444';
		cobj.shadowOffsetX=1;
		cobj.shadowOffsetY=1;
		cobj.shadowBlur=3;
		cobj.fillStyle=colorObj;
		cobj.strokeStyle=colorObj;
		cobj.arc(150,150,100,0,2*Math.PI,true);
		cobj.fill();
		cobj.stroke();
		cobj.strokeStyle="#333";
		cobj.shadowOffsetX=0;
		cobj.shadowOffsetY=0;
		cobj.shadowBlur=0;
		drawClock();

		var date=new Date();
		var ha=date.getHours()*30+date.getMinutes()*30/60-90;
		var ma=date.getMinutes()*6-90;
		var sa=date.getSeconds()*6-90;
		drawPoint(40,4,"#333",ha);
		drawPoint(60,2,"#666",ma);
		drawPoint(80,1,"red",sa);
		cobj.beginPath();
		cobj.fillStyle="#444";
		cobj.arc(150,150,3,0,2*Math.PI,true);
		cobj.fill();
		time=setInterval(function(){
//			audio.play();
			cobj.clearRect(0,0,400,400);
			cobj.beginPath();
			var colorObj=cobj.createRadialGradient(150,150,1,150,150,100);
			colorObj.addColorStop(0,"#efefef");
			colorObj.addColorStop(1,"#cecece");
			cobj.shadowColor='#444';
			cobj.shadowOffsetX=1;
			cobj.shadowOffsetY=1;
			cobj.shadowBlur=3;
			cobj.fillStyle=colorObj;
			cobj.strokeStyle=colorObj;
			cobj.arc(150,150,100,0,2*Math.PI,true);
			cobj.fill();
			cobj.stroke();
			cobj.strokeStyle="#333";
			cobj.shadowOffsetX=0;
			cobj.shadowOffsetY=0;
			cobj.shadowBlur=0;
			drawClock();
			date=new Date();
			ha=date.getHours()*30+date.getMinutes()*30/60-90;
			ma=date.getMinutes()*6-90;
			sa=date.getSeconds()*6-90;
			drawPoint(40,4,"#333",ha);
			drawPoint(60,2,"#666",ma);
			drawPoint(80,1,"red",sa);
			cobj.beginPath();
			cobj.fillStyle="#444";
			cobj.arc(150,150,3,0,2*Math.PI,true);
			cobj.fill();
		},1000);
		audio.addEventListener('timeupdate',function(){
			if(audio.currentTime>0.1){
				audio.pause();
				audio.currentTime=0;
			}
		},false);
 
				 
				/* 大图滚动一楼*/
		var	xiaobox=document.getElementById('flexslider');
		var inner=document.getElementsByClassName('flexslider_1')[0];
		var cd=inner.getElementsByClassName('flexslider_2');
		var con=cd[0].clientWidth;
		var time1=null,time2=null;
		var x=0;
		function automove(){
			time1=setInterval(function(){
				x++;
				if(x>=cd.length){
					flexslider.scrollLeft=0;
					x=1;
				}
				var start=flexslider.scrollLeft;
				var end=con*x;
				var eve=(end-start)/30;
				var step=0;
				time2=setInterval(function(){	
					step++;
					if(step>=30){
						clearInterval(time2);
					}
					start+=eve;
					flexslider.scrollLeft=start;
				},10)
			},2000)
		}
		automove();



					//jq
			/*一楼效果*/
		$("#container_ul").find("li").mouseover(function(){
			$(this).animate({
				borderBottomWidth:"5px"
			},300).addClass("container_li").siblings("li").removeClass("container_li");
		})
		
		
		
		
		/*二楼效果*/
		$(function(){
			$('#fen_xia li').hover(function(){
				$(this).find('.zhuanzhaun').stop().animate({
					top:'0px'
				},1000)
					},function(){
					$(this).find('.zhuanzhaun').stop().animate({
						top:'-408px'
				},1000)
			})
		})
		
//			上面的一上去出来的
		$(".head_nav").children("li").hover(function(){
			var	i=$(this).index();
			$('.head_nav_1').eq(i).stop(true,true).slideDown();
		},function(){
			$(this).find('.head_nav_1').stop(true,true).slideUp();
		})
	}