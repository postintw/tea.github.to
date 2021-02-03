let storage = sessionStorage;
window.addEventListener("load", function () {
    //============去server端拿茶園資料
    let locationRows;
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        tourCreate.locationRows = JSON.parse(xhr.responseText);

    }
    xhr.open("get", "./phps/getLocation.php", true);
    xhr.send(null);
    //============去server端拿住宿資料
    let hotelRows;
    let xhrHotel = new XMLHttpRequest();
    xhrHotel.onload = function () {
        tourCreate.hotelRows = JSON.parse(xhrHotel.responseText);

    }
    xhrHotel.open("get", "./phps/getHotel.php", true);
    xhrHotel.send(null);
    //============去server端拿餐廳資料
    let restRows;
    let xhrRest = new XMLHttpRequest();
    xhrRest.onload = function () {
        tourCreate.restRows = JSON.parse(xhrRest.responseText);

    }
    xhrRest.open("get", "./phps/getRest.php", true);
    xhrRest.send(null);
    //============去server端拿活動資料
    let actRows;
    let xhrAct = new XMLHttpRequest();
    xhrAct.onload = function () {
        tourCreate.actRows = JSON.parse(xhrAct.responseText);

    }
    xhrAct.open("get", "./phps/getAct.php", true);
    xhrAct.send(null);
})


