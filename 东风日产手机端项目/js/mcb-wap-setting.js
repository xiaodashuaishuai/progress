$(document).ready(function() {


	var currentUser = AV.User.current();

	
	//返回
	$(".cars_head_left").on("click", function () {
		window.history.back(-1);
	});

	//修改密码
	$(".amendPassword").on("click", revampPass);

	//意见反馈事件
	$(".opinion").on("click", feedback);

	//退出
	$(".quit").on("click", function () {
		AV.User.logOut();
		window.open("../index.html","_self");
		return false;
	});

	//执行修改密码
	function revampPass () {
		var html =  
            '   <div class="form-row">' +                        
            '       <input type="password" name="password" placeholder="旧密码" />' +
            '   </div>' +
            '   <div class="form-row">' +                        
            '       <input type="password" name="passwords" placeholder="新密码" />' +
            '   </div>' ;
        
        new $.flavr({  
            title       : '修改密码',
            dialog      : 'form',
            form        : { content: html, method: 'post' },
            onSubmit    : function( $container, $form ){
                var importPassJ = $form[0][0].value;
                var importPassX = $form[0][1].value;
                if (importPassJ == "") {
                	new $.flavr("您还没有输入旧密码");
                	return false;
                }
                if (importPassX == "") {
                	new $.flavr("您还没有输入新密码");
                	return false;
                }
                currentUser.updatePassword(importPassJ, importPassX, {
				  	success: function(){
				  	  	new $.flavr("修改密码成功");
				  	}, error: function(err){
				  		new $.flavr("修改密码失败");
				  	}
				});
                return false;
            }
        });
        $(".danger").html("修改");
        $(".default").html("关闭");
	}

	//执行意见反馈
	function feedback () {
		var html =  
            '   <div class="form-row">' +
            '       <textarea name="feedback" style="width:100%;height:100px;font-size:14px;"></textarea> ' +
            '   </div>' ;
        
        new $.flavr({  
            title       : '意见反馈',
            dialog      : 'form',
            form        : { content: html, method: 'post' },
            onSubmit    : function( $container, $form ){
            	var importFeed = $form[0][0].value;
                if (importFeed == "") {
                	new $.flavr("您还没有填写要反馈的信息");
                	return false;
                }
                var Facebook = AV.Object.extend("Facebook");
                var newFacebook = new Facebook();
                newFacebook.set("user", currentUser);
                newFacebook.set("content", importFeed);
                newFacebook.save().then(function () {
                	new $.flavr("提交反馈成功");
                }, function () {
                	new $.flavr("提交反馈失败");
                });
                return false;
            }
        });
        $(".danger").html("提交");
        $(".default").html("关闭");
	}


});