var storage = sessionStorage;

window.addEventListener('load', init);

function $id(id) { //尋找id
    return document.getElementById(id);
}

function init() {
    if (!storage['FavortieList']) {
        storage['FavortieList'] = '';
    }
    if (!storage['addItemList']) {
        storage['addItemList'] = '';
    }
    //如果是商城首頁的話
    if ($id('products')) {
        getproducts('所有商品', 'PSN_DESC');
        classifyBtnsSelect();
        orderBtn();
        getAdvProduct();
    };
    //如果有推薦商品
    if ($id('recommends')) {
        getRecommends(1);
        addcartalert();
        setTimeout(() => {
            if (app2.memRows.MEM_ID) { //如果有登入
                getFavortieList();
                console.log('啟動取得最愛')
            } else {
                storage['FavortieList'] = '';
            }
        }, 500);
    }
    //如果是產品頁面
    if ($id('add_cart')) {
        productPageBtn();
        $id('productInfo').querySelector('.addFavorite').addEventListener('click', addFavorite);
    }
    //如果是有購物車清單
    if ($id('cart_content')) {
        loadcart();
    }
    if ($id('totalAmount')) {
        calcAmount();
    }
    //如果有總額
    if ($id('totalBtn')) {
        loadDisPoint();
        dicountBtn();
    }
};

function getproducts(type, orderby) {
    let xhr = new XMLHttpRequest();
    let url;
    xhr.onload = function () {
        if (xhr.status == 200) {
            let products = JSON.parse(xhr.responseText);
            $id('products_container').innerHTML = "";
            let perpageNum = 6;
            let pages = getPage(products, perpageNum);
            $id('pages').innerHTML = '';
            //每次get時先印出第一頁
            loadPerpageProduct(products, perpageNum, 1)
            if (products.length) {
                for (let i = 0; i < pages; i++) {
                    let newli = document.createElement('li');
                    newli.innerHTML = `<a href="">${i+1}</a>`;
                    $id('pages').appendChild(newli);
                    newli.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log(e.target);
                        let a = $id('pages').querySelectorAll('a');
                        for (let j = 0; j < a.length; j++) {
                            a[j].setAttribute('class', '');
                        }
                        e.target.setAttribute('class', 'selected_a');
                        let n = e.target.innerText;
                        loadPerpageProduct(products, perpageNum, n)
                    });
                }
                $id('pages').querySelector('a').setAttribute('class', 'selected_a');
            } else {
                $id('products_container').innerHTML = "<div style='padding: 120px;background: #fff;border-radius: 40px;'>此類別商品並無資料。</div>";
            }
        } else {
            alert(xhr.status);
        }
    }
    url = `./phps/getproducts.php?orderby=${orderby}&type=${type}`;
    xhr.open("Get", url, true);
    xhr.send(null);

}

function getAdvProduct() {

    let xhr = new XMLHttpRequest();
    let url;
    xhr.onload = function () {
        if (xhr.status == 200) {
            let advs = JSON.parse(xhr.responseText);
            console.log(advs)
            for (let i = 0; i < advs.length; i++) {
                let newA = document.createElement('a');
                newA.innerHTML = `
               <img src="${advs[i].IMG}" alt="">`
                newA.setAttribute('href', `./04_product.html?psn=${advs[i].PSN}`);
                $id('shop_advs').appendChild(newA);
            }
            $('#shop_advs').slick({
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                infinite: true,
                dots: true,
                slidesToScroll: 1,
                slidesToShow: 1,
            })


        } else {
            alert(xhr.status);
        }
    }
    url = `./phps/getShppingAdv.php`;
    xhr.open("Get", url, true);
    xhr.send(null);
}

function loadPerpageProduct(products, perpageNum, n) {
    $id('products_container').innerHTML = "";
    if (n * perpageNum < products.length) {
        for (let j = (n - 1) * perpageNum; j < n * perpageNum; j++) {
            $id('products_container').appendChild(addProduct(products[j]));
        };
    } else {
        for (let j = (n - 1) * perpageNum; j < products.length; j++) {
            $id('products_container').appendChild(addProduct(products[j]));
        };
    }
}

