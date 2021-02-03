let storage = sessionStorage;

window.addEventListener("load", function () {
    $('#addLike').on('submit', function () {
        $.ajax({
            url: './phps/addTourLike.php', // 要傳送的頁面
            method: 'POST',               // 使用 POST 方法傳送請求
            dataType: 'text',             // 回傳資料會是 json 格式
            data: $('#addLike').serialize(),  // 將表單資料用打包起來送出去
            success: function (res) {
                if (res == 1) {
                    console.log('good');
                } else {
                    console.log('remove');

                }       // 成功以後會執行這個方法

            },
            error: function (err) {
                alert('失敗!!');
                console.log('not good');
            },
        });
        return false;  // 阻止瀏覽器跳轉到 send.php，因為已經用 ajax 送出去了
    });



    //============去server端拿揪團資料
    let tourRows;
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        tourApp.tourRows = JSON.parse(xhr.responseText);

    }
    xhr.open("get", "./phps/getTour.php", true);
    xhr.send(null);
    //============去server端拿北茶園資料
    let locationRows;
    let xhr1 = new XMLHttpRequest();
    xhr1.onload = function () {
        tourApp.locationRows = JSON.parse(xhr1.responseText);

    }
    xhr1.open("get", "./phps/getNgarden.php", true);
    xhr1.send(null);
    //============去server端拿中茶園資料
    let locationCRows;
    let xhr2 = new XMLHttpRequest();
    xhr2.onload = function () {
        tourApp.locationCRows = JSON.parse(xhr2.responseText);

    }
    xhr2.open("get", "./phps/getCgarden.php", true);
    xhr2.send(null);
    //============去server端拿南茶園資料
    let locationSRows;
    let xhr3 = new XMLHttpRequest();
    xhr3.onload = function () {
        tourApp.locationSRows = JSON.parse(xhr3.responseText);

    }
    xhr3.open("get", "./phps/getSgarden.php", true);
    xhr3.send(null);

    //============去server端拿收藏資料
    let xhr4 = new XMLHttpRequest();
    xhr4.onload = function () {
        if (xhr4.status == 200) {
            //modify here
            let FavortieList = JSON.parse(xhr4.responseText);
            tourApp.FavortieLists = FavortieList;

        }
    }

    var url = "./phps/getTourFavoriteList.php";
    xhr4.open("Get", url, true);
    xhr4.send(null);


})

Vue.component('all', {
    props: ['tours', 'members'],

    methods: {

    },
    template: `
<div class="tour_browse" id="tourBrowseBlock">
    <div class="tour_block" id="tourBlock" v-for="(tourRow,index) in tours" >
        <div class="tour_img">
        <div class="tour_img_text" >
            <p>{{tourRow.TOUR_TITLE}}</p>
            <p>{{tourRow.TOUR_SETOFFTIME}} 開團</p>
        </div>
            <img :src="tourRow.TOUR_IMG" alt="">
            <div class="love_share">
                    <div class="love">
                        <img :id=tourRow.TOUR_ID  ref="like" @click="heart(index, tourRow.TOUR_ID)" src="./images/common/heart.png" title="加入收藏" alt="" >
                     </div>               
            </div>
        </div>
        <div class="tour_text">
            <div class="deadline">
                <h3>茶園名稱</h3>
                <p>{{tourRow.GARD_NAME}}</p>
            </div>
            <div class="deadline">
                <h3>截止揪團日期</h3>
                <p>{{tourRow.DEADLINE_DATE}}</p>
            </div>
            <div class="price">
                <h3>預估費用</h3>
                <p>NT{{tourRow.GARD_PRICE}}</p>
            </div>
            <div class="ink">
                <div class="ink_bg"></div>
                <div class="inkText">
                    <h3>剩餘名額</h3>
                    <p>{{tourRow.NUM_OF_PARTICIPANTS}}/{{tourRow.TOUR_PEOPLE}}</p>
                </div>
            </div>
        </div>
        <div class="tourBtn">
            <button type="button">
                <a :href="'02_tour_more.html?TOUR_ID=' + tourRow.TOUR_ID"> 查看更多</a>
            </button>
        </div>

    </div>
</div>
    
    `,
    methods: {
        heart(index, tourId) {
            if (this.members.length == 0) {
                app2.lightbox = true;
            } else {
                if (this.$refs.like[index].title == "加入收藏") {
                    storage["tourId"] = tourId;
                    storage["case"] = 1;
                    this.$emit('sumit-form');
                    this.$refs.like[index].title = "取消收藏";
                    this.$refs.like[index].src = "./images/common/like.png";
                } else {
                    setTimeout(() => {
                        this.$refs.like[index].title = "加入收藏";
                        this.$refs.like[index].src = "./images/common/heart.png";
                    }, 100);
                    storage["tourId"] = tourId;
                    storage["case"] = 2;
                    this.$emit('sumit-form');
                }

            }
        }


    },

})

