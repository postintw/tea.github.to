<?php 
 
try {
	require_once("./connect.php");
	$sql = "select *
    from active";
	$acts = $pdo->prepare($sql);
	$acts->execute();
	$acts = $acts->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($acts);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	echo "系統錯誤, 請通知系統維護人員<br>";
}
?>