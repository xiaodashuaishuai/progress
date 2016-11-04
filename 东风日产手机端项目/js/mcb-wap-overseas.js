$(document).ready(function() {

	showProcress();

	//获取车款id
	var carId = queryCrrentID();

	var carUrl,styleName,brandName,carsName,displayName,unitName,basiconfigName,priceName,modelName,modifierName;
	var sanbaoPrice,qitaPrice,sancPrice;
	var waiRelations,neiRelation,schooseRaletion;
	var waiColorObjects,neiColorObjects;
	var ZHprice;

	var queryOver = new AV.Query(OverseasCar);
	queryOver.include("cars");
	queryOver.include("brand");
	queryOver.include("basicConfig");
	queryOver.get(carId,{
		success:function (isCar) {


			waiRelations = isCar.relation("exteriorColor");
			neiRelations = isCar.relation("internalColor");
			schooseRaletion = isCar.relation("chooseConfig");


			var carImg = isCar.get("cars").get("photo");
			carImg ? carUrl = carImg.url() : carUrl = "" ;
			brandName = judegK(isCar.get("brand").get("brand"));
			carsName = judegK(isCar.get("cars").get("cars"));
			styleName = judegK(isCar.get("style"));
			displayName = judegK(isCar.get("displacement"));
			unitName = judegK(isCar.get("unit"));
			priceName = judegK(isCar.get("basicPrice"));
			modelName = judegK(isCar.get("model"));
			modifierName = judegK(isCar.get("modifier"));

			sanbaoPrice = judegK(isCar.get("plasmolysisCosts"));
			qitaPrice = judegK(isCar.get("otherCosts"));
			sancPrice = judegK(isCar.get("thirdCosts"));

			$(".SBPrice").html(sanbaoPrice);
			$(".QTPrice").html(qitaPrice);
			$(".SCPrice").html(sancPrice);

			$(".overLRInfo").html("基本价格$ "+inciseNum(priceName.toString()));

			basiconfigName = judegK(isCar.get("basicConfig"));
			if (basiconfigName) {
				addAdd(basiconfigName);
			}

			$(".overLImg").attr("src",carUrl);
			$(".overLRHead").html(brandName+" "+carsName+" "+modelName+" "+styleName+" "+modifierName);
			$(".overLRMain").html(changeTwoDecimal(displayName)+unitName);

			//综合税率
			// ZHprice = pailiangPrice(displayName).toFixed(3)*100;
			ZHprice = Math.round((pailiangPrice(displayName)*100)*10)/10;
			// console.log(ZHprice);
			$(".zonghePrice").html(ZHprice + "%");

			overPriceFun(priceName);


			schooseRaletion.query().find().then(function (isChoose) {
				for (var i = 0; i < isChoose.length; i++) {
					var chooseType = isChoose[i].get("chooseType");
					// console.log(chooseType);
					if (chooseType == 1) {
						configDan(isChoose[i]);
					}else{
						configDuo(isChoose[i]);
					}
				}
				openAddConfig();
				addConfigDuo();
			},function () {
				console.log("获取可循配置失败");
			});

			//显示默认色
			queryColor(waiRelations,function (isColor) {
				$(".overOutSe").html(judegK(isColor[0].get("color_name")));
				var newColor = isColor[0].get("color_rgb");
				if (newColor == ",," || !newColor) {
					newColor = isColor[0].get("color_string");
				}
				$(".overOutRgb").css("background",getColor(newColor));
				localStorage.setItem("waiColor",isColor[0].id);
				queryColor(neiRelations,function (isColor) {
					$(".overInSe").html(judegK(isColor[0].get("color_name")));
					localStorage.setItem("neiColor",isColor[0].id);
				});
			});

			hiddenProcess();

		},error:function () {
			console.log("获取车款失败");
			hiddenProcess();
		}
	});

	//获取颜色
	function queryColor (isRelation,callback) {
		isRelation.query().find().then(function (isColor) {
			callback(isColor);
		},function () {
			console.log("获取颜色失败");
		});
	}

	//添加配置信息
	function addAdd (baseConfig) {
		var EngineTransmission = baseConfig.get("EngineTransmission");
		var TiresWheels = baseConfig.get("TiresWheels");
		var DimensionsCapacity = baseConfig.get("DimensionsCapacity");
		var SafetyFeatures = baseConfig.get("SafetyFeatures");

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

	var configDanArr = new Array();
	var configDanNameArr = new Array();

	var configDanObjArr = new Array();
	var configDanObjArrs = new Array();

	//单选包走向
	function configDan (isChoose) {
		var configTitle = isChoose.get("title");
		var configBoy = isChoose.get("body");
		var congifBoyTitle = configBoy[0][0];
		var configProce = configBoy[0][2];

		configDanArr.unshift(isChoose.id);
		configDanNameArr.unshift(configTitle);

		configDanObjArrs.push(configBoy[0])

		configDanObjArr[configTitle] = configDanObjArrs;

		overPriceFun(configProce);

		$(".condigIn").prepend("<div class='overColorLun overDan openDan'><div class='ovarDanLeft ovarDanLeftConfig'>"+configTitle+"：</div><div class='overDanMain congfigTitleName'>"+congifBoyTitle+"</div><div class='overDanRight'></div><div class='bagPrice configDanPrice'>$ "+configProce+"</div></div>");

	}

	//更改报内容
	function changeConfig (currentConfigName,singleConfig) {
		var configName = document.getElementsByClassName("ovarDanLeftConfig");
		var configNameIn = document.getElementsByClassName("congfigTitleName");
		var configDanPrice = document.getElementsByClassName("configDanPrice");
		for (var i = 0; i < configName.length; i++) {
			if (configName[i].innerHTML == currentConfigName+"：") {
				// console.log(singleConfig);
				configNameIn[i].innerHTML = singleConfig[0];
				configDanPrice[i].innerHTML = "$ "+singleConfig[2];

				configDanObjArrs.push(singleConfig);
				configDanObjArr[currentConfigName] = configDanObjArrs;
				// console.log(configDanObjArr);

				// console.log(currentConfigName);
				// console.log(singleConfig);

				overPriceChange();
			}
		}
	}
	
	var configDouArr = new Array();
	var configDuoNameArr = new Array();
	var donfigDuoObj = new Array();

	var duoConfigObj = new Array();
	var duoConfigZObj = new Array();

	//多选包走向
	function configDuo (isChoose) {
	
		var configTitle = isChoose.get("title");
		var configBoy = isChoose.get("body");

		donfigDuoObj.push(configBoy);
		configDouArr.push(isChoose.id);
		configDuoNameArr.push(configTitle);

		$(".condigIn").append("<div class='overDuo addBag'><div class='overDanHead'><p class='ovarDanLeft'>"+configTitle+"：</p><p class='overDanRights'>+</p><p class='bagPrice addBagPrice'></p></div></div>");

	}


	//添加多选内容
	function addConfigDuo () {

		var configInNum = $(".addBag").length;
		var configProce = 0;
		var addPriceZongArr = 0;

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
					$(".addBag").eq(c).append("<div class='overDuoMain'><div class='overDanMLeft'></div><div class='ovarDanLeft'>"+babTitle+"</div><div class='overDanRights'></div><div class='bagPrice'>$ "+bagPrice+"</div></div>");
				
					// console.log(configDuoNameArr[c]);
					// console.log(donfigDuoObj[c][i]);

					duoConfigZObj.push(donfigDuoObj[c][i]);
					// console.log(duoConfigZObj);

					duoConfigObj[configDuoNameArr[c]] = duoConfigZObj;


				}

			}

			duoConfigZObj = [];

			//总价格
			addPriceZongArr = addPriceZongArr + configProce;
			$(".addBagPrice").eq(c).html("$ "+addPriceZongArr);
			overPriceFun(addPriceZongArr);

		}

		openAddConfigDuo();

	}


	var TFchoice = false;

	//多选家装包跳转
	function openAddConfigDuo () {
		$(".addBag").click(function () {
			var x = $(".addBag").index(this);
			
			$(".duoBodyZongHead").show();
			$(".mcb_wrap").hide();
			$(".blockCar").hide();

			
			showMoreDuo(x,configDouArr[x]);
			
			

		});
	}

	var recordAllBagDuo = new Array();

	//显示全部多选包
	function showMoreDuo (currentx,bagId) {

		TFchoice = true;
		$(".danBodyZong").html("");
		
		var choiseConfig = new AV.Query("ChooseConfig");
		choiseConfig.get(bagId,{
			success:function (isConfig) {

				recordAllBagDuo = [];

				var configTitle = isConfig.get("title");
				$(".danBodyZongHead_zong").html(configTitle);

				configBody = isConfig.get("body");

				for (var i = 0; i < configBody.length; i++) {

					var bodyTitle = configBody[i][0];
					var bodyComment = configBody[i][1];
					var bodyPrice = configBody[i][2];
					var bodyTrue = configBody[i][3];

					if (bodyTrue == true) {
						$(".danBodyZong").prepend("<li><div style='background-color:#ff9900;background-image:url(../img/weijieshou@3x.png)' class='choiseDuoBagLeft'></div><div class='bodyTitle'>包名："+bodyTitle+"</div><div class='bodyPrice'>$ "+bodyPrice+"</div><div class='bodyRight'></div><div class='bodyComment'>内容："+bodyComment+"</div></li>");
						recordAllBagDuo.unshift(configBody[i]);
					}else{
						$(".danBodyZong").append("<li class='onselfBagLi'><div style='background-color:#fff;' class='choiseDuoBagLefts'></div><div class='bodyTitle'>包名："+bodyTitle+"</div><div class='bodyPrice'>$ "+bodyPrice+"</div><div class='bodyRight'></div><div class='bodyComment'>内容："+bodyComment+"</div></li>");
						recordAllBagDuo.push(configBody[i]);
					}

				};

				$(".danBodyZong").append("<div class='duoBodyYes'><div class='duoBodyYesIn'>确定</div></div>");

				oneselfChoiceBagDuo(currentx,configTitle);

			},error:function () {
				console.log("获取配置失败");
			}
		})

	}


	//自选多选包事件
	function oneselfChoiceBagDuo (currentx,configTitle) {

		$(".onselfBagLi").click(function () {
			var x = $(".onselfBagLi").index(this);
			var thisBagLeft = $(".choiseDuoBagLefts").eq(x).css("background-color");
			if (thisBagLeft == "rgb(255, 255, 255)") {
				$(".choiseDuoBagLefts").eq(x).css({
					backgroundColor : "rgb(255, 153, 0)",
					backgroundImage : "url(../img/SCchoice@3x.png)"
				});
			}else{
				$(".choiseDuoBagLefts").eq(x).css({
					backgroundColor : "rgb(255, 255, 255)",
					backgroundImage : ""
				});
			}
		});

		$(".duoBodyYes").click(function () {

			$(".addBag").eq(currentx).html("");
			$(".addBag").eq(currentx).append("<div class='overDanHead'><p class='ovarDanLeft'>"+configTitle+"：</p><p class='overDanRights'>+</p><p class='bagPrice addBagPrice'></p></div>");

			offConfigBlock();
			
			var onselfBagLis = document.getElementsByClassName("danBodyZong")[0].getElementsByTagName("li");
			var zongPrice = 0;

			for (var i = 0; i < onselfBagLis.length; i++) {
				if (onselfBagLis[i].getElementsByTagName("div")[0].style.backgroundColor == "rgb(255, 153, 0)") {
					

					// console.log(configTitle);
					// console.log(recordAllBagDuo[i]);

					duoConfigZObj.push(recordAllBagDuo[i]);
					duoConfigObj[configTitle] = duoConfigZObj;
					

					zongPrice = zongPrice + recordAllBagDuo[i][2];
					$(".addBag").eq(currentx).append("<div class='overDuoMain'><div class='overDanMLeft'></div><div class='ovarDanLeft'>"+recordAllBagDuo[i][0]+"</div><div class='overDanRights'>-</div><div class='bagPrice'>$ "+recordAllBagDuo[i][2]+"</div></div>");
				}
			}

			duoConfigZObj = [];

			//总价格
			$(".addBagPrice").eq(currentx).html("$ "+zongPrice);
			overPriceChange();

		});

		
	}


	//单选家装包跳转
	function openAddConfig () {
		$(".openDan").click(function () {

			var x = $(".openDan").index(this);
			localStorage.setItem("singleConfigName",configDanNameArr[x]);

			$(".bodyZongHead").show();
			$(".bodyZong").html("");
			$(".mcb_wrap").hide();
			$(".blockCar").hide();

			showMoreDan(configDanArr[x]);

		});
	}

	//展示全部单选包
	function showMoreDan (bagId) {
		
		var choiseConfig = new AV.Query("ChooseConfig");
		choiseConfig.get(bagId,{
			success:function (isConfig) {

				var configTitle = isConfig.get("title");
				$(".bodyZongHead_zong").html(configTitle);

				configBody = isConfig.get("body");

				for (var i = 0; i < configBody.length; i++) {

					var bodyTitle = configBody[i][0];
					var bodyComment = configBody[i][1];
					var bodyPrice = configBody[i][2];

					$(".bodyZong").append("<li><div class='bodyTitle'>包名："+bodyTitle+"</div><div class='bodyPrice'>$ "+bodyPrice+"</div><div class='bodyRight'>></div><div class='bodyComment'>内容："+bodyComment+"</div></li>");


				};

				selectDanBag();

			},error:function () {
				console.log("获取配置失败");
			}
		});
	}

	//选择单选包返回事件
	function selectDanBag () {
		$(".bodyZong li").click(function () {
			var currentConfigName = localStorage.getItem("singleConfigName");
			var x = $(".bodyZong li").index(this);
			offConfigBlock();
			changeConfig(currentConfigName,configBody[x]);
		});
	}

	//关闭选择配置框
	$(".bodyZongHead_left").click(offConfigBlock);
	$(".duoBodyZongHead_left").click(offConfigBlock);

	//关闭配置框
	function offConfigBlock () {
		$(".bodyZongHead").hide();
		$(".duoBodyZongHead").hide();
		$(".mcb_wrap").show();
		$(".blockCar").show();
	}

	//展示全部外观颜色
	$(".clickoc").click(function () {
		$(".waif").html("");
		changeOutc();
		waiArr = [];
		waiRArr = [];
		wcolor(waiRelations,waiColorObjects,function (isName,isRbg,i,wcobj) {
			$(".waif").append("<li><div class='colorRbj' style='background:"+isRbg+";'></div><div class='colorName'>"+isName+"</div></li>");
			waiArr[i] = isName;
			waiRArr[i] = isRbg;
			selectColorOut(wcobj);
		});

	});

	//展示全部内饰颜色
	$(".clickic").click(function () {
		$(".neif").html("");
		changeInc();
		neiArr = [];
		wcolor(neiRelations,neiColorObjects,function (isName,isRbg,i,wcobj) {
			$(".neif").append("<li>"+isName+"</li>");
			neiArr[i] = isName;
			selectColorIn(wcobj);
		});
	});

	//选择颜色事件
	function selectColorOut (wcobj) {
		$(".waif li").click(function () {
			onColor();
			var i = $(".waif li").index(this);
			$(".overOutRgb").css("background",waiRArr[i]);
			$(".overOutSe").html(waiArr[i]);
			localStorage.setItem("waiColor",wcobj[i].id);
		});
	}

	//选择颜色事件
	function selectColorIn (wcobj) {
		$(".neif li").click(function () {
			onColor();
			var i = $(".neif li").index(this);
			$(".overInSe").html(neiArr[i]);
			localStorage.setItem("neiColor",wcobj[i].id);
		});
	}

	//关闭颜色列表
	$(".color_head_left").click(onColor);

	//订购数量
	$(".onselfPriceRight").click(function () {
		var creentNum = $(".onselfPriceNum").html();
		$(".onselfPriceNum").html(Number(creentNum)+1);
		$(".onselfPriceNums").html(Number(creentNum)+1);
		overPriceChange();
	});
	$(".onselfPriceLeft").click(function () {
		var creentNum = $(".onselfPriceNum").html();
		if (creentNum <= 1) {
			creentNum = 1;
		}else{
			$(".onselfPriceNum").html(Number(creentNum)-1);
			$(".onselfPriceNums").html(Number(creentNum)-1);
		}
		overPriceChange();
	});

	//海外基本车价
	function overPriceFun (changePrice) {
		var overPriceNow = $(".overPrice").html();
		//海外车价
		var HWPrice = Number(overPriceNow)+Number(changePrice);
		$(".overPrice").html(HWPrice);
		//到港价格
		var DGPrice = (Number(overPriceNow)+Number(changePrice))*7;
		$(".goGangPrice").html(DGPrice);

		//含税价格
		var HSPrice = (DGPrice*(ZHprice/100))+DGPrice;
		$(".hanshuiPrice").html(parseInt(HSPrice));

		//三项费用
		var SCPrice = $(".SCPrice").html();
		var QTPrice = $(".QTPrice").html();
		var SBPrice = $(".SBPrice").html();

		var SXPrice = Number(SCPrice)+Number(QTPrice)+Number(SBPrice);

		//预约费用
		var YYPrice = (HSPrice+SXPrice)*0.03;
		$(".yuyuePrice").html(parseInt(YYPrice));

		//总价
		var ZPrice = (HSPrice+SXPrice)+YYPrice;
		$(".zongPrice").html(parseInt(ZPrice));

		//预付费
		var YFPrice = ZPrice*0.3;
		$(".yufuPrice").html(parseInt(YFPrice));

	}
	//海外车价
	function overPriceChange () {
		var basicprices =  $(".overLRInfo").html().split("$")[1];
		// console.log(basicprices);
		var DanPrice = 0;
		for (var i = 0; i < $(".configDanPrice").length; i++) {
			DanPrice = DanPrice + Number($(".configDanPrice").eq(i).html().split("$")[1]);
		}
		// console.log(DanPrice);
		var DuoPrice = 0;
		for (var i = 0; i < $(".addBagPrice").length; i++) {
			DuoPrice = DuoPrice + Number($(".addBagPrice").eq(i).html().split("$")[1]);
		}
		// console.log(DuoPrice);

		var overPriceNow = Number(priceName) + Number(DanPrice) + Number(DuoPrice);

		// console.log(overPriceNow);
		//基本车价
		$(".overPrice").html(overPriceNow);
		//到港价格
		$(".goGangPrice").html(overPriceNow*7);
		//含税价格
		var HSPrice = (overPriceNow*7*(ZHprice/100)) + (overPriceNow*7);
		$(".hanshuiPrice").html(parseInt(HSPrice));

		//三项费用
		var SCPrice = $(".SCPrice").html();
		var QTPrice = $(".QTPrice").html();
		var SBPrice = $(".SBPrice").html();

		var SXPrice = Number(SCPrice)+Number(QTPrice)+Number(SBPrice);

		//预约费用
		var carNum = $(".onselfPriceNums").html();
		var ZPrice = (overPriceNow*7*(ZHprice/100)) + (overPriceNow*7)+SXPrice;
		var YYprice = ZPrice*carNum*0.03;
		$(".yuyuePrice").html(parseInt(YYprice));
		//总价
		var jmPrice = $(".youhuiPrice").html();
		jmPrice == "" ? jmPrice = 0 : jmPrice ;
		$(".zongPrice").html(parseInt((ZPrice*carNum)+YYprice-jmPrice));
		//预付费
		$(".yufuPrice").html(parseInt(((ZPrice*carNum)+YYprice-jmPrice)*0.3));

	}

	//立即预约
	$(".blockRight").click(function () {
		$(".perfectMessage").show();
		$(".mcb_wrap").hide();
		$(".blockCar").hide();
	});
	//关闭立即预约
	$(".perfectMer_left").click(function () {
		$(".perfectMessage").hide();
		$(".mcb_wrap").show();
		$(".blockCar").show();
	});

	var TFLoad = false;
	//提价预约单
	$(".perfectLoad").click(function () {

		var currentUser = AV.User.current();
		var outColorId = localStorage.getItem("waiColor");
		var inColorId = localStorage.getItem("neiColor");
		var currentName = $(".userName").val();
		var currentPhone = $(".userPhone").val();
		var currentNum = $(".onselfPriceNum").html();
		var currentYF = $(".yufuPrice").html();
		var OverseasCarCurrent = new OverseasCar();
		OverseasCarCurrent.id = carId;
		var ColorOut = new Color();
		ColorOut.id = outColorId;
		var ColorIn = new Color();
		ColorIn.id = inColorId;

		if (!currentUser) {
			new $.flavr("您还没有登陆");
			return false;
		}

		if (currentName == "") {
			new $.flavr("姓名不能为空");
			return false;
		}
		if (currentPhone == "") {
			new $.flavr("电话不能为空");
			return false;
		}

		if (TFLoad == false) {
			new $.flavr("上传身份证和营业执照各一张");
			return false;
		}


			
			choiseCall(configDanObjArr,1,function(array){

				choiseCall(duoConfigObj,2,function(arr){

					var newOrder = new Order();
					newOrder.set("carType",3);
					newOrder.set("status",1);
					newOrder.set("car_number",Number(currentNum));
					newOrder.set("overseasCar",OverseasCarCurrent);
					newOrder.set("chooseExteriorColor",ColorOut);
					newOrder.set("chooseInternalColor",ColorIn);
					newOrder.set("user_name",currentName);
					newOrder.set("contact",currentPhone);
					newOrder.set("user",currentUser);
					newOrder.set("evidence",imagesArr);
					newOrder.set("speakPrice",Number(currentYF));
					newOrder.set("identifier",String(orderH()));
					if (currentCouponObj != null) {
						newOrder.set("coupon",currentCouponObj);
					}
					var relationConfig = newOrder.relation("chooseConfig");
					for (var i = 0; i < array.length; i++) {
						 relationConfig.add(array[i]);
					}
					for (var i = 0; i < arr.length; i++) {
						 relationConfig.add(arr[i]);
					}
					newOrder.save().then(function (isOrder) {
						if (currentCouponObj != null) {
							currentCouponObj.set("isUse",true);
							currentCouponObj.save();
						}
						var currentOrderCarId = isOrder.id;
						judegTFOrder(currentOrderCarId,function (currentOrderCarId) {
							window.open("mcb-wap-orderOver.html?id="+currentOrderCarId,"_self");
						});
						$(".perfectLoad").remove();
					},function () {
						console.log("保存订单失败");
					});
				});
			});
		
			
	});

	


	//遍历数组键值
	function choiseCall (callArr,callNum,callback) {
		var count = 0;
		var congfigsArr = new Array();
		
		var keyCount = 0;
		for (var key in callArr) {
			keyCount ++;
		}

		if (callArr.length == 0) {
			callback(new Array());
			return;
		}
		for (var key in callArr) {
			var saveChoice = new ChooseConfig();
			saveChoice.set("title",key);
			saveChoice.set("body",callArr[key]);
			saveChoice.set("chooseType",Number(callNum));
			saveChoice.save().then(function (isChoice) {
				congfigsArr[count] = isChoice;
				count ++;
				if (count == keyCount) {
					callback(congfigsArr);
				}
			},function (error) {
				console.log("保存配置失败");
			});
		}
	}


	var imagesArr = new Array();		
	//上传图片
	$(".perfectFile").change(function(event) {
		showProcress();
		var fileUploadControl = $("#photoFileUpload")[0];
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = "avatar.jpg";
			var avFile = new AV.File(name, file);
		}
		avFile.save().then(function (isPic) {
			// console.log(isPic._url);
			$(".perfectPic").prepend("<img src='"+isPic._url+"'>");
			imagesArr.push(isPic._url);

			for (var i = 0; i < $(".perfectPic img").length; i++) {
				if (i == 1) {
					$(".addPerfectPic").hide();
					TFLoad = true;
				}
			}

			hiddenProcess();

		},function (error) {
			new $.flavr("上传图片失败");
			hiddenProcess();
		});
	});

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


	var currentCouponObj = null;
	//使用优惠券
	$(".scribePC_head").click(function () {
		$(".scribeFoot").toggle(200);
	});
	$(".useCode").click(function () {

		if ($(".youhuiPrice").html() != "") {
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

				if (isCoupon[i].get("coupon") == couponLeft+couponWrap+couponRight) {

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

					var couponType = isCoupon[i].get("car_type");
					var couponTypeName = "";
					couponType == 0 ? couponTypeName = "通用券" : couponType;
					couponType == 1 ? couponTypeName = "4S车" : couponType;
					couponType == 2 ? couponTypeName = "进口车" : couponType;
					couponType == 3 ? couponTypeName = "海外车" : couponType;

					if (couponType != 3 && couponType != 0) {
						new $.flavr("该券仅使用于"+couponTypeName);
						return false;
					}

					var nowType = isCoupon[i].get("type");
					if (nowType == 1) {
						var couponDiscount = isCoupon[i].get("discount");
						var currentYY = $(".yuyuePrice").html();
						var couponCash = currentYY*(1-couponDiscount);
					}
					if (nowType == 2) {
						var couponCash = isCoupon[i].get("cash");
					}
					if (nowType == 3) {
						var couponCash = $(".yuyuePrice").html();
					}
					$(".youhuiBlock").show();
					$(".youhuiPrice").html(parseInt(couponCash));
					var currentZPrice = $(".zongPrice").html();
					var currentZong = Number(currentZPrice)-Number(couponCash);
					$(".zongPrice").html(parseInt(currentZong));
					$(".yufuPrice").html(parseInt(currentZong*0.3));


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

	//返回上层
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

});