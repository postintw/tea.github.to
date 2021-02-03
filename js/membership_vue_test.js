//========== content ==========//
Vue.component("tour", {
    template: `
                <div id="tour">
                <div id="mine_tour">
                    <h3>我主揪</h3>
                    <div id="mine_on_going">
                        <h4>揪團中的團</h4> 
                        <div class="tour_detail" v-for="memTour in memTours">
                            <div class="tour_title">{{memTour.TOUR_TITLE}}</div>
                            <!-- <div class="arrow down"></div> -->
                            <div class="tour_date">{{memTour.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency" @click="showAttendency">人數：<span class="attend attend_1">{{memTour.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{memTour.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">未成團</div>
                                <div class="tour_join" @click="cancel_show(memTour.TOUR_ID)">取消</div>
                                <div class="tour_check">
                                    <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + memTour.TOUR_ID">
                                    查看
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mine_out_of_date">
                        <h4>過往的揪團</h4>
                        <div class="tour_detail outdated" v-for="mineTourOut in mineTourOuts">
                            <div class="tour_title">{{mineTourOut.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{mineTourOut.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{mineTourOut.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{mineTourOut.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已過期</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                    <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + mineTourOut.TOUR_ID
                                    ">
                                    查看
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div id="mine_cancel">
                        <h4>取消的揪團</h4>
                        <div class="tour_detail outdated" v-for="mineTourCancel in mineTourCancels">
                            <div class="tour_title">{{mineTourCancel.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{mineTourCancel.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency" @click="lightboxAttendency == true">人數：<span class="attend attend_1">{{mineTourCancel.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{mineTourCancel.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已取消</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <!-- <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + mineTourCancel.tour_no">
                                    查看
                                    </a> -->
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div id="i_join">
                    <h3>我參加</h3>
                    <div id="join_on_going">
                        <h4>揪團中的團</h4>
                        <div class="tour_detail" v-for="joinTour in joinTours">
                            <div class="tour_title">{{joinTour.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTour.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTour.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTour.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">未成團</div>
                                <!-- <div class="tour_join" @click="quit_show(joinTour.TOUR_ID) == true">退出</div> -->
                                <div class="tour_check">
                                    <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTour.tour_no">
                                    查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="join_out_of_date">
                        <h4>過往的揪團</h4>
                        <div class="tour_detail outdated" v-for="joinTourOut in joinTourOuts">
                            <div class="tour_title">{{joinTourOut.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTourOut.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTourOut.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTourOut.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已過期</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTourOut.tour_no">
                                查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="join_cancel">
                        <h4>取消的揪團</h4>
                        <div class="tour_detail outdated" v-for="joinTourCancel in joinTourCancels">
                            <div class="tour_title">{{joinTourCancel.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTourCancel.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTourCancel.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTourCancel.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已取消</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <!-- <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTourCancel.tour_no">
                                查看</a> -->
                                </div> 
                            </div>
                        </div>
                    </div>
                    <!-- 
                    <div id="join_quit">
                        <h4>退出的揪團</h4>
                        <div class="tour_detail outdated" v-for="joinTourQuit in joinTourQuits">
                            <div class="tour_title">{{joinTourQuit.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTourQuit.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTourQuit.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTourQuit.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已退出</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTourQuit.tour_no">
                                    查看
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <!-- 取消揪團燈箱 -->
                <div v-if="cancel_lightbox" class="delete_confirm">
                    是否確認取消？
                    <div class="btn">
                        <input type="button" @click="cancel(TOUR_ID)" id="btn_confirm" value="確認" />
                        <input type="button"  @click="cancel_lightbox = false" id="btn_cancel" value="取消" />
                    </div>
                </div>
                <!-- 退出揪團燈箱 -->
                <div v-if="quit_lightbox" class="cancel_confirm">
                    是否確認退出？
                    <div class="btn">
                        <input type="button" @click="quit(TOUR_ID)" id="cancel_confirm_btn" value="確認" />
                        <input type="button" @click="quit_lightbox = false" id="recall_cancel" value="取消" />
                    </div>
                </div>
                <!-- 人數燈箱 -->
                <div class="bgd" v-if="lightboxAttendency" v-for="attendency in attendencys">
                    <div class="num_attendency">
                        <div class="close" @click="lightboxAttendency = false"></div>
                        <div class="group">
                            <div class="icon">
                                <img :src="attendency.MEM_IMG" />
                            </div>
                            <div class="id">{{attendency.MEM_NICNAME}}</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
                `,
    data() {
        return {
            memTours: "",
            mineTourOuts: "",
            mineTourCancels: "",
            joinTours: "",
            joinTourOuts: "",
            joinTourCancels: "",
            joinTourQuits: "",
            cancel_lightbox: false,
            quit_lightbox: false,
            cancel_id: "",
            quit_id: "",
            lightboxAttendency: false,
            attendencys: "",
        };
    },
    methods: {
        // 取得我主揪 揪團中的團
        get_mine_tour: async function () {
            const res = await fetch("./phps/get_mine_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.memTours = res;
        },
        // 取得我主揪 過往的揪團
        get_mine_past: async function () {
            const res = await fetch("./phps/get_mine_past.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.mineTourOuts = res;
        },

        // 取得我主揪 取消的揪團
        get_mine_cancel: async function () {
            const res = await fetch("./phps/get_mine_cancel.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.mineTourCancels = res;
        },

        // 取得我參加 揪團中的團
        get_mine_join: async function () {
            const res = await fetch("./phps/get_mine_join.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.joinTours = res;
        },
        // 取得我參加 過往的揪團
        get_join_past: async function () {
            const res = await fetch("./phps/get_join_past.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.joinTourOuts = res;
        },
        // 取得我參加 取消的揪團
        get_join_cancel: async function () {
            const res = await fetch("./phps/get_join_cancel.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.joinTourCancels = res;
        },
        // 取得我參加 退出的揪團
        get_join_quit: async function () {
            const res = await fetch("./phps/get_join_quit.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.joinTourQuits = res;
        },
        cancel_show: function (TOUR_NO) {
            this.cancel_lightbox = true;
            this.cancel_id = TOUR_NO;
        },
        quit_show: function (TOUR_NO) {
            this.quit_lightbox = true;
            this.quit_id = TOUR_NO;
        },
        showAttendency: function () {
            this.lightboxAttendency = true;
        },
        //取消揪團
        cancel: async function () {
            const res = await fetch("./phps/cancel_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TOUR: this.cancel_id,
                }),
            });
            this.cancel_lightbox = false;
            //重新撈取一次細項列表
            this.get_mine_tour();
            this.get_join_cancel();
        },
        //退出揪團
        quit: async function () {
            const res = await fetch("./phps/quit_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TOUR_id: this.quit_id,
                }),
            });
            this.quit_lightbox = false;
            //重新撈取一次細項列表
            this.get_mine_join();
        },
        getAttendency: async function () {
            const res = await fetch("./phps/getAttendency.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tourId: this.quit_id,
                }),
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.attendencys = res;
        },
    },
    mounted() {
        this.get_mine_tour();
        this.get_mine_past();
        this.get_mine_cancel();

        this.get_mine_join();
        this.get_join_past();
        this.get_join_cancel();
        this.get_join_quit();

        $(".arrow").click(function () {
            // console.log("hihi");
            $(this).toggleClass("down").toggleClass("up");
            $(this).parent().toggleClass("extend");
            $(this).siblings(".tour_date").toggle();
            $(this).siblings(".tour_status_bar").toggle().css("width", "80%");
            $(this).siblings(".tour_status_bar").children().toggle();
            $(this).siblings(".tour_attendency").toggle().css("width", "80%");
        });
    },
});