Vue.component('north', {
    props: ['tours', 'filter', 'members'],

    methods: {

    },
    template: `
<div class="tour_browse" id="tourBrowseBlock">
    <div class="tour_block" id="tourBlock" v-for="(tourRow,index) in tours" v-show="tourRow.GARD_LOCATE==filter">
        <div class="tour_img">
        <div class="tour_img_text" >
            <p>{{tourRow.TOUR_TITLE}}</p>
            <p>{{tourRow.TOUR_SETOFFTIME}} 開團</p>
            </div>
            <img :src="tourRow.TOUR_IMG" alt="">
            <div class="love_share">
                <div class="love">
                    <img :id=tourRow.TOUR_ID  src="./images/common/heart.png" ref="like" @click="heart(index, tourRow.TOUR_ID)" title="加入收藏" alt="">
                </div>
            </div>
       
        </div>

        
        <div class="tour_text">
            <div class="deadline">
                <h3>茶園名稱</h3>
                <p>{{tourRow.GARD_NAME}}</p>
            </div>
            <div class="deadline">
                <h3>截止揪團日期</h3>
                <p>{{tourRow.DEADLINE_DATE}}</p>
            </div>
            <div class="price">
                <h3>預估費用</h3>
                <p>NT{{tourRow.GARD_PRICE}}</p>
            </div>
            <div class="ink">
                <div class="ink_bg"></div>
                <div class="inkText">
                    <h3>剩餘名額</h3>
                    <p>{{tourRow.NUM_OF_PARTICIPANTS}}/{{tourRow.TOUR_PEOPLE}}</p>
                </div>
            </div>
        </div>
        <div class="tourBtn">
            <button type="button">
                <a :href="'02_tour_more.html?TOUR_ID=' + tourRow.TOUR_ID"> 查看更多</a>
            </button>
        </div>

    </div>
</div>
    
    `,
    methods: {
        heart(index, tourId) {
            if (this.members.length == 0) {
                app2.lightbox = true;
            } else {
                if (this.$refs.like[index].title == "加入收藏") {
                    storage["tourId"] = tourId;
                    storage["case"] = 1;
                    this.$emit('sumit-form');
                    this.$refs.like[index].title = "取消收藏";
                    this.$refs.like[index].src = "./images/common/like.png";
                } else {
                    setTimeout(() => {
                        this.$refs.like[index].title = "加入收藏";
                        this.$refs.like[index].src = "./images/common/heart.png";
                    }, 100);
                    storage["tourId"] = tourId;
                    storage["case"] = 2;
                    this.$emit('sumit-form');
                }

            }
        }


    },

})

Vue.component('type', {
    props: ['tours', 'filter', 'members'],

    methods: {

    },
    template: `
<div class="tour_browse" id="tourBrowseBlock">
    <div class="tour_block" id="tourBlock" v-for="(tourRow,index) in tours" v-show="tourRow.GARD_TYPE==filter">
        <div class="tour_img">
        <div class="tour_img_text" >
            <p>{{tourRow.TOUR_TITLE}}</p>
            <p>{{tourRow.TOUR_SETOFFTIME}} 開團</p>
            </div>
            <img :src="tourRow.TOUR_IMG" alt="">
            <div class="love_share">
                <div class="love">
                 <img :id=tourRow.TOUR_ID src="./images/common/heart.png" @click="heart(index, tourRow.TOUR_ID)" ref="like" title="加入收藏" alt="">
                </div>                  
             </div>
         </div>
        <div class="tour_text">
            <div class="deadline">
                <h3>茶園名稱</h3>
                <p>{{tourRow.GARD_NAME}}</p>
            </div>
            <div class="deadline">
                <h3>截止揪團日期</h3>
                <p>{{tourRow.DEADLINE_DATE}}</p>
            </div>
            <div class="price">
                <h3>預估費用</h3>
                <p>NT{{tourRow.GARD_PRICE}}</p>
            </div>
            <div class="ink">
                <div class="ink_bg"></div>
                <div class="inkText">
                    <h3>剩餘名額</h3>
                    <p>{{tourRow.NUM_OF_PARTICIPANTS}}/{{tourRow.TOUR_PEOPLE}}</p>
                </div>
            </div>
        </div>
        <div class="tourBtn">
            <button type="button">
                <a :href="'02_tour_more.html?TOUR_ID=' + tourRow.TOUR_ID">查看更多</a>
            </button>
        </div>

    </div>
</div>
    
    `,
    methods: {
        heart(index, tourId) {
            if (this.members.length == 0) {
                app2.lightbox = true;
            } else {
                if (this.$refs.like[index].title == "加入收藏") {
                    storage["tourId"] = tourId;
                    storage["case"] = 1;
                    this.$emit('sumit-form');
                    this.$refs.like[index].title = "取消收藏";
                    this.$refs.like[index].src = "./images/common/like.png";
                } else {
                    setTimeout(() => {
                        this.$refs.like[index].title = "加入收藏";
                        this.$refs.like[index].src = "./images/common/heart.png";
                    }, 100);
                    storage["tourId"] = tourId;
                    storage["case"] = 2;
                    this.$emit('sumit-form');
                }

            }
        }



    },

})

