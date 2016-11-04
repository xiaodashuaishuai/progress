$(document).ready(function() {

	showProcress();
	
	//获取页面id
	var carId = queryCrrentID();

	var queryOverseas = new AV.Query(OverseasCar);
	var queryStore = new AV.Query(StoreCar);
	var queryNow = new AV.Query(NowCar);
	var queryForm = new AV.Query("StoreCarFormwork");

	var queryNum = 0;
	var carsId,brandId,overCarId;
	var carLogo,brandName,carsName,styleName,modelName,memoName,carLogo_url,colorIn,colorOut,marketPrice,terracePrice,Sprice,addConfig,baseConfig,modifier;
	var overNum,colorOutr,userIcon,userName,postInfo,crrentTime;
	var neiRelations,waiRelations;
	var neiArr = new Array();
	var waiArr = new Array();
	var waiRArr = new Array();
	var waiColorObjects;
	var neiColorObjects;
	/*
	*queryNum 
	*海外直定(0);
	*4S直售(1);
	*国内现车(2);
	*模板(3);
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
		carObj.get(carId,{
			success:function (existCar) {
				carLogo = existCar.get("cars").get("cover");
				!carLogo?carLogo_url = "":carLogo_url = carLogo.url();
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

	//查询评论
	(function (carId) {
		var queryCarComment = new AV.Query(CarComment);
		queryCarComment.include("user");
		queryCarComment.equalTo("carId",carId);
		queryCarComment.find({
			success:function (isComment) {
				// console.log(isComment);
				if (isComment == "" || !isComment) {
					$(".postInfo").append("<p class='errorTS'>暂无任何评论!</p>");
				}else{
					$(".postInfo").html("");
					for (var i = 0; i < isComment.length; i++) {
						postInfo = isComment[i].get("content");
						crrentTime = DTS(isComment[i].createdAt);
						userIcon = isComment[i].get("user").get("userIcon");
						userIcon ? userIcon = isComment[i].get("user").get("userIcon").url() : userIcon = createConfig();
						userName = isComment[i].get("user").get("username");
						showPost();
					}
				}
			},error:function () {
				console.log("查询帖子失败");
				$(".postInfo").append("<p class='errorTS'>暂无任何评论!</p>");
			}
		});
	})(carId);

	//获取当前用户
	function current_user (callback) {
		var currentUser = AV.User.current();
		if (currentUser) {
			// console.log("以登陆");
			userIcon = currentUser.get("userIcon");
			userIcon?userIcon = currentUser.get("userIcon")._url:userIcon = createConfig();
			userName = currentUser.get("username");
			callback(currentUser);
		}else{
			// console.log("未登录");
			alert("您还没登陆");
		}
	}

	//发表评论
	$(".publishPost").click(function () {
		postInfo = $(".importPost").val();
		if (postInfo == "") {
			new $.flavr("发表内容不能为空");
			return false;
		}
		current_user(function (userObj) {
			var saveCC = new CarComment();
			saveCC.set("carId",carId);
			saveCC.set("user",userObj);
			saveCC.set("content",postInfo);
			saveCC.save().then(function (time) {
				$(".postInfo p").remove();
				crrentTime = DTS(time.createdAt);
				showPost();
				new $.flavr("发表成功");
			},function () {
				new $.flavr("发帖失败");
			});
		});
		
	});

	//展示帖子
	function showPost () {
		$(".postInfo").prepend("<li><div class='postIcon'><img src='"+userIcon+"'></div><div class='postName'>"+userName+"</div><div class='postTime'>"+crrentTime+"</div><div class='postComment'>"+postInfo+"</div></li>");
		$(".importPost").val("");
	}
		

	//获取车款内容
	function gainCarIn (thisCar) {
		// console.log(thisCar);

		carsId = thisCar.get("cars").id;
		brandId = thisCar.get("brand").id;

		brandName = thisCar.get("brand").get("brand");
		carsName = thisCar.get("cars").get("cars");

		cxHar(thisCar);

		if (queryNum == 0) {
			window.history.back(-1);
		}

		if (queryNum == 1) {
			changeFours();
			queryFours(thisCar);
		}

		if (queryNum == 2) {
			queryNowCar(thisCar);
		}

		if (queryNum == 3) {
			changeFours();
			queryForms(thisCar);
		}
		
		
	}

	//查询并获取海外车
	function cxHar (thisCar) {
		overNum = thisCar.get("cars").get("overseasCarCount");
		if (overNum != 0 || overNum > 0) {
			var gainOver = new AV.Query(OverseasCar);
			var isCar_obj = new Cars();
			var isBrand_obj = new Brand();
			isCar_obj.id = carsId;
			isBrand_obj.id = brandId;
			queryOver(gainOver,isCar_obj,isBrand_obj,function (m,d,u,p,oid) {
				$(".overRecommend").append("<div class='overCarid' style='display:none;'>"+oid+"</div><p>"+brandName+" "+carsName+" "+m+" "+changeTwoDecimal(d)+" "+u+"<span class='overDanRight'></span><span class='overPrice'>￥"+inciseNum(p.toString())+"</span></p>");
			});
		}else{
			$(".overRecommend").remove();
		}
	}

	//选择海外车事件
	function selectOverCar () {
		$(".overRecommend p").click(function () {
			var i = $(".overRecommend p").index(this);
			var overId = $(".overCarid").eq(i).html();
			window.open("mcb-wap-overseas.html?id="+overId,"_self");
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

	//查询海外车
	function queryOver (over_obj,cars_obj,brand_obj,addFun) {
		over_obj.equalTo("cars",cars_obj);
		over_obj.equalTo("brand",brand_obj);
		over_obj.limit(5);
		over_obj.include("cars");
		over_obj.find({
			success:function (isOver) {
				for (var i = 0; i < isOver.length; i++) {
					var overModel = isOver[i].get("model");
					var overDisplacement = isOver[i].get("displacement");
					var overUnit = isOver[i].get("unit");
					var overPrice = isOver[i].get("basicPrice");
					overCarId = isOver[i].id;
					addFun(overModel,overDisplacement,overUnit,overPrice,overCarId);
				}
				selectOverCar();
			},error:function () {
				alert("查询海外车失败");
			}
		});
	}



	//国内现车获取事件
	function queryNowCar (nowO) {
		waiRelations = nowO.relation("exteriorColor");
		neiRelations = nowO.relation("internalColor");
		modelName = judegK(nowO.get("model"));
		memoName = judegK(nowO.get("memo"));
		styleName = judegK(nowO.get("style"));
		modifier = judegK(nowO.get("modifier"));
		colorIn = nowO.get("normalInternalColor");
		colorIn?colorIn = nowO.get("normalInternalColor").get("color_name"):colorIn;
		colorIn = judegK(colorIn);
		colorOut = nowO.get("normalExteriorColor");
		colorOut?colorOut = nowO.get("normalExteriorColor").get("color_name"):colorOut;
		colorOut = judegK(colorOut);
		colorOut?colorOutr = nowO.get("normalExteriorColor").get("color_rgb"):colorOutr;
		if (colorOutr == ",,") {
			colorOutr = nowO.get("normalExteriorColor").get("color_string");
		}
		colorRGB(colorOutr);
		//记住颜色
		if (nowO.get("normalExteriorColor")) {
			localStorage.setItem("waiColor",nowO.get("normalExteriorColor").id);
		}
		if (nowO.get("normalInternalColor")) {
			localStorage.setItem("neiColor",nowO.get("normalInternalColor").id);
		}
		
		marketPrice = nowO.get("marketPrice");
		terracePrice = nowO.get("terracePrice");
		Sprice = marketPrice - terracePrice;
		addConfig = nowO.get("add_configuration");
		if (addConfig == "" || !addConfig) {
			$(".add_head").remove();
			$(".add_configuration").remove();
		}else{
			addConfigA = addConfig.split(" ");
			for (var i = 0; i < addConfigA.length; i++) {
				$(".add_configuration").append("<span>"+addConfigA[i]+"</span>");
			}
		}
		baseConfig = nowO.get("basicConfig");
		if (baseConfig) {
			addAdd(baseConfig);
		}


		showIn();
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

	//4S模板获取事件
	function queryForms (car) {

		waiRelations = car.relation("exteriorColor");
		neiRelations = car.relation("internalColor");
		
		modelName = judegK(car.get("model"));
		memoName = judegK(car.get("memo"));
		styleName = judegK(car.get("style"));
		modifier = judegK(car.get("modifier"));
		marketPrice = car.get("marketPrice");
		terracePrice = car.get("terracePrice");
		Sprice = marketPrice - terracePrice;

		colorOut = car.get("normalExteriorColor").get("color_name");
		colorOutr = car.get("normalExteriorColor").get("color_rgb");
		colorIn = car.get("normalInternalColor").get("color_name");
		if (colorOutr == ",,") {
			colorOutr = car.get("normalExteriorColor").get("color_string");
		}

		colorRGB(colorOutr);

		localStorage.setItem("waiColor",car.get("normalExteriorColor").id);
		localStorage.setItem("neiColor",car.get("normalInternalColor").id);

		showIn();

		
	}

	//4S车获取事件
	function queryFours (car) {

		waiRelations = car.get("framework").relation("exteriorColor");
		neiRelations = car.get("framework").relation("internalColor");
		
		modelName = judegK(car.get("framework").get("model"));
		memoName = judegK(car.get("framework").get("memo"));
		styleName = judegK(car.get("framework").get("style"));
		modifier = judegK(car.get("framework").get("modifier"));
		marketPrice = car.get("framework").get("marketPrice");
		terracePrice = car.get("terracePrice");
		Sprice = marketPrice - terracePrice;

		var oColor_id = car.get("framework").get("normalExteriorColor").id;
		var iColor_id = car.get("framework").get("normalInternalColor").id;



		queryFC(oColor_id,function (isColor) {
			colorOut = judegK(isColor.get("color_name"));
			colorOutr = judegK(isColor.get("color_rgb"));
			if (colorOutr != "") {
				colorOutr = judegK(isColor.get("color_string"));
			}
			colorRGB(colorOutr);
			localStorage.setItem("waiColor",isColor.id);
			
			queryFC (iColor_id,function (isColor) {
				colorIn = judegK(isColor.get("color_name"));
				localStorage.setItem("neiColor",isColor.id);
				showIn();
			});
		});

		
	}

	//4S改变样式
	function changeFours () {
		$(".add_configuration").remove();
		$(".tabPPLeft").remove();
		$(".infoLeft").remove();
		$(".infoRight").show();
		$(".tabPP").css({
			backgroundColor : "#000",
			color : "#FF9900",
			borderTop : "1px solid #fff",
			position : "relative"
		});
		$(".tabPPRingth").css({
			width : "140px",
			textAlign : "center",
			position : "absolute",
			backgroundColor : "#000",
			top : "-20px",
			left : "250px",
			zIndex : "1",
			fontSize : "20pt"
		});
	}

	//获取并显示颜色rgb
	function colorRGB (colorOutr) {
		$(".colorOut_se").css("background",getColor(colorOutr));
	}

	//获取4S车颜色
	function queryFC (oColor_id,callback) {
		var queryColor = new AV.Query(Color);
		queryColor.get(oColor_id,{
			success:function (isColor) {
				callback(isColor);
			},error:function () {
				console.log("获取颜色失败");
			}
		});
	}



	//显示信息
	function showIn () {
		$(".carLogoin").attr("src",carLogo_url);
		$(".carTitle").html(brandName+" "+carsName+" "+modelName+" "+styleName+" "+modifier);
		$(".colorIn_name").html("内饰颜色："+colorIn);
		$(".colorOut_name").html("外观颜色："+colorOut);
		$(".nowAddlp").html(changeTwoDecimal(marketPrice/10000)+"万");
		$(".terracePrice").html(changeTwoDecimal(terracePrice/10000)+"万");
		$(".Sprice").html(changeTwoDecimal(Sprice/10000)+"万");
		if (memoName == "") {
			$(".remark").hide();
		}else{
			$(".remarkInfo").html(memoName);
		}
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
			$(".colorOut_se").css("background",waiRArr[i]);
			$(".colorOut_name").html("外观颜色："+waiArr[i]);
			localStorage.setItem("waiColor",wcobj[i].id);
		});
	}

	//选择颜色事件
	function selectColorIn (wcobj) {
		$(".neif li").click(function () {
			onColor();
			var i = $(".neif li").index(this);
			$(".colorIn_name").html("内饰颜色："+neiArr[i]);
			localStorage.setItem("neiColor",wcobj[i].id);
		});
	}

	//关闭颜色列表
	$(".color_head_left").click(onColor);



	//配置评价切换
	$(".tabPPLeft").click(function () {
		$(".infoLeft").show();
		$(".infoRight").hide();
	});
	$(".tabPPRingth").click(function () {
		$(".infoLeft").hide();
		$(".infoRight").show();
	});

	//点击预约时间
	$(".blockRight").click(function () {
		window.open("mcb-wap-subscribe.php?id="+carId,"_self");
	});


	//返回上层事件
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

});