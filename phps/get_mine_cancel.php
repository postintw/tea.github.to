<?php
try {
    session_start();
    require_once("./connect.php");


    if(isset($_SESSION["MEM_ID"])){

   

	$sql = "select * 
            from tour
            where MEM_NO = :MEM_NO
            and TOUR_STATUS = 0 
            ";

    $get_mine_cancel = $pdo->prepare($sql);
    $get_mine_cancel->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);

    $get_mine_cancel->execute();

    // echo "修改成功~!!";
    if ($get_mine_cancel->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_mine_cancel = $get_mine_cancel->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_mine_cancel);
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
