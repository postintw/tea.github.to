
//  DOM 載入完成後執行
$(function () {
    // 點擊按鈕，頁面滑到最上方
    $(".pagetop").on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 750);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $("nav").addClass("upup");
            // $(".hamburger>div").css("background", "black");
            $(".menu a").css("color", "#17581e");
        } else {
            $("nav").removeClass("upup");
            $('nav').css("color", "transparent");
            $(".menu a").css("color", "white");
            // $(".hamburger>div").css("background", "white");
        }
    });


});

$(window).on("DOMContentLoaded", function () {
    parallaxInstance = new Parallax(document.getElementById("index_background"), {
    });
});


