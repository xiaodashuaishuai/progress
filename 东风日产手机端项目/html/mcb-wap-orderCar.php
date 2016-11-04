
<!DOCTYPE html>
<html>
<head>
	<meta charset=utf-8>
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
	<script type="text/javascript" src="../js/mcb-wap-changeColor.js"></script>

    <link rel="stylesheet" type="text/css" href="../css/lato.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/animate.css">
    <link rel="stylesheet" type="text/css" href="../css/flavr.css">
    <script type="text/javascript" src="../script/flavr.min.js"></script>

</head>
<body style="background-color:#000;padding-bottom:54pt;">

    <div class="mcb_wrap">

		<div class="cars_head">
			<div class="cars_head_left"><img src="../img/bignext@3x.png"></div>
			<div class="cars_head_zhong">订单详情</div>
			<div class="cars_head_right"></div>
		</div>

		<div class="carLogo">
			<img class="carLogoin" src=''>
		</div>

		<div class="carTitle"></div>
        
		<div class="gainCar" style="border:none;">
			<div class="colorOut gainCar_div clickoc" style="width:290px;margin-left:10px;border:none;float:left;background-color:#000;color:#fff;">
				<div class="colorOut_name">外观色：</div>
				<div class="colorOut_se"></div>
			</div>
			<div class="colorIn gainCar_div clickic" style="width:290px;margin-left:10px;border:none;float:left;background-color:#000;color:#fff;">
				<div class="colorIn_name">内饰色：</div>
			</div>
			<div class="gainPricer gainPrice_div">
				<p>购车价格：</p>
				<p class='pricel terracePrice'></p>
			</div>
		</div>

		<div class="ordersMain">
			<div class="recommendHead">提车信息</div>
			<div class="ordersMainIn">您的订单正在核审中，审核过程中我们会与您取得联系，请您耐心等待，如有任何问题可联系客服人员。</div>
		</div>

		<div class="orderStoreShop">
			<div class="orderStoreHead"></div>
			<div class="orderStorePrice">全国最低价</div>
			<div class="orderStoreWrap"></div>
			<div class="orderStoreFoot">
				<img class="orderStoreFootLeft" src="../img/phone.png">
				<div class="orderStoreFootRgiht"></div>
			</div>
		</div>

		<div class="orderStoreShops">
			<div class="orderStoreHeads"></div>
			<div class="orderStorePrices">同城最低价</div>
			<div class="orderStoreWraps"></div>
			<div class="orderStoreFoots">
				<img class="orderStoreFootLefts" src="../img/phone.png">
				<div class="orderStoreFootRgihts"></div>
			</div>
		</div>

		<div class="scribeMain" style="display:none;">
			<div class="scribeMone">预约费用</div>
			<div class="scribeDoler">
				<div class="scribeDL">车辆预付费：</div>
				<div class="scribeDR"><div style="color:#000;">￥</div><div class="YYmony" style="color:#000;"></div></div>
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

		<div class="prderH"></div>

		<div class="overHintBlokMain"></div>
	    <div class="overHintBlok">
	    	<div class="overHintBlokHead">
	    		<div class="overHintBlokHeadL">关闭</div>
	    		<div class="overHintBlokHeadR">三包服务说明</div>
	    	</div>
	    	<div class="overHintBlokInfo">由人保财险（PICC）提供的整车三年或6万公里（以先到为准）整车三包服务￥3000元</div>
	    </div>


	</div>

	<div class="blockCar">
		<div class="blockCarin">
			<div class="blockLeft"><a href="tel:400-080-1870" style="color:#000;">联系客服</a></div>
			<div></div>
		    <div id="test" class="blockRight" style="background-color:#E4E4E4"></div>
		</div>
	</div>


	<script id='spay-script' src='https://jspay.beecloud.cn/1/pay/jsbutton/returnscripts?appId=dd0d3a4f-8882-492e-b1c2-62149dcfe814'></script>
	<script type="text/javascript" src="../js/mcb-wap-orderCar.js"></script>

	<script type="text/javascript">

		var url = window.location.href;
		var urlString = url.toString();
		var carId =  urlString.split("id=")[1];

		var payPrice;
		var orderId;
		var md5string;

		//跳转支付宝
		document.getElementById("test").onclick = function() {
		   	 var status =  getOrderStatus();
			    if (status != 3) {
			    	return;
			    };
		            orderId = getIdentity();
			payPrice = document.getElementsByClassName("ZZmony")[0].innerHTML;
			payPrice = Number(payPrice) * 100;
			showProcress();
			//获取Md5加密
			$.ajax({
				type:"POST",
				url:"check.php",
				data : {  "oid" : orderId , "price" : payPrice},
				dataType: "json",
				success:function(result){
					md5string = result;
					hiddenProcess();
					asyncPay();
				}
			});
		};
	    function bcPay() {
	        BC.click({
	            "title": "买车吧购车定金",
	            "amount": payPrice,
	            "out_trade_no": orderId,
	            "trace_id" : "testcustomer",
	            "sign" : md5string,
	            "instant_channel" : "ali",
	            "return_url" : "http://www.mycheba.com/html/mcb-wap-payResult.html?nowCar_id="+carId,
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