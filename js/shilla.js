$(document).ready(function(){

//모바일메뉴
$("#btn").on("click",function(){
	$(this).toggleClass("change");
	$("#mb-effect").not($(this)).addClass("on");
});

$("#mb-menu>li>a").on("click",function(){
	if($(this).hasClass("open")==true) {
		$(this).siblings(".mb-submenu").stop().slideUp(300);
		$(this).removeClass("open");
	}else{
		$(".mb-submenu").stop().slideUp(300);
		$(this).siblings(".mb-submenu").stop().slideDown(350);
		$("#mb-menu>li>a").removeClass("open");
		$(this).addClass("open");
	}
});

	//#mbmenu-open을 클릭시 #gnb-wrap을 토글시킴
	var i=0;
	document.getElementById("btn").onclick=function(){
		if(i%2==0){
			document.getElementById("mb-menu").style.display="block";
			$("#mb-logo").hide();
		}else{
			document.getElementById("mb-menu").style.display="none";
			$("#mb-effect").not($(this)).removeClass("on");
			$("#mb-logo").show();
		}
		i++;
	}

//banner
var startPos = $("#banner").offset().top

$(window).on("scroll",function(){
	var scrollPos = $("html").scrollTop();
	var newPos = scrollPos + startPos;

// 만약 일정위치 이상 스크롤하면 위치고정한다
if(newPos >= 5600){
	newPos = 5600;
}

$("#banner").animate({
	top:newPos
},10,"swing");
});

//mousewheel
$(window).on("scroll mousewheel",function(event){
	var E = event.originalEvent;
	var delta = E.wheelDelta;

	if(delta == -120){ //휠을 내리는 상태
		$("header").hide();
	}

	if(delta == 120){ //휠을 올리는 상태
		$("header").show();
	}
	
});

/*
$(window).resize(function (){
	// width값을 가져오기
	var width_size = window.outerWidth;
	
	// 800 이하인지 if문으로 확인
	if (width_size <= 700) {
	  //alert('현재 브라우저 크기가 <= 800px');
	  $(window).on("resize",function(){
	  	$('.contents')
	  });
	}
  })
*/



//special offer 슬라이드
$(".next_btn").on("click",function(){
	$("#offer_box_wrap").animate({ //ul에 이동포지션 지정
			left:"-497px"
		},{
			complete:function(){ //이동 애니메이션 후에
			var $clone=$(".offer_box").first().clone();
			$("#offer_box_wrap").append($clone);
			$(".offer_box").first().remove();
			$("#offer_box_wrap").css({"left":"0px"}); //ul의 위치 원상복귀
			},
			duration:1000
		});
	});
	
	$(".prev_btn").on("click",function(){
	$("#offer_box_wrap").css({"left":"-497px"});
	$("#offer_box_wrap").stop().animate({
		left:"0px"
		},{
			start:function(){
				var $clone=$(".offer_box").last().clone();
				$("#offer_box_wrap").prepend($clone);
				$(".offer_box").last().remove();
			}
			,duration:1000
		});
	
	});

//facilities 갤러리
$(".thumbs img").first().addClass("choice");

$(".thumbs img").on("mouseover",function(){
	var imgSrc = $(this).attr("src");
	//alert(imgSrc);
	$(".view_box img").attr("src",imgSrc);

	$(".view_box")
	.css("opacity","0.5")
	.stop()
	.animate({
		opacity:"1"
	},1000);

	$(".thumbs img").removeClass("choice");
	$(this).addClass("choice");
});

$(".thumbs img").on("mouseover",function(){
	$(".thumbs img").not($(this)).addClass("on");
});
$(".thumbs img").on("mouseout",function(){
	$(".thumbs img").not($(this)).removeClass("on");
});

//더보기
$(".more-btn").on("click",function(){
	let status = $(".hide").css("display");
	if (status == "block"){
		$(".more-btn p").css("transform", "rotate(45deg)");
		$(".thumbs").css("height", "700px");

	}else{
		$(".more-btn p").css("transform", "rotate(45deg)");
		$(".thumbs").css("height", "0px");
	}
});

//tab
$(".content").hide();
$(".content").first().show();
$(".tabs li").first().addClass("select");

$(".tabs li").on("click",function(){
	var idx = $(this).index();
	$(".content").hide();
	$(".content").eq(idx).show();
	$(".tabs li").removeClass("select");
	$(this).addClass("select");
});

$(".content img").on("mouseover",function(){
	$(".content img").not($(this)).addClass("on"); 
});
$(".content img").on("mouseout",function(){
	$(".content img").not($(this)).removeClass("on");
});

$(".pool").on("click",function(){
	$(".tab_active").animate({
		left:'0px'
	});
});
$(".bs").on("click",function(){
	$(".tab_active").animate({
		left:'110px'
	});
});
$(".fn").on("click",function(){
	$(".tab_active").animate({
		left:'225px'
	});
});
$(".hall").on("click",function(){
	$(".tab_active").animate({
		left:'340px'
	});
});


//dining slide
var timer = setInterval(fnSlide, 1500);
function fnSlide() {
  $(".foods").animate({ "margin-left": "-470px" }, 1000, function () {
    $(".foods").css({ "margin-left": "0px" });
    $(".food_box:first-child").insertAfter(".food_box:last-child");
  });
};

//dining drag
var $target = $(".foods");
var fx = 0;
var winWidth = $(window).innerWidth();
//alert(winWidth);

$target.on("mousedown",function(){
	var offset = $(this).offset();
	fx = event.pageX - offset.left;
	fnMouseMove();
});

function fnMouseMove(){
	$("html").on("mousemove",function(){
		event.preventDefault();
		var newX = event.pageX - fx;

		var maxLeft = $target.width() - winWidth;
		if(newX < -maxLeft){
			newX = -maxLeft;
		}

		if(newX > 0){
			newX=0;
		}
		$target.css({
			left:newX
		});
	});

	$("html").on("mouseup",function(){
		$(this).off();
	});
}

$(window).on("resize",function(){
	winWidth = $(window).innerWidth();
	$(".foods").css({
		"left":"0px"
	});
});

$(".food_box").on("mouseover",function(){
	clearInterval(timer);
});

$(".food_box").on("mouseout",function(){
	timer = setInterval(fnSlide,1500);
});




//scroll effect
$(window).on("scroll",function(){
	$("#info").text($("html").scrollTop());

	var pos = $("html").scrollTop();

	$("header")[pos>=1000 ? "addClass" : "removeClass"]("on");

	//facilities
	$(".contents")[pos>=1200 ? "addClass" : "removeClass"]("on");

	//membership
	$(".reward")[pos>=3400 ? "addClass" : "removeClass"]("on");
	$(".point")[pos>=3600 ? "addClass" : "removeClass"]("on");
	$(".card")[pos>=3500 ? "addClass" : "removeClass"]("on");
	$(".star")[pos>=3700 ? "addClass" : "removeClass"]("on");

	$("#banner")[pos>=1200 ? "addClass" : "removeClass"]("on");

});

//email
$('button').click(function(){
	email = $('input').val();

	var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

	if(regEmail.test(email)){
		$('.email p').text("구독을 축하드립니다!");
	   } else{     
		$('.email p').text("* 이메일 형식을 올바르게 입력해주세요.");
	   }
})



});