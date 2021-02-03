window.addEventListener("load", function () {
    let like = document.getElementsByClassName('like');
    for (var i = 0; i < like.length; i++) {
        like[i].addEventListener("click", changeHeart)
    }
    function changeHeart() {
        if (this.title == "加入收藏") {
            this.title = "取消收藏";
            this.src = "./images/common/like.png";
        } else {
            this.title = "加入收藏";
            this.src = "./images/common/heart.png";
        }
    }
})