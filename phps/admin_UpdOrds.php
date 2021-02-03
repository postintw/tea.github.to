<?php
try {
    require_once "./connect.php";

    //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    //php叫物件內屬性的寫法
    $ORDERS_NO = $decoded["ORDERS_NO"]; 
    $DEL_STATE = $decoded["DEL_STATE"];
    $DELIVERY = $decoded["DELIVERY"];
    $PAY = $decoded["PAY"];
    $TOTAL = $decoded["TOTAL"];
    $DISCOUNT = $decoded["DISCOUNT"];
    $RECEIVER_NAME = $decoded["RECEIVER_NAME"];
    $RECEIVER_ADDRESS = $decoded["RECEIVER_ADDRESS"];
    $RECEIVER_TEL = $decoded["RECEIVER_TEL"];

  
    //接到之後要做的SQL指令
    //:後面+名字會變成一個變數 ->Php 寫sql的時候的寫法
    
    $sql = "update orders  
            set DELIVERY=:DELIVERY, PAY=:PAY ,DISCOUNT= :DISCOUNT,
                RECEIVER_NAME=:RECEIVER_NAME , RECEIVER_ADDRESS=:RECEIVER_ADDRESS, 
                RECEIVER_TEL=:RECEIVER_TEL , TOTAL=:TOTAL , DEL_STATE=:DEL_STATE
            where ORDERS_NO=:ORDERS_NO
            ";

    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    $per_ord_data->bindValue(":ORDERS_NO", $ORDERS_NO);
    $per_ord_data->bindValue(":DEL_STATE", $DEL_STATE);
    $per_ord_data->bindValue(":DELIVERY", $DELIVERY);
    $per_ord_data->bindValue(":PAY", $PAY);
    $per_ord_data->bindValue(":TOTAL", $TOTAL);
    $per_ord_data->bindValue(":DISCOUNT", $DISCOUNT);
    $per_ord_data->bindValue(":RECEIVER_NAME", $RECEIVER_NAME);
    $per_ord_data->bindValue(":RECEIVER_ADDRESS", $RECEIVER_ADDRESS);
    $per_ord_data->bindValue(":RECEIVER_TEL", $RECEIVER_TEL);

    $per_ord_data->execute();

    // echo "修改成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
    //     //傳回空的JSON字串
    //     echo "{}";

    // } else { //找得到
    //     //取回一筆資料
    //     $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);
       
    //     //送出json字串
    //     echo json_encode($per_ord_datarow);
    //     // echo $managerdatarow;
    // }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
