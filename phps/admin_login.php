<?php 
session_start();
try {
    require_once("./connect.php");
	// $dsn = "mysql:host=localhost;port=3306;dbname=ced101g2;charset=utf8";
	// $user = "root";
	// $password = "root";
	// $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
	// $pdo = new PDO($dsn, $user, $password, $options);

    $ADMIN_ID = $_POST["ADMIN_ID"];
    $ADMIN_PW = $_POST["ADMIN_PW"];
    $sql = "select * from admin where ADMIN_ID='$ADMIN_ID' and ADMIN_PW='$ADMIN_PW'";
    $admin = $pdo->query($sql);
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
     // echo "系統錯誤, 請通知系統維護人員<br>";
}
?>
<!-- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登入/註冊</title>
</head>
<body> -->
    <?php
    if($admin->rowCount()===0) { //rowCount()可取得這次select的總筆數
	// echo "error, plz <a href = '1204_pdo_login.html'>login</a> again";
    echo 
    "<script>alert('id & pw error');location.href='../admin_login.html'</script>";
    } else {
    $adminRow = $admin->fetch(PDO::FETCH_ASSOC);
    // session_start();
        $_SESSION["ADMIN_NO"] = $adminRow["ADMIN_NO"];
        $_SESSION["ADMIN_ID"] = $adminRow["ADMIN_ID"];
        $_SESSION["ADMIN_NAME"] = $adminRow["ADMIN_NAME"];
        $_SESSION["ADMIN_PW"] = $adminRow["ADMIN_PW"];
    echo $adminRow["ADMIN_ID"], "您好，即將跳轉<br>";
	echo "<script>location.href='../admin_tea.html'</script>";
    }      
    ?>
</body>
</html>