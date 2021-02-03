<?php 
 session_start();
try {
	require_once("./connect.php");
    $sql = "insert into garden_msg (GARD_ID, MEM_NO, MSG_DATE, MSG_CONTENT, MSG_CONTENT_STATUS)
            values (:GARD_ID, :MEM_NO, NOW(), :MSG_CONTENT, 1)";
    $words = $pdo->prepare($sql);
	$MEM_NO = $_SESSION["MEM_NO"];
	$words->bindValue(":MEM_NO", $MEM_NO);
    $words->bindValue(":GARD_ID", $_POST["GARD_ID"]);
    $words->bindValue(":MSG_CONTENT", $_POST["MSG_CONTENT"]);
	$words->execute();

	

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>