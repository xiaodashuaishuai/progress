$(document).ready(function() {
	
	//获取页面id
	personalId = queryCrrentID();
	// alert(personalId);

	var currentUser = AV.User.current();
	// console.log(is_personal);
	var personal_gender = currentUser.get("gender");
	var personal_username = currentUser.get("username");
	var personal_phone = currentUser.get("mobilePhoneNumber");
	var personal_icon = currentUser.get("userIcon");

	var personal_iconl;
	if (personal_icon) {
		personal_iconl = personal_icon.url();
	}else{
		personal_iconl = "http://ac-az6m919b.clouddn.com/6a6b0969de652ffc.jpg";
	}
	// console.log(personal_gender+personal_username+personal_phone+personal_iconl);
	if (personal_gender == 1) {
		personal_gender = "男";
	}else{
		personal_gender = "女";
	}

	//显示信息
	$(".personal_head_log").attr("src",personal_iconl);
	$(".personal_myname").html(personal_username);
	$(".personal_myphone").html(personal_phone);
	$(".personal_gender").html(personal_gender);

		


	//修改头像事件
	$(".personal_juede").change(function(event) {
		showProcress();
		var fileUploadControl = $(".personal_juede")[0];
		if (fileUploadControl.files.length > 0) {
		  var file = fileUploadControl.files[0];
		  var name = "image.jpg";
		  var avFile = new AV.File(name, file);
		  // console.log(avFile);
		  addGN(avFile,"userIcon","头像");
		}
	});
	

	//修改昵称事件
	$(".modify_name").on("click", function () {
		var html =  
            '   <div class="form-row">' +                        
            '       <input type="text" name="username" placeholder="昵称" />' +
            '   </div>';
        
        new $.flavr({  
            title       : '修改昵称',
            dialog      : 'form',
            form        : { content: html, method: 'post' },
            onSubmit    : function( $container, $form ){
            	showProcress();
            	var importCurrentName = $form[0][0].value;
                if (importCurrentName == "") {
                	hiddenProcess();
                	new $.flavr("您还没有输入昵称");
                	return false;
                }
				addGN(importCurrentName,"username","昵称");
                return false;
            }
        });
        $(".danger").html("修改");
        $(".default").html("关闭");
	});

	//修改性别事件
	$(".modify_gender").on("click", function () {
		var html =  
            '   <div class="form-row ismodifyGender">' +                        
            '       <input type="button" name="username" value="男" />' +
            '       <input type="button" name="username" value="女" />' +
            '   </div>';
        
        new $.flavr({  
            title       : '修改性别',
            dialog      : 'form',
            form        : { content: html, method: 'post' },
            onSubmit    : function( $container, $form ){
                return false;
            }
        });
        judegGender();
        $(".default").html("关闭");
        $(".default").css("background","#f44a56");
        $(".danger").remove();
	});

	//选择修改性别
	function judegGender () {
		$(".ismodifyGender input").click(function () {
			showProcress();
			var i = $(".ismodifyGender input").index(this) + 1;
			if (i == 1 || i == 2) {
				addGN(i,"gender","性别");
			}
		});
	}
		

	//修改数据
	function addGN (a,b,c) {
		
		currentUser.set(b,a);
		currentUser.save(null,{
			success:function () {
				window.location.reload(); 
				hiddenProcess();
			},error:function () {
				new $.flavr("修改"+c+"失败");
				hiddenProcess();
			}
		});		
	}

	//返回山层事件
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});



});