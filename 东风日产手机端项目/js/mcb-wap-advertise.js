$(document).ready(function() {
	
	//返回
	$(".cars_head_left").click(function () {
		window.history.back(-1);
	});

	var currentImg = localStorage.getItem("advertuseImg");
	if (currentImg && currentImg != "") {
		$(".advertiseMain").append("<img src='"+currentImg+"'>");
	}

	var activeUrlArr = new Array();

	var queryAdvertise = new AV.Query("Advertisement");
	queryAdvertise.equalTo("type",1);
	queryAdvertise.equalTo("isShowWap",true);
	queryAdvertise.find().then(function (isAdvertise) {
		for (var i = 0; i < isAdvertise.length; i++) {
			var advertisePhoto = isAdvertise[i].get("photo").url();
			$(".advertiseMain").append("<img src='"+advertisePhoto+"'>");
			activeUrlArr[i] = isAdvertise[i].get("url");
		}
		comeAdvertise();
	},function () {
		console.log("获取活动失败");
	});

	function comeAdvertise () {
		$(".advertiseMain img").click(function () {
			var i = $(".advertiseMain img").index(this);
			window.open(activeUrlArr[i],"_self");
		});
	}





});