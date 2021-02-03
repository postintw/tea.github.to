//按左側換右側
window.addEventListener('load', function (e) {
    e.preventDefault()
    function go(i) {
        let program = [
            'admin_admin.html',
            'admin_member.html',
            'admin_tour.html',
            'admin_custom.html',
            'admin_shop.html',
            'admin_report.html',
        ]
        location.href = program[i]
    }
    let menuUl = document.querySelectorAll('ul.nav_list>li>a')
    for (let i = 0; i < menuUl.length; i++) {
        menuUl[i].onclick = function () {
            // menuUl.className = ""
            // menuUl[i].className = "active"
            go(i)
        }
    }

    function checked_admin() {
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
                } else {
                    console.log('沒有')
                    location.href = 'admin_login.html'
                }
            })
    }

    checked_admin()
})
