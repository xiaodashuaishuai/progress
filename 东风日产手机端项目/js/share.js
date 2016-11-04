	
$(document).ready(function () {

	AV.initialize("az6m919bwp0pkf4edkj2al3zdbwmu0glckcvkabh3djjwr1n", "v129mbhucaws9sboi6nn3rgx5pjy4fuhp0cv8wbesc0mgtjz");

	var appId = 'az6m919bwp0pkf4edkj2al3zdbwmu0glckcvkabh3djjwr1n';
	var appKey = 'v129mbhucaws9sboi6nn3rgx5pjy4fuhp0cv8wbesc0mgtjz';
	var forum_voice;
	var audioElm;//播放音频时使用
	var isPlayAudio = false;//是否正在播放音频
	// 实例化统计分析功能
	var analytics_fenxiang = AV.analytics({

	    // 设置 AppId
	    appId: appId,

	    // 设置 AppKey
	    appKey: appKey,

	    // 你当前应用或者想要指定的版本号（自定义）
	    version: '1.0',

	    // 你当前应用的渠道或者你想指定的渠道（自定义）
	    channel: 'wap'

	});

	// 发送自定义的统计事件
	analytics_fenxiang.send({

	    // 事件名称
	    event: '通过分享页面打开wap',

	    // 事件属性，任意数据
	    attr: {
	        '类别': '帖子'
	    }

	    // 该事件持续时间（毫秒）
	    // duration: 6000
	}, function(result) {
	    if (result) {
	        console.log('统计数据发送成功！');
	    }
	}); 

	monizhixing();

	
	function monizhixing () {
		

		var query_fourm = new AV.Query("Fourm");
		var query_user = new AV.Query("_User");
		var query_fourmcomment = new AV.Query("FourmComment");
		var arr = new Array();
		var arrr = new Array();
		var memo_in = new Array();


		//在当前页面中获取id
		var yemian_id3=window.location.href;
		var yemian_id_st3 = yemian_id3.toString();
		var yemian_id_over3 = yemian_id_st3.substring(yemian_id_st3.indexOf('=')+1,yemian_id_st3.lastIndexOf('')).substr(0,24);

		var in_id = yemian_id_over3;


		//获取Fourm中的
		query_fourm.get(in_id,{  //fourmid
			success:function (fourm_all) {
				var fourm_images = fourm_all.get("images");
				var fourm_video = fourm_all.get("video_url");
				var fourm_rewardcount = fourm_all.get("rewardCount");
				// console.log(fourm_video);
				// alert(fourm_rewardcount);
				$("#user_shang_num").append(fourm_rewardcount);
				var fourm_images_memo = fourm_all.get("image_memo");	
				memo_in =fourm_images_memo;
				// console.log(memo_in);
				//memo_in = ["13","123","321","321","222","222","222","222"];
				if(!memo_in){
					memo_in = null;
				}
				if (fourm_video) {
					show_viseo(fourm_video);
				}
				if (fourm_images) {
					optain_pic(fourm_images,memo_in);
				}
				// console.log(memo_in);
				var fourm_user_id = fourm_all.get("user").id;
				$("#ftr_id").append(fourm_user_id);
				var fourm_title = fourm_all.get("title");
				var fourm_content = fourm_all.get("content");
				var fourm_date = fourm_all.createdAt;
				var fourm_likecount = fourm_all.get("likeCount"); 
				var fourm_commentcount = fourm_all.get("commentCount");
				var fourm_browsecount = fourm_all.get("browse_count");
				forum_voice = fourm_all.get("voice");
				// console.log(forum_voice);
				if (forum_voice) {
					$("#voice_show").append('<input type="button" id="audio_btn" value="播放语音"/>');
					add_voice();
				};
				optain_usernam(fourm_user_id);
				add_title(fourm_title);
				add_content(fourm_content);
				add_date(fourm_date);
				add_likecount(fourm_likecount);
				add_commentcount(fourm_commentcount);
				add_browsecount(fourm_browsecount);
			},error:function () {
				alert('获取失败');
			}
		})

		//将赞的数量显示
		function add_likecount (fourm_likecount) {
			$('.tou_zanshu').append(fourm_likecount);
		}

		//将评论的数量显示
		function add_commentcount (fourm_commentcount) {
			$('.tou_pingshu').append(fourm_commentcount);
		}

		//将浏览的数量显示
		function add_browsecount (fourm_browsecount) {
			$('.tou_kanshu').append(fourm_browsecount);
		}

		//获取图片并分割
		function optain_pic (fourm_images,memo_in) {
			
			var strArray = fourm_images.split(',');
			// console.log(strArray);
			if(memo_in){
				for(var i =0 ;i<strArray.length;i++){
				    var temp = strArray[i];
				    var memo_in_i = memo_in[i];
				    show_temp(temp,memo_in_i);
				}
			}
			else{
				for(var i =0 ;i<strArray.length;i++){
				    var temp = strArray[i];
				    show_temp(temp,"");
				}
			}
		}

		//将图片显示出来
		function show_temp (temp,memo_in_i) {
			// $('#pic_show').append('<div>'+temp+'</div>');
			$('#pic_show').append('<img src="'+temp+'"><div class="pic_show_memo">'+memo_in_i+'</div>');
		}

		//将视频显示出来
		function show_viseo (fourm_video) {
			$('#pic_show').append('<video class="this_video" src="'+fourm_video+'" controls="controls"></video>');
		}

		//通过获取到的对应的userID获取_User中的username,userIcon
		function optain_usernam (fourm_user_id) {
			query_user.get(fourm_user_id,{
				success:function (_user_all) {
					var _user_username = _user_all.get("username");
					var _user_userIcon = _user_all.get("userIcon")._url;
					var _user_user_id = _user_all.id;
					// console.log(_user_user_id);
					add_username(_user_username);
					add_userIcon(_user_userIcon);
				},error:function () {
					alert('获取username失败');
				}
			})
		}
		//将音频显示出来
		function add_voice(){
			var btn = document.getElementById("audio_btn");
			audioElm = document.createElement("audio");
			audioElm.src =  forum_voice;
			audioElm.load();
			addLintenerAudio();
		}
		//监听audio事件
		function addLintenerAudio(){
			//监听播放进度
			audioElm.addEventListener('canplay',function(){
				    if (!isNaN(audioElm.duration)) {
					 setAudioDur();
				    };
			},false);
			//监听播放完成
			audioElm.addEventListener('ended',function(){
				 isPlayAudio = false;
				 audioElm.load();
				 if (!isNaN(audioElm.duration)) {
					 setAudioDur();
				 }else{
				 	 btn.value =  "播放语音";
				 }
			});
			//监听播放进度
		            audioElm.addEventListener('timeupdate',function(){
				    if (!isNaN(audioElm.duration)) {
				            setAudioLastTime();
				    };
			},false);
		}
		//设置语音总时长
		function setAudioDur(){
			 var btn = document.getElementById("audio_btn");
			 var surplus = audioElm.duration;
		             var surplusMin = parseInt(surplus/60);
		             var second = durInt % 60;
		             var durInt = parseInt(surplus);
		             if (surplusMin != 0) {
		              	  btn.value =  "播放语音(" + surplusMin + "."+  second + "分)";
		             }else{
		             	  btn.value =  "播放语音(" + durInt + "秒)";
		             }
		}
		//设置音频播放进度
		function setAudioLastTime(){
			//剩余时间
		           var btn = document.getElementById("audio_btn");
		           var surplus = audioElm.duration-audioElm.currentTime;
		           var surplusMin = parseInt(surplus/60);
		           var second = durInt % 60;
		           var durInt = parseInt(surplus);
		           if (surplusMin != 0) {
		             	  btn.value =  "剩余时长(" + surplusMin + "."+  second + "分)";
		           }else{
		             	  btn.value =  "剩余时长(" + durInt + "秒)";
		           }
		}
		//播放音频
		$("#audio_btn").click(function() {
			if (isPlayAudio == true) {
				stopVoice();
			}else{
				playVoice();
			}
			
		});

		//播放音频
		function playVoice(){
			isPlayAudio = true;
			var btn = document.getElementById("audio_btn");
		            audioElm.play(	);
		}
		//暂停音频
		function stopVoice(){
			isPlayAudio = false;
			audioElm.pause();
		}
		//将用户名userIcon显示出来
		function add_userIcon (_user_userIcon) {
			$('#user_show_Icon').append('<img src="'+_user_userIcon+'">');
		}

		//将用户名username显示出来
		function add_username (_user_username) {
			$('#user_show_name').append('<div>'+_user_username+'</div>');
		}

		//将用标题title显示出来
		function add_title (fourm_title) {
			$('#title_show').append('<div>'+fourm_title+'</div>');
		}

		//将用内容content显示出来
		function add_content (fourm_content) {
			$('#content_show').append('<div>'+fourm_content+'</div>');
		}

		//将用时间date显示出来
		function add_date (fourm_date) {
			fourm_date_string = fourm_date.toString();

			var sss = fourm_date_string.split(' ');
			for(var i =0 ;i<sss.length;i++){
			    arr[i] = sss[i];
			    // console.log(arr);
			}
			vis_yue = arr[1];
			vis_ri = arr[2];
			vis_nian = arr[3];
			vis_shi = arr[4];
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

			$('#date_show').append('<div>'+vis_nian+'-</div><div>'+vis_yue+'-</div><div>'+vis_ri+'&nbsp;</div><div>'+vis_shi+'</div>');

		}

		fourmcomment_ob();
		//查找
		function fourmcomment_ob () {
			query_fourmcomment.equalTo("fourm_id",in_id);             //fourmid
			query_fourmcomment.include("user");
			// query_fourmcomment.include("to_user_id");
			query_fourmcomment.find({
				success:function (this_fc_ob_all) {
					for (var i = 0 ; i < this_fc_ob_all.length ; i ++){
						var this_fc_ob = this_fc_ob_all[i];
						var this_fs_ob_content = this_fc_ob_all[i].get("content");
						var this_fc_ob_user_icon = this_fc_ob_all[i].get("user").get("userIcon")._url;
						var this_fc_ob_user_name = this_fc_ob_all[i].get("user").get("username");
						var this_fc_ob_date = this_fc_ob_all[i].createdAt;
						var this_fc_ob_user = this_fc_ob_all[i].get("user");
						// console.log(i);
						// console.log(this_fc_ob);
						// console.log(this_fs_ob_content);
						// console.log(this_fc_ob_user_icon);`
						// console.log(this_fc_ob_user);
						// console.log(this_fc_ob_date);
						add_comment(this_fc_ob_user_icon,this_fs_ob_content,this_fc_ob_user_name,this_fc_ob_date);
					}
				}
			})
		}

		function add_comment (this_fc_ob_user_icon,this_fs_ob_content,this_fc_ob_user_name,this_fc_ob_date) {

			fc_date_string = this_fc_ob_date.toString();

			var ssss = fc_date_string.split(' ');
			for(var i =0 ;i<ssss.length;i++){
			    arrr[i] = ssss[i];
			    // console.log(arr);
			}

			viss_yue = arrr[1];
			viss_ri = arrr[2];
			viss_nian = arrr[3];
			viss_shi = arrr[4];
			// console.log(vis_yue);
			// console.log(vis_ri);
			// console.log(vis_nian);
			// console.log(vis_shi);
			if (viss_yue == 'Jan') {
				viss_yue = '01';
			};
			if (viss_yue == 'Feb') {
				viss_yue = '02';
			};
			if (viss_yue == 'Mar') {
				viss_yue = '03';
			};
			if (viss_yue == 'Apr') {
				viss_yue = '04';
			};
			if (viss_yue == 'May') {
				viss_yue = '05';
			};
			if (viss_yue == 'Jun') {
				viss_yue = '06';
			};
			if (viss_yue == 'Jul') {
				viss_yue = '07';
			};
			if (viss_yue == 'Aug') {
				viss_yue = '08';
			};
			if (viss_yue == 'Sep' || viss_yue == 'Sept') {
				viss_yue = '09';
			};
			if (viss_yue == 'Oct') {
				viss_yue = '10';
			};
			if (viss_yue == 'Nov') {
				viss_yue = '11';
			};
			if (viss_yue == 'Dec') {
				viss_yue = '12';
			};

			$('#comment_show').append("<div class='comment_show_in'><div class='comment_icon_show'><img src='"+this_fc_ob_user_icon+"'></div><div class='comment_name_show'><div>"+this_fc_ob_user_name+"</div></div><div class='comment_date_show'><div>"+viss_nian+"-</div><div>"+viss_yue+"-</div><div>"+viss_ri+"&nbsp;</div><div>"+viss_shi+"</div></div><div class='comment_user_publish_show'>"+this_fs_ob_content+"</div>");


		}

	}

	//下载app事件
	$("#dian").click(function () {
		// 实例化统计分析功能
		var analytics_xz_app = AV.analytics({

		    // 设置 AppId
		    appId: appId,

		    // 设置 AppKey
		    appKey: appKey,

		    // 你当前应用或者想要指定的版本号（自定义）
		    version: '1.0',

		    // 你当前应用的渠道或者你想指定的渠道（自定义）
		    channel: 'wap'

		});

		// 发送自定义的统计事件
		analytics_xz_app.send({

		    // 事件名称
		    event: '通过分享页面下载app',

		    // 事件属性，任意数据
		    attr: {
		        '渠道': '通过分享页面下载app'
		    }

		    // 该事件持续时间（毫秒）
		    // duration: 6000
		}, function(result) {
		    if (result) {
		        console.log('统计数据发送成功！');
		    }
		}); 

		window.open("index.html","_self");
		// window.open("https://appsto.re/cn/WOe59.i","_self");
		//判断打开端口是苹果还是安卓
		// fn_judge();
		
	});

	//进入页面判断打开端口是苹果还是安卓
	/*fn_judge_window();
	function fn_judge_window () {
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
			$("#dian").html("打开买车吧");
		}
		//安卓
		if (browser.versions.android) {
			// alert("安卓手机");
			$("#dian").html("进入买车吧");
		}
	}

	//判断打开端口是苹果还是安卓
	function fn_judge () {
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
			fn_appone();
		}
		//安卓
		if (browser.versions.android) {
			// alert("安卓手机");
			fn_anzhuo();
		}
	}

	//苹果手机执行事件
	function fn_appone () {

		$("html,body").animate({scrollTop:'0'},function () {
			$(".hint_share").show();
			$(".hint_share_iphone_out").show();
		});

		$(".hint_share_iphone_out").click(function () {
			$(".hint_share").hide();
			$(".hint_share_iphone_out").hide();
		});

		$(".hint_left").click(function () {
			if (isWeiXin()) {
				$("html,body").animate({scrollTop:'0'},function () {
					$(".hint_share_out").show();
					$(".hint_share").show();
				});

				$(".hint_share_out").click(function () {
					$(".hint_share_out").hide();
					$(".hint_share").hide();
				});
				// createIframe();
			}else{
				createIframe();
			}
		});

		$(".hint_right").click(function () {
			window.open("index.html","_self");
		});

	}

	//安卓手机执行时间
	function fn_anzhuo () {
		// alert("安卓");
		window.open("index.html","_self");
	}

	//判断是否为微信
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}

	//打开下载地址
	var loadIframe = null;
	function createIframe () {
		  var iframe = document.createElement("iframe");
		    iframe.style.cssText = "display:none;width:0px;height:0px;";
		    document.body.appendChild(iframe);
		    loadIframe = iframe;
		    redirect(loadIframe);
	}

	function redirect (loadIframe) {
	  loadIframe.src="http://mp.weixin.qq.com/mp/redirect?url=http%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2Fid1038371376%23rd";
	  var t = Date.now();
	  setTimeout(function(){
	    if(Date.now()-t < 600){
	      location.href="http://mp.weixin.qq.com/mp/redirect?url=https%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fwo-de-da-xue%2Fid1038371376?mt=8rd";
	    }
	  },500)
	}*/
		

})