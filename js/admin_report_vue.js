new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        gardMsgId: '', //茶園留言的檢舉管理
        DissMsgId: '', //討論區留言管理
        DissArtId: '', //討論區文章檢舉管理
        diss_MegReports: '',
        diss_ArtReports: '',
        gardens_MegReports: '',
        MSG_REP_STATUS: '',
        MSG_REP_NO: '',
        AMR_STATUS: '',
        REP_NO: '',
        AR_STATUS: '',
        lightbox_show: false,
        // MSG_CONTENT_STATUS: '',
    },

    methods: {
        //函數放這裡

        get_gardens_MegReports: async function () {
            const res = await fetch('./phps/admin_GetGardsMsgReport.php', {
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
            this.gardens_MegReports = res
        },

        get_diss_MegReports: async function () {
            const res = await fetch('./phps/admin_GetDissMsgReport.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                // 	add_no: this.add_no,
                // 	add_id: this.add_id,
                // 	add_name: this.add_name,
                // 	add_psw: this.add_psw,

                // }),
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.diss_MegReports = res
        },

        get_diss_ArtReports: async function () {
            const res = await fetch('./phps/admin_GetDissArtReport.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                // 	add_no: this.add_no,
                // 	add_id: this.add_id,
                // 	add_name: this.add_name,
                // 	add_psw: this.add_psw,

                // }),
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳
            this.diss_ArtReports = res
        },

        // 查詢茶園留言
        query_gardMsg_id: async function () {
            console.log(this.gardMsgId)

            const res = await fetch('./phps/admin_QueGardMsgReport.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gardMsgId: this.gardMsgId,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.gardens_MegReports = res

            //查詢完後清空輸入的內容
            this.gardMsgId = ''
        },

        // 查詢討論區文章留言
        query_DissArt_id: async function () {
            console.log(this.DissArtId)

            const res = await fetch('./phps/admin_QueDissArt.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DissArtId: this.DissArtId,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.diss_ArtReports = res

            //查詢完後清空輸入的內容
            this.DissArtId = ''
        },

        // 查詢討論區留言
        query_DissMsg_id: async function () {
            console.log(this.DissMsgId)

            const res = await fetch('./phps/admin_QueDissMsgReport.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DissMsgId: this.DissMsgId,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.diss_MegReports = res

            //查詢完後清空輸入的內容
            this.DissMsgId = ''
        },

        change_GarMsgstatus(event, key) {
            // console.log("111")
            this.gardens_MegReports[key].MSG_REP_STATUS = event.currentTarget.value
        },
        edit_gardens_Meg: async function (MSG_REP_NO, key) {
            // if (this.get_gardens_MegReports[key].ischecked == false) {
            //     this.MSG_CONTENT_STATUS = 0
            // } else if (this.get_gardens_MegReports[key].ischecked == true) {
            //     this.MSG_CONTENT_STATUS = 1
            // }
            const res = await fetch('./phps/admin_UpdGardsMsg.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MSG_REP_NO: MSG_REP_NO,
                    MSG_REP_STATUS: this.gardens_MegReports[key].MSG_REP_STATUS,
                    MSG_NO: this.gardens_MegReports[key].MSG_NO,
                }),
            })
            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            //重新撈取更新後的全部資料
            this.get_gardens_MegReports()
        },

        change_DisMegstatus(event, key) {
            console.log(key)
            this.diss_MegReports[key].AMR_STATUS = event.currentTarget.value
        },

        edit_diss_Meg: async function (MSG_REP_NO, MSG_NO, key) {
            // if (this.diss_MegReports[key].ischecked == false) {
            //     this.AMR_STATUS = 1
            // } else if (this.diss_MegReports[key].ischecked == true) {
            //     this.AMR_STATUS = 2
            // }
            console.log(MSG_NO)
            const res = await fetch('./phps/admin_UpdDissMeg.php ', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MSG_REP_NO: MSG_REP_NO,
                    AMR_STATUS: this.diss_MegReports[key].AMR_STATUS,
                    MSG_NO: MSG_NO,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_diss_MegReports()
        },

        change_DisArtStatus(event, key) {
            this.diss_ArtReports[key].AR_STATUS = event.currentTarget.value
        },

        edit_diss_Art: async function (REP_NO, key) {
            // if (this.diss_ArtReports[key].ischecked == false) {
            //     this.AR_STATUS = 1
            // } else if (this.diss_ArtReports[key].ischecked == true) {
            //     this.AR_STATUS = 2
            // }

            const res = await fetch('./phps/admin_UpdDissArt.php ', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    REP_NO: REP_NO,
                    AR_STATUS: this.diss_ArtReports[key].AR_STATUS,
                    ART_NO: this.diss_ArtReports[key].ART_NO,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_diss_ArtReports()
        },

        close_lightbox() {
            this.lightbox_show = false
        },
    },

    created() {
        this.get_gardens_MegReports()
        this.get_diss_MegReports()
        this.get_diss_ArtReports()
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
                    that.get_gardens_MegReports()
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
