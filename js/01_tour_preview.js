let storage = sessionStorage;


window.addEventListener("load", function () {
    $('#formSubmit').on('submit', function () {
        $.ajax({
            url: './phps/tourInsert.php', // 要傳送的頁面
            method: 'POST',               // 使用 POST 方法傳送請求
            dataType: 'text',             // 回傳資料會是 json 格式
            data: $('form').serialize(),  // 將表單資料用打包起來送出去
            success: function (res) {       // 成功以後會執行這個方法

                preview.successBox = true;
            },
            error: function (err) {
                alert('資料傳輸有誤!!');



            },
        });
        return false;  // 阻止瀏覽器跳轉到 send.php，因為已經用 ajax 送出去了
    });
    //============去server端拿茶園資料
    let locationRows;
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        preview.locationRows = JSON.parse(xhr.responseText);

    }
    xhr.open("get", "./phps/getLocation.php", true);
    xhr.send(null);
    //============去server端拿住宿資料
    let hotelRows;
    let xhrHotel = new XMLHttpRequest();
    xhrHotel.onload = function () {
        preview.hotelRows = JSON.parse(xhrHotel.responseText);

    }
    xhrHotel.open("get", "./phps/getHotel.php", true);
    xhrHotel.send(null);
    //============去server端拿餐廳資料
    let restRows;
    let xhrRest = new XMLHttpRequest();
    xhrRest.onload = function () {
        preview.restRows = JSON.parse(xhrRest.responseText);

    }
    xhrRest.open("get", "./phps/getRest.php", true);
    xhrRest.send(null);
    //============去server端拿活動資料
    let actRows;
    let xhrAct = new XMLHttpRequest();
    xhrAct.onload = function () {
        preview.actRows = JSON.parse(xhrAct.responseText);

    }
    xhrAct.open("get", "./phps/getAct.php", true);
    xhrAct.send(null);


})
let preview = new Vue({
    el: "#preview",
    data: {
        gardId: "",
        hotelId: "",
        nowPeople: 0,
        previewImg: "",
        img: "",
        tourName: "",
        today: "",
        people: "",
        leader: "",
        deadDate: "",
        activeDate: "",
        intro: "",
        introPs: "",
        locationList: "",
        hotelList: "",
        restList1: "",
        restList2: "",
        restList3: "",
        activeList: "",
        restId1: "",
        restId2: "",
        restId3: "",
        status: 1,
        // ===========資料
        locationRows: [],
        hotelRows: [],
        restRows: [],
        actRows: [],
        //-============successBox
        successBox: false,


    },
    method: {

    },

    mounted() {

        this.previewImg = storage.getItem('preview_img');
        this.tourName = storage.getItem('tourName');
        this.people = storage.getItem('people');
        this.leader = storage.getItem('leader');
        this.today = storage.getItem('today');
        this.deadDate = storage.getItem('deadDate');
        this.activeDate = storage.getItem('activeDate');
        this.intro = storage.getItem('intro');
        this.introPs = storage.getItem('introPs');
        this.locationList = storage.getItem('location');
        this.hotelList = storage.getItem('hotel');
        this.restList1 = storage.getItem('rest1');
        this.restList2 = storage.getItem('rest2');
        this.restList3 = storage.getItem('rest3');
        this.activeList = storage.getItem('active');
        this.restId1 = storage.getItem('rest1Id');
        this.restId2 = storage.getItem('rest2Id');
        this.restId3 = storage.getItem('rest3Id');
        this.gardId = storage.getItem('locationId');
        this.hotelId = storage.getItem('hotelId');
        this.img = storage.getItem('img');

    },

});