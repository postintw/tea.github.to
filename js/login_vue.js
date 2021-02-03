$(document).ready(function () {
    // $(".memicon").click(function () {
    //     $(".cover").css("display", "flex");
    //     // console.log("hihi");
    // });

    // $(".cancel").click(function () {
    //     $(".cover").css("display", "none");
    // });

    $("p").on("click", function () {
        $("#login").css("display", "none");
        $("#forget_pw").css("display", "block").fadeIn(600);
        $("#signup").css("display", "none");
        $(".tab-group > li").removeClass("active");
    });

    // $(".btn.cancel").on("click", function () {
    //     $(".cover").css("display", "none");
    // });
});

// new Vue({
//     el: "#app",
//     data() {
//         return {
//             log_mem_id: "",
//             log_mem_pw: "",
//         };
//     },
//     methods: {
//         mem_register: async function () {
//             const res = await fetch("./php/mem_register.php", {
//                 method: "POST",
//                 mode: "same-origin",
//                 credentials: "same-origin",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     // empName: this.empName,
//                     // empId: this.empId,
//                     // empPsw: this.empPsw,
//                 }),
//             });
//         },
//     },
// });

// let memberRows;
// //============去server端拿資料
// let xhrMem = new XMLHttpRequest();
// xhrMem.onload = function () {
//     mem.memberRows = JSON.parse(xhrMem.responseText);
//     console.log(mem.memberRows);
// };
// xhrMem.open("get", "./php/member.php", true);
// xhrMem.send(null);

Vue.component("log_reg", {
    data() {
        return {
            // login_id: "",
            // login_pw: "",
        };
    },
    template: `
    <div class="cover">
    <div class="form">
        <!-- <div class="close"></div> -->
        <ul class="tab-group">
            <li class="tab active"><a href="#login">登入</a></li>
            <li class="tab"><a href="#signup">註冊</a></li>
        </ul>
        <div class="tab-content">
            <div id="login">   
                <h2>歡迎回來！</h2>
                <form action="./phps/login.php" method="post">
                    <div class="field-wrap">
                        <label for="MEM_ID">
                            帳號<span class="req">*</span>
                        </label>
                        <input type="text"required autocomplete="off" id="log_memId" name="MEM_ID"/>
                    </div>
                    <div class="field-wrap">
                        <label for="MEM_PW">
                            密碼<span class="req">*</span>
                        </label>
                        <input type="password"required autocomplete="off" id="log_memPw" name="MEM_PW"/>
                    </div>
                    <p class="forgot"><a href="#">忘記密碼？</a></p>
                    <div class="btn_container">
                        <button @click="login" id="log-in" class="btn">登入</button>
                        <button @click="closeLogin()" id="log-cancel" class="btn cancel">取消</button>
                    </div>
                </form>
            </div>
            <div id="forget_pw">
                <h2>找回密碼</h2>
                <form action="/" method="post">
                    <div class="field-wrap">
                        <label for="get_email">
                            信箱<span class="req">*</span>
                        </label>
                        <input type="email"required autocomplete="off" id="get_email" name="get_email"/>
                    </div>
                    <div class="btn_container">
                        <button class="btn">取回密碼</button>
                        <button @click="closeLogin()" id="get-cancel" class="btn cancel">取消</button>
                    </div>
                    
                </form>
            </div>        
            <div id="signup">   
                <h2>註冊會員</h2>
                <form action="./phps/mem_register.php" method="post">
                    <div class="field-wrap">
                        <label for="reg_email">
                        信箱<span class="req">*</span>
                        </label>
                    <input type="email"required autocomplete="off" id="reg_email" name="reg_email"/>
                    </div>
                    <div class="field-wrap">
                        <label for="reg_memId">
                        帳號<span class="req">*</span>
                        </label>
                        <input type="text"required autocomplete="off" id="reg_memId" name="reg_memId"/>
                    </div>
                    <div class="field-wrap">
                        <label for="reg_memPw">
                        密碼<span class="req">*</span>
                        </label>
                        <input type="password"required autocomplete="off" id="reg_memPw" name="reg_memPw"/>
                    </div>
                    <div class="field-wrap">
                        <label for="re_memPw">
                        重複輸入密碼<span class="req">*</span>
                        </label>
                        <input type="password"required autocomplete="off" id="re_memPw" name="re_memPw"/>
                    </div>
                    <div class="btn_container">
                        <button type="submit" class="btn">註冊</button>
                        <button @click="closeLogin()" id="reg-cancel" class="btn cancel">取消</button>
                    </div>
                </form>
            </div>  
        </div><!-- tab-content -->  
    </div> <!-- /form -->
    </div>
    `,
    methods: {
        closeLogin() {
            console.log(123);
            this.$emit("close");
        },
        login: function () {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //success
                    member = JSON.parse(xhr.responseText);
                    if (member.MEM_ID) {
                        $(".cover").css("display", "none");
                    } else {
                        alert("帳密錯誤");
                        location.href='../homepage.html';
                    }
                } else {
                    alert(xhr.status);
                }
            };
            xhr.open("post", "./phps/login.php", true);
            xhr.send(null);
        },
        getLoginInfo: function () {
            //取回使用者的登入資訊
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                member = JSON.parse(xhr.responseText);
                if (member.MEM_ID) {
                    //如果有登入
                    // document.getElementById("MEM_NICKNAME").innerText = member.MEM_NICKNAME;
                    document.getElementById("spanLogin").innerText = "登出";
                    // $(".class").css("display", "none");
                }
            };
            xhr.open("get", "./phps/get_login_info.php", true);
            xhr.send(null);
        },
    },
    mounted() {
        this.getLoginInfo();
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
    },
});

var app2 = new Vue({
    el: "#nav",
    data: {
        lightbox: false,
        memRows: "",
    },
    methods: {
        closeLoginBox() {
            this.lightbox = false;
            console.log(123);
        },
        showLogin() {
            if (this.memRows.length == 0) {
                this.lightbox = true;
            } else {
                this.lightbox = false;
                window.location.href = "./membership.html";
            }
        },
        addTourLogin() {
            if (this.memRows.length == 0) {
                this.lightbox = true;
            } else {
                window.location.href = "./01_tourCreate.html";
                // $("#spanLogin").css("display", "none");
            }
        },
        getMem() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //success
                    app2.memRows = JSON.parse(xhr.responseText);
                    console.log(app2.memRows);
                } else {
                    alert(xhr.status);
                }
            };
            xhr.open("get", "./phps/member.php", true);
            xhr.send(null);
        },
        logout() {
            // console.log("logout");
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                document.getElementById("spanLogin").innerText = " ";
                // if ((location.href = "https://tibamef2e.com/ced101/project/g2/membership.html")) {
                if ((location.href = "http://localhost:8888/CED101_G2/dist/membership.html")) {
                    window.location.href = "./homepage.html";
                } else {
                    window.history.go(0);
                }
            };
            xhr.open("get", "./phps/logout.php", true);
            xhr.send(null);
        },
    },
    mounted() {
        this.getMem();
    },
});
