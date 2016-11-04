<?php
$appId = "dd0d3a4f-8882-492e-b1c2-62149dcfe814";
$appSecret = "8bd7022e-9adb-4a0a-a07d-9fd9ec19054d";
$title = "买车吧定金支付";
$amount = 9900;//支付总价
$out_trade_no = rand(1,1000).time();//订单号，需要保证唯一性
//1.生成sign
$sign = md5($appId.$title.$amount.$out_trade_no.$appSecret);
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name=description content="">
	<meta name=viewport content="width=device-width, initial-scale=1">
	<title>买车吧</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="../css/reset.css">
	<link rel="stylesheet" type="text/css" href="../css/mcb-wap.css">
	<link rel="stylesheet" type="text/css" href="../css/swiper.min.css">
	<link rel="stylesheet" type="text/css" href="../css/default.css">
    <link rel="stylesheet" type="text/css" href="../css/loaders.css" />
	<link rel="icon" type="images/x-icon" href="../img/icon.png" mce_href="../img/icon.png">
	<script type="text/javascript" src="../script/jquery.min.js"></script>
	<script src="https://cdn1.lncld.net/static/js/av-mini-0.5.8.js"></script>
	<script type="text/javascript" src="../script/AV.analytics.js"></script>
	<script type="text/javascript" src="../js/mcb-wap-key.js"></script>
	<script type="text/javascript" src="../script/swiper.jquery.min.js"></script>
	<script type="text/javascript" src="../script/ort.js"></script>
	<script type="text/javascript" src="../js/md5.js"></script>

    <link rel="stylesheet" type="text/css" href="../css/lato.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/animate.css">
    <link rel="stylesheet" type="text/css" href="../css/flavr.css">
    <script type="text/javascript" src="../script/flavr.min.js"></script>

	
