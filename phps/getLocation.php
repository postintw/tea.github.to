<?php 
 
try {
	require_once("./connect.php");
	$sql = "select * from garden
	where GARD_STATUS = 1";
	$locations = $pdo->prepare($sql);
	$locations->execute();
	$locations = $locations->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($locations);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "系統錯誤, 請通知系統維護人員<br>";
}
?>