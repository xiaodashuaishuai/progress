

AV.initialize("y3zYWu8pC6GR9UvMevjW6TLj", "7OCRC4a9qnlWRs9hy7HTLs77");
// AV.initialize("pnLOvBg4DfvoHkhBvpWa3gXD", "SFIAeyofwIsnXJrRPfc7sIb6");

	var OverseasCar = AV.Object.extend("OverseasCar");
	var StoreCar = AV.Object.extend("StoreCar");
	var NowCar = AV.Object.extend("NowCar");
	var Cars = AV.Object.extend("Cars");
	var Brand = AV.Object.extend("Brand");
	var CarComment = AV.Object.extend("CarComment");
	var Color = AV.Object.extend("Color");
	var ChooseConfig = AV.Object.extend("ChooseConfig");
	var Order = AV.Object.extend("Order");
	var StoreCarFormwork = AV.Object.extend("StoreCarFormwork");
	var Storeshop = AV.Object.extend("Storeshop");

var appId = '4pF1J5Mr9HIeghnfN8L2crbB';
var appKey = 'eT2vletJN4j4khh376Xe9ihH'; 


//加载
function showProcress(){
	var loadings =  document.getElementsByClassName("loadingBlock");
	if (loadings.length == 0) {
		$("body").append(' <div class="loadingBlock"><div class="la-ball-spin-clockwise la-2x"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="loadingWord">数据加载中，请稍等...</div></div>');
	}else{
		var load = loadings[0];
		load.style.display = "block";
	}
}
function hiddenProcess(){
	var loadings =  document.getElementsByClassName("loadingBlock");
	if (loadings.length != 0) {
		var load = loadings[0];
		load.remove();
	}
}


//登录弹框
function loging () {
	var html =  
        '   <div class="form-row">' +                        
        '       <input type="text" name="username" placeholder="账号" />' +
        '   </div>' +
        '   <div class="form-row">' +                        
        '       <input type="password" name="password" placeholder="密码" />' +
        '   </div>' +
        '   <div class="form-row">' +                        
        '       <label for="check">还没有账号？</label>&nbsp;<span class="registered" style="color:#ff9900;">立即注册</span>' +
        '   </div>';
    
    new $.flavr({  
        title       : '立即登陆',
        iconPath: 'http:/',
        icon        : '/ac-y3zywu8p.clouddn.com/56cd5ac63cf5483f.png',
        dialog      : 'form',
        form        : { content: html, method: 'post' },
        onSubmit    : function( $container, $form ){
            var importName = $form[0][0].value;
            var importPass = $form[0][1].value;
            if (importName == "") {
            	new $.flavr("您还没有输入账号");
            	return false;
            }      
            if (importPass == "") {
            	new $.flavr("您还没有输入密码");
            	return false;
            }
            comeLog(importName,importPass);
            return false;
        }            
    });
    $(".danger").html("登录");
    $(".default").html("关闭");
	$(".registered").on("click",function () {
		$(".default").trigger("click");
		registered();
	});

};

//执行登陆
function comeLog (zh_v,mm_v) {
	//获取用户名和密码
	var query_user = new AV.Query("_User");
	query_user.equalTo("mobilePhoneNumber",zh_v);
	query_user.find({
		success:function (this_user) {
			if (this_user == '') {
				new $.flavr("不存在该用户");
				return false;
			};
			var this_username = this_user[0].get("username");
			goLog(this_username,mm_v);
		},error:function () {
			new $.flavr("不存在该用户");
		}
	});
}

//执行登陆
function goLog (this_username,mm_v) {
	AV.User.logIn(this_username,mm_v,{
		success:function (user) {
			window.location.reload();
		},error:function () {
			new $.flavr("密码错误");
		}
	});
};

