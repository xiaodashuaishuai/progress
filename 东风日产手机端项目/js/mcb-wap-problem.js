$(document).ready(function() {
	
	showProcress();

	//返回
	$(".problemHeadOut").click(function () {
		window.history.back(-1);
	});

	$(".problemHeadIn").click(function () {
		$(".problemOutHead").show();
		$(".problemInner").hide();
	});

	var problemWrapArr = new Array();
	var problemTitleArr = new Array();

	//获取常见问题
	var queryProblem = new AV.Query("Problems");
	queryProblem.ascending("row");
	queryProblem.find().then(function (isProblem) {
		for (var i = 0; i < isProblem.length; i++) {
			var problemsIcon = isProblem[i].get("icon").url();
			var problemsPhoto = isProblem[i].get("photo").url();
			var problemsTitle = isProblem[i].get("title");
			problemTitleArr[i] = problemsTitle;
			problemWrapArr[i] = problemsPhoto;
			$(".problemWrap").append("<li><div class='problemIn'><img src='"+problemsIcon+"' class='problemImg'><div class='problemTitle'>"+problemsTitle+"</div></div></li>");
			if (i == isProblem.length-1) {
				for (var x = 1; x < i; x+=2) {
					$(".problemWrap li").eq(x).css("border-right","none");
				}
			}
		}
		problemMain();
		hiddenProcess();
	},function () {
		console.log("获取常见问题失败");
		hiddenProcess();
	});

	//问题详情
	function problemMain () {
		$(".problemWrap li").click(function () {
			showProcress();
			var i = $(".problemWrap li").index(this);
			$(".problemMainPhoto").html("");
			$(".aatitle").html(problemTitleArr[i]);
			$(".problemMainPhoto").append("<img src='"+problemWrapArr[i]+"'>");
			$(".problemOutHead").hide();
			$(".problemInner").show();
			
			setTimeout(function () {
				hiddenProcess();
			},800);
			
		});
	}





















});