/* * data-star 所需star數 * data-hp hp 當前血量 * data-HP 總血量 * data-defense 防御力 * data-damage 攻擊力
 * data-speed 攻速 */
/* star 星星數 * starTimer  星星降落間 * map 地圖 * road 路 * starNumber 展示分數的標籤
 * props 道具欄 * plant 當前要種的植物 圖片 * plantArr 全體植物 * bullet 發射的子彈 * zombies 僵屍數組
 * score 計分 初始值0 */
var song = new Audio("https://tibamef2e.com/ced101/project/g2/yisell_sound_2008041015324213582_88011.mp3"),
  bomb = new Audio("https://tibamef2e.com/ced101/project/g2/pon.mp3"),
  keydown=new Audio("https://tibamef2e.com/ced101/project/g2/download-complete.wav");
song.loop = true;
var star = 25,
  score = 0,
  score_out = document.getElementById('score');
  starTimer = 3000,
  map = document.getElementById("map"),
  road = document.getElementById("road"),
  starNumber = document.getElementById("star-number"),
  props = document.getElementById("props"),
  plant = null,
  plantArr = [],
  bullet = [],
  wormArr = [],
  leaf_i=-1
  leaf=[],
  demo = {score:0}
  demo2={score:0};
  var init_worm,
  init_walk,
  init_Bullet,
  init_shot,
  ballimg=['https://tibamef2e.com/ced101/project/g2/images/game/6.gif'];
var sp_,
  time_b_,
  bb__,
  zom_, zarr_;

var tm= new TimelineMax();
//事件委托
map.onclick = function(e) {
  //選擇道具，傳入事件tag名稱 和類別名稱 和 檢查能源是否足夠
  if(e.target.tagName === "IMG" && e.target.className === "plant"&& e.target.dataset.star <= star) {
      clearStyle();
      e.target.className = "action plant";
      plant = e.target.cloneNode();
  }
  //當點擊時给star能源
  if(e.target.tagName === "IMG" && e.target.className === "star") {
    setStar(10);
    //誰被點擊 this就是誰 parentNode 就是 this的 父節點
    e.target.parentNode.removeChild(e.target);
  }
}
//放置植物
road.onclick = function(event) {
  //植物可擺放的區間
  if(event.offsetX > 25 && event.offsetX + 50 < this.offsetWidth) {
    if(!!plant && event.target.className !== "action plant") {
      plant.style.left = event.offsetX - 25 + 'px';
      //購買植物减去相應star
      setStar(-plant.dataset.star);
      //放置植物
      this.appendChild(plant);
      //植物數组
      plantArr.push(plant);console.log(plantArr)
      //戰鬥力為零 不發射子彈
      if(parseInt(plant.dataset.damage) !== 0) {
        //創建子彈
        bullet.push(createBullet(plant.dataset.speed, plant.dataset.damage, event.offsetX + 25));
      }
      //清除道具選中樣式
      clearStyle();
      //清除選中道具
      plant = null;
    }
  }
}
//清除道具選中樣式
function clearStyle() {
  var t = props.getElementsByTagName("img");
  for(var i = 0; i < t.length; i++) {
    t[i].className = "plant";
  }
}
//設置星星數 减去傳回負數、加则傳回正數
function setStar(n) {
  star += n;
  starNumber.innerText = star;
}
// 生成僵屍蟲子
function createworm(damage, defense, hp, speed) {
  var img = document.createElement("img");
  img.className = 'createWorm';
  img.src = 'https://tibamef2e.com/ced101/project/g2/images/game/worm-preview.gif';
  img.dataset.damage = damage;
  img.dataset.defense = defense;
  img.dataset.speed = speed;
  img.dataset.HP = hp;
  img.dataset.hp = hp;
  img.dataset.speed = speed;
  road.appendChild(img);
  return img;
}

function zarr(){
  wormArr.push(createworm(20, 5, 30, 1));
}

// 生成子彈
function createBullet(speed, damage, left) {
/*   * speed 射速  * damage 傷害   */
  bomb.play();
  var img = document.createElement("img");
  img.className = 'bullet';
  //設置到創建的子彈標籤上
  img.dataset.speed = speed;
  img.dataset.damage = damage;
  img.style.left = left + 'px';
  img.src = ballimg[0];
  // '../dist/images/game/6.gif'
  road.appendChild(img);
  return img;
}
//降落星星
function sp(){				//創建一个img標籤
        var img = document.createElement("img");
        //给img標籤賦值上我们寫的star class
        img.className = "star";
        //將圖片地址賦值给src
        img.src = "https://tibamef2e.com/ced101/project/g2/images/game/leaf.gif";
        map.appendChild(img);
        //随機生成img的水平位置 而且不能超出地圖
        img.style.left = Math.random() * (map.offsetWidth - img.offsetWidth) + 'px';
        // leaf_i++;
        leaf[leaf.length]=setInterval(function(){
          let objs = document.querySelectorAll('img[src="https://tibamef2e.com/ced101/project/g2/images/game/leaf.gif"]');
          for(var img of objs){
            img.style.top = img.offsetTop + 2 + "px";        //
              if(img.offsetTop >= map.offsetHeight - img.offsetHeight) {
                map.removeChild(img);
              }
          }},100);
      }
