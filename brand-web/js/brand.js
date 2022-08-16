$(document).ready(function(){

$("#fullpage").fullpage();

$(window).on("scroll mousewheel",function(event){
		/*마우스휠 감지코드*/
		var E = event.originalEvent;
		var delta = E.wheelDelta;

		if(delta == -120){ //휠을 내리는 상태
			$(".section.active").find(".section3-txt").addClass("on");
		}
		
	}

});