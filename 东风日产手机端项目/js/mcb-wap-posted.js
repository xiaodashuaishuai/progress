
$("document").ready(function () {

	var Tag = AV.Object.extend("Tag");
	var Fourm = AV.Object.extend("Fourm");
	var User = AV.Object.extend("_User");

	var yn_login = false;
	var current_userid = "";

	//返回上一层
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

	//保存当前用户
	var currentUser = AV.User.current();
	if (currentUser) {
		console.log("以登陆");
		yn_login = true;
		current_userid = currentUser.id;
	}else{
		console.log("未登录");
		yn_login = false;
	}

	//关闭添加标签事件
	$(".label_head_back").click(function () {
		$(".post_label_bamaout").hide();
		$(".post_label").html("");
		for (var i = 0; i < $(".post_label_son").length; i++) {
			//获取点击标签的背景色
			this_backc = document.getElementsByClassName('post_label_son')[i];
			var for_calss = this_backc.style.backgroundColor;
			// console.log(this_backc);
			// console.log(for_calss);
			if (for_calss == "rgb(0, 180, 160)") {
				var ruccent_class = this_backc.innerHTML;
				$(".post_label").append("<div class='post_label_in' style='border-top:1px solid #DBDBDB;'>"+ruccent_class+"</div>");
				$(".post_label_in").css("color","rgb(0, 180, 160)");
			};
		};
		if ($(".post_label_in").length == 0) {
			$(".post_label").append("<div class='post_label_in' style='border-top:1px solid #DBDBDB;'>选择标签</div>");
			return false;
		};
	});

	//显示添加标签事件
	$(".post_label").click(function () {
		$(".post_label_bamaout").show();
	});

	//选择板块事件
	$(".post_theme_in").click(function () {
		$(".post_theme_bama").stop().animate({left:"0px"},600);
	});
	$(".post_theme_son").click(function () {
		var i = $(".post_theme_son").index(this);
		var this_fourmclass = $(".post_theme_son").eq(i).html();
		$(".post_theme_in").html(this_fourmclass);
		$(".post_theme_in").css("color","#FF7100");
		$(".post_theme_bama").stop().animate({left:"-640px"},600);
	});

	//查找leancloud所有标签
	var query_tag = new AV.Query(Tag);
	query_tag.get("5600e58d00b0b3604a4e5fef",{
		success:function (is_tag) {
			var is_tags = is_tag.get("tags");
			// console.log(is_tags);
			for (var i = 0; i < is_tags.length; i++) {
				var only_tages = "#"+is_tags[i];
				$(".post_label_bama").append("<div class='post_label_son' style='background-color: #FF7100;'>"+only_tages+"</div>");
			};
			chioce_class();
		},error:function () {
			console.log("查询标签列表失败");
		}
	});

	//选择标签事件
	function chioce_class () {
		var jishu_dian = 0;
		$(".post_label_son").click(function () {
			var i = $(".post_label_son").index(this);

			//获取点击标签的背景色
			var this_backc = document.getElementsByClassName('post_label_son')[i];
			var this_color = this_backc.style.backgroundColor;

			// console.log(this_color);
			if (this_color != "rgb(0, 180, 160)") {
				if (jishu_dian>=3) {
					alert("最多选择3个标签");
				}else{
					$(".post_label_son").eq(i).css("background-color","#00B4A0");
					jishu_dian++;
					// console.log(jishu_dian);
				}
			}else{
				$(".post_label_son").eq(i).css("background-color","#FF7100");
				jishu_dian--;
				// console.log(jishu_dian);
			}
		});
	}


	//上传photo图片到_file
	$(".phone_file").change(function() {

		var photoes_pt = document.getElementById('phone_filed');

		if (photoes_pt.files.length > 0) {
			file_zero = photoes_pt.files[0];
			name_zero = "photoes";
		}

		var avFile_photoes_pt = new AV.File(name_zero, file_zero);
		avFile_photoes_pt.save().then(function() {
			$("#photoes_pt").val("");
			// alert('上传图片成功');
			avFile_photoes_pt_url = avFile_photoes_pt._url;
			// console.log(avFile_photoes_pt_url);
			//显示图片
			$(".pic_show").append("<div class='img_out'><div></div><img src='"+avFile_photoes_pt_url+"'><textarea placeholder='添加描述'></textarea></div>");
			//保留url
			$(".phone_url").append("<div>"+avFile_photoes_pt_url+"</div>");

			shan_tupian();

		}, function(error) {
			alert('上传图片失败');
		});
	});

	//删除图片
	function shan_tupian () {
  		// chuanjian_photo_url();
  		$(".img_out div").click(function () {
  			// var i = 0;
	  		var i = $(".img_out div").index(this);
	  		// console.log(i);
	  		if (i == -1) {
	  			return false;
	  		};
	  		
	  		$(".img_out").eq(i).remove();
	  		$(".phone_url div").eq(i).remove();

	  	});
  	}

  	//点击发帖事件
  	$(".post_send").click(function () {
  		if (yn_login) {
  			var array_imgurl = new Array();
	  		var array_imgin = new Array();
	  		var array_label = new Array();
	  		var array_scale = new Array();
	  		var gain_title = $(".post_title_info").val();
	  		var gain_info = $(".post_comment").val();
	  		var gain_class = $(".post_theme_in span").html();
	  		var gain_img_div = $(".phone_url div");
	  		var gain_imgin = $(".img_out textarea");
	  		var gain_label = $(".post_label div");
	  		//遍历图片url
	  		for (var i = 0; i < gain_img_div.length; i++) {
	  			array_imgurl[i] = gain_img_div[i].innerHTML;
	  			//获取图片实际宽高
	  			var img = new Image(); 
				img.src = gain_img_div[i].innerHTML; 
				var imgWidth = img.width; //图片实际宽度 
				var imgHright = img.height; //图片实际宽度 
				var whbi = Math.round(imgWidth/imgHright*100)/100;
				// console.log(whbi);
				array_scale[i] = whbi;
	  		};
	  		//将便利出来的图片url转换成字符串
	  		string_imgurl = String(array_imgurl);
	  		//遍历图片描述
	  		for (var i = 0; i < gain_imgin.length; i++) {
	  			array_imgin[i] = gain_imgin[i].value;
	  		};
	  		//遍历标签
	  		for (var i = 0; i < gain_label.length; i++) {
	  			var s = gain_label[i].innerHTML;
	  			if (s.substr(0,1)=="#");
				s=s.substr(1);
				array_label[i] = s;
	  		};
	  		//清空标签数组
	  		if (array_label[0] == "择标签") {
	  			array_label.length = 0;
	  		};
	  		//板块和标题是必填项
	  		if (gain_title == "" || gain_class == "选择板块" || !gain_class) {
	  			alert("请完善内容");
	  		}else{
	  			console.log(gain_title);
	  			console.log(gain_info);
	  			console.log(gain_class);
	  			console.log(string_imgurl);
	  			console.log(array_imgin);
	  			console.log(current_userid);
	  			console.log(array_label);
	  			console.log(array_scale);
	  			fn_upload(gain_title,gain_info,gain_class,string_imgurl,array_imgin,current_userid,array_label,array_scale);
	  		}
  		}else{
  			window.open("mcb-wap-login.html","_self");
  		}
  		
  	});

	//上传帖子数据
	function fn_upload (gain_title,gain_info,gain_class,string_imgurl,array_imgin,current_userid,array_label,array_scale) {

		var new_user = new User();
		new_user.id = current_userid;

		var new_fourm = new Fourm();
		new_fourm.set("tags",array_label);
		new_fourm.set("scale",array_scale);
		new_fourm.set("content",gain_info);
		if (string_imgurl != "") {
			new_fourm.set("images",string_imgurl);
		};
		new_fourm.set("title",gain_title);
		new_fourm.set("info",gain_info);
		new_fourm.set("image_memo",array_imgin);
		new_fourm.set("user",new_user);
		new_fourm.set("group_id",gain_class);
		new_fourm.save(null,{
			success:function () {
				alert("发帖成功");
			},error:function () {
				alert("发帖失败");
			}
		})

	}




})