Vue.component('tea', {
    props: ['locations'],
    data() {
        return {

        }
    },
    methods: {
        storagelocation(name, id) {
            storage['location'] = name;
            storage['locationId'] = id;
            storage['gardID'] = id;
            this.$emit('click-plus-location');
        },
        showLightBox(boxName, boxContent, boxAddress, boxImg, gardID) {
            storage['boxName'] = boxName;
            storage['boxContent'] = boxContent;
            storage['boxAddress'] = boxAddress;
            storage['boxImg'] = boxImg;
            storage['gardID'] = gardID;
            this.$emit('show-light-box');


        }
    },
    template: `
 <div class="tourCreate_item_block" id="tea" >
    <div class="tourCreate_item" v-for=" location in locations">
        <div class="tourCreate_item_img">
            <img :src=location.GARD_PIC alt="">
        </div>
        <div class="tourCreate_item_text">
            <h3>{{location.GARD_NAME}}</h3>
            <p>{{location.GARD_CONTENT}}</p>
            <div class="viewBtn">
                <button class="viewBtn" @click="showLightBox(location.GARD_NAME,location.GARD_CONTENT,location.GARD_ADDRESS,location.GARD_PIC,location.GARD_ID)">預覽</button>
            </div>
        </div>
        <div class="add" @click="storagelocation(location.GARD_NAME,location.GARD_ID)"><img src="./images/tour/add.png" alt="">
        </div>

    </div>
</div>
    `,
    mounted() {

    }
});
Vue.component('hotel', {
    props: ['hotels', 'choiceTea'],

    data() {
        return {


        }
    },
    methods: {
        storagelocation(hotelName, id) {
            storage['hotel'] = hotelName;
            storage['hotelId'] = id;
            storage['hotelID'] = id
            this.$emit('click-plus-hotel');
        },
        showLightBox(boxName, boxContent, boxImg, hotelID) {
            this.$emit('show-light-box');
            storage['boxName'] = boxName;
            storage['boxContent'] = boxContent;
            storage['boxImg'] = boxImg;
            storage['hotelID'] = hotelID;

        }
    },
    template: `
    <div class="tourCreate_item_block" id="hotel">
    <div class="tourCreate_item" v-for="hotel in hotels" v-show="hotel.GARD_NAME==choiceTea">
        <div class="tourCreate_item_img">
            <img :src=hotel.HOTEL_IMG alt="">
        </div>
        <div class="tourCreate_item_text">
            <h3>{{hotel.HOTEL_NAME}}</h3>
            <p>{{hotel.HOTEL_INFRO}}</p>
            <div class="viewBtn">
                <button class="viewBtn" @click="showLightBox(hotel.HOTEL_NAME,hotel.HOTEL_INFRO,hotel.HOTEL_IMG,hotel.HOTEL_ID)">預覽</button>
            </div>
        </div>
        <div class="add" @click="storagelocation(hotel.HOTEL_NAME,hotel.HOTEL_ID)"><img src="./images/tour/add.png" alt="">
        </div>
        
    </div>
</div>
    `,
});
Vue.component('rest', {
    props: ['rests', 'choiceTea'],
    data() {
        return {

        }
    },
    methods: {
        storagelocation(name, id) {
            if (storage.getItem('rest1') && storage.getItem('rest2') == undefined) {
                storage['rest2'] = name;
                if (storage.getItem('rest2') == storage.getItem('rest1')) {
                    alert('餐廳不可以重複喔');
                    storage.removeItem('rest2');

                } else {
                    storage['rest2Id'] = id;
                    storage['restID'] = id;
                    this.$emit('click-plus-rest2');
                }

            } else if (storage.getItem('rest2')) {
                storage['rest3'] = name;
                if (storage.getItem('rest3') == storage.getItem('rest1')) {
                    storage.removeItem('rest3');
                    alert('餐廳不可以重複喔');

                } else if (storage.getItem('rest3') == storage.getItem('rest2')) {
                    storage.removeItem('rest3');
                    alert('餐廳不可以重複喔');

                } else {
                    storage['rest3Id'] = id;
                    storage['restID'] = id;
                    this.$emit('click-plus-rest');
                }


            } else {
                storage['rest1'] = name;
                storage['rest1Id'] = id;
                storage['restID'] = id;
                this.$emit('click-plus-rest1');
            }
        },
        showLightBox(boxName, boxContent, boxImg, restID) {
            storage['boxName'] = boxName;
            storage['boxContent'] = boxContent;
            storage['boxImg'] = boxImg;
            storage['restID'] = restID;
            this.$emit('show-light-box');

        }
    },
    template: `
    <div class="tourCreate_item_block" id="rest" >
    <div class="tourCreate_item" v-for="rest in rests" v-show="rest.GARD_NAME==choiceTea">
        <div class="tourCreate_item_img">
            <img :src=rest.RESTAURANT_IMG alt="">
        </div>
        <div class="tourCreate_item_text">
            <h3>{{rest.RESTAURANT_NAME}}</h3>
            <p>{{rest.RESTAURANT_INFRO}}</p>
            <div class="viewBtn">
                <button class="viewBtn" @click="showLightBox(rest.RESTAURANT_NAME,rest.RESTAURANT_INFRO,rest.RESTAURANT_IMG,rest.RESTAURANT_ID)">預覽</button>
            </div>
        </div>
        <div class="add" @click="storagelocation(rest.RESTAURANT_NAME,rest.RESTAURANT_ID)"><img src="./images/tour/add.png" alt=""></div>
    </div>
</div>
    `,
});
Vue.component('active', {
    props: ['acts'],
    data() {
        return {

        }
    },
    methods: {
        storageActive(actNAME, id) {
            storage['active'] = actNAME;
            storage['activeId'] = id;
            storage['actID'] = id;
            this.$emit('click-plus-active');
        },
        showLightBox(boxName, boxContent, boxImg, actID) {
            this.$emit('show-light-box');
            storage['boxName'] = boxName;
            storage['boxContent'] = boxContent;
            storage['boxImg'] = boxImg;
            storage['actID'] = actID;

        }
    },
    template: `
    <div class="tourCreate_item_block " id="active">
        <div class="tourCreate_item" v-for="act in acts">
            <div class="tourCreate_item_img">
                <img :src=act.ACTIVE_IMG alt="">
            </div>
            <div class="tourCreate_item_text">
                <h3>{{act.ACTIVE_NAME}}</h3>
                <p>{{act.ACTIVE_INFRO}}</p>
                <div class="viewBtn">
                    <button class="viewBtn" @click="showLightBox(act.ACTIVE_NAME,act.ACTIVE_INFRO,act.ACTIVE_IMG,act.ACTIVE_ID)">預覽</button>
                </div>
            </div>
            <div class="add"><img src="./images/tour/add.png" alt=""></div>
            <div class="add" @click="storageActive(act.ACTIVE_NAME,act.ACTIVE_ID)"><img src="./images/tour/add.png" alt=""></div>
        </div>
    </div>
    `,

});

Vue.component("star-rating", VueStarRating.default, {
    methods: {
        setRating: function (rating) {
            this.rating = "You have Selected: " + rating + " stars";
        },
        showCurrentRating: function (rating) {
            this.currentRating =
                rating === 0
                    ? this.currentSelectedRating
                    : "Click to select " + rating + " stars";
        },
        setCurrentSelectedRating: function (rating) {
            this.currentSelectedRating =
                "You have Selected: " + rating + " stars";
        }
    },
    data: {
        rating: "No Rating Selected",
        currentRating: "No Rating",
        currentSelectedRating: "No Current Rating",
        boundRating: 3,
    }
});


