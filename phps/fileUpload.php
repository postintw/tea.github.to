<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>

<?php 
switch ( $_FILES["upFile"]["error"]){
	case 0:
		$dir = "images";
		//檢查資夾是否存在
		if(file_exists($dir) === false){ //不存在
			//make directory
			mkdir($dir);
		}
		$from = $_FILES['upFile']['tmp_name']; //暫存區路徑
		$to = "../$dir/tour/tour/{$_FILES['upFile']['name']}";

		if(copy($from, $to)){
			$url = "../01_tour_preview.html";
			echo "<script type='text/javascript'>";
			echo "window.location.href='$url'";
			echo "</script>";
		
		}else{
			echo "拷貝失敗 <br>";
		}
		break;
	case 1:
		echo "上傳檔案太大, 不得超過", ini_get("upload_max_filesize"),"~<br>";
		break;
	case 2:
		echo "上傳檔案太大, 不得超過", $_POST["MAX_FILE_SIZE"],"位元組(bytes)~<br>";
		break;
	case 3:
		echo "上傳檔案不完整, 請重新上傳~<br>";
		break;
	case 4: 
		echo "檔案未選~<br>";
		break;
}

// echo "['error']: " , $_FILES['upFile']['error'] , "<br>";
// echo "['name']: " , $_FILES['upFile']['name'] , "<br>";
// echo "['tmp_name']: " , $_FILES['upFile']['tmp_name'] , "<br>";
// echo "['type']: " , $_FILES['upFile']['type'] , "<br>";
// echo "['size']: " , $_FILES['upFile']['size'] , "<br>";
?>

</body>
</html>