Vue.component('price', {
    props: ['tours', 'filter', 'members'],

    methods: {

    },
    template: `
<div class="tour_browse" id="tourBrowseBlock">
    <div class="tour_block" id="tourBlock" v-for="(tourRow,index) in tours" v-show="tourRow.GARD_PRICE<=filter">
        <div class="tour_img">
        <div class="tour_img_text" >
            <p>{{tourRow.TOUR_TITLE}}</p>
            <p>{{tourRow.TOUR_SETOFFTIME}} 開團</p>
            </div>
            <img :src="tourRow.TOUR_IMG" alt="">
            <div class="love_share">
                <div class="love">
                    <img :id=tourRow.TOUR_ID src="./images/common/heart.png" @click="heart(index, tourRow.TOUR_ID)" ref="like" title="加入收藏" alt="">
                </div>
            </div>
        </div>

       
        <div class="tour_text">
            <div class="deadline">
                <h3>茶園名稱</h3>
                <p>{{tourRow.GARD_NAME}}</p>
            </div>
            <div class="deadline">
                <h3>截止揪團日期</h3>
                <p>{{tourRow.DEADLINE_DATE}}</p>
            </div>
            <div class="price">
                <h3>預估費用</h3>
                <p>NT{{tourRow.GARD_PRICE}}</p>
            </div>
            <div class="ink">
                <div class="ink_bg"></div>
                <div class="inkText">
                    <h3>剩餘名額</h3>
                    <p>{{tourRow.NUM_OF_PARTICIPANTS}}/{{tourRow.TOUR_PEOPLE}}</p>
                </div>
            </div>
        </div>
        <div class="tourBtn">
            <button type="button">
                <a :href="'02_tour_more.html?TOUR_ID=' + tourRow.TOUR_ID">查看更多</a>
            </button>
        </div>

    </div>
</div>
    
    `,
    methods: {
        heart(index, tourId) {
            if (this.members.length == 0) {
                app2.lightbox = true;
            } else {
                if (this.$refs.like[index].title == "加入收藏") {
                    storage["tourId"] = tourId;
                    storage["case"] = 1;
                    this.$emit('sumit-form');
                    this.$refs.like[index].title = "取消收藏";
                    this.$refs.like[index].src = "./images/common/like.png";
                } else {
                    setTimeout(() => {
                        this.$refs.like[index].title = "加入收藏";
                        this.$refs.like[index].src = "./images/common/heart.png";
                    }, 100);
                    storage["tourId"] = tourId;
                    storage["case"] = 2;
                    this.$emit('sumit-form');
                }

            }
        }


    },

})