Vue.component("mine_fav", {
    template: `
                <!-- 收藏管理 -->
                <div id="mine_fav">
                    <!-- 收藏管理選單列 -->
                    <div id="mine_fav_bar">
                        <h4 class="fav_tour colored">揪團</h4>
                        <h4 class="fav_article unselected">文章</h4>
                        <h4 class="fav_product unselected">商品</h4>
                    </div>
                    <!-- 收藏管理主內容 -->
                    <div id="fav_container">
                        <!-- 收藏的揪團 -->
                        <div id="fav_tour">
                            <div id="tour_list" class="fav_content">
                                <div class="blog_container tour_blog" v-for="favTour in favTours">
                                    <img class="banner_img" :src="favTour.TOUR_IMG">
                                    <div class="heart" @click="cancel_fav_tour(favTour.TOUR_ID)">
                                        <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                                    </div>
                                    <div class="blog_content_container">
                                        <div class="blog_title">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + favTour.TOUR_ID">
                                            {{favTour.TOUR_TITLE}}
                                            </a>
                                        </div>
                                        <div class="blog_content">{{favTour.TOUR_INFRO}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 收藏的文章 -->
                        <div id="fav_article">
                            <div id="article_list" class="fav_content">
                                <div class="blog_container article_blog" v-for="favArt in favArts">
                                    <img class="banner_img" :src="favArt.art_img">
                                    <div class="heart" @click="cancel_fav_art(favArt.art_no)">
                                        <img class="like" src="./images/common/like.png" title="noadd" :id=favArt.ART_NO alt="" >
                                    </div>
                                    <div class="blog_content_container">
                                        <div class="blog_title">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/03_discuss_article.php?ART_NO=' + favArt.art_no">
                                                {{favArt.art_title}}
                                            </a>
                                        </div>
                                        <div class="blog_content">{{favArt.art_content}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 收藏的商品 -->
                        <div id="fav_product">
                            <div id="product_list" class="fav_content">
                                <div class="blog_container product_blog" v-for="favProd in favProds">
                                    <img class="banner_img" :src="favProd.img">
                                    <div class="heart" @click="cancel_fav_prod(favProd.psn)">
                                        <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                                    </div>
                                    <div class="blog_content_container">
                                        <div class="blog_title">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/04_product.html?psn=' + favProd.psn">
                                                {{favProd.name}}
                                            </a>
                                        </div>
                                        <div class="blog_content">{{favProd.info}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `,
    data() {
        return {
            favTours: "",
            favArts: "",
            favProds: "",
            unfavTours: "",
            unfavArts: "",
            unfavProds: "",
        };
    },
    methods: {
        get_fav_tour: async function () {
            const fav_tour = await fetch("./phps/get_fav_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(fav_tour);
            this.favTours = fav_tour;
        },
        get_fav_art: async function () {
            const fav_art = await fetch("./phps/get_fav_art.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(fav_art);
            this.favArts = fav_art;
        },
        get_fav_prod: async function () {
            const fav_prod = await fetch("./phps/get_fav_prod.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(fav_prod);
            this.favProds = fav_prod;
        },
        cancel_fav_tour: async function (unfavTour) {
            const unfav_tour = await fetch("./phps/cancel_fav_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    unfav_tour: unfavTour,
                }),
            });
            this.unfavTours = unfav_tour;
            //重新撈取一次細項列表
            this.get_fav_tour();
        },
        cancel_fav_art: async function (unfavArt) {
            const unfav_art = await fetch("./phps/cancel_fav_art.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    unfav_art: unfavArt,
                }),
            });
            this.unfavArts = unfav_art;
            //重新撈取一次細項列表
            this.get_fav_art();
        },
        cancel_fav_prod: async function (unfavProd) {
            const unfav_prod = await fetch("./phps/cancel_fav_prod.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    unfav_prod: unfavProd,
                }),
            });
            this.unfavProds = unfav_prod;
            //重新撈取一次細項列表
            this.get_fav_prod();
        },
    },
    mounted() {
        this.get_fav_tour();
        this.get_fav_art();
        this.get_fav_prod();
        //分頁切換
        $(".fav_tour").click(function () {
            // console.log($(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_tour"));
            $(this).addClass("colored").removeClass("unselected");
            $(this).siblings().removeClass("colored").addClass("unselected");
            $(this).parent("#mine_fav_bar").siblings("#fav_container").children().hide();
            $(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_tour").show();
        });
        $(".fav_article").click(function () {
            $(this).addClass("colored").removeClass("unselected");
            $(this).siblings().removeClass("colored").addClass("unselected");
            $(this).parent("#mine_fav_bar").siblings("#fav_container").children().hide();
            $(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_article").show();
        });
        $(".fav_product").click(function () {
            $(this).addClass("colored").removeClass("unselected");
            $(this).siblings().removeClass("colored").addClass("unselected");
            $(this).parent("#mine_fav_bar").siblings("#fav_container").children().hide();
            $(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_product").show();
        });
    },
});

Vue.component("mine_order", {
    template: `
                <div id="mine_order">
                                <div id="list">
                                    <div class="order">
                                        <h5 class="order_no">訂單編號</h5>
                                        <h5 class="order_status">訂單狀態</h5>
                                        <h5 class="order_payment">支付方式</h5>
                                        <h5 class="order_total">訂單金額</h5>
                                        <h5 class="order_date">下單時間</h5>
                                    </div> 
                                    <div class="order list_title" v-for="ordList in ordLists">
                                            <h5 class="order_no"><a v-bind:href="'https://tibamef2e.com/ced101/project/g2/04_orders.html?orders_no=' + ordList.ORDERS_NO">{{ordList.ORDERS_NO}}</a></h5>
                                            <h5 class="order_status status">{{ordList.state}}</h5>
                                            <h5 class="order_payment">{{ordList.pay}}</h5>
                                            <h5 class="order_total">NT {{ordList.TOTAL}}</h5>
                                            <h5 class="order_date">{{ordList.ORD_DATE}}</h5>
                                        
                                    </div>                                 
                                </div>
                            </div>
                `,
    data() {
        return {
            ordLists: "",
        };
    },
    methods: {
        get_ord_list: async function () {
            const order_list = await fetch("./phps/get_ord_list.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(order_list);
            this.ordLists = order_list;
        },
        // switch() {
        //     if (this.ordLists.DEL_STATE == 0) {
        //         this.courTypeName = "未付款";
        //     } else {
        //         this.courTypeName = "已付款";
        //     }
        // },
        changename(event) {
            this.ordLists[this.edit_key].courseName = event.currentTarget.value;
        },
    },
    mounted() {
        this.get_ord_list();
        // console.log(this.ordLists);

        // switch (this.ordLists.DEL_STATE) {
        //     case 0:
        //         document.getElementsByClassName("status").innerText = "未付款";
        //         break;
        //     case 1:
        //         document.getElementsByClassName("status").innerText = "已付款";
        //         break;
        //     case 2:
        //         document.getElementsByClassName("status").innerText = "未出貨";
        //         break;
        //     case 3:
        //         document.getElementsByClassName("status").innerText = "已出貨";
        //         break;
        // }
    },
});

Vue.component("mine_article", {
    template: `
                <div id="mine_article">
                                <div class="article_brief" id="article_brief" v-for = "mineArt in mineArts">
                                    <div class="article_detail">
                                        <div class="article_title">{{mineArt.ART_TITLE}}</div>
                                        <div class="article_date">{{mineArt.ART_DATE}}</div>
                                        <div class="article_status_bar">
                                            <!-- <div class="article_status">分享</div> -->
                                            <div class="article_join">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/03_discuss_article.php?ART_NO=' + mineArt.ART_NO">
                                            查看
                                            </a>

                                            </div>
                                            <div class="article_check" @click="del_show(mineArt.ART_NO)">刪除</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 刪除文章燈箱 -->
                                <div v-if="del_lightbox" class="cancel_confirm">
                                    是否確認刪除？
                                    <div class="btn">
                                        <input type="button" @click="del(ART_NO)" id="del_art_confirm" value="確認" />
                                        <input type="button" @click="del_lightbox = false" id="del_art_cancel" value="取消" />
                                    </div>
                                </div>
                            </div>
                `,
    data() {
        return {
            mineArts: "",
            del_lightbox: false,
            del_art: "",
        };
    },
    methods: {
        del_show: function (ART_NO) {
            this.del_lightbox = true;
            this.del_art = ART_NO;
        },
        del: async function () {
            const art_id = await fetch("./phps/del.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    art_id: this.del_art,
                }),
            });
            this.del_lightbox = false;
            //重新撈取一次細項列表
            this.get_mine_art();
        },
        get_mine_art: async function () {
            const mine_art = await fetch("./phps/get_mine_art.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            this.mineArts = mine_art;
        },
    },
    mounted() {
        this.get_mine_art();
    },
});