function addProduct(product) {
    let newproduct = document.createElement('div'); //創建div
    newproduct.setAttribute('class', 'product'); //設定div的class
    newproduct.innerHTML = `
        <div>
            <div class="img">   
                <a href="./04_product.html?psn=${product.PSN}">
                    <img src="${product.IMG}" alt="">
                </a>
            </div>
            <div class="content">
                <a href="./04_product.html?psn=${product.PSN}">
                    <h4>${product.NAME}</h4>
                    <div class="price"><span>${product.PRICE}</span></div>
                    <p>${product.INFO}</p>
                </a>
                <div class='btns'>
                <img class='addFavorite ${product.PSN}' src="./images/common/heart.png" alt="">
                <input type="button" value="加入購物車" class="add_cart">
                <input type="hidden" name="" value='${product.PSN}|${product.NAME}|${product.IMG}|${product.PRICE}|1|0' class='productInfo' id="${product.PSN}">
                </div>
            </div>
        </div>
                            `;


    newproduct.getElementsByClassName('add_cart')[0].addEventListener('click', addItem);
    newproduct.getElementsByClassName('addFavorite')[0].addEventListener('click', addFavorite);
    loadFavorite();
    return newproduct;
}

function classifyBtnsSelect() { //選擇type
    classifyBtns = document.getElementsByClassName('classifyBtn');
    for (let i = 0; i < classifyBtns.length; i++) {
        classifyBtns[i].addEventListener('click', (e) => {
            for (let j = 0; j < classifyBtns.length; j++) {
                classifyBtns[j].setAttribute('class', 'classifyBtn');
            }
            e.target.setAttribute('class', 'classifyBtn selected');
            // let orderby = document.getElementsByName('order');
            let orderby = document.querySelector('input[name=order]:checked').value;
            getproducts(e.target.innerText, orderby);
        });

    }
}

function addItem(e) {
    let itemValue = e.target.parentNode.querySelectorAll('input[type=hidden]')[0].value;
    let itemNo = itemValue.split('|')[0];
    if (storage[`${itemNo}`]) {
        if (e.target.id != 'buy') {
            alertLB('已經在購物車內囉。');
        }
    } else {
        storage[`${itemNo}`] = itemValue;
        storage['addItemList'] += itemNo + ',';
        let cart_content = document.getElementById('cart_content');
        if (cart_content) {
            let newdiv = document.createElement('div');
            newdiv.setAttribute('class', 'item');
            newdiv.setAttribute('id', itemNo);
            newdiv.innerHTML = itemInnerhtml(itemNo);
            cart_content.insertBefore(newdiv, $id('amount'));
            newdiv.querySelector('.drop').addEventListener('click', dropitem);
            newdiv.querySelector('.itemNum').addEventListener('change', changeNum)
            calcAmount();
        };
        if (e.target.id != 'buy') {
            alertLB('已加入購物車。');
        }
    }
}



function loadcart() {
    let itemlist = storage['addItemList'];
    itemlist = itemlist.split(',');
    itemlist.pop();
    for (let i = 0; i < itemlist.length; i++) {
        let newdiv = document.createElement('div');
        newdiv.setAttribute('class', 'item');
        newdiv.setAttribute('id', itemlist[i]);
        newdiv.innerHTML = itemInnerhtml(itemlist[i]);
        $id('cart_content').insertBefore(newdiv, amount);
        newdiv.getElementsByClassName('itemNum')[0].addEventListener('change', changeNum)
        newdiv.getElementsByClassName('drop')[0].addEventListener('click', dropitem)
    };
    calcAmount();
}

function itemInnerhtml(itemNo) {
    let itemValue = storage[itemNo].split('|'),
        itemName = itemValue[1],
        itemImg = itemValue[2],
        itemPrice = itemValue[3],
        itemNum = itemValue[4];
    return `
    <div class="drop">×</div>
    <div class="img">
        <img src="${itemImg}" alt="">
    </div>
    <div class="aside">
        <a href="./04_product.html"><h3>${itemName}</h3></a>
        <div class="content">
            <div class="aboutNum"><span>數量：</span><input type="number" name=""  value="${itemNum}" min='0' max='999' class='itemNum'></div>
            <div class='price'><span>價格：</span><input type="number" name=""  disabled value="${itemPrice}" class='itemPrice'></div>
            <input type="hidden" name="" value='${storage[`${itemNo}`]}' class='productInfo'>
        </div>
    </div>
    `;
}