// 間隔一段時間生成子彈
function time_b(){
  for(var i = 0; i < plantArr.length; i++) {
          //戰鬥力不為0
          if(parseInt(plantArr[i].dataset.damage) !== 0) {
            //創建子彈
            bullet.push(createBullet(plantArr[i].dataset.speed, plantArr[i].dataset.damage, plantArr[i].offsetLeft + 25));
          }
        }
      }
// 讓子彈飛
function bb_(){
  for(var i = 0; i < bullet.length; i++) {
          bullet[i].style.left = bullet[i].offsetLeft + parseInt(bullet[i].dataset.speed) + "px";
          for(var j = 0; j < wormArr.length; j++) {
            //打到蟲子身上了 -30的原因是 圖片有空白
            if(bullet[i].offsetLeft + bullet[i].offsetWidth - 30 >= wormArr[j].offsetLeft) {
              /*  * data-star 所需star數               * data-hp hp
               * data-defense 防禦力
               * data-damage 攻擊力
               * data-speed 攻速 */
              if(bullet[i].offsetLeft - wormArr[j].offsetLeft - wormArr[j].offsetWidth < 5) {
                //計算傷害
                calcDamage(wormArr[j], bullet[i], 'https://tibamef2e.com/ced101/project/g2/images/game/11-2.gif ');
                //受傷狀態的
                wormState(j, wormArr[j], wormArr);
                //從地圖中删除
                road.removeChild(bullet[i]);
                //從數组中删除
                bullet.splice(i, 1);
                break;
              }
              //打到地圖外 删除子彈              
            }
    }
            if (bullet[i].offsetLeft + bullet[i].offsetWidth > road.offsetWidth) {
              console.log(bullet[i].offsetLeft);
                        bullet[i].parentNode.removeChild(bullet[i]);
                        //從數组中删除
                        bullet.splice(i, 1);
                      }
        }}
// 蟲子走路
function zom(){
  for(var i = 0,th=wormArr.length; i < th; i++) {
  wormArr[i].style.left = wormArr[i].offsetLeft - parseInt(wormArr[i].dataset.speed) + "px";
    if (wormArr[i].offsetLeft + wormArr[i].offsetWidth < 0) {
    document.querySelector("div.gameover").classList.add("-on");
      gamestop();//停止遊戲
      xhrout();
  }
  for(var j = 0; j < plantArr.length; j++) {
    //蟲子和植物碰上了
    if(wormArr[i].offsetLeft <= plantArr[j].offsetLeft + plantArr[j].offsetWidth) {
      /*       * data-star 所需star數       * data-hp hp       * data-defense 防御力       * data-damage 攻擊力
       * data-speed 攻速       */
      //植物在蟲子之后时 不卡主蟲子
      if(plantArr[j].offsetLeft + plantArr[j].offsetWidth - wormArr[i].offsetLeft < 5) {
        //讓蟲子止步
        wormArr[i].style.left = wormArr[i].offsetLeft + parseInt(wormArr[i].dataset.speed) + "px";
        calcDamage(plantArr[j], wormArr[i]);
        plantState(j, plantArr[j], plantArr);
        break;
      }
    }
  }
}}

//計算真實傷害
function calcDamage(keep, attack) {
  /*   * kepp 被攻擊方   * attack 攻擊方   */
  //計算减免的傷害值 百分比*傷害
  var breaks = keep.dataset.defense / 100 * attack.dataset.damage;
				//减血
	keep.dataset.hp = keep.dataset.hp - (attack.dataset.damage - breaks);
}
function kill(index,role,roleArr){
  //如果生命值hp歸零，則刪除陣列中以及地圖上的角色，角色有plant、worm。
  if(parseInt(role.dataset.hp) <= 0) {
    if (!role.classList.contains("plant")) {
      //只要不是植物plant的列入擊殺得分
      score+=role.dataset.HP*1;
      document.getElementById('score').innerText = score;
    }
    roleArr.splice(index, 1);
    role.parentNode.removeChild(role);
  }
}

