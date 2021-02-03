<?php 
session_start();  //啟用session
try {
	require_once("./connect.php");
  $sql = "insert into tour_join (TOUR_ID, MEM_NO, TOUR_ADD) values (:TOUR_ID,:MEM_NO,1)"; //存入報名資料
  $jtour = $pdo->prepare($sql);
  //取得欲報名的揪團編號
  $jtour->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
  //取得會員資料
  $MEM_NO = $_SESSION["MEM_NO"];
  $jtour->bindValue(":MEM_NO", $MEM_NO);
  $jtour->execute();

  $sql = "update tour set NUM_OF_PARTICIPANTS = NUM_OF_PARTICIPANTS + 1 where TOUR_ID = :TOUR_ID"; //更改參加人數
  $jointo = $pdo->prepare($sql);
  $jointo->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
  $jointo->execute();


  $MEM_NO = $_SESSION["MEM_NO"]; //撈session中的會員
	$sql = "select * from tour_join where MEM_NO = $MEM_NO";
	$tour = $pdo->prepare($sql);
	$tour->execute();
	$memRows = $tour->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>