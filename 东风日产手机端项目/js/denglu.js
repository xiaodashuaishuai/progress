$(document).ready(function () {

		var query_user = new AV.Query("_User");
		var query_fourm = new AV.Query("Fourm");
		var query_integral_dlr = new AV.Query("Integral");
		var query_integral_ftr = new AV.Query("Integral");
		var FourmComment = AV.Object.extend("FourmComment");
		var User = new AV.Object.extend("_User");
		var shang_tf = true;

		//在当前页面中获取id
		var yemian_id3=window.location.href;
		var yemian_id_st3 = yemian_id3.toString();
		var yemian_id_over3 = yemian_id_st3.substring(yemian_id_st3.indexOf('=')+1,yemian_id_st3.lastIndexOf('')).substr(0,24);

		var in_id = yemian_id_over3;


		$('#denglu').click(function () {
			var zh_v = $('#zhanghao').val();
			var mm_v = $('#mima').val();

			if (zh_v == '') {
				// alert('请输入用户名');
				$('#tishi_zh').hide();
				$('#tishi_zh2').show();
				return false;
			};

			if (mm_v == '') {
				// alert('请输入密码');
				$('#tishi_mm').hide();
				$('#tishi_mm2').show();
				return false;
			};

			//获取用户名和密码
			query_user.equalTo("mobilePhoneNumber",zh_v);
			query_user.find({
				success:function (this_user) {
					if (this_user == '') {
						// alert('不存在该用户');
						$('#tishi_zh2').hide();
						$('#tishi_zh').show();
						return false;
					};
					$('#tishi_zh').hide();
					for(i=0;i<this_user.length;i++){
						dlrid = this_user[i].id;
						this_username = this_user[i].get("username");
						this_userIcon = this_user[i].get("userIcon")._url;
					}
					zx(this_username,mm_v);
				},error:function () {
					// alert('不存在该用户');
					$('#tishi_zh2').hide();
					$('#tishi_zh').show();
				}
			})


		})
		

		//执行登录
		function zx (this_username,mm_v) {
			AV.User.logIn(this_username,mm_v,{
				success:function (user) {
					// alert('登录成功');

					shang_tf = false;

					$('#tishi_zh2').hide();
					$('#tishi_zh').hide();
					$('#tishi_mm2').hide();
					$('#tishi_mm').hide();
					$('#ding').hide();
					$('#tou_a').hide();
					$('#ding').remove();
					// console.log(user);
					//显示头像和用户名
					show_thisuser(this_username,this_userIcon);
					//执行登陆后可执行事件
					yideng_fs(this_username,this_userIcon);
					//弹出提示框
					var tk_in = "登录成功";
				    sces_tk(tk_in);
					//执行关注事件  //传入登录人的id
					fnguanzhu();
					//执行赏事件
					fnshang();
				},error:function () {
					// alert('密码错误');
					$('#tishi_zh2').hide();
					$('#tishi_zh').hide();
					$('#tishi_mm2').hide();
					$('#tishi_mm').show();
				}
			})
		}


		//登陆成功后操作
		function show_thisuser (this_username,this_userIcon) {
			// console.log(this_username);
			// console.log(this_userIcon);
			$('#tou').append("<div id='tou_name'>"+this_username+"</div><img id='tou_icon' src='"+this_userIcon+"'>");
			$("#tou").css("margin-top","123px");
		}

		
		//点赞事件
		fn_dianzan();
		function fn_dianzan () {
			$('.tuo_zan').click(function () {
				var dangqian_zanshu = $('.tou_zanshu').html();
				var dangqian_zanshu_zengyi = Number(dangqian_zanshu)+1;
				//传入数据库
				chuan_thiszan();
				// alert(dangqian_zanshu_zengyi);
				$('.tou_zanshu').html(dangqian_zanshu_zengyi);
			})
		}

		//阻止重复发送
		var fb_shuru_inner_qian = null;
		//登录后发送评论事件
		function yideng_fs (this_username,this_userIcon) {
			$('#fb_anniu').click(function () {
				// alert('发送成功');
				var fb_shuru_inner = $('#fb_shuru').val();
				// alert(fb_shuru_inner);
				if (fb_shuru_inner == fb_shuru_inner_qian) {
					// alert('不能重复发表');
					var tk_in = "不能重复发表";
				    sces_tk(tk_in);
					return false;
				};
				if (fb_shuru_inner == "") {
					// alert("发表内容不能为空");
					var tk_in = "发表内容不能为空";
				    sces_tk(tk_in);
					return false;
				};
				// alert(fb_shuru_inner);
				var dangqian_date = new Date()
				var fs_nian = dangqian_date.getFullYear();
				var fs_yue = dangqian_date.getMonth() + 1;
				var fs_ri = dangqian_date.getDate();
				var fs_shi = dangqian_date.getHours(); 
				var fs_fen = dangqian_date.getMinutes(); 
				var fs_miao = dangqian_date.getSeconds();
				if (fs_yue < 10) {
					fs_yue = '0'+fs_yue;
				};
				if (fs_ri < 10) {
					fs_ri = '0'+fs_ri;
				};
				if (fs_shi < 10) {
					fs_shi = '0'+fs_shi;
				};
				if (fs_fen < 10) {
					fs_fen = '0'+fs_fen;
				};
				if (fs_miao < 10) {
					fs_miao = '0'+fs_miao;
				};
				$('#comment_show').append("<div class='comment_show_in'><div class='comment_icon_show'><img src='"+this_userIcon+"'></div><div class='comment_name_show'><div>"+this_username+"</div></div><div class='comment_date_show'><div>"+fs_nian+"-</div><div>"+fs_yue+"-</div><div>"+fs_ri+"&nbsp;</div><div>"+fs_shi+":</div><div>"+fs_fen+":</div><div>"+fs_miao+"</div></div><div class='comment_user_publish_show'>"+fb_shuru_inner+"</div>");
				fb_shuru_inner_qian = $('#fb_shuru').val();
				//将数据传入后台
				chuan_pinglun(fb_shuru_inner);
				var tk_in = "发表成功";
			    sces_tk(tk_in);
			    $("#fb_shuru").val("");
			})
		}

		//将数据传入后台 加赞
		function chuan_thiszan () {
			var dangqian_zanshu = $('.tou_zanshu').html();
			var dangqian_zanshu_zengyi = Number(dangqian_zanshu)+1;
			query_fourm.get(in_id,{                      // fourmid
				success:function (fourmall) {
					fourmall.increment("likeCount");
					fourmall.save(null,{
						success:function () {
							var tk_in = "点赞成功";
			   				sces_tk(tk_in);
						},error:function () {
							console.log("点赞失败");
						}
					});
				},error:function () {
					alert('赞数更新失败');
				}
			})
		}

		//将数据传入后台 加评论
		function chuan_pinglun (fb_shuru_inner) {
			var objct_fourmcomment = new FourmComment();
			var ob_user = new User();
			ob_user.id = dlrid;
			objct_fourmcomment.set("fourm_id",in_id);				//fourmid
			objct_fourmcomment.set("content",fb_shuru_inner);
			// objct_fourmcomment.set("replyName",);  //被回复的人
			objct_fourmcomment.set("user",ob_user); //发评论的人
			// objct_fourmcomment.set("user",);  //发回复的人
			// console.log(fb_shuru_inner);
			objct_fourmcomment.save(null,{
				success:function () {
					// alert('c');
				},error:function () {
					alert('传入数据库失败');
				}
			})
		}

		

		wei_deng();
		//未登录点击事件
		function wei_deng () {

			//登录按钮事件
			$('#tou_a').click(function () {
				$('#ding').show();
			})

			//关闭登录框事件
			$('#guanbi').click(function () {
				$('#ding').hide();
			})

			//发表按钮事件
			$('#fb_anniu').click(function () {
				$('#ding').show();
			})

			//关注按钮事件
			$("#user_guanzhu").click(function () {
				$('#ding').show();
			});

			//赏金按钮事件
			$("#user_shang").click(function () {
				if (shang_tf) {
					$('#ding').show();
				};
			});
			
		}


		//提示框
		function sces_tk (tk_in) {
			$("#tipbox").html(tk_in);
			var tp = document.getElementById('tipbox');
			var success_fb = document.getElementById('success_fb1');
			var tim = null;
			var tp_o = 0;
			
			clearInterval(tim);
			success_fb.style.display="block";
			tp_o = 1;
			tim = setInterval(function () {
				tp_o-=0.01;
				if (tp_o <= 0) {
					tp_o = 0;
					clearInterval(tim);
					success_fb.style.display="none";
				};
				tp.style.opacity = tp_o;
			},10);
			tp.style.opacity = tp_o;
		
		}


		//定义登录人和发帖人id
		var dlrid;
		var ftrid;

		//登录成功后关注事件
		function fnguanzhu () {
			//关注事件
			$("#user_guanzhu").click(function () {
				// alert("关注事件");
				//获取发帖人id
				ftrid = $("#ftr_id").html();
				// console.log(dlrid);     //登录人的id
				// console.log(ftrid);     //发帖人id
				AV.User.current().follow(ftrid).then(function(){
				    // alert("关注成功");
				    var tk_in = "关注成功";
				    sces_tk(tk_in);
				}, function(){
				    alert("关注失败");
				});
				$('#user_guanzhu').hide();
				$("#user_qxguanzhu").show();
			});

			//取消关注事件
			$("#user_qxguanzhu").click(function () {
				AV.User.current().unfollow(ftrid).then(function(){
				    // alert("取消关注成功");
				    var tk_in = "取消关注";
				    sces_tk(tk_in);
				}, function(){
				    alert("取消关注失败");
				});
				$("#user_guanzhu").show();
				$("#user_qxguanzhu").hide();
			});

		}

		//登录成功后赏金事件
		function fnshang () {
			$("#user_shang").click(function () {
				//初始化金币数
				$(".sih_num").html("");
				$("#lvjing").addClass("ljmoshi");
				$("#shangye").show();
				//获取当前用户的金币数
				user_blogn();
			});
			//关闭打赏页面事件
			$("#shangye").click(function () {
				$("#lvjing").removeClass("ljmoshi");
				$("#shangye").hide();
			})
		}
			

		//定义登录人的金币数和所在objectid
		var dlrid_integral;
		var this_integral_dlr_id;

		//定义发帖人的金币数和所在objectid
		var ftrid_integral;
		var this_integral_ftr_id;

		//获取当前用户的金币数
		function user_blogn () {
			// alert(dlrid);
			ftrid = $("#ftr_id").html();
			// console.log(dlrid);
			// console.log(ftrid);
			query_integral_dlr.equalTo("user_id",dlrid);
			query_integral_dlr.find({
				success:function (this_integral_dlr) {
					// console.log(this_integral_dlr);
					if (this_integral_dlr == "") {
						dlrid_integral = 0;
					}else{
						for (var i = 0; i < this_integral_dlr.length; i++) {
							dlrid_integral = this_integral_dlr[i].get("integral");
							this_integral_dlr_id = this_integral_dlr[i].id;
						};
					}
					// console.log("this_integral_dlr_id"+this_integral_dlr_id);
					// console.log(dlrid_integral);
					$(".sih_num").append(dlrid_integral); //将金币数显示出来
				},error:function () {
					console.log("读取金币数失败");
				}
			});

			query_integral_ftr.equalTo("user_id",ftrid);
			query_integral_ftr.find({
				success:function (this_integral_ftr) {
					// console.log(this_integral_ftr);
					if (this_integral_ftr == "") {
						ftrid_integral = 0;
					}else{
						for (var i = 0; i < this_integral_ftr.length; i++) {
							ftrid_integral = this_integral_ftr[i].get("integral");
							this_integral_ftr_id = this_integral_ftr[i].id;
						};
					}
					// console.log("this_integral_ftr_id"+this_integral_ftr_id);
					// console.log(ftrid_integral);
					// $(".sih_num").append(ftrid_integral);
				},error:function () {
					console.log("读取金币数失败");
				}
			});

		}

		//输入金币数和确定打赏事件
		shang_shuque();
		function shang_shuque () {
			//输入赏金数事件
			$(".sih_shu").click(function (e) {
				e.preventDefault();   //jq阻止默认事件
				return false;
			})

			//确定打赏事件
			$(".sih_queding").click(function (e) {
				e.preventDefault();   //jq阻止默认事件
				var sih_shu_inner = $(".sih_shu").val();
				if (sih_shu_inner <= 0) {
					alert("不能赏0个金币啊");
					return false;
				};
				if (sih_shu_inner == "" || isNaN(sih_shu_inner)) {
					alert("必须是数字");
					return false;
				};
				if (parseInt(sih_shu_inner) != sih_shu_inner) {
					alert("只能打赏整数");
					return false;
				};
				console.log(sih_shu_inner);
				$("#shangye").hide();
				$("#lvjing").removeClass("ljmoshi");
				$(".sih_shu").val("");
				// alert("打赏成功");
				// var tk_in = "打赏成功";
				// sces_tk (tk_in);
				//将打赏后两个用户的金币数存入数据库
				cun_integral(sih_shu_inner);
				return false;
			});
		}

		//将打赏后两个用户的金币数存入数据库
		function cun_integral (sih_shu_inner) {
			//打赏成功后登陆人的金币数
			var shanghou_dlr_integral = Number(dlrid_integral)-Number(sih_shu_inner);
			console.log(shanghou_dlr_integral);
			//打赏成功后发帖人的金币数
			var shanghou_ftr_integral = Number(ftrid_integral)+Number(sih_shu_inner);
			console.log(shanghou_ftr_integral);
			//存
			query_integral_dlr.get(this_integral_dlr_id,{
				success:function (this_dlr) {
					console.log("查询登录人金币成功");
					this_dlr.set("integral",shanghou_dlr_integral);
					this_dlr.save(null,{
						success:function () {
							console.log("更新登录人金币成功");
							var tk_in = "打赏成功";
							sces_tk (tk_in);
						},error:function () {
							console.log("更新登录人金币失败");
						}
					})
				},error:function () {
					console.log("查询登录人金币失败");
				}
			});

			query_integral_ftr.get(this_integral_ftr_id,{
				success:function (this_ftr) {
					console.log("查询发帖人金币成功");
					this_ftr.set("integral",shanghou_ftr_integral);
					this_ftr.save(null,{
						success:function () {
							console.log("更新发帖人金币成功");
							var tk_in = "打赏成功";
							sces_tk (tk_in);
						},error:function () {
							console.log("更新发帖人金币失败");
						}
					})
				},error:function () {
					console.log("查询发帖人金币失败");
				}
			});

		}



















})