//验证码输入
function verfityCode(phone,callback){
	var html =  
        '   <div class="form-row">' +                        
        '       <input type="text" name="username" placeholder="请输入验证码" />' +
        '   </div>' +
    
    new $.flavr({  
        title       : '短信验证',
        iconPath: 'http:/',
        icon        : '/ac-y3zywu8p.clouddn.com/56cd5ac63cf5483f.png',
        dialog      : 'form',
        form        : { content: html, method: 'post' },
        onSubmit    : function( $container, $form ){
            var code = $form[0][0].value;
            if (importName == "") {
            	new $.flavr("您还没有输入验证码");
            	return false;
            }      
             showProcress();
            AV.Cloud.verifySmsCode(String(code), String(phone)).then(function(){
		  hiddenProcess();
		  callback();
	}, function(err){
		   hiddenProcess();
	               new $.flavr("请输入正确的验证码"); 
	});
            return false;
        }            
    });
    $(".danger").html("验证");
    $(".default").html("关闭");

}


//注册事件
function registered () {
	var html =  
        '   <div class="form-row">' +                        
        '       <input type="text" name="username" placeholder="昵称" />' +
        '   </div>' +
        '   <div class="form-row">' +                        
        '       <input type="text" name="phone" placeholder="手机号码" / class="phone">' +
        '   </div>' +
        '   <div class="form-row" style="overflow:hidden;">' +                        
        '       <input style="width:53%;float:left;" type="text" name="phones" placeholder="验证码" / class="code">' +
        '       <input style="width:45%;float:left;margin:0 0 0 2%;background:rgba(197,197,197,1);color:rgba(255,90,0,1);" type="button" name="phoneh" value="获取验证码" / class="requestCode">' +
        '   </div>' +
        '   <div class="form-row">' +                        
        '       <input type="password" name="password" placeholder="密码 3~8位字符" / class="passwordClass">' +
        '   </div>';
    
    new $.flavr({  
        title       : '注册账号',
        iconPath    : 'img/',
        icon        : 'icon.png',
        dialog      : 'form',
        form        : { content: html, method: 'post' },
        onSubmit    : function( $container, $form ){
            var importName = $form[0][0].value;
            var importPhone = $form[0][1].value;
            var importPass = document.getElementsByClassName("passwordClass")[0].value;
            var code = document.getElementsByClassName("code")[0].value;
            if (importName == "") {
            	new $.flavr("您还没有输入账号");
            	return false;
            }      
            if (importPhone == "") {
            	new $.flavr("您还没有输入手机号码");
            	return false;
            }    
            if (importPass == "") {
            	new $.flavr("您还没有输入密码");
            	return false;
            }
            if (code == "") {
            	new $.flavr("请您先验证手机号码");
            	return false;
            };
            if (importPass.length < 3 || importPass.length > 8) {
		new $.flavr("密码长度必须为3~8位");
            	return false;
            };
             showProcress();
             AV.Cloud.verifySmsCode(String(code), String(importPhone)).then(function(){
		  comeRegistered(importName,importPhone,importPass);
	}, function(err){
		   hiddenProcess();
	               new $.flavr("请输入正确的验证码"); 
	});
	return false;
        }            
    });
    $(".danger").html("注册");
    $(".default").html("返回");
    $(".danger").css({
    	display : "block"
    });
    $(".default").css({
    	display : "block" ,
    	marginLeft : 0 ,
    	marginTop : "6px"
    });
    $(".default").on("click",loging);
    $(".requestCode").click(function(event) {
    	/* Act on the event */
    	var phone = document.getElementsByClassName("phone")[0].value;
    	if (phone == "") {
    	 	new $.flavr("请输入手机号码"); 
    		return;
    	};
    	alert(phone);
    	 showProcress();
    	 AV.Cloud.requestSmsCode({
		 mobilePhoneNumber: phone,
		 name: '买车吧',
		 op: '注册',
		 ttl: 10
	}).then(function(){
		 hiddenProcess();
	     	 new $.flavr("验证码发送成功"); 
	}, function(err){
		 hiddenProcess();
	      	  console.log(err);
	     	   new $.flavr("抱歉,验证码发送失败了"); 
	});
    });
    
}



//执行注册
function comeRegistered (importName,importPhone,importPass) {
	var judge_username = new AV.Query("_User");
	judge_username.find({
		success:function (userall) {
			for (var i = 0; i < userall.length; i++) {
				var username_all = userall[i].get("username");
				if (importName == username_all) {
					hiddenProcess();
					new $.flavr("此用户名已被使用");
					return false;
				};
			};
			fn_add_user(importName,importPhone,importPass);
		},error:function () {
			hiddenProcess();
			new $.flavr("抱歉,数据提交失败了");
			console.log("获取所有用户名失败");
		}
	});
}

