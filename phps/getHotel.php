<?php 
 
try {
	require_once("./connect.php");
	$sql = "select *
    from hotel_list b join garden a on b.gard_id = a.gard_id
					join hotel c on b.hotel_id = c.hotel_id
					where c.HOTEL_STATUS = 1";
	$hotels = $pdo->prepare($sql);
	$hotels->execute();
	$hotels = $hotels->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($hotels);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	echo "系統錯誤, 請通知系統維護人員<br>";
}
?>