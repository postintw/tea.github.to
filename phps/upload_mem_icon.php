<?php 
    session_start();
try {
    require_once("./connect.php");

    if ($_FILES["upFile"]["error"] == UPLOAD_ERR_OK) {
        // 設定要存照片的路徑(以php檔案為出發點)
        $dir = "../images/member";
        //取出檔案副檔名(.PNG ...等等)
        $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
        // 創造不會重複的亂碼
        $imageNo = uniqid();
        //決定檔案名稱
        $fileName = "{$imageNo}.{$fileInfoArr["extension"]}"; //312543544.gif
        //先檢查images資料夾存不存在
        if (file_exists($dir) == false) {
            mkdir($dir, 0777, true); //make directory
        }
        //將檔案copy到要放的路徑
		$from = $_FILES["profile_pic_input"]["tmp_name"];
        $to = "$dir/$fileName";
        
		if (copy($from, $to) ===true) {
            $sql = "update member
            set MEM_IMG = :MEM_IMG
            where MEM_NO = :MEM_NO
            ";
            $products = $pdo->prepare( $sql );
			$products -> bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
			$products -> bindValue(":MEM_IMG", "./images/member/{$fileName}");
			$products -> execute();			
            echo "<script>location.href='../membership.html'</script>";
		}else{
            // echo "失敗~";
            echo "<script>history.go(-1);
            alert('請重新上傳頭像！');
            </script>";
            
		}

    } else {
        echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
        // echo "新增失敗<br>";
    }
} catch (PDOException $e) {
    echo "修改失敗~!!";
}
?>