<?php 
 session_start();
try {
	require_once("./connect.php");//刪除收藏資料
    $sql = "delete from tour_collect where TOUR_ID = :TOUR_ID and MEM_NO = :MEM_NO"; 
    $dislike = $pdo->prepare($sql);
    //取得欲收藏的揪團編號
    $dislike->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
    //取得會員資料
    $MEM_NO = $_SESSION["MEM_NO"];
    $dislike->bindValue(":MEM_NO", $MEM_NO);
    $dislike->execute();


 

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>