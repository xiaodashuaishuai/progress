$(document).ready(function () {

	showProcress();

	var nologin = false;
	var dlrid = "";
	var is_user_icon_url;

	//保存当前登录用户
	var currentUser = AV.User.current();
	if (currentUser) {
		nologin = true;
		//console.log("保存");
		$(".cars_head_right").hide();
		$(".userIcon").show();
		dlrid = currentUser.id;
		var is_user_name = currentUser.get("username");
		var is_user_icon = currentUser.get("userIcon");
		if (is_user_icon == "" || !is_user_icon) {
			is_user_icon_url = "http://ac-az6m919b.clouddn.com/6a6b0969de652ffc.jpg";
		}else{
			is_user_icon_url = is_user_icon.url();
		}
		$(".mcb_head_username").html(is_user_name);
		$(".userIcon").append("<img src='"+is_user_icon_url+"'>");
		fn_administration();
	}else {
		//console.log("还没登录");
		$(".burger").css("zIndex",-1);
	};

	//账号管理点击事件
	function fn_administration () {

		//我的订单事件
		$(".mcb_head_block_myorder").click(function () {
			window.open("html/mcb-wap-myorder.html","_self");
			return false;
		})

		//设定事件
		$(".mcb_head_block_cancellation").click(function () {
			window.open("html/mcb-wap-setting.html","_self");
			return false;
		});

		//修改密码事件
		$(".mcb_head_block_modify").click(function () {
			window.open("html/mcb-wap-personal.html?id="+dlrid,"_self");
			return false;
		});

		//常见问题
		$(".mcb_head_problem").click(function () {
			window.open("html/mcb-wap-problom.html","_self");
			return false;
		});

	};

	//点击登录事件
	$(".cars_head_right").on("click",loging);
		

	//点击海外订车跳转事件
	$(".mcb_bycar").click(function () {
		localStorage.setItem("carType","0");
		window.open("html/mcb-wap-brand.html","_self");
	});
	$(".overAllIn").click(function () {
		localStorage.setItem("carType","0");
		window.open("html/mcb-wap-brand.html","_self");
	});

	//点击平行进口转事件
	$(".mcb_community").click(function () {
		localStorage.setItem("carType","2");
		window.open("html/mcb-wap-brand.html","_self");
	});

	//4S跳转事件
	$(".mcb_advantage").click(function () {
		localStorage.setItem("carType","1");
		window.open("html/mcb-wap-brand.html","_self");
	});

	//特价跳转事件
	$(".mcb_security").click(function () {
		localStorage.setItem("carType","3");
		window.open("html/mcb-wap-brand.html","_self");
	});

	//点击更多社区跳转社区页面
	$(".community_more").click(function () {
		window.open("html/mcb-wap-community.html","_self");
	});

	//点击关闭app层
	$(".app_gb").click(function () {
		$(".app_block_in_block").hide();
		$(".app_block").hide();
	});

	//点击下载app
	$(".app_btn").click(function () {
		var eventInner = "下载app";
		var attrJ = "渠道";
		var attrV = "wap";
		Fun_SubmitData(eventInner,attrJ,attrV);

		if (isWeiXin()) {
			$("html,body").animate({scrollTop:'0'},function () {
				$(".hint_share_out").show();
				$(".hint_share").show();
			});

			$(".hint_share_out").click(function () {
				$(".hint_share_out").hide();
				$(".hint_share").hide();
			});
		}else{
			createIframe();
		}
		
		
	});

	//判断是否为微信
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}

	var loadIframe = null;
	function createIframe () {
		  var iframe = document.createElement("iframe");
		    iframe.style.cssText = "display:none;width:0px;height:0px;";
		    document.body.appendChild(iframe);
		    loadIframe = iframe;
		    redirect(loadIframe);
	}

	function redirect (loadIframe) {
	  loadIframe.src="maicheba";
	  var t = Date.now();
	  setTimeout(function(){
	    if(Date.now()-t < 600){
	      location.href="https://appsto.re/cn/WOe59.i";
	    }
	  },500)
	}



	//获取热门帖子
	var Fourm = AV.Object.extend("Fourm");
	query_fourm = new AV.Query(Fourm);
	query_fourm.descending("updatedAt");
	query_fourm.limit(5);
	query_fourm.include("user");
	query_fourm.find({
		success:function (this_fourm) {	
			for (var i = 0; i < this_fourm.length; i++) {
				var fourm_id = this_fourm[i].id;
				var fourm_username = this_fourm[i].get("user").get("username");
				var file = this_fourm[i].get("user").get("userIcon");
				var userIcon;
				
				if (file) {
					userIcon = file.url();
				}else{
					var config = new createConfig();
					userIcon =   config.defautIcon;
				}
				var fourm_title = this_fourm[i].get("title");
				// console.log(fourm_id,fourm_username,fourm_title);
				$(".wrap_comment_info").append("<li><div class='postLeft'></div><img class='postImg' src="+userIcon+"><a class='postTitle'>"+fourm_username+":"+fourm_title+"</a><span class='this_fourmid' style='display:none;'>"+fourm_id+"</span></li>");
				click_fourm();
			};
		},error:function () {
			console.log("获取帖子失败");
		}
	});

	function click_fourm () {	
		//论坛内容
		$(".wrap_comment_info li").click(function () {
			var i = $(".wrap_comment_info li").index(this);
			var this_fourmid = $(".wrap_comment_info .this_fourmid").eq(i).html();
			// console.log(this_fourmid);
			window.open("html/mcb-wap-share.html?id="+this_fourmid,"_self");
		});
		
	}

	//获取大炮点评
	var query_dapao_fourm = new AV.Query(Fourm);
	query_dapao_fourm.equalTo("group_id","56024a8760b27db45a6c0cae");
	query_dapao_fourm.limit(5);
	query_dapao_fourm.descending("createdAt");
	query_dapao_fourm.find({
		success:function (is_calss) {
			for (var i = 0; i < is_calss.length; i++) {
				var is_title = is_calss[i].get("title");
				var is_images = is_calss[i].get("images");
				is_images ? is_images = is_images.split(",")[0] : is_images = "";
				var is_id = is_calss[i].id;
				if (is_images != "") {
					$(".wrap_comment_showpic_ul").append("<li class='swiper-slide' style='width:610px;float:left;'><img class='dapao' src='"+is_images+"'><h5><a class='dapao_title' href='###' style='text-decoration: none; color:#fff;padding-left:5px;'>【大炮评车】"+is_title+"</a><span class='dapaoid' style='display:none;'>"+is_id+"</span></h5></li>");
				}
			};
			$(".wrap_comment_showpic li").click(function () {
				var i = $(".wrap_comment_showpic li").index(this);
				var this_fourmid = $(".wrap_comment_showpic span").eq(i).html();
				window.open("html/mcb-wap-share.html?id="+this_fourmid,"_self");
			});
			hiddenProcess();
			
			//swiper2
			var swiper2 = new Swiper('.swiper2', {
				pagination: '.swiper-pagination2',
			        nextButton: '.swiper-button-next',
			        prevButton: '.swiper-button-prev',
			        paginationClickable: true,
			        centeredSlides: true,
			        autoplay: 3000,
			        autoplayDisableOnInteraction: false
			        
		    });
		},error:function () {
			console.log("获取帖子失败");
			hiddenProcess();
		}
	});


	//进入论坛
	$(".commentMore").click(function () {
		window.open("html/mcb-wap-community.html","_self");
	});


	//获取热门车款
	var Brand = AV.Object.extend("Brand");
	query_brand = new AV.Query(Brand);
	query_brand.equalTo("isHot",true);
	query_brand.limit(11);
	query_brand.find({
		success:function (is_brand) {
			for (var i = 0; i < is_brand.length; i++) {
				var it_btand = is_brand[i].get("brand");
				var it_btand_id = is_brand[i].id;
				// console.log(it_btand_id);
				$(".wrap_choice").append("<li>"+it_btand+"<span>"+it_btand_id+"</span></li>");
			};
			localStorage.setItem("carType","4");
			$(".wrap_choice").append("<li>全部<span>0</span></li>");
			point_brand();
		},error:function () {
			console.log("获取品牌失败");
		}
	});

	//点击品牌跳转事件
	function point_brand () {
		$(".wrap_choice li").click(function () {
			var i = $(".wrap_choice li").index(this);
			var this_brand = $(".wrap_choice span").eq(i).html();
			if (this_brand == 0) {
				window.open("html/mcb-wap-brand.html","_self");
			}else{
				window.open("html/mcb-wap-carss.html?choice="+this_brand,"_self");
			}
		});
	}

	//进入页面判断打开端口是苹果还是安卓
	fn_judge_window();
	function fn_judge_window () {
		var browser = {
			versions: function () {
				var u = navigator.userAgent, app = navigator.appVersion;
				return { //移动终端浏览器版本信息 
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
					iPad: u.indexOf('iPad') > -1, //是否iPad 
				};
			}(),
		}
		//苹果
		/*if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			// alert("苹果手机");
			$(".app_block_in_block").show();
			$(".app_block").show();
		}*/
		//安卓
		if (browser.versions.android) {
			// alert("安卓手机");
			$(".app_block_in_block").hide();
			$(".app_block").hide();
			$(".cars_head").css("margin-top","0");
		}
	}


	//获取活动内容
	var Advertisement = AV.Object.extend("Advertisement");
	var query_advertise = new AV.Query(Advertisement);
	query_advertise.equalTo("isShowWap",true);
	query_advertise.equalTo("type",0);
	query_advertise.find({
		success:function (is_advertise) {
			for (var i = 0; i < is_advertise.length; i++) {
				var this_ad_url = is_advertise[i].get("url");
				if (this_ad_url == "" || !this_ad_url) {
					this_ad_url = is_advertise[i].get("bigIcon");
					if (this_ad_url) {
						this_ad_url = is_advertise[i].get("bigIcon").url();
					}
				}
				var this_adp = is_advertise[i].get("photo");
				var this_adp_url = this_adp.url();
				$(".wap_advertisement").append("<li class='swiper-slide'><img src='"+this_adp_url+"'><i style='display:none;'>"+this_ad_url+"</i></li>");
			};
		       var swiper1 = new Swiper('.swiper1', {
		        pagination: '.swiper-pagination1',
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        paginationClickable: true,
		        centeredSlides: true,
		        autoplay: 2500,
		        autoplayDisableOnInteraction: false
		    });
		    $(".wap_advertisement li").click(function () {
		    	$(".mcb_toz").hide();
				$(".mcb_tox").hide();
		    	var ai = $(".wap_advertisement li").index(this);
		    	var open_url = $(".wap_advertisement i").eq(ai).html();
		    	// console.log(open_url);
		    	localStorage.setItem("advertuseImg",open_url);
		    	window.open("advertise/mcb-wap-advertise.html","_self");
		    })
		},error:function () {
			console.log("获取活动内容失败");
		}
	});

	var hotCarsPrceArr = new Array();

	//获取热门车系
	var hotCars_phone_url,priceLeft,priceRight,hotCarsId;
	var hotCars = new AV.Query("Cars");
	hotCars.equalTo("isHot",true);
	hotCars.limit(8);
	hotCars.descending("createdAt");
	hotCars.include("brand");
	hotCars.find({
		success:function (ishotCars) {
			// console.log(ishotCars.length);
			for (var i = 0; i < ishotCars.length; i++) {
				var hotCars_phone = ishotCars[i].get("photo");
				if (!hotCars_phone) {
					hotCars_phone_url = "";
				}else{
					hotCars_phone_url = hotCars_phone.url();
				}

				var hotCars_name = ishotCars[i].get("cars");
				var hotCarsBrand_name = ishotCars[i].get("brand").get("brand");

				var nowPrice = ishotCars[i].get("now_price_range");
				var overPrice = ishotCars[i].get("overseas_price_range");
				var storePrice = ishotCars[i].get("store_price_range");
				var salesPrice = ishotCars[i].get("sales_price_range");

				

				if (nowPrice != "undefined" && nowPrice) {
					hotCarsPrceArr.push(nowPrice.split("~"));
				}

				if (overPrice != "undefined"  && overPrice) {
					hotCarsPrceArr.push(overPrice.split("~"));
				}

				if (storePrice != "undefined"  && storePrice) {
					hotCarsPrceArr.push(storePrice.split("~"));
				}

				if (salesPrice != "undefined"  && salesPrice) {
					hotCarsPrceArr.push(salesPrice.split("~"));
				}

				hotCarsId = ishotCars[i].id;

				$(".carsIds").eq(i).html(hotCarsId);
				$(".carsOnly_phone").eq(i).attr("src",hotCars_phone_url);
				$(".carsOnly_title").eq(i).html(hotCarsBrand_name+" "+hotCars_name);

				
				var newPriceArr = hotCarsPrceArr.join(",").split(",");
				var priceRight = Math.max.apply(null,newPriceArr);
				var priceLeft = Math.min.apply(null,newPriceArr);

				// console.log(hotCarsPrceArr);

				newPriceArr = [];
				hotCarsPrceArr = [];

				$(".carsOnly_price").eq(i).html("价格区间:"+changeTwoDecimal(priceLeft)+"~"+changeTwoDecimal(priceRight)+"万");
				


			}

			XZcars();

		},error:function () {
			alert("获取热门车系失败");
		}
	});

	//选择热门车系事件
	function XZcars () {
		$(".caList_only").click(function () {
			var i = $(".caList_only").index(this);
			var casId = $(".carsIds").eq(i).html();
			window.open("html/mcb-wap-carr.html?id="+casId,"_self");
		});
	}

	//获取热门摩托
	var hotCars = new AV.Query("Cars");
	hotCars.limit(8);
	hotCars.find({
		success:function (ishotCars) {
			for (var i = 0; i < ishotCars.length; i++) {
				var hotCars_phone = ishotCars[i].get("cover");
				var hotCars_phone_url = hotCars_phone.url();
				var hotCars_name = ishotCars[i].get("cars");
				var hotCars_price = ishotCars[i].get("price");
				$(".motoOnly_phone").eq(i).attr("src",hotCars_phone_url);
				$(".motoOnly_title").eq(i).html(hotCars_name);
				$(".motoOnly_price").eq(i).html("￥"+hotCars_price/10000);
			}
		},error:function () {
			
		}
	});

	//获取热门活动
	var activeArr = new Array();
	var activeUrlArr = new Array();
	var activeHot = new AV.Query("Advertisement");
	activeHot.equalTo("type",1);
	activeHot.equalTo("isShowWap",true);
	activeHot.find({
		success:function (isActive) {
			for (var i = 0; i < isActive.length; i++) {
				activeArr[i] = isActive[i].get("photo").url();
				activeUrlArr[i] = isActive[i].get("url");
			}
			activeShow(activeArr);
		},error:function () {
			console.log("获取活动内容失败");
		}
	});

	//显示活动
	function activeShow (activeArr) {
		var activeArr_num = activeArr.length;
		// console.log(activeArr_num);
		if (activeArr_num == 0) {
			$(".eventLogo_out").hide();
		}else if (activeArr_num == 2) {
			$(".eventLogo").append("<img style='width:49.84375%;border-right:2px solid #767676;' src='"+activeArr[0]+"'><img style='width:49.84375%;' src='"+activeArr[1]+"'>");
		}else if (activeArr_num == 4) {
			$(".eventLogo").append("<img style='width:49.84375%;border-right:2px solid #767676;border-bottom:2px solid #767676;' src='"+activeArr[0]+"'><img style='width:49.84375%;border-bottom:2px solid #767676;' src='"+activeArr[1]+"'><img style='width:49.84375%;border-right:2px solid #767676;' src='"+activeArr[2]+"'><img style='width:49.84375%;' src='"+activeArr[3]+"'>");
		}else{
			$(".eventLogo_out").hide();
		}
		comeInActive();
	}

	//进入活动详情
	function comeInActive () {
		$(".eventLogo img").click(function () {
			var x = $(".eventLogo img").index(this);
			window.open(activeUrlArr[x],"_self");
		});
	}
	$(".eventMore").click(function () {
		window.open("advertise/mcb-wap-advertise.html","_self");
	});

	//获取海外车
	var overCarObjArrTop = new Array();
	var overCarObjArrBottom = new Array(); 
	var queryOverCar = new AV.Query("OverseasCar");
	queryOverCar.include("cars");
	queryOverCar.include("brand");
	queryOverCar.find().then(function (isOver) {

		if (isOver.length < 6) {
			$(".HWTF").remove();
			return false;
		}

		if (isOver.length >= 6 && isOver.length < 12) {
			overCarObjArrTop = isOver.slice(0,3);
			overCarObjArrBottom = isOver.slice(3,6);
		}

		if (isOver.length >= 12 && isOver.length < 18) {
			overCarObjArrTop = isOver.slice(0,6);
			overCarObjArrBottom = isOver.slice(6,12);
		}

		if (isOver.length >= 18) {
			overCarObjArrTop = isOver.slice(0,9);
			overCarObjArrBottom = isOver.slice(9,18);
		}

		showOverCar(overCarObjArrTop,0);
		showOverCar(overCarObjArrBottom,1);

		
	},function () {
		console.log("获取海外车失败");
	});

	//显示海外车
	function showOverCar (isOver,num) {
		for (var i = 0; i < isOver.length; i++) {
			var overId = isOver[i].id;
			var ovarCarsCover = isOver[i].get("cars").get("photo").url();
			var overCarBrand = isOver[i].get("brand").get("brand");
			var overCarCars = isOver[i].get("cars").get("cars");
			var overCarStyle = judegK(isOver[i].get("style"));
			var overCarPrice = judegK(isOver[i].get("basicPrice"));
			overCarPrice ? overCarPrice = "$ "+overCarPrice : overCarPrice = "";

			$(".overCarUl").eq(num).append("<li><div style='display:none;' class='overCarInt'>"+overId+"</div><img src='"+ovarCarsCover+"'><div class='overCarTtile' style='color:rgb(83,83,83);font-size:14pt;'>"+overCarBrand+overCarCars+overCarStyle+"</div><div class='overCarPrice' style='color:#FF5A00;font-size:12pt;'>"+inciseNum(overCarPrice.toString())+"</div></li>");
			if (i == isOver.length - 1) {
				overCarZ();
				overCarT(0);
				overCarT(1);
			}
		}
	}
		

	//海外车跳转
	function overCarZ () {
		$(".overCarUl li").click(function () {
			var i = $(".overCarUl li").index(this);
			var currentOverCarId = $(".overCarInt").eq(i).html();
			window.open("html/mcb-wap-overseas.html?id="+currentOverCarId,"_self");
		});
	}

	//拖拽1
	function overCarT (num) {

		var overCarLis = document.getElementsByClassName("overCarUl")[1].getElementsByTagName("li").length;
		var outterDom = document.getElementsByClassName("overCarUl")[num];

	    outterDom.addEventListener('touchstart', function(event) {
		    if (event.targetTouches.length == 1) {
       		    var touch = event.targetTouches[0];
                outterDom.style.position = "absolute";
			    span_left = $(this).offset().left;
			    start_left = touch.pageX;
			    var left = parseFloat(touch.pageX - start_left + span_left);
			    outterDom.style.left = String(left) + 'px';
			}
		});
		outterDom.addEventListener('touchmove', function(event) {
		    // event.preventDefault();
		    if (event.targetTouches.length == 1) {
			    var touch = event.targetTouches[0];
			    outterDom.style.position = "absolute";
			    var left = parseFloat(touch.pageX - start_left + span_left);
			    left = left >= 0 ? 0 : left;
			    left = left <= - ((overCarLis-3)*195) ? - ((overCarLis-3)*195) : left;
			    outterDom.style.left = String(left) + 'px';
		    }
	 	});
	}	



	//获取弹出广告

	var TFan = localStorage.getItem("TFan");
	if (TFan != 1) {
		$(".mainBlock").show();
		$(".advertiseBlock").show();
	}

	localStorage.setItem("TFan","1");


	var findAdvertise = new AV.Query("Advertisement");
	findAdvertise.limit(1);
	findAdvertise.equalTo("type",3);
	findAdvertise.find().then(function (isAdvertise) {
		var adScale = isAdvertise[0].get("photoScale");
		var adPhoto = isAdvertise[0].get("photo").url();
		var bodyHeight = $(window).height();
		var photoHeight = 400/adScale;
		$(".advertiseBlock").css("top",(bodyHeight-photoHeight)/2+"px");
		$(".advartiseImg").attr("src",adPhoto);
	},function () {
		console.log("获取弹出广告失败");
	});
	$(".advertiseGB").click(function () {
		$(".mainBlock").remove();
		$(".advertiseBlock").remove();
	});



	//登陆后
    var currentHeight = $(window).height();
	if ('ontouchstart' in window) {
		var click = 'touchstart';
	} else {
		var click = 'click';
	}
	$('div.burger').on(click, function () {
		if (!$(this).hasClass('open')) {
			openMenu();
		} else {
			closeMenu();
		}
	});
	function openMenu() {
		$(".screenBlock").show(0, function () {
			$(".screen").animate({
				marginLeft : "400px"
			}, 200, function () {
				$(".screen").css({
					width : "240px" ,
					height : currentHeight + "px" 
				});
			});
		});
	}
	function closeMenu() {
		$(".screenBlock").hide(0, function () {
			$(".screen").animate({
				marginLeft : 0
			}, 200, function () {
				$(".screen").css({
					width : "640px" ,
					height : "" 
				});
			});
		});
	}
	$(".screenBlock").on("click", closeMenu);


});