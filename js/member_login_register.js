function $id(id){
	return document.getElementById(id);
}	

function getLoginInfo() {
    //取回使用者的登入資訊
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
        if (member.MEM_ID) {
            //如果有登入
            // document.getElementById("MEM_NICKNAME").innerText = member.MEM_NICKNAME;
            document.getElementById("spanLogin").innerText = "登出";
        }
    };
    xhr.open("get", "./php/get_login_info.php", true);
    xhr.send(null);
}

function sendForm() {
    //======================使用Ajax 回server端,取回登入者姓名, 放到頁面上
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //success
            member = JSON.parse(xhr.responseText);
            if (member.MEM_ID) {
                //如果有回傳一個有會員資料的物件, 表示登入成功
                $id("spanLogin").innerText = "登出";
                // $id("memName").innerText = member.memName;
                //將登入表單上的資料清空，並隱藏起來
                // $id("lightBox").style.display = "none";
                $id("MEM_ID").value = "";
                $id("MEM_PW").value = "";
            } else {
                alert("帳密錯誤");
            }
        } else {
            alert(xhr.status);
        }
    };
    xhr.open("post", "./php/login.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    let data_info = `MEM_ID=${$id("MEM_ID").value}&MEM_PW=${$id("MEM_PW").value}`;
    xhr.send(data_info);
}

$(document).ready(function () {
    getLoginInfo();
    console.log(getLoginInfo());
    $(".memicon").click(function () {
        $(".cover").css("display", "block");
        // console.log("hihi");
    });
    //change profile
    $(".profile-pic").click(function () {
        $("#profile_pic_input").trigger("click");
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //animate profile picture
                var profilePicTL = new TimelineMax();
                profilePicTL
                    .set(".profile-pic", {
                        transformOrigin: "50% 50%",
                    })
                    .to(".profile-pic", 2, {
                        transform: "rotate(-15deg)",
                        ease: Elastic.easeOut,
                    })
                    .to(
                        ".profile-pic",
                        0.8,
                        {
                            transform: "translateY(650px) rotate(20deg)",
                            ease: Back.easeIn,
                            onComplete: function () {
                                $(".profile-pic img").attr("src", e.target.result);
                                $(".profile-pic").css("opacity", "0");
                            },
                        },
                        "-=1.2"
                    )
                    .set(".profile-pic", {
                        transform: "translateY(-200px) rotate(0)",
                        transformOrigin: "50% 50%",
                        onComplete: function () {
                            $(".profile-pic").css("opacity", "1");
                        },
                    })
                    .to(".profile-pic", 0.2, {
                        transform: "translateY(0)",
                        opacity: 1,
                        ease: Power2.easeIn,
                    })
                    .set(".profile-pic", {
                        transformOrigin: "50% 100%",
                    })
                    .to(".profile-pic", 0.1, {
                        transform: "scaleX(1.6) scaleY(.3)",
                        ease: Power4.easeOut,
                    })
                    .to(".profile-pic", 0.8, {
                        transform: "scaleX(1) scaleY(1)",
                        opacity: 1,
                        ease: Elastic.easeOut,
                    });
                //animate card
                var cardTL = new TimelineMax();
                cardTL
                    .set(".card", {
                        transformOrigin: "100% 100%",
                    })
                    .to(".card", 0.7, {
                        transform: "rotate(15deg) skew(0)",
                        ease: Back.easeOut,
                    })
                    .to(".card", 0.2, {
                        transform: "rotate(-5deg) skewY(-10deg)",
                        ease: Back.easeIn,
                    })
                    .to(".card", 1, {
                        transform: "rotate(0) skew(0)",
                        ease: Elastic.easeOut,
                    })
                    .set(".card", {
                        transformOrigin: "50% 100%",
                    })
                    .to(
                        ".card",
                        0.2,
                        {
                            transform: "scaleX(1.1) scaleY(.9)",
                            delay: 0.9,
                            ease: Power4.easeIn,
                        },
                        "-=.7"
                    )
                    .to(".card", 0.8, {
                        transform: "scale(1)",
                        ease: Elastic.easeOut,
                    });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#profile_pic_input").change(function () {
        readURL(this);
    });

    //===設定btnLogin.onclick 事件處理程序是 sendForm
    // $id("log-in").onclick = sendForm;

    // $(".close").click(function () {
    //     $(".cover").css("display", "none");
    // });
    $(".cancel").click(function () {
        $(".cover").css("display", "none");
    });

    $("p").on("click", function () {
        $("#login").css("display", "none");
        $("#forget_pw").css("display", "block").fadeIn(600);
        $("#signup").css("display", "none");
        $(".tab-group > li").removeClass("active");
    });

    $(".btn.cancel").on("click", function () {
        $(".cover").css("display", "none");
    });
    $(".form")
        .find("input, textarea")
        .on("keyup blur focus", function (e) {
            var $this = $(this),
                label = $this.prev("label");

            if (e.type === "keyup") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.addClass("active highlight");
                }
            } else if (e.type === "blur") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.removeClass("highlight");
                }
            } else if (e.type === "focus") {
                if ($this.val() === "") {
                    label.removeClass("highlight");
                } else if ($this.val() !== "") {
                    label.addClass("highlight");
                }
            }
        });

    $(".tab a").on("click", function (e) {
        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".tab-content > div").not(target).hide();

        $(target).fadeIn(600);
    });
});
