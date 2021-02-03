<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<title>Examples</title>
</head>
<body>
<?php
$errMsg = "";
try {
	require_once("./connect.php");

    if( $_FILES["upFile"]["error"] == UPLOAD_ERR_OK){
    //決定檔案名稱
    $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
    $imageNo = uniqid();
    $fileName = "{$imageNo}.{$fileInfoArr["extension"]}";  //312543544.gif
    //先檢查images資料夾存不存在
    if( file_exists("images") === false){
        mkdir("images");
    }
    //將檔案copy到要放的路徑
    $from = $_FILES["upFile"]["tmp_name"];
    $to = "../images/tour/restaurant/$fileName";
    if(copy( $from, $to)===true){
        $sql = "INSERT INTO `restaurant` (`RESTAURANT_ID`,`RESTAURANT_IMG`, `RESTAURANT_NAME`, `RESTAURANT_INFRO`, `RESTAURANT_STATUS`) 
                            values(null, :RESTAURANT_IMG, :RESTAURANT_NAME, :RESTAURANT_INFRO,:RESTAURANT_STATUS)";
            $tour = $pdo->prepare( $sql );	
            $tour -> bindValue(":RESTAURANT_IMG", "./images/tour/restaurant/$fileName");		
			
			$tour -> bindValue(":RESTAURANT_NAME", $_POST["RESTAURANT_NAME"]);
            $tour -> bindValue(":RESTAURANT_INFRO", $_POST["RESTAURANT_INFRO"]);
            $tour -> bindValue(":RESTAURANT_STATUS", $_POST["RESTAURANT_STATUS"]);		
			$tour -> execute();	
			$sql1 = "INSERT INTO `restaurant_list` (`RESTAURANT_ID`, `GARD_ID`) 
                            values(LAST_INSERT_ID(), :GARD_ID)";
			$rest = $pdo->prepare( $sql1 );
			$rest -> bindValue(":GARD_ID", $_POST["GARD_ID"]);
			$rest -> execute();	
            echo "新增成功，即將跳轉回上頁";
            echo "<script>location.href='../admin_custom.html'</script>";

       		
        
    }else{
        echo "失敗，將跳轉回上頁重新輸入";
        echo "<script>location.href='../admin_custom.html'</script>";

    }

}else{
    echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
    echo "新增失敗，將跳轉回上頁重新輸入";
    echo "<script>location.href='../admin_custom.html'</script>";
}
} catch (PDOException $e) {
$pdo->rollBack();
$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
echo $errMsg;
}




?>    
</body>
</html>