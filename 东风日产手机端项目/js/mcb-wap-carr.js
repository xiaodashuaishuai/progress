$(document).ready(function() {
	
	//获取页面id
	var carsId = queryCrrentID();
	var brandId = null;
	var carId = null;
	var carsName,brandName,overseasCarCount,nowCarCount,storeCarCount,salesCarCount;
	var styleName,modelName,modifierName,displacementName,unitName,displacementUnitName,inColor,inColorStr,outColor,outColorStr,storeG,storeP,fuelName,letName;
	var normalEColor,normalIColor,addConfig,priceP,priceS,specifications,sfSales,colorOutr;
	var currentCarType = localStorage.getItem("carType");

	//初始化
	var Cars = AV.Object.extend("Cars");
	var Brand = AV.Object.extend("Brand");
	var OverseasCar = AV.Object.extend("OverseasCar");
	var StoreCarFormwork = AV.Object.extend("StoreCarFormwork");
	var Color = AV.Object.extend("Color");
	var NowCar = AV.Object.extend("NowCar");
	var newBrand = new Brand();
	var newCars = new Cars();

	//默认品牌车系名
	var queryCars = new AV.Query(Cars);
	queryCars.include("brand");
	queryCars.include("comments");
	queryCars.get(carsId,{
		success:function (isCars) {
			carsName = isCars.get("cars");
			brandName = isCars.get("brand").get("brand");
			commentsName = isCars.get("comments");
			if (commentsName) {
				commentsName = isCars.get("comments").get("title")
			}else{
				$(".dapao").remove();
			}
			brandId = isCars.get("brand").id;
			newBrand.id = brandId;
			newCars.id = carsId;
			$(".cars_head_zhong").html(brandName+" "+carsName);
			$(".dapao").html(commentsName);
			judegCarCound(isCars);
		},error:function (err) {
			console.log("查询品牌车系失败");
		}
	});

	var howCarNumber = 0;

	//判断车款数
	function judegCarCound (obj) {
		overseasCarCount = obj.get("overseasCarCount");
		nowCarCount = obj.get("nowCarCount");
		storeCarCount = obj.get("storeCarCount");
		salesCarCount = obj.get("salesCarCount");

		if (overseasCarCount && overseasCarCount != 0) {
			$(".titleUl").append("<li>海外直订</li>");
		}
		if (nowCarCount && nowCarCount != 0) {
			$(".titleUl").append("<li>国内现车</li>");
		}
		if (storeCarCount && storeCarCount != 0) {
			$(".titleUl").append("<li>4S直售</li>");
		}
		if (salesCarCount && salesCarCount != 0) {
			$(".titleUl").append("<li>促销车</li>");
		}

		var currentLis = $(".titleUl li").length;
		if (currentLis == 0) {
			$(".titleUl").append("<li class='titleTs'>未找到相关车款</li>");
			$("#titleUl li").css("width","640px");
		}else if (currentLis == 1) {
			$("#titleUl li").css("width","640px");
		}else if (currentLis == 2) {
			$("#titleUl li").css("width","319px");
		}else if (currentLis == 3) {
			$("#titleUl li").css("width","212px");
		}


		var currentClick = $(".titleUl li").eq(0).html();
		$(".titleUl li").eq(0).css({
			backgroundColor : "#FF9900",
			color : "#fff"
		});

		if (currentCarType == 0) {
			$("#titleUl").remove();
			receiveCar("海外直订");
		}
		if (currentCarType == 1) {
			$("#titleUl").remove();
			receiveCar("4S直售");
		}
		if (currentCarType == 2) {
			$("#titleUl").remove();
			receiveCar("国内现车");
		}
		if (currentCarType == 3) {
			$("#titleUl").remove();
			receiveCar("促销车");
		}

		if (currentCarType == 4) {
			receiveCar(currentClick);
			tabCars();
		}

	}


/*======================================================    切换    ==========================================================*/	

	//切换事件
	function tabCars () {
		$(".titleUl li").click(function () {
			var i = $(".titleUl li").index(this);
			$(".titleUl li").css({
				backgroundColor: '#E4E4E4',
				color: '#000'
			});
			$(".titleUl li").eq(i).css({
				backgroundColor : "#FF9900",
				color : "#fff"
			});
			$(".carInfo").html("");
			$(".nowCar").html("");
			var thisClick = $(".titleUl li").eq(i).html();
			receiveCar(thisClick);
		});
	}
		
	var TFSales = false;
	var storeNum = 0;
	//切换事件
	function receiveCar (thisClick) {

		showProcress();

		if (thisClick == "海外直订") {
			howCarNumber = 1;
			$(".hintRight").hide();
			var queryOver = new AV.Query("OverseasCar");
			showHW(queryOver);
		}
		if (thisClick == "国内现车") {
			TFSales = false;
			howCarNumber = 2;
			$(".hintRight").show();
			var queryNowCar = new AV.Query("NowCar");
			showGX(queryNowCar);
		}
		if (thisClick == "4S直售") {
			howCarNumber = 3;
			$(".hintRight").show();
			var queryForm = new AV.Query("StoreCarFormwork");
			showSM(queryForm);
		}
		if (thisClick == "促销车") {
			TFSales = true;
			howCarNumber = 4;
			$(".hintRight").show();
			var queryStore = new AV.Query("StoreCar");
			queryStore.equalTo("isSales",true);
			var queryNowCar = new AV.Query("NowCar");
			queryNowCar.equalTo("isSales",true);
			showST(queryStore,function () {
				showGX(queryNowCar);
			});
		}

	}


/*======================================================    切换    ==========================================================*/


/*======================================================    排序    ==========================================================*/

	var newPricePX = new Array();
	var pricePXNumer = 0;

	// 价格排序
	$(".hintPrice").click(function () {

		if (howCarNumber == 4) {
			return false;
		}

		$(".nowCar").html("");

		if (pricePXNumer%2 == 0) {
			newPricePX = carArr.sort(compare());
		}else{
			newPricePX = carArr.sort(compares());
		}

		pricePXNumer += 1;

		findAllCar(newPricePX);

	});

	//正序排列对象
	function compare() { 
		return function (object1, object2) {
			var price1 = object1.get("terracePrice");
			var price2 = object2.get("terracePrice");
			return price1 - price2; 
		} 
	}

	//倒叙排列对象
	function compares () {
		return function (object1, object2) {
			var price1 = object1.get("terracePrice");
			var price2 = object2.get("terracePrice");
			return price2 - price1; 
		} 
	}

	function findAllCar (newPricePX) {
		if (howCarNumber == 2) {
			showNow(newPricePX);
		}

		if (howCarNumber == 3) {
			show4S(newPricePX);
		}
		
	}

/*======================================================    排序    ==========================================================*/


/*======================================================   4S车   ==========================================================*/

	//获取4S车
	function showST (queryStore,findNowFun) {
		queryStore.include("framework");
		queryStore.find().then(function (isStore) {
			for (var i = 0; i < isStore.length; i++) {

				var num = 0;
						
				var normalColorOutId = isStore[i].get("framework").get("normalExteriorColor").id;
				var normalColorInId = isStore[i].get("framework").get("normalInternalColor").id;

				findFSColor(isStore,normalColorOutId,function (outColorObj,isStore) {
					findFSColor(isStore,normalColorInId,function (inColorObj,isStore) {
						carId = isStore[num].id;
						styleName = judegK(isStore[num].get("framework").get("style"));
						modelName = judegK(isStore[num].get("framework").get("model"));
						modifierName = judegK(isStore[num].get("framework").get("modifier"));
						fuelName = judegK(isStore[num].get("framework").get("fuel"));
						letName = judegK(isStore[num].get("framework").get("let"));
						priceS = judegK(isStore[num].get("framework").get("marketPrice"));
						priceP = judegK(isStore[num].get("terracePrice"));
						normalEColor = outColorObj.get("color_name");
						colorOutr = outColorObj.get("color_rgb");
						if (colorOutr == ",,") {
							colorOutr = outColorObj.get("color_string");
						}
						normalIColor = inColorObj.get("color_name");
						$(".nowCar").append("<li><span class='thisCarId' style='display:none;'>"+carId+"</span><div class='nowTitle'>"+carsName+" "+styleName+" "+modelName+" "+modifierName+" "+fuelName+" "+letName+"</div><div class='nowColor'><p>外观颜色："+normalEColor+"</p><p class='wg' style='background:"+getColor(colorOutr)+";'></p><p>内饰颜色："+normalIColor+"</p></div><div class='nowPrice'><p>市场价：</p><p class='nowAddlp'>"+changeTwoDecimal(priceS/10000)+"万</p></div><div class='nowPricer'><p>平台价：</p><p class='pricel'>￥"+changeTwoDecimal(priceP/10000)+"万</p><p class='sprice'>为您节省：</p><p class='pricel'>"+changeTwoDecimal((priceS-priceP)/10000)+"万</p></div><div class='TFcar'></div></li>");

						if (num == isStore.length-1) {
							storeNum = isStore.length;
							$(".hintLeft").html("为您找到("+(isStore.length)+")辆车");
							findNowFun();
						}

						num += 1;
					});
				});
						
			}
			hiddenProcess();
		},function () {
			console.log("查询4S车失败");
			hiddenProcess();
		});
	}

	//获取4S车颜色
	function findFSColor (isStore,colorId,callBack) {
		var queryColor = new AV.Query("Color");
		queryColor.get(colorId,{
			success:function (isColor) {
				callBack(isColor,isStore);
			},error:function () {
				console.log("获取颜色失败");
			}
		});
	}


/*======================================================  4S车    ==========================================================*/

/*======================================================    海外    ==========================================================*/

	//查询海外车
	function showHW(queryOver) {
		queryOver.equalTo("brand",newBrand);
		queryOver.equalTo("cars",newCars);
		queryOver.descending("createdAt");
		queryOver.find().then(function (isOver) {
			for (var i = 0; i < isOver.length; i++) {
				carId = isOver[i].id;
				styleName = judegK(isOver[i].get("style"));
				modelName = judegK(isOver[i].get("model"));
				modifierName = judegK(isOver[i].get("modifier"));
				fuelName = judegK(isOver[i].get("fuel"));
				letName = judegK(isOver[i].get("let"));
				displacementName = judegK(isOver[i].get("displacement"));
				unitName = judegK(isOver[i].get("unit"));
				displacementUnitName = judegK(changeTwoDecimal(displacementName)+unitName);
				storeG = judegK(isOver[i].get("specifications"));
				storeP = judegK(isOver[i].get("basicPrice"));
				$(".carInfo").append("<li><span class='thisCarId' style='display:none;'>"+carId+"</span><div class='overTop'>"+carsName+" "+styleName+" "+modelName+" "+modifierName+" "+displacementUnitName+" "+letName+" "+fuelName+"</div><div class='overBottom'><div class='overBottomG'>规格：</div><div class='storeG'>"+storeG+"</div><div class='overBottomJ'>基础价格：</div><div class='storeP'>$"+inciseNum(storeP.toString())+"</div></div></li>");

				if (i == isOver.length-1) {
					$(".hintLeft").html("为您找到("+(isOver.length)+")辆车");
					$(".carInfo li").click(function () {
						var clicki = $(".carInfo li").index(this);
						var tureCarId = $(".thisCarId").eq(clicki).html();
						window.open("mcb-wap-overseas.html?id="+tureCarId,"_self");
					});
				}

			}
			hiddenProcess();
		},function () {
			console.log("获取海外车失败");
			hiddenProcess();
		});
	}


/*======================================================    海外    ==========================================================*/


/*======================================================    现车    ==========================================================*/

	//查询国内现车
	function showGX(queryNowCar) {
		queryNowCar.equalTo("brand",newBrand);
		queryNowCar.equalTo("cars",newCars);
		queryNowCar.include("normalExteriorColor");
		queryNowCar.include("normalInternalColor");
		queryNowCar.find().then(function (isNow) {
			carArr = isNow;
			showNow(isNow);
			if (isNow == "") {
				$(".nowCar li").click(function () {
					var clicki = $(".nowCar li").index(this);
					var tureCarId = $(".thisCarId").eq(clicki).html();
					window.open("mcb-wap-car.html?id="+tureCarId,"_self");
				});
			}
			hiddenProcess();
		},function () {
			console.log("查询国内现车失败");
			hiddenProcess();
		});
	}

	//添加并显示现车
	function showNow (isNow) {
		for (var i = 0; i < isNow.length; i++) {
			carId = isNow[i].id;
			styleName = judegK(isNow[i].get("style"));
			modelName = judegK(isNow[i].get("model"));
			modifierName = judegK(isNow[i].get("modifier"));
			displacementName = judegK(isNow[i].get("displacement"));
			unitName = judegK(isNow[i].get("unit"));
			displacementUnitName = judegK(displacementName+unitName);

			normalEColor = isNow[i].get("normalExteriorColor");
			normalEColor?normalEColor = isNow[i].get("normalExteriorColor").get("color_name"):normalEColor;
			normalEColor = judegK(normalEColor);

			normalEColor?colorOutr = isNow[i].get("normalExteriorColor").get("color_rgb"):colorOutr;
			if (colorOutr == ",,") {
				colorOutr = isNow[i].get("normalExteriorColor").get("color_string");
			}

			var color = getColor(colorOutr);

			normalIColor = isNow[i].get("normalInternalColor");
			normalIColor?normalIColor = isNow[i].get("normalInternalColor").get("color_name"):normalIColor;
			normalIColor = judegK(normalIColor);
			
			addConfig = judegK(isNow[i].get("add_configuration"));
			priceS = judegK(isNow[i].get("marketPrice"));
			priceP = judegK(isNow[i].get("terracePrice"));
			specifications = judegK(isNow[i].get("specifications"));
			sfSales = judegK(isNow[i].get("isSales"));
			storeG = judegK(isNow[i].get("specifications"));
			storeP = judegK(isNow[i].get("basicPrice"));
			fuelName = judegK(isNow[i].get("fuel"));
			letName = judegK(isNow[i].get("let"));
			
			if (sfSales) {

				$(".nowCar").append("<li><span class='thisCarId' style='display:none;'>"+carId+"</span><div class='nowTitle'>"+carsName+" "+modelName+" "+styleName+" "+modifierName+" "+letName+" "+fuelName+"<span class='standardCar'>"+specifications+"</span><span class='salesCar'>促销</span></div><div class='nowColor'><p>外观颜色："+normalEColor+"</p><p class='wg' style='background:"+color+";'></p><p>内饰颜色："+normalIColor+"</p></div><div class='nowAdd'><p>加装配置：</p><p class='nowAddl'>"+addConfig+"</p></div><div class='nowPrice'><p>市场价：</p><p class='nowAddlp'>"+changeTwoDecimal(priceS/10000)+"万</p></div><div class='nowPricer'><p>平台价：</p><p class='pricel' style='color:#FF5A00';>￥"+changeTwoDecimal(priceP/10000)+"万</p><p class='sprice'>为您节省：</p><p class='pricel' style='color:#FF5A00';>"+changeTwoDecimal((priceS-priceP)/10000)+"万</p></div><div class='TFcar'></div></li>");
			}else{
				$(".nowCar").append("<li><span class='thisCarId' style='display:none;'>"+carId+"</span><div class='nowTitle'>"+carsName+" "+modelName+" "+styleName+" "+modifierName+" "+letName+" "+fuelName+"<span class='standardCar'>"+specifications+"</span></div><div class='nowColor'><p>外观颜色："+normalEColor+"</p><p class='wg' style='background:"+color+";'></p><p>内饰颜色："+normalIColor+"</p></div><div class='nowAdd'><p>加装配置：</p><p class='nowAddl'>"+addConfig+"</p></div><div class='nowPrice'><p>市场价：</p><p class='nowAddlp' >￥"+changeTwoDecimal(priceS/10000)+"万</p></div><div class='nowPricer'><p>平台价：</p><p class='pricel' style='color:#FF5A00';>￥"+changeTwoDecimal(priceP/10000)+"万</p><p class='sprice'>为您节省：</p><p class='pricel' style='color:#FF5A00';>￥"+changeTwoDecimal((priceS-priceP)/10000)+"万</p></div><div class='TFcar'></div></li>");
			}

			if (i == isNow.length-1) {
				if (TFSales) {
					$(".salesCar").hide();
					var nowNum = isNow.length;
					$(".hintLeft").html("为您找到("+(storeNum+nowNum)+")辆车");
				}else{
					$(".salesCar").show();
					$(".hintLeft").html("为您找到("+(isNow.length)+")辆车");
				}
				$(".nowCar li").click(function () {
					var clicki = $(".nowCar li").index(this);
					var tureCarId = $(".thisCarId").eq(clicki).html();
					window.open("mcb-wap-car.html?id="+tureCarId,"_self");
				});
			}

		}
	}
	
/*======================================================    现车    ==========================================================*/


/*======================================================    4S模板    ==========================================================*/

	//查询4S模板
	function showSM (carObj) {
		carObj.equalTo("brand",newBrand);
		carObj.equalTo("cars",newCars);
		carObj.include("normalExteriorColor");
		carObj.include("normalInternalColor");
		carObj.find().then(function (isForm) {
			carArr = isForm;
			show4S(isForm);
			hiddenProcess();
		},function () {
			console.log("查询4S模板失败");
			hiddenProcess();
		});
	}

	//查询并显示4S模板
	function show4S (isForm) {
		for (var i = 0; i < isForm.length; i++) {
			carId = isForm[i].id;
			styleName = judegK(isForm[i].get("style"));
			modelName = judegK(isForm[i].get("model"));
			modifierName = judegK(isForm[i].get("modifier"));
			priceS = judegK(isForm[i].get("marketPrice"));
			priceP = judegK(isForm[i].get("terracePrice"));
			normalIColor = judegK(isForm[i].get("normalInternalColor").get("color_name"));
			colorOutr = judegK(isForm[i].get("normalExteriorColor").get("color_rgb"));
			normalEColor = judegK(isForm[i].get("normalExteriorColor").get("color_name"));
			if (colorOutr == ",,") {
				colorOutr = judegK(isForm[i].get("normalExteriorColor").get("color_string"));
			}
			// console.log(priceP);

			if (priceP != "") {
				$(".nowCar").append("<li><span class='thisCarId' style='display:none;'>"+carId+"</span><div class='nowTitle'>"+brandName+" "+carsName+" "+styleName+" "+modelName+" "+modifierName+"</div><div class='nowColor'><p>外观颜色："+normalEColor+"</p><p class='wg' style='background:"+getColor(colorOutr)+";'></p><p>内饰颜色："+normalIColor+"</p></div><div class='nowPrice'><p>市场价：</p><p class='nowAddlp'>￥"+changeTwoDecimal(priceS/10000)+"万</p></div><div class='nowPricer'><p>平台价：</p><p class='pricel' style='margin-right:10pt;color:#FF5A00;'>￥"+changeTwoDecimal(priceP/10000)+"万</p><p>为您节省：</p><p class='pricel' style='color:#FF5A00;'>￥"+changeTwoDecimal((priceS-priceP)/10000)+"万</p></div><div class='TFcar'></div></li>");
			}

			
			if (i == isForm.length-1) {
				$(".hintLeft").html("为您找到("+(isForm.length)+")辆车");
				$(".nowCar li").click(function () {
					var clicki = $(".nowCar li").index(this);
					var tureCarId = $(".thisCarId").eq(clicki).html();
					window.open("mcb-wap-car.html?id="+tureCarId,"_self");
				});
			}

			
		}
	}

/*======================================================    4S模板    ==========================================================*/
	
	//返回事件
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});


});