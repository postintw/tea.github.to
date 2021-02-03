<?php
session_start();
$errMsg = "";
try {
	require_once("./connect.php");
    //.......確定是否上傳成功
    if ( $_POST["addCase"]=="1") {
            $sql = "INSERT INTO tour_collect(TOUR_ID,MEM_NO) 
                            values(:TOUR_ID, :MEM_NO )";
	        $tour = $pdo->prepare( $sql );
            $tour -> bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
            $tour -> bindValue(":MEM_NO",$_SESSION["MEM_NO"]);
            $tour -> execute();	 
            echo 1;
            
           
        
    }else{
            $sql = "DELETE FROM tour_collect
                    WHERE TOUR_ID =:TOUR_ID and MEM_NO = :MEM_NO";
            $tour = $pdo->prepare( $sql );
            $tour -> bindValue(":TOUR_ID", $_POST["TOUR_ID"]);
            $MEM_NO = $_SESSION["MEM_NO"];
            $tour -> bindValue(":MEM_NO", $MEM_NO);
            $tour -> execute();	
            echo 2;
        }
          
        		
			
} catch (PDOException $e) {
	$pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
	echo $errMsg;
	
	
}


?>    
