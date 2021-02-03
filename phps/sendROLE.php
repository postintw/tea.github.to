<!-- 主要表單，移除&修改更新 -->
<!-- 尚缺資料驗證可否被刪除、被修改 -->
<?php 
 try {
    require_once("connect.php");
if(isset($_REQUEST['update'])){
    $game=$_REQUEST["role_no"];
    foreach($game as $i => $data){
    $sql = "update `role` SET IMG= :IMG,
    DATA_STAR = :star,
    DATA_HP = :hp,
    DATA_HPS = :hps,    
    DATA_SPEED = :speed,
    DATA_DAMAGE = :damage,
    DATA_DEFENSE = :defense
     where ROLE_NO = :ROLE_NO ";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":IMG", $_REQUEST["pic"][$i]);
    $gamerole->bindValue(":star", $_REQUEST["star"][$i]);
    $gamerole->bindValue(":hp", $_REQUEST["hp"][$i]);
    $gamerole->bindValue(":hps", $_REQUEST["hps"][$i]);
    $gamerole->bindValue(":speed", $_REQUEST["speed"][$i]);
	$gamerole->bindValue(":damage", $_REQUEST["damage"][$i]);
    $gamerole->bindValue(":defense", $_REQUEST["defense"][$i]);
    $gamerole->bindValue(":ROLE_NO", $_REQUEST["role_no"][$i]);
	$gamerole->execute();
    }
    // echo "操作完成";
    header("Location: ../admin_tea_beta.html");
}else{
    $game=$_REQUEST["role_no"];
    foreach($game as $i => $data){
	$sql = "delete from `role` where `ROLE_NO` = :ROLE_NO";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":ROLE_NO", $_REQUEST["role_no"][$i]);
	$gamerole->execute();
    }
    echo "刪除成功";
}
} catch (PDOException $e) {
	
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>