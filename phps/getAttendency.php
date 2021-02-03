<?php
try {
    session_start();
    require_once("./connect.php");

    if(isset($_SESSION["MEM_ID"])){

    //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);
    $tourId = $decoded["tourId"]; //php叫物件內屬性的寫法

	$sql = "select * 
            from tour_join
            where TOUR_ID = :tourId
            ";

    $get_attend = $pdo->prepare($sql);
    $get_attend->bindValue(":tourId", $tourId);
    $get_attend->execute();

    // echo "修改成功~!!";
    if ($get_attend->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_attend = $get_attend->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_attend);
        // echo $managerdatarow;
    }
    } else {
        echo "[]";

    }
} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
