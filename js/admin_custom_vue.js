new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        GARD_ID: '',
        RESTAURANT_ID: '',
        HOTEL_ID: '',
        gardens: '',
        rests: '',
        hotels: '',
        HOTEL_STATUS: '',
        GARD_STATUS: '',
        RESTAURANT_STATUS: '',
        lightbox_show: false,
    },

    methods: {
        //函數放這裡
        //朝廷寫法:created時不撈資料 判斷完才執行get_gards
        checked_admin() {
            let that = this
            const res = fetch('./phps/admin_checked_admin.php ', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(function (data) {
                    return data.json()
                })
                .then((data) => {
                    if (data.ADMIN_ID) {
                        console.log('有')
                        that.get_gards()
                    } else {
                        console.log('沒有')
                        location.href = 'admin_login.html'
                    }
                })
        },

        get_gards: async function () {
            const res = await fetch('./phps/admin_GetGards.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到gardens裡面
            this.gardens = res
        },

        get_rests: async function () {
            const res = await fetch('./phps/admin_GetRests.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到rests裡面
            this.rests = res
        },

        get_hotels: async function () {
            const res = await fetch('./phps/admin_GetHotels.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.hotels = res
        },

        query_gard_id: async function () {
            console.log(this.GARD_ID)

            const res = await fetch('./phps/admin_QueGards.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    GARD_ID: this.GARD_ID,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.gardens = res

            //查詢完後清空輸入的內容
            this.GARD_ID = ''
        },

        query_rest_id: async function () {
            console.log(this.RESTAURANT_ID)

            const res = await fetch('./phps/admin_QueRests.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RESTAURANT_ID: this.RESTAURANT_ID,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.rests = res

            //查詢完後清空輸入的內容
            this.RESTAURANT_ID = ''
        },

        query_hotel_id: async function () {
            console.log(this.HOTEL_ID)

            const res = await fetch('./phps/admin_QueHotels.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    HOTEL_ID: this.HOTEL_ID,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.hotels = res

            //查詢完後清空輸入的內容
            this.HOTEL_ID = ''
        },

        changeHOTEL_NAME(event, key) {
            console.log(key)
            this.hotels[key].HOTEL_NAME = event.currentTarget.value
        },

        changeHOTEL_INFRO(event, key) {
            console.log(key)
            this.hotels[key].HOTEL_INFRO = event.currentTarget.value
        },

        edit_hotels: async function (HOTEL_ID, key) {
            if (this.hotels[key].ischecked == true) {
                this.HOTEL_STATUS = 1
            } else if (this.hotels[key].ischecked == false) {
                this.HOTEL_STATUS = 0
            }

            const res = await fetch('./phps/admin_UpdHotels.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    HOTEL_ID: HOTEL_ID,
                    HOTEL_NAME: this.hotels[key].HOTEL_NAME,
                    HOTEL_INFRO: this.hotels[key].HOTEL_INFRO,
                    HOTEL_STATUS: this.HOTEL_STATUS,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_hotels()
        },

        changeGARD_NAME(event, key) {
            console.log(key)
            this.gardens[key].GARD_NAME = event.currentTarget.value
        },
        changeGARD_TYPE(event, key) {
            console.log(key)
            this.gardens[key].GARD_TYPE = event.currentTarget.value
        },
        changeGARD_ADDRESS(event, key) {
            console.log(key)
            this.gardens[key].GARD_ADDRESS = event.currentTarget.value
        },
        changeGARD_VOTE(event, key) {
            console.log(key)
            this.gardens[key].GARD_VOTE = event.currentTarget.value
        },
        changeGARD_CLICK(event, key) {
            console.log(key)
            this.gardens[key].GARD_CLICK = event.currentTarget.value
        },

        edit_gardens: async function (GARD_ID, key) {
            if (this.gardens[key].ischecked == true) {
                this.GARD_STATUS = 1
            } else if (this.gardens[key].ischecked == false) {
                this.GARD_STATUS = 0
            }

            const res = await fetch('./phps/admin_UpdGardss.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    GARD_ID: GARD_ID,
                    GARD_NAME: this.gardens[key].GARD_NAME,
                    GARD_TYPE: this.gardens[key].GARD_TYPE,
                    GARD_ADDRESS: this.gardens[key].GARD_ADDRESS,
                    GARD_VOTE: this.gardens[key].GARD_VOTE,
                    GARD_CLICK: this.gardens[key].GARD_CLICK,
                    GARD_STATUS: this.GARD_STATUS,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_gards()
        },

        changeRESTAURANT_NAME(event, key) {
            console.log(key)
            this.rests[key].RESTAURANT_NAME = event.currentTarget.value
        },
        changeRESTAURANT_INFRO(event, key) {
            console.log(key)
            this.rests[key].RESTAURANT_INFRO = event.currentTarget.value
        },

        edit_rests: async function (RESTAURANT_ID, key) {
            var ONSHELF
            if (this.rests[key].ischecked == true) {
                ONSHELF = '1' //上架
            } else {
                ONSHELF = '0' //下架
            }

            const res = await fetch('./phps/admin_UpdRests.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RESTAURANT_ID: RESTAURANT_ID,
                    RESTAURANT_NAME: this.rests[key].RESTAURANT_NAME,
                    RESTAURANT_INFRO: this.rests[key].RESTAURANT_INFRO,
                    RESTAURANT_STATUS: ONSHELF,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_rests()
        },
        close_lightbox() {
            this.lightbox_show = false
        },
    },

    created() {
        // this.get_gards()
        this.checked_admin()
        this.get_rests()
        this.get_hotels()
    },
    mounted() {
        // this.get_gards()
        // this.get_rests()
        // this.get_hotels()
    },

    components: {
        lightbox: {
            data() {
                return {
                    // lightbox_show: false,
                    inner_text: '已修改完成',
                    inner_btn_text: '資料已寫入，請安心關閉',
                }
            },
            props: [],
            template: `
          <div class="overlay" >
            <article>
                <h1>{{inner_text}}</h1>
                <button type="button" class="btn_modal_close" @click="close_lightbox">
                {{inner_btn_text}}
                </button>
            </article>
            </div>`,
            methods: {
                close_lightbox() {
                    this.$emit('close_lightbox')
                },
            },
        },
    },
})