//执行注册
function fn_add_user (name,phone,pass) {
	var user = new AV.User();
	user.set("username", name);
	user.set("password", pass);
	user.set("mobilePhoneNumber", phone);
	user.signUp(null,{
	  	success: function(user) {
			window.open("index.html","_self");
			hiddenProcess();
			new $.flavr("注册成功");
	  	},error: function(user, error) {
	  	  	new $.flavr("此手机号已被使用");
	  	  	hiddenProcess();
	  	}
	});
}

//选择是否进入订单
function judegTFOrder (currentOrderCarId,callback) {
    new $.flavr({  
        title       : '订单提交成功，您可以在我的订单中查看。',
        dialog      : 'form',
        form        : { content: "", method: 'post' },
        onSubmit    : function( $container, $form ){
            callback(currentOrderCarId);
            return false;
        }            
    });
    $(".danger").html("前往订单");
    $(".default").html("一会再去");
};



//现车订单提示
var nowHintWord = [
	"您已取消该订单。",
	"您的订单正在审核中,审核过程中我们会与您取得联系,请您耐心等待,如有任何问题可联系客服人员。",
	"您的订单审核失败了，失败原因",
	"您的订单已审核通过,请点击下方支付按钮进一步操作。",
	"",
	"",
	"你的汇款审核已通过,买车吧祝您购车愉快。",
	"",
	""
];

//4S订单提示
var overHintWord = [
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。",
	"您可以通过下方信息联系4S店,在购车时请将订单编号告知4S店家,预约费用将转换为购车费用,买车吧祝您购车愉快。"
];

//价格说明
var priceState = {
	"价格说明":"到港价格为海外车价+海运费用+海运险",
	"计算方法":"综合税率包括25%关税、17%增值税以及根据排量计算的消费税，计算公式：（排量 <1L = 1%，1L < 排量 <= 1.5L = 3%，1.5L < 排量 <= 2.0L = 5%，2.0L < 排量 <= 2.5L = 9%，2.5 < 排量 <= 3.0L = 12%，3.0L < 排量 <= 4.0L = 25%，排量 >= 4.0L = 40%。）",
	"3C说明":"国家强制对每辆进口车进行严格的3c检验，检验通过后方可正常上牌",
	"费用说明":"其他费用包括报关费、港口仓储、短距物流、杂费等",
	"三包说明":"由人保财险（PICC）提供的整车 三年或6万公里（以先到为准）整车三包服务￥3000元",
	"预付说明":"该价格为预估价格，最终价格可能根据汇率变化、车款配置调整等调整，提交订单后不需要支付，待订单确认后方需进行支付。"
};


//默认头像图片
function createConfig()  {  
      var oPerson = new Object;  
      oPerson.defautIcon = "http://ac-az6m919b.clouddn.com/6a6b0969de652ffc.jpg";
      return oPerson;
}  

//生成订单号
function orderH (){
	var endTime1  = new Date().getTime();
	return (Math.floor(Math.random()*1000+1)+endTime1);
}

//判断获取值是否为空
function judegK (str) {
	if (!str) {
		str = "";
	}
	return str;
}

//颜色判断
function getColor (color) {
	if (color.length == 6) {
		return "#"+color;
	}else{
		return "rgb("+color+")";
	}
}

//保留小数点后一位
function changeTwoDecimal (floatvar){
	var f_x = parseFloat(floatvar);
	if (isNaN(f_x)) {
		// console.log("海外车价格是非数字");
		f_x = "";
		return f_x;
	}
	var f_x = Math.round(f_x*10)/10;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 1) {
		s_x += '0';
	}
	return s_x;
}

//切割  字符串  三位一个逗号
function inciseNum (num) {
	var newNum = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	return newNum;
}

