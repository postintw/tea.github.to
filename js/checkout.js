var storage = sessionStorage;
window.addEventListener('load', () => {
    setTimeout(() => {
        init()
    }, 1000)
});

function $id(id) { //尋找id
    return document.getElementById(`${id}`);
}

function init() {
    if (app2.memRows.MEM_NO) {
        if ($id('getinfo')) {
            // $id('getinfo').addEventListener('click', storeInfo);
            window.addEventListener('unload', storeInfo)
        }
        if (storage['addItemList'] != "" && storage['addItemList']) {
            let pay = $id('pay');
            if (pay) {
                payDisplay();
                pay.addEventListener('change', payDisplay);

            }
            loaditems();
            loadinfo();
            if ($id('submitBtn')) {
                $id('submitBtn').addEventListener('click', submitForm)
            }
        } else {
            if ($id('orderform')) {
                $id('orderform').innerHTML =
                    `<p style="padding:80px ;text-align:center;">訂單已送出或是購物車內沒有商品。請返回購物車重新操作。<p/>
        <table>
        <tr>
            <td colspan=" 2" class="btn">
                <input type="button" value="回上一頁" onClick="history.go(-1)">
                <input type="button" value="回商城" onClick="location.href= './04_shopping.html';return false;">
            </td>
        </tr>
    </table>`;
            }
        }
    } else {
        alert('請登入後結帳');
        location.href = "./04_cart.html";
    }
}

function payDisplay() {
    let atmAccount = $id('atmAccount'),
        pay = $id('pay');
    if (pay.value == 'ATM付款') {
        atmAccount.setAttribute('style', 'display:table-row')
    } else {
        atmAccount.setAttribute('style', 'display:none')
    }
}

function storeInfo() {
    let infoList = document.getElementsByClassName('info');
    for (let i = 0; i < infoList.length; i++) {
        storage[infoList[i].name] = infoList[i].value;
    };
    // $id('checkForm').submit();
}

function loadinfo() {
    let infoList = document.getElementsByClassName('info');
    for (let i = 0; i < infoList.length; i++) {
        if (storage[infoList[i].name]) {
            infoList[i].setAttribute('value', `${storage[infoList[i].name]}`);
        }
    }
    $id('total').value = parseInt($id('amount').value) - parseInt($id('discount').value);
}


function loaditems() {
    let items = document.getElementById('items');
    if (items) {
        let itemlist = storage['addItemList'];
        itemlist = itemlist.split(',');
        let itemlistLenght = itemlist.length - 1;
        let total = 0;
        for (let i = 0; i < itemlistLenght; i++) {
            itemValue = storage[itemlist[i]].split('|');
            itemName = itemValue[1];
            itemImg = itemValue[2];
            itemPrice = itemValue[3];
            itemNum = itemValue[4];
            itemPrice = itemPrice * itemNum;
            total += itemPrice;
            let newdiv = document.createElement('li');
            // newdiv.setAttribute('class', 'item');
            newdiv.innerHTML = `
                <div class="img"><img src="${itemImg}" alt=""></div>
                <div class='aside'>
                <h4 class="prodtitle">${itemName}</h4>
                <div>數量：<span>${itemNum}</span></div>
                <input type="hidden" name="${itemlist[i]}" value="${itemlist[i]},${itemNum},${itemPrice}">
                <div>價格：<span>${itemPrice}</span></div>
                </div>
                `
            items.appendChild(newdiv);
        };
    }
}

function submitForm(e) {
    e.preventDefault();
    if (storage['addItemList'] == '') {
        alert('您的購物車內沒有物品，請選擇商品後再結帳，謝謝。')
    } else {
        if (confirm('是否確認提交？')) {
            let storage = sessionStorage,
                ItemList = storage['addItemList'].split(',');
            document.getElementById('addItemList').value = storage['addItemList'];
            for (let i = 0; i < ItemList.length - 1; i++) {
                storage.removeItem(ItemList[i]);
            }
            storage.removeItem('amount');
            storage.removeItem('discount');
            storage.removeItem('addItemList');
            $id('orderform').submit();
            return false;
        }
    }
}