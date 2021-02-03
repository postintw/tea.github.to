<?php
session_start();
$errMsg = "";
$success="success";
try {
	require_once("./connect.php");
	//.......確定是否上傳成功
			$sql = "INSERT INTO `tour` (`TOUR_ID`,`GARD_ID`, `MEM_NO`, `HOTEL_ID`, `TOUR_PEOPLE`, `NUM_OF_PARTICIPANTS`, `SETUP_DATE`, `DEADLINE_DATE`, `TOUR_SETOFFTIME`, `TOUR_TITLE`, `TOUR_INFRO`, `TOUR_IMG`, `TOUR_LEADER`, `TOUR_ACTIVE`, `TOUR_PS`, `TOUR_STATUS`) 
                            values(null, :GARD_ID, :MEM_NO, :HOTEL_ID, :TOUR_PEOPLE,:NUM_OF_PARTICIPANTS,:SETUP_DATE,:DEADLINE_DATE,:TOUR_SETOFFTIME,:TOUR_TITLE,:TOUR_INFRO,:TOUR_IMG,:TOUR_LEADER,:TOUR_ACTIVE,:TOUR_PS, :TOUR_STATUS )";
			$tour = $pdo->prepare( $sql );
			$tour -> bindValue(":GARD_ID", $_POST["GARD_ID"]);
			$MEM_NO = $_SESSION["MEM_NO"];
			$tour -> bindValue(":MEM_NO", $MEM_NO);
			// $tour -> bindValue(":MEM_NO", $_POST["MEM_NO"]);
			$tour -> bindValue(":HOTEL_ID", $_POST["HOTEL_ID"]);
            $tour -> bindValue(":TOUR_PEOPLE", $_POST["TOUR_PEOPLE"]);
            $tour -> bindValue(":NUM_OF_PARTICIPANTS", $_POST["NUM_OF_PARTICIPANTS"]);
			$tour -> bindValue(":SETUP_DATE", $_POST["SETUP_DATE"]);
			$tour -> bindValue(":DEADLINE_DATE", $_POST["DEADLINE_DATE"]);
            $tour -> bindValue(":TOUR_SETOFFTIME", $_POST["TOUR_SETOFFTIME"]);
            $tour -> bindValue(":TOUR_TITLE", $_POST["TOUR_TITLE"]);
			$tour -> bindValue(":TOUR_INFRO", $_POST["TOUR_INFRO"]);
			$tour -> bindValue(":TOUR_IMG", $_POST["TOUR_IMG"]);
			$tour -> bindValue(":TOUR_LEADER", $_POST["TOUR_LEADER"]);
            $tour -> bindValue(":TOUR_ACTIVE", $_POST["TOUR_ACTIVE"]);
			$tour -> bindValue(":TOUR_PS", $_POST["TOUR_PS"]);
            $tour -> bindValue(":TOUR_STATUS", $_POST["TOUR_STATUS"]);
			$tour -> execute();	
			$sql1 = "INSERT INTO `tour_restaurant` (`TOUR_ID`, `RESTAURANT_ID`) 
                            values(LAST_INSERT_ID(), :RESTAURANT_ID1),
							(LAST_INSERT_ID(), :RESTAURANT_ID2),
							(LAST_INSERT_ID(), :RESTAURANT_ID3)";

			$rest = $pdo->prepare( $sql1 );
			$rest -> bindValue(":RESTAURANT_ID1", $_POST["RESTAURANT_ID1"]);
			$rest -> bindValue(":RESTAURANT_ID2", $_POST["RESTAURANT_ID2"]);
			$rest -> bindValue(":RESTAURANT_ID3", $_POST["RESTAURANT_ID3"]);	
			$rest -> execute();	
			echo $success;
			
			
} catch (PDOException $e) {
	$pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
	
	
}


?>    
