<!-- 主要表單，移除&修改更新 -->
<?php 
 try {
    require_once("./connect_game.php");
if(isset($_GET['update'])){
    $game=$_GET["NO[]"];
    foreach($game as $i => $data){
	$sql = "update ROLE SET IMG= :IMG,DATA_HPS = :hps,DATA_HP = :hp,DATA_SPEED = :speed,DATA_DAMAGE = :damage,DATA_DEFENSE = :defense from ROLE   where ROLE_NO = :ROLE_NO ";
    $gamerole = $pdo->prepare($sql);    
    $gamerole->bindValue(":IMG", $_GET["pic[]"][$i]);
    $gamerole->bindValue(":star", $_GET["star[]"][$i]);
    $gamerole->bindValue(":hp", $_GET["hp[]"][$i]);
    $gamerole->bindValue(":hps", $_GET["hps[]"][$i]);
    $gamerole->bindValue(":speed", $_GET["speed[]"][$i]);
    $gamerole->bindValue(":damage", $_GET["damage[]"][$i]);
	$gamerole->execute();
    }
}else{
    $game=$_GET["NO[]"];
    foreach($game as $i => $data){
	$sql = "delete from ROLE where ROLE_NO = :ROLE_NO";
    $gamerole = $pdo->prepare($sql);
    $gamerole->bindValue(":ROLE_NO", $_GET["NO[]"][$i]);
	$gamerole->execute();
    }
}
    

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>