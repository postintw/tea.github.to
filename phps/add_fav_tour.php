<?php 
 session_start();
try {
	require_once("./connect.php");
  $sql = "insert into tour_collect (TOUR_ID, MEM_NO) values (:TOUR_ID,:MEM_NO)"; //存入收藏資料
  $like = $pdo->prepare($sql);
  //取得欲收藏的揪團編號
  $like->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
  //取得會員資料
  $MEM_NO = $_SESSION["MEM_NO"];
  $like->bindValue(":MEM_NO", $MEM_NO);
  $like->execute();


 

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>