const storage = sessionStorage;

//單一商品的卡片
Vue.component('product-card', {
    props: ['product', 'favorite-list'],
    data() {
        return {
            addItemList: shoppingAPP.addItemList,
        }
    },
    template: `
    <div class="product">
        <div>
            <div class="img">
                <a :href="'./04_product.html?psn='+product.PSN">
                    <img :src="product.IMG" alt="">
                </a>
            </div>
            <div class="content">
                <a :href="'./04_product.html?psn='+product.PSN">
                    <h4>{{product.NAME}}</h4>
                    <div class="price"><span>{{product.PRICE}}</span></div>
                    <p>{{product.INFO}}</p>
                </a>
                <div class='btns'>
                    <img class="addFavorite" v-if="favorite" src="./images/common/like.png" alt="" @click='addFavorite()'>
                    <img class="addFavorite" v-else="favorite" src="./images/common/heart.png" alt="" @click='addFavorite()'>
                    <input type="button" value="加入購物車" class="add_cart"  @click='addCart'>
                    <input type="hidden" name="" :value='hiddenValue' class='productInfo' :id="product.PSN">
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        addFavorite() {
            if (app2.memRows.MEM_ID) {
                if (this.favorite) {
                    let index = shoppingAPP.favoriteList.indexOf(this.product.PSN);
                    shoppingAPP.favoriteList.splice(index, 1);
                    shoppingAPP.addcartLBText = '已刪除我的最愛。';
                    shoppingAPP.addcartLB = true;
                } else {
                    shoppingAPP.favoriteList.push(this.product.PSN);
                    shoppingAPP.addcartLBText = '已加入我的最愛。';
                    shoppingAPP.addcartLB = true;
                }
            } else {
                shoppingAPP.addcartLBText = '登入後才能加入我的最愛。';
                shoppingAPP.addcartLB = true;
                app2.lightbox = true;
            }
        },
        addCart() {
            if (storage[this.product.PSN]) {
                shoppingAPP.addcartLBText = '已經在購物車內囉。';
                shoppingAPP.addcartLB = true;
            } else {
                storage[this.product.PSN] = this.hiddenValue;
                storage['addItemList'] += this.product.PSN + ',';
                shoppingAPP.addcartLBText = '已加入購物車。';
                shoppingAPP.addcartLB = true;
            }
        },
    },
    computed: { //組合input的value
        hiddenValue() {
            let product = this.product;
            let value = product.PSN + '|' + product.NAME + '|' + product.IMG + '|' + product.PRICE + '|1|0';
            return value;
        },
        favorite() {
            if (this.favoriteList.indexOf(this.product.PSN) != -1) {
                return true;
            } else {
                return false;
            }
        },

    },
    watch: {
        addItemList() {
            storage['addItemList'] = addItemList
        }
    }
});

const shoppingAPP = new Vue({
    el: "#shoppingAPP",
    data() {
        return {
            Allproducts: [],
            products: [],
            advs: null,
            slickAdvs: true,
            recommends: null,
            perpageNum: 6,
            nowpage: 1,
            slickRecommend: true, //避免slick重複啟動的判定;
            types: ['所有商品', '茶葉', '茶壺', '茶具', '茶杯', '茶罐'],
            selectedtype: '所有商品',
            whatorderby: 'PSN ASC',
            orderbys: [{ //input radio的相關屬性
                    value: "PSN ASC",
                    id: "new",
                    text: " 新到貨",
                },
                {
                    value: "PRICE DESC",
                    id: "highP",
                    text: "價格高&rarr;低",
                },
                {
                    value: "PRICE ASC",
                    id: "lowP",
                    text: "價格低&rarr;高",
                },
                {
                    value: "SOLD DESC",
                    id: "sales",
                    text: "銷售排行",
                }
            ],
            favoriteList: null,
            getfavoriteListFirst: false,
            addItemList: null,
            addcartLB: false,
            addcartLBText: '已加入購物車。',
        }
    },
    mounted() {
        axios
            .all([this.getProducts(this.whatorderby), this.getShoppingAdv(), this.getRecommends('SOLD'), this.getFavoriteList(), ]).then(axios.spread(function (Products, ShoppingAdv, getRecommend, getFavoriteList) {
                shoppingAPP.Allproducts = Products.data;
                shoppingAPP.products = Products.data;
                shoppingAPP.advs = ShoppingAdv.data;
                shoppingAPP.recommends = getRecommend.data;
                let FavoriteList = [],
                    Data = getFavoriteList.data;
                for (let i in getFavoriteList.data) {
                    FavoriteList.push(Data[i].PSN);
                }
                shoppingAPP.favoriteList = FavoriteList;
            }));
        if (storage['addItemList']) {

        } else {
            storage['addItemList'] = '';
        }
    },
    updated() {
        if (this.slickRecommend) {
            $('#recommends').slick({ //啟動slick
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [{
                    breakpoint: 780,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 572,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }],
            });
            this.slickRecommend = false;
        };
        if (this.slickAdvs) {
            $('#shop_advs').slick({
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                infinite: true,
                dots: true,
                slidesToScroll: 1,
                slidesToShow: 1,
            })
            this.slickAdvs = false;
        };

    },
    methods: {
        getProducts(orderby) {
            return axios({
                url: './phps/vue/getproducts_vue.php',
                method: 'get',
                params: {
                    orderby: orderby,
                }
            })
        },
        getShoppingAdv() {
            return axios({
                url: './phps/vue/getShppingAdv_vue.php',
                method: 'get',
            })
        },
        getRecommends(orderby) {
            return axios({
                url: './phps/vue/getRecommends_vue.php',
                method: 'get',
                params: {
                    orderby: orderby,
                }
            })
        },
        getFavoriteList() {
            return axios({
                url: './phps/vue/getFavoriteList_vue.php',
                method: 'get',
            })
        },
        classifyBtn(type) {
            return {
                classifyBtn: true,
                selected: this.selectedtype == type,
            }
        },
        selectedPage(page) {
            return {
                selected_a: this.nowpage == page,
            }
        },
    },
    computed: {
        getPage() {
            totalItem = this.products.length;
            let pages = 0;
            pages += parseInt(totalItem / this.perpageNum);
            pages += (totalItem % this.perpageNum > 0) ? 1 : 0;
            return pages;
        },
        PerpageProduct() {
            const nowpage = this.nowpage,
                products = this.products,
                perpageNum = this.perpageNum;
            let PerpageProduct = [];
            if (nowpage * perpageNum < products.length) {

                for (let j = (nowpage - 1) * perpageNum; j < nowpage * perpageNum; j++) {
                    PerpageProduct.push(this.products[j]);
                };
            } else {
                for (let j = (nowpage - 1) * perpageNum; j < products.length; j++) {
                    PerpageProduct.push(this.products[j]);
                };
            }
            return PerpageProduct;
        },
        watchProducts() {
            return [this.Allproducts, this.selectedtype];
        }
    },
    watch: {
        whatorderby() {
            axios
                .all([this.getProducts(this.whatorderby)]).then(axios.spread(function (Products) {
                    shoppingAPP.Allproducts = Products.data;
                }));

        },
        watchProducts() {
            const Allproducts = this.Allproducts;
            let products = [];
            if (this.selectedtype == '所有商品') {
                products = this.Allproducts;
            } else {
                for (let i in Allproducts) {
                    if (Allproducts[i].TYPE == this.selectedtype) {
                        products.push(Allproducts[i])
                    };
                }
            }
            this.products = products;
        },
        favoriteList() {
            if (this.getfavoriteListFirst) { //第二次開始變動收藏列表時才傳送
                let params = new URLSearchParams();
                params.append('favoriteList', this.favoriteList)
                axios({
                        method: 'post',
                        url: './phps/vue/sendFavoriteList_vue.php',
                        data: params,
                    })
                    .then(function (response) {
                        console.log(response.data)
                    });
            } else {
                this.getfavoriteListFirst = true;
            }
        },
    },

});

function $id(id) { //尋找id
    return document.getElementById(id);
}