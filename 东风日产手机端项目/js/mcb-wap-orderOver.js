$(document).ready(function() {
	
	//获取页面id
	var carId = queryCrrentID();

	var chooseConfigAllPirce = 0;
	var allPrice;
	var TFcoupon;
	var yyprice;

	var configRelation,displayName,carNumber;
	var carsTitleName = localStorage.getItem("carssTitle");
	var carsLog = localStorage.getItem("carssLog");
	// var carsPrice = localStorage.getItem("carssPrice");
	var carsStatus = localStorage.getItem("carssStatus");
	carsStatus == "申请退款" ? carsStatus = "退款中" : carsStatus ;

	$(".overLImg").attr("src",carsLog);
	$(".overLRHead").html(carsTitleName);
	$(".blockRight").html(carsStatus);

	var queryOrder = new AV.Query("Order");
	queryOrder.include("chooseExteriorColor");
	queryOrder.include("chooseInternalColor");
	queryOrder.include("overseasCar");
	queryOrder.include("coupon");
	queryOrder.get(carId,{
		success:function (isOrder) {

			var currentOutColor = isOrder.get("chooseExteriorColor").get("color_name");
			var currentOutColorRgb = isOrder.get("chooseExteriorColor").get("color_rgb");
			if (currentOutColorRgb == ",," || !currentOutColorRgb) {
				currentOutColorRgb = isOrder.get("chooseExteriorColor").get("color_string");
			}
			var currentInColor = isOrder.get("chooseInternalColor").get("color_name");
			var currentIdentifier = isOrder.get("identifier");

			$(".overOutSe").html(currentOutColor);
			$(".overOutRgb").css("background",getColor(currentOutColorRgb));
			$(".overInSe").html(currentInColor);
			$(".prderH").html("订单号："+judegK(currentIdentifier));

			TFcoupon = isOrder.get("coupon");
			
			showChoose(isOrder);
			
			var currentOverConfigId = isOrder.get("overseasCar").get("basicConfig").id;
			showConfig(currentOverConfigId);

			displayName = judegK(isOrder.get("overseasCar").get("displacement"));
			var unitName = judegK(isOrder.get("overseasCar").get("unit"));
			$(".overLRMain").html(displayName+" "+unitName);

			var scPrice = judegK(isOrder.get("overseasCar").get("thirdCosts"));
			var qtPrice = judegK(isOrder.get("overseasCar").get("otherCosts"));
			var sbPrice = judegK(isOrder.get("overseasCar").get("plasmolysisCosts"));
			$(".SCPrice").html(scPrice);
			$(".QTPrice").html(qtPrice);
			$(".SBPrice").html(sbPrice);

			var carsPrice = judegK(isOrder.get("overseasCar").get("basicPrice"));
			$(".overLRInfo").html("$ "+inciseNum(carsPrice.toString())+"元");

			getChooseConfigPrice(carsPrice,function(price){
				chooseConfigAllPirce =  price;
				getOverseasAllPrice();
				showCouponPrice();
				showAllPrice();
			});
			var currentStatus = isOrder.get("status");
			if (currentStatus == 6) {
				tradingFun(isOrder);
			}
			if (currentStatus == 3) {
				threeTrading();
			}

			carNumber = isOrder.get("car_number");
			carNumber ? carNumber : carNumber = 1 ;
			$(".onselfPriceNums").html(carNumber);

		},error:function () {
			console.log("获取订单失败");
		}
	});

	//显示基本配置
	function showConfig (currentOverConfigId) {
		var queryConfig = new AV.Query("BasicConfig");
		queryConfig.get(currentOverConfigId,{
			success:function (isConfig) {
				
				var EngineTransmission = isConfig.get("EngineTransmission");
				var TiresWheels = isConfig.get("TiresWheels");
				var DimensionsCapacity = isConfig.get("DimensionsCapacity");
				var SafetyFeatures = isConfig.get("SafetyFeatures");

				if (EngineTransmission != "") {
					JBPZ(EngineTransmission,"发动机/变速箱");
				}
				if (TiresWheels != "") {
					JBPZ(TiresWheels,"轮胎/轮毂");
				}
				if (DimensionsCapacity != "") {
					JBPZ(DimensionsCapacity,"尺寸/容量");
				}
				if (SafetyFeatures != "") {
					JBPZ(SafetyFeatures,"安全特性");
				}

			},error:function () {
				console.log("获取基本配置失败");
			}
		});
	}

	//遍历基本配置并显示
	function JBPZ (obj,name) {
		$(".infoLeft").append("<div class='peizhi_head basic_heand'>"+name+"</div>");
		for (var i = 0; i < obj.length; i++) {
			var eArr = obj[i];
			var eArrl = String(eArr).split(",")[0];
			var eArrr = String(eArr).split(",")[1];
			$(".infoLeft").append("<div class='memo_show'><a>"+eArrl+"：</a><span>"+eArrr+"</span></div>");
			eArr = null;
		}
	}

	var donfigDuoObj = new Array();

	//显示可选配置
	function showChoose (isOrder) {
		configRelation = isOrder.relation("chooseConfig");
		configRelation.query().find().then(function (isChoose) {

			if (isChoose.length == 0) {
				getChooseConfigPrice(0,function(price){
					chooseConfigAllPirce =  price;
					getOverseasAllPrice();
					showCouponPrice();
					showAllPrice();
				});
			}
			for (var i = 0; i < isChoose.length; i++) {

				var configTitle = isChoose[i].get("title");
				var isChooseType = isChoose[i].get("chooseType");
				var isChooseBody = isChoose[i].get("body");

				if (isChooseType == 1) {
					var congifBoyTitle = isChoose[i].get("body")[0][0];
					var configProce = isChoose[i].get("body")[0][2];
					$(".condigIn").prepend("<div class='overColorLun overDan openDan'><div class='ovarDanLeft ovarDanLeftConfig'>"+configTitle+"：</div><div class='overDanMain congfigTitleName'>"+congifBoyTitle+"</div><div class='overDanRight'></div><div class='bagPrice configDanPrice'>$ "+configProce+"</div></div>");
					
					getChooseConfigPrice(configProce,function(price){
						chooseConfigAllPirce =  price;
						getOverseasAllPrice();
						showCouponPrice();
						showAllPrice();
					});
				}else{
					$(".condigIn").append("<div class='overDuo addBag'><div class='overDanHead'><p class='ovarDanLeft'>"+configTitle+"：</p><div class='overDanRight'></div><p class='bagPrice addBagPrice'></p></div></div>");
					donfigDuoObj.push(isChoose[i].get("body"));
				}
			}
			ConfigSon();
		},function () {
			console.log("查询配置失败");
		});
	}

	//多选配置里的配置
	function ConfigSon () {

		var configInNum = $(".addBag").length;
		var configProce = 0;
		var addPriceZongArr = 0;
		if (configInNum == 0) {
			getChooseConfigPrice(0,function(price){
				chooseConfigAllPirce =  price;
				getOverseasAllPrice();
				showCouponPrice();
				showAllPrice();
			});
		}
		for (var c = 0; c < configInNum; c++) {	

			if (addPriceZongArr != 0 || configProce != 0) {
				addPriceZongArr = 0;
				configProce = 0;
			}

			for (var i = 0; i < donfigDuoObj[c].length; i++) {
				var bagTrue = donfigDuoObj[c][i][3];
				if (bagTrue == true) {
					var babTitle = donfigDuoObj[c][i][0];
					var bagPrice = donfigDuoObj[c][i][2];
					configProce = configProce + bagPrice;
					$(".addBag").eq(c).append("<div class='overDuoMain'><div class='overDanMLeft'></div><div class='ovarDanLeft'>"+babTitle+"</div><div class='overDanRight'></div><div class='bagPrice'>$ "+bagPrice+"</div></div>");
				}
			}

			//总价格
			addPriceZongArr = addPriceZongArr + configProce;
			$(".addBagPrice").eq(c).html("$ "+addPriceZongArr);
			getChooseConfigPrice(addPriceZongArr,function(price){
				chooseConfigAllPirce =  price;
				getOverseasAllPrice();
				showCouponPrice();
				showAllPrice();
			});

		}

	}
	function getChooseConfigPrice(num,callback){
		// alert(chooseConfigAllPirce);
		chooseConfigAllPirce = Number(num) + Number(chooseConfigAllPirce);

		priceNum += 1;
		if (priceNum == 3) {
			// alert(chooseConfigAllPirce);
			callback(chooseConfigAllPirce);
		}	
	}

	function getOverseasAllPrice(){
		
		 	$(".overPrice").html(chooseConfigAllPirce);
			var ggpriceend = chooseConfigAllPirce*7;

			$(".goGangPrice").html(ggpriceend);

			var ZHprice = Math.round((pailiangPrice(displayName)*100)*10)/10;
			$(".zonghePrice").html(ZHprice + "%");

			var HSprice = parseInt(ggpriceend+(ggpriceend*(Number(ZHprice)/100)));
			$(".hanshuiPrice").html(HSprice);

			var SCprice = $(".SCPrice").html();
			var QTprice = $(".QTPrice").html();
			var SBprice = $(".SBPrice").html();
			var SXprice = Number(SCprice)+Number(QTprice)+Number(SBprice);
			var Zprice = (HSprice+SXprice)*carNumber;

			yyprice = Zprice*0.03;
			$(".yuyuePrice").html(parseInt(yyprice));
			allPrice = yyprice+Zprice;
	}

	var priceNum = 0;
	//价格
	function showAllPrice () {
			allPrice = allPrice - couponPrice;
			$(".zongPrice").html(parseInt(allPrice));
			$(".yufuPrice").html(parseInt(allPrice*0.3));
	}
	function showCouponPrice(){
		if (TFcoupon) {
				$(".youhuiBlock").show();
				var couponTyle = TFcoupon.get("type");
				var couponPirce = 0;
				if (couponTyle == 1) {
					couponPrice =  yyprice * (1- TFcoupon.get("discount"));
					
				}else if (couponTyle == 2) {
					couponPrice =  TFcoupon.get("cash");
				}else{
					couponPrice =  yyprice;
				}

				$(".youhuiPrice").html(parseInt(couponPrice));
		}

	}
	//交易事件
	function tradingFun (isOrder) {
		$(".blockRight").html("取消预约");
		$(".blockRight").css("background-color","#ff9900");
		$(".blockRight").click(function () {
			isOrder.set("status",8);
			isOrder.save().then(function () {
				window.open("mcb-wap-myorder.html","_self");
			},function () {
				console.log("更改订单失败");
			});
		});
	}

	//为3是交易事件
	function threeTrading () {
		$(".blockRight").html("立即支付");
		$(".blockRight").css("background-color","#ff9900");
		$(".blockRight").click(function () {
			$(".immediatelyPay").show();
			$(".mcb_wrap").hide();
			$(".blockCar").hide();
			$(".payBottomBut").click(function () {
				var YHNumber = $(".payBottomWrapInput").val();
				if (YHNumber == "" || isNaN(YHNumber)) {
					alert("请输入正确汇款账号");
					return;
				}else{
					ImremitFun(YHNumber);
				}
			});
		});
		$(".payLeft").click(function () {
			$(".immediatelyPay").hide();
			$(".mcb_wrap").show();
			$(".blockCar").show();
		});
	}

	//点击我已汇款
	function ImremitFun (YHNumber) {
		var currentOrder = new AV.Query("Order");
		currentOrder.get(carId,{
			success:function (isOrder) {
				isOrder.set("back_account",YHNumber);
				isOrder.set("status",4);
				isOrder.save().then(function () {
					console.log("保存订单成功");
					window.open("mcb-wap-myorder.html","_self");
				},function () {
					console.log("保存订单失败");
				});
			},error:function () {
				console.log("保存订单失败");
			}
		});
	}


	

	//说明
	$(".coverPriceHint").click(function () {
		$(".overHintBlokMain").show();
		$(".overHintBlok").show();

		var currentName = this.innerHTML

		$(".overHintBlokHeadR").html(currentName);
		$(".overHintBlokInfo").html(priceState[currentName]);


	});
	$(".overHintBlokHeadL").click(function () {
		$(".overHintBlokMain").hide();
		$(".overHintBlok").hide();
	});

	//返回
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});


});