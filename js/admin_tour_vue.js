new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        tours: '',
        tour_id_search: '',
        TOUR_ID: '',
        TOUR_STATUS: '',
        lightbox_show: false,
    },

    methods: {
        //函數放這裡

        get_tour: async function () {
            const res = await fetch('./phps/admin_GetTours.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到tours裡面
            this.tours = res
        },

        query_tour: async function () {
            console.log(this.tour_id_search)

            const res = await fetch('./phps/admin_QueTours.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tour_id_search: this.tour_id_search,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.tours = res

            //查詢完後清空輸入的內容
            this.tour_id_search = ''
        },

        edit_tours: async function (TOUR_ID, key) {
            if (this.tours[key].ischecked == false) {
                this.TOUR_STATUS = 0
            } else if (this.tours[key].ischecked == true) {
                this.TOUR_STATUS = 1
            }

            const res = await fetch('./phps/admin_UpdTourStatus.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    TOUR_ID: TOUR_ID,
                    TOUR_STATUS: this.TOUR_STATUS,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_tour()
        },

        close_lightbox() {
            this.lightbox_show = false
        },
    },

    created() {
        this.get_tour()
    },

    beforeCreate() {
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
                    that.get_tour()
                } else {
                    console.log('沒有')
                    location.href = 'admin_login.html'
                }
            })
    },
    components: {
        lightbox: {
            data() {
                return {
                    // lightBox_show: false,
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
