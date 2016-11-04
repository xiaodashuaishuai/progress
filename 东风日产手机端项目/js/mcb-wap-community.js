
$(document).ready(function () {

	showProcress();

	//进入论坛页面统计
	var eventInner = "主要板块打开次数";
	var attrJ = "板块";
	var attrV = "论坛";
	Fun_SubmitData(eventInner,attrJ,attrV);

	var yn_login = false;

	var currentUser = AV.User.current();
	if (currentUser) {
	  	// do stuff with the user
	  	yn_login = true;
	} else {
	  	// show the signup or login page
	  	yn_login = false;
	}
	

	//保存当前登录用户
	var currentUser = AV.User.current();
	if (currentUser) {
		//console.log("保存");
	}else {
		//console.log("还没登录");
	};

	//注销当前用户
	$(".mcb_head_block_login_in").click(function () {
		AV.User.logOut();
		var currentUser = AV.User.current();
		window.open("index.html","_self");
	});

	//返回上层事件
	$(".cars_head_left").click(function () {
		window.open("../index.html","_self");
	});

	//获取所有评论
	var scoi_num = 0;
	caopea_fourm();
	function caopea_fourm () {
		var query_fourm = new AV.Query("Fourm");
		query_fourm.descending("createdAt");
		query_fourm.skip(10*scoi_num);
		query_fourm.limit(10);
		query_fourm.include("user");
		query_fourm.include("_File");
		query_fourm.find({
			success:function (is_fourm_eight) {
				$(".mcb_community_main").html("");
				for (var i = 0; i < is_fourm_eight.length; i++) {
					preservation_i = i;
					var is_fourm_title = is_fourm_eight[i].get("title");
					var is_fourm_commentCount = is_fourm_eight[i].get("commentCount");
					var is_fourm_likeCount = is_fourm_eight[i].get("likeCount");
					var is_fourm_video = is_fourm_eight[i].get("video_url");
					var is_fourm_browse_count = is_fourm_eight[i].get("browse_count");
					var is_fourm_scale = is_fourm_eight[i].get("scale");
					var is_fourm_video_cover = is_fourm_eight[i].get("video_cover");
					var is_fourm_tags = is_fourm_eight[i].get("tags");
					var is_fourm_content = is_fourm_eight[i].get("content");
					var content_mb = 0;
					if (is_fourm_content == "" || !is_fourm_content) {
						content_mb = 0;
					}else{
						content_mb = 10;
					}
					//遍历标签
					var tags1,tags2,tags3;
					if (is_fourm_tags == "") {
						tags1 = "";
						tags2 = "";
						tags3 = "";
					}else{
						var tags1 = String(is_fourm_tags).split(",")[0];
						var tags2 = String(is_fourm_tags).split(",")[1];
						var tags3 = String(is_fourm_tags).split(",")[2];
					}
					if (!tags1 || tags1 == "") {
						tags1 = "";
					}else{
						tags1 = "#"+tags1;
					}
					if (!tags2 || tags2 == "") {
						tags2 = "";
					}else{
						tags2 = "&nbsp;#"+tags2;
					}
					if (!tags3 || tags3 == "") {
						tags3 = "";
					}else{
						tags3 = "&nbsp;#"+tags3;
					}
					if (!is_fourm_video) {
						is_fourm_video = "";
					};
					var is_fourm_images = is_fourm_eight[i].get("images");
					if (!is_fourm_images) {
						is_fourm_images = "";
					};
					if (!is_fourm_scale) {
						is_fourm_scale = "";
					}
					var is_fourm_user = is_fourm_eight[i].get("user").get("username");
					var is_fourm_iconfile = is_fourm_eight[i].get("user").get("userIcon");
					if (!is_fourm_iconfile) {
						var config = new createConfig();
						
						
						var is_fourm_icon = config.defautIcon;
					}else{
						var is_fourm_icon = is_fourm_iconfile.url();
					}
					var is_fourm_createdAt = is_fourm_eight[i].createdAt;
					var fourm_date_string = is_fourm_createdAt.toString();
					var sss = fourm_date_string.split(' ');
					// console.log(sss);
					vis_yue = sss[1];
					vis_ri = sss[2];
					vis_nian = sss[3];
					vis_shi = sss[4];
					// console.log(vis_yue);
					// console.log(vis_ri);
					// console.log(vis_nian);
					// console.log(vis_shi);
					if (vis_yue == 'Jan') {
						vis_yue = '01';
					};
					if (vis_yue == 'Feb') {
						vis_yue = '02';
					};
					if (vis_yue == 'Mar') {
						vis_yue = '03';
					};
					if (vis_yue == 'Apr') {
						vis_yue = '04';
					};
					if (vis_yue == 'May') {
						vis_yue = '05';
					};
					if (vis_yue == 'Jun') {
						vis_yue = '06';
					};
					if (vis_yue == 'Jul') {
						vis_yue = '07';
					};
					if (vis_yue == 'Aug') {
						vis_yue = '08';
					};
					if (vis_yue == 'Sep' || vis_yue == 'Sept') {
						vis_yue = '09';
					};
					if (vis_yue == 'Oct') {
						vis_yue = '10';
					};
					if (vis_yue == 'Nov') {
						vis_yue = '11';
					};
					if (vis_yue == 'Dec') {
						vis_yue = '12';
					};
					$(".mcb_community_main").append("<li class='zog_lis'><span class='community_main_tile'>"+is_fourm_title+"</span><div class='community_main_content' style='margin-bottom:"+content_mb+"px;'>"+is_fourm_content+"</div><div class='community_main_tags'>"+tags1+tags2+tags3+"</div><div class='community_images'></div><div class='community_main_icon'><img width='50px'height='50px'float:left; src='"+is_fourm_icon+"'></div><span class='community_main_user'>"+is_fourm_user+"</span><span class='community_main_timer'>"+vis_yue+"-"+vis_ri+"&nbsp;"+vis_shi+"</span><span class='community_main_num'>"+is_fourm_likeCount+"</span><img class='community_main_pic' src='http://ac-az6m919b.clouddn.com/8a23277fd8934c07.jpg'><span class='community_main_like'>"+is_fourm_browse_count+"</span><img class='community_main_pic' src='http://ac-az6m919b.clouddn.com/00ab4c248fa778b4.jpg'></li>")
					add_images(is_fourm_images,preservation_i,is_fourm_video,is_fourm_scale,is_fourm_video_cover);
				0};
				fn_come_fourm(is_fourm_eight);
				hiddenProcess();
			},error:function () {
				console.log("获取所有评论失败");
				hiddenProcess();
			}
		});
	};

	function add_images (is_fourm_images,preservation_i,is_fourm_video,is_fourm_scale,is_fourm_video_cover) {

		var scale_onlong = is_fourm_scale[0];
		if (!scale_onlong) {
			scale_onlong = 0.1;
		};
		var this_width = "640";
		var this_height = "";
		if (scale_onlong < 1) {
			this_width = "";
			this_height = "640";
		};
		//将图片便利成单张
		if (is_fourm_video != "") {
			$(".community_images").eq(preservation_i).append("<video style='width:"+this_width+"px;height:"+this_height+"px;margin:0 auto;display:block;' src='"+is_fourm_video+"' poster='"+is_fourm_video_cover+"' controls preload></video>");
		};
		if (is_fourm_images != "") {
			var images_onlong = is_fourm_images.split(",")[0];
			$(".community_images").eq(preservation_i).append("<img style='width:"+this_width+"px;height:"+this_height+"px;margin:0 auto;display:block;' src='"+images_onlong+"'>");
		};	
	}

	//下一页事件
	$(".mcb_community_right").click(function () {
		$('html,body').animate({'scrollTop':0},600);
		scoi_num++;
		caopea_fourm();
		$(".mcb_community_num").html("");
		$(".mcb_community_num").html("第"+(scoi_num+1)+"页");
	});

	//上一页事件
	$(".mcb_community_left").click(function () {
		$('html,body').animate({'scrollTop':0},600);
		// console.log(scoi_num);
		if (scoi_num <= 0) {
			scoi_num = 1;
		};
		scoi_num--;
		caopea_fourm();
		$(".mcb_community_num").html("");
		$(".mcb_community_num").html("第"+(scoi_num+1)+"页");
	})

	//进入评论详情事件
	function fn_come_fourm (is_fourm_eight) {
		// console.log(is_fourm_eight);
		$(".mcb_community_main .zog_lis").click(function () {
			var i = $(".mcb_community_main .zog_lis").index(this);
			// console.log(i);
			var this_fourmid = is_fourm_eight[i].id;
			window.open("mcb-wap-share.html?id="+this_fourmid,"_self");
		})
	};

	//关闭app下载页面
	$(".app_gb").click(function () {
		$(".app_block_in_block").hide();
		$(".app_block").hide();
	});

	//点击发帖事件
	$(".cars_head_right").click(function () {
		var browser = {
			versions: function () {
				var u = navigator.userAgent, app = navigator.appVersion;
				return { //移动终端浏览器版本信息 
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
					iPad: u.indexOf('iPad') > -1, //是否iPad 
				};
			}(),
		}
		//苹果
		if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			// alert("苹果手机");
			if (yn_login) {
				window.open("mcb-wap-posted.html","_self");
			}else{
				window.open("http://mp.weixin.qq.com/mp/redirect?url=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2F买车吧%2Fid1038371376?mt=8rd","_self");
			}
		}else{
			if (yn_login) {
				window.open("mcb-wap-posted.html","_self");
			}else{
				window.open("mcb-wap-login.html","_self");
			}
		}
		//安卓
		// if (browser.versions.android) {
		// 	// alert("安卓手机");
		// 	if (yn_login) {
		// 		window.open("mcb-wap-posted.html","_self");
		// 	}else{
		// 		window.open("mcb-wap-login.html","_self");
		// 	}
		// }
	});

	//点击下载app记录
	$(".app_btn").click(function () {
		var eventInner = "下载app";
		var attrJ = "渠道";
		var attrV = "wap";
		Fun_SubmitData(eventInner,attrJ,attrV);
		if (isWeiXin()) {
			$("html,body").animate({scrollTop:'0'},function () {
				$(".hint_share_out").show();
				$(".hint_share").show();
			});

			$(".hint_share_out").click(function () {
				$(".hint_share_out").hide();
				$(".hint_share").hide();
			});
		}else{
			createIframe();
		}
	});

	//判断是否为微信
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}

	var loadIframe = null;
	function createIframe () {
		  var iframe = document.createElement("iframe");
		    iframe.style.cssText = "display:none;width:0px;height:0px;";
		    document.body.appendChild(iframe);
		    loadIframe = iframe;
		    redirect(loadIframe);
	}

	function redirect (loadIframe) {
	  loadIframe.src="maicheba";
	  var t = Date.now();
	  setTimeout(function(){
	    if(Date.now()-t < 600){
	      location.href="https://appsto.re/cn/WOe59.i";
	    }
	  },500)
	}


})