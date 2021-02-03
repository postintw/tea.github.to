<?php
try {
    session_start();
    require_once("./connect.php");

    if(isset($_SESSION["MEM_ID"])){


	$sql = "select f.mem_no, p.name, p.info, p.img, p.psn
            from product_f f join product p
            on f.psn = p.psn
            where f.MEM_NO = :MEM_NO
            ";

    $get_fav_prod = $pdo->prepare($sql);
    $get_fav_prod->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);

    $get_fav_prod->execute();

    // echo "修改成功~!!";
    if ($get_fav_prod->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_fav_prod = $get_fav_prod->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_fav_prod);
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
