function code_randomColor() {
	//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}
function code_draw() {
	var canvas_width = $("#canvas").width();
	var canvas_height = $("#canvas").height();
	var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
	var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
	canvas.width =
		document.documentElement.clientWidth > 750
			? canvas_width
			: canvas_width * 1.5;
	canvas.height = canvas_height;
	var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0"; //取值范围
	var aCode = sCode.split(",");
	var aLength = aCode.length; //获取到数组的长度
	var value = [];
	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
		var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
		var txt = aCode[j]; //得到随机的一个内容
		value[i] = txt.toLowerCase();
		var x = 10 + i * 20; //文字在canvas上的x坐标
		var y = canvas_height / 2 + Math.random() * 8; //文字在canvas上的y坐标
		context.font = "bold 20px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = code_randomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	// 将生成的值以属性的方法添加到元素
	value = value.join("");
	$("#canvas").attr("data-code", value);
	//验证码上显示线条
	for (var i = 0; i <= 5; i++) {
		context.strokeStyle = code_randomColor();
		context.beginPath();
		context.moveTo(
			Math.random() * canvas_width,
			Math.random() * canvas_height
		);
		context.lineTo(
			Math.random() * canvas_width,
			Math.random() * canvas_height
		);
		context.stroke();
	}
	//验证码上显示小点
	for (var i = 0; i <= 30; i++) {
		context.strokeStyle = code_randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}

// 回到顶部功能
$(document).on("click", "[back-btn]", function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: 0,
		},
		600
	);
	return false;
});

// 复制到粘贴板功能
function copyText(str) {
	$("#copy").val(str).show();

	var ele = document.getElementById("copy");
	ele.select();
	document.execCommand("copy", false, null);
	$("#copy").hide();
}
//  // 复制到粘贴板
$(document).on("click", '[data-btn="copy"]', function () {
	layer.msg("联系方式已复制到粘贴板", {
		time: 2000,
	});
	var str = $(this).attr("data-text");
	copyText(str);
});

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数

//发送验证码
function mail() {
	curCount = count;
	var email = $('[name="phone"]').val();
	layer.msg("验证码已发送");
	document.getElementById("btnSendCode").setAttribute("disabled", "true"); //设置按钮为禁用状态
	$("#btnSendCode").addClass("layui-btn-disabled");
	$("#btnSendCode").text("剩余" + curCount + "s");
	InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行一次
	$.ajax({
		url: "",
		data: {},
		type: "Post",
		dataType: "json",
		success: function (data) { },
		error: function (data) {
			$.messager.alert("错误", data.msg);
		},
	});
}

//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {
		$("#btnSendCode").removeClass("layui-btn-disabled");
		$("#btnSendCode").text("重获验证码");
		window.clearInterval(InterValObj); // 停止计时器
		document.getElementById("btnSendCode").removeAttribute("disabled"); //移除禁用状态改为可用
	} else {
		curCount--;
		$("#btnSendCode").text(curCount + "秒后重获");
	}
}

var docWidth1 = document.documentElement.clientWidth > 750;
(function () {
	$("[data-load]").each(function () {
		$(this).load($(this).attr("data-load") + ".html");
	});

	// var docWidth = document.documentElement.clientWidth > 750;
	// var deviceWidth =
	// 	document.documentElement.clientWidth > 750
	// 		? 750
	// 		: document.documentElement.clientWidth;
	// document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
	// $(window).resize(function () {
	// 	var deviceWidth =
	// 		document.documentElement.clientWidth > 750
	// 			? 750
	// 			: document.documentElement.clientWidth;
	// 	document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
	// });
	$(document)
		.on("click", ".site-tree-mobile", function () {
			$("body").addClass("site-mobile");
		})
		.on("click", ".site-mobile-shade", function () {
			$("body").removeClass("site-mobile");
		});

	// // 计算input字数
	$(document).on(
		"input",
		'[data-box="input-number"] input,[data-box="input-number"] textarea',
		function (e) {
			$(this)
				.closest('[data-box="input-number"]')
				.find("[data-input-num]")
				.text(e.srcElement.value.length);
		}
	);

	var wow = new WOW({
		boxClass: "wow",
		animateClass: "animate__animated",
		offset: 0,
		mobile: true,
		live: true,
	});
	wow.init();

	$(document).scroll(function () {
		var scroH = $(document).scrollTop();
		if (scroH > 1) {
			$("header").addClass("bgcolor");
		} else {
			$("header").removeClass("bgcolor");
		}
	});

	$(document).on("click", ".active_ul .item", function () {
		if ($(this).closest(".active_ul").hasClass("more")) {
			$(this).toggleClass("active");
			return;
		}

		$(this).closest(".active_ul").find(".active").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on(
		"click",
		'[data-tab][data-block="title"] .item',
		function () {
			var tabname = $(this).closest("[data-tab]").attr("data-tab");

			var index = $(this).index();
			$content = $(document).find(
				"[data-tab=" + tabname + '][data-block="content"]'
			);

			$content.each(function () {
				$(this).children().removeClass("layui-show");
				$(this).children().eq(index).addClass("layui-show");
			});
		}
	);
})();