Vue.component("mine_profile", {
    template: `
                <div id="mine_profile">
                    <form id="profile" method="POST">
                                    <div class="field-wrap">
                                        <label for="MEM_NICKNAME">暱稱</label>
                                        <input type="text" name="MEM_NICKNAME" class="my_name" v-model="new_nicname">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="MEM_EMAIL">電子信箱</label>
                                        <input type="email" name="MEM_EMAIL" class="email" readonly v-model="mem_email">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="MEM_ID">帳號</label>
                                        <input type="text" name="MEM_ID" class="my_id" readonly v-model="mem_id">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="MEM_PW">舊密碼</label>
                                        <input type="password" name="MEM_PW" id="old_mem_pw" class="pass_password" v-model="old_mem_pw">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="new_password">新密碼</label>
                                        <input type="password" name="new_password" id="new_password" class="new_password" v-model="new_password">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="confirm_new_password">確認新密碼</label>
                                        <input type="password" name="confirm_new_pw" id="confirm_new_pw" class="confirm_new_pw" v-model="confirm_new_pw">
                                    </div>
                                    <div class="btn_sent">
                                        <button type="button" class="button" @click="update_info">送出</button>
                                    </div>
                                </form>
                            </div>
                `,
    // props: "value",
    data() {
        return {
            mineInfos: "",
            mem_no: "",
            mem_id: "",
            mem_email: "",
            new_nicname: "",
            old_mem_pw: "",
            new_password: "",
            confirm_new_pw: "",
        };
    },
    // props: ["value"],
    methods: {
        get_mine_info: async function () {
            const mine_info = await fetch("./phps/get_mine_info.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            this.mineInfos = mine_info;

            this.mem_no = this.mineInfos.MEM_NO;
            this.mem_id = this.mineInfos.MEM_ID;
            this.mem_email = this.mineInfos.MEM_EMAIL;
            this.new_nicname = this.mineInfos.MEM_NICNAME;
        },
        update_info: async function () {
            this.get_mine_info();

            //暱稱判別
            if (this.new_nicname.length > 10 || this.new_nicname.length < 1) {
                alert("請輸入暱稱（1-10字），請重試");
                return;
            }
            if (this.old_mem_pw != this.mineInfos.MEM_PW) {
                // console.log(this.mineInfos.MEM_PW);
                alert("舊密碼錯誤，請重試");
                return;
            }
            if (this.new_password != this.confirm_new_pw) {
                alert("新密碼輸入不一致，請重試");
                return;
            }

            const update_mem = await fetch("./phps/edit_mem_info.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mem_no: this.mineInfos.MEM_NO,
                    old_mem_pw: this.mineInfos.MEM_PW,
                    new_nicname: this.new_nicname,
                    new_password: this.new_password,
                }),
            }).then(function (data) {
                return data.text();
            });
            if (update_mem == "修改成功") {
                alert("修改成功！");
            } else if (update_mem == "修改失敗") {
                alert("修改失敗！");
            }

            // 完成修改後，重新撈取資料
            this.get_mine_info();
            // app.getLoginInfo();
        },
    },
    mounted() {
        this.get_mine_info();

        //個人資料分頁
        $("form")
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
    },
});
// export default {
//     name: "imgError",
//     data() {
//         return {
//             defaultImg: 'this.src="' + require("images/common/user.png") + '"', //默认图地址
//         };
//     },
// };

