<?php
try {
    session_start();
    require_once("./connect.php");

    if(isset($_SESSION["MEM_ID"])){

        //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    $ART_NO = $decoded["unfav_art"]; //php叫物件內屬性的寫法

	$sql = "
            delete from art_favorite
            where ART_NO = :ART_NO
            ";

    $get_fav_art = $pdo->prepare($sql);
    $get_fav_art->bindValue(":ART_NO", $ART_NO);
    // $get_fav_prod->bindValue(":MEM_ID", $_SESSION["MEM_ID"]);

    $get_fav_art->execute();

    // echo "修改成功~!!";
    if ($get_fav_art->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_fav_art = $get_fav_art->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_fav_art);
        // echo $managerdatarow;
    }
    }else{
        echo "[]";
    }
} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
