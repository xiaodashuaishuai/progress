$(document).ready(function() {

	showProcress();

	var currentCarType,cyrrentCarName,currentCarObj,currentStatus,currentStatusName,currentCarGather,currentPrice,currentStatusRgb,currentStatysObj,currentOrder;
	var carTitleArr = new Array();
	var carLogo = new Array();
	var carPriceArr = new Array();
	var carStatusArr = new Array();


	var currentUser = AV.User.current();

	//查询详情
	findOrder(function(orders){

		for (var i = 0; i < orders.length; i++) {
			var currentCar = orders[i][0];
			var currentBrandName = orders[i][1].get("brand");
			var currentCarsName = orders[i][2].get("cars");
			var currentCarsCover = orders[i][2].get("photo");
			var currentCarsCovers = orders[i][2].get("cover");
			var currentCarTypeName = orders[i][3];
			var currentStatys = orders[i][4];
			var currentPrices = orders[i][5];
			var currentStyle = judegK(currentCar.get("style"));
			var currentModel = judegK(currentCar.get("model"));
			var currentModifier = judegK(currentCar.get("modifier"));
			var currentOrderId = orders[i][6].id;

			if (currentStyle == "") {
				currentStyle = judegK(currentCar.get("framework"));
				currentModel = judegK(currentCar.get("framework"));
				currentModifier = judegK(currentCar.get("framework"));
				if (currentStyle) {
					currentStyle = judegK(currentCar.get("framework").get("style"));
					currentModel = judegK(currentCar.get("framework").get("model"));
					currentModifier = judegK(currentCar.get("framework").get("modifier"));
				}
			}

			carPriceArr[i] = currentPrices;

			carTitleArr[i] = currentBrandName+" "+currentCarsName+" "+currentModel+" "+currentStyle+" "+currentModifier;

			currentCarsCover ? currentCarsCover = orders[i][2].get("photo").url() : currentCarsCover = "" ;
			currentCarsCovers ? currentCarsCovers = orders[i][2].get("cover").url() : currentCarsCovers = "" ;

			carLogo[i] = currentCarsCovers;

			currentStatys == 0 ? currentStatysObj = {
				currentStatusName : "已取消" ,
				currentStatusRgb : "#BCBCBC"
			} : currentStatys ;
			currentStatys == 1 ? currentStatysObj = {
				currentStatusName : "订单审核中" ,
				currentStatusRgb : "#BCBCBC"
			} : currentStatys ;
			currentStatys == 2 ? currentStatysObj = {
				currentStatusName : "订单审核失败" ,
				currentStatusRgb : "#BCBCBC"
			} : currentStatys ;
			currentStatys == 3 ? currentStatysObj = {
				currentStatusName : "待支付" ,
				currentStatusRgb : "#FF9900"
			} : currentStatys ;
			currentStatys == 4 ? currentStatysObj = {
				currentStatusName : "汇款核对中" ,
				currentStatusRgb : "#BCBCBC"
			} : currentStatys ;
			currentStatys == 5 ? currentStatysObj = {
				currentStatusName : "汇款审核失败" ,
				currentStatusRgb : "#BCBCBC"
			} : currentStatys ;
			currentStatys == 6 ? currentStatysObj = {
				currentStatusName : "待交易" ,
				currentStatusRgb : "#FF9900"
			} : currentStatys ;
			currentStatys == 7 ? currentStatysObj = {
				currentStatusName : "已完成" ,
				currentStatusRgb : "#009933"
			} : currentStatys ;
			currentStatys == 8 ? currentStatysObj = {
				currentStatusName : "退款中" ,
				currentStatusRgb : "#BCBCBC"
			} : currentStatys ;

			carStatusArr[i] = currentStatysObj.currentStatusName;

			$(".orderOut").append("<li><div class='cureentCarId' style='display:none;'>"+currentOrderId+"</div><div class='orderHead'><div class='orderHeadLeft'>"+currentCarTypeName+"</div><div class='orderHeadRight'>"+currentBrandName+" "+currentCarsName+" "+currentModel+" "+currentStyle+" "+currentModifier+"</div></div><img src='"+currentCarsCover+"' class='orderImg'><div class='orderMain'><div class='orderMainLeft'>平台价格：</div><div class='orderMainPrice'>￥ "+changeTwoDecimal(currentPrices/10000)+"万</div><div class='orderMainLeft'>订单状态：</div><div class='orderMainZT' style='background-color:"+currentStatysObj.currentStatusRgb+";'>"+currentStatysObj.currentStatusName+"</div></div></li>");
		
		}

		hiddenProcess();
		skipCar();

	});

	//获取4S车的模板
	function findMB (formId,callback) {
		var queryForm = new AV.Query("StoreCarFormwork");
		queryForm.get(formId,{
			success:function (isForm) {
				callback(isForm);
			},error:function () {
				console.log("获取模板失败");
			}
		});
	}

	//查询订单
	function findOrder (callback) {
		var queryOrder = new AV.Query(Order);
		queryOrder.equalTo("user",currentUser);
		queryOrder.include("overseasCar");
		queryOrder.include("nowCar");
		queryOrder.include("storeCar");
		queryOrder.include("framework");
		queryOrder.find().then(function (isOrder) {

			var orders = new Array();
			var count = 0;

			for (var i = 0; i < isOrder.length; i++) {

				currentOrder = isOrder[i];

				currentCarType = isOrder[i].get("carType");

				currentCarType == 1 ? currentCarGather = {
					cyrrentCarName : "国内现车" ,
					currentStatus : isOrder[i].get("status") ,
					currentCarObj : isOrder[i].get("nowCar") ,
					currentPrice : judegK(isOrder[i].get("nowCar").get("terracePrice"))
				} : currentCarType;

				currentCarType == 2 ? currentCarGather = {
					cyrrentCarName : "4S直售" ,
					currentStatus : isOrder[i].get("status") ,
					currentCarObj : isOrder[i].get("storeCar") ,
					currentPrice : judegK(isOrder[i].get("storeCar").get("terracePrice"))
				} : currentCarType;

				currentCarType == 3 ? currentCarGather = {
					cyrrentCarName : "海外直订" ,
					currentStatus : isOrder[i].get("status") ,
					currentCarObj : isOrder[i].get("overseasCar") ,
					currentPrice : judegK(isOrder[i].get("speakPrice"))
				} : currentCarType;

				currentCarType == 5 ? currentCarGather = {
					cyrrentCarName : "4S直售" ,
					currentStatus : isOrder[i].get("status") ,
					currentCarObj : isOrder[i].get("storeCar") ,
					currentPrice : judegK(isOrder[i].get("storeCar").get("terracePrice"))
				} : currentCarType;

				// console.log(currentCarGather.currentStatus);

				var brandId = currentCarGather.currentCarObj.get("brand").id;
				findBC(currentOrder,currentCarGather.currentPrice,currentCarGather.currentStatus,currentCarGather.cyrrentCarName,currentCarGather.currentCarObj,brandId,"Brand",function (brand,obj,typeName,statysName,priceNum,currentOrder) {
					var carsId = obj.get("cars").id;
					findBC(currentOrder,priceNum,statysName,typeName,obj,carsId,"Cars",function (cars,obj,typeName,statysName,priceNum,currentOrder) {
						findFramework(cars,obj,typeName,statysName,priceNum,currentOrder,function(cars,obj,typeName,statysName,priceNum,currentOrder){
							var arr = new Array();
							arr[0] = obj;
							arr[1] = brand;
							arr[2] = cars;
							arr[3] = typeName;
							arr[4] = statysName;
							arr[5] = priceNum;
							arr[6] = currentOrder;
							orders[count] = arr;
							count ++;
							if (count == isOrder.length) {
								callback(orders);
							}
						});
						
					});
				});

			}
			
			if (isOrder.length == 0) {
				$(".orderOut").html("您还没有预定车辆");
			}
			hiddenProcess();
		},function () {
			console.log("获取订单失败");
			hiddenProcess();
		});
	}

	//查询模板
	function findFramework(cars,obj,typeName,statysName,priceNum,currentOrder,callback){
	
			if (currentOrder.get("carType") == 2 ||
				currentOrder.get("carType") == 5) {
				var StoreCar = new AV.Object.extend("StoreCar");
				var querycar = new AV.Query(StoreCar);
				querycar.equalTo("objectId",currentOrder.get("storeCar").id);
				querycar.include("framework");
				querycar.find().then(function(carObj){
					callback(cars,carObj[0],typeName,statysName,priceNum,currentOrder);
				});
			}else{
				callback(cars,obj,typeName,statysName,priceNum,currentOrder);
			}
	}
	
	//查询品牌名
	function findBC (currentOrder,priceNum,statysName,typeName,obj,BCID,BrandCars,callback) {
		var queryBC = new AV.Query(BrandCars);
		queryBC.get(BCID,{
			success:function (isBC) {
				callback(isBC,obj,typeName,statysName,priceNum,currentOrder);
			},error:function () {
				console.log("查询品牌车系失败");
				hiddenProcess();
			}
		});
	}

	//详情跳转
	function skipCar () {
		$(".orderOut li").click(function () {
			var s = $(".orderOut li").index(this);

			localStorage.setItem("carssTitle",carTitleArr[s]);
			localStorage.setItem("carssLog",carLogo[s]);
			localStorage.setItem("carssPrice",carPriceArr[s]);
			localStorage.setItem("carssStatus",carStatusArr[s]);
			var thisCarId = $(".cureentCarId").eq(s).html();

			var TFover = $(".orderHeadLeft").eq(s).html();

			if (TFover == "海外直订") {
				window.open("mcb-wap-orderOver.html?id="+thisCarId,"_self");
			}else{
				window.open("mcb-wap-orderCar.php?id="+thisCarId,"_self");
			}
			
		});
	}


	//返回
	$(".cars_head_left").click(function () {
		window.open("../index.html","_self");
	});

});