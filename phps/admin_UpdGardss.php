<?php
try {
    require_once "./connect.php";

    //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    //php叫物件內屬性的寫法
    $GARD_ID = $decoded["GARD_ID"]; 
    $GARD_NAME = $decoded["GARD_NAME"];
    $GARD_TYPE = $decoded["GARD_TYPE"];
    $GARD_ADDRESS = $decoded["GARD_ADDRESS"];
    $GARD_VOTE = $decoded["GARD_VOTE"];
    $GARD_CLICK = $decoded["GARD_CLICK"];
    $GARD_STATUS = $decoded["GARD_STATUS"];
    

  
    //接到之後要做的SQL指令
    //:後面+名字會變成一個變數 ->Php 寫sql的時候的寫法
    $sql = "update garden  
            set GARD_NAME=:GARD_NAME, GARD_TYPE=:GARD_TYPE , GARD_ADDRESS=:GARD_ADDRESS,
                GARD_VOTE= :GARD_VOTE, GARD_CLICK=:GARD_CLICK, GARD_STATUS=:GARD_STATUS
            where GARD_ID=:GARD_ID
            ";

    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    $per_ord_data->bindValue(":GARD_ID", $GARD_ID);
    $per_ord_data->bindValue(":GARD_NAME", $GARD_NAME);
    $per_ord_data->bindValue(":GARD_TYPE", $GARD_TYPE);
    $per_ord_data->bindValue(":GARD_ADDRESS", $GARD_ADDRESS);
    $per_ord_data->bindValue(":GARD_VOTE", $GARD_VOTE);
    $per_ord_data->bindValue(":GARD_CLICK", $GARD_CLICK);
    $per_ord_data->bindValue(":GARD_STATUS", $GARD_STATUS);

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