function dropitem(e) {
    let addItemList = storage['addItemList'].split(','),
        index = addItemList.indexOf(e.target.parentNode.id);
    addItemList.splice(index, 1);
    storage['addItemList'] = addItemList;
    e.target.parentNode.remove();
    storage.removeItem(e.target.parentNode.id);
    calcAmount();
}


function calcAmount() {
    let items = document.getElementsByClassName('item'),
        total = 0;
    for (let i = 0; i < items.length; i++) {
        let p = parseInt(items[i].getElementsByClassName('itemPrice')[0].value),
            n = parseInt(items[i].getElementsByClassName('itemNum')[0].value);
        total += p * n;
    }
    $id('totalAmount').value = total;
    let totalBtn = $id('totalBtn');
    if (totalBtn) {
        dealDisPoint()
        maxDis()
    }
}

function changeNum(e) {
    let num = e.target.value;
    e.target.setAttribute('value', num);
    let ValueBtn = e.target.parentNode.parentNode.querySelectorAll('input[type=hidden]')[0];
    let value = ValueBtn.value.split('|'),
        itemNo = value[0];
    value.splice(-2, 1, num)
    value = value.join('|')
    storage[itemNo] = value;
    if ($id('totalAmount')) {
        calcAmount();
    }
}

function loadDisPoint() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //modify here
            let DisPoint = JSON.parse(xhr.responseText)[0].GAME_POINT;
            console.log(DisPoint)
            $id('myPoint').value = DisPoint;

        } else {
            alert(xhr.status);
        }
        dealDisPoint();
        maxDis();
    }
    var url = "./phps/getDisPoint.php";
    xhr.open("Get", url, true);
    xhr.send(null);
}


function dealDisPoint() {
    var costPoint = document.getElementById('costPoint'),
        price,
        discount = document.getElementById('discount');
    //設定優惠點數的使用上限
    costPoint.addEventListener('change', maxDis);
    price = parseInt(totalAmount.value) - parseInt(discount.value);
    document.getElementById('totalBtn').setAttribute('value', price);
};

function maxDis() {
    let totalAmount = document.getElementById('totalAmount'),
        costPoint = document.getElementById('costPoint'),
        myPoint = document.getElementById('myPoint'),
        dis = document.getElementById('discountprice');
    if (parseInt(totalAmount.value) < parseInt(myPoint.value)) {
        maxPoint = totalAmount.value;
    } else {
        maxPoint = myPoint.value
    }
    costPoint.setAttribute('value', costPoint.value);
    if (parseInt(costPoint.value) > parseInt(maxPoint)) {
        costPoint.setAttribute('value', maxPoint);
        costPoint.value = maxPoint;
    }
    discountprice.setAttribute('value', costPoint.value);
    if (parseInt(totalAmount.value) < parseInt(costPoint.value)) {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
        calcAmount();
    }
    let discount = document.getElementById('discount'),
        totalBtn = document.getElementById('totalBtn');
    if (parseInt(totalBtn.value) < 0) {
        discount.setAttribute('value', maxPoint);
        calcAmount();
    }
}

function dicountBtn() {
    usePoint = document.getElementById('usePoint');
    usePoint.addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:block');
    });
    usePointbtn = document.getElementById('usePointbtn');
    usePointbtn.addEventListener('click', () => {
        if (confirm('使用優惠點數?')) {
            document.getElementById('pointTable').setAttribute('style', 'display:none');
            let dis = document.getElementById('discountprice').value;
            discount.setAttribute('value', dis);
            calcAmount();
        }
    })
    document.getElementById('cancel').addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
    })
}

function addcartalert() {
    if ($id('addcartLB')) {} else {
        let newdiv = document.createElement('div');
        newdiv.setAttribute('id', 'addcartLB');
        newdiv.innerHTML = `<div>
        <span id='closeLB'>×</span><h4 id="addcartLBText">已加入購物車</h4>
        </div>
        `;
        let footer = document.getElementsByTagName('footer')[0];
        document.getElementsByTagName('body')[0].insertBefore(newdiv, footer);
        document.getElementById('closeLB').addEventListener('click', () => {
            addcartLB.style.display = 'none';
        })
        $id('addcartLB').addEventListener('click', () => {
            addcartLB.style.display = 'none';
        })
    }
}

