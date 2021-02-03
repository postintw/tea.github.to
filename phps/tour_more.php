<?php 
	session_start();  //啟用session
try {
	require_once("./connect.php");
	$sql = "select * from tour join garden on tour.GARD_ID = garden.GARD_ID where TOUR_ID = :TOUR_ID";
	$tour = $pdo->prepare($sql);
	$tour->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$tour->execute();
	$tourRows = $tour->fetchAll(PDO::FETCH_ASSOC);
	
	//找這個會員有參加的所有揪團
	if(isset($_SESSION["MEM_NO"])){
		$sql = "select TOUR_ID from tour_join where MEM_NO = :MEM_NO";
		$tour2 = $pdo->prepare($sql);
		$MEM_NO = $_SESSION["MEM_NO"];
		$tour2->bindValue(":MEM_NO", $MEM_NO);
		$tour2->execute();
		$joinRows_1 = $tour2->fetchAll(PDO::FETCH_ASSOC);
		$joinRows = [];
		for($k=0;$k < count($joinRows_1);$k++){
			array_push($joinRows,$joinRows_1[$k]["TOUR_ID"]);
		};


	}else{
		$joinRows = "{}";
	}
	
	
	$sql = "select * from tour join hotel on tour.HOTEL_ID = hotel.HOTEL_ID where TOUR_ID = :TOUR_ID";
	$hotel = $pdo->prepare($sql);
	$hotel->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$hotel->execute();
	$hotelRows = $hotel->fetchAll(PDO::FETCH_ASSOC);

	$sql = "select * from tour_restaurant join restaurant on tour_restaurant.RESTAURANT_ID = restaurant.RESTAURANT_ID where TOUR_ID = :TOUR_ID";
	$food = $pdo->prepare($sql);
	$food->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$food->execute();
	$foodRows = $food->fetchAll(PDO::FETCH_ASSOC);

	//抓留言
	$sql = "select * from  tour_msg join member on tour_msg.MEM_NO = member.MEM_NO where tour_msg.TOUR_ID = :TOUR_ID and tour_msg.MSG_CONTENT_STATUS = 1";
	$msg = $pdo->prepare($sql);
	$msg->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
	$msg->execute();
	$msgRows = $msg->fetchAll(PDO::FETCH_ASSOC);

	//找出這個會員收藏的所有揪團
	if(isset($_SESSION["MEM_NO"])){
		$sql = "select TOUR_ID from tour_collect where MEM_NO = :MEM_NO";
		$tour3 = $pdo->prepare($sql);
		$MEM_NO = $_SESSION["MEM_NO"];
		$tour3->bindValue(":MEM_NO", $MEM_NO);
		$tour3->execute();
		$loveRows = $tour3->fetchAll(PDO::FETCH_ASSOC);
	}else{
		$loveRows = "{}";
	}
	

	//找此會員是否收藏過此揪團 
	//count(*)為回傳資料筆數 (不是1就是0，1表示有這筆資料即有收藏過，0表示有這筆資料即沒收藏過)
	if(isset($_SESSION["MEM_NO"])){
		$sql = "select count(*) 'like_before' from tour_collect where MEM_NO = :MEM_NO and TOUR_ID = :TOUR_ID";
		$tour4 = $pdo->prepare($sql);
		$tour4->bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
		$MEM_NO = $_SESSION["MEM_NO"];
		$tour4->bindValue(":MEM_NO", $MEM_NO);
		$tour4->execute();
		$savedLikes = $tour4->fetchAll(PDO::FETCH_ASSOC);
	}else{
		$savedLikes = "{}";
	}
	

	if(isset($_SESSION["MEM_NO"])){
		if(in_array($tourRows[0]["TOUR_ID"],$joinRows)){
			$tourRows[0]["joined"] = "已報名";
		}else{
			$tourRows[0]["joined"] = "我要參加";
		}
	}else{
		$tourRows[0]["joined"] =  "我要參加";
	}
	



	$dataRows=[$tourRows,$joinRows,$hotelRows,$foodRows,$msgRows,$loveRows,$savedLikes];
	echo json_encode($dataRows);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>