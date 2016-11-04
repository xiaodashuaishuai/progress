	//$(function() {
	/*	var P_H = document.body.clientHeight - 137;
		$('.dneglu_nr').height(P_H);
		$('.dianhua').hover(function() {
			$('.dianhua').stop().animate({
				"width" : "160px",
				"padding-left" : "20px"
			}, 500);
			$('.dianhua').css("backgroundColor", "#e4392a");
			$('.dianhua img').animate({
				"width" : "35px",
				"height" : "35px"
			}, 250, function() {
				$('.dianhua img').animate({
					"width" : "50px",
					"height" : "50px"
				}, 250)
			})
		}, function() {
			$('.dianhua').stop().animate({
				"width" : "50px",
				"padding-left" : "0px"
			}, 500);
			$('.dianhua').css("backgroundColor", "#000");
		})
		$('.weweima').hover(function() {
			$('.weweima').css("backgroundColor", "#e4392a");
			$('.erweimatu').show();
			$('.erweimatu').stop().animate({
				"background-position-y" : "0px"
			}, 500);
		}, function() {
			$('.weweima').css("backgroundColor", "#000");
			$('.erweimatu').hide();
			$('.erweimatu').stop().animate({
				"background-position-y" : "141px"
			}, 500);

		})

		$("#nav_firstpage").click(function() {
			window.location.href = sivmall.base + "/index.jhtml";
		});
		$("#nav_hro").click(function() {
			window.location.href = sivmall.base + "/hro/index.jhtml";
		});
		$("#nav_headerhunter").click(function() {
			window.location.href = sivmall.base + "/headerhunter/index.jhtml";
		});
		$("#nav_loginAndRegister").click(function() {
			window.location.href = sivmall.base + "/login.jhtml";
		});
		$("#nav_emp_query").click(function() {
			window.location.href = sivmall.base + "/query/index.jhtml";
		});
		$("#nav_userCenter").click(function() {
			window.location.href = sivmall.base + "/member/index.jhtml";
		});

		var curUrl = document.location.pathname;
		//alert(curUrl);
		if (curUrl.startsWith(sivmall.base + "/hro/")) {
			$("#nav_hro").parent().children().removeClass("head_nav_dj");
			$("#nav_hro").addClass("head_nav_dj");
		} else if (curUrl.startsWith(sivmall.base + "/member")) {
			$("#nav_userCenter").parent().children().removeClass("head_nav_dj");
			$("#nav_userCenter").addClass("head_nav_dj");
		} else if (curUrl.startsWith(sivmall.base + "/headerhunter/")) {
			$("#nav_headerhunter").parent().children().removeClass("head_nav_dj");
			$("#nav_headerhunter").addClass("head_nav_dj");
		} else if (curUrl.startsWith(sivmall.base + "/password/")
				|| curUrl.startsWith(sivmall.base + "/register.jhtml")
				|| curUrl.startsWith(sivmall.base + "/login.jhtml")) {
			$("#nav_loginAndRegister").parent().children().removeClass("head_nav_dj");
			$("#nav_loginAndRegister").addClass("head_nav_dj");
		} else if (curUrl.startsWith(sivmall.base + "/query/")) {
			$("#nav_emp_query").parent().children().removeClass("head_nav_dj");
			$("#nav_emp_query").addClass("head_nav_dj");
		} else if (curUrl.startsWith(sivmall.base + "/index.jhtml")) {
			$("#nav_firstpage").parent().children().removeClass("head_nav_dj");
			$("#nav_firstpage").addClass("head_nav_dj");
		}*/
window.onload=function(){
/*	var jian1=document.getElementById('jian1');
	var dian=document.getElementsByClassName('gr_qiye_head_l')
	var jian_1=document.getElementById('jian_1');
	var jian_2=document.getElementById('jian_2');
	var top=0;
	for (var i = dian.length - 1; i >= 0; i--) {
			dian[i].index=i;
			dian[i].onclick=function(){
				dian[top].style.background="";
				jian_1[top].className="";
				jian_2[top].style.display="";
				dian[this.index].style.background="#fff";
				jian_1[this.index].style.display="block";
				jian_2[this.index].style.display="none";
			}
		};	*/


	/*个人中心之增减明细*/
	/*var inner=document.getElementById('tep');
	var lis=inner.getElementsByTagName('li');
	var divs=document.getElementsByClassName('grzx_xia');
	var	div1s=document.getElementsByClassName('cxjg_con_xia_r2');
	function jian(a){
		for (var i = lis.length - 1; i >= 0; i--) {
			lis[i].style.background="";
			lis[i].style.color="";
			divs[i].style.display="none";
		};
		lis[a].style.background="#00307C";
		lis[a].style.color="#fff";
		divs[a].style.display="block";
	}
	for (var i = lis.length - 1; i >= 0; i--) {
		lis[i].index=i;
		lis[i].onclick=function(){
			jian(this.index);
		}
	};
*/

	// var dong_dong=document.getElementById('donghua');
	// var time1=null;
	// var x=0;
	// time1=setInterval(function(){
	// 	x++;
	// 	if (x>360) {
	// 		x=0;
	// 	}
	// dong_dong.style.background="-webkit-linear-gradient("+x+"deg,red,orange,blue)";
	// },1);



					/*猎头*/
	$(function(){
		$('#fen_xia li').hover(function(){
			$(this).find('.lietou_wenzi').stop().animate({
				top:'0px'
			},500);
				},function(){
				$(this).find('.lietou_wenzi').stop().animate({
					top:'-358px'
			},500);
		})
	})

				/*hro*/
	$(function(){
		$('#hro li').hover(function(){
			$(this).find('.heihei').stop().animate({
				top:'0px'
			},500);
				},function(){
				$(this).find('.heihei').stop().animate({
					top:'-247px'
			},500);
		})
	})
	/*----查询结果：tab切换-----*/
	$(function(){
		$.fn.extend({
			tab1:function(obj1,obj2,obj3,obj4){
				var _this=$(this);
				_this.find(obj1).click(function(){
					var i=$(this).index();
					_this.find(obj1).eq(i).addClass(obj2).siblings().removeClass(obj2);
					_this.find(obj3).eq(i).show().siblings().hide();
					_this.find(obj4).eq(i).show().siblings().hide();
				})
			}
		})	
		$(function(){
			$('.cxjg_con_xia').tab1('.cxjg_con_xia_l li','dianji','.J_ul li','.cxjg_con_xia_r div');
			$('.grzx_r').tab1('.zengjian_head_list1 li','xuanze1','.tep_1 .grzx_xia','.zengjian_head_list2 li');
		})
	})


			// 正反面转动
	$(function(){		
		$(".head_nav li").hover(function(){
			var i=$(this).index();
			$("#denglu a").eq(i).addClass("ww");
			$(".xiangdui").eq(i).stop(true,true).show("slow");
		},function(){
			var i=$(this).index();
			$("#denglu a").eq(i).removeClass("ww");
			$(".xiangdui").eq(i).stop(true,true).hide();
		})
	})




}