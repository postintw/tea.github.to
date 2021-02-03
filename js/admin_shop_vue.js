new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        selecteddealState: '',
        products: '',
        Delprodus: '',
        orders: '',
        // dealStates: ['0(未付款)', '1(已付款)', '2(未出貨)', '3(已出貨)'],
        ONSALE: '',
        psn: '',
        add_NAME: '',
        add_INFO: '',
        add_PRICE: '',
        ord_no: '',
        ORDERS_NO: '',
        lightbox_show: false,
    },

    methods: {
        //函數放這裡

        get_produs: async function () {
            const res = await fetch('./phps/admin_GetProduts.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到products裡面
            this.products = res
        },

        get_orders: async function () {
            const res = await fetch('./phps/admin_GetOrders.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到orders裡面
            this.orders = res
        },

        changeNAME(event, key) {
            console.log(key)
            this.products[key].NAME = event.currentTarget.value
        },
        changeINFO(event, key) {
            this.products[key].INFO = event.currentTarget.value
        },
        changePRICE(event, key) {
            this.products[key].PRICE = event.currentTarget.value
        },

        edit_products: async function (PSN, key) {
            if (this.products[key].ischecked == false) {
                this.ONSALE = 0
            } else if (this.products[key].ischecked == true) {
                this.ONSALE = 1
            }

            const res = await fetch('./phps/admin_UpdProduts.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PSN: PSN,
                    NAME: this.products[key].NAME,
                    INFO: this.products[key].INFO,
                    PRICE: this.products[key].PRICE,
                    ONSALE: this.ONSALE,
                }),
            })

            //燈箱
            this.lightbox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_produs()
        },

        add_products: async function () {
            const res = await fetch('./phps/admin_InsertProds.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //自動增號欄位無法新增 (無法新增psn)
                    add_NAME: this.add_NAME,
                    add_INFO: this.add_INFO,
                    add_PRICE: this.add_PRICE,
                }),
            })
            //新增完後清空輸入的內容
            this.add_NAME = this.add_INFO = this.add_PRICE = ''
            //重新撈取更新後的全部資料
            this.get_produs()
        },

        query_pro_psn: async function () {
            console.log(this.psn)

            const res = await fetch('./phps/admin_QueProds.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    psn: this.psn,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.products = res

            //查詢完後清空輸入的內容
            this.psn = ''
        },

        query_ord: async function () {
            console.log(this.ord_no)

            const res = await fetch('./phps/admin_QueOrds.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ord_no: this.ord_no,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.orders = res

            //查詢完後清空輸入的內容
            this.ord_no = ''
        },

        changeDELIVERY(event, key) {
            console.log(key)
            this.orders[key].DELIVERY = event.currentTarget.value
        },

        changePAY(event, key) {
            console.log(key)
            this.orders[key].PAY = event.currentTarget.value
        },

        changeTOTAL(event, key) {
            console.log(key)
            this.orders[key].TOTAL = event.currentTarget.value
        },

        changeDISCOUNT(event, key) {
            console.log(key)
            this.orders[key].DISCOUNT = event.currentTarget.value
        },

        changeRECEIVER_NAME(event, key) {
            console.log(key)
            this.orders[key].RECEIVER_NAME = event.currentTarget.value
        },

        changeRECEIVER_ADDRESS(event, key) {
            console.log(key)
            this.orders[key].RECEIVER_ADDRESS = event.currentTarget.value
        },

        changeRECEIVER_TEL(event, key) {
            console.log(key)
            this.orders[key].RECEIVER_TEL = event.currentTarget.value
        },
        close_lightbox() {
            this.lightbox_show = false
        },
    },

    created() {
        this.get_produs()
        this.get_orders()
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
                    that.get_produs()
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
        orderdiv: {
            data() {
                return {
                    dealStates: ['0(未付款)', '1(已付款)', '2(未出貨)', '3(已出貨)'],
                    DELIVERY: '',
                    PAY: '',
                    DISCOUNT: '',
                    TOTAL: '',
                    RECEIVER_NAME: '',
                    RECEIVER_ADDRESS: '',
                    RECEIVER_TEL: '',
                    ORDERS_NO: '',
                    DEL_STATE: '',
                    lightBox_show: '',
                }
            },
            props: ['item'],
            template: `    
            <div>
                <div><span>{{item.ORDERS_NO}}</span></div>
                <div><span>{{item.MEMBER}}</span></div>
                <div>
                <span>
                    <select name="訂單狀態" v-model="DEL_STATE">
                        <option v-for="(dealState,index) in dealStates" :value="index">
                            {{dealState}}
                        </option>
                    </select>
                    </span>
                </div>
                <div><span>{{item.ORD_DATE}}</span></div>
                <div>
                <span>               
                    <select v-model="DELIVERY">
                    <option value="0">(0)宅配</option>
                    <option value="1">(1)7-11店到店</option>
                    </select>
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="text"
                        size="3"
                        v-model="PAY"
                    />
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="text"
                        size="1"
                        v-model="DISCOUNT"
                    />
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="text"
                        size="3"
                        v-model="TOTAL"
                    />
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="text"
                        size="3"
                       v-model="RECEIVER_NAME"
                    />
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="text"
                        v-model="RECEIVER_ADDRESS"
                    />
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="text"
                        size="10"
                        v-model="RECEIVER_TEL"
                    />
                    </span>
                </div>
                <div>
                <span>
                    <input
                        type="button"
                        class="btn-delete"
                        @click="edit_orders"
                        value="確認修改"
                    />
                    </span>
                </div>
                <!-- 燈箱 -->
                <div class="overlay" v-if="lightBox_show">
                    <article>
                        <h1>{{inner_text}}</h1>
                        <button type="button" class="btn_modal_close" @click="lightBox_show = false">
                            {{inner_btn_text}}
                        </button>
                    </article>
                </div>
            </div>`,

            computed: {
                // selecteddealState() {
                //     return this.item.DEL_STATE
                // },
            },

            methods: {
                edit_orders: async function () {
                    // console.log('0000')
                    const res = await fetch('./phps/admin_UpdOrds.php', {
                        method: 'POST',
                        mode: 'same-origin',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ORDERS_NO: this.ORDERS_NO,
                            // dealState: this.orders[key].dealState,
                            DELIVERY: this.DELIVERY,
                            PAY: this.PAY,
                            DISCOUNT: this.DISCOUNT,
                            TOTAL: this.TOTAL,
                            RECEIVER_NAME: this.RECEIVER_NAME,
                            RECEIVER_ADDRESS: this.RECEIVER_ADDRESS,
                            RECEIVER_TEL: this.RECEIVER_TEL,
                            DEL_STATE: this.DEL_STATE,
                        }),
                    })

                    //燈箱
                    this.lightBox_show = true
                    this.inner_text = '已修改完成'
                    this.inner_btn_text = '資料已寫入，請安心關閉'

                    this.get_orders()
                },
            },
            created() {},
            mounted() {
                this.DELIVERY = this.item.DELIVERY
                this.DEL_STATE = this.item.DEL_STATE
                this.PAY = this.item.PAY
                this.DISCOUNT = this.item.DISCOUNT
                this.TOTAL = this.item.TOTAL
                this.RECEIVER_NAME = this.item.RECEIVER_NAME
                this.RECEIVER_ADDRESS = this.item.RECEIVER_ADDRESS
                this.RECEIVER_TEL = this.item.RECEIVER_TEL
                this.ORDERS_NO = this.item.ORDERS_NO
            },
        },
    },
})