var app = new Vue({
    el: "#app",
    data: {
        memRows: "",
        content: "tour",
        lightboxAttendency: false,
        imgType: "",
        icon_src: "",
    },
    methods: {
        getinfo: async function () {
            //抓抓抓
            // let memRows;
            //============去server端拿資料
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                app.memRows = JSON.parse(xhr.responseText);
                // console.log(app.memRows);
            };
            xhr.open("get", "./phps/member.php", true);
            xhr.send(null);
        },
        uploadImg: async function () {
            let newIcon = document.getElementById("profilePicInput").files[0];
            let formData = new FormData();
            formData.append("profilePicInput", newIcon);

            // =====ajax
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    alert("更改成功");
                } else {
                    alert("更改失敗");
                }
            };
            xhr.open("post", "./php/upload_mem_icon.php");
            xhr.send(formData);
            if (xhr.status == 200) {
                // console.log(xhr.responseText)
                alert("上傳成功！");
            } else {
                alert("請重新上傳頭像！");
            }
        },
    },
    mounted() {
        this.getinfo();
    },
});

//==========  sub menu分頁  ==========//
$(".tour").click(function () {
    $(this).toggleClass("bg-color").toggleClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_fav").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_order").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_article").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_profile").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
    // $(this).parent().parent().siblings("#main_container").children("#sub_menu").children("h3").removeClass("bg-color");
});
$("#mine_profile_btn").click(function () {
    $("#sub_menu").children("h3").removeClass("bg-color").addClass("select-color");
});


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