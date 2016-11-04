
	
	//获取页面id
	var car_id = "";
	var carOrderId = "";
	var url = window.location.href;
	var urlString = url.toString();
	var string =  urlString.split("php?")[1];	
	if (string) {
		var array = string.split("&");
		for (var i = 0; i < array.length; i++) {
			var str =  array[i];
			var arr = str.split("=");
			if (arr[0] == "order") {
				carOrderId = arr[1];
				showProcress();
			};
			if (arr[0] == "id") {
				car_id = arr[1];
			};
		};
	}else{
		car_id = queryCrrentID();
	}



	var orderObject;
	var carsTitleName = localStorage.getItem("carssTitle");
	var carsLog = localStorage.getItem("carssLog");
	var carsPrice = localStorage.getItem("carssPrice");
	var carsStatus = localStorage.getItem("carssStatus");
     
	carsStatus == "申请退款" ? carsStatus = "退款中" : carsStatus ;

	$(".carLogoin").attr("src",carsLog);
	$(".carTitle").html(carsTitleName);
	$(".terracePrice").html("￥ "+Math.round((carsPrice/10000)*10)/10+"万元");
	$(".blockRight").html(carsStatus);
	

	var currentreason = "";

	var queryOrder = new AV.Query("Order");
	queryOrder.include("chooseExteriorColor");
	queryOrder.include("chooseInternalColor");
	queryOrder.include("nowCar");
	queryOrder.get(car_id,{
		success:function (isOrder) {
			orderObject = isOrder;

			var currentOutColor = isOrder.get("chooseExteriorColor").get("color_name");
			var currentOutColorRgb = isOrder.get("chooseExteriorColor").get("color_rgb");
			if (currentOutColorRgb == ",," || !currentOutColorRgb) {
				currentOutColorRgb = isOrder.get("chooseExteriorColor").get("color_string");
			}
			var currentInColor = isOrder.get("chooseInternalColor").get("color_name");
			var currentIdentifier = isOrder.get("identifier");

			$(".colorOut_name").html("外观颜色："+currentOutColor);
			$(".colorOut_se").css("background",getColor(currentOutColorRgb));
			$(".colorIn_name").html("内饰颜色："+currentInColor);
			$(".prderH").html("订单号："+judegK(currentIdentifier));

			var thisCarType = isOrder.get("carType");

			// console.log(thisCarType);

			if (thisCarType == 5) {
				var currentCarType = isOrder.get("storeCar");
				cityShop(currentCarType.id);
				formShop();

				var currentStatus = isOrder.get("status");
				$(".ordersMainIn").html(overHintWord[currentStatus]);
			}

			if (thisCarType == 2) {
				$(".orderStorePrice").remove();
				$(".orderStoreShops").remove();
				var currentCarType = isOrder.get("storeCar");
				overShop(currentCarType.id);

				var currentStatus = isOrder.get("status");
				$(".ordersMainIn").html(overHintWord[currentStatus]);
			}
			
			if (thisCarType == 1) {
				$(".scribeMain").show();
				$(".orderStoreShop").remove();
				$(".recommendHead").remove();
				$(".orderStoreShops").remove();
				$(".ordersMain").css("border","none");

				var nowPrice = carsPrice/100;
				nowPrice >= 5000 ? nowPrice = 5000 : nowPrice;
				$(".YYmony").html(nowPrice);

				var sanbaoPrice = isOrder.get("nowCar").get("plasmolysisCosts");
				$(".plasmol").html(sanbaoPrice);

				var currentStatus = isOrder.get("status");
				if (currentStatus == 2) {
					currentreason = isOrder.get("reason");
					$(".ordersMainIn").html(nowHintWord[currentStatus]+currentreason);
				}else{
					if (nowHintWord[currentStatus] == "") {
						$(".ordersMain").remove();
					}else{
						$(".ordersMainIn").html(nowHintWord[currentStatus]);
					}
				}

				if (carOrderId != "") {
			        	orderObject.set("status",Number(6));
			        	orderObject.save().then(function(){
			        	hiddenProcess();
			        	window.open("mcb-wap-orderCar.php?id="+car_id,"_self");
			        },function(){
			        	hiddenProcess();
			        	new $,flavr("订单状态修改失败，请您联系客服人员。");
			        });
				}

			}

			var currentStatuss = isOrder.get("status");
			if (currentStatuss == 6) {
				tradingFun(isOrder);
			}
			if (currentStatuss == 3) {
				PayPrice(isOrder);
			}else{
				$(".scribeMain").remove();
			}

		},error:function () {
			console.log("获取订单失败");
			hiddenProcess();
		}
	});
	function getOriderId(){
		return orderObject.id;
	}
	function getIdentity(){
		return orderObject.get("identifier");
	}
	function getOrderStatus(){
		return orderObject.get("status");
	}
	//获取4s车店
	function overShop (car_id) {
		var queryStoreCar = new AV.Query("StoreCar");
		queryStoreCar.include("storeshop");
		queryStoreCar.get(car_id,{
			success:function (isStore) {

				if (!isStore.get("storeshop")) {
					$(".orderStoreShop").remove();
				}
				
				var storeShopName = isStore.get("storeshop").get("name");
				var storeShopAddress = isStore.get("storeshop").get("address");
				var storeShopContact = isStore.get("storeshop").get("contact");
				var storeShopProvince = isStore.get("storeshop").get("province");
				var storeShopCity = isStore.get("storeshop").get("city");

				$(".orderStoreHead").html(storeShopName);
				$(".orderStoreWrap").html("地址："+storeShopProvince+" "+storeShopCity+" "+storeShopAddress);
				$(".orderStoreFootRgiht").html("");
				$(".orderStoreFootRgiht").append("<a href='tel:"+storeShopContact+"' style='color:#000;'>"+storeShopContact+"</a>");

			},error:function () {
				console.log("获取4S店车失败");
			}
		});
	}

	//获取4S店全球最低车
	function formShop () {
		var queryStoreAll = new AV.Query("StoreCar");
		queryStoreAll.ascending("terracePrice");
		queryStoreAll.include("storeshop");
		queryStoreAll.limit(1);
		queryStoreAll.find().then(function (isStores) {
			var storeShopName = isStores[0].get("storeshop").get("name");
			var storeShopAddress = isStores[0].get("storeshop").get("address");
			var storeShopContact = isStores[0].get("storeshop").get("contact");
			var storeShopProvince = isStores[0].get("storeshop").get("province");
			var storeShopCity = isStores[0].get("storeshop").get("city");
			$(".orderStoreHead").html(storeShopName);
			$(".orderStoreWrap").html("地址："+storeShopProvince+" "+storeShopCity+" "+storeShopAddress);
			$(".orderStoreFootRgiht").html("");
			$(".orderStoreFootRgiht").append("<a href='tel:"+storeShopContact+"' style='color:#000;'>"+storeShopContact+"</a>");
		},function () {
			console.log("获取全部4S车失败");
		});
	}

	var moerStoreObjArr = new Array();

	//获取4S店全城最低车
	function cityShop (car_id) {
		var queryStoreCar = new AV.Query("StoreCar");
		queryStoreCar.include("storeshop");
		queryStoreCar.get(car_id,{
			success:function (isStore) {
				var provinceName = isStore.get("storeshop").get("province");
				var cityName = isStore.get("storeshop").get("city");

				var queryShop = new AV.Query("Storeshop");
				queryShop.equalTo("province",provinceName);
				queryShop.equalTo("city",cityName);
				queryShop.find().then(function (isShop) {
					for (var i = 0; i < isShop.length; i++) {
						findStoreFun(isShop[i]);
					}
				},function () {
					console.log("查询车店失败");
				});

			},error:function () {
				console.log("获取4S店车失败");
			}
		});
	}

	//查询当前店的所有车
	function findStoreFun (isShop) {
		var findStoreCar = new AV.Query("StoreCar");
		findStoreCar.equalTo("storeshop",isShop);
		findStoreCar.include("storeshop");
		findStoreCar.find().then(function (isStores) {
			for (var i = 0; i < isStores.length; i++) {
				moerStoreObjArr.push(isStores[i]);
			}
			var newStoreCarAll = moerStoreObjArr.sort(compares());
			var storeShopName = newStoreCarAll[0].get("storeshop").get("name");
			var storeShopAddress = newStoreCarAll[0].get("storeshop").get("address");
			var storeShopContact = newStoreCarAll[0].get("storeshop").get("contact");
			var storeShopProvince = newStoreCarAll[0].get("storeshop").get("province");
			var storeShopCity = newStoreCarAll[0].get("storeshop").get("city");
			$(".orderStoreFootRgihts").html("");
			$(".orderStoreHeads").html(storeShopName);
			$(".orderStoreWraps").html("地址："+storeShopProvince+" "+storeShopCity+" "+storeShopAddress);
			$(".orderStoreFootRgihts").append("<a href='tel:"+storeShopContact+"' style='color:#000;'>"+storeShopContact+"</a>");
		},function () {
			console.log("获取4S车失败");
		});
	}

	//排序对象取最低
	function compares () {
		return function (object1, object2) {
			var price1 = object1.get("terracePrice");
			var price2 = object2.get("terracePrice");
			return price1 - price2; 
		} 
	}

	//是否三包
	$(".sbF").click(function () {
		var thisC = document.getElementById("threeBao");
		var currentPrice = $(".YYmony").html();
		var plasmolPrice = $(".plasmol").html();
		var jmPrice = $(".JMmony").html();
		if (jmPrice == "") {
			if (thisC.checked) {
				thisC.checked = false;
				$(".ZZmony").html(currentPrice);
			}else{
				thisC.checked = true;
				$(".ZZmony").html(Number(currentPrice)+Number(plasmolPrice));
			}
		}else{
			if (thisC.checked) {
				thisC.checked = false;
				$(".ZZmony").html(Number(currentPrice)-Number(jmPrice));
			}else{
				thisC.checked = true;
				$(".ZZmony").html(Number(currentPrice)+Number(plasmolPrice)-Number(jmPrice));
			}
		}
		var allPrice = document.getElementsByName("ZZmony")[0].value;
		$.post('',{allprice:allPrice},function(data){})//这里添加ajax请求

	});

	//三包提示
	$(".whatTB").click(function () {
		$(".overHintBlokMain").show();
		$(".overHintBlok").show();
	});		
	$(".overHintBlokHeadL").click(function () {
		$(".overHintBlokMain").hide();
		$(".overHintBlok").hide();
	});

	//交易事件
	function tradingFun (isOrder) {
		$(".blockRight").html("取消预约");
		$(".blockRight").css("background-color","#ff9900");
		$(".blockRight").click(function () {
			new $.flavr({  
	            title       : '您确定要取消此订单',
	            dialog      : 'form',
	            form        : { content: "", method: 'post' },
	            onSubmit    : function( $container, $form ){
	            	isOrder.set("status",8);
					isOrder.save().then(function () {
						window.open("mcb-wap-myorder.html","_self");
					},function () {
						new $.flavr("删除订单失败，请联系客服。");
					});
	                return false;
	            }            
	        });
	        $(".danger").html("是");
	        $(".default").html("否");

		});
	}

	//立即支付
	function PayPrice(isOrder) {

		$(".blockRight").html("立即支付");
		$(".blockRight").css("background-color","#ff9900");

		var nowPrice = $(".YYmony").html();
		var sanbaoPrice = $(".plasmol").html();

		var TFinsurance = isOrder.get("insurance");
		if (TFinsurance == true) {
			$(".threeBao").remove();
			$("#threeBao").attr("checked",true);
			$(".ZZmony").html(Number(nowPrice)+Number(sanbaoPrice));
		}else{
			$("#threeBao").attr("checked",false);
			$(".ZZmony").html(Number(nowPrice));
		}
	}



	//返回
	$(".cars_head_left").click(function () {
		window.open("mcb-wap-myorder.html","_self");
	});


