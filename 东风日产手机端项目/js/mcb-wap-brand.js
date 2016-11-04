jQuery(document).ready(function($) {

	showProcress();

	//返回上层事件
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

	var currentCarType = localStorage.getItem("carType");
	var carNumber;

	var queryBrand = new AV.Query("Brand");
	queryBrand.limit(1000);
	queryBrand.find({
		success:function (isBrand) {
			for (var i = 0; i < isBrand.length; i++) {

				var brandId = isBrand[i].id;
				var brandIcon_url = isBrand[i].get("brand_icon");
				if (!brandIcon_url || brandIcon_url == "") {
					var brandIcon_url = "";
				}else{
					var brandIcon_url = brandIcon_url.url();
				}

				currentCarType == 0 ? carNumber = isBrand[i].get("overseasCarCount") : currentCarType ;
				currentCarType == 1 ? carNumber = isBrand[i].get("storeCarCount") : currentCarType ;
				currentCarType == 2 ? carNumber = isBrand[i].get("nowCarCount") : currentCarType ;
				currentCarType == 3 ? carNumber = isBrand[i].get("salesCarCount") : currentCarType ;
				currentCarType == 4 ? carNumber = 1 : currentCarType;

				// console.log(carNumber);

				if (isBrand[i].get("overseasCarCount") != 0 || isBrand[i].get("storeCarCount") != 0 || isBrand[i].get("nowCarCount") != 0 || isBrand[i].get("salesCarCount") != 0) {
					if (carNumber != 0) {
						var brandName = isBrand[i].get("brand");
						var brandName_sp = makePy(brandName);
						judgePY(String(brandName_sp).substr(0,1),brandName,brandIcon_url,brandId);
					}
				}

			}
			hiddenProcess();
			judegBrand();
		},error:function () {
			console.log("查询品牌失败");
			hiddenProcess();
		}
	});

	function judgePY (isPy,isName,isIcon,brandId) {
		if (isPy == "A") {
			isPy = 1;
		}else if (isPy == "B") {
			isPy = 2;
		}else if (isPy == "C") {
			isPy = 3;
		}else if (isPy == "D") {
			isPy = 4;
		}else if (isPy == "E") {
			isPy = 5;
		}else if (isPy == "F") {
			isPy = 6;
		}else if (isPy == "G") {
			isPy = 7;
		}else if (isPy == "H") {
			isPy = 8;
		}else if (isPy == "I") {
			isPy = 9;
		}else if (isPy == "J") {
			isPy = 10;
		}else if (isPy == "K") {
			isPy = 11;
		}else if (isPy == "L") {
			isPy = 12;
		}else if (isPy == "M") {
			isPy = 13;
		}else if (isPy == "N") {
			isPy = 14;
		}else if (isPy == "O") {
			isPy = 15;
		}else if (isPy == "P") {
			isPy = 16;
		}else if (isPy == "Q") {
			isPy = 17;
		}else if (isPy == "R") {
			isPy = 18;
		}else if (isPy == "S") {
			isPy = 19;
		}else if (isPy == "T") {
			isPy = 20;
		}else if (isPy == "U") {
			isPy = 21;
		}else if (isPy == "V") {
			isPy = 22;
		}else if (isPy == "W") {
			isPy = 23;
		}else if (isPy == "X") {
			isPy = 24;
		}else if (isPy == "Y") {
			isPy = 25;
		}else if (isPy == "Z") {
			isPy = 26;
		}
		$(".brandZong ul").eq(isPy-1).show();
		$(".brandZong ul").eq(isPy-1).append("<li class='brandInfo'><img src='"+isIcon+"'><span>"+isName+"</span><P style='display:none;' class='brandid'>"+brandId+"</P></li>");
	}

	//选择品牌事件
	function judegBrand () {
		$(".brandZong li").click(function () {
			var i = $(".brandZong li").index(this);
			var thisBrand = $(".brandid").eq(i).html();
			window.open("mcb-wap-carss.html?choice="+thisBrand,"_self");
		});
	}


	//返回上层事件
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});
		






});