
$(document).ready(function () {
	
	//保存当前登录用户
	var currentUser = AV.User.current();
	if (currentUser) {
		// console.log("已登录");
		fn_modify();
	}else {
		// console.log("未登录");
		window.open("mcb-wap-login.html","_self");
	}


	function fn_modify () {

		$(".modifym_modifym").click(function () {
			var ps1 = $(".login_password").val();
			var ps2 = $(".login_passwordx").val();
			var ps3 = $(".login_passwordq").val();
			console.log(ps1,ps2,ps3);
			if (ps1 == "") {
				$(".prompt").html("");
				$(".prompt").html("请输入当前密码");
				$(".prompt").show();
				$(".login_mian").css("marginTop","0");
				return false;
			};
			if (ps2 == "") {
				$(".prompt").html("");
				$(".prompt").html("请输入新密码");
				$(".prompt").show();
				$(".login_mian").css("marginTop","0");
				return false;
			};
			if (ps3 == "") {
				$(".prompt").html("");
				$(".prompt").html("请确认新密码");
				$(".prompt").show();
				$(".login_mian").css("marginTop","0");
				return false;
			};
			if (ps2 != ps3) {
				$(".prompt").html("");
				$(".prompt").html("请确认新密码");
				$(".prompt").show();
				$(".login_mian").css("marginTop","0");
				return false;
			};

			var user = AV.User.current();
			user.updatePassword(ps1, ps2,{
			  	success: function(){
			  	  	//更新成功
			  	  	console.log("更新成功");
			  	  	$(".prompt").html("");
					$(".prompt").html("修改成功，3秒后跳回主页面").css("color","green");
					$(".prompt").animate({color: "green"},function () {
						setInterval(function () {
							window.open("../index.html","_self");
						},2000)
					});
					$(".prompt").show();
					$(".login_mian").css({marginTop:"0"});
			  	},
			  	error: function(user, err){
			  	  	//更新失败
			  	  	// console.log("修改密码失败");
			  	  	$(".prompt").html("");
					$(".prompt").html("当前密码不正确");
					$(".prompt").show();
					$(".login_mian").css("marginTop","0");
					return false;
			  	}
			});


		});
			
	}


	//返回上层事件
	$(".clak_go").click(function () {
		window.history.back(-1);
	});

	//
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	})




})