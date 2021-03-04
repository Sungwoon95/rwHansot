$(window).load(function(){
  mainNav();  
  headerScroll();
  mobileBtn();
  mobileNav();
  visualSlider();
  playBtn();

  $(window).resize(function(){
    playBtn();
})
})

function mainNav(){


    $(".subList, div.gnbBg").slideUp(0)

    $(".gnb > ul > li > a").on("mouseenter focus",onMenu);
    $(".gnb").on("mouseleave",hideMenu);

    $(".gnb > ul > li > a").first().keydown(function(e){
        //메인메뉴에서 쉬프트 탭시 사라지게 처리
        if(e.keyCode == 9){
            if(!e.shiftKey){
                //탭키를 누른 곳에서 같이 누를 키
                $(".subList , .gnbBg").stop().slideUp(300);
                $(".gnb > .list > li").removeClass("on");
            }
        }
    })

    $(".subList").children().last().find("a").keydown(function(e){
        if(!e.keyCode == 9){
            if(e.shiftKey){
                $(".subList , .gnbBg").stop().slideUp(300);
                $(".gnb > .list > li").removeClass("on");
            }
        }
    })

    function onMenu(){
        $(".subList, .gnbBg").stop().slideDown(300);
        $(".gnb > .list > li").removeClass("on");
        $(this).parent().addClass("on");
    }
    function hideMenu(){
        $(".subList , .gnbBg").stop().slideUp(300);
        $(".gnb > .list > li").removeClass("on");

    }
}

function headerScroll(){
    $(window).on("scroll",onScroll)

    function onScroll(){
        var headerTop = $(window).scrollTop();
        var headerWidth = $(window).outerWidth();

        if(headerTop > 100 && headerWidth >= 1024){
            $("header").addClass("on");
        }else{
            $("header").removeClass("on");
        }
    }
}

function mobileBtn(){
    var isOpen = false;
    $(".mobGnb").css({"opacity":0,"top":"-100%"})
    $(".htopNav").css({"top":"-100%"})

    $(".mobileBtn").on("click",openMenu)
    function openMenu(){
        if(isOpen == false){
            $(".line02").stop().addClass("on");
            setTimeout(function(){
                $(".line01").stop().addClass("on");
                $(".line03").stop().addClass("on");
            },300)

            setTimeout(function(){
                $(".mobileBtn a").addClass("on");
            },500)

            $(".mobGnb").stop().animate({"opacity":1,"top":0},300,"easeOutCubic");
            $(".htopNav").stop().animate({"top":"6rem"},300,"easeOutCubic");

            $("body").css({"overflow":"hidden"});

            isOpen = true;
            return false;
        }else if(isOpen == true){
            $(".mobileBtn a").removeClass("on")
            $(".line01").stop().removeClass("on");
            $(".line02").stop().removeClass("on");
            $(".line03").stop().removeClass("on");

            $(".mobGnb").stop().animate({"opacity":0, "top":"-100%"},500,"easeOutCubic");
            $(".htopNav").stop().animate({"top":"-100%"},300,"easeOutCubic",function(){
                $(".mobGnb .subList").slideUp(0);
                $(".mobGnb > ul > li").removeClass("on");
            });
            
            $("body").css({"overflow":"scroll"});
            isOpen = false;
            return false;

        }
    }
}

function mobileNav(){
    $(".mobGnb .subList").slideUp(0);
    
    $(".mobGnb > ul > li > a").on("click",onSubMenu);

    function onSubMenu(){

        var openMenu = $(this).next().is(":hidden") //상태 체크

        $(".mobGnb > ul > li").removeClass("on");
        $(this).parent().addClass("on");

        if(openMenu){
            $(".mobGnb .subList").slideUp(0);
            $(this).next().slideDown(200);

            isOpen = true;
        }else{
            $(".mobGnb .subList").slideUp(200);
            
        }
    }
}

function visualSlider(){
    var isPlay = true;

    $(".visualSlider").slick({
        infinite : true, 	//무한 반복 옵션	 
				slidesToShow : 1,		// 한 화면에 보여질 컨텐츠 개수
				slidesToScroll : 1,		//스크롤 한번에 움직일 컨텐츠 개수
				speed : 100,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
				arrows : false, 		// 옆으로 이동하는 화살표 표시 여부
				dots : true, 		// 스크롤바 아래 점으로 페이지네이션 여부
				autoplay : true	 // 자동재생
    })
    $(".pauseBtn").on("click", onMove);
    function onMove(){
        if(isPlay == true){
            $(".visualSlider").slick("slickPause")
            $(".pauseBtn").addClass("on")
            isPlay = false;
        }else if(isPlay == false){
            $(".visualSlider").slick("slickPause")
            $(".pauseBtn").removeClass("on")
            isPlay = true;
        }
        return false;
    }

}
function playBtn(){
    
    var $btnMargin = $(".slick-dots").children().size()*$(".slick-dots").children().outerWidth();
    var $windowMargin = $(".slick-dots").offset().left;

    $(".pauseBtn").css({"left":$windowMargin + $btnMargin});

}