<?php
try {
    session_start();
    require_once("./connect.php");

    if(isset($_SESSION["MEM_ID"])){
	$sql = "select * 
            from orders
            where MEMBER = :MEM_NO
            order by orders_no desc
            ";

    $get_ord_list = $pdo->prepare($sql);
    $get_ord_list->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);

    $get_ord_list->execute();

    // echo "修改成功~!!";
    if ($get_ord_list->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        //取回一筆資料
        $get_ord_list = $get_ord_list->fetchAll(PDO::FETCH_ASSOC);

        for($i=0; $i < count($get_ord_list); $i++){
            if ($get_ord_list[$i]["DEL_STATE"] == 0){
                $get_ord_list[$i]["state"] = "未付款";
            } else if($get_ord_list[$i]["DEL_STATE"] == 1){
                $get_ord_list[$i]["state"] = "已付款";
            };

            if ($get_ord_list[$i]["PAY"] == 0){
                $get_ord_list[$i]["pay"] = "ATM付款";
            }else if ($get_ord_list[$i]["PAY"] == 1){
                $get_ord_list[$i]["pay"] = "信用卡付款";
            };
            
        }

        //送出json字串
        echo json_encode($get_ord_list);
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
