

	showProcress();
	
	//获取页面id
	var car_id = "";
	var carOrderId = "";
	var url = window.location.href;
	var urlString = url.toString();
	var string =  urlString.split("php?")[1];	
	var array = string.split("&");
	for (var i = 0; i < array.length; i++) {
		var str =  array[i];
		var arr = str.split("=");
		if (arr[0] == "order") {
			carOrderId = arr[1];
		};
		if (arr[0] == "id") {
			car_id = arr[1];
		};
	};

	var queryOverseas = new AV.Query(OverseasCar);
	var queryStore = new AV.Query(StoreCar);
	var queryNow = new AV.Query(NowCar);
	var queryForm = new AV.Query("StoreCarFormwork");
	var queryNum = 0;
	var waiColor = localStorage.getItem("waiColor");
	var neiColor = localStorage.getItem("neiColor");
	// console.log(waiColor+neiColor);

	var couponArr = new Array();
	var currentCouponObj = null;


	/*
	*queryNum 
	*海外直定(0);
	*4S直售(1);
	*国内现车(2);
	*/

	//查出当前车款
	(function queryCar (carObj) {
		carObj.include("brand");
		carObj.include("cars");
		carObj.include("normalInternalColor");
		carObj.include("normalExteriorColor");
		carObj.include("basicConfig");
		carObj.include("attributes");
		carObj.include("framework");
		carObj.include("storeshop");
		carObj.get(car_id,{
			success:function (existCar) {
				gainCarIn(existCar);
				hiddenProcess();
			},error:function () {
				if (queryNum == 0) {
					queryCar(queryStore);
				}else if (queryNum == 1){
					queryCar(queryNow);
				}else if (queryNum == 2) {
					queryCar(queryForm);
				}
				queryNum += 1;
				hiddenProcess();
			}
		});
	})(queryOverseas);

	var queryColor = new AV.Query(Color);
	queryColor.get(waiColor,{
		success:function (iscolor) {
			var colorName = iscolor.get("color_name");
			var colorRgb = iscolor.get("color_rgb");
			if (colorRgb == ",," || !colorRgb) {
				colorRgb = iscolor.get("color_string");
			}
			$(".scriptLeft").html("外观颜色："+colorName);
			$(".scriptLeftRgb").css("background",getColor(colorRgb));
		},error:function () {
			console.log("查询颜色失败");
		}
	});
	queryColor.get(neiColor,{
		success:function (iscolor) {
			var colorName = iscolor.get("color_name");
			$(".scriptRight").html("内饰颜色："+colorName);
		},error:function () {
			console.log("查询颜色失败");
		}
	});


	//获取车款信息
	var currentCarTitle = "";
	var currentCarLog = "";
	var currentCarPrice = "";
	var currentCarStatus = "";

	function gainCarIn (existCar) {

		//现车
		if (queryNum == 2) {

			$(".scribeInfo").html("友情提示：订单提交后我们会在1-2个工作日内进行车源详细信息核实，确认车辆详细信息后将与您联系，确认最终车款配置信息及价格，并更改订单状态，以便您进行预付款支付");

			var brandName = existCar.get("brand").get("brand");
			var carsName = existCar.get("cars").get("cars");
			var modelName = judegK(existCar.get("model"));
			var styleName = judegK(existCar.get("style"));
			var modifierName = judegK(existCar.get("modifier"));
			var terracePrice = judegK(existCar.get("terracePrice"));
			var SalesName = judegK(existCar.get("isSales"));
			$(".scribeTop").html(brandName+" "+carsName+" "+modelName+" "+styleName+" "+modifierName);
			$(".scribePR").html(parseInt(terracePrice/100)/100+"万元");
			var terracePrices = terracePrice/100;
			terracePrices >= 5000 ? terracePrices = 5000 : terracePrices ;
			$(".YYmony").html(terracePrices);
			$(".ZZmony").html((Number(terracePrices)+3000));
			var plasmolName = judegK(existCar.get("plasmolysisCosts"));
			$(".plasmol").html(plasmolName);

			var currentCarTitle = $(".scribeTop").html();
			var currentCarLog = existCar.get("cars").get("cover").url();

			localStorage.setItem("carssTitle",currentCarTitle);
			localStorage.setItem("carssLog",currentCarLog);
			localStorage.setItem("carssPrice",terracePrice);
			localStorage.setItem("carssStatus","订单审核中");

			Npay();

			if (SalesName == true) {
				findCoupon("促销车",2);
			}else{
				findCoupon("非促销车",2);
			}
			
		}

		// console.log(queryNum);

		//4S车
		if (queryNum == 1) {

			$(".scribeInfo").html("友情提示：预约成功后可在我的订单中查看车辆的4S店销售地点，预约费会在购车时全部转换为购车费用，买车吧不收取任何费用");

			$(".scribeCity").show();
			$(".theSB").remove();
			$(".scribeName").remove();
			$(".zongPrice").remove();
			
			var brandName = existCar.get("brand").get("brand");
			var carsName = existCar.get("cars").get("cars");
			var carsLog = existCar.get("cars").get("cover").url();
			var modelName = judegK(existCar.get("framework").get("model"));
			var styleName = judegK(existCar.get("framework").get("style"));
			var modiferName = judegK(existCar.get("framework").get("modifier"));
			var terracePrice = judegK(existCar.get("terracePrice"));
			$(".scribeTop").html(brandName+" "+carsName+" "+modelName+" "+styleName+" "+modiferName);
			$(".scribePR").html(changeTwoDecimal(terracePrice/10000)+"万");

			var provinseName = judegK(existCar.get("storeshop").get("province"));
			var cityName = judegK(existCar.get("storeshop").get("city"));

			$(".scribeCurrentCity").html(cityName);
			$(".scribeCurrentProvince").html(provinseName);

			$(".scribeCityBlockHeadLefts").html(provinseName);
			$(".scribeCBW").append("<li>"+provinseName+"</li>");
			$(".scribeCBWs").append("<li>"+cityName+"</li>");
			$(".scribeCBW li").click(function () {
				$(".scribeCityBlock").hide();
				$(".scribeCityBlocks").show();
			});
			$(".scribeCBWs li").click(function () {
				$(".scribeCityBlock").hide();
				$(".scribeCityBlocks").hide();
				$(".scribeCityBlockMain").hide();
			});

			$(".scribePayIn").html("立即支付");
			findCoupon("促销车",1);
		
			var currentCarTitle = $(".scribeTop").html();
			localStorage.setItem("carssTitle",currentCarTitle);
			localStorage.setItem("carssLog",carsLog);
			localStorage.setItem("carssPrice",terracePrice);
			localStorage.setItem("carssStatus","订单审核中");
			TFcall();

		}

		//4S店
		if (queryNum == 3) {

			$(".scribeInfo").html("友情提示：预约成功后可在我的订单中查看车辆的4S店销售地点，预约费会在购车时全部转换为购车费用，买车吧不收取任何费用");

			$(".scribeCity").show();
			$(".theSB").remove();
			$(".scribeName").remove();
			$(".zongPrice").remove();
			
			var brandName = existCar.get("brand").get("brand");
			var carsName = existCar.get("cars").get("cars");
			var carsLog = existCar.get("cars").get("cover").url();
			var modelName = judegK(existCar.get("model"));
			var styleName = judegK(existCar.get("style"));
			var modifierName = judegK(existCar.get("modifier"));
			var terracePrice = judegK(existCar.get("terracePrice"));
			$(".scribeTop").html(brandName+" "+carsName+" "+modelName+" "+styleName+" "+modifierName);
			$(".scribePR").html(parseInt(terracePrice/100)/100+"万元");
			
			findCityFun();
			findCoupon("非促销车",1);

			var currentCarTitle = $(".scribeTop").html();
			localStorage.setItem("carssTitle",currentCarTitle);
			localStorage.setItem("carssLog",carsLog);
			localStorage.setItem("carssPrice",terracePrice);
			localStorage.setItem("carssStatus","订单审核中");
			TFcall();

		}
	}

	function TFcall () {
		if (carOrderId != "") {
			new $.flavr({  
	            title       : '订单提交成功，是否立即进入订单详情。',
	            dialog      : 'form',
	            form        : { content: "", method: 'post' },
	            onSubmit    : function( $container, $form ){
	            	findOrderId(carOrderId,function(order_id){
						window.open("mcb-wap-orderCar.php?id="+order_id,"_self");
	            	});
	                return false;
	            }            
	        });
	        $(".danger").html("前往订单");
	        $(".default").html("一会再去");
	        $(".scribePayIn").remove();
		}
	}
	function findOrderId(identity,callback){
		var queryOrders = new AV.Query("Order");
		queryOrders.equalTo("identifier",identity);
		queryOrders.find().then(function (isOrder) {
			
			callback(isOrder[0].id);

		});
	}

	$(".scribeCity").click(function () {
		$(".scribeCityBlockMain").show();
        $(".scribeCityBlock").show();
	});

	$(".scribeCityBlockHeadGb").click(function () {
		$(".scribeCityBlockMain").hide();
        $(".scribeCityBlock").hide();
        $(".scribeCityBlocks").hide();
	});

	$(".scribeCityBlockHeadBack").click(function () {
        $(".scribeCityBlock").show();
        $(".scribeCityBlocks").hide();
	});

	//4S模板获取城市
	function findCityFun () {

		var currentForm = new StoreCarFormwork();
		currentForm.id = car_id;

		var queryStores = new AV.Query(StoreCar);
		queryStores.equalTo("framework",currentForm);
		queryStores.include("storeshop");

		queryStores.find().then(function (isStores) {
			var dict = new Array();

			for (var i = 0; i < isStores.length; i++) {
				var provinces = isStores[i].get("storeshop").get("province");
				var citys = isStores[i].get("storeshop").get("city");
				dict[provinces] = new Array();
			}

			for (var key in dict) {
				$(".scribeCBW").append("<li>"+key+"</li>");
			}

			for (var i = 0; i < isStores.length; i++) {
				var provinces = isStores[i].get("storeshop").get("province");
				var citys = isStores[i].get("storeshop").get("city");
				var array = dict[provinces];
				var isExit = false;
				for (var j = 0; j < array.length; j++) {
					if (array[j] == citys) {
						isExit = true;
					}
				}
				if (isExit == false) {
					array.push(citys);
					dict[provinces] = array;
				}
			}

			$(".scribeCBW li").click(function () {
				var x = $(".scribeCBW li").index(this);
				$(".scribeCBWs").html("");
				currentProvince = $(".scribeCBW li").eq(x).html();
				$(".scribeCityBlock").hide();
				$(".scribeCityBlocks").show();
				$(".scribeCityBlockHeadLefts").html(currentProvince);

				for (var i = 0; i < dict[currentProvince].length; i++) {
					$(".scribeCBWs").append("<li>"+dict[currentProvince][i]+"</li>");
				}

				$(".scribeCBWs li").click(function () {
					var v = $(".scribeCBWs li").index(this);
					var currentCity = $(".scribeCBWs li").eq(v).html();
					$(".scribeCurrentCity").html(currentCity);
					$(".scribeCurrentProvince").html(currentProvince);
					$(".scribeCityBlockMain").hide();
       				$(".scribeCityBlock").hide();
       				$(".scribeCityBlocks").hide();
				});

			});

		},function () {
			console.log("获取4S失败");
		});

	}


	//是否三包
	$("#threeBao").attr("checked",true);

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
			
	});


	//现车立即支付
	function Npay () {
		$(".scribePayIn").click(function () {

			var TFsanbao = true;
			var thisC = document.getElementById("threeBao");
			if (thisC.checked) {
				TFsanbao = true;
			}else{
				TFsanbao = false;
			}


			var userName = $(".userName").val();
			var userPhone = $(".userPhone").val();

			if (userName == "") {
				new $.flavr("姓名不能为空");
				hiddenProcess();
				return false;
			}
			if (userPhone == "") {
				new $.flavr("电话不能为空");
				hiddenProcess();
				return false;
			}

			var currentUser = AV.User.current();

			if (currentUser) {

				showProcress();
				$(".loadingWord").html("生成订单...");

				var newNowCar = new NowCar();
				newNowCar.id = car_id;
				var newColorIn = new Color();
				newColorIn.id = neiColor;
				var newColorOut = new Color();
				newColorOut.id = waiColor;

				var newOrder = new Order();
				newOrder.set("carType",1);
				newOrder.set("status",1);
				newOrder.set("car_number",1);
				newOrder.set("nowCar",newNowCar);
				newOrder.set("chooseExteriorColor",newColorOut);
				newOrder.set("chooseInternalColor",newColorIn);
				newOrder.set("user_name",userName);
				newOrder.set("contact",userPhone);
				newOrder.set("user",currentUser);
				newOrder.set("identifier",String(orderH()));
				newOrder.set("insurance",TFsanbao);

				if (currentCouponObj != null) {
					newOrder.set("coupon",currentCouponObj);
				}

				newOrder.save().then(function (isOrder) {
					
					var currentOrderCarId = isOrder.id;
					judegTFOrder(currentOrderCarId,function (currentOrderCarId) {
						window.open("mcb-wap-orderCar.php?id="+currentOrderCarId,"_self");
					});

					$(".scribePayIn").remove();

					if (currentCouponObj != null) {
						currentCouponObj.set("isUse",true);
						currentCouponObj.save().then(function () {
							window.open("mcb-wap-myorder.html","_self");
						},function () {
							console.log("更改优惠券状态失败");
							window.open("mcb-wap-myorder.html","_self");
						});
					}
					hiddenProcess();
				},function () {
					new $.flavr("保存订单失败");
					hiddenProcess();
				});

			}else{

		        new $.flavr({  
		            title       : '您还没有登录',
		            dialog      : 'form',
		            form        : { content: "", method: 'post' },
		            onSubmit    : function( $container, $form ){
						loging();
		                return false;
		            }
		        });
		        $(".danger").html("登录");
		        $(".default").html("取消");


			}

				
		});
	}


	function payAction(orderId,callback){
		if(queryNum == 3){
			FDpay(orderId,function(con){
				if (con == true) {
					hiddenProcess();
					TFcall();
				}else{
					callback();
				}
				
			});
		}
		if (queryNum == 1) {
			Fpay(orderId,function(con){
				if (con == true) {
					hiddenProcess();
					TFcall();
				}else{
					callback();
				}
			});
		};
	}

	//4S立即支付
	function Fpay (orderId,callback) {
		

			var currentUser = AV.User.current();
			if (currentUser) {

				var newNowCar = new StoreCar();
				newNowCar.id = car_id;
				var newColorIn = new Color();
				newColorIn.id = neiColor;
				var newColorOut = new Color();
				newColorOut.id = waiColor;

				var newOrder = new Order();
				newOrder.set("carType",5);
				newOrder.set("status",6);
				newOrder.set("car_number",1);
				newOrder.set("storeCar",newNowCar);
				newOrder.set("chooseExteriorColor",newColorOut);
				newOrder.set("chooseInternalColor",newColorIn);
				newOrder.set("identifier",String(orderId));

				if (currentCouponObj != null) {
					newOrder.set("user",currentUser);
					newOrder.set("coupon",currentCouponObj);
				}

				newOrder.save().then(function (order) {
					if (currentCouponObj != null) {
						currentCouponObj.set("isUse",true);
						currentCouponObj.save().then(function () {
							carOrderId =  String(orderId);
							callback(true);
						},function () {
							console.log("更改优惠券状态失败");
						});

					}else{
						callback();
					}
					
				},function () {
					alert("保存订单失败");
				});

			}else{
				new $.flavr("您还没有登陆");
			}
		
	}

	//4S店
	function FDpay (orderId,callback) {
		

			var currentUser = AV.User.current();

			var currentProvinceSave = $(".scribeCurrentProvince").html();
			var currentCitySave = $(".scribeCurrentCity").html();

			if (currentProvinceSave == "") {
				hiddenProcess
				new $.flavr("请选择城市");
				return false;
			}

			if (currentCitySave == "") {
				hiddenProcess
				new $.flavr("请选择城市");
				return false;
			}


			if (currentUser) {
				// console.log(carId);
				var saveForm = new StoreCarFormwork();
				saveForm.id = car_id;
					
				var queryStoreSave = new AV.Query("StoreCar");
				queryStoreSave.equalTo("framework",saveForm);
				

				var querySS = new AV.Query("Storeshop");
				querySS.equalTo("province",currentProvinceSave);
				querySS.equalTo("city",currentCitySave);

				queryStoreSave.matchesQuery("storeshop", querySS);


				queryStoreSave.find().then(function (isStore) {
					
					// console.log(isStore);

					var newNowCar = new StoreCar();
					newNowCar.id = isStore[0].id;
					var newColorIn = new Color();
					newColorIn.id = neiColor;
					var newColorOut = new Color();
					newColorOut.id = waiColor;

					var newOrder = new Order();
					newOrder.set("carType",2);
					newOrder.set("status",6);
					newOrder.set("car_number",1);
					newOrder.set("storeCar",newNowCar);
					newOrder.set("chooseExteriorColor",newColorOut);
					newOrder.set("chooseInternalColor",newColorIn);
					newOrder.set("identifier",String(orderId));
					if (currentCouponObj != null) {
						newOrder.set("coupon",currentCouponObj);
					}

					newOrder.save().then(function () {
						if (currentCouponObj != null) {
							currentCouponObj.set("isUse",true);
							currentCouponObj.save().then(function (order) {
								carOrderId =  String(orderId);
								callback(true);
							},function () {
								hiddenProcess
								new $.flavr("抱歉,优惠券使用失败了");
							});
						}else{
							callback();
						}
						
					},function (err) {
						hiddenProcess
						new $.flavr("抱歉,订单保存失败了");
					});

				},function () {
					hiddenProcess
					new $.flavr("抱歉,数据获取失败了");
				});

			}else{
				hiddenProcess
				new $.flavr("您还没有登陆");
			}
		
	}

	//使用优惠券
	$(".scribePC_head").click(function () {
		$(".scribeFoot").toggle(200);
	});
	

	//查询优惠券
	function findCoupon (isSale,numType) {

		$(".useCode").click(function () {
			
			if ($(".JMmony").html() != "") {
				new $.flavr("您已经使用了优惠券");
				return false;
			}

			var couponLeft = $(".couponLeft").val();
			var couponWrap = $(".couponWrap").val();
			var couponRight = $(".couponRight").val();

			if (couponLeft.length != 4 || couponWrap.length != 4 || couponRight.length != 4) {
				new $.flavr("优惠券格式有误");
				return false;
			}

			var queryCoupon = new AV.Query("Coupon");
			queryCoupon.limit(1000);
			queryCoupon.find().then(function (isCoupon) {
				for (var i = 0; i < isCoupon.length; i++) {
					couponArr[i] = isCoupon[i].get("coupon");

					if (couponArr[i] == couponLeft+couponWrap+couponRight) {

						var couponUser = isCoupon[i].get("isUse");
						if (couponUser == true) {
							new $.flavr("该优惠券已被使用过");
							return false;
						}

						var couponOver = isCoupon[i].get("overdue").getTime();
						var currentDate = new Date().getTime();
						if (couponOver-currentDate <= 0) {
							new $.flavr("该券以过期");
							return false;
						}
						
						var couponSale = isCoupon[i].get("suitSale");
						couponSale == true ? couponSale = "促销车" : couponSale = "非促销车";
						if (couponSale == false && isSale == "促销车") {
							new $.flavr("该券不适用于促销车");
							return false;
						}

						var couponType = isCoupon[i].get("car_type");
						var couponTypeName = "";
						couponType == 0 ? couponTypeName = "通用券" : couponType;
						couponType == 1 ? couponTypeName = "4S车" : couponType;
						couponType == 2 ? couponTypeName = "进口车" : couponType;
						couponType == 3 ? couponTypeName = "海外车" : couponType;

						if (couponType != numType && couponType != 0) {
							new $.flavr("该券仅使用于"+couponTypeName);
							return false;
						}

						if (numType == 2) {
							var nowType = isCoupon[i].get("type");
							if (nowType == 1) {
								var couponDiscount = isCoupon[i].get("discount");
								var currentYY = $(".YYmony").html();
								var couponCash = currentYY*(1-couponDiscount);
							}
							if (nowType == 2) {
								var couponCash = isCoupon[i].get("cash");
							}
							if (nowType == 3) {
								var couponCash = $(".YYmony").html();
							}
							$(".jianmianPrice").show();
							var currentZPrice = $(".ZZmony").html();
							$(".JMmony").html(couponCash);
							$(".ZZmony").html(Number(currentZPrice)-Number(couponCash));
						}else{
							$(".YYmony").html("0");
						}

						new $.flavr("使用优惠券成功");
						currentCouponObj = isCoupon[i];

						return false;
					}
					

					if (i == isCoupon.length-1) {
						new $.flavr("优惠券不正确");
						return false;
					}
					

				}
			},function () {
				console.log("查询优惠券失败");
			});

		});


	}

	//三包提示
	$(".whatTB").click(function () {
		$(".overHintBlokMain").show();
		$(".overHintBlok").show();
	});		
	$(".overHintBlokHeadL").click(function () {
		$(".overHintBlokMain").hide();
		$(".overHintBlok").hide();
	});

	//返回上传
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

	