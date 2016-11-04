	

	//点击外观色更换样式
	function changeOutc () {
		$(".mcb_wrap").hide();
		$(".blockCar").hide();
		$(".neif").hide();
		$(".waif").show();
		$(".waig").css("background-color","#FF9900");
		$(".neis").css("background-color","#000");
		$(".colorBlock").show();
	}

	//点击内饰色更换样式
	function changeInc () {
		$(".mcb_wrap").hide();
		$(".blockCar").hide();
		$(".waif").hide();
		$(".neif").show();
		$(".neis").css("background-color","#FF9900");
		$(".waig").css("background-color","#000");
		$(".colorBlock").show();
	}

	//关闭颜色列表
	function onColor () {
		$(".mcb_wrap").show();
		$(".blockCar").show();
		$(".waif").hide();
		$(".neif").show();
		$(".colorBlock").hide();
	}

	//获取所有颜色
	function wcolor (colorRelation,wcobj,callBack) {
		colorRelation.query().find().then(function (iscolor) {
			wcobj = iscolor;
			for (var i = 0; i < iscolor.length; i++) {
				var isName = iscolor[i].get("color_name");
				var isRbg = iscolor[i].get("color_rgb");
				if (isRbg == ",," || !isRbg) {
					isRbg = iscolor[i].get("color_string");
				}
				callBack(isName,getColor(isRbg),i,wcobj);
			}
		},function () {
			console.log("查询颜色失败");
		});
	}
