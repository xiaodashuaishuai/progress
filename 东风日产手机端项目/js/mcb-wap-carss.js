$(document).ready(function() {
	
	showProcress();

	//接收品牌
	var choiseBrand = queryCrrentID();
	// alert(choiseBrand);

	var currentCarType = localStorage.getItem("carType");
	var carNumber,carsPrice,carObjs;

	var queryCars = new AV.Query("Cars");
	var Brand = AV.Object.extend("Brand");
	var priceLeft,priceRight;
	var allPriceArr = new Array();
	var newAllPriceArr = new Array();
	var carsIds = new Array();
	var carsIcon_url;

	//获取相应车系
	var newBrand = new Brand();
	newBrand.id = choiseBrand;
	queryCars.equalTo("brand",newBrand);
	queryCars.find({
		success:function (isCars) {

			for (var i = 0; i < isCars.length; i++) {
				var carsId = isCars[i].id;
				var carsIcon = isCars[i].get("photo");
				if (!carsIcon) {
					carsIcon_url = "";
				}else{
					carsIcon_url = carsIcon.url();
				}

				var carsName = isCars[i].get("cars");

				currentCarType == 0 ? carObjs = {
					carsPrice : isCars[i].get("overseas_price_range") ,
					carNumber : isCars[i].get("overseasCarCount")
				} : currentCarType;
				currentCarType == 1 ? carObjs = {
					carsPrice : isCars[i].get("store_price_range") ,
					carNumber : isCars[i].get("storeCarCount")
				} : currentCarType;
				currentCarType == 2 ? carObjs = {
					carsPrice : isCars[i].get("now_price_range") ,
					carNumber : isCars[i].get("nowCarCount")
				} : currentCarType;
				currentCarType == 3 ? carObjs = {
					carsPrice : isCars[i].get("sales_price_range") ,
					carNumber : isCars[i].get("salesCarCount")
				} : currentCarType;
				currentCarType == 4 ? carObjs = {
					carsPrice : priceInterval(isCars[i]) ,
					carNumber : 1
				} : currentCarType;

				var salesCarCount = isCars[i].get("salesCarCount");

				
				// console.log(carObjs.carsPrice);

				if (isCars[i].get("nowCarCount") != 0 || isCars[i].get("storeCarCount") != 0 || isCars[i].get("overseasCarCount") != 0) {

					if (carObjs.carsPrice == "" || !carObjs.carsPrice) {
						priceLeft = "";
						priceRight = "";
					}else{
						priceLeft = (carObjs.carsPrice.split("~")[0])*10000;
						priceRight = (carObjs.carsPrice.split("~")[1])*10000;
					}

					if (carObjs.carNumber != 0) {
						carsIds.push(carsId);
						if (salesCarCount != 0) {
							$(".carsTobal").append("<li><img src='"+carsIcon_url+"'><div class='carsInfor'><div class='carsName'>"+carsName+"</div><div class='carsSales'>促 销</div><div class='carsPrice'>价格区间:&nbsp;<span class='carsPrice_in'>"+changeTwoDecimal(priceLeft/10000)+"~"+changeTwoDecimal(priceRight/10000)+"万</span></div></div></li>");
						}else{
							$(".carsTobal").append("<li><img src='"+carsIcon_url+"'><div class='carsInfor'><div class='carsName'>"+carsName+"</div><div class='carsPrice'>价格区间:&nbsp;<span class='carsPrice_in'>"+changeTwoDecimal(priceLeft/10000)+"~"+changeTwoDecimal(priceRight/10000)+"万</span></div></div></li>");
						}
					}

				}

					

					
			}
			hiddenProcess();
			judegCars();
		},error:function () {
			console.log("查询车系失败");
			hiddenProcess();
		}
	});

	//获取品牌名
	var queryBrand = new AV.Query(Brand);
	queryBrand.get(choiseBrand,{
		success:function (isBrand) {
			var brandName = isBrand.get("brand");
			$(".cars_head_zhong").html(brandName);
		},error:function () {
			console.log("获取品牌失败");
			$(".cars_head_zhong").html("全部");
		}
	});

	//返回上层
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

	//选择车系事件
	function judegCars () {
		$(".carsTobal li").click(function () {
			var i = $(".carsTobal li").index(this);
			window.open("mcb-wap-carr.html?id="+carsIds[i],"_self");
		});
	}


	//获取价格区间
	function priceInterval (isCars) {

		var overPrice = isCars.get("overseas_price_range");
		var storePrice = isCars.get("store_price_range");
		var nowPrice = isCars.get("now_price_range");
		var salesPrice = isCars.get("sales_price_range");

		if (overPrice) {
			straverseArr(overPrice);
		}

		if (storePrice) {
			straverseArr(storePrice);
		}

		if (nowPrice) {
			straverseArr(nowPrice);
		}

		if (salesPrice) {
			straverseArr(salesPrice);
		}

		newAllPriceArr = allPriceArr.join(",").split(",");
		// console.log(newAllPriceArr);
		var priceRight = Math.max.apply(null,newAllPriceArr);
		var priceLeft = Math.min.apply(null,newAllPriceArr);
		// console.log(priceLeft+"~"+priceRight);

		return priceLeft+"~"+priceRight;


	}

	function straverseArr (currentPrice) {
		if (currentPrice.split("~") != "undefined") {
			allPriceArr.push((currentPrice.split("~")).toString());
		}
	}









});