//转换如期
function DTS (crrentTime) {
	var mths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var mthn = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var dstr = crrentTime.toString();
	var dspl = dstr.split(" ");
	var Y;
	for (var i = 0; i < mths.length; i++) {
		dspl[1] == mths[i] ? Y = mthn[i] : Y;
	}
	var R = dspl[2];
	var N = dspl[3];
	var S = dspl[4];
	return(N + "-" + Y + "-" +R+ " "+ S);
}

//排量税率
function pailiangPrice (displayName) {
	var consumptionTax = 0;
	if (displayName <= 1) {
        consumptionTax = 0.01;
    }else if(displayName <= 1.5){
        consumptionTax = 0.03;
    }else if(displayName <= 2.0){
        consumptionTax = 0.05;
    }else if(displayName <= 2.5){
        consumptionTax = 0.09;
    }else if(displayName <= 3.0){
        consumptionTax = 0.12;
    }else if(displayName <= 4.0){
        consumptionTax = 0.25;
    }else{
        consumptionTax = 0.4;
    }
    return (0.25+0.17+consumptionTax+(0.25*consumptionTax))/(1-consumptionTax);
}

//获取当前页面id
function queryCrrentID () {
	var webId = window.location.href;
	var webIdStr = webId.toString();
	var isWebId = webIdStr.substring(webIdStr.indexOf('=')+1,webIdStr.lastIndexOf('')).substr(0,24);
	return isWebId;
}

var analytics_xzapp = AV.analytics({
    appId: appId,
    appKey: appKey,
    version: '1.0',
    channel: 'wap'
});

//页面统计
function Fun_SubmitData (eventInner,attrJ,attrV,attrJtow,attrVtwo,attrJthree,attrVthree,attrJfour,attrVfour,attrJtive,attrVfive) {

	// alert(eventInner+attrJ+attrV+attrJtow+attrVtwo+attrJthree+attrVthree+attrJfour+attrVfour+attrJtive+attrVfive);
	// alert(arguments.length);

	if (arguments.length == 1) {
		analytics_xzapp.send({
		    event: eventInner
		},function(result) {
		    if (result) {
		        console.log('统计数据发送成功');
		    }
		});
	}else if (arguments.length == 3) {
		analytics_xzapp.send({
		    event: eventInner,
		    attr: {
		        attrJ: attrV
		    }
		},function(result) {
		    if (result) {
		        console.log('统计数据发送成功');
		    }
		});
	}else if (arguments.length == 5) {
		analytics_xzapp.send({
		    event: eventInner,
		    attr: {
		        attrJ : attrV,
		        attrJtow : attrVtwo
		    }
		},function(result) {
		    if (result) {
		        console.log('统计数据发送成功');
		    }
		});
	}else if (arguments.length == 7) {
		analytics_xzapp.send({
		    event: eventInner,
		    attr: {
		        attrJ : attrV,
		        attrJtow : attrVtwo,
		        attrJthree : attrVthree
		    }
		},function(result) {
		    if (result) {
		        console.log('统计数据发送成功');
		    }
		});
	}else if (arguments.length == 9) {
		analytics_xzapp.send({
		    event: eventInner,
		    attr: {
		        attrJ : attrV,
		        attrJtow : attrVtwo,
		        attrJthree : attrVthree,
		        attrJfour : attrVfour
		    }
		},function(result) {
		    if (result) {
		        console.log('统计数据发送成功');
		    }
		});
	}else if (arguments.length == 11) {
		analytics_xzapp.send({
		    event: eventInner,
		    attr: {
		        attrJ : attrV,
		        attrJtow : attrVtwo,
		        attrJthree : attrVthree,
		        attrJfour : attrVfour,
		        attrJtive : attrVfive
		    }
		},function(result) {
		    if (result) {
		        console.log('统计数据发送成功');
		    }
		});
	}
}


$(document).ready(function() {
	//拨打客服电话统计
	$(".wrap_phone").click(function () {
		var eventInner = "拨打客服电话";
		var attrJ = "渠道";
		var attrV = "wap";
		Fun_SubmitData(eventInner,attrJ,attrV);
	});
	$(".community_phone").click(function () {
		var eventInner = "拨打客服电话";
		var attrJ = "渠道";
		var attrV = "wap";
		Fun_SubmitData(eventInner,attrJ,attrV);
	});
	
});