//植物狀態
function plantState(index, plant, plantArr) {
  //受傷啦 上绷带
  console.log(plant.dataset.hps);
  if(plant.dataset.hps * 0.5 > 　parseInt(plant.dataset.hp)) {
    if(parseInt(plant.dataset.damage) !== 0) {
      plant.src = './images/game/5.png';
    } else {
      plant.src = './images/game/Wallnut_cracked2.png';
    }
    kill(index,plant,plantArr);
  }
}
//蟲子狀態
function wormState(index, worm, wormArr) {
  //受傷啦 上绷带
  console.log(parseInt(worm.dataset.hp));
  if(worm.dataset.HP * 0.5 > 　parseInt(worm.dataset.hp)) {
    worm.src = 'https://tibamef2e.com/ced101/project/g2/images/game/11-2.gif';
    kill(index,worm,wormArr);
  }
}
document.getElementById('go').onclick = function () {
      song.play();
      sp_= setInterval("sp()", starTimer);//降落茶葉
  		time_b_=	setInterval("time_b()", 9000);//產生子彈
      bb__=setInterval("bb_()", 20);//移動子彈
      zom_=setInterval("zom()", 60);//生蟲
      zarr_ = setInterval("zarr()", 10000);//蟲子走路
      tween.play();
      init_Bullet=setInterval("Bullet_init()",9000);//生子彈
      init_shot=setInterval("shot()",20);//移動子彈
      init_worm=setInterval("wrom_init()",10000);//生蟲
      init_walk = setInterval("walk()", 60);//蟲子走路
      $("div.overlay").addClass("-opacity-zero");
    // 設定隔一秒後，移除相關 class
    setTimeout(function(){
      $("div.overlay").removeClass("-on -opacity-zero");
    }, 1000); // 關閉 Modal
  }
$('div.tea_ency').on('click', function () {
  $('.tea_en').addClass('-on');
});
$('#teatxt-bar1').on('click', function () {
        $("div.tea_en").addClass("-opacity-zero");
    // 設定隔一秒後，移除相關 class
    setTimeout(function(){
      $("div.tea_en").removeClass("-on -opacity-zero");
    }, 1000); // 關閉 Modal
})
$('#config').on('click', function () {
  $('div.setpanel').addClass('-on');
});
function volume(vol) {
  song.volume = vol.value;
}
function ballstyle(path) {
  ballimg[0] = path.value;
}
function config() {
    $("div.setpanel").addClass("-opacity-zero");
    // 設定隔一秒後，移除相關 class
    setTimeout(function(){
      $("div.setpanel").removeClass("-on -opacity-zero");
    }, 1000); // 關閉 Modal
  keydown.play();
}
var pause = document.getElementById('checkbox');
$('#checkbox').on('click', function(){
  if (pause.checked === true) {
    console.log('開始');
      gamestop();
  tween.pause();
  } else {
      sp_= setInterval("sp()", starTimer);//降落茶葉
  		time_b_=	setInterval("time_b()", 9000);//產生子彈
      bb__=setInterval("bb_()", 20);//移動子彈
      zom_=setInterval("zom()", 60);//生蟲
      zarr_ = setInterval("zarr()", 10000);//蟲子走路
      tween.play();
      init_Bullet=setInterval("Bullet_init()",9000);//生子彈
      init_shot=setInterval("shot()",20);//移動子彈
      init_worm=setInterval("wrom_init()",10000);//生蟲
      init_walk = setInterval("walk()", 60);//蟲子走路
  }
});
function xhrout(s = 0) {
  var xhr=new XMLHttpRequest(),out_s=parseInt(score_out.innerText);
  xhr.open("POST","./phps/member_out.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`score=${out_s+ s}`);
  xhr.onload = function () {
    var res = xhr.responseText;
  alert(res);  
  }
}
function gamestop(s=0) {
  document.getElementById('score-over').innerText = score;
  document.getElementById('score-win').innerText = score + s;
  clearInterval(sp_);
  clearInterval(time_b_);
  clearInterval(bb__);
  clearInterval(zom_);
  clearInterval(zarr_);
  for(let i=0; i<leaf.length; i++){
  	clearInterval(leaf[i]);
  }
  clearInterval(init_Bullet);
  clearInterval(init_shot);
  clearInterval(init_worm);
  clearInterval(init_walk);

  leaf=[];
  leaf_i=-1;
  tween.pause();

}

// 開啟 Modal 彈跳視窗
document.getElementById('replay').onclick = function () {
  location.reload();
};

//時間到開啟通關燈箱
var tween = TweenLite.to(demo,300,{
  score:300,
  onUpdate(){
    // scoreDisplay.innerHTML = demo.score.toFixed(0);
  },onComplete:function(){
    gamestop(1000);
    xhrout(1000);
    $(function () {
      $("div.gamewin").addClass("-on");
    });
  }
}).pause();
function member_get() {
  axios.get("./phps/game_point.php").then(function (response) {
    document.getElementsByName('score')[0].value = response.data[0].GAME_POINT;
    document.getElementsByName('member_no')[0].value = response.data[0].MEM_NO;
  });
}
function member_out() {
  var xhr = new XMLHttpRequest(),
   form1 = new Formdata(document.getElementById('send1')); ;  
  xhr.open("GET", './phps/member_out.php');
  xhr.onload = function () {
    alert(xhr.responseText);
  }
  xhr.send(form1);
}