function alertLB(text) {
    document.getElementById('addcartLBText').innerText = text;
    addcartLB = document.getElementById('addcartLB');
    addcartLB.style.display = 'flex';

}


function getRecommends(sold) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //modify here
            let products = JSON.parse(xhr.responseText);
            let recommends = $id('recommends');
            for (let i = 0; i < products.length; i++) {
                recommends.appendChild(addProduct(products[i]));
            };
            recommends.addEventListener('load', function () {

            });
        } else {
            alert(xhr.status);
        }
        $('#recommends').slick({ //啟動slick
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 572,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ],
        });

    }

    var url = "./phps/getRecommends.php?sold=" + sold;

    xhr.open("Get", url, true);
    xhr.send(null);
}

function productPageBtn() {
    $id('add_cart').addEventListener('click', addItem);
    $id('buy').addEventListener('click', addItem);
    $id('buy').addEventListener('click', () => {
        location.href = './04_cart.html'
    });
}


function orderBtn() {
    let orderBtn = $id('orderby').querySelectorAll('input');
    for (let i = 0; i < orderBtn.length; i++) {
        orderBtn[i].addEventListener('change', () => {
            let type = document.querySelector('.selected');
            getproducts(type.innerText, orderBtn[i].value)
        })
    }
}



function addFavorite(e) {
    if (app2.memRows.MEM_ID) {
        let img = e.target.src.split('/');
        let src;
        if (img[img.length - 1] == 'heart.png') {

            src = './images/common/like.png';

            storage['FavortieList'] += e.target.className.split(' ')[1] + ',';
            let t = document.getElementsByClassName(`${e.target.className.split(' ')[1]}`);
            for (let i = 0; i < t.length; i++) {
                t[i].src = src;
            }
            alertLB('已加入我的最愛');

        } else {
            src = './images/common/heart.png';

            let t = document.getElementsByClassName(`${e.target.className.split(' ')[1]}`);
            for (let i = 0; i < t.length; i++) {
                t[i].src = src;
            }
            let FavortieList = storage['FavortieList'].split(','),
                index = FavortieList.indexOf(e.target.className.split(' ')[1]);
            FavortieList.splice(index, 1);
            storage['FavortieList'] = FavortieList;
            alertLB('已取消我的最愛');
        };
        sendFavortieList()
    } else {
        alert('登入後才能加入我的最愛')
    }
}

function loadFavorite() {
    let list = storage['FavortieList'].split(',');
    for (let i = 0; i < list.length - 1; i++) {
        let like = document.getElementsByClassName(list[i]);
        for (let j = 0; j < like.length; j++) {
            let src = './images/common/like.png';

            like[j].setAttribute('src', src)
        }
    }
}

function getFavortieList() {
    console.log('開始取得最愛')
    if (storage['FavortieList'] == undefined) {
        storage['FavortieList'] = '';
    } else {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                //modify here
                let FavortieList = JSON.parse(xhr.responseText);
                FavortieListValue = '';
                for (let i = 0; i < FavortieList.length; i++) {
                    FavortieListValue += FavortieList[i].PSN + ',';
                }
                storage['FavortieList'] = FavortieListValue;
                console.log('開始取得最愛結束')

                loadFavorite()

            } else {
                alert(xhr.status);
            }
        }
        let url = "./phps/getFavoriteList.php";
        xhr.open("Get", url, true);
        xhr.send(null);
    }
}

// window.addEventListener('unload', sendFavortieList)

function sendFavortieList() {
    let xhr = new XMLHttpRequest();
    let memNo = '1';
    //寫入收藏列表
    let url = "./phps/sendFavoriteList.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let favoriteList = storage['FavortieList'];
    // let data_info = `mem_no=${memNo}&favoriteList=${favoriteList}`;
    let data_info = `favoriteList=${favoriteList}`;
    xhr.send(data_info);
    // location.href = url;
    xhr.onload = function () {
        if (xhr.status == 200) {
            // console.log(JSON.parse(xhr.responseText));//讀取json
            console.log(xhr.responseText); //讀取字串
        } else {
            alert(xhr.status);
        }
    }

}

function getPage(totalItem, perpageNum) {
    // totalItem = 34;
    totalItem = totalItem.length;
    let pages = 0;
    pages += parseInt(totalItem / perpageNum);
    pages += (totalItem % perpageNum > 0) ? 1 : 0;
    return pages;
}