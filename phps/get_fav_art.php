<?php
try {
    session_start();
    require_once("./connect.php");

    if(isset($_SESSION["MEM_ID"])){

	$sql = "select f.art_no, f.mem_no, a.art_title, a.art_img, a.art_content
            from art_favorite f join my_art a
            on f.art_no = a.art_no
            where f.MEM_NO = :MEM_NO
            ";    

    $get_fav_art = $pdo->prepare($sql);
    $get_fav_art->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);

    $get_fav_art->execute();

    // echo "修改成功~!!";
    if ($get_fav_art->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_fav_artRow = $get_fav_art->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_fav_artRow);
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