let tourApp = new Vue({
    el: "#tourApp",
    data: {
        content: "all",
        Ngardens: [],
        Cgardens: [],
        Sgardens: [],
        showTour: "",
        filter: "",
        locationRows: [],
        locationCRows: [],
        locationSRows: [],
        tourRows: [],
        FavortieLists: [],
        locN: true,
        locC: true,
        locS: true,
        memNO: 1,
        tourId: "",
        addCase: "",
        memRows: '',
        colorAll: true,
        colorLocation: false,
        colorNorth: false,
        colorCenter: false,
        colorSouth: false,
        colorType: false,
        colorType0: false,
        colorType1: false,
        colorPrice: false,
        colorPrice2000: false,
        colorPrice3000: false,
    },
    methods: {
        filterAll() {
            this.content = "all";
            this.colorAll = true;
            this.colorLocation = false;
            this.colorNorth = false;
            this.colorCenter = false;
            this.colorSouth = false;
            this.colorType = false;
            this.colorType0 = false;
            this.colorType1 = false;
            this.colorPrice = false;
            this.colorPrice2000 = false;
            this.colorPrice3000 = false;
        },
        filterNorth() {
            this.content = "north";
            this.filter = '北部';
            this.colorLocation = true;
            this.colorAll = false;
            this.colorNorth = true;
            this.colorCenter = false;
            this.colorSouth = false;
            this.colorType = false;
            this.colorType0 = false;
            this.colorType1 = false;
            this.colorPrice = false;
            this.colorPrice2000 = false;
            this.colorPrice3000 = false;

        },
        filterCenter() {
            this.content = "north";
            this.filter = '中部';
            this.colorLocation = true;
            this.colorAll = false;
            this.colorNorth = false;
            this.colorCenter = true;
            this.colorSouth = false;
            this.colorType = false;
            this.colorType0 = false;
            this.colorType1 = false;
            this.colorPrice = false;
            this.colorPrice2000 = false;
            this.colorPrice3000 = false;
        },
        filterSouth() {
            this.content = "north";
            this.filter = '南部';
            this.colorLocation = true;
            this.colorAll = false;
            this.colorNorth = false;
            this.colorCenter = false;
            this.colorSouth = true;
            this.colorType = false;
            this.colorType0 = false;
            this.colorType1 = false;
            this.colorPrice = false;
            this.colorPrice2000 = false;
            this.colorPrice3000 = false;
        },
        filterType0() {
            this.content = "type";
            this.filter = 0;
            this.colorType = true;
            this.colorType0 = true;
            this.colorType1 = false;
            this.colorAll = false;
            this.colorLocation = false;
            this.colorNorth = false;
            this.colorCenter = false;
            this.colorSouth = false;
            this.colorPrice = false;
            this.colorPrice2000 = false;
            this.colorPrice3000 = false;
        },
        filterType1() {
            this.content = "type";
            this.filter = 1;
            this.colorType = true;
            this.colorType0 = false;
            this.colorType1 = true;
            this.colorAll = false;
            this.colorLocation = false;
            this.colorNorth = false;
            this.colorCenter = false;
            this.colorSouth = false;
            this.colorPrice = false;
            this.colorPrice2000 = false;
            this.colorPrice3000 = false;
        },
        filterPrice2000() {
            this.content = "price";
            this.filter = 2000;
            this.colorPrice = true;
            this.colorPrice2000 = true;
            this.colorPrice3000 = false;
            this.colorAll = false;
            this.colorLocation = false;
            this.colorNorth = false;
            this.colorCenter = false;
            this.colorSouth = false;
            this.colorType = false;
            this.colorType0 = false;
            this.colorType1 = false;
        },
        filterPrice3000() {
            this.content = "price";
            this.filter = 3000;
            this.colorPrice = true;
            this.colorPrice2000 = false;
            this.colorPrice3000 = true;
            this.colorAll = false;
            this.colorLocation = false;
            this.colorNorth = false;
            this.colorCenter = false;
            this.colorSouth = false;
            this.colorType = false;
            this.colorType0 = false;
            this.colorType1 = false;
        },
        showAll() {
            this.locN = true;
            this.locC = true;
            this.locS = true;
            let like = this.$refs.like;

            // this.loadFavorite();
        },
        showN() {
            this.locN = true;
            this.locC = false;
            this.locS = false;
        },
        showC() {
            this.locN = false;
            this.locC = true;
            this.locS = false;
        },
        showS() {
            this.locN = false;
            this.locC = false;
            this.locS = true;
        },


        sumit() {
            this.tourId = storage.getItem('tourId');
            this.addCase = storage.getItem('case');

            setTimeout(() => {
                this.$refs.submit.click();
            }, 1);

        },
        loadFavorite() {
            setTimeout(() => {
                for (var i = 0; i < this.FavortieLists.length; i++) {
                    let list = this.FavortieLists[i].TOUR_ID;
                    let showHeart = document.getElementById(list);
                    showHeart.src = "./images/common/like.png";
                    showHeart.title = "取消收藏";

                }

            }, 350);
        },
        getMem() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) { //success
                    tourApp.memRows = JSON.parse(xhr.responseText);

                }
            };
            xhr.open("get", "./phps/member.php", true);
            xhr.send(null);
        },
        getLikeTour() {
            setTimeout(() => {
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) { //success
                        tourApp.FavortieLists = JSON.parse(xhr.responseText);

                    }
                };
                var url = "./phps/getTourFavoriteList.php";
                xhr.open("Get", url, true);
                xhr.send(null);
            }, 100);
        },

    },
    mounted() {
        this.getMem();

    },
    beforeUpdate() {


    },
    updated() {
        this.getLikeTour();
        this.loadFavorite();
    },

})
