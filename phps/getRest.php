<?php 
 
try {
	require_once("./connect.php");
	$sql = "select *
    from restaurant_list b join garden a on b.gard_id = a.gard_id
				join restaurant c on b.restaurant_id = c.restaurant_id
				where c.RESTAURANT_STATUS = 1";
	$rests = $pdo->prepare($sql);
	$rests->execute();
	$rests = $rests->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($rests);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	echo "系統錯誤, 請通知系統維護人員<br>";
}
?>