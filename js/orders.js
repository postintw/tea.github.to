window.addEventListener('load', init);

function init() {
    let orderInfo = new Vue({
        el: '#orderInfo',
        data: {
            orderInfo: {},
            products: {},

        },
        methods: {

        },
        mounted() {
            setTimeout(() => {
                let xhr = new XMLHttpRequest(),
                    searchURL = window.location.search.split("="),
                    orderNo = searchURL[searchURL.length - 1];
                let url = "./phps/getOrderInfo.php";
                xhr.open("POST", url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                //假登入資料
                // let memNo = '1';
                let memNo = app2.memRows.MEM_NO;
                console.log(memNo)
                let data_info = `orderNo=${orderNo}&memNo=${memNo}`;
                xhr.send(data_info);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        if (xhr.responseText == '無權限') {
                            orderInfo.orderInfo = '無權限';
                        } else {
                            //  console.log(JSON.parse(xhr.responseText)[0]); //讀取json
                            //    console.log(xhr.responseText); //讀取字串
                            orderInfo.orderInfo = JSON.parse(xhr.responseText)[0][0];
                            orderInfo.products = JSON.parse(xhr.responseText)[1];
                        }
                    } else {
                        alert(xhr.status);
                    }
                }
            }, 1000);

        },
        computed: {
            payMethod() {
                if (this.orderInfo.PAY == 0) {
                    return '貨到付款';
                } else if (this.orderInfo.PAY == 1) {
                    return 'ATM付款'
                }
            },
            deliveryMethod() {
                if (this.orderInfo.DELIVERY == 0) {
                    return '宅配';
                } else if (this.orderInfo.DELIVERY == 1) {
                    return '7-11店到店'
                }
            },
            amount() {
                return parseInt(this.orderInfo.TOTAL) + parseInt(this.orderInfo.DISCOUNT)
            }

        },
        components: {
            'item': {
                props: ['NAME', 'IMG', 'PRICE', 'QUANTITY'],
                template: `
        <li>
            <div class="img"><img :src=IMG alt="未取得圖片"></div>
            <div class="aside">
            <h4 class="prodtitle">{{NAME}}</h4>
            <div>數量:<span>{{QUANTITY}}</span></div>
            <input type="hidden" name="10002" value="10002,1,2780">
            <div>單價:<span>{{PRICE}}</span></div>
            <div>小計:<span>{{parseInt(QUANTITY) * parseInt(PRICE)}}</span></div>
            </div>
        </li>
        `,
                data() {
                    return {};
                }

            },
        }
    });
}