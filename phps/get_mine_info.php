<?php
try {
    session_start();
    require_once("./connect.php");

    if(isset($_SESSION["MEM_ID"])){

   

	$sql = "select * 
            from member
            where MEM_NO = :MEM_NO
            ";

    $get_mine_info = $pdo->prepare($sql);
    $get_mine_info->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
    $get_mine_info->execute();

    // echo "修改成功~!!";
    if ($get_mine_info->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_mine_info = $get_mine_info->fetch(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_mine_info);
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
