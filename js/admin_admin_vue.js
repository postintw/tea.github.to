new Vue({
    el: '#app',
    data: {
        // add_no: '', // auto-increment 不能新增
        add_id: '',
        add_name: '',
        add_psw: '',
        admins: '',
        lightbox_show: false,
    },

    methods: {
        //函數放這裡
        get_admins: async function () {
            const res = await fetch('./phps/admin_GetAdmins.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到admins裡面
            this.admins = res
        },

        insert_admins: async function () {
            if (this.add_id == '' || this.add_name == '' || this.add_psw == '') {
                alert('請先輸入內容')
            } else {
                const res = await fetch('./phps/admin_InsertAdmins.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        //add_no是自動增號
                        // add_no: this.add_no,
                        add_id: this.add_id,
                        add_name: this.add_name,
                        add_psw: this.add_psw,
                    }),
                })

                //新增完後清空輸入的內容
                this.add_id = this.add_name = this.add_psw = ''

                //燈箱
                this.lightbox_show = true
                this.inner_text = '已修改完成'
                this.inner_btn_text = '資料已寫入，請安心關閉'

                //重新撈取更新後的全部資料
                this.get_admins()
            }
        },

        delete_admins: async function (ADMIN_NO) {
            console.log(ADMIN_NO)
            const res = await fetch('./phps/admin_DelAdmins.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ADMIN_NO: ADMIN_NO,
                    // add_id: this.add_id,
                    // add_name: this.add_name,
                    // add_psw: this.add_psw,
                }),
            })
            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'
            //重新撈取一次細項列表
            this.get_admins(this.ADMIN_NO)
        },
        close_lightbox() {
            this.lightbox_show = false
        },
    },

    // created() {
    //     this.get_admins()
    // },

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
                    that.get_admins()
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