</head>
<body style="background-color:#000;padding-bottom:54pt;">

    <div class="mcb_wrap">
        
        <div class="mcb_wrap">
			<div class="cars_head">
				<div class="cars_head_left"><img src="../img/bignext@3x.png"></div>
				<div class="cars_head_zhong">预 约 单</div>
				<div class="cars_head_right"></div>
			</div>
		</div>

		<div class="scribeHead">
			<div class="scribeTitle">预约车辆</div>
			<div class="scribeTop"></div>
			<div class="scriptLeft">外观颜色：</div>
			<div class="scriptLeftRgb"></div>
			<div class="scriptRight">内饰颜色：</div>
			<div class="scribePrice">
				<div class="scribePL">平台价格：</div>
				<div class="scribePR"></div>
			</div>
		</div>

		<div class="scribeInfo">友情提示：</div>

		<div class="scribeMain">
			<div class="scribeMone">预约费用</div>
			<div class="scribeDoler">
				<div class="scribeDL">车辆预付费：</div>
				<div class="scribeDR"><div style="color:#000;">￥</div><div class="YYmony" style="color:#000;">99</div></div>
			</div>
			<div class="scribeDoler theSB">
				<div class="scribeDL sbF">三包服务费：</div>
				<input type="checkbox" class="threeBao" id="threeBao">
				<div class="scribeDR sbF"><div style="color:#000;">￥</div><div class="plasmol" style="color:#000;"></div></div>
				<div class="whatTB">什么是三包</div>
			</div>
			<div class="jianmianPrice">
				<div class="scribeDL">优惠金额：</div>
				<div class="scribeDR"><div style="color:#000;">-￥</div><div class="JMmony" style="color:#000;"></div></div>
			</div>
			<div class="zongPrice">
				<div class="scribeDL">预约总费用：</div>
				<div class="scribeDR"><div>￥</div><div class="ZZmony"></div></div>
			</div>
		</div>

		<div class="scribeCity">
			<div class="scribeCityLeft">请选择提车城市</div>
			<div class="scribeCityRight"></div>
			<div class="scribeCurrentCity"></div>
			<div class="scribeCurrentProvince"></div>
		</div>

		<div class="scribeName">
		    <div style="height:30px;" class="perfectHint">*改姓名需要与最终购车发票上的姓名一致</div>
			<div class="scribeNTop">
				<p>姓名：</p><input class="userName" type="text" placeholder="请填写您的真实姓名">
			</div>
			<div style="height:30px;" class="perfectHint">*该手机号码用于接收购车凭证，请确保准确</div>
			<div class="scribeNBottom">
				<p>联系方式：</p><input class="userPhone" type="text" placeholder="请填写您的联系方式">
			</div>
		</div>

		<div class="scirbePayCode">
			<div class="scribePC_head">
				<div class="scribePC_headLeft">+</div>
				<div class="scribePC_headRight">使用优惠券抵消支付金额</div>
			</div>
			<div class="scribeFoot">
			    <div class="scribePC_headFoot">请输入优惠券码（共12位）</div>
				<input class="couponLeft" type="text" placeholder="前4位" value="" />
				<input class="couponWrap" type="text" placeholder="中间4位" value="" />
				<input class="couponRight" type="text" placeholder="后4位" value="" />
				<div class="useCode">使用</div>
			</div>
		</div>

	</div>

    <div class="overHintBlokMain"></div>
    <div class="overHintBlok">
    	<div class="overHintBlokHead">
    		<div class="overHintBlokHeadL">关闭</div>
    		<div class="overHintBlokHeadR">三包服务说明</div>
    	</div>
    	<div class="overHintBlokInfo">由人保财险（PICC）提供的整车三年或6万公里（以先到为准）整车三包服务￥3000元</div>
    </div>


	<div class="scribeCityBlockMain"></div>
	<div class="scribeCityBlock">
		<div class="scribeCityBlockHead">
			<div class="scribeCityBlockHeadLeft">选择提车省份</div>
			<div class="scribeCityBlockHeadGb">关闭</div>
		</div>
		<ul class="scribeCBW"></ul>
	</div>

	<div class="scribeCityBlocks">
		<div class="scribeCityBlockHead">
			<div class="scribeCityBlockHeadBack"><</div>
			<div class="scribeCityBlockHeadLefts"></div>
			<div class="scribeCityBlockHeadGb">关闭</div>
		</div>
		<ul class="scribeCBWs"></ul>
	</div>

	<div class="scribePay">
		<div id="test" class="scribePayIn">提交订单信息</div>
	</div>

	<script id='spay-script' src='https://jspay.beecloud.cn/1/pay/jsbutton/returnscripts?appId=dd0d3a4f-8882-492e-b1c2-62149dcfe814'></script>
	<script type="text/javascript" src="../js/mcb-wap-subscribe.js"></script>
	<script type="text/javascript">

		var url = window.location.href;
		var urlString = url.toString();
		var carId =  urlString.split("id=")[1];
		localStorage.setItem("pay_car_id",carId);
		//跳转支付宝
		document.getElementById("test").onclick = function() {
			var orderId = <?php echo  $out_trade_no; ?>;
			showProcress();
			payAction(orderId,function(){
				hiddenProcess();
				asyncPay();
			});
		};
	    function bcPay() {
	    	
	        var orderiD =   orderH();
	        console.log(orderiD);
	        BC.click({
	            "title": "<?php echo $title; ?>",
	            "amount": <?php echo $amount; ?>,
	            "out_trade_no": "<?php echo $out_trade_no; ?>",
	            "trace_id" : "testcustomer",
	            "sign" : "<?php echo $sign;?>",
	            "instant_channel" : "ali",
	            "return_url" : "http://www.mycheba.com/html/mcb-wap-payResult.html?car_id="+carId,
	            "optional": {"carId": carId}
	        });

	    }
	    function asyncPay() {
	        if (typeof BC == "undefined"){
	            if( document.addEventListener ){
	                document.addEventListener('beecloud:onready', bcPay, false);
	            }else if (document.attachEvent){
	                document.attachEvent('beecloud:onready', bcPay);
	            }
	        }else{
	            bcPay();
	        }
	    }
	</script>

</body>

</html>

