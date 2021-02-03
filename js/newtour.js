window.addEventListener("load", function () {
    let tourNum = 3;
    let tourBlock = document.getElementById("tourBrowseBlock");
    for (var i = 0; i < tourNum; i++) {
        let newTour = document.createElement('div');
        tourBlock.appendChild(newTour);
        newTour.setAttribute('class', 'tour_block');
        newTour.innerHTML = `
        <div class="tour_img">
                    <img src="./images/tour/tour1.jpg" alt="">
        </div>
        <div class="love_share">
            <div class="love">
                <img class="like" src="./images/common/heart.png" title="加入收藏" alt="">
            </div>
            <div class="fb-share-button" data-href="http://127.0.0.1:5501/07_vote_more.html" data-layout="button" data-size="small">
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A5501%2F07_vote_more.html&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                    分享
                </a>
            </div>
        </div>
                  
                            <div class="tour_text">
                                <h3>活動名稱</h3>
                                <p>舞鶴茶園一日遊</p>
                                <h3>活動日期</h3>
                                <p>2020/12/30</p>
                                <h3>截止揪團日期</h3>
                                <p>2020/12/25</p>
                                <h3>目前剩餘名額</h3>
                                <p>14/16</p>
                                <h3>預估費用</h3>
                                <p>$7800NT</p>
                            </div>
                            <div class="tourBtn">
                                <button type="button"> 立即報名</button>
                            </div>
                            <div class="box11_ribbon"></div>  
        `;

    }

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