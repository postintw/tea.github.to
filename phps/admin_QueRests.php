<?php
try {
    require_once "./connect.php";

    // 先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    //php叫物件內屬性的寫法
    $RESTAURANT_ID = $decoded["RESTAURANT_ID"];

  
    //接到之後要做的SQL指令
    //:後面+名字會變成一個變數 ->Php 寫sql的時候的寫法
	$sql = "select a.RESTAURANT_ID RESTAURANT_ID, a.RESTAURANT_NAME RESTAURANT_NAME, a.RESTAURANT_INFRO RESTAURANT_INFRO, a.RESTAURANT_STATUS RESTAURANT_STATUS, b.GARD_ID GARD_ID
            from restaurant a join restaurant_list b on a.RESTAURANT_ID=b.RESTAURANT_ID
            where a.RESTAURANT_ID= :RESTAURANT_ID
            ";

    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    $per_ord_data->bindValue(":RESTAURANT_ID", $RESTAURANT_ID);
    

    $per_ord_data->execute();

    // // echo "修改成功~!!";
    if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

        for($i=0;$i < count($per_ord_datarow);$i++){

            if($per_ord_datarow[$i]["RESTAURANT_STATUS"] == 0){
                $per_ord_datarow[$i]["ischecked"] = false;
            }else{
                $per_ord_datarow[$i]["ischecked"] = true ;
            };

        };

        //送出json字串
        echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}