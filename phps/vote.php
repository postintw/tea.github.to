<?php 
 
try {
	require_once("./connect.php");
	$sql = "select * , round(GARD_VOTE/GARD_CLICK,1) 'GARD_AVG' from garden where GARD_STATUS = 1 order by GARD_AVG desc";
	// $sql = "select * , round(GARD_VOTE/GARD_CLICK,1) 'GARD_AVG' from garden order by GARD_AVG desc"; //這行正式上線後註解 留上面的
	$garden = $pdo->prepare($sql);
	$garden->execute();
	$gardenRows = $garden->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($gardenRows); //把陣列編碼成json字串傳到前端 echo印出json字串

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>