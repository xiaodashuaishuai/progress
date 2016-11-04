window.onload=function(){
	var bao=document.getElementById('bao');
	var divs=bao.getElementsByTagName('div');
	// var zuo_bjs=document.getElementsByTagName('zuo_bjs');
	var jian=1;
	for (var i = 0; i < divs.length; i++) {
		divs[i].index=i;
		divs[i].onclick=function(){
			divs[jian].id='';
			divs[this.index].id='zuo_bjs';
			jian=this.index;
		}
	};
}
var neis=document.getElementsByClassName('zhong_nei4');
function jian(a){
	for (var i = 0; i < neis.length; i++) {
		neis[i].style.background='';
	}
	neis[a].style.background='#AEAEAE';
}
for (var i = 0; i < neis.length; i++) {
	neis[i].index=i;
	neis[i].onmouseover=function(){
		jian(this.index);
	}
};
var con33s=document.getElementsByClassName('con33');
var con44s=document.getElementsByClassName('con44');
var con44sW=con44s[0].clientWidth;
var con3_20=document.getElementsByClassName('con3_20');
var con3_200=document.getElementsByClassName('con3_200');
var jian_1=document.getElementsByClassName('jian_1');
var bao=0,time=null;
for (var i = 0; i < con33s.length; i++) {
	con33s[i].index=i;
	con33s[i].onmouseover=function(ev){
		var event=ev||window.event;
		var form=event.formElement||event.relatedTarget;
		while(form){
			if (this==form) {
				return false;
			};
			form=form.parentNode;
		}
		clearInterval(time);
		con3_20[bao].style.background='#D2D2D2';
		con3_20[this.index].style.background='#2eb9d2';
		jian_1[bao].style.top='-225px';
		var start=-225;
		var end=0;
		var eve=(end-start)/30;
		var stap=0;
		var v=this.index;
		time=setInterval(function(){
			stap++;
			if (stap>=30) {
				clearInterval(time);
			};
			start+=eve;
			jian_1[v].style.top=start+'px';
		},10)
		bao=this.index;
	}
};
for (var i = 0; i < con44s.length; i++) {
	con44s[i].index=i;
	con44s[i].onmouseover=function(){
		con3_200[bao].style.background='#D2D2D2';
		con3_200[this.index].style.background='#faa000';
		bao=this.index;
	}
};
var dian=document.getElementById('dian');
var dian1=document.getElementById('dian1');
var con3_8=document.getElementsByClassName('con3_8')[0];
dian.onclick=function(){
	clearInterval(time);
	var start=0;
	var end=1000;
	var eve=(end-start)/30;
	var stap=0;
	time=setInterval(function(){
		stap++;
		if (stap>=30) {
			clearInterval(time);
		};
		start+=eve;
		con3_8.scrollLeft=start;
	},10)
}
dian1.onclick=function(){
	clearInterval(time);
	var start=1000;
	var end=0;
	var eve=(end-start)/30;
	var stap=0;
	time=setInterval(function(){
		stap++;
		if (stap>=30) {
			clearInterval(time);
		};
		start+=eve;
		con3_8.scrollLeft=start;
	},10)
}
var jian3=document.getElementById('jian3');
var jian4=document.getElementById('jian4');
var zhong_shang=document.getElementsByClassName('zhong_shang')[0];
var juan=document.getElementsByClassName('juan');
jian3.onclick=function(){
	clearInterval(time);
	var start=0;
	var end=312;
	var eve=(end-start)/30;
	var stap=0;
	time=setInterval(function(){
		stap++;
		if (stap>=30) {
			clearInterval(time);
		};
		start+=eve;
		zhong_shang.scrollLeft=start;
	},10)
}
jian4.onclick=function(){
	clearInterval(time);
	var start=312;
	var end=0;
	var eve=(end-start)/30;
	var stap=0;
	time=setInterval(function(){
		stap++;
		if (stap>=30) {
			clearInterval(time);
		};
		start+=eve;
		zhong_shang.scrollLeft=start;
	},10)
}
jian3.onmouseover=function(){
	jian3.style.background='#81FF00';
	jian4.style.background='#EEEEEE';
}
jian4.onmouseover=function(){
	jian4.style.background='#81FF00';
	jian3.style.background='#EEEEEE';
}
var lis=document.getElementsByClassName('jian_6');
var show=document.getElementsByClassName('zhong_jian');
var neiS=document.getElementsByClassName('zhong_nei'); 
function jianSS(a){
	for (var i = 0; i < neis.length; i++) {
		neis[i].style.background='';
	};
	neis[a].style.background='#AEAEAE';
}
for (var i = 0; i < neis.length; i++) {
	neis[i].index=i;
	neis[i].onmouseover=function(ev){
		var event=ev||window.event;
			if (event.stopPropagation){
				event.stopPropagation();//非IE阻止事件传播
			}else{
				event.cancelBubble=true;//IE阻止事件冒泡
			}
		jianSS(this.index);
	}
};
function jian(a){
	for (var i = 0; i < neiS.length; i++) {
		show[i].style.display='none';
		lis[i].style.border='0 none';
	}
	show[a].style.display='block';
	lis[a].style.border="2px solid #51B23E";
}
function jianS(a){
	for (var i = 0; i < neis.length; i++) {
		neis[i].style.background='';
	};
	neis[3*a].style.background='#AEAEAE';
}
for (var i = 0; i < neiS.length; i++) {
	neiS[i].index=i;
	neiS[i].onmouseover=function(){
		jian(this.index);
		jianS(this.index);
	}
};