let tourCreate = new Vue({
    el: "#tourCreate",
    data: {
        // ===========資料
        locationRows: [],
        hotelRows: [],
        restRows: [],
        actRows: [],
        // ==============star
        showModal: false,
        showModal2: false,
        // =================右側清單
        nextBtn: false,
        localView: "",
        locationList: "",
        hotelList: "",
        restList1: "",
        restList2: "",
        restList3: "",
        activeList: "",
        content: "tea",
        // =================版面改變=================================================    
        title: "選擇茶園",
        bgcolor1: '#FFF',
        color1: '#4c6e39',
        bgcolor2: '#4c6e39',
        color2: '#FFF',
        bgcolor3: '#4c6e39',
        color3: '#FFF',
        bgcolor4: '#4c6e39',
        color4: '#FFF',
        // ==================lightBox==========================================
        score: true,
        lightBox: false,
        boxName: "",
        boxContent: "",
        boxAddress: "",
        boxImg: "",
        restID: "",
        gardID: "",
        actID: "",
        hotelID: "",
    },
    methods: {
        removeLocationStorage() {
            this.removeHotelStorage();
            this.removeRestStorage();
            this.removeActiveStorage();
            this.content = 'tea';
            storage.removeItem('location');
            this.locationList = "";
            this.nextBtn = false;
            this.title = "選擇茶園";
            this.color1 = "#4c6e39";
            this.bgcolor1 = "#fff";
            this.color2 = "#fff";
            this.bgcolor2 = "#4c6e39";
            this.color3 = "#fff";
            this.bgcolor3 = "#4c6e39";
            this.color4 = "#fff";
            this.bgcolor4 = "#4c6e39";
            storage.clear();
        },
        removeHotelStorage() {
            this.removeRestStorage();
            this.removeActiveStorage();
            this.content = 'hotel';
            storage.removeItem('hotel');
            this.hotelList = "";
            this.nextBtn = false;
            this.title = "選擇住宿";
            this.color2 = "#4c6e39";
            this.bgcolor2 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color3 = "#fff";
            this.bgcolor3 = "#4c6e39";
            this.color4 = "#fff";
            this.bgcolor4 = "#4c6e39";
        },
        removeRestStorage() {
            this.removeActiveStorage();
            this.content = 'rest';
            storage.removeItem('rest1');
            storage.removeItem('rest2');
            storage.removeItem('rest3');
            this.restList1 = "";
            this.restList2 = "";
            this.restList3 = "";
            this.nextBtn = false;
            this.title = "選擇餐廳 (選擇三間)";
            this.color3 = "#4c6e39";
            this.bgcolor3 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color2 = "#fff";
            this.bgcolor2 = "#4c6e39";
            this.color4 = "#fff";
            this.bgcolor4 = "#4c6e39";
        },
        removeActiveStorage() {
            this.content = 'active';
            storage.removeItem('active');
            this.activeList = "";
            this.nextBtn = false;
            this.title = "選擇活動";
            this.color4 = "#4c6e39";
            this.bgcolor4 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color2 = "#fff";
            this.bgcolor2 = "#4c6e39";
            this.color3 = "#fff";
            this.bgcolor3 = "#4c6e39";
        },
        goToNext() {
            this.activeList = storage.getItem('active');
            this.nextBtn = true;
        },
        goToActive() {
            this.restList3 = storage.getItem('rest3');
            this.content = 'active';
            this.title = "選擇活動";
            this.color4 = "#4c6e39";
            this.bgcolor4 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color2 = "#fff";
            this.bgcolor2 = "#4c6e39";
            this.color3 = "#fff";
            this.bgcolor3 = "#4c6e39";

        },
        showRest1() {
            this.restList1 = storage.getItem('rest1');
        },
        showRest2() {
            this.restList2 = storage.getItem('rest2');
        },
        goToHotel() {
            this.locationList = storage.getItem('location');
            this.content = 'hotel';
            this.title = "選擇住宿";
            this.color2 = "#4c6e39";
            this.bgcolor2 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color3 = "#fff";
            this.bgcolor3 = "#4c6e39";
            this.color4 = "#fff";
            this.bgcolor4 = "#4c6e39";

        },
        goToRest() {
            this.hotelList = storage.getItem('hotel');
            this.content = 'rest';
            this.title = "選擇餐廳 (選擇三間)";
            this.color3 = "#4c6e39";
            this.bgcolor3 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color2 = "#fff";
            this.bgcolor2 = "#4c6e39";
            this.color4 = "#fff";
            this.bgcolor4 = "#4c6e39";
        },
        showBox() {
            setTimeout(() => {
                this.boxName = storage.getItem('boxName');
                this.boxContent = storage.getItem('boxContent');
                this.boxAddress = storage.getItem('boxAddress');
                this.boxImg = storage.getItem('boxImg');
                this.restID = storage.getItem('restID');
                this.gardID = storage.getItem('gardID');
                this.actID = storage.getItem('actID');
                this.hotelID = storage.getItem('hotelID');
                storage['locationId'] = this.gardID;
                storage['activeId'] = this.actID;
                storage['hotelId'] = this.hotelID;

                this.lightBox = true;
                if (storage.getItem('boxAddress')) {
                    this.score = true;
                } else {
                    this.score = false;
                }
                if (storage.getItem('rest1') && storage.getItem('rest2') == undefined) {
                    storage['rest2Id'] = this.restID;
                } else if (storage.getItem('rest2')) {
                    storage['rest3Id'] = this.restID;
                } else {
                    storage['rest1Id'] = this.restID;
                }


            }, 1);

        },

        closeBox() {
            this.lightBox = false;
            storage.removeItem('boxName');
            storage.removeItem('boxContent');
            storage.removeItem('boxAddress');
            storage.removeItem('boxImg');
        },

        addBox() {
            if (storage.getItem('location') && storage.getItem('hotel') == undefined) {
                storage['hotel'] = this.boxName;
                this.closeBox();
                this.goToRest();
            } else if (storage.getItem('hotel') && storage.getItem('rest1') == undefined) {
                storage['rest1'] = this.boxName;
                this.closeBox();
                this.showRest1();
            } else if (storage.getItem('rest1') && storage.getItem('rest2') == undefined) {
                storage['rest2'] = this.boxName;

                if (storage.getItem('rest2') == storage.getItem('rest1')) {
                    this.closeBox();
                    alert('餐廳不可以重複喔');
                    storage.removeItem('rest2');

                } else {

                    this.closeBox();
                    this.showRest2();
                }
            } else if (storage.getItem('rest2') && storage.getItem('rest3') == undefined) {
                storage['rest3'] = this.boxName;

                if (storage.getItem('rest3') == storage.getItem('rest1')) {
                    this.closeBox();
                    storage.removeItem('rest3');
                    alert('餐廳不可以重複喔');

                } else if (storage.getItem('rest3') == storage.getItem('rest2')) {
                    storage.removeItem('rest3');
                    alert('餐廳不可以重複喔');
                    this.closeBox();

                } else {
                    this.closeBox();
                    this.goToActive();

                }


            } else if (storage.getItem('rest3') && storage.getItem('active') == undefined) {
                storage['active'] = this.boxName;
                this.closeBox();
                this.goToNext();
            } else if (storage.getItem('location') == undefined) {
                storage['location'] = this.boxName;
                this.closeBox();
                this.goToHotel();
            } else {
                alert("請前往下一步!!!")
            }
        },

    },
    watch: {

    },
    computed: {//也是放函數，放在這裡的函數，不能傳參數，一定要有傳回值(return)
        t1styleChange() {
            return {
                backgroundColor: this.bgcolor1,
                color: this.color1,
            };
        },
        t2styleChange() {
            return {
                backgroundColor: this.bgcolor2,
                color: this.color2,
            };
        },
        t3styleChange() {
            return {
                backgroundColor: this.bgcolor3,
                color: this.color3,
            };
        },
        t4styleChange() {
            return {
                backgroundColor: this.bgcolor4,
                color: this.color4,
            };
        },
    },
    mounted() {

        if (storage.getItem('active')) {
            this.locationList = storage.getItem('location');
            this.hotelList = storage.getItem('hotel');
            this.restList1 = storage.getItem('rest1');
            this.restList2 = storage.getItem('rest2');
            this.restList3 = storage.getItem('rest3');
            this.activeList = storage.getItem('active');
            this.content = "active";
            this.nextBtn = true;
            this.title = "選擇活動";
            this.color4 = "#4c6e39";
            this.bgcolor4 = "#fff";
            this.color1 = "#fff";
            this.bgcolor1 = "#4c6e39";
            this.color2 = "#fff";
            this.bgcolor2 = "#4c6e39";
            this.color3 = "#fff";
            this.bgcolor3 = "#4c6e39";

        } else {
            this.removeLocationStorage();
            storage.clear();
        };



    },
});