$(function () {
    $("#deaddatepicker").datepicker({ dateFormat: "yy-mm-dd" });
    $("#deaddatepicker").datepicker().on("change", function (e) {
        form.$data.deadDate = $(this).val();
    });
    $("#activedatepicker").datepicker({ dateFormat: "yy-mm-dd" });
    $("#activedatepicker").datepicker().on("change", function (e) {
        form.$data.activeDate = $(this).val();
    });
});

let storage = sessionStorage;
function doFirst() {
    document.getElementById('theFile').onchange = fileChange;
}
function fileChange() {
    let image = document.getElementById('image');
    let file = document.getElementById('theFile').files[0];
    let fileSize = Math.round((file.size / (1024 * 1024)) * 100) / 100;
    form.imgSize = fileSize;
    let readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function () {
        image.src = readFile.result;
        image.style.maxWidth = '500px';
        image.style.maxHeight = '400px';
    });
    if (fileSize > 5) {
        form.imgWarn = "*檔案大小不可超過5M";
    } else {
        form.imgWarn = "";
        storage['img'] = `./images/tour/tour/${file.name}`;

    }

}
window.addEventListener('load', doFirst);


var form = new Vue({
    el: "#form",
    data: {
        previewImg: "./images/discuss/uploadimg.png",
        tourName: "",
        today: this.dateFormat,
        people: "",
        peopleAtt: "",
        leader: "需要",
        deadDate: "",
        activeDate: "",
        deadDateAtt: "",
        activeDateAtt: "",
        intro: "",
        intrText: 100,
        introPs: "",
        introPsText: 100,
        imgWarn: "",
        imgSize: "",

    },
    methods: {
        dateFormat() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return year + "-" + month + "-" + day;
        },
        warn() {
            if (this.people > 30) {
                this.peopleAtt = "*人數最多30人";
            } else if (this.people <= 0) {
                this.peopleAtt = "*人數不可以是負值或0";
            } else {
                this.peopleAtt = "";
            }
        },
        checkText() {

            this.intrText = 100 - this.intro.length;



        },
        checkPsText() {
            this.introPsText = 100 - this.introPs.length;
        },
        goToNext() {
            storage['tourName'] = this.tourName;
            storage['people'] = this.people;
            storage['leader'] = this.leader;
            storage['today'] = this.today;
            storage['deadDate'] = this.deadDate;
            storage['activeDate'] = this.activeDate;
            storage['intro'] = this.intro;
            storage['introPs'] = this.introPs;
        }


    },
    watch: {
        deadDate: {
            handler(newdeadDate, olddeadDate) {

                if (this.deadDate < this.today) {
                    this.deadDateAtt = "*截止日期不可小於發起日期"
                } else {
                    this.deadDateAtt = ""

                }
            },
            immediate: true,  //false bu default, 當Vue instance一建立就立刻執行watch
            deep: true,       //false bu default, 見下一個程式
        },
        activeDate: {
            handler(newdeadDate, olddeadDate) {

                if (this.activeDate < this.deadDate) {
                    this.activeDateAtt = "*出團日期不可小於截止日期"
                } else {
                    this.activeDateAtt = ""

                }
            },
            immediate: true,  //false bu default, 當Vue instance一建立就立刻執行watch
            deep: true,       //false bu default, 見下一個程式
        },
    },

    beforeMount() {

    },
    mounted() {
        if (storage.getItem('introPs')) {


            this.today = this.dateFormat();
            this.tourName = storage.getItem('tourName');
            this.people = storage.getItem('people');
            this.leader = storage.getItem('leader');
            this.today = storage.getItem('today');
            this.deadDate = storage.getItem('deadDate');
            this.activeDate = storage.getItem('activeDate');
            this.intro = storage.getItem('intro');
            this.introPs = storage.getItem('introPs');
            this.checkText();
            this.checkPsText();
        } else {
            this.today = this.dateFormat();
        }


    },
})