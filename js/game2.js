//現在要做：分四路，四路都生蟲子進攻而且隨機產生，四路皆能放植物守衛防守//因此要做三維陣列
//由上起算第二路有woromArr、plantArr
//降落星星茶葉打算用tweenMax下降以控制暫停pause(),繼續resume(),碰到邊界要自我刪除kill()
//用var img = document.createElement("img");產生得來的可否能用tweenLiteMax(img,2,{y:9});
/*  
間隔一段時間生成子彈 time_b()包{createBullet()}
createBullet()注意road.appendChild要把road改成要針對的物件
bb_()改成shot(){};for(var k=0;k<3;k++){};
產生子彈，改變 對象.appendChild
time_b()改成Bullet_init
createBullet()改成addBullet(){};
蟲子走路
zom()改成walk(){}
增加蟲子，改變 對象.appendChild
createworm()改成addworm(){}
增加蟲子外函式
zarr()改成worm_init(){addworm();}
*/
var path = {
  plantArr: [[], [], []], bullet: [[], [], []], wormArr: [[], [], []]
},
  way = document.getElementsByClassName('road');
// random = gsap.utils.random([0,1,2,3], true);
//三個道路放置植物
  [...way].forEach(function (el, k) {
      way[k].onclick=function(event){
      //植物可擺放的區間
      if(event.offsetX > 25 && event.offsetX + 50 < this.offsetWidth) {
        if(!!plant && event.target.className !== "action plant") {
          plant.style.left = event.offsetX - 25 + 'px';
          //購買植物减去相應star
          setStar(-plant.dataset.star);
          //放置植物
          this.appendChild(plant);
          //植物數组
          path.plantArr[k].push(plant);
          //戰鬥力為零 不發射子彈
          if(parseInt(plant.dataset.damage) !== 0) {
            //創建子彈
            path.bullet[k].push(addBullet(plant.dataset.speed, plant.dataset.damage, event.offsetX + 25,way[k]));
          }
          //清除道具選中樣式
          clearStyle();
          //清除選中道具
          plant = null;
        }
      }
  }
});
//產生新子彈，本身不加上for(){}
function addBullet(speed, damage, left,o) {
/*   * speed 射速   * damage 傷害   */
  bomb.play();
  var img = document.createElement("img");
  img.className = 'bullet';
  //設置到創建的子彈標籤上
  img.dataset.speed = speed;
  img.dataset.damage = damage;
  img.style.left = left + 'px';
  img.src = ballimg[0];
  // '../dist/images/game/6.gif'
  o.appendChild(img);
  //o換上way[k];
  return img;
}
//init包了for(){}
function Bullet_init(){
  for(var k=0;k<3;k++){
    for(var i = 0; i < path.plantArr[k].length; i++) {
            //戰鬥力不為0
            if(parseInt(path.plantArr[k][i].dataset.damage) !== 0) {
              //創建子彈
              path.bullet[k].push(addBullet(path.plantArr[k][i].dataset.speed, path.plantArr[k][i].dataset.damage, path.plantArr[k][i].offsetLeft + 25,way[k]));
            }
          }
  }

}
//讓子彈飛;path.bullet[k];path.wormArr[k];way[k];
function shot(){
  for(var k=0;k<3;k++){
    for(var i = 0; i < path.bullet[k].length; i++) {
            path.bullet[k][i].style.left = path.bullet[k][i].offsetLeft + parseInt(path.bullet[k][i].dataset.speed) + "px";
            for(var j = 0; j < path.wormArr[k].length; j++) {
              //打到蟲子身上了 -30的原因是 圖片有空白
              if(path.bullet[k][i].offsetLeft + path.bullet[k][i].offsetWidth - 30 >= path.wormArr[k][j].offsetLeft) {
                /*
                 * data-star 所需star數
                 * data-hp hp
                 * data-defense 防禦力
                 * data-damage 攻擊力
                 * data-speed 攻速
                 */
                if(path.bullet[k][i].offsetLeft - path.wormArr[k][j].offsetLeft - path.wormArr[k][j].offsetWidth < 5) {
                  //計算傷害
                  calcDamage(path.wormArr[k][j], path.bullet[k][i]);
                  //受傷狀態的
                  wormState(j, path.wormArr[k][j], path.wormArr[k]);
                  //从地圖中删除
                  way[k].removeChild(path.bullet[k][i]);
                  //从數组中删除
                  path.bullet[k].splice(i, 1);
                  break;
                }
                console.log('left', path.bullet[k][i].offsetLeft);
                
                //打到地圖外 删除子彈
                // if(path.bullet[k][i].offsetLeft + path.bullet[k][i].offsetWidth > road.offsetWidth){
                //   path.bullet[k][i].parentNode.removeChild(path.bullet[k][i]);
                //   //从數组中删除
                //   path.bullet[k].splice(i, 1);
                // }
              }
      }
      if(path.bullet[k][i].offsetLeft + path.bullet[k][i].offsetWidth > way[k].offsetWidth){
                  path.bullet[k][i].parentNode.removeChild(path.bullet[k][i]);
                  //从數组中删除
                  path.bullet[k].splice(i, 1);
                }
          }
  }
}
function addworm(damage, defense, hp, speed,o){
  var img = document.createElement("img");
  img.className = 'createWorm';
  img.src = 'https://tibamef2e.com/ced101/project/g2/images/game/worm-preview.gif';
  img.dataset.damage = damage;
  img.dataset.defense = defense;
  img.dataset.speed = speed;
  img.dataset.HP = hp;
  img.dataset.hp = hp;
  o.appendChild(img);
  return img;
}
function wrom_init(){
  // random = gsap.utils.random([0,1,2,3], true);
  random=parseInt(Math.random()*3);
  path.wormArr[random].push(addworm(20, 5, 30, 1,way[random]));
  // for(var k=0;k<3;k++){
  //     }
}
function walk(){//蟲子走路
  for(let k=0;k<3;k++){
    for(var i = 0,th=path.wormArr[k].length; i < th; i++) {
    path.wormArr[k][i].style.left = path.wormArr[k][i].offsetLeft - parseInt(path.wormArr[k][i].dataset.speed) + "px";
      if (path.wormArr[k][i].offsetLeft + path.wormArr[k][i].offsetWidth < 0) {
        document.querySelector("div.gameover").classList.add("-on");
        gamestop();
        xhrout();
    }
    for(var j = 0; j < path.plantArr[k].length; j++) {
      //蟲子和植物碰上了
      if(path.wormArr[k][i].offsetLeft <= path.plantArr[k][j].offsetLeft + path.plantArr[k][j].offsetWidth) {
        //植物在殭屍之后时 不卡主殭屍
        if(path.plantArr[k][j].offsetLeft + path.plantArr[k][j].offsetWidth - path.wormArr[k][i].offsetLeft < 5) {
          //讓殭屍止步
          path.wormArr[k][i].style.left = path.wormArr[k][i].offsetLeft + parseInt(path.wormArr[k][i].dataset.speed) + "px";
          calcDamage(path.plantArr[k][j], path.wormArr[k][i]);
          plantState(j, path.plantArr[k][j], path.plantArr[k]);
          break;
        }
      }
    }
    }
  